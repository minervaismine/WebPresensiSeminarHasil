from flask import Flask, request, jsonify
from flask_cors import CORS
from config import get_db_connection
from datetime import datetime, timedelta
import jwt
import locale

app = Flask(__name__)
CORS(app)

try:
    locale.setlocale(locale.LC_TIME, "id_ID.UTF-8")   # Linux/Mac
except:
    try:
        locale.setlocale(locale.LC_TIME, "Indonesian_Indonesia.1252")   # Windows
    except:
        pass

def format_waktu(waktu):
    if isinstance(waktu, timedelta):
        total = int(waktu.total_seconds())
        jam = total // 3600
        menit = (total % 3600) // 60
        return f"{jam:02d}.{menit:02d}"
    else:
        return waktu.strftime("%H.%M")

#Menampilkan data seminar
@app.route("/data-seminar", methods=["GET"])
def get_data_seminar():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            s.id_seminar,
            s.judul_penelitian,
            s.tanggal,
            s.waktu_mulai,
            s.waktu_selesai,
            s.lokasi,
            s.latitude,
            s.longitude,
            s.radius_meter,
            s.dosen_pembimbing,
            s.dosen_penguji_1,
            s.dosen_penguji_2,

            m.id_user,
            m.nama,
            m.nim,
            m.angkatan

        FROM seminar s
        JOIN mahasiswa m
        ON s.id_mahasiswa = m.id_user

        ORDER BY s.tanggal DESC, s.waktu_mulai ASC
    """)

    data = cursor.fetchall()

    for item in data:
        #Format tanggal
        item["tanggal"] = item["tanggal"].strftime("%A, %d %B %Y")

        #Format jam
        item["waktu_mulai"] = format_waktu(item["waktu_mulai"])
        item["waktu_selesai"] = format_waktu(item["waktu_selesai"])

    cursor.close()
    conn.close()

    return jsonify(data)

#Untuk form edit data mahasiswa
@app.route("/edit-mahasiswa/<int:id_user>", methods=["PUT"])
def edit_mahasiswa(id_user):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    data = request.json

    nama = data["nama"]
    nim = data["nim"]
    angkatan = data["angkatan"]

    try:
        #Mengecek apakah data mahasiswa ada
        cursor.execute(
            "SELECT * FROM mahasiswa WHERE id_user=%s",
            (id_user,)
        )

        if not cursor.fetchone():
            return jsonify({
                "message": "Data mahasiswa tidak ditemukan"
            }), 404
        
        #Mengecek apakah NIM sudah dipakai mahasiswa lain
        cursor.execute(
            """
            SELECT id_user
            FROM mahasiswa
            WHERE nim=%s AND id_user<>%s
            """,
            (nim, id_user)
        )

        if cursor.fetchone():
            return jsonify({
                "message": "NIM sudah digunakan oleh mahasiswa lain"
            }), 400
        
        #Update data
        cursor.execute(
            """
            UPDATE mahasiswa
            SET
                nama=%s,
                nim=%s,
                angkatan=%s
            WHERE id_user=%s
            """,
            (nama, nim, angkatan, id_user)
        )

        conn.commit()

        return jsonify({
            "message": "Data mahasiswa berhasil diperbarui"
        }), 200
    
    except Exception as e:
        conn.rollback()
        return jsonify({
            "message": str(e)
        }), 500
    
    finally:
        cursor.close()
        conn.close()

#Menampilkan data angkatan untuk masuk ke filter
@app.route("/data-angkatan", methods=["GET"])
def get_data_angkatan():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT DISTINCT angkatan
        FROM mahasiswa
        ORDER BY angkatan asc
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)

#Menampilkan data mahasiswa, fitur search, fitur sort dan fitur filter di halaman Kelola Data Mahasiswa - Admin
@app.route("/data-mahasiswa", methods=["GET"])
def get_data_mahasiswa():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    offset = (page - 1) * limit

    search = request.args.get("search", "").strip()
    keyword = f"%{search}%"

    #Parameter sorting
    sort_by = request.args.get("sort_by", "nama")
    sort_order = request.args.get("sort_order", "asc").lower()

    #Validasi agar aman dari SQL Injection
    allowed_columns = ["nama", "nim", "angkatan"]
    allowed_orders = ["asc", "desc"]

    if sort_by not in allowed_columns:
        sort_by = "nama"
    
    if sort_order not in allowed_orders:
        sort_order = "asc"

    #Filter angkatan
    angkatan = request.args.get("angkatan", "")
    angkatan_list = []

    if angkatan:
        angkatan_list = angkatan.split(",")

    where_clause = []
    params = []

    if search:
        where_clause.append("(nama LIKE %s OR nim LIKE %s)")
        params.extend([keyword, keyword])

    if angkatan_list:
        placeholders = ",".join(["%s"] * len(angkatan_list))
        where_clause.append(f"angkatan IN ({placeholders})")
        params.extend(angkatan_list)

    where_sql = ""
    if where_clause:
        where_sql = "WHERE " + " AND ".join(where_clause)
    
    count_query = f"""
        SELECT COUNT(*) AS total
        FROM mahasiswa
        {where_sql}
    """

    cursor.execute(count_query, tuple(params))
    total_data = cursor.fetchone()["total"]

    #Ambil data
    data_query = f"""
        SELECT
            id_user,
            nama,
            nim,
            angkatan
        FROM mahasiswa
        {where_sql}
        ORDER BY {sort_by} {sort_order.upper()}
        LIMIT %s OFFSET %s
    """

    data_params = params.copy()
    data_params.extend([limit, offset])

    cursor.execute(data_query, tuple(data_params))
    mahasiswa = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({
        "data": mahasiswa,
        "total": total_data,
        "page": page,
        "limit": limit,
        "total_pages": (total_data + limit - 1) // limit
    })

#Menghubungkan data QR Code dengan data seminar
@app.route("/generate-qr", methods=["POST"])
def generate_qr():
    token = request.headers.get("Authorization")

    if not token:
        return jsonify({
            "success": False,
            "message": "Token tidak ditemukan"
        }), 401
    
    token = token.replace("Bearer ", "")

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        #Mengambil data seminar dari database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT *
            FROM seminar
            WHERE id_mahasiswa = %s
        """, (payload["id_user"],))

        seminar = cursor.fetchone()

        if not seminar:
            cursor.close()
            conn.close()

            return jsonify({
                "success": False,
                "message": "Data seminar tidak ditemukan"
            }), 404

        #Membuat JWT QR
        qr_payload = {
            "id_user": payload["id_user"],
            "id_seminar": seminar["id_seminar"],
            "role": payload["role"],
            "exp": datetime.utcnow() + timedelta(minutes=10)
        }

        qr_token = jwt.encode(
            qr_payload,
            SECRET_KEY,
            algorithm="HS256"
        )

        # Cek apakah QR sudah ada
        cursor.execute("""
            SELECT *
            FROM qr_codes
            WHERE id_seminar = %s
        """, (seminar["id_seminar"],))

        existing_qr = cursor.fetchone()

        #Kalau QR belum ada, masukkan data ke tabel qr_codes
        if existing_qr is None:
            cursor.execute("""
                INSERT INTO qr_codes (
                    id_seminar,
                    qr_code
                )
                VALUES (%s, %s)    
            """,
            (
                seminar["id_seminar"], qr_token
            ))
        else:
            cursor.execute("""
                UPDATE qr_codes
                SET
                    qr_code = %s,
                    status_qr = 'inactive',
                    activated_at = NULL,
                        expired_at = NULL
                WHERE id_seminar = %s
            """,
            (
                qr_token, seminar["id_seminar"]
            ))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "success": True,
            "qr_code": qr_token
        }), 200
    
    except jwt.ExpiredSignatureError:
        return jsonify({
            "success": False,
            "message": "Token expired"
        }), 401
    
    except jwt.InvalidTokenError:
        return jsonify({
            "success": False,
            "message": "Token tidak valid"
        }), 401

#Mengaktifkan QR Code
@app.route("/activate-qr", methods=["POST"])
def activate_qr():
    data = request.get_json()

    id_seminar = data.get("id_seminar")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    #Memastikan QR ada
    cursor.execute("""
        SELECT *
        FROM qr_codes
        WHERE id_seminar = %s
        """, (id_seminar,))
    
    qr = cursor.fetchone()

    if not qr:
        cursor.close()
        conn.close()

        return jsonify({
            "success": False,
            "message": "QR Code belum dibuat"
        }), 404
    
    now = datetime.now()
    expired = now + timedelta(minutes=10)

    cursor.execute("""
        UPDATE qr_codes
        SET
            status_qr = 'active',
            activated_at = %s,
            expired_at = %s
        WHERE id_seminar = %s           
    """, (
        now,
        expired,
        id_seminar
    ))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify ({
        "success": True,
        "message": "QR Code berhasil diaktifkan",
        "expired_at": expired.isoformat()
    })

#Menonaktifkan QR Code ketika waktu 10 menit selesai
@app.route("/deactivate-qr", methods=["POST"])
def deactivate_qr():
    data = request.get_json()

    id_seminar = data.get("id_seminar")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        UPDATE qr_codes
        SET
            status_qr = 'inactive'
        WHERE id_seminar = %s               
    """, (id_seminar,))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "QR Code telah dinonaktifkan"
    })

#Menghubungkan scanner ke backend
@app.route("/scan-qr", methods=["POST"])
def scan_qr():
    #Mengambil token login peserta seminar
    token = request.headers.get("Authorization")

    if not token:
        return jsonify({
            "success": False,
            "message": "Token tidak ditemukan"
        }), 401
    
    token = token.replace("Bearer ", "")

    #Mengambil data QR Code
    data = request.get_json()

    qr_token = data.get("qr_code")

    if not qr_token:
        return jsonify({
            "success": False,
            "message": "QR Code tidak ditemukan"
        }), 400
    
    try:
        #Decode token login peserta seminar
        peserta = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        #Mengecek agar hanya mahasiswa yang bisa melakukan presensi
        if peserta["role"] != "mahasiswa":
            return jsonify({
                "success": False,
                "code": "INVALID_ROLE",
                "message": "Hanya mahasiswa yang dapat melakukan presensi"
            }), 403

        #Decode QR Code
        qr_payload = jwt.decode(
            qr_token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        #Mengecek QR di database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT *
            FROM qr_codes
            WHERE id_seminar = %s
        """, (qr_payload["id_seminar"],))

        qr = cursor.fetchone()

        if not qr:
            cursor.close()
            conn.close()

            return jsonify({
                "success": False,
                "code": "QR_NOT_FOUND",
                "message": "QR Code tidak ditemukan"
            }), 404
        
        #Memastikan QR tersebut aktif
        if qr["status_qr"] != "active":
            cursor.close()
            conn.close()

            return jsonify({
                "success": False,
                "code": "QR_NOT_ACTIVE",
                "message": "QR Code belum diaktifkan"
            }), 400
        
        #Mengecek apakah penyelenggara mencoba scan qr seminar miliknya sendiri
        if peserta["id_user"] == qr_payload["id_user"]:
            cursor.close()
            conn.close()

            return jsonify({
                "success": False,
                "code": "PENYELENGGARA",
                "message": "Penyelenggara seminar tidak dapat melakukan presensi"
            }), 400
        
        now = datetime.now()

        #Mengecek apakah qr yang akan di scan sudah kedaluwarsa atau belum
        if qr["expired_at"] is not None and now > qr["expired_at"]:
            cursor.close()
            conn.close()

            return jsonify({
            "success": False,
            "code": "QR_EXPIRED",
            "message": "QR Code sudah kedaluwarsa"
        }), 400

        #Mengecek apakah peserta sudah pernah melakukan presensi sebelumnya
        cursor.execute("""
            SELECT *
            FROM presensi
            WHERE id_mahasiswa = %s
            AND id_seminar = %s       
        """, (
            peserta["id_user"],
            qr_payload["id_seminar"]
        ))

        existing = cursor.fetchone()
        if existing:
            cursor.close()
            conn.close()

            return jsonify({
                "success": False,
                "code": "ALREADY_ATTENDED",
                "message": "Anda sudah melakukan presensi"
            }), 400
        
        #Menyimpan data presensi
        cursor.execute("""
            INSERT INTO presensi(
                id_mahasiswa,
                id_seminar,
                waktu_scan,
                latitude,
                longitude
            )
            VALUES(%s,%s,%s,%s,%s)
        """,(
            peserta["id_user"],
            qr_payload["id_seminar"],
            now,
            None,
            None
        ))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "success": True,
            "code": "SCAN_SUCCESS",
            "message": "QR berhasil dibaca",
            "peserta_id": peserta["id_user"],
            "seminar_id": qr_payload["id_seminar"],
            "role": peserta["role"]
        })
    
    except jwt.ExpiredSignatureError:
        return jsonify({
            "success": False,
            "code": "QR_EXPIRED",
            "message": "QR Code sudah kedaluwarsa"
        }), 401
    
    except jwt.InvalidTokenError:
        return jsonify({
            "success": False,
            "code": "QR_INVALID",
            "message": "QR Code tidak valid"
        }), 401
    
#Menghubungkan data nama di halaman seminar saya (penyelenggara)
@app.route("/detail-seminar/<int:id_user>")
def detail_seminar(id_user):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT
            s.*,
            m.nama,
            m.nim,
            m.angkatan
        FROM seminar s
        JOIN mahasiswa m
            ON s.id_mahasiswa = m.id_user
        WHERE s.id_mahasiswa = %s
    """

    cursor.execute(query, (id_user,))
    seminar = cursor.fetchone()

    cursor.close()
    conn.close()

    if seminar:
        for key, value in seminar.items():
            if isinstance(value, timedelta):
                seminar[key] = str(value)

    return jsonify(seminar)

#Cek apakah mahasiswa yang login memiliki jadwal seminar atau tidak, untuk menyesuaikan tampilan halaman seminar saya
@app.route("/cek-seminar/<int:id_mahasiswa>")
def cek_seminar(id_mahasiswa):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT *
        FROM seminar
        WHERE id_mahasiswa = %s
    """

    cursor.execute(query, (id_mahasiswa,))
    seminar = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify({
        "memiliki_seminar": seminar is not None
    })

#Menghubungkan halaman login dengan BE
SECRET_KEY = "web_seminar_key"

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT 
            u.*,
            m.nim,
            m.nama,
            m.angkatan
        FROM users u
        LEFT JOIN mahasiswa m
            ON u.id_user = m.id_user
        WHERE u.username = %s
    """

    cursor.execute(query, (username,))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        return jsonify({
            "success": False,
            "field": "username",
            "message": "Username salah",
        }), 401

    if password != user["password"]:
        return jsonify({
            "success": False,
            "field": "password",
            "message": "Password salah"
        }), 401
    
    payload = {
        "id_user": user["id_user"],
        "username": user["username"],
        "role": user["role"],
        "exp": datetime.utcnow() + timedelta(hours=3)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm="HS256"
    )
    
    return jsonify({
        "success": True,
        "token": token,
        "user": {
            "id_user": user["id_user"],
            "id_mahasiswa": user["id_user"],
            "username": user["username"],
            "role": user["role"],
            "nim": user["nim"],
            "nama": user["nama"]
        }
    })

#Testing BE
@app.route("/")
def home():
    return "Backend Flask Berjalan!"

if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS
from config import get_db_connection
from datetime import datetime, timedelta
from math import ceil, radians, sin, cos, sqrt, atan2
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

def hitung_jarak(lat1, lon1, lat2, lon2):
    R = 6371000 #meter

    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)

    a = (sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2)

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c

@app.route("/verifikasi-presensi/<int:id_seminar>", methods=["GET"])
def lihat_daftar_hadir(id_seminar):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            p.id_presensi,
            p.waktu_presensi,
            m.nama,
            m.nim
        FROM presensi p
        JOIN mahasiswa m
            ON p.id_mahasiswa = m.id_user
        WHERE p.id_seminar = %s
        ORDER BY p.waktu_presensi ASC
    """, (id_seminar,))

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({
        "data": data
    })

#Menampilkan data daftar seminar, fitur search dan fitur filter Verifikasi Presensi - Verfikator
@app.route("/verifikasi-presensi", methods=["GET"])
def verifikasi_presensi():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    #Search
    search = request.args.get("search", "").strip()

    # Filter
    tanggal_filter = request.args.get("tanggal", "Semua")
    tanggal_awal = request.args.get("tanggal_awal")
    tanggal_akhir = request.args.get("tanggal_akhir")

    #Ambil data
    query = """
        SELECT
            s.id_seminar,
            s.judul_penelitian,
            s.tanggal,
            s.waktu_mulai,
            s.waktu_selesai,
            s.dosen_pembimbing,
            s.dosen_penguji_1,
            s.dosen_penguji_2,
    
            m.nama,
            m.nim
        FROM seminar s
        JOIN mahasiswa m
            ON s.id_mahasiswa = m.id_user
        WHERE 1=1
    """

    params = []

    if search:
        query += """
        AND m.nama LIKE %s
        """
        keyword = f"%{search}%"
        params.append(keyword)

    if tanggal_filter == "Hari Ini":
        query += """
        AND DATE(s.tanggal) = CURDATE()
        """

    elif tanggal_filter == "Minggu Ini":
        query += """
        AND YEARWEEK(s.tanggal,1)=YEARWEEK(CURDATE(),1)
        """

    elif tanggal_filter == "Bulan Ini":
        query += """
        AND MONTH(s.tanggal)=MONTH(CURDATE())
        AND YEAR(s.tanggal)=YEAR(CURDATE())
        """

    elif tanggal_awal and tanggal_akhir:
        query += """
        AND DATE(s.tanggal) BETWEEN %s AND %s
        """
        params.extend([tanggal_awal, tanggal_akhir])

    query += """
        ORDER BY s.tanggal DESC, s.waktu_mulai ASC
    """

    cursor.execute(query, tuple(params))
    
    data = cursor.fetchall()

    for item in data:
        # Format tanggal
        item["tanggal"] = item["tanggal"].strftime("%A, %d %B %Y")

        # Format jam
        item["waktu_mulai"] = format_waktu(item["waktu_mulai"])
        item["waktu_selesai"] = format_waktu(item["waktu_selesai"])

    cursor.close()
    conn.close()

    return jsonify({
        "data": data
    })
    
#Menampilkan data daftar hadir, fitur search dan fitur sort Lihat Daftar Hadir - Mahasiswa Penyelenggara Seminar
@app.route("/daftar-hadir/<int:id_seminar>", methods=["GET"])
def daftar_hadir(id_seminar):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    #Pagination
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    offset = (page - 1) * limit

    #Parameter sorting
    sort_by = request.args.get("sort_by", "waktu_scan")
    sort_order = request.args.get("sort_order", "desc").lower()

    #Search
    search = request.args.get("search", "").strip()

    #Validasi agar aman dari SQL Injection
    allowed_columns = {"nama":"m.nama", "nim":"m.nim", "waktu_scan":"p.waktu_scan"}
    allowed_orders = ["asc", "desc"]

    if sort_by not in allowed_columns:
        sort_by = "waktu_scan"
    
    if sort_order not in allowed_orders:
        sort_order = "desc"

    #Hitung total data
    count_query = """
        SELECT COUNT(*) AS total
        FROM presensi p
        JOIN mahasiswa m
            ON p.id_mahasiswa = m.id_user
        WHERE p.id_seminar = %s
    """

    count_params = [id_seminar]

    if search:
        count_query += """
        AND (
            m.nama LIKE %s
            OR m.nim LIKE %s
        )
        """
        keyword = f"%{search}%"
        count_params.extend([keyword, keyword])

    cursor.execute(count_query, tuple(count_params))
    total_data = cursor.fetchone()["total"]

    #Ambil data sesuai halaman
    data_query = f"""
        SELECT
            p.id_presensi,
            p.waktu_scan,
            p.latitude,
            p.longitude,
            p.status_verifikasi,
            
            m.nama,
            m.nim,
                   
            l.latitude AS lokasi_latitude,
            l.longitude AS lokasi_longitude
        FROM presensi p
        JOIN mahasiswa m
            ON p.id_mahasiswa = m.id_user
        JOIN seminar s
            ON p.id_seminar = s.id_seminar
        JOIN lokasi_seminar l
            ON s.id_lokasi = l.id_lokasi
        WHERE p.id_seminar = %s
    """

    data_params = [id_seminar]

    if search:
        data_query += """
        AND (
            m.nama LIKE %s
            OR m.nim LIKE %s
        )
        """
        keyword = f"%{search}%"
        data_params.extend([keyword, keyword])

    data_query += f"""
        ORDER BY {allowed_columns[sort_by]} {sort_order.upper()}
        LIMIT %s OFFSET %s
    """
    
    data_params.extend([limit, offset])

    cursor.execute(data_query, tuple(data_params))
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    #Menghitung jarak lokasi peserta saat scan
    for item in data:
        jarak = hitung_jarak(
            float(item["latitude"]),
            float(item["longitude"]),
            float(item["lokasi_latitude"]),
            float(item["lokasi_longitude"])
        )

        item["jarak"] = round(jarak)

        if jarak <= 15:
            item["status_lokasi"] = "dekat"
        else:
            item["status_lokasi"] = "sedang"

        #Format waktu saat peserta scan
        item["waktu_scan"] = item["waktu_scan"].strftime("%d %B %Y, %H:%M")

    return jsonify({
        "data": data,
        "pagination": {
            "page": page,
            "total": total_data,
            "total_pages": ceil(total_data / limit)
        }
    })
    
#Untuk menghapus data lokasi dari tabel
@app.route("/lokasi-seminar/<int:id_lokasi>", methods=["DELETE"])
def delete_lokasi(id_lokasi):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    #Melakukan pengecekan apakah lokasi telah dipakai untuk seminar atau tidak
    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM seminar
        WHERE id_lokasi = %s
    """, (id_lokasi,))

    jumlah = cursor.fetchone()["total"]

    # Jika masih digunakan, batalkan penghapusan
    if jumlah > 0:
        cursor.close()
        conn.close()

        return jsonify({
            "message": "Lokasi masih digunakan oleh seminar.",
            "used": jumlah
        }), 400

    # Jika tidak digunakan, hapus lokasi
    cursor.execute("""
        DELETE FROM lokasi_seminar
        WHERE id_lokasi = %s
    """, (id_lokasi,))

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()

        return jsonify({
            "message": "Lokasi tidak ditemukan"
        }), 404

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Lokasi berhasil dihapus"
    })

#Untuk form edit data lokasi
@app.route("/lokasi-seminar/<int:id_lokasi>", methods=["PUT"])
def update_lokasi(id_lokasi):

    data = request.get_json()

    nama_lokasi = data.get("nama_lokasi")
    latitude = data.get("latitude")
    longitude = data.get("longitude")
    radius = data.get("radius")

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE lokasi_seminar
        SET
            nama_lokasi = %s,
            latitude = %s,
            longitude = %s,
            radius = %s
        WHERE id_lokasi = %s
    """, (
        nama_lokasi,
        latitude,
        longitude,
        radius,
        id_lokasi
    ))

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()

        return jsonify({
            "message": "Lokasi tidak ditemukan"
        }), 404

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Lokasi berhasil diperbarui"
    })

#Menampilkan data lokasi seminar, fitur search dan fitur sort di halaman Kelola Data Lokasi - Admin
@app.route("/lokasi-seminar", methods=["GET"])
def get_lokasi_seminar():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    #Pagination
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    offset = (page - 1) * limit

    #Search
    search = request.args.get("search", "").strip()
    keyword = f"%{search}%"

    #Sort
    sort = request.args.get("sort", "asc").lower()

    if sort not in ["asc", "desc"]:
        sort = "asc"

    #Hitung total data
    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM lokasi_seminar
        WHERE nama_lokasi LIKE %s
    """, (keyword,))

    total = cursor.fetchone()["total"]

    #Ambil data sesuai halaman
    cursor.execute(f"""
        SELECT
            id_lokasi,
            nama_lokasi,
            latitude,
            longitude,
            radius
        FROM lokasi_seminar
        WHERE nama_lokasi LIKE %s
        ORDER BY nama_lokasi {sort.upper()}
        LIMIT %s OFFSET %s
    """, (keyword, limit, offset))

    lokasi = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({
        "data": lokasi,
        "page": page,
        "limit": limit,
        "total": total,
        "total_page": ceil(total / limit)
    })

#Untuk form tambah lokasi
@app.route("/lokasi-seminar", methods=["POST"])
def add_lokasi():

    data = request.get_json()

    nama_lokasi = data.get("nama_lokasi")
    latitude = data.get("latitude")
    longitude = data.get("longitude")
    radius = data.get("radius")

    if not nama_lokasi or latitude is None or longitude is None:
        return jsonify({"message": "Data belum lengkap"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO lokasi_seminar
        (nama_lokasi, latitude, longitude, radius)
        VALUES (%s, %s, %s, %s)
    """, (
        nama_lokasi,
        latitude,
        longitude,
        radius
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Lokasi berhasil ditambahkan"
    }), 201

#Untuk menghapus data seminar dari tabel
@app.route("/delete-seminar/<int:id_seminar>", methods=["DELETE"])
def delete_seminar(id_seminar):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        DELETE FROM seminar
        WHERE id_seminar = %s
    """, (id_seminar,))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Data seminar berhasil dihapus"
    })

#Untuk fitur search mahasiswa di form add
@app.route("/search/mahasiswa", methods=["GET"])
def search_mahasiswa():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    search = request.args.get("search", "").strip()

    keyword = f"%{search}%"

    cursor.execute("""
        SELECT
            id_user,
            nama,
            nim
        FROM mahasiswa
        WHERE
            nama LIKE %s
            OR nim LIKE %s
        ORDER BY nama
        LIMIT 10
    """, (keyword, keyword))

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)

#Menampilkan data lokasi untuk masuk ke filter
@app.route("/filter/lokasi", methods=["GET"])
def get_filter_lokasi():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            id_lokasi,
            nama_lokasi,
            latitude,
            longitude
        FROM lokasi_seminar
        ORDER BY nama_lokasi
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)

#Untuk form edit data seminar
@app.route("/edit-seminar/<int:id_seminar>", methods=["PUT"])
def edit_seminar(id_seminar):
    data = request.json

    conn = get_db_connection();
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE seminar
        SET
            id_mahasiswa = %s,
            id_lokasi = %s,
            judul_penelitian = %s,
            tanggal = %s,
            waktu_mulai = %s,
            waktu_selesai = %s,
            dosen_pembimbing = %s,
            dosen_penguji_1 = %s,
            dosen_penguji_2 = %s
        WHERE id_seminar = %s
    """, (
        data["id_mahasiswa"],
        data["id_lokasi"],
        data["judul_penelitian"],
        data["tanggal"],
        data["waktu_mulai"],
        data["waktu_selesai"],
        data["dosen_pembimbing"],
        data["dosen_penguji_1"],
        data["dosen_penguji_2"],
        id_seminar
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Data seminar berhasil diperbarui"
    })

#Menampilkan data seminar, fitur search, fitur sort dan fitur filter di halaman Kelola Data Seminar - Admin
@app.route("/data-seminar", methods=["GET"])
def get_data_seminar():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    #Pagination
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 5))
    offset = (page - 1) * limit

    #Search
    search = request.args.get("search", "").strip()
    keyword = f"%{search}%"

    #Filter
    lokasi = request.args.get("lokasi", "Semua")
    tanggal_filter = request.args.get("tanggal", "Semua")
    tanggal_awal = request.args.get("tanggal_awal")
    tanggal_akhir = request.args.get("tanggal_akhir")

    #Sort
    sort_by = request.args.get("sort_by", "tanggal")
    sort_order = request.args.get("sort_order", "desc").upper()

    conditions =[
        "(m.nama LIKE %s OR m.nim LIKE %s)"
    ]

    params = [keyword, keyword]

    if lokasi != "Semua":
        conditions.append("l.nama_lokasi = %s")
        params.append(lokasi)

    sort_columns = {
        "nama": "m.nama",
        "judul": "s.judul_penelitian",
        "tanggal": "s.tanggal"
    }

    sort_column = sort_columns.get(sort_by, "s.tanggal")

    if sort_order not in ["ASC", "DESC"]:
        sort_order = "DESC"

    #Kondisi untuk filter tanggal
    if tanggal_filter == "Hari Ini":
        conditions.append("DATE(s.tanggal) = CURDATE()")
    elif tanggal_filter == "Minggu Ini":
        conditions.append("YEARWEEK(s.tanggal,1)=YEARWEEK(CURDATE(),1)")
    elif tanggal_filter == "Bulan Ini":
        conditions.append("""
            MONTH(s.tanggal)=MONTH(CURDATE())
            AND YEAR(s.tanggal)=YEAR(CURDATE())
        """)
    #Kondisi filter tanggal (rentang tanggal)
    elif tanggal_awal and tanggal_akhir:
        conditions.append("DATE(s.tanggal) BETWEEN %s AND %s")
        params.extend([tanggal_awal, tanggal_akhir])

    where = "WHERE " + " AND ".join(conditions) 

    #Hitung total data
    count_query = f"""
        SELECT COUNT(*) AS total
        FROM seminar s
        JOIN mahasiswa m
            ON s.id_mahasiswa = m.id_user
        LEFT JOIN lokasi_seminar l
            ON s.id_lokasi = l.id_lokasi
        {where}
    """

    cursor.execute(count_query, tuple(params))
    total = cursor.fetchone()["total"]

    #Ambil data sesuai halaman
    data_query = f"""
        SELECT
            s.id_seminar,
            s.id_lokasi,
            s.judul_penelitian,
            s.tanggal,
            s.waktu_mulai,
            s.waktu_selesai,
            s.dosen_pembimbing,
            s.dosen_penguji_1,
            s.dosen_penguji_2,

            l.nama_lokasi,
            l.latitude,
            l.longitude,
            l.radius,
                   
            m.id_user,
            m.nama,
            m.nim,
            m.angkatan
        FROM seminar s
        JOIN mahasiswa m
            ON s.id_mahasiswa = m.id_user
        LEFT JOIN lokasi_seminar l
            ON s.id_lokasi = l.id_lokasi
        {where}
        
        ORDER BY {sort_column} {sort_order}, s.waktu_mulai ASC
        LIMIT %s OFFSET %s
    """

    data_params = params.copy()
    data_params.extend([limit, offset])

    cursor.execute(data_query, tuple(data_params))
    data = cursor.fetchall()

    for item in data:
        #Format tanggal
        tanggal_asli = item["tanggal"]

        item["tanggal_asli"] = tanggal_asli.strftime("%Y-%m-%d")
        item["tanggal"] = tanggal_asli.strftime("%A, %d %B %Y")

        #Format jam
        def format_time_iso(td):
            total_seconds = int(td.total_seconds())
            jam = total_seconds // 3600
            menit = (total_seconds % 3600) // 60
            detik = total_seconds % 60

            return f"{jam:02}:{menit:02}:{detik:02}"

        item["waktu_mulai_asli"] = format_time_iso(item["waktu_mulai"])
        item["waktu_selesai_asli"] = format_time_iso(item["waktu_selesai"])

        item["waktu_mulai"] = format_waktu(item["waktu_mulai"])
        item["waktu_selesai"] = format_waktu(item["waktu_selesai"])

    cursor.close()
    conn.close()

    return jsonify({
        "data": data,
        "page": page,
        "limit": limit,
        "total": total,
        "total_page": max(1, ceil(total / limit))
    })

#Untuk form tambah seminar
@app.route("/data-seminar", methods=["POST"])
def tambah_seminar():
    data = request.json
    
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO seminar(
            id_mahasiswa,
            id_user_admin,
            id_lokasi,
            judul_penelitian,
            tanggal,
            waktu_mulai,
            waktu_selesai,
            dosen_pembimbing,
            dosen_penguji_1,
            dosen_penguji_2
        )
        VALUES(
            %s,%s,%s,%s,%s,%s,%s,%s,%s,%s
        )
    """,(
        data["id_mahasiswa"],
        data["id_user_admin"],
        data["id_lokasi"],
        data["judul_penelitian"],
        data["tanggal"],
        data["waktu_mulai"],
        data["waktu_selesai"],
        data["dosen_pembimbing"],
        data["dosen_penguji_1"],
        data["dosen_penguji_2"]
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Berhasil"})

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

    #Pagination
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    offset = (page - 1) * limit

    #Search
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

    #Mengambil data QR Code dari frontend
    data = request.get_json()

    qr_token = data.get("qr_code")

    latitude = data.get("latitude")
    longitude = data.get("longitude")

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
        cursor = conn.cursor(dictionary=True, buffered=True)

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
        
        cursor.execute("""
            SELECT
                l.latitude,
                l.longitude,
                l.radius
            FROM seminar s
            JOIN lokasi_seminar l
                ON s.id_lokasi = l.id_lokasi
            WHERE s.id_seminar = %s
        """, (qr_payload["id_seminar"],))

        lokasi = cursor.fetchone()
        
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
        
        if lokasi is None:
            cursor.close()
            conn.close()

            return jsonify({
                "success": False,
                "message": "Lokasi seminar tidak ditemukan"
            }), 404
        
        jarak = hitung_jarak(
            float(latitude),
            float(longitude),
            float(lokasi["latitude"]),
            float(lokasi["longitude"])
        )

        if jarak > lokasi["radius"]:
            cursor.close()
            conn.close()

            return jsonify({
                "success": False,
                "code": "OUT_OF_RADIUS",
                "message": "Anda berada di luar area seminar",
                "distance": round(jarak, 2),
                "radius": lokasi["radius"]
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
            latitude,
            longitude
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
    
#Menghubungkan data di halaman seminar saya (Penyelenggara)
@app.route("/detail-seminar/<int:id_user>")
def detail_seminar(id_user):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT
            s.*,
            m.nama,
            m.nim,
            m.angkatan,
            l.nama_lokasi,
            l.latitude,
            l.longitude,
            l.radius
        FROM seminar s
        JOIN mahasiswa m
            ON s.id_mahasiswa = m.id_user
        LEFT JOIN lokasi_seminar l
            ON s.id_lokasi = l.id_lokasi
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
from flask import Flask, request, jsonify
from flask_cors import CORS
from config import get_db_connection

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend Flask Berjalan!"

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT *
        FROM users
        WHERE username = %s
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
    
    return jsonify({
        "success": True,
        "user": {
            "id_user": user["id_user"],
            "username": user["username"],
            "role": user["role"]
        }
    })


if __name__ == "__main__":
    app.run(debug=True)
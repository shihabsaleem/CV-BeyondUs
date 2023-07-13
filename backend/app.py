from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_bcrypt import Bcrypt

from pyresparser import ResumeParser

import os
from models import db, User

app = Flask(__name__)
CORS(app)

# database configurations
app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

bcrypt = Bcrypt(app)
db.init_app(app)

with app.app_context():
    db.create_all()


def extract_resume_information(resume_path):
    parser = ResumeParser(resume_path)
    data = parser.get_extracted_data()
    return data

@app.route('/')
def index():
    return 'Server is running...'


@app.route('/signup', methods=['POST'])
def signup():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({
            "message": "User already exists"
        })
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session['user_id'] = new_user.id


    return jsonify({
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email
    })

@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "message": "User does not exist"
        })
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({
            "message": "Incorrect password"
        })

    session['user_id'] = user.id

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    })

@app.route('/logout')
def logout():
    session.clear()
    return jsonify({
        "message": "Logged out successfully"
    })

@app.route('/user', methods=['POST'])
def get_user():
    user_id = request.json.get('user_id')

    if not user_id:
        return jsonify({
            "message": "User ID not provided"
        }), 400

    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify({
        "username": user.username
    })


@app.route('/extract_resume', methods=['POST'])
def process_resume():
    resume_file = request.files['resume']
    resume_filename = resume_file.filename
    resume_path = os.path.join(app.root_path, resume_filename)
    resume_file.save(resume_path)
    resume_data = extract_resume_information(resume_path)
    os.remove(resume_path)  # Delete the temporary file

    return jsonify(resume_data)

if __name__ == '__main__':
    app.run(debug=True)

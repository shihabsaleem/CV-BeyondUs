from flask import Flask, request, jsonify
from flask_cors import CORS
from pyresparser import ResumeParser
import os

app = Flask(__name__)
CORS(app)


def extract_resume_information(resume_path):
    parser = ResumeParser(resume_path)
    data = parser.get_extracted_data()
    return data

@app.route('/')
def index():
    return 'Server is running...'

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

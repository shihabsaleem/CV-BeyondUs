from flask import Flask, render_template, request
from pyresparser import ResumeParser
import os

app = Flask(__name__)

def extract_resume_information(resume_path):
    parser = ResumeParser(resume_path)
    data = parser.get_extracted_data()
    print(data)
    return data

@app.route('/', methods=['GET', 'POST'])
def upload_resume():
    if request.method == 'POST':
        resume_file = request.files['resume']
        resume_filename = resume_file.filename
        resume_path = os.path.join(app.root_path, resume_filename)
        resume_file.save(resume_path)
        return render_template('upload_resume.html')
    return render_template('upload_resume.html')

@app.route('/extract_resume', methods=['POST'])
def process_resume():
    resume_file = request.files['resume']
    resume_filename = resume_file.filename
    resume_path = os.path.join(app.root_path, resume_filename)
    resume_file.save(resume_path)
    resume_data = extract_resume_information(resume_path)
    return render_template('resume.html', resume_data=resume_data)

if __name__ == '__main__':
    app.run(debug=True)

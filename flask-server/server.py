from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
  return {
    "data": [
      {
        "name": "Chunni",
        "email": "chunni@example.com",
        "mobNo": "1234567890",
        "gender": "Male",
        "qualification": "Bachelor of Science",
        "college": "XYZ College",
        "branch": "Computer Science",
        "graduationYear": "2022",
        "skills": ['HTML', 'CSS', 'JavaScript'],
      },
    ]
  }

if __name__ == "__main__":
  app.run(debug=True)
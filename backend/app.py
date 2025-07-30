from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file and file.filename.endswith('.txt'):
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        return jsonify({'content': content})
    return 'Invalid file', 400

@app.route('/save', methods=['POST'])
def save_content():
    data = request.json
    filename = data['filename']
    content = data['content']
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    return jsonify({'message': 'File saved successfully!'})

if __name__ == '__main__':
    app.run(debug=True)

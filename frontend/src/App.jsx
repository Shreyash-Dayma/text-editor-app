import React, { useState } from 'react';
import TextEditor from './components/TextEditor';
import axios from 'axios';
import './App.css'; // <-- Add this

function App() {
  const [filename, setFilename] = useState('');
  const [content, setContent] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setFilename(file.name);
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post('http://localhost:5000/upload', formData);
    setContent(res.data.content);
    setIsLoaded(true);
  };

  const handleSave = async (newContent) => {
    await axios.post('http://localhost:5000/save', {
      filename,
      content: newContent,
    });
    alert('File saved successfully!');
  };

  return (
    <div className="app-container">
      <h2>📝 TXT File Editor</h2>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      {isLoaded && (
        <TextEditor content={content} onSave={handleSave} filename={filename} />
      )}
    </div>
  );
}

export default App;

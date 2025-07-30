import React, { useState, useEffect } from 'react';

const TextEditor = ({ content, onSave, filename }) => {
  const [text, setText] = useState(content);

  useEffect(() => {
    setText(content);
  }, [content]);

  // Insert markdown-style tags around selected text
  const insertAroundSelection = (left, right = '') => {
    const textarea = document.getElementById('editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);

    const updatedText =
      text.substring(0, start) + left + selectedText + right + text.substring(end);

    setText(updatedText);

    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + left.length, end + left.length);
    }, 0);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = filename || 'edited.txt';
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📝 Text Editor</h2>
      <p style={styles.subtext}>
        Upload, edit, and download .txt files with markdown-style formatting
      </p>

      {/* Toolbar Buttons */}
      <div style={styles.toolbar}>
        <button onClick={() => insertAroundSelection('**', '**')}>B</button>
        <button onClick={() => insertAroundSelection('_', '_')}>I</button>
        <button onClick={() => insertAroundSelection('__', '__')}>U</button>
        <button onClick={() => insertAroundSelection('### ')}>H1</button>
        <button onClick={() => insertAroundSelection('#### ')}>H2</button>
        <button onClick={() => insertAroundSelection('- ')}>List</button>
        <button onClick={() => insertAroundSelection('```', '```')}>Code</button>
        <button onClick={() => setText(content)}>Reset</button>
      </div>

      {/* Textarea Editor */}
      <textarea
        id="editor"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={20}
        style={styles.textarea}
        placeholder="Edit your file here..."
      />

      {/* Save & Download */}
      <div style={{ marginTop: '10px' }}>
        <button style={styles.primaryButton} onClick={() => onSave(text)}>💾 Save</button>
        <button style={styles.secondaryButton} onClick={handleDownload}>⬇ Download</button>
      </div>

      {/* Preview Block */}
      <div style={styles.previewContainer}>
        <h4>Preview:</h4>
        <pre style={styles.previewBox}>{text}</pre>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  heading: {
    color: '#2c3e50',
    marginBottom: '5px',
  },
  subtext: {
    color: '#555',
    marginBottom: '20px',
  },
  toolbar: {
    marginBottom: '10px',
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  textarea: {
    width: '100%',
    fontFamily: 'monospace',
    fontSize: '16px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6',
  },
  primaryButton: {
    padding: '10px 20px',
    marginRight: '10px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  secondaryButton: {
    padding: '10px 20px',
    backgroundColor: '#18bc9c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  previewContainer: {
    marginTop: '30px',
  },
  previewBox: {
    backgroundColor: '#f6f8fa',
    padding: '10px',
    borderRadius: '5px',
    whiteSpace: 'pre-wrap',
    border: '1px solid #e1e4e8',
  },
};

export default TextEditor;

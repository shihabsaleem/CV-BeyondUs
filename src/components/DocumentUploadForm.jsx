import React, { useState } from 'react';
import "./DocumentUploadForm.css"

const DocumentUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the file upload here
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      // You can use APIs like fetch or axios to send the file to the server
      // Example using fetch:
      const formData = new FormData();
      formData.append('document', selectedFile);
      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          // Handle the response from the server
          console.log('Upload successful:', response);
        })
        .catch((error) => {
          // Handle errors
          console.error('Upload failed:', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="document">Select a document to upload:</label>
      <input
        type="file"
        id="document"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default DocumentUploadForm;

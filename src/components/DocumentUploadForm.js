import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./DocumentUploadForm.css";

const DocumentUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the file upload here
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      // You can use APIs like fetch or axios to send the file to the server
      // Example using fetch:
      const formData = new FormData();
      formData.append("document", selectedFile);
      fetch("/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          // Handle the response from the server
          console.log("Upload successful:", response);
        })
        .catch((error) => {
          // Handle errors
          console.error("Upload failed:", error);
        });
    }
  };

  return (
    <Card variant="outlined" className="document-upload-card">
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Validate Resume
        </Typography>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            id="contained-button-file"
            style={{ display: "none" }}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Select Document
            </Button>
          </label>
          {selectedFile && (
            <Typography variant="body1" gutterBottom>
              Selected File: {selectedFile.name}
            </Typography>
          )}
          
          <Button
            type="submit"
            variant="contained"
            disabled={!selectedFile}
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadForm;

import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Detailed from "./Detailed";
import "./DocumentUploadForm.css";
import "../Styles/home.scss";

const DocumentUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      const formData = new FormData();
      formData.append("resume", selectedFile);
      try {
        const response = await fetch("http://localhost:5000/extract_resume", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Resume data:", data);
          setParsedData(data); // Set the parsed data in state
          window.alert("Upload complete!"); // Display an alert when upload is complete
        } else {
          console.error("Failed to extract resume data");
        }
      } catch (error) {
        console.error("Error during resume extraction:", error);
      }
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
      {parsedData && 
      <div className="right">
        <Detailed data={parsedData} />
      </div>} {/* Render the Detailed component when parsedData is available */}
    </Card>
  );
};

export default DocumentUploadForm;

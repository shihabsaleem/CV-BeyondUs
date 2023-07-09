import React, { useState } from "react";
import { Box, Button, CircularProgress, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import * as XLSX from "xlsx"; // Import the XLSX library


function Detailed({ data }) {
  const [fileFormat, setFileFormat] = useState("");
  const [downloadProgress, setDownloadProgress] = useState(0);

  const generateXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    console.log('worksheet', worksheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Resume");
    const xlsxBlob = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    return new Blob([xlsxBlob], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  };

  const handleDownload = () => {
      console.log("handleDownload");
      const xlsxBlob = generateXLSX();
      const downloadUrl = URL.createObjectURL(xlsxBlob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "resume.xlsx";

      link.style.display = "none";
      document.body.appendChild(link);

      const downloadInterval = setInterval(() => {
        setDownloadProgress((prevProgress) => prevProgress + 10);
      }, 1000);

      link.click();
      clearInterval(downloadInterval);
      setDownloadProgress(100);

      setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(link);
        setDownloadProgress(0);
      }, 2000);
    };


  return (
    <Box>
      <Typography variant="h4" component="h2" align="center">
        Data Extracted
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        {data ? (
          <Grid item xs={12} sm={8} md={6}>
            <List>
              <ListItem>
                <ListItemText primary={`Name: ${data.name}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Email: ${data.email}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Phone No: ${data.mobile_number}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Name of College: ${data.college_name}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Degree: ${data.degree}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Designation: ${data.designation}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Experience: ${data.experience}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Name of Company Previously Worked: ${data.company_names}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`No. of Pages: ${data.no_of_pages}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Skills: ${data.skills.join(", ")}`} />
              </ListItem>
            </List>
          </Grid>
        ) : (
          <Typography align="center">No data available</Typography>
        )}
      </Grid>
      <Box mt={2} display="flex" justifyContent="center">
        {/* {downloadProgress > 0 ? (
          <CircularProgress variant="determinate" value={downloadProgress} />
        ) : (
          <Button variant="contained" onClick={handleDownload}>
            Download XLSX
          </Button>
        )} */}
      </Box>
    </Box>
  );
}

export default Detailed;

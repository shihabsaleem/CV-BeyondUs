import React, { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

function Detailed() {
  const [data, setData] = useState(null);

  const handleClick = () => {
    const newData = {
      name: "abc",
      email: "abc@example.com",
      mobNo: "1234567890",
      gender: "Male",
      qualification: "Bachelor of Science",
      college: "XYZ College",
      branch: "Computer Science",
      graduationYear: "2022",
      skills: ["HTML", "CSS", "JavaScript"],
    };

    setData(newData);
  };

  return (
    <Box>
      <Typography variant="h4" component="h2">
        Data Extracted
      </Typography>
      {data ? (
        <List>
          <ListItem>
            <ListItemText primary={`Name: ${data.name}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Email: ${data.email}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Mob No: ${data.mobNo}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Gender: ${data.gender}`} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Highest Qualification: ${data.qualification}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={`College: ${data.college}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Branch: ${data.branch}`} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Year of Graduation: ${data.graduationYear}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Skills: ${data.skills.join(", ")}`} />
          </ListItem>
        </List>
      ) : (
        <Typography>No data available</Typography>
      )}
      <Button variant="contained" onClick={handleClick}>
        Load Data
      </Button>
    </Box>
  );
}

export default Detailed;

import React from "react";
import Navbar from "../Components/Navbar"
import FilesUp from "../Components/DocumentUploadForm";
import Footer from "../Components/Footer"

function Home() {
  return (
    <div>
      <Navbar/>
      <FilesUp />
      <Footer/>
      
    </div>
  );
}

export default Home;

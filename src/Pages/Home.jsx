import React from "react";
import Navbar from "../components/Navbar";
import FilesUp from "../components/DocumentUploadForm";
import Detailed from "../components/Detailed";
import Footer from "../components/Footer";
import "../Styles/home.scss";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="left">
          <FilesUp />
        </div>
        <div className="right">
          <Detailed />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const MainPageLayout = ({ children }) => {
    return (
      <div>
        <Navbar />
        {children}
        <Footer />
      </div>
    );
  };

export default MainPageLayout;
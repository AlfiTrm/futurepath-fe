import React from "react";
import Footer from "../layout/Footer";
import LandingNavbar from "../layout/LandingNavbar";

const LandingPageLayout = ({ children }) => {
    return (
        <div>
            <LandingNavbar/>
            {children}
            <Footer />
        </div>
    )
}

export default LandingPageLayout;

import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./Login";
import { LogoutButton } from "./Logout";
import { Profile } from "./Profile";
import TalentsTrade_logo from "./TalentsTrade_logo.png";
import "./App.css";

import Header from "./Components/Header";
import Header2 from "./Components/Header2";

import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import Portfolio from "./Components/Portfolio";

function App() {
  const { isAuthenticated } = useAuth0();
  const [resumeData, setResumeData] = useState({});

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch("./resumeData.json");
        const data = await response.json();
        setResumeData(data);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };

    fetchResumeData();
  }, []);

  
  return (
    <div className="App">
      
      {isAuthenticated ? (
        
            <Header2/>
            
        ) : (
          <div className="custom2">
          <Header  />
          <About  />
          <Contact />
          <Footer />  
      </div>
        )}  

      <Profile />
    </div>
  );
}

export default App;
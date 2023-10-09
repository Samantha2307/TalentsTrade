import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Profile } from "./Profile";
import "./App.css";

import Header from "./Components/Header";
import Header2 from "./Components/Header2";

import Footer from "./Components/Footer";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Chat from "./Components/Chat";


function App() {
  const { isAuthenticated } = useAuth0();
  const [resumeData, setResumeData] = useState({});
  const [chatAbierto, setChatAbierto] = useState(false);

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

  const abrirChat = () => {
    setChatAbierto(prevState => !prevState); // Toggle entre abierto y cerrado
  };  

  const cerrarChat = () => {
    setChatAbierto(false);
  };
  
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
      

      
      <button onClick={abrirChat} className="chat-button">Chatea!</button>
      {chatAbierto && <Chat chatAbierto={chatAbierto} />}

    </div>
  );
}

export default App;
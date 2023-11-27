import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Profile } from "./Profile";
import "./App.css";

import Header from "./Components/Header";
import Header2 from "./Components/Header2";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Chat from "./Components/Chat";
import Explorar from "./Components/Explorar";
import Conversacion from './Components/Conversacion';
import FormularioReserva from './Components/ReservaForm';
import MisReservas from './Components/MisReservas';
import Solicitudes from './Components/Solicitudes';

function App() {
  const { isAuthenticated } = useAuth0();
  //const [resumeData, setResumeData] = useState({});
  const [chatAbierto, setChatAbierto] = useState(false);

  useEffect(() => {
    /*const fetchResumeData = async () => {
      try {
        const response = await fetch("./resumeData.json");
        const data = await response.json();
        setResumeData(data);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };

    fetchResumeData();*/
  }, []);

  const abrirChat = () => {
    setChatAbierto((prevState) => !prevState); // Toggle entre abierto y cerrado
  };

  const cerrarChat = () => {
    setChatAbierto(false);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <Header2 />
        ) : (
          <div className="custom2">
            <Header />
            <About />
            <Contact />
            <Footer />
          </div>
        )}

        {/* Mueve el componente Profile dentro del Routes */}
        <Routes>
          <Route path="/Explorar" element={<Explorar />} />
          <Route path="/Reservar/:usuarioId" element={<FormularioReserva />} />
          <Route path="/" element={<Profile />} />
          <Route path="/Conversacion/:receptor" element={<Conversacion/>} />
          <Route path="/MisReservas" element={<MisReservas />} />
          <Route path="/Solicitudes" element={<Solicitudes />} />
        </Routes>

        <button onClick={abrirChat} className="chat-button">
          Chatea!
        </button>
        {chatAbierto && <Chat chatAbierto={chatAbierto} />}
      </div>
    </Router>
  );
}

export default App;
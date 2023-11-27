
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Mensajeria from './Mensajeria';
import Profile from '../Profile';
import '../Styles/Mensajeria.css';

const Conversacion = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const emisorMailConnect= user.email;
  const { receptor } = useParams();
  const [emailReceptor, setEmailReceptor] = useState('');
  const [emisordef, setEmisor] = useState('');
  const [emisorID, setEmisorID] = useState('');
  const [receptordef, setReceptor] = useState('');
  const [emailEmisorCC, setEmailEmisorCC] = useState('');

  const handleEmailLoaded = (email) => {
    setEmailEmisorCC(email);
  };

  useEffect(() => {
    
    const obtenerNombreReceptor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/usuarios/${receptor}`);
        if (!response.ok) {
          console.error('Error al obtener detalles del usuario RECEPTOR. Status:', response.status);
          return;
        }
        const data = await response.json();
        setEmailReceptor(data.email); // Ajusta esto según la estructura de tu respuesta
      } catch (error) {
        console.error('Error al obtener detalles del usuario RECEPTOR', error);
      }
    };

    const obtenerIDEmisorByEmail = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/usuariosBymail/${emailEmisorCC}`);
          if (!response.ok) {
            console.error('Error al obtener detalles del usuario EMISOR. Status:', response.status);
            return;
          }
          const data = await response.json();
          setEmisorID(data.id);
        } catch (error) {
          console.error('Error al obtener detalles del usuario EMISOR', error);
        }
      };

    const obtenerEmisor = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/usuarios/${emisorID}`);
          if (!response.ok) {
            console.error('Error al obtener detalles del usuario EMISOR. Status:', response.status);
            return;
          }
          const data = await response.json();
          setEmisor(data);
        } catch (error) {
          console.error('Error al obtener detalles del usuario EMISOR', error);
        }
      };

      const obtenerReceptor = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/usuarios/${receptor}`);
          if (!response.ok) {
            console.error('Error al obtener detalles del usuario RECEPTOR. Status:', response.status);
            return;
          }
          const data = await response.json();
          setReceptor(data); // Ajusta esto según la estructura de tu respuesta
        } catch (error) {
          console.error('Error al obtener detalles del usuario RECEPTOR', error);
        }
      };

      obtenerReceptor();
    obtenerEmisor();
    obtenerNombreReceptor();
    obtenerIDEmisorByEmail();
  }, [receptor, emailEmisorCC]);
  return (
    <div>
        <Profile onEmailLoaded={handleEmailLoaded} />
      <h2 id= "encabezado-conversacion">Conversación con {emailReceptor}</h2>
      <Mensajeria emisor={emisordef} receptor={receptordef} emisorID = {"655271af666048602f354f7c"} receptorID ={receptor} />
    </div>
  );
};

export default Conversacion;

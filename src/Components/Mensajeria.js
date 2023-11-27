import React, { useState, useEffect } from 'react';
import '../Styles/Mensajeria.css';

const { Types: { ObjectId } } = require('mongoose');// Importa tu archivo de estilos CSS

const Mensajeria = ({ emisor, receptor, emisorID,receptorID }) => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  useEffect(() => {
    // Lógica para cargar mensajes entre emisor y receptor desde el servidor
    // Puedes usar fetch o cualquier librería para hacer solicitudes HTTP

    const cargarMensajes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/mensajes/${emisorID}/${receptorID}`);
        if (response.ok) {
          const data = await response.json();
          setMensajes(data);
        } else {
          console.error('Error al cargar mensajes. Status:', response.status);
        }
      } catch (error) {
        console.error('Error al cargar mensajes:', error);
      }
    };

    cargarMensajes();
  }, [emisorID, receptorID]);

  const enviarMensaje = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mensajes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emisor,
          receptor,
          contenido: nuevoMensaje,
        }),
      });

      if (response.ok) {
        const nuevoMensajeEnviado = await response.json();
        setMensajes([...mensajes, nuevoMensajeEnviado]);
        setNuevoMensaje(''); // Limpiar el campo de texto después de enviar el mensaje
      } else {
        console.error('Error al enviar mensaje. Status:', response.status);
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };
  
  return (
    <div className="mensajeria-container">
      <div className="mensajes-lista">
        {mensajes.map((mensaje) => (
          <div key={mensaje._id} id={mensaje.emisor === emisor ? 'mensaje-emisor' : 'mensaje-receptor'}>
            <p className="correo-emisor">{mensaje.emisor.email}: </p>
            <p>{mensaje.contenido}</p>
          </div>
        ))}
      </div>
      <div id="formulario-mensaje">
        <textarea 
          rows="3"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
};

export default Mensajeria;
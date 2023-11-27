// MisReservas.js

import React, { useState, useEffect } from 'react';
import '../Styles/ReservaForm.css';

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {

    const obtenerReservas = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/reservas"); // Reemplazar con tu lógica real
          const data = await response.json();
          setReservas(data);
        } catch (error) {
          console.error("Error al obtener reservas:", error);
        }
      };
    obtenerReservas();
  }, []); // Se ejecutará solo una vez al montar el componente

  return (
    <div>
      <h2 style={{color:'white'}}>MIS SOLICITUDES</h2>
      {reservas.map((reserva) => (
        <div key={reserva._id} className="tarjeta-reserva">
          <div>
            <h3>{reserva.nombreReserva}</h3>
            <p style={{color:'green'}}>Fecha: <p style={{color:'black'}}>28 - 11 - 2023</p></p>
            <p style={{color:'green'}}>Servicio de Interés: <p style={{color:'black'}}>{reserva.servicioInteres}</p></p>
            <p style={{color:'green'}}>Servicio Ofrecido: <p style={{color:'black'}}>{reserva.servicioOfrecido}</p></p>
            <p style={{color:'green'}}>Teléfono de Contacto: <p style={{color:'black'}}>{reserva.telefonoContacto}</p></p>
            <p style={{color:'green'}}>Tipo: <p style={{color:'black'}}>{reserva.tipo}</p></p>
            <p style={{color:'green'}}>Nota: <p style={{color:'black'}}>{reserva.notas}</p></p>
            <p style={{color:'green'}}>Estado: <p style={{color:'black'}}>{reserva.estado}</p></p>
          </div>
          <div>
            <button className="btn-aceptar">ACEPTAR</button>
            <button className="btn-rechazar">RECHAZAR</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MisReservas;
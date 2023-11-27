// MisReservas.js

import React, { useState, useEffect } from 'react';

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    // Aquí realizar una solicitud al servidor para obtener las reservas del usuario
    // Puedes usar fetch o tu librería de manejo de estado para obtener los datos

    const obtenerReservas = async () => {
      try {
        const response = await fetch('/api/reservas/usuario', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Puedes agregar cualquier información adicional necesaria en los headers o el body
        });

        if (response.ok) {
          const data = await response.json();
          setReservas(data);
        } else {
          console.error('Error al obtener reservas');
        }
      } catch (error) {
        console.error('Error al procesar la solicitud:', error);
      }
    };

    obtenerReservas();
  }, []); // Se ejecutará solo una vez al montar el componente

  return (
    <div>
      <h2 style={{color:'white'}}>MIS RESERVAS</h2>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva._id}>
            {reserva.nombreReserva} - {reserva.fecha}

            <button>ACEPTAR</button>
            <button>RECHAZAR</button>

            {/*<button onClick={() => handleAceptarReserva(reserva._id)}>ACEPTAR</button>
            <button onClick={() => handleRechazarReserva(reserva._id)}>RECHAZAR</button>*/}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MisReservas;
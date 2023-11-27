import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/ReservaForm.css'; 

const ReservaForm = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    nombreReserva: '',
    telefonoContacto: '',
    servicioInteres: '',
    servicioOfrecido: '',
    notas: '',
    tipo: 'Presencial', // Valor predeterminado
  });

  const { usuarioId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Aquí debes enviar los datos al servidor para almacenar la reserva en la base de datos
    try {
      const response = await fetch('/api/reservas/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, usuarioId }),
      });

      if (response.ok) {
        console.log("SE REGISTRO A RESERVA");
      } else {
        // Manejo de errores si la solicitud no fue exitosa
        console.error('Error al guardar la reserva');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  return (
    <div>
      <h2 style={{color:'white'}}>Formulario de Reserva</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Fecha:
          <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
        </label>

        <label>
          Nombre Completo:
          <input
            type="text"
            name="nombreReserva"
            value={formData.nombreReserva}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Teléfono de Contacto:
          <input
            type="tel"
            name="telefonoContacto"
            value={formData.telefonoContacto}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Servicio de Interés:
          <input
            type="text"
            name="servicioInteres"
            value={formData.servicioInteres}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Servicio Ofrecido a Cambio:
          <input
            type="text"
            name="servicioOfrecido"
            value={formData.servicioOfrecido}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Notas Adicionales:
          <textarea
            name="notas"
            value={formData.notas}
            onChange={handleChange}
          />
        </label>

        <label>
          Tipo de Reserva:
          <select name="tipo" value={formData.tipo} onChange={handleChange}>
            <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
          </select>
        </label>

        <button type="submit">Solicitar Reserva</button>
      </form>
    </div>
  );
};

export default ReservaForm;

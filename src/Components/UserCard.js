import React , { useState } from "react";
import { Link} from 'react-router-dom';
import "../Styles/UserCard.css"; // Importa tu archivo de estilos CSS

const UserCard = ({ usuario, onEnviarMensaje}) => {

    const [receptor, setReceptor] = useState(null);

    const handleEnviarMensaje = () => {
        setReceptor(usuario._id);
      };

  return (
    <div className="user-card">
    <div className="sections">
        <div className="left-section">
        <img src={usuario.picture} alt={`Foto de ${usuario.name}`} />
            <h3>{usuario.name}</h3>
            <p>{usuario.email}</p>
        </div>
        <div className="right-section">
            <h4>Habilidades</h4>
            <ul>
            {usuario.habilidades && usuario.habilidades.length > 0 ? (
                usuario.habilidades.map((habilidad) => (
                <li key={habilidad.id}>{habilidad.nombre}</li>
                ))
            ) : (
                <li>No tiene habilidades</li>
            )}
            </ul>
            <h4>Intereses</h4>
            <ul>
            {usuario.intereses && usuario.intereses.length > 0 ? (
                usuario.intereses.map((interes) => (
                <li key={interes.id}>{interes.nombre}</li>
                ))
            ) : (
                <li>No tiene intereses</li>
            )}
            </ul>
            <h4>Ubicación</h4>
            <p>{usuario.ubicacion}</p>
        </div>
    </div>
      <div className="buttons">
      <Link to={`/Conversacion/${usuario._id}`}>
        <button onClick={handleEnviarMensaje}>Enviar Mensaje</button>
        </Link>
        <Link to={`/Reservar/${usuario._id}`}>
        <button>Reservar</button>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;


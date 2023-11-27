import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import StarRating from "./StarRating";
import "./styles.css";

const MessagePopup = ({ message, onClose }) => {
  return (
    <div className="message-popup">
      <div className={`message ${message === "Datos guardados exitosamente" ? "success" : "error"}`}>
        {message}
        <span className="close" onClick={onClose}>
          &times;
        </span>
      </div>
    </div>
  );
};

export const Profile = ({ onEmailLoaded }) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [intereses, setIntereses] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [interesesSeleccionados, setInteresesSeleccionados] = useState([]);
  const [habilidadesSeleccionadas, setHabilidadesSeleccionadas] = useState([]);
  const [habilidadesUsuario, setHabilidadesUsuario] = useState([]);
  const [message, setMessage] = useState(null);
  const [ubicacion, setUbicacion] = useState('');
  const [email, setEmail] = useState('');

  const handleUbicacionChange = (e) => {
    setUbicacion(e.target.value);
  };

  const handleInterestChange = (e) => {
    const selectedInterestId = e.target.value;
    const selectedInterest = intereses.find((interes) => interes._id === selectedInterestId);
    setInteresesSeleccionados([...interesesSeleccionados, selectedInterest]);
  };

  const handleSkillChange = (e) => {
    const selectedSkillId = e.target.value;
    const selectedSkill = habilidades.find((habilidad) => habilidad._id === selectedSkillId);
    setHabilidadesSeleccionadas([...habilidadesSeleccionadas, selectedSkill]);
  };

  const handleRemoveInterest = (index) => {
    const updatedInteresesSeleccionados = [...interesesSeleccionados];
    updatedInteresesSeleccionados.splice(index, 1);
    setInteresesSeleccionados(updatedInteresesSeleccionados);
  };

  const handleRemoveHabilidad = (index) => {
    const updatedHabilidadesSeleccionadas = [...habilidadesSeleccionadas];
    updatedHabilidadesSeleccionadas.splice(index, 1);
    setHabilidadesSeleccionadas(updatedHabilidadesSeleccionadas);
  };

  const handleSave = async () => {
    try {
      if (!isAuthenticated) {
        console.error("Usuario no autenticado");
        return;
      }

      // Obtener objetos completos de intereses seleccionados
      const interesesCompletos = interesesSeleccionados.map(({ _id, nombre }) => ({ _id, nombre }));
      const habilidadesCompletas = habilidadesSeleccionadas.map(({ _id, nombre }) => ({ _id, nombre }));
      const userEmail = user.email;

      // Guardar habilidades seleccionadas en la base de datos
      const accessToken = await getAccessTokenSilently();
      const response = await fetch("http://localhost:5000/api/save-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ intereses: interesesCompletos, habilidades: habilidadesCompletas, usuario: userEmail,ubicacion:ubicacion}),
      });

      // Maneja la respuesta del servidor si es necesario
      const data = await response.json();
      
      setMessage("Datos guardados exitosamente");
    } catch (error) {
      console.error("Error al guardar datos:", error);
      setMessage("Error al guardar datos");
    }

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  useEffect(() => {

    /*if (user) {
      onEmailLoaded=user.email;
      console.log(onEmailLoaded);
    }*/

    const fetchIntereses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/intereses");
        if (!response.ok) {
          console.error("Error al obtener intereses. Status:", response.status);
          return;
        }
        const data = await response.json();
        setIntereses(data);
      } catch (error) {
        console.error("Error al obtener intereses", error);
      }
    };

    const fetchHabilidades = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/habilidades");
        if (!response.ok) {
          console.error("Error al obtener habilidades. Status:", response.status);
          return;
        }
        const data = await response.json();
        setHabilidades(data);
      } catch (error) {
        console.error("Error al obtener habilidades", error);
      }
    };

    const fetchHabilidadesUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/habilidades-usuario?usuario=${user.email}`);
        if (!response.ok) {
          console.error("Error al obtener habilidades del usuario. Status:", response.status);
          return;
        }
        const data = await response.json();
        const habilidadesCompletas = data.map(async (habilidadesUsuario) => {
          if (habilidadesUsuario) {
            const responseHabilidad = await fetch(`http://localhost:5000/api/habilidades/${habilidadesUsuario}`);
            if (!responseHabilidad.ok) {
              console.error("Error al obtener la habilidad. Status:", responseHabilidad.status);
              return null;
            }
            const dataHabilidad = await responseHabilidad.json();
            return { _id: dataHabilidad._id, nombre: dataHabilidad.nombre };
          }
          return null;
        });
    
        // Filtrar los intereses completos que no son nulos
        const habilidadesFiltradas = (await Promise.all(habilidadesCompletas)).filter((habilidad) => habilidad !== null);
    
        setHabilidadesSeleccionadas(habilidadesFiltradas);
      } catch (error) {
        console.error("Error al obtener habilidades del usuario", error);
      }
    };

    const fetchInteresesUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/intereses-usuario?usuario=${user.email}`);
        if (!response.ok) {
          console.error("Error al obtener intereses del usuario. Status:", response.status);
          return;
        }
        const data = await response.json();
        const interesesCompletos = data.map(async (interesUsuario) => {
          if (interesUsuario) {
            const responseInteres = await fetch(`http://localhost:5000/api/intereses/${interesUsuario}`);
            if (!responseInteres.ok) {
              console.error("Error al obtener el interés. Status:", responseInteres.status);
              return null;
            }
            const dataInteres = await responseInteres.json();
            return { _id: dataInteres._id, nombre: dataInteres.nombre };
          }
          return null;
        });
    
        // Filtrar los intereses completos que no son nulos
        const interesesFiltrados = (await Promise.all(interesesCompletos)).filter((interes) => interes !== null);
    
        setInteresesSeleccionados(interesesFiltrados);
      } catch (error) {
        console.error("Error al obtener intereses del usuario", error);
      }
    };
    
    const fetchUbicacionUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/ubicacion-usuario?usuario=${user.email}`);
        if (!response.ok) {
          console.error("Error al obtener ubicacion del usuario. Status:", response.status);
          return;
        }
        const data = await response.json();
        setUbicacion(data);
      } catch (error) {
        console.error("Error al obtener ubicacion del usuario", error);
      }
    };
        
    fetchUbicacionUsuario();
    fetchIntereses();
    fetchHabilidades();
    fetchHabilidadesUsuario();
    fetchInteresesUsuario();
  }, [getAccessTokenSilently, isAuthenticated,user,onEmailLoaded]);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      
      <div id="about">
        <div className="three columns">
          <img className="profile-pic" src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <StarRating rating={3} />
          <div>
  <label>Ubicación:</label>
  <input type="text" value={ubicacion} onChange={handleUbicacionChange} />
</div>
        </div>

        <div className="nine columns">
          <div className="card">
            <div>
              <h2>INTERESES</h2>
              <p>Cuéntale a las personas cuáles son las áreas que te interesan</p>
              <div className="custom">
                <select onChange={handleInterestChange} className="main-col">
                  <option value="">Selecciona un interés...</option>
                  {intereses.map((interes) => (
                    <option key={interes._id} value={interes._id}>
                      {interes.nombre}
                    </option>
                  ))}
                </select>
                <div>
                  <span>Intereses seleccionados:</span>
                  <ul>
                    {interesesSeleccionados.map((interes, index) => (
                      <li key={index} >
                        {interes.nombre}{" "}
                        <span
                          className="close_"
                          onClick={() => handleRemoveInterest(index)}
                        >
                          X
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card text-dark bg-light rounded p-3 !important">
            <div className="card-body">
              <h2 className="card-title">HABILIDADES</h2>
              <p>
                Dale a las personas información para que puedan requerir tus
                servicios
              </p>
              <div className="custom">
                <select onChange={handleSkillChange} className="main-col">
                  <option value="">Selecciona una habilidad...</option>
                  {habilidades.map((habilidad) => (
                    <option key={habilidad._id} value={habilidad._id}>
                      {habilidad.nombre}
                    </option>
                  ))}
                </select>
                <div>
                  <span>Habilidades seleccionadas:</span>
                  <ul>
                    {habilidadesSeleccionadas.map((habilidad, index) => (
                      <li key={index}>
                        {habilidad.nombre}{" "}
                        <span
                          className="remove"
                          onClick={() => handleRemoveHabilidad(index)}
                        >
                          X
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <button className="submit" onClick={handleSave}>
            Guardar datos
          </button>
          {message && (
          <MessagePopup message={message} onClose={() => setMessage(null)} />
        )}
        </div>
      </div>
      
    )
  );
};

export default Profile;



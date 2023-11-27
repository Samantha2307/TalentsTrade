import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import "../Styles/Explorar.css";

const Explorar = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("all");
  const [habilidadesSeleccionadas, setHabilidadesSeleccionadas] = useState([]);
  const [interesesSeleccionados, setInteresesSeleccionados] = useState([]);
  const [opcionesHabilidades, setOpcionesHabilidades] = useState([]); 
  const [opcionesIntereses, setOpcionesIntereses] = useState([]);

  useEffect(() => {
    const obtenerHabilidadesUsuario = async (usuarioId) => {
        try {
          const response = await fetch(`http://localhost:5000/api/habilidades-usuario?usuario=${usuarioId}`);
          if (!response.ok) {
            console.error("Error al obtener habilidades del usuario. Status:", response.status);
            return [];
          }
          const data = await response.json();
          const habilidadesCompletas = data.map(async (habilidadUsuario) => {
            const responseHabilidad = await fetch(`http://localhost:5000/api/habilidades/${habilidadUsuario}`);
            if (!responseHabilidad.ok) {
              console.error("Error al obtener la habilidad. Status:", responseHabilidad.status);
              return null;
            }
            const dataHabilidad = await responseHabilidad.json();
            return { _id: dataHabilidad._id, nombre: dataHabilidad.nombre };
          });
      
          // Filtrar las habilidades completas que no son nulas
          const habilidadesUsuario = (await Promise.all(habilidadesCompletas)).filter((habilidad) => habilidad !== null);
      
          return habilidadesUsuario;
        } catch (error) {
          console.error("Error al obtener habilidades del usuario", error);
          return [];
        }
      };
      
      const obtenerInteresesUsuario = async (usuarioId) => {
        try {
          const response = await fetch(`http://localhost:5000/api/intereses-usuario?usuario=${usuarioId}`);
          if (!response.ok) {
            console.error("Error al obtener intereses del usuario. Status:", response.status);
            return [];
          }
          const data = await response.json();
          const interesesCompletos = data.map(async (interesUsuario) => {
            const responseInteres = await fetch(`http://localhost:5000/api/intereses/${interesUsuario}`);
            if (!responseInteres.ok) {
              console.error("Error al obtener el interés. Status:", responseInteres.status);
              return null;
            }
            const dataInteres = await responseInteres.json();
            return { _id: dataInteres._id, nombre: dataInteres.nombre };
          });
      
          // Filtrar los intereses completos que no son nulos
          const interesesUsuario = (await Promise.all(interesesCompletos)).filter((interes) => interes !== null);
      
          return interesesUsuario;
        } catch (error) {
          console.error("Error al obtener intereses del usuario", error);
          return [];
        }
      };
      

    const obtenerUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/usuarios");
        const data = await response.json();
        console.log(data);

        const usuariosConHabilidadesIntereses = await Promise.all(
          data.map(async (usuario) => {
            const habilidades = await obtenerHabilidadesUsuario(usuario.email);
            const intereses = await obtenerInteresesUsuario(usuario.email);
            return { ...usuario, habilidades, intereses };
          })
        );

        console.log("Usuarios con habilidades e intereses:", usuariosConHabilidadesIntereses);
        setUsuarios(usuariosConHabilidadesIntereses);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    const obtenerOpcionesHabilidades = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/habilidades"); // Reemplazar con tu lógica real
          const data = await response.json();
          setOpcionesHabilidades(data);
        } catch (error) {
          console.error("Error al obtener opciones de habilidades:", error);
        }
      };
  
      const obtenerOpcionesIntereses = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/intereses"); // Reemplazar con tu lógica real
          const data = await response.json();
          setOpcionesIntereses(data);
        } catch (error) {
          console.error("Error al obtener opciones de intereses:", error);
        }
      };
  
      obtenerOpcionesHabilidades();
      obtenerOpcionesIntereses();
    obtenerUsuarios();
  }, []); // Se ejecuta solo en el montaje inicial

  const toggleHabilidadSeleccionada = (habilidadId) => {
    setHabilidadesSeleccionadas((prevSeleccionadas) => {
      if (prevSeleccionadas.includes(habilidadId)) {
        return prevSeleccionadas.filter((id) => id !== habilidadId);
      } else {
        return [...prevSeleccionadas, habilidadId];
      }
    });
  };

  const toggleInteresSeleccionado = (interesId) => {
    setInteresesSeleccionados((prevSeleccionados) => {
      if (prevSeleccionados.includes(interesId)) {
        return prevSeleccionados.filter((id) => id !== interesId);
      } else {
        return [...prevSeleccionados, interesId];
      }
    });
  };

  const filtrarUsuarios = () => {
    // Filtrar usuarios según habilidades e intereses seleccionados
    const usuariosFiltrados = usuarios.filter((usuario) => {
      const tieneHabilidades = habilidadesSeleccionadas.some((habilidadId) =>
        usuario.habilidades.includes(habilidadId)
      );
  
      const tieneIntereses = interesesSeleccionados.some((interesId) =>
        usuario.intereses.includes(interesId)
      );
  
      // Devuelve true si el usuario tiene al menos una habilidad o interés seleccionado
      return tieneHabilidades || tieneIntereses;
    });
  
    // Actualizar el estado de usuarios con los resultados filtrados
    setUsuarios(usuariosFiltrados);
  };
  

  return (
    <div style={{ width: "70%" }}>
      <div style={{ float: "left", marginRight: "20px" }} className="filtro-container">
        <div>
          <h4 style={{color: "green"}}>Habilidades:</h4>
          <ul>
            {opcionesHabilidades.map((habilidad) => (
              <li key={habilidad._id}>
                <label>
                  <input
                    type="checkbox"
                    value={habilidad._id}
                    checked={habilidadesSeleccionadas.includes(habilidad._id)}
                    onChange={() => toggleHabilidadSeleccionada(habilidad._id)}
                  />{habilidad.nombre}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{color: "green"}}>Intereses:</h4>
          <ul>
            {opcionesIntereses.map((interes) => (
              <li key={interes._id}>
                <label>
                  <input
                    type="checkbox"
                    value={interes._id}
                    checked={interesesSeleccionados.includes(interes._id)}
                    onChange={() => toggleInteresSeleccionado(interes._id)}
                  />
                  {interes.nombre}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={filtrarUsuarios}>FILTRAR</button>
      </div>

      <div style={{ marginLeft: "200px" }}>
        {usuarios.map((usuario) => (
          <UserCard key={usuario._id} usuario={usuario} />
        ))}
      </div>
    </div>
  );
};

export default Explorar;

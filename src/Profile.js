import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import StarRating from "./StarRating";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState([]);

  const handleInterestChange = (e) => {
    const selectedInterest = e.target.value;
    setInterests([...interests, selectedInterest]);
  };

  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;
    setSkills([...skills, selectedSkill]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div id = "about">
        <div className="three columns">
          <img
            className="profile-pic"
            src={user.picture}
            alt={user.name}
          />
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <StarRating rating={3} />
        </div>

        <div className="nine columns">
          <div className="card">
            <div >
              <h2 >INTERESES</h2>
              <p >
                Cuéntale a las personas cuáles son las áreas que te interesan
              </p>
              <div className="custom">
              <select onChange={handleInterestChange} className="main-col">
                <option value="">Selecciona un interés...</option>
                <option value="Cocina">Cocina</option>
                <option value="Música">Música</option>
                <option value="Baile">Baile</option>
                <option value="Álgebra">Álgebra</option>
                <option value="Programación">Programación</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
              <div >
                <span>Intereses seleccionados:</span>
                <ul>
                  {interests.map((interest, index) => (
                    <li key={index}>{interest}</li>
                  ))}
                </ul>
              </div>
              </div>
            </div>
          </div>
          <div className="card text-dark bg-light rounded p-3 !important">
            <div className="card-body">
              <h2 className="card-title">HABILIDADES</h2>
              <p className="card-text">
                Dale a las personas información para que puedan requerir tus servicios
              </p>
              <div className="custom">
              <select onChange={handleSkillChange} className="main-col">
                <option value="">Selecciona una habilidad...</option>
                <option value="Cocina">Cocina</option>
                <option value="Música">Música</option>
                <option value="Baile">Baile</option>
                <option value="Baile">Álgebra</option>
                <option value="Programación">Programación</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
              <div>
                <span>Habilidades seleccionadas:</span>
                <ul>
                  {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
                </div>
              </div>
            </div>
          </div>
          <button className="submit">Guardar</button>
        </div>
      </div>
    )
  );
};

export default Profile;


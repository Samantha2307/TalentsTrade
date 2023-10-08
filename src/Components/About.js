import React, { Component } from "react";
import Fade from "react-reveal";

class About extends Component {
  render() {

    return (
      <section id="about">
        <Fade duration={1000}>
          <div className="row">
            <div className="three columns">
              <img
                className="profile-pic"
                src="https://sibila-media-bucket.s3.amazonaws.com/Templates-images/kaldos_avanzado/icon-person.jpg"
                alt="Nordic Giant Profile Pic"
              />
            </div>
            <div className="nine columns main-col">
              <h2>Sobre el equipo</h2>

              <p>Somos un equipo que intenta dar solución al problema de las barreras económicas de la educación. Te brindamos soluciones factibles e igualitarias.</p>
              
                <div className="row ">
                  <h2>Información de Contacto</h2>
                  <p className="col-3 ">
                    <span>Samantha Delgado</span>
                    <br />
                    <span>+51943282360</span>
                    <br />
                    <span>72857554@continental.edu.pe</span>
                    <br />
                  </p>
                  <p className="col-3 ">
                    <span>Joseph  Condori</span>
                    <br />
                    <span>+51943282360</span>
                    <br />
                    <span>72857554@continental.edu.pe</span>
                  </p>
                  <p className="col-3 ">
                    <span>Alvaro  Tovar</span>
                    <br />
                    <span>+51943282360</span>
                    <br />
                    <span>72857554@continental.edu.pe</span>
                  </p>
                </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default About;

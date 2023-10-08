import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";
import { LoginButton } from "../Login";

class Header extends Component {
  render() {

    return (
      <header id="home">
        <ParticlesBg type="circle" bg={true} />

        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#about">
                About
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#contact">
                Contact
              </a>
            </li>
            <li>
            <a><LoginButton /></a>
            
            
            </li>
          </ul>
          
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">TalentsTrade</h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>Plataforma en línea donde las personas puedan intercambiar habilidades y conocimientos en diferentes áreas. La plataforma podría permitir a los usuarios registrarse y crear un perfil que muestre sus habilidades y conocimientos. Por ejemplo, alguien que sabe cocinar podría ofrecer lecciones de cocina a cambio de lecciones de guitarra de otra persona. Además, ofrecemos la opción de realizar intercambios virtuales a través de videoconferencias.</h3>
            </Fade>
            <hr />
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}

export default Header;

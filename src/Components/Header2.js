import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";
import { LoginButton } from "../Login";
import { LogoutButton } from "../Logout";
import { Explorar } from "./Explorar";
import { Link } from "react-router-dom";// Asegúrate de proporcionar la ruta correcta

class Header extends Component {
  render() {
    return (
      <header className="banner2">
        <nav id="nav-wrap">
          <ul id="nav" className="nav">
            <li className="current">
              <Link to="/Explorar" className="smoothscroll">
                EXPLORAR
              </Link>
              <Link to="/MisReservas" className="smoothscroll">
      MIS RESERVAS
    </Link>
    <Link to="/Solicitudes" className="smoothscroll">
      SOLICITUDES
    </Link>
            </li>
            <li>
            <a><LogoutButton /></a>
            </li>
          </ul>

        </nav>

      </header>
    );
  }
}

export default Header;


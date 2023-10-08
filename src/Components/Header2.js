import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";
import { LoginButton } from "../Login";
import { LogoutButton } from "../Logout";
import { Profile } from "../Profile"; // Asegúrate de proporcionar la ruta correcta

class Header extends Component {
  render() {
    return (
      <header className="banner2">
        <nav id="nav-wrap">
          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#">
                EXPLORAR
              </a>
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


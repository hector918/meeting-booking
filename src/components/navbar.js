import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  //
  const burgerOnClick = (evt) => {
    evt.target.classList.toggle("is-active");
    document.querySelector("#navbarExampleTransparentExample").classList.toggle("is-active");
  }
  ////////////////////////////////////////////
  return <nav className="navbar is-transparent">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/about">
        <img src="logo.svg" alt="Meeting room booking app" />
      </Link>
      <div className="navbar-burger" data-target="navbarExampleTransparentExample" onClick={burgerOnClick}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" className="navbar-menu">
      <div className="navbar-start">
        <div className="navbar-item has-dropdown is-hoverable">
          <Link className="navbar-link" to="/">
            Room
          </Link>
          <div className="navbar-dropdown is-boxed">
            <Link className="navbar-item" to="/">
              List all rooms.
            </Link>
            <Link className="navbar-item" to="/meetingrooms/new">
              Create an room.
            </Link>
          </div>
        </div>
        <div className="navbar-item has-dropdown is-hoverable">
          <Link className="navbar-link" to="/">
            Booking
          </Link>
          <div className="navbar-dropdown is-boxed">
            <Link className="navbar-item" to="/bookings">
              List all future bookings.
            </Link>
          </div>
        </div>

      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="field is-grouped">
            <p className="control">
              <a className="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="https://bulma.io" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms">
                <span className="icon">
                  <i className="fab fa-twitter"></i>
                </span>
                <span>
                  Tweet
                </span>
              </a>
            </p>
            <p className="control">
              <a className="button is-primary" href="https://github.com/jgthms/bulma/releases/download/0.9.4/bulma-0.9.4.zip">
                <span className="icon">
                  <i className="fas fa-download"></i>
                </span>
                <span>Download</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
}
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _variable_ from "../_variable_";
import GoPreviousPageButton from "./go-previous-page-button";
import ThemeModeButton from "./theme-mode-button";
export default function Navbar() {
  const [userName, setUserName] = useState("");
  const [userPower, setUserPower] = useState(5);
  ///////////////////////////////////////////////////
  useEffect(() => {

    if (_variable_.user.user_profile === undefined) window.location = "/";
    setUserName(_variable_.user.user_profile.name);
    if (_variable_.user?.user_profile?.from_db?.power === undefined) {
      setUserPower(4);
    } else {
      setUserPower(_variable_.user.user_profile.from_db.power);
    }

  }, []);
  ///////////////////////////////////////////////////
  const burgerOnClick = (evt) => {
    evt.target.classList.toggle("is-active");
    document.querySelector("#navbarExampleTransparentExample").classList.toggle("is-active");
  }
  ////////////////////////////////////////////
  function renderIdentityIcon() {
    switch (userPower) {
      case 0: return <i className="fa fa-key" aria-hidden="true"></i>;
      default: return <i className="fa fa-user-circle" aria-hidden="true"></i>;
    }

  }
  ////////////////////////////////////////////
  return <nav className="navbar is-transparent">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/home">
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
          <Link className="navbar-link" to="/meetingrooms">
            Room
          </Link>
          <div className="navbar-dropdown is-boxed">
            <Link className="navbar-item" to="/meetingrooms">
              List all rooms.
            </Link>
            <Link className="navbar-item" to="/meetingrooms/new">
              Create an room.
            </Link>
          </div>
        </div>
        <div className="navbar-item has-dropdown is-hoverable">
          <Link className="navbar-link" to="/bookings">
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
          <ThemeModeButton />
        </div>
        <div className="navbar-item">
          <div className="field is-grouped">
            <p className="control">
              <span className="button">
                <span className="icon is-small">
                  {renderIdentityIcon()}
                </span>
                <span>{userName}</span>
              </span>
            </p>
            <p className="control">
              <a className="button is-primary" href="/logout">
                <span className="icon">
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                </span>
                <span>Logout</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <GoPreviousPageButton />
  </nav>
}
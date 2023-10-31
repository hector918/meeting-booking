import { useEffect, useState } from "react"
import srv from '../_fetch_';
import { Link } from "react-router-dom";
import _variable_ from "../_variable_";
///////////////////////////////////////////////
export default function AuthWaitingSessionPage() {
  ///////////////////////////////////////////////
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  ///////////////////////////////////////////////
  const render = () => {
    if (isLoading) {
      return <span><i className="fa fa-spinner fa-pulse fa-4x fa-fw"></i>
        <span className="sr-only">Loading...</span></span>
    }
    if (isLogin) {
      return <Link className="button is-black is-large is-focused" to="/meetingrooms" ><i class="fa fa-sign-in" aria-hidden="true"></i> &nbsp; to Home</Link>
    } else {
      return <button className="button is-black is-large is-focused" onClick={() => { window.location = "/login" }} ><i className="fa fa-sign-in" aria-hidden="true"></i> &nbsp; Login</button>
    }
  }
  ///////////////////////////////////////////////
  useEffect(() => {
    setIsLoading(true);
    srv.getUserProfile(res => {
      if (res.payload) {
        _variable_.user = { ...res.payload };
        setIsLogin(true);
      }
      if (res.error) {
        _variable_.user = {};
        setIsLogin(false);
      }
      setIsLoading(false);
    });
  }, []);
  ///////////////////////////////////////////////
  return <section className="hero is-link is-fullheight">
    <div className="hero-head">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <span className="navbar-item">
              <img src="logo.svg" alt="Meeting room booking app" />
            </span>
            <span className="navbar-burger" data-target="navbarMenuHeroA">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroA" className="navbar-menu">
            <div className="navbar-end">

              <span className="navbar-item">
                <Link to="https://pursuit.org"><img className="is-clickable" src="./pursuit-logo.png" width="100px" alt="https://pursuit.org" /></Link>

              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <div className="hero-body">
      <div className="container has-text-centered">
        <p className="title">Room booking</p>
        <p className="subtitle">V0.03</p>
        <p>{render()}</p>
      </div>
    </div>

    <div className="hero-foot">
      <nav className="tabs">
        <div className="container">
          <ul>
            <li className="is-active"><a href="#/">Hector by 2023 Fall</a></li>
            <li><a href="#/">Node js</a></li>
            <li><a href="#/">Express</a></li>
            <li><a href="#/">React</a></li>
            <li><a href="#/">Postgresql</a></li>
            <li><a href="#/">Bulma</a></li>
            <li><a href="#/">Auth0</a></li>
            <li><a href="#/">Oracle</a></li>
            <li><a href="#/">Cloudflare</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </section>



}
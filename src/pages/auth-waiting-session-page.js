import { useEffect, useState } from "react"
import srv from '../_fetch_';
import { Link } from "react-router-dom";
import _variable_ from "../_variable_";
import './auth-waiting-session-page.css';
///////////////////////////////////////////////
export default function AuthWaitingSessionPage() {
  ///////////////////////////////////////////////
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  ///////////////////////////////////////////////
  const render = () => {
    if (isLoading) {
      return <span><i className="fa fa-spinner fa-pulse fa-4x fa-fw"></i>
        <span className="sr-only blackstone_font">Loading...</span></span>
    }
    if (isLogin) {
      return <Link
        className="button is-black is-medium blackstone_font"
        to="/meetingrooms"
        title="next page is home."
      ><i className="fa fa-sign-in" aria-hidden="true"></i> &nbsp; Enter Home</Link>
    } else {
      return <button
        className="button is-black is-medium blackstone_font"
        onClick={() => { window.location = "/login" }}
        title="click me to led you to login page."
      ><i className="fa fa-sign-in" aria-hidden="true"></i> &nbsp; Login</button>
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
        <div className="section"><p className="title blackstone_font">Room Booking</p></div>
        <div className="is-flex is-justify-content-center"><span className="horizontal-line"></span></div>
        <p>{render()}</p>
      </div>
      <div title="You know, you know. You don't know, you don't know." className="content is-small has-text-right blackstone_font" style={{
        position: "absolute",
        bottom: "5vh",
        right: "2vw"
      }}>V0.05</div>
    </div>

    <div className="hero-foot">
      <nav className="tabs is-fullwidth">
        <div className="container">
          <ul>
            <li><a href="#/">Node js</a></li>
            <li><a href="#/">Express</a></li>
            <li><a href="#/">React</a></li>
            <li><a href="#/">Postgresql</a></li>
            <li><a href="#/">Bulma</a></li>
            <li><a href="#/">Auth0</a></li>
            <li><a href="#/">Oracle cloud</a></li>
            <li><a href="#/">Cloudflare</a></li>
            <li><a href="#/">Snyk</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </section>



}
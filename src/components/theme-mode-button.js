// import { useState } from "react"
// import './theme-mode-button.scss';
import '../asset/bulma-dark-0.9.4.css';
///////////////////////////////////////////////
export default function ThemeModeButton() {
  ///////////////////////////////////////////////
  // const [mode, setMode] = useState("light");
  ////event///////////////////////////////////////////
  const handleModeSwitch = () => {
    document.documentElement.classList.toggle('dark');
  }
  ///////////////////////////////////////////////
  return <p className="buttons">
    <button className="button" onClick={handleModeSwitch}>
      <span className="icon">
        <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
      </span>
    </button>
  </p>
}
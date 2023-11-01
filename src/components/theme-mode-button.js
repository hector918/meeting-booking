import { useState } from "react"
import './theme-mode-button.scss';
///////////////////////////////////////////////
export default function ThemeModeButton() {
  ///////////////////////////////////////////////
  const [mode, setMode] = useState("light");
  ////event///////////////////////////////////////////
  const handleModeSwitch = () => {
    const body = document.querySelector("body");
    if (body.classList.contains('dark')) {
      body.className = '';
    } else {
      body.className = "dark";
    }
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
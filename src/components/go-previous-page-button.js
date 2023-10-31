import "./go-previous-page-button.css";
import { useNavigate } from "react-router-dom";
/////////////////////////////////////////
export default function GoPreviousPageButton() {
  /////////////////////////////////////////
  const navigate = useNavigate();
  /////event////////////////////////////////////
  function onPreviousPageClick(evt) {
    navigate(-1);
  }
  /////////////////////////////////////////
  return <div className="go-previous-page-button">
    <button className="button is-medium" title="go Previous page." onClick={onPreviousPageClick}>
      <span className="icon is-medium">
        <i className="fa fa-arrow-circle-left fa-2x" aria-hidden="true"></i>
      </span>
    </button>
  </div>
}
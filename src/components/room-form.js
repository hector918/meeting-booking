import { useRef, useState } from "react"
import srv from '../_fetch_';
export default function RoomForm({ roomId }) {
  const [nameInputField, capacityInputField, floorInputField, buttonField] = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [floor, setFloor] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  ////////////////////////////////////////////
  const handleOnSelect = (evt) => {
    evt.target.select();
  }
  const handleSubmit = (evt) => {
    setIsloading(true);
    //reset status
    const fieldList = {
      name: nameInputField.current,
      capacity: capacityInputField.current,
      floor: floorInputField.current,
      summary: buttonField.current
    };
    for (let key in fieldList) resetFieldStatus(fieldList[key]);

    if (roomId === undefined) {
      //new
      srv.newRoom({ name, capacity, floor }, res => {

        if (res.error !== undefined) {
          //if error
          for (let key in res?.detail) if (res?.detail[key].ret === false) {
            const { input, help } = getComponentFromFieldSet(fieldList[key]);
            input?.classList.add("is-danger");
            help?.classList.add("is-danger");
            help.innerHTML = res?.detail[key].explain;
          }
        }
        if (res.payload !== undefined) {
          //success
          const { help } = getComponentFromFieldSet(buttonField.current);
          help.classList.add("is-success");
          help.innerHTML = "Room added."
        }
        setIsloading(false);

      });
    } else {
      //edit
    }
  }

  const handleCancel = (evt) => {

  }

  const handleReset = (evt) => {
    const fieldList = {
      name: nameInputField.current,
      capacity: capacityInputField.current,
      floor: floorInputField.current,
      summary: buttonField.current
    };
    for (let key in fieldList) resetFieldStatus(fieldList[key]);
    setName("");
    setCapacity(0);
    setFloor(0);
  }
  ///helper////////////////////////////////////////////////
  function resetFieldStatus(field) {
    const elementStatus = ["is-success", "is-warning", "is-danger"];
    const { input, help } = getComponentFromFieldSet(field);
    input?.classList.remove(...elementStatus);
    help?.classList.remove(...elementStatus);
    help.innerHTML = "";
  }
  function getComponentFromFieldSet(parentField) {
    return {
      input: parentField.querySelector("input"),
      help: parentField.querySelector(".help")
    }
  }
  ///////////////////////////////////////////////////
  return <section className="section is-medium">
    <div ref={nameInputField} className="field">
      <label className="label">Name</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Room's name"
          onChange={e => setName(e.target.value)}
          value={name}
          onClick={handleOnSelect}
        />
      </div>
      <p className="help is-success"></p>
    </div>

    <div ref={capacityInputField} className="field">
      <label className="label">Capacity</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className="input"
          type="number"
          placeholder="Max capacity of the room."
          onChange={(evt => setCapacity(evt.target.value))}
          min={1}
          value={capacity}
          onClick={handleOnSelect}

        />
        <span className="icon is-small is-left">
          <i class="fa fa-users" aria-hidden="true"></i>
        </span>
        <span className="icon is-small is-right">
          {/* <i className="fas fa-check"></i> */}
        </span>
      </div>
      <p className="help is-success"></p>
    </div>

    <div ref={floorInputField} className="field">
      <label className="label">Floor</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className="input"
          type="number"
          placeholder="Which floor?"
          onChange={e => setFloor(e.target.value)}
          value={floor}
          onClick={handleOnSelect}
        />
        <span className="icon is-small is-left">
          <i class="fa fa-map-signs" aria-hidden="true"></i>
        </span>
        <span className="icon is-small is-right">
          {/* <i className="fas fa-exclamation-triangle"></i> */}
        </span>
      </div>
      <p className="help is-danger"></p>
    </div>
    <div ref={buttonField}>
      {isLoading && <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>}
      <p className="help"></p>
    </div>
    <div className="field is-grouped">
      <div className="control">
        <button className="button is-link" onClick={handleSubmit}>Submit</button>
      </div>
      <div className="control">
        <button className="button is-link is-light" onClick={handleReset}>Reset</button>
      </div>
      <div className="control">
        <button className="button is-link is-light" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  </section>
}
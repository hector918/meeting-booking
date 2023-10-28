import { useRef, useState } from "react"
import srv from '../_fetch_';
export default function RoomForm({ roomId }) {
  const [nameInputField, capacityInputField, floorInputField] = [useRef(null), useRef(null), useRef(null)];
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [floor, setFloor] = useState(0);
  ///////////////////////////////////////////////////
  const handleSubmit = (evt) => {
    if (roomId === undefined) {
      //new
      srv.newRoom({ name, capacity, floor }, res => {
        const fieldList = {
          name: nameInputField.current,
          capacity: capacityInputField.current,
          floor: floorInputField.current
        };
        for (let key in fieldList) resetFieldStatus(fieldList[key]);

        if (res.error !== undefined) {
          for (let key in res?.detail) if (res?.detail[key].ret === false) {
            const { input, help } = getComponentFromFieldSet(fieldList[key]);
            input.classList.add("is-danger");
            help?.classList.add("is-danger");
            help.innerHTML = res?.detail[key].explian;
          }
        }
        console.log(res);
      });
    } else {
      //edit
    }
  }

  const handleCancel = (evt) => {

  }

  const handleReset = (evt) => {

  }
  ///helper////////////////////////////////////////////////
  function resetFieldStatus(field) {
    const elementStatus = ["is-success", "is-warning", "is-danger"];
    const { input, help } = getComponentFromFieldSet(field);
    input.classList.remove(...elementStatus);
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
        <input className="input" type="text" placeholder="Room's name" onChange={e => setName(e.target.value)} value={name} />
      </div>
      <p className="help is-success"></p>
    </div>

    <div ref={capacityInputField} className="field">
      <label className="label">Capacity</label>
      <div className="control has-icons-left has-icons-right">
        <input className="input" type="number" placeholder="Max capacity of the room." onChange={(evt => setCapacity(evt.target.value))} min={1} value={capacity} />
        <span className="icon is-small is-left">
          {/* <i className="fas fa-user"></i> */}
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
        <input className="input" type="number" placeholder="Which floor?" onChange={e => setFloor(e.target.value)} value={floor} />
        <span className="icon is-small is-left">
          {/* <i className="fas fa-envelope"></i> */}
        </span>
        <span className="icon is-small is-right">
          {/* <i className="fas fa-exclamation-triangle"></i> */}
        </span>
      </div>
      <p className="help is-danger"></p>
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
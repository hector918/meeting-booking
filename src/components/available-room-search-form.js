import { useRef, useState } from "react"
export default function RoomSearchForm({ searchRoom, setStartDate, setEndDate }) {
  const [datetimeConstraint, setDatetimeConstraint] = useState(30);
  const [startDateInput, endDateInput, capacityField, floorField] = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [isLoading, setIsLoading] = useState(false);
  ////datetime helper//////////////////////////////
  const getFutureDate = (future = datetimeConstraint) => {
    var today = new Date();
    today.setDate(today.getDate() + future);
    return today;
  }
  function formatDateTime(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    // Create the formatted date and time string
    var formattedDateTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
    return formattedDateTime;
  }
  ///event/////////////////////////////////
  const handleSubmit = () => {
    setIsLoading(false);
    const form = {
      startDate: startDateInput.current.value || undefined,
      endDate: endDateInput.current.value || undefined,
      capacityOp: capacityField.current.querySelector("select").value,
      capacity: capacityField.current.querySelector("input").value || undefined,
      floorOp: floorField.current.querySelector("select").value,
      floor: floorField.current.querySelector("input").value || undefined
    };
    setStartDate(new Date(form['startDate']));
    setEndDate(new Date(form['endDate']));
    searchRoom(form, () => { setIsLoading(false) });
  }
  const handleReset = () => {
    startDateInput.current.value = "";
    endDateInput.current.value = "";
    capacityField.current.querySelector("select").selectedIndex = 0;
    capacityField.current.querySelector("input").value = "";
    floorField.current.querySelector("select").selectedIndex = 0;
    floorField.current.querySelector("input").value = "";
  }
  ////////////////////////////////////
  return <div className="block"><fieldset disabled={isLoading}>

    <div className="field is-horizontal">

      <div className="field-body">
        <div className="field-label is-normal">
          <label className="label">Start date</label>
        </div>
        <div className="field">
          <p className="control is-expanded has-icons-left">
            <input
              className="input"
              type="datetime-local"
              placeholder="start date"
              min={formatDateTime(new Date())}
              max={formatDateTime(getFutureDate())}
              ref={startDateInput}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-calendar" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <div className="field-label is-normal">
          <label className="label">End date</label>
        </div>
        <div className="field">
          <p className="control is-expanded has-icons-left">
            <input
              className="input is-success"
              type="datetime-local"
              placeholder="end date"
              min={formatDateTime(new Date())}
              max={formatDateTime(getFutureDate())}
              ref={endDateInput}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-calendar" aria-hidden="true"></i>
            </span>

          </p>
        </div>
      </div>
    </div>

    <div className="field is-horizontal">
      <div className="field-body">
        <div className="field-label is-normal">
          <label className="label">Capacity</label>
        </div>

        <div className="field">
          <div className="field is-expanded">
            <div className="field has-addons" ref={capacityField}>
              <p className="control ">
                <span className="select">
                  <select>
                    <option>any</option>
                    <option>&gt;</option>
                    <option>&lt;</option>
                    <option>=</option>
                  </select>
                </span>
              </p>
              <p className="control flex-grow">
                <input className="input" type="number" placeholder="Capacity" />
              </p>

            </div>
          </div>
        </div>



        <div className="field-label is-normal">
          <label className="label">Floor</label>
        </div>
        <div className="field">
          <div className="field is-expanded">
            <div className="field has-addons" ref={floorField}>
              <p className="control">
                <span className="select">
                  <select>
                    <option>any</option>
                    <option>&lt;</option>
                    <option>&gt;</option>
                    <option>=</option>
                  </select>
                </span>
              </p>
              <p className="control flex-grow">
                <input className="input" type="number" placeholder="which floor" />
              </p>
            </div>
          </div>
        </div>

        <div className="field is-grouped">

          <p className="control">
            <button className="button is-link" onClick={handleSubmit}>
              Search
            </button>
          </p>
          <p className="control">
            <button className="button is-light" onClick={handleReset}>
              Reset
            </button>
          </p>
        </div>

      </div>
    </div>

  </fieldset></div >
}
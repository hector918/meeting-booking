import { useState } from "react"

export default function BookingForm() {
  const [meetingName, setMeetingName] = useState("");


  //////////////////////////////////////
  //////////////////////////////////////
  return <section className="section">
    <script src="../bulma-calendar-master/dist/js/bulma-calendar.js"></script>
    <div className="field">
      <label className="label">Meeting name</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className="input"
          type="text"
          placeholder="meeting name, example 'Scrum Standup'"
          min={1}
          value={meetingName}
          onChange={evt => setMeetingName(evt.target.value)}

        />
        <span className="icon is-small is-left">
          <i className="fa fa-users" aria-hidden="true"></i>
        </span>
        <span className="icon is-small is-right">
          {/* <i className="fas fa-check"></i> */}
        </span>
      </div>
      <p className="help is-success"></p>
    </div>

    <div className="field">
      <label className="label">startDate</label>
      <div className="control has-icons-left has-icons-right ">
        <input
          className="input startDate"
          type="time"
          placeholder="Max capacity of the room."
          min={1}
        />
        <input type="text" class="startDate is-hidden" value="" />
        <span className="icon is-small is-left">
          <i className="fa fa-users" aria-hidden="true"></i>
        </span>
        <span className="icon is-small is-right">
          {/* <i className="fas fa-check"></i> */}
        </span>
      </div>
      <p className="help is-success"></p>
    </div>


  </section>
}
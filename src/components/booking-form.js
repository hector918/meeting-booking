import { useRef, useState } from "react"

export default function BookingForm({ id }) {
  const [meetingName, setMeetingName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [datetimeConstraint, setDatetimeConstraint] = useState(30);
  const [meetingNameInputField, startDateInputField, endDateInputField, attendeesInputField, buttonField, attendeesTagsDiv, tagsInput] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [isLoading, setIsLoading] = useState(false);
  ////event//////////////////////////////////////
  const onTagsInputEnter = evt => {
    if (evt.keyCode === 13) handleAddAttendees(evt.target.value);
  }
  const mouseClickTagsInputEnter = evt => {
    handleAddAttendees(tagsInput.current.value);
  }
  const handleAddAttendees = email => {
    const { input, help } = getComponentFromFieldSet(attendeesInputField.current);
    const elementStatus = ["is-success", "is-warning", "is-danger"];
    input.classList.remove(...elementStatus);
    help.classList.remove(...elementStatus);
    help.innerHTML = "";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const ret = emailRegex.test(email);
    if (ret) {
      addToTagsDiv(email);
      tagsInput.current.value = "";
      tagsInput.current.focus();
    } else {
      const { input, help } = getComponentFromFieldSet(attendeesInputField.current);
      input.classList.add('is-danger');
      help.classList.add('is-danger');
      help.innerHTML = "only accept E-mail address";
    }
    function addToTagsDiv(email) {
      const div = attendeesTagsDiv.current;
      const tag = document.createElement("div");
      const tagText = document.createElement("span");
      const tagCloseButton = document.createElement("i");
      tag.append(tagText, tagCloseButton);

      tag.setAttribute("class", "is-black tag");
      tagCloseButton.setAttribute("class", "fa fa-times ml-2 is-clickable");
      tagText.innerHTML = email;
      tagCloseButton.addEventListener("click", evt => {
        div.remove(evt.target);
      });
      div.append(tag);
    }
  }

  const handleSubmit = (evt) => {
    setIsLoading(true)
    const fieldList = {
      meetingName: meetingNameInputField.current, startDate: startDateInputField.current,
      endDate: endDateInputField.current,
      summary: buttonField
    }
    for (let key in fieldList) resetFieldStatus(fieldList[key]);

    if (id === undefined) {
      //new

    } else {
      //edit

    }
    setIsLoading(false);
  }

  const handleCancel = (evt) => {

  }

  const handleReset = (evt) => {
    const fieldList = {
      meetingName: meetingNameInputField.current,
      startDate: startDateInputField.current,
      endDate: endDateInputField.current,
      summary: buttonField.current
    };
    for (let key in fieldList) resetFieldStatus(fieldList[key]);
    setMeetingName("");
    setStartDate("");
    setEndDate("");
  }
  ////datetime helper//////////////////////////////
  const getFutureDate = (future = datetimeConstraint) => {
    var today = new Date();
    today.setDate(today.getDate() + future);
    return today;
  }
  const formatDateTime = (date) => {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    // Create the formatted date and time string
    var formattedDateTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
    return formattedDateTime;
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
  ////html//////////////////////////////////
  return <section className="section">
    <div ref={meetingNameInputField} className="field">
      <label className="label">Meeting name</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className="input"
          type="text"
          placeholder="meeting name, example 'Scrum Standup'"
          value={meetingName}
          onChange={evt => setMeetingName(evt.target.value)}

        />
        <span className="icon is-small is-left">
          <i className="fa fa-info-circle" aria-hidden="true"></i>
        </span>
        <span className="icon is-small is-right">
          {/* <i className="fas fa-check"></i> */}
        </span>
      </div>
      <p className="help is-success"></p>
    </div>

    <div ref={startDateInputField} className="field">
      <label className="label">Start date</label>
      <div className="control has-icons-left has-icons-right ">
        <input
          className="input"
          type="datetime-local"
          min={formatDateTime(new Date())}
          max={formatDateTime(getFutureDate())}
          onChange={(evt) => setStartDate(evt.target.value)}
          value={startDate}
        />
        <span className="icon is-small is-left">
          <i className="fa fa-calendar" aria-hidden="true"></i>
        </span>
        <span className="icon is-small is-right">
          {/* <i className="fas fa-check"></i> */}
        </span>
      </div>
      <p className="help is-success"></p>
    </div>

    <div ref={endDateInputField} className="field">
      <label className="label">End date</label>
      <div className="control has-icons-left has-icons-right ">
        <input
          className="input"
          type="datetime-local"
          min={formatDateTime(new Date(startDate))}
          max={formatDateTime(getFutureDate())}
          onChange={evt => setEndDate(evt.target.value)}
          value={endDate}
        />
        <span className="icon is-small is-left">
          <i className="fa fa-calendar" aria-hidden="true"></i>
        </span>
        <span className="icon is-small is-right">
          {/* <i className="fas fa-check"></i> */}
        </span>
      </div>
      <p className="help is-success"></p>
    </div>

    <div ref={attendeesInputField} className="field">
      <label className="label">Attendees</label>
      <div ref={attendeesTagsDiv} className="tags are-medium">

      </div>
      <div className="control has-icons-left has-icons-right">

        <input
          ref={tagsInput}
          className="input"
          type="text"
          placeholder="type in Email address and press enter.'"
          onKeyDown={onTagsInputEnter}
        />
        <span className="icon is-small is-left">
          <i className="fa fa-info-circle" aria-hidden="true"></i>
        </span>
        <span className="icon is-medium is-right is-clickable" onClick={mouseClickTagsInputEnter}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </span>
      </div>
      <p className="help is-success"></p>
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
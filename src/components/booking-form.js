import { useEffect, useRef, useState } from "react"
///////////////////////////////////////////////////
export default function BookingForm({ meetingRoomId, bookingInfo, submit_booking, bookingScrollIntoView, pre_startDate, pre_endDate }) {
  const [meetingName, setMeetingName] = useState("");
  const [startDate, setStartDate] = useState(formatDateTime(pre_startDate));
  const [endDate, setEndDate] = useState(formatDateTime(pre_endDate));
  const [datetimeConstraint, setDatetimeConstraint] = useState(30);
  const [meetingNameInputField, startDateInputField, endDateInputField, attendeesInputField, buttonField, attendeesTagsDiv, tagsInput, endDateInput] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [isLoading, setIsLoading] = useState(false);
  ///////////////////////////////////////////////
  useEffect(() => {
    if (bookingInfo !== undefined && Object.keys(bookingInfo).length > 0) {
      //editting

      // const { input: meetingNameInput } = getComponentFromFieldSet(meetingNameInputField.current);
      // meetingNameInput.disabled = true;
      setMeetingName(bookingInfo.meeting_name);
      const { input: startDateInput } = getComponentFromFieldSet(startDateInputField.current);
      startDateInput.disabled = true;
      setStartDate(formatDateTime(new Date(bookingInfo.start_date)));
      const { input: endDateInput } = getComponentFromFieldSet(endDateInputField.current);
      setEndDate(formatDateTime(new Date(bookingInfo.end_date)));
      endDateInput.disabled = true;

      attendeesTagsDiv.current.innerHTML = "";
      const attendees_list = bookingInfo.attendees.email_list || [];
      for (let email of attendees_list) handleAddAttendees(email)
    }
  }, [bookingInfo])

  ////event//////////////////////////////////////
  const onStartDateBlur = evt => {
    const newDate = new Date(evt.target.value);
    endDateInput.current.min = formatDateTime(newDate);
    if (new Date(endDate) <= newDate || !endDate) {
      setEndDate(formatDateTime(new Date(newDate.setMinutes(newDate.getMinutes() + 30))));
    }
  }
  const onStartDateChange = evt => {
    setStartDate(evt.target.value);
  }
  const onTagsInputEnter = evt => {
    if (evt.keyCode === 13) handleAddAttendees(evt.target.value);
  }
  const mouseClickTagsInputEnter = evt => {
    handleAddAttendees(tagsInput.current.value);
  }
  function handleAddAttendees(email) {
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
        div.removeChild(tag);
      });
      div.append(tag);
    }
  }
  const getAttendees = () => {
    const tags = attendeesTagsDiv.current.querySelectorAll("span");
    const emails = [];
    for (let tag of tags) emails.push(tag.innerHTML);
    const emailAddressesInInput = tagsInput.current.value.match(/[\w.-]+@[\w.-]+\.[A-Za-z]{2,}/);
    if (Array.isArray(emailAddressesInInput)) for (let email of emailAddressesInInput) emails.push(email);
    return emails;
  }
  const handleSubmit = (evt) => {
    // setIsLoading(true);
    const fieldList = {
      meetingName: meetingNameInputField.current,
      startDate: startDateInputField.current,
      endDate: endDateInputField.current,
      summary: buttonField.current
    }

    const form = {
      meetingName: getComponentFromFieldSet(fieldList["meetingName"]).input.value,
      startDate: getComponentFromFieldSet(fieldList["startDate"]).input.value,
      endDate: getComponentFromFieldSet(fieldList["endDate"]).input.value,
      attendees: getAttendees(),
      meetingRoomId
    }
    for (let key in fieldList) resetFieldStatus(fieldList[key]);
    if (bookingInfo === undefined) {
      //new
      submit_booking(form, res => {
        if (res.error !== undefined) {
          //error
          const { help } = getComponentFromFieldSet(buttonField.current);
          help.innerHTML = res.error;
          help.classList.add("is-danger");
          if (Array.isArray(res.is_overlap)) {
            if (typeof bookingScrollIntoView === "function") {
              bookingScrollIntoView(res.is_overlap[0].id);
            }
          }
          //
          for (let key in res.detail) if (fieldList[key] !== undefined && res.detail[key].ret === false) {
            const { input, help } = getComponentFromFieldSet(fieldList[key]);
            input?.classList.add("is-danger");
            help?.classList.add("is-danger");
            help.innerHTML = res.detail[key].explain;
            if (res.detail[key]['constraint']) setDatetimeConstraint(res.detail[key]['constraint']);
          }
        } else if (res.payload !== undefined) {
          //success, 
          // const { added, bookings } = res.payload;
          handleReset();
          const { help } = getComponentFromFieldSet(buttonField.current);
          help.classList.add("is-success");
          help.innerHTML = "Meeting are Booked.";
          if (typeof bookingScrollIntoView === "function") {
            setTimeout(() => {
              bookingScrollIntoView(res.payload.added.id);
            }, 500);
          }
        }
      })

    } else {
      //edit
      submit_booking(form, res => {
        console.log(res);
      })
    }
    setIsLoading(false);
  }

  const handleReset = (evt) => {
    if (bookingInfo === undefined) {
      const fieldList = {
        meetingName: meetingNameInputField.current,
        startDate: startDateInputField.current,
        endDate: endDateInputField.current,
        attendees: attendeesInputField.current,
        summary: buttonField.current
      };
      for (let key in fieldList) resetFieldStatus(fieldList[key]);
      attendeesTagsDiv.current.innerHTML = "";
      tagsInput.current.value = "";
      setMeetingName("");
      setStartDate("");
      setEndDate("");
    } else {
      attendeesTagsDiv.current.innerHTML = "";
      const attendees_list = bookingInfo.attendees.email_list || [];
      for (let email of attendees_list) handleAddAttendees(email);

    }

  }
  ////datetime helper//////////////////////////////
  const getFutureDate = (future = datetimeConstraint) => {
    var today = new Date();
    today.setDate(today.getDate() + future);
    return today;
  }
  function formatDateTime(date) {
    if (Object.prototype.toString.call(date) !== "[object Date]") date = new Date();
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
    tagsInput.current.value = "";
  }
  function getComponentFromFieldSet(parentField) {
    return {
      input: parentField.querySelector("input"),
      help: parentField.querySelector(".help")
    }
  }
  ////html//////////////////////////////////
  return <section className="section in_mobile_mode_set_fixed_height"><fieldset disabled={isLoading}>
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
          onChange={onStartDateChange}
          value={startDate}
          onBlur={onStartDateBlur}
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
          ref={endDateInput}
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
          <i className="fa fa-envelope-o" aria-hidden="true"></i>
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
    </div>

  </fieldset></section>
}
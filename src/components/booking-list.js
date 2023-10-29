import { useRef } from "react";
var itm_idx = 1;
const timeline_itm_id_prefix = "timeline-item-with-booking-id";
export default function BookingList({ bookings, scrollToId }) {
  const timelineSection = useRef(null);
  //联合上层当上层表达有重复BOOKING，将会调用函数滚动页面
  scrollToId(scrollIntoViewWithBookingId);
  function scrollIntoViewWithBookingId(bookingId) {
    const element = timelineSection.current.querySelector("#" + timeline_itm_id_prefix + bookingId);
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    element.classList.add("is-danger");
    element.firstChild.classList.add("is-danger");
    const timer = setInterval(() => {
      element.classList.toggle("is-danger");
      element.firstChild.classList.toggle("is-danger");
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      element.classList.remove("is-danger");
      element.firstChild.classList.remove("is-danger");
    }, 5_000);
  }
  /////render helper///////////////////////////////
  function renderTimeLine(bookings) {
    const elements = [];
    let current_date = "";
    for (let booking of bookings) {
      const startDate = new Date(booking.start_date).toLocaleDateString();
      if (current_date != startDate) {
        current_date = startDate;
        elements.push(renderAnHeader(startDate));
      }
      elements.push(renderAnItem(booking));
    }
    return elements;
  }
  function renderAnHeader(date) {
    return <header className="timeline-header" key={"timeline-header" + itm_idx++}>
      <span key={"timeline-header-span" + itm_idx++} className="tag is-primary">{date}</span>
    </header>
  }
  function renderAnItem(booking) {
    return <div
      className="timeline-item"
      key={"timeline-itm" + itm_idx++}
      id={timeline_itm_id_prefix + booking.id}
    >
      <div className="timeline-marker is-primary"></div>
      <div className="timeline-content">
        <p className="heading"><strong>Meeting name:</strong> {booking.meeting_name}</p>
        <p><strong>Start at:</strong> {toDateS(booking.start_date)} </p>
        <p><strong>End at:</strong> {toDateS(booking.end_date)}</p>
        <p><strong>Host Email:</strong> <a href={`mailto:${booking.host_email}`}>{booking.host_email}</a></p>
        <p><strong>Latest update:</strong> {toDateS(booking.timestamp)}</p>
        <p><strong>Attendees</strong></p>
        <div className="tags are-medium">
          {booking.attendees.email_list.map(el => <span className="is-light tag" key={"timeline-attendees-tag" + itm_idx++}>{el}</span>)}
        </div>
      </div>
    </div >
  }
  function toDateS(datetime_string) {
    return new Date(datetime_string).toLocaleString();
  }
  /////////////////////////////////////////////
  return <div ref={timelineSection} className="section in_mobile_mode_set_fixed_height">
    <div className="timeline">
      {renderTimeLine(bookings)}
    </div>
  </div>
}
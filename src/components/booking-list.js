import { useRef } from "react";
import BookingDetail from "./booking-detail";
import { useNavigate } from "react-router-dom";
var itm_idx = 1;
const timeline_itm_id_prefix = "timeline-item-with-booking-id";
/////////////////////////////////////////////////
export default function BookingList({ bookings, scrollToId }) {
  const timelineSection = useRef(null);
  const navigate = useNavigate();
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
  const handleBookingClick = (bookingId) => {
    navigate("/bookings/" + bookingId);
  }
  /////render helper///////////////////////////////
  function renderTimeLine(bookings) {
    const elements = [];
    let current_date = "";
    for (let booking of bookings) {
      const startDate = new Date(booking.start_date).toLocaleDateString();
      if (current_date !== startDate) {
        current_date = startDate;
        elements.push(renderAnHeader(startDate));
      }
      elements.push(<BookingDetail key={"bd-" + itm_idx++} booking={booking} handleBookingClick={handleBookingClick} />);
    }
    return elements;
  }
  function renderAnHeader(date) {
    return <header className="timeline-header" key={"timeline-header" + itm_idx++}>
      <span key={"timeline-header-span" + itm_idx++} className="tag is-primary">{date}</span>
    </header>
  }
  /////////////////////////////////////////////
  return <div ref={timelineSection} className="section in_mobile_mode_set_fixed_height">
    {bookings.length === 0 ? <article className="message">
      <div className="message-header">
        <p>No Booking on this room</p>
        <button className="delete" aria-label="delete"></button>
      </div>
      <div className="message-body">
        Your <strong>bookings</strong> will be displayed here after you have made the <em>reservation</em>.
      </div>
    </article> : <div className="timeline">
      {renderTimeLine(bookings)}
    </div>}

  </div>
}
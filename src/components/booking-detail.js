var itm_idx = 1;
const timeline_itm_id_prefix = "timeline-item-with-booking-id";
export default function BookingDetail({ booking, handleBookingClick }) {
  ///helper/////////////////////////////////////
  function bookingOnClick() {
    if (handleBookingClick) handleBookingClick(booking.id);
  }
  function toDateS(datetime_string) {
    return new Date(datetime_string).toLocaleString();
  }
  ////////////////////////////////////////
  return <div
    className="timeline-item is-clickable"
    key={"timeline-itm" + itm_idx++}
    id={timeline_itm_id_prefix + booking.id}
    onClick={bookingOnClick}
  >
    <div className="timeline-marker is-primary"></div>
    <div className="timeline-content">
      {booking.roomInfo && <p className="heading"><strong>Meeting room:</strong> {booking.roomInfo.name} - {booking.roomInfo.floor} Floor</p>}
      <p className="heading"><strong>Meeting name:</strong> {booking.meeting_name}</p>
      <p><strong>Start at:</strong> {toDateS(booking.start_date)} </p>
      <p><strong>End at:</strong> {toDateS(booking.end_date)}</p>
      <p><strong>Host Email:</strong> <a href={`mailto:${booking.host_email}`}>{booking.host_email}</a></p>
      <p><strong>Latest update:</strong> {toDateS(booking.timestamp)}</p>
      {booking.attendees?.email_list.length > 0
        ? <>
          <p><strong>Attendees</strong></p>
          <div className="tags are-medium">
            {booking.attendees.email_list.map(el => <span className="is-light tag" key={"timeline-attendees-tag" + itm_idx++}>{el}</span>)}
          </div>
        </>
        : ""
      }

    </div>
  </div >
}
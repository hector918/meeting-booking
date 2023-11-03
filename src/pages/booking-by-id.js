import { useParams } from "react-router-dom"
import BookingDetail from "../components/booking-detail";
import { useEffect, useRef, useState } from "react";
import srv from '../_fetch_';
import { useNavigate } from "react-router-dom";
import _variable_ from "../_variable_";
//////////////////////////////////////////////////
export default function BookingById() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState({});
  const [isError, setIsError] = useState("");
  const cancelModal = useRef(null);
  const navigate = useNavigate();
  //booking only can be change by owner or admin
  let bookingOwner = _variable_.user?.user_profile?.from_db?.power === 0 || booking.host_email === _variable_.user?.user_profile?.email;
  /////event////////////////////////////////////////
  const handleCancelClick = (evt) => {
    cancelModal.current.classList.toggle("is-active");
  }
  const confirmCancel = () => {
    const booking_id = booking.id;
    setIsLoading(true);
    srv.cancelBookingById(booking_id, res => {
      if (res.error) setIsError(res.error);
      if (res.payload) navigate(-1);
      setIsLoading(false);
    })
  }
  const handleEditClick = (evt) => {
    navigate('/bookings/edit/' + id);
  }
  //////////////////////////////////////////////////
  useEffect(() => {
    setIsLoading(true);
    srv.getBookingById(id, res => {
      if (res.error) setIsError(res.error);
      if (res.payload) setBooking(res.payload);
      setIsLoading(false);
    })
  }, [id]);
  function toDateS(datetime_string) {
    return new Date(datetime_string).toLocaleString();
  }
  ////render//////////////////////////////////////
  function render() {
    return <>
      <div className="card">
        <div className="card-content"><div className="content is-medium">
          <BookingDetail booking={booking} />
        </div></div>
        <footer className="card-footer">
          <button className="card-footer-item is-clickable" onClick={handleEditClick} disabled={!bookingOwner}>Edit booking</button>
          <button className="card-footer-item is-clickable" onClick={handleCancelClick} disabled={!bookingOwner}>Cancel booking</button>
        </footer>
      </div>

    </>
  }
  //////////////////////////////////////////////////
  return <div className=" container is-max-desktop"><div className="section" >
    {isLoading ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : render()}
    {booking.roomInfo && <div ref={cancelModal} className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <div className="content">
            <h2>Confirm cancel booking</h2>
            <p>Meeting Name: <span>{booking.meeting_name}</span></p>
            <p>Meeting Room: <span>{booking.roomInfo.name} - Floor {booking.roomInfo.floor}</span></p>
            <p>Start date: <span>{toDateS(booking.start_date)}</span></p>
            <p>End date: <span>{toDateS(booking.end_date)}</span></p>
          </div>

          <fieldset disabled={!bookingOwner || isLoading}><div className="field is-grouped is-expaned">
            <p className="control">
              <button className="button is-danger" onClick={confirmCancel}>
                Cancel Booking
              </button>
            </p>
            <p className="control">
              <button className="button" onClick={() => cancelModal.current.classList.toggle("is-active")}>
                Change mind
              </button>
            </p>
          </div></fieldset>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={() => cancelModal.current.classList.toggle("is-active")}></button>
    </div>}

  </div></div>
}
import BookingForm from "../components/booking-form";
import srv from '../_fetch_';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function BookingEdit() {
  const { id: bookingId } = useParams();
  const [bookingInfo, setBookingInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  //////////////////////////////////////////
  useEffect(() => {
    setIsLoading(true);
    srv.getBookingById(bookingId, res => {
      if (res.payload) {
        setBookingInfo(res.payload);
      }
      if (res.error) console.log(res.error);

      setIsLoading(false);
    })
  }, [bookingId])
  //////////////////////////////////////////
  const update_booking = (form, callback) => {
    srv.updateBookingById(bookingId, form, res => {
      if (res.payload) {
        navigate('/bookings/' + bookingId);
      }
      //error handle by children component
      callback(res)
    })
  }
  //////////////////////////////////////////
  return <div className=" container is-max-desktop">
    {isLoading ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : <BookingForm
      bookingInfo={bookingInfo} submit_booking={update_booking}

    />}

  </div>
}
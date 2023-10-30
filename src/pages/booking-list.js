import { useEffect, useState } from "react"
import srv from "../_fetch_";
import BookingList from "../components/booking-list";
export default function BookingListPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  //////////////////////////////////////
  useEffect(() => {
    setIsloading(true);
    srv.getAllBookings(res => {
      if (res.payload) {
        // re-organize booking and rooms
        const { bookings, rooms } = res.payload;
        const rooms_product = {};
        for (let room of rooms) rooms_product[room.id] = room;
        for (let idx in bookings) {
          bookings[idx].roomInfo = rooms_product[bookings[idx].meeting_room_id];
        };
        setBookings(bookings);
      }
      setIsloading(false);
    });
  }, []);
  ////event helper//////////////////////////////////
  const handleBookingClick = (bookingId) => {
    console.log(bookingId)
    // navigate("/meetingrooms/" + id, { state: { startDate: pre_startDate, endDate: pre_endDate } });
  }
  ///////////////////////////////////////////
  return <div className="section">
    {isLoading ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : <BookingList bookings={bookings} scrollToId={() => { }} handleBookingClick={handleBookingClick} />}
  </div>
}
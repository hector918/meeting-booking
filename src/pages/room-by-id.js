import React, { useEffect, useState } from "react";
import srv from '../_fetch_';
import { useLocation, useParams } from "react-router-dom";
import BookingForm from "../components/booking-form";
import BookingList from "../components/booking-list";
////////////////////////////////////////////
export default function RoomById() {
  const location = useLocation();
  const { startDate, endDate } = location.state;
  const { id } = useParams();
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [roomInfo, setRoomInfo] = useState({});
  const [bookings, setBookings] = useState([]);

  ////////////////////////////////////////////
  let bookingScrollIntoView;
  ////////////////////////////////////////////
  if (id === undefined) setIsError('id is broken.')
  useEffect(() => {
    setIsLoading(true);
    if (id !== undefined) {
      srv.getRoomById(id, res => {
        if (res.error !== undefined) {
          setIsError(res.error);
        }
        const { room } = res.payload;
        if (room) setRoomInfo(room);

      });
      /////////////
      srv.getBookingByRoomId(id, res => {
        setBookings(res.payload);
        setIsLoading(false);
      });
    }
  }, [id])
  ////event handler////////////////////////////////
  const book_an_room = (form, callback) => {

    srv.bookAnRoom(form, res => {
      if (res.payload) {
        setBookings(res.payload);
      }
      //error handle by children component
      callback(res)
    })
  }
  ////render helper////////////////////////////////
  function render() {
    if (isError !== "") {
      return <div className="content is-danger">
        {isError}
      </div>
    }
    if (isLoading) {
      return <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
    } else {
      return <>
        <section className="section">
          <h4 className="title">{roomInfo.name}</h4>
          <dl>
            <dt><strong>Capacity: </strong>{roomInfo.capacity}</dt>
            <dt><strong>Floor: </strong>{roomInfo.floor}</dt>
            <dt><strong>Manger e-mail: </strong><a href={`mailto:${roomInfo.manager_email}`} > {roomInfo.manager_email}</a></dt>
          </dl>
        </section >
        <div className="container">
          <div className="columns">
            <div className="column ">
              <BookingForm
                meetingRoomId={id}
                book_an_room={book_an_room}
                bookingScrollIntoView={bookingId => bookingScrollIntoView(bookingId)}
                pre_startDate={startDate}
                pre_endDate={endDate}
              />
            </div>
            <div className="column in_mobile_mode_set_fixed_height_parent">
              <BookingList scrollToId={(fn) => bookingScrollIntoView = fn} bookings={bookings} />
            </div>

          </div>
        </div>
      </>
    }
  }
  ////////////////////////////////////////////
  return <div>
    {render()}
  </div>
}
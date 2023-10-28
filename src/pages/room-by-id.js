import React, { useEffect, useState } from "react";
import srv from '../_fetch_';
import { useParams } from "react-router-dom";
import BookingForm from "../components/booking-form";
////////////////////////////////////////////
export default function RoomById() {
  const { id } = useParams();
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [roomInfo, setRoomInfo] = useState({});
  ////////////////////////////////////////////
  if (id === undefined) setIsError('id is broken.')
  useEffect(() => {
    setIsLoading(true);
    if (id !== undefined) srv.getRoomById(id, res => {
      console.log(res);
      if (res.error !== undefined) {
        setIsError(res.error);
      }
      const { room } = res.payload;
      if (room) setRoomInfo(room);
      setIsLoading(false);
    })
  }, [id])
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
            <dt>{roomInfo.capacity}</dt>
            <dt>{roomInfo.floor}</dt>
            <dt>{roomInfo.manager_email}</dt>
          </dl>
        </section>
        <BookingForm />
      </>
    }
  }
  ////////////////////////////////////////////
  return <div>
    {render()}
  </div>
}
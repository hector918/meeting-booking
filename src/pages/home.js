import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomList from "../components/room-list";
import srv from "../_fetch_";
import RoomSearchForm from "../components/available-room-search-form";
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [roomsInfo, setRoomsInfo] = useState([]);
  const [roomOrderBy, setRoomOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const navigate = useNavigate();
  const [pre_startDate, setStartDate] = useState("");
  const [pre_endDate, setEndDate] = useState("");
  //event handler/////////////////////////////
  const handleRoomClick = (id) => {
    navigate("/meetingrooms/" + id, { state: { startDate: pre_startDate, endDate: pre_endDate } });
  }
  ////////////////////////////////////////////
  useEffect(() => {
    setIsLoading(true);
    srv.getAllRooms(res => {
      if (res.payload) {
        setRoomsInfo(res.payload);
      }
      if (res.error) {
        setIsError(res.error);
      }
      setIsLoading(false);
    });
  }, [])
  ///helper///////////////////////////////////
  function searchRoom(form, callback) {
    srv.searchForRooms(form, res => {
      if (res.payload) {
        setRoomsInfo(res.payload);
      }
      if (res.error) {
        setRoomsInfo([]);
      }
    })
  }
  ///render helper/////////////////////////////
  function renderPage() {
    if (isError !== "") {
      return <div>{isError}</div>
    } else {
      return <div className="section">
        <RoomSearchForm searchRoom={searchRoom} setStartDate={setStartDate} setEndDate={setEndDate} />
        <div className="panel">
          <p className="panel-heading">Room list <span> ({roomsInfo.length}) </span></p>
          <p className="panel-tabs" onClick={handleOrderChangeClick}>
            <span style={{ margin: "auto 0" }}>Order by</span>
            <a href="#/" className="is-active" name="name">Name</a>
            <a href="#/" name="capacity">Capacity</a>
            <a href="#/" name="floor">Floor</a>
          </p>
          {isLoading ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : <RoomList
            roomsInfo={roomsInfo}
            orderKey={roomOrderBy}
            order={order}
            handleRoomClick={handleRoomClick}
          />}
        </div>
      </div>
    }
  }
  function handleOrderChangeClick(evt) {
    //remove status
    evt.currentTarget.querySelectorAll("a").forEach(el => {
      el.classList.remove("is-active");
    })
    evt.target.classList.add("is-active");
    setRoomOrderBy(evt.target.name);
  }
  ////////////////////////////////////////////
  return <div>
    {renderPage()}
  </div>
}
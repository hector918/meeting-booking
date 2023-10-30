import React, { useEffect, useState } from "react";
import RoomList from "../components/room-list";
import srv from "../_fetch_";
import RoomSearchForm from "../components/available-room-search-form";
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [roomsInfo, setRoomsInfo] = useState([]);
  const [roomOrderBy, setRoomOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
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
  ///helper////////////////////////////////////////
  function searchRoom(form, callback) {
    srv.searchForRooms(form, res => {
      console.log("search res", res)
      if (res.payload) {
        setRoomsInfo(res.payload);
      }
      if (res.error) {
        setRoomsInfo([]);
      }
    })
  }
  ///render helper//////////////////////////////////
  function renderPage() {
    if (isError !== "") {
      return <div>{isError}</div>
    } else {
      return <div className="section">
        <RoomSearchForm searchRoom={searchRoom} />
        <div className="panel">
          <p className="panel-heading">Room list</p>
          <p className="panel-tabs" onClick={handleOrderChangeClick}>
            <span style={{ margin: "auto 0" }}>Order by</span>
            <a href="#/" className="is-active" name="name">Name</a>
            <a href="#/" name="capacity">capacity</a>
            <a href="#/" name="floor">floor</a>
          </p>
          {isLoading ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : <RoomList roomsInfo={roomsInfo} orderKey={roomOrderBy} order={order} />}

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
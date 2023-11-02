var itm_idx = 1;
////////////////////////////////////////////////
export default function RoomList({ roomsInfo, orderKey, order, handleRoomClick }) {
  ////////////////////////////////////////////////
  if (roomsInfo === undefined) return <></>;
  const renderRoom = (room) => {
    return <div className="panel-block is-clickable" key={"room itm" + itm_idx++} onClick={() => handleRoomClick(room.id)}>
      <span className="panel-icon">
        <i className="fa fa-bookmark-o" aria-hidden="true"></i>
      </span>
      <div className="container">
        <div className="columns">
          <div className="column is-two-fifths">
            Name: {room.name}
          </div>
          <div className="column is-one-fifth">
            Capacity: {room.capacity}
          </div>
          <div className="column is-one-fifth">
            Floor: {room.floor}
          </div>
        </div>
        {/* <div className="columns">
          <div className="column">
            Manager email: {room.manager_email}
          </div>
        </div> */}
      </div>
    </div>
  }
  ///helper////////////////////////////////////////
  function reorderRooms(rooms) {
    return [...rooms.sort((a, b) => {
      if (order === "asc") {
        return a[orderKey] > b[orderKey] ? 0 : -1;
      } else {
        return a[orderKey] > b[orderKey] ? -1 : 0;
      }
    })];
  }
  ////////////////////////////////////////
  return <>
    {reorderRooms(roomsInfo).map(renderRoom)}
  </>
}
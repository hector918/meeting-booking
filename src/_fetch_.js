var API = process.env.REACT_APP_API_URL === "." ? `${window.location.origin}` : process.env.REACT_APP_API_URL;


let default_fetch_options = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
function error_handle(error) {
  console.error(error);
}

function fetch_post(url, fetchOptions, callback, method = 'POST') {

  fetchOptions.method = method;
  fetchOptions.headers = {
    ...default_fetch_options,
    ...fetchOptions.headers
  }
  if (fetchOptions.headers['Content-Type'] === "delete")
    delete fetchOptions.headers['Content-Type'];
  //add cookies before fire
  fetchOptions.credentials = "include";
  fetch(url, fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch(error => {
      error_handle(error);
      callback(error);
    });
}

function fetch_get(url, callback) {

  const body = {
    method: "GET",
    headers: {
      ...default_fetch_options,
    },
    credentials: "include",
  }

  fetch(url, body)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch(error => {
      error_handle(error);
      callback({ error: "fetch error" });
    });
}
function fetch_delete(url, callback) {

  const body = {
    method: "DELETE",
    headers: {
      ...default_fetch_options,
    },
    credentials: "include",
  }

  fetch(url, body)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch(error => {
      error_handle(error);
      callback({ error: "fetch error" });
    });
}

///export////////////////////////////////////////////////
function getUserProfile(callback) {
  fetch_get(`${API}/is_auth`, callback);
}
function newRoom(form, callback) {
  const body = { body: JSON.stringify(form) };
  fetch_post(`${API}/api/meeting-rooms`, body, callback);
}
function getAllRooms(callback) {
  fetch_get(`${API}/api/meeting-rooms`, callback);
}
function getRoomById(id, callback) {
  fetch_get(`${API}/api/meeting-rooms/${id}`, callback);
}
function bookAnRoom(form, callback) {
  const body = { body: JSON.stringify(form) };
  fetch_post(`${API}/api/bookings`, body, callback);
}
function getBookingByRoomId(meetingRoomId, callback) {
  fetch_get(`${API}/api/meeting-rooms/${meetingRoomId}/bookings`, callback);
}
function searchForRoomsByPost(form, callback) {
  const body = { body: JSON.stringify(form) };
  fetch_post(`${API}/api/meeting-rooms/available`, body, callback);
}
function searchForRoomsByQueryString(form, callback) {
  let queries = [];
  for (let itm of Object.entries(form)) {
    if (itm[1] !== undefined) queries.push(`${itm[0]}=${itm[1]}`);
  }
  fetch_get(`${API}/api/meeting-rooms/available?${queries.join("&")}`, callback);
}
function getAllBookings(callback) {
  fetch_get(`${API}/api/bookings`, callback);
}
function getBookingById(bookingId, callback) {
  fetch_get(`${API}/api/bookings/${bookingId}`, callback);
}
function cancelBookingById(bookingId, callback) {
  fetch_delete(`${API}/api/bookings/${bookingId}`, callback);
}
////////////////////////////////////////////////////////
export default {
  getUserProfile,
  newRoom,
  getAllRooms,
  getRoomById,
  bookAnRoom,
  searchForRoomsByPost,
  searchForRoomsByQueryString,
  getBookingByRoomId,
  getAllBookings,
  getBookingById,
  cancelBookingById
}
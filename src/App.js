import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import FindMeetingRoom from './pages/find-meeting-room';
import BookingListPage from './pages/booking-list';
import srv from './_fetch_';
import Home from './pages/home';
import Navbar from './components/navbar';
import CreateNewRoom from './pages/create-new-room';
import RoomById from './pages/room-by-id';
import BookingById from './pages/booking-by-id';
import _variable_ from './_variable_';
import { useEffect } from 'react';
///////////////////////////////////////////////////
function App() {
  useEffect(() => {
    srv.getUserProfile(res => {
      _variable_.user = { ...res.payload };
    });
  }, []);
  ///////////////////////////////////////////////////
  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
      <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet"></link>
      <link href="https://cdn.jsdelivr.net/npm/bulma-timeline@3.0.5/dist/css/bulma-timeline.min.css" rel="stylesheet"></link>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meetingrooms/new" element={<CreateNewRoom />} />
          <Route path="/meetingrooms/:id" element={<RoomById />} />
          <Route path="/bookings" element={<BookingListPage />} />
          <Route path="/bookings/:id" element={<BookingById />} />

        </Routes>
      </Router>
    </div>
  );
}
//////////////////////////////////////////////////

export default App;

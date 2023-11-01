import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingListPage from './pages/booking-list';
import Home from './pages/home';
import Navbar from './components/navbar';
import CreateNewRoom from './pages/create-new-room';
import RoomById from './pages/room-by-id';
import BookingById from './pages/booking-by-id';
import About from './pages/about';
import AuthWaitingSessionPage from './pages/auth-waiting-session-page';
import './asset/bulma/css/bulma.min.css';
import './asset/bulma-timeline.min.css';
///////////////////////////////////////////////////
function App() {
  ///////////////////////////////////////////////////
  return (
    <div className="App">
      {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link> */}
      {/* <link href="https://cdn.jsdelivr.net/npm/bulma-timeline@3.0.5/dist/css/bulma-timeline.min.css" rel="stylesheet"></link> */}
      <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet"></link>
      <Router>
        <Routes>
          <Route path="/" element={<AuthWaitingSessionPage />} />
          <Route path="/meetingrooms" element={<><Navbar /><Home /></>} />
          <Route path="/meetingrooms/new" element={<><Navbar /><CreateNewRoom /></>} />
          <Route path="/meetingrooms/:id" element={<><Navbar /><RoomById /></>} />
          <Route path="/bookings" element={<><Navbar /><BookingListPage /></>} />
          <Route path="/bookings/:id" element={<><Navbar /><BookingById /></>} />
          <Route path="/about" element={<><Navbar /><About /></>} />
        </Routes>
      </Router>
    </div>
  );
}
//////////////////////////////////////////////////
export default App;

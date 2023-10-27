import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FindMeetingRoom from './pages/find-meeting-room';
import BookingList from './pages/booking-list';
import srv from './_fetch_';
import Home from './pages/home';
import Navbar from './components/navbar';
import CreateNewRoom from './pages/create-new-room';
///////////////////////////////////////////////////
function App() {
  srv.getUserProfile(res => {
    console.log(res)
  });
  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meetingrooms/new" element={<CreateNewRoom />} />

        </Routes>
      </Router>
    </div>
  );
}
//////////////////////////////////////////////////

export default App;

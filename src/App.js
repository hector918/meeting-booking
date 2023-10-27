import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FindMeetingRoom from './pages/find-meeting-room';
import BookingList from './pages/booking-list';
/////////////////////////////////////////////////////
function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
      <Router>
        <Routes>
          <Route path="/" element={<FindMeetingRoom />} />
          <Route path="/callback" element={<BookingList />} />
        </Routes>
      </Router>
    </div>
  );
}
/////////////////////////////////////////////////////

export default App;

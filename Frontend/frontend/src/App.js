import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Components/Signup';
import EnterOtp from './Components/EnterOtp';
import Login from './Components/Login';
import Rooms from './Components/Rooms';
import RoomDetails from './Components/SingleRooms';
import Home from './Components/Home';
import Header from './Components/Header1';
import Footer from './Components/Footer';
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Routes>
          <Route path = "/" element={<Home></Home>}></Route>
          <Route path = "/signup" element={<Signup></Signup>}></Route>
          <Route path = "/otp" element={<EnterOtp></EnterOtp>}></Route>
          <Route path = "/login" element={<Login></Login>}></Route>
          <Route path = "/rooms/:name" element={<Rooms></Rooms>}></Route>
          <Route path = "/rooms/:name/:roomid" element={<RoomDetails></RoomDetails>}></Route>
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;

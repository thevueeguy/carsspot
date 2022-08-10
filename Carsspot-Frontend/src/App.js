import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Modal from "react-modal/lib/components/Modal";
import Login from "./pages/Login";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import SignUp from "./pages/SignUp";
import AvailableCars from "./pages/AvailableCars"
import BookedCarsList from "./pages/BookedCarsList";

Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          margin: "0",
          height:"100vh",
          width:"100vw",
          display: "flex",
          justifyContent: "space-between",
          
          flexDirection: "column",
        }}
      >
        <div className="header-app position-relative" >
            <Header />
            <ToastContainer/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/cars" element={<AvailableCars />} />
              <Route path="/bookings" element={<BookedCarsList />} /> 
              <Route path="*" element={<Navigate to={"/"} />}/>
            </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
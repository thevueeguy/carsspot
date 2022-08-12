import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Modal from "react-modal/lib/components/Modal";
import Login from "./pages/Login";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import SignUp from "./pages/SignUp";
import AvailableCars from "./pages/AvailableCars";
import BookedCarsList from "./pages/BookedCarsList";


Modal.setAppElement("#root");

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >          
          <div>
          <Header />
          <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/cars" element={<AvailableCars />} />
              <Route path="/bookings" element={<BookedCarsList />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
          </div>
          <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;

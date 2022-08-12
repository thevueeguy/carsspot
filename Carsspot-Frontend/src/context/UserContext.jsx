import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext();

export const Axios = axios.create({
  baseURL: "https://cars-spot.herokuapp.com/api/",
});

export const UserContextProvider = ({ children }) => {

  const [theUser, setUser] = useState("");
  const [wait, setWait] = useState(false);
  
  // user persistance
  const loggedInCheck = async () => {
    const storedUserInformation=localStorage.getItem('carsspot_user') ? JSON.parse(localStorage.getItem('carsspot_user')) :null;
    if (storedUserInformation) {
      console.log(storedUserInformation)
        setUser(storedUserInformation);
        return;
      }
      setUser(null);
    }

  useEffect(() => {
    async function asyncCall() {
      await loggedInCheck();
    }
    asyncCall();
  }, []);



  // User handlers

    // login Handler
    const loginUser = async ({ email, password, role }) => {
      setWait(true);

      const data = JSON.stringify({email, password, role});
      try {
        const res = await Axios.post("user/login.php", data);
        const {status, message, id, email: userEmail, role} = res.data;

        if (status) {
          localStorage.setItem("carsspot_user", JSON.stringify({id, email, role}));
          setUser({id, email, role});
          setWait(false);
          toast("Welcome again "+ userEmail.toString());
          return { success: 1, message: message };
        } else {
          setWait(false);
          return { success: 0,  message: message };
      } 
    } catch(err) {
        setWait(false);
        return err;
      }
    };

    // signup handler
    const signupUser = async ({ email, password, role }) => {
      setWait(true);

      const data = JSON.stringify({email, password, role});
      try {
        console.log(data);
        const res = await Axios.post("user/signup.php", data);
        const {status, message, id, email: userEmail, role} = res.data;
        if (status) {
          localStorage.setItem("carsspot_user", JSON.stringify({id, email, role}));
          setUser({id, email, role});
          setWait(false);
          toast("Welcome "+ userEmail.toString());
          return { success: 1, message: message };
        } else {
          setWait(false);
          return { success: 0,  message: message };
      } 
    } catch(err) {
        setWait(false);
        return err;
      }
    };

    // logout handler
    const logout = () => {
      localStorage.removeItem("carsspot_user");
      setUser(null);
      toast("Logged out successfully");
    };


  // Car handlers

    // Get All Cars
      const getAllCars = async () => {
        setWait(true);
        try {
          const res = await Axios.get("car/getAllCars.php");
          const {data: carsList} = res.data
          setWait(false);
          return carsList;
        } catch (err) {
          setWait(false);
          return { success: 0, message: "Could not complete your request!" };
        }
      };

      // Get available cars
      const getAvailbleCars = async () => {
        setWait(true);
        try {
          const res = await Axios.get("car/getAvailableCars.php");
          const {data: carsList} = res.data
          setWait(false);
          return carsList;
        } catch (err) {
          setWait(false);
          return { success: 0, message: "Could not complete your request!" };
        }
      };

      // add Car
      const addCar = async (data) => {
        setWait(true);
        try {
          const { data: res } = await Axios.post("car/createCar.php", data);
          console.log(res);
          setWait(false);
          return res;
        } catch (err) {
          setWait(false);
          return { success: 0, message: "Server Error!" };
        }
      };

      // edit car
      const editCar = async(data)=>{
        setWait(true);
        try {
          console.log("data", data);
          const { data: res } = await Axios.put("car/updateCar.php", data);
          console.log("res", res);
          setWait(false);
          return res;
        } catch (err) {
          setWait(false);
          return { success: 0, message: "Server Error!" };
        }
      };
        
      // Booking Handlera
        
        // Add Booking
        const addBooking = async (data) => {
          setWait(true);
          try {
            console.log("data", data);
            const { data: res } = await Axios.post("bookings/createBooking.php", data);
            setWait(false);
            return res;
          } catch (err) {
            setWait(false);
            return { success: 0, message: "Server Error!" };
          }
        };

      // Get All Bookings
      const getBookings = async () => {
        setWait(true);
        try {
          const res = await Axios.get("bookings/getAllBookings.php?userId="+(theUser.id.toString()));
          const {data: bookings} = res.data
          setWait(false);
          return bookings;
        } catch (err) {
          setWait(false);
          return { success: 0, message: "Could not complete your request!" };
        }
      };

  return (
    <UserContext.Provider
      value={{
        wait,
        logout,
        loginUser,
        signupUser,
        user: theUser,
        addCar,
        editCar,
        getAllCars,
        getAvailbleCars,
        addBooking,
        getBookings,
        loggedInCheck
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

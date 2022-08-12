import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import CarCard from "../Components/CarCard";
import Loader from "../Components/Loader";
import AddCar from "./AddCar";

function AvailableCars() {
    const { user, wait, getAllCars, getAvailbleCars } = useContext(UserContext);
    const [cars, setCars] = useState([]);
    const [addCar, setAddCar] = useState(false);
    
    useEffect(() => {
        (async () => {
            let res;
            if (user && user.role === "MANAGER") {
                console.log(user.role)
                res = await getAllCars();
            }
            else {
                res = await getAvailbleCars();
            }
            setCars(res);
        })();
    }, [user]);

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", boxSizing: "border-box", backgroundColor:"#d3d3d382" }}>
                <div style={{ display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
                    {user && user.role === "MANAGER" ? <Button variant="dark" onClick={() => setAddCar(prev => !prev)} className="btn1 m-4 ">{addCar ? "Cancer adding" : "Add new car"}</Button> : null}
                </div>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", boxSizing: "border-box" }}>
                    {wait && <Loader />}
                    {addCar && <AddCar />}
                    {cars &&
                        cars.map((car) => (
                            <CarCard car={car} />
                        ))}
                </div>
            </div>
        </>
    );
}

export default AvailableCars;

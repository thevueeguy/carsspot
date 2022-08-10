import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Home = () => {
    const {user} = useContext(UserContext);
    return (
            <div className="">
                <img src='/Images/bg.jpg' alt="" style={{objectFit:"cover", height:"77vh", width:"99vw"}} className='' />
                 <div style={{position:"absolute", top:"50vh", left:"50vw", transform:"translate(-50%,-100%)", textAlign:"center", opacity:"0.9"}}>
                    <h1 className='d-flex justify-content-center display-1 text-light'><b>Cars Spot</b></h1>
                    <Link to={"/cars"}>
                        <Button variant="light">Available cars to rent</Button>
                    </Link>
                    {user && user.role==="MANAGER" ? <Link to={"/bookings"}>
                        <Button variant="light">View booked cars</Button>
                    </Link> : null}
                 </div>
            </div>
    )  
}
export default Home
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import Loader from '../Components/Loader';
import ErrorMessage from '../Components/ErrorMessage';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [asAgency, setAsAgency] = useState(false);
    const navigate = useNavigate();
    const {user, wait, loginUser} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            navigate("/", { replace: true });
        }
    }, [user, navigate])

    // validate email
    const emailValidation = () => {
        if( /(.+)@(.+){2,}\.(.+){2,}/.test(email) ){
            return true;
          } else {
              setMessage("Invalid email!")
              return false;
          }
        }
    
    // validate password
     const handleClick = async (e) => {
        e.preventDefault();
        if(emailValidation()){
                if(password.length>=5) {
                        setMessage(null)
                        const details = await loginUser({email, password, role: asAgency?"MANAGER":"USER"});
                        if(details.success===0) {
                            setMessage(details.message);
                        }
                    }   else {
                        setMessage("Password is too short!");
                    }
                } else {
                    setMessage("Invalid Email!")
                }
        }



    return (
        <section className='Form my-5 py-5'>

            <div className="container d-flex justify-content-center">
                <div className="row g-0 align-items-center">
                    <div className="col-lg-5 ">
                        <img src='/Images/AuthSection.jpg' alt="" className='img-fluid' />
                    </div>
                    <div className="col-lg-7 px-4 pl-5">
                        <h1 className='d-flex justify-content-center'>Cars Spot</h1>
                        <h4 className='d-flex justify-content-center'>Sign into your account</h4>
                        <form action="">
                            {(wait ||error || message) && 
                            <div className='form-row d-flex justify-content-center'>
                                    {wait && <Loader />}
                                    {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                                    {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
                                    </div>                                
                            }
                            <div className="form-row d-flex justify-content-center">
                                <div className="col-lg-7">
                                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email-address' className='form-control my-3 p-4' />
                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div className="col-lg-7">
                                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="form-control my-3 p-4" />
                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div>
                                    <Button variant="dark" type="submit" className="btn1 mt-3 mb-5 " onClick={handleClick}>Login</Button>
                                </div>
                                <div>
                                    <Button variant="dark" className="btn1 mt-3 mb-5 " onClick={()=>setAsAgency(prev=>!prev)}>{asAgency ? "Login as Customer" : "Login as Agency"}</Button>
                                </div>
                            </div>
                            <p className='d-flex justify-content-center'>Don't have an account? &nbsp;<Link to='/signup'>Sign up</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
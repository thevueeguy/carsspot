import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import ErrorMessage from '../Components/ErrorMessage';
import Loader from '../Components/Loader';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [asAgency, setAsAgency] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {user, wait, signupUser} = useContext(UserContext);

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
                if(password.length>=5 && password===confirmPassword) {
                        setMessage(null)
                        const details = await signupUser({email, password, role: asAgency?"MANAGER":"USER"});
                        if(details.success===0) {
                            setMessage(details.message);
                        }
                    }   else {
                        if(password.length<5)
                            setMessage("Password is too short!");
                        else
                            setMessage("Passwords do not match");
                    }
                } else {
                    setMessage("Invalid Email!")
                }
        }

    useEffect(() => {
        if (user) {
            navigate("/", { replace: true });
        }
    }, [user, navigate])

    return (
        <section className='Form my-5 py-5'>

            <div className="container">
                <div className="row g-0 align-items-center">
                    <div className="col-lg-5 ">
                        <img src='/Images/AuthSection.jpg' alt="" className='img-fluid' />
                    </div>
                    <div className="col-lg-7 px-4 pl-5">
                        <h1 className='d-flex justify-content-center'>Cars Spot</h1>
                        <h4 className='d-flex justify-content-center'>Sign into your account</h4>
                        <form action="">
                        {(wait || error || message) && 
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
                                <div className="col-lg-7">
                                    <input type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className="form-control my-3 p-4" />
                                </div>
                            </div>
                            <div className="form-row d-flex flex-row justify-content-center">
                                <div>
                                    <Button variant="dark" type="submit" className="btn1 mt-3 mb-5 " onClick={handleClick}>Signup</Button>
                                </div>
                                <div>
                                    <Button variant="dark" className="btn1 mt-3 mb-5 " onClick={()=>setAsAgency(prev=>!prev)}>{asAgency ? "Signup as Customer" : "Sign up as Agency"}</Button>
                                </div>
                            </div>
                            <p className='d-flex justify-content-center'>Already have an account? &nbsp;<Link to='/login'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
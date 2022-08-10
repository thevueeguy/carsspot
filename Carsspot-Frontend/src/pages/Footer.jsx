import React from 'react'
import { MDBFooter, MDBIcon } from "mdbreact";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <MDBFooter style={{height:"17vh", width:"99vw", bottom: "0"}} className='bg-dark text-center text-white h-9'>
                <section className='m-4'>
                    <a className='btn btn-outline-light btn-floating m-1' href='https://www.instagram.com/s.h.a.r.a.d.r/' role='button'>
                        <MDBIcon fab icon='instagram' />
                    </a>
                    <a className='btn btn-outline-light btn-floating m-1' href='https://www.linkedin.com/in/sharad-kushwah/' role='button'>
                        <MDBIcon fab icon='linkedin-in' />
                    </a>

                    <a className='btn btn-outline-light btn-floating m-1' href='https://github.com/thevueeguy' role='button'>
                        <MDBIcon fab icon='github' />
                    </a>
                </section>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2022 Copyright &nbsp; :   
                <Link to='/'>
                &nbsp;&nbsp;CarsSpot.com
                </Link>
                <a href='https://www.linkedin.com/in/sharad-kushwah/'>
                &nbsp;&nbsp;Made by Sharad Kushwah
                </a>
            </div>
        </MDBFooter>
    )
}

export default Footer
import React, { useState } from 'react';
import { useContext } from 'react';
import { Card, Form, Button, Row, Col, Badge } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';
import { images, cars } from '../Components/Images';
import Loader from '../Components/Loader';


function AddBike() {
    const { addCar, wait } = useContext(UserContext);
    const [image, setImage] = useState("default")
    const [model, setModel] = useState("car")
    const [number, setNumber] = useState("")
    const [seatingCapacity, setSeatingCapacity] = useState("");
    const [rentPerDay, setRentPerDay] = useState("");
    const [isAvailable, setIsAvailable] = useState("AVAILABLE")

    const submitHandler = async (e) => {
        e.preventDefault()
        if (number === "" || seatingCapacity === "" || rentPerDay === "") {
            toast("Enter all the details to add a new Car!");
        } 
        else {
            const data = {
                model: model==='car'?'default':model,
                number,
                seatingCapacity: parseInt(seatingCapacity),
                rentPerDay: parseInt(rentPerDay),
                isAvailable: isAvailable === "AVAILABLE" ? 1 : 0
            }
            const response = await addCar(JSON.stringify(data));
            toast(response.message);
        }
    }

    return (
        <>
            <Card className="w-25 h-25 m-5 d-flex justify-content-between" style={{ boxSizing: "border", borderRadius: "32px" }}>
                {wait && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Card.Img variant="top" src={"./Images/" + (image).toString() + ".jpg"} style={{ height: "20vh", padding: "0 80px" }} />
                    <Form.Group controlId='image' className='px-4 mt-4'>
                        <Row>
                            <Col sm={3}>
                                <Form.Label><b>Image :</b></Form.Label>
                            </Col>
                            <Col sm={9}>
                                <Form.Control
                                    as='select'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                    {images.map((image, index) => {
                                        return <option value={image} key={index}>{image}</option>
                                    })}
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Card.Body>
                        <div className="d-flex flex-column text-center justify-content-center h-25">
                            <Form.Group controlId='model' className='px-1 mb-3'>
                                <Row>
                                    <Col sm={3}>
                                        <Form.Label><b>Model : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></Form.Label>
                                    </Col>
                                    <Col sm={9}>
                                        <Form.Control
                                            as='select'
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)}
                                        >
                                            {cars.map((model, index) => {
                                                return <option value={model} key={index}>{model}</option>
                                            })}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row className="text-center">
                                    <Col sm={4}>
                                        <Form.Label><b>Set Availability :</b></Form.Label>
                                    </Col>
                                    <Col sm={7}>
                                        <Form.Control
                                            as='select'
                                            value={isAvailable}
                                            onChange={(e) => setIsAvailable(e.target.value)}
                                        >
                                            <option value="AVAILABLE">available</option>
                                            <option value="UNAVAILABLE">unavailable</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId='number' className='my-3'>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Label> <b>Car Number : &nbsp;&nbsp;&nbsp;&nbsp;</b></Form.Label>
                                    </Col>
                                    <Col sm={7}>
                                        <Form.Control
                                            type='text'
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                            placeholder="type here..."
                                        >

                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId='rentPerDay' className='mb-3'>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Label> <b>Rent Per Day: &nbsp;&nbsp;&nbsp;</b></Form.Label>
                                    </Col>
                                    <Col sm={7}>
                                        <Form.Control
                                            type='text'
                                            value={rentPerDay}
                                            onChange={(e) => setRentPerDay(e.target.value)}
                                            placeholder="type here..."
                                        >
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId='seatingCapacity' className='mb-3'>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Label> <b>Seats Capacity:&nbsp;</b></Form.Label>
                                    </Col>
                                    <Col sm={7}>
                                        <Form.Control
                                            type='text'
                                            value={seatingCapacity}
                                            onChange={(e) => setSeatingCapacity(e.target.value)}
                                            placeholder="type here..."
                                        >
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button
                                className='my-3'
                                type="submit"
                                variant='outline-dark'
                            >Add this {model}
                            </Button>
                        </div>
                    </Card.Body>
                </Form>
            </Card>
        </>
    )
}

export default AddBike

import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Card, Badge, Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from 'react-toastify';
import { images, cars } from "./Images";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Loader from "./Loader";
import Modal from "react-modal/lib/components/Modal";

const CarCard = ({ car }) => {
    const { user, editCar, addBooking, wait } = useContext(UserContext);

    // Modal hook
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Car edit hooks
    const [edit, setEdit] = useState(false);
    const [image, setImage] = useState(car.model)
    const [model, setModel] = useState(car.model)
    const [number, setNumber] = useState(car.number)
    const [seatingCapacity, setSeatingCapacity] = useState(car.seatingCapacity);
    const [rentPerDay, setRentPerDay] = useState(car.rentPerDay);
    const [isAvailable, setIsAvailable] = useState(car.isAvailable ? "AVAILABLE" : "UAVAILABLE");

    // Booking hooks
    const [startDate, setStartDate] = useState("");
    const [days, setDays] = useState(1);

    // navigation
    const navigate = useNavigate();

    // booking handler
    const bookingHandler = async (e) => {
        e.preventDefault();
        const bookingDetails = {
            carId: car.id,
            userId: user.id,
            startDate,
            numberOfDays: days
        }
        console.log(bookingDetails)
        const response = await addBooking(JSON.stringify(bookingDetails));
        toast(response.message);
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        if (number === "" || seatingCapacity === "" || rentPerDay === "") {
            toast("Enter all the details to add a new Car!");
        }
        else {
            const data = {
                id: car.id,
                model: model === 'car' ? 'default' : model,
                number,
                seatingCapacity: parseInt(seatingCapacity),
                rentPerDay: parseInt(rentPerDay),
                isAvailable: isAvailable === "AVAILABLE" ? 1 : 0
            }
            const response = await editCar(JSON.stringify(data));
            toast(response.message);
        }
    }


    const handleClick = () => {
        if (user !== null) {
            if (user.role === "MANAGER") {
                toast("Only customers are allowed to rent a car!")
            } else {
                setModalIsOpen(true);
            }
        } else {
            toast("Create an account to rent a car and enjoy the ride!")
            navigate("../signup");
        }
    }

    return (
        <>
            {edit ?
                (<Card className="w-25 h-25 m-5 d-flex justify-content-between" style={{ boxSizing: "border", borderRadius: "32px" }}>
                    <Form onSubmit={submitHandler}>
                        <Card.Img variant="top" src={"./Images/" + (image).toString() + ".jpg"} style={{ height: "20vh", padding: "10px 80px" }} />
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
                                <Row>
                                    <Col>
                                        <Button
                                            className='my-3'
                                            type="submit"
                                            variant='outline-dark'
                                        >Update {model}
                                        </Button>
                                    </Col>
                                    <Col >
                                        <Button variant="danger" className="my-3" onClick={() => setEdit(prev => !prev)}>
                                            <strong>Cancel Edit</strong>
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Form>
                </Card>)
                : (<Card className="w-25 h-25 m-5 d-flex justify-content-between" style={{ boxSizing: "border", borderRadius: "32px" }}>
                    <Card.Img variant="top" src={"./Images/" + (car.model).toString() + ".jpg"} style={{ height: "25vh", padding: "10px 40px" }} />
                    <Card.Body>
                        {modalIsOpen ? ( // Modal
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={() =>
                                    setModalIsOpen(false)}
                                style={
                                    {
                                        overlay: {
                                            // give style to modal body
                                        },
                                        content: {
                                            height: "75vh",
                                            width: "50vw",
                                            color: 'Black',
                                            margin: "auto"
                                        }
                                    }
                                }
                            >
                                <Row>
                                    <Col >
                                        <img variant="top" src={"./Images/" + (car.model).toString() + ".jpg"} style={{ height: "25vh", padding: "10px 40px", margin: "30% 0" }} />
                                    </Col>
                                    <Col className="h-100">
                                        <div className="d-flex flex-column flex justify-content-between">
                                            {wait && <Loader />}
                                            <Card className="mb-5 mt-2">
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item>
                                                        <h3 className="text-uppercase"><b>{"Model : " + (car?.model).toString()}</b></h3>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <h3><b>{"Number : " + (car?.number).toString()}</b></h3>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <h3><b>{"Rent : " + (car?.rentPerDay).toString()}</b></h3>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card>

                                            <Card>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>
                                                                {car?.isAvailable === 1 ? (
                                                                    <Badge pill bg="dark" text="light" className="pt-2 px-3">
                                                                        <h5>Available</h5>
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge pill bg="info" text="light" className="py-2 px-3">
                                                                        <h1>Unavailable</h1>
                                                                    </Badge>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Start Date</Col>
                                                            <Col>
                                                                <DatePicker
                                                                    selected={new Date()}
                                                                    onChange = {(date) => {
                                                                        let formattedDate = `${date.getFullYear() + 1}/${date.getMonth()}/${date.getDate()}`;
                                                                        // console.log(formattedDate);
                                                                        setStartDate(formattedDate);
                                                                      }}
                                                                    minDate={new Date()}
                                                                    dateFormat="yyyy/MM/dd"
                                                                    onKeyDown={(e) => {
                                                                        e.preventDefault();
                                                                    }}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Form.Group controlId="formBasicSelect">
                                                            <Form.Label>
                                                                Number of days to rent {car?.model}
                                                            </Form.Label>
                                                            <Form.Control
                                                                as="select"
                                                                value={days}
                                                                onChange={(e) => {
                                                                    setDays(e.target.value);
                                                                }}
                                                            >
                                                                <option value="1">1 day</option>
                                                                <option value="2">2 days</option>
                                                                <option value="3">3 days</option>
                                                                <option value="4">4 days</option>
                                                                <option value="5">5 days</option>
                                                                <option value="6">6 days</option>
                                                                <option value="7">7 days</option>
                                                                <option value="8">8 days</option>
                                                                <option value="9">9 days</option>
                                                                <option value="10">10 days</option>
                                                                <option value="11">11 days</option>
                                                                <option value="12">12 days</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Button
                                                            type="submit"
                                                            className="btn-block"
                                                            onClick={bookingHandler}
                                                            disabled={car?.isAvailable === 0}
                                                        >
                                                            Book Now
                                                        </Button>
                                                    </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Button variant="danger" className="btn-block" onClick={() => setModalIsOpen(false)}>
                                                        Cancel
                                                    </Button>
                                                </ListGroup.Item>
                                                </ListGroup>
                                            </Card>
                                        </div>
                                    </Col>
                                </Row>

                            </Modal>)
                            : (<div className="d-flex flex-column text-center justify-content-center h-25">
                                <Card.Text>
                                    {car.isAvailable === 1 ? (
                                        <Badge pill bg="dark" text="light" style={{ fontSize: "20px", padding: "10px 20px", margin: "0 20px" }}>
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge pill bg="secondary" text="light" style={{ fontSize: "20px", padding: "10px 20px", margin: "0 20px" }}>
                                            Booked
                                        </Badge>
                                    )}
                                </Card.Text>
                                <div className="my-4">
                                    <Link to={`/cars/${car.id}`}>
                                        <Card.Text as="h1" className="my-1 py-1 text-uppercase ">
                                            <h4>
                                                <b>{car.model}</b>
                                            </h4>
                                        </Card.Text>
                                    </Link>
                                    <Card.Text as="h5" className="my-1 py-1">
                                        <span><b>Vehicle Number:</b> </span>
                                        <strong>{car.number}</strong>
                                    </Card.Text>
                                    <Card.Text as="h5" className="my-1 py-1">
                                        <span><b>Seating Capacity:</b> </span>
                                        <strong>{car.seatingCapacity}</strong>
                                    </Card.Text>
                                    <Card.Text as="h5" className="my-1 py-1">
                                        <span><b>Rent/day:</b> </span>
                                        <strong>{car.rentPerDay}</strong>
                                    </Card.Text>
                                </div>
                                <Row>
                                    <Col>
                                        <Button variant="dark" className="my-3" onClick={handleClick}>
                                            <strong>Rent this {car.model}</strong>
                                        </Button>
                                    </Col>
                                    {user && user.role === "MANAGER" && <Col>
                                        <Button variant="danger" className="my-3" onClick={() => setEdit(prev => !prev)}>
                                            <strong>Edit this {car.model}</strong>
                                        </Button>
                                    </Col>}
                                </Row>
                            </div>)}
                    </Card.Body>
                </Card>)
            }
        </>
    );
};

export default CarCard;

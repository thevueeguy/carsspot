import React, { useContext, useEffect, useState } from "react";
import { Table, Row, Col } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import Loader from "../Components/Loader";

function BookedCarsList() {
  const { wait, getBookings } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    (async () => {
        let res;
        res = await getBookings();
        setBookings(res);

    })();
}, []);
  
  return (
    <>
      
      {wait ? <Loader /> : (
        <Row>
          <Col>
            <h1>ALL BOOKINGS : </h1>
          </Col>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Booked Vehicle Model</th>
                <th>Booked Vehicle Number</th>
                <th>Start Date</th>
                <th>No. of Days</th>
              </tr>
            </thead>
            <tbody>
              {bookings &&
                bookings.map((item) => (
                  <tr key={item.id}>
                    <td>{item.carId}</td>
                    <td>{item.userId}</td>
                    <td>{item.startDate}</td>
                    <td>{item.numberOfDays}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
      )
      }
    </>
  );
}

export default BookedCarsList;

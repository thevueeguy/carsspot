# carsspot

# Functionalities 

- Login and signup but as an agency(manager) and customer(user) - (Edge case handling is done in backend)

- customer can book the available cars 

- agency can add a new car, edit the current car and see all the bookings 


# About app 

- Frontend using : React, ContextApi, Bootstrap, Axios, some small libraries for toast, mdbreact etc.

- Backend using : PHP, Mysql

- Deployment :
		
		Frontend - Netlify (https://lucent-meerkat-84aea8.netlify.app/)
		Backend  - Heroku  (https://cars-spot.herokuapp.com/)
		Database - Hosted using (www.freesqldatabase.com)

- Repositories :
		
		Frontend - Github (https://github.com/thevueeguy/car-rental-frontend)
		Backend  - Github  (https://github.com/thevueeguy/car-rental-backend)
		Database - .Sql-file (https://github.com/thevueeguy/carsspot/tree/main/Carsspot-Backend/MySql)

- Apis (Axios.post or with ajax method)
	 
	 - api/bookings/createBooking.php
	 - api/bookings/getAllBookings.php
	 - api/bookings/getBookingsByUserId.php

	 - api/car/carById.php
	 - api/car/createCar.php
	 - api/car/deleteCar.php
	 - api/car/getAllCars.php
	 - api/car/getAvailableCars.php
	 - api/car/updateCar.php

	 - api/user/login.php
	 - api/user/signup.php


# What is handled 

- Majority of CRUD operations have been handled in the backend instead of adding filters in the frontend.

- UI is taken care of with the using of bootstrap.

- UX is also been made smooth and components are easily accessible

- Folder structure is self explanatory.

- Error messages are human readable.

- Data persists - Used local storage.

- Approach has been followed for making the Neat, Simple and mininal application.

# How to install the app 

- database is named "cars_project" - import the sql file in xampp or other app which has mysql running.

- Put the backend in the htdocs folder and name it carsspot instead of carsspot-backend

- install the frontend using "npm start"

- test the project 


THANK YOU

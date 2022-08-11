-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 10, 2022 at 10:55 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cars_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `carId` int(11) NOT NULL,
  `numberOfDays` int(11) NOT NULL,
  `startDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `userId`, `carId`, `numberOfDays`, `startDate`) VALUES
(6, 10, 1, 3, '2023-07-24'),
(7, 10, 1, 4, '2023-07-17');

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `model` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seatingCapacity` int(11) NOT NULL,
  `rentPerDay` int(11) NOT NULL,
  `isAvailable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `model`, `number`, `seatingCapacity`, `rentPerDay`, `isAvailable`) VALUES
(1, 'minivan', '1222', 4, 2000, 1),
(2, 'truck', '1400', 3, 4000, 1),
(3, 'coupe', '2343', 4, 4000, 1),
(4, 'suv', '9951', 6, 3000, 1),
(5, 'hatchback', '4312', 4, 2000, 1),
(6, 'pickup', '8678', 2, 2000, 1),
(7, 'roadster', '5467', 4, 4000, 1),
(8, 'micro', '2645', 4, 1000, 1),
(9, 'van', '1354', 8, 1500, 1),
(10, 'minivan', '9667', 4, 2000, 1),
(11, 'minivan', 'Mp041234', 6, 2000, 1),
(16, 'truck', 'UP088776', 5, 2500, 1),
(27, 'van', 'MP07 420', 2, 3000, 0),
(28, 'truck', 'DL088776', 10, 1211, 1),
(30, 'hatchback', 'DL088', 2, 2500, 1),
(31, 'default', 'DL32445', 5, 2500, 1),
(32, 'default', 'DL07 9746', 6, 4000, 0),
(33, 'suv', 'HM08', 5, 3500, 0),
(34, 'coupe', 'COOP89', 3, 3200, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`) VALUES
(9, 'carAgency@gmail.com', 'Y2Fyc3Nwb3Q=', 'MANAGER'),
(10, 'customer@gmail.com', 'Y2Fyc3Nwb3Q=', 'USER'),
(11, 'internshala@gmail.com', 'aW50ZXJuc2hhbGE=', 'USER'),
(12, 'sharad@gmail.com', 'c2hhcmFk', 'MANAGER');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

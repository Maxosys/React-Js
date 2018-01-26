-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2018 at 01:18 PM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `itribedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `itribe_admin`
--

CREATE TABLE `itribe_admin` (
  `id` int(15) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `location` varchar(256) NOT NULL,
  `status` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `about_you` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itribe_admin`
--

INSERT INTO `itribe_admin` (`id`, `name`, `email`, `password`, `location`, `status`, `created_at`, `about_you`) VALUES
(1, 'admin', 'admin@itribe.com', 'admin', 'india', '1', '2018-01-17 18:30:00', 'ok');

-- --------------------------------------------------------

--
-- Table structure for table `itribe_community`
--

CREATE TABLE `itribe_community` (
  `community_id` int(15) NOT NULL,
  `community_owner_id` int(15) NOT NULL,
  `community_name` varchar(256) DEFAULT NULL,
  `community_size` int(15) NOT NULL DEFAULT '10',
  `community_religion` varchar(256) DEFAULT NULL,
  `community_spoken` varchar(256) DEFAULT 'english',
  `community_tagline` text,
  `comminty_desc` text,
  `community_visibility` varchar(15) DEFAULT NULL,
  `community_status` int(15) NOT NULL DEFAULT '0',
  `community_location` varchar(256) DEFAULT NULL,
  `community_lat_long` varchar(256) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itribe_community`
--

INSERT INTO `itribe_community` (`community_id`, `community_owner_id`, `community_name`, `community_size`, `community_religion`, `community_spoken`, `community_tagline`, `comminty_desc`, `community_visibility`, `community_status`, `community_location`, `community_lat_long`, `created_at`, `updated_at`) VALUES
(1, 2, 'Indiaaa', 12, 'Indiaaa', 'Hindi , English ,Punjabi', 'Indiaaa\'s is the best', '', 'on', 1, '', '22.007760283609098_79.31053110326845', '2018-01-12 12:46:13', '2018-01-12 12:46:13'),
(6, 2, 'China', 10, 'Chinies', 'China,English,Hindi', 'This is a China Community', 'This is a China Community okay.', 'on', 1, '', '35.17824703339206_99.51770094706076', '2018-01-12 13:10:04', '2018-01-12 13:10:04');

-- --------------------------------------------------------

--
-- Table structure for table `itribe_commu_invitation`
--

CREATE TABLE `itribe_commu_invitation` (
  `invitation_id` int(15) NOT NULL,
  `user_id` int(15) NOT NULL,
  `commu_id` int(15) NOT NULL,
  `user_emailid` varchar(256) DEFAULT NULL,
  `status` varchar(256) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itribe_commu_invitation`
--

INSERT INTO `itribe_commu_invitation` (`invitation_id`, `user_id`, `commu_id`, `user_emailid`, `status`, `created_at`) VALUES
(11, 2, 1, 'a@gmail.com', '0', '2018-01-23 11:41:39');

-- --------------------------------------------------------

--
-- Table structure for table `itribe_commu_members`
--

CREATE TABLE `itribe_commu_members` (
  `commun_rel_id` int(15) NOT NULL,
  `commun_id` int(15) NOT NULL,
  `user_id` int(15) NOT NULL,
  `user_join_status` varchar(256) NOT NULL DEFAULT '0',
  `status` varchar(256) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itribe_commu_members`
--

INSERT INTO `itribe_commu_members` (`commun_rel_id`, `commun_id`, `user_id`, `user_join_status`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '1', '1', '2018-01-11 18:30:00', '2018-01-11 18:30:00'),
(9, 6, 2, '1', '1', '2018-01-17 08:17:38', '2018-01-17 08:17:38'),
(10, 1, 2, '1', '1', '2018-01-11 18:30:00', '2018-01-11 18:30:00'),
(12, 1, 26, '1', '1', '2018-01-24 10:46:36', '2018-01-24 10:46:36'),
(13, 1, 28, '1', '1', '2018-01-25 10:04:20', '2018-01-25 10:04:20');

-- --------------------------------------------------------

--
-- Table structure for table `itribe_messages`
--

CREATE TABLE `itribe_messages` (
  `msg_id` int(15) NOT NULL,
  `sender_id` int(15) DEFAULT NULL,
  `reciver_id` int(15) DEFAULT NULL,
  `msg_text` text,
  `status` int(15) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `remove_by` int(15) DEFAULT NULL,
  `remove_all_by` int(15) DEFAULT NULL,
  `community_id` int(15) DEFAULT NULL,
  `chat_file` varchar(256) DEFAULT NULL,
  `file_extension` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itribe_messages`
--

INSERT INTO `itribe_messages` (`msg_id`, `sender_id`, `reciver_id`, `msg_text`, `status`, `created_at`, `updated_at`, `remove_by`, `remove_all_by`, `community_id`, `chat_file`, `file_extension`) VALUES
(1, 28, 1, 'Hi', 1, '2018-01-25 12:50:24', '2018-01-25 12:50:24', NULL, NULL, 1, 'text', ''),
(2, 28, 2, 'hi', 1, '2018-01-25 18:26:39', '2018-01-25 18:26:39', NULL, NULL, 1, 'text', ''),
(3, 28, 2, 'good', 1, '2018-01-25 18:38:04', '2018-01-25 18:38:04', NULL, NULL, 1, 'text', ''),
(4, 2, 28, 'hi2', 1, '2018-01-25 18:42:30', '2018-01-25 18:42:30', NULL, NULL, 0, 'text', ''),
(5, 28, 2, 'nice', 1, '2018-01-26 09:32:04', '2018-01-26 09:32:04', NULL, NULL, 0, 'text', '');

-- --------------------------------------------------------

--
-- Table structure for table `itribe_users`
--

CREATE TABLE `itribe_users` (
  `id` int(15) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `location` varchar(256) NOT NULL,
  `status` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `about_you` text,
  `user_type` varchar(256) NOT NULL DEFAULT 'web',
  `dob` varchar(256) DEFAULT NULL,
  `gender` varchar(256) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itribe_users`
--

INSERT INTO `itribe_users` (`id`, `name`, `email`, `password`, `location`, `status`, `created_at`, `about_you`, `user_type`, `dob`, `gender`) VALUES
(1, 'Testing', 'developer@itribe.com', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', 'chandigarh, india', '1', '2018-01-10 13:20:03', NULL, 'web', NULL, NULL),
(2, 'Ankit', 'abc@gmail.com', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', 'india', '1', '2018-01-10 17:43:54', NULL, 'web', NULL, NULL),
(19, 'Aseem', 'info@itribe.com', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', '', '1', '2018-01-18 11:34:00', NULL, 'web', NULL, NULL),
(20, 'Ankit', 'ankit.sharma@nanowebtech.com', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', '', '1', '2018-01-18 14:21:47', NULL, 'web', NULL, NULL),
(26, 'a', 'a@gmail.com', '961b6dd3ede3cb8ecbaacbd68de040cd78eb2ed5889130cceb4c49268ea4d506', '', '1', '2018-01-24 10:46:36', NULL, 'web', NULL, NULL),
(28, 'Neha Mehra', 'nanowebtech12@gmail.com', '1991079741145830', 'Indiaa', '1', '2018-01-25 09:17:15', NULL, 'fb', '07/01/1992', 'female');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `itribe_admin`
--
ALTER TABLE `itribe_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `itribe_community`
--
ALTER TABLE `itribe_community`
  ADD PRIMARY KEY (`community_id`);

--
-- Indexes for table `itribe_commu_invitation`
--
ALTER TABLE `itribe_commu_invitation`
  ADD PRIMARY KEY (`invitation_id`);

--
-- Indexes for table `itribe_commu_members`
--
ALTER TABLE `itribe_commu_members`
  ADD PRIMARY KEY (`commun_rel_id`);

--
-- Indexes for table `itribe_messages`
--
ALTER TABLE `itribe_messages`
  ADD PRIMARY KEY (`msg_id`);

--
-- Indexes for table `itribe_users`
--
ALTER TABLE `itribe_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `itribe_admin`
--
ALTER TABLE `itribe_admin`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `itribe_community`
--
ALTER TABLE `itribe_community`
  MODIFY `community_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `itribe_commu_invitation`
--
ALTER TABLE `itribe_commu_invitation`
  MODIFY `invitation_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `itribe_commu_members`
--
ALTER TABLE `itribe_commu_members`
  MODIFY `commun_rel_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `itribe_messages`
--
ALTER TABLE `itribe_messages`
  MODIFY `msg_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `itribe_users`
--
ALTER TABLE `itribe_users`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

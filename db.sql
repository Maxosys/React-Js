-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 03, 2018 at 12:53 PM
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
(6, 2, 'China', 10, 'Chinies', 'China,English,Hindi', 'This is a China Community', 'This is a China Community okay.', 'on', 1, '', '35.17824703339206_99.51770094706076', '2018-01-12 13:10:04', '2018-01-12 13:10:04'),
(7, 28, 'Bindass', 14, 'English', 'English', 'Bindass Play was a Hindi Indian music television channel based in India', 'Bindass Play was a Hindi Indian music television channel based in India, owned by The Walt Disney Company (India). The channel was launched on 1 October 2014 and replaced an HD Bollywood news and entertainment channel, UTV Stars.', 'on', 1, '', '27.218304875732358_73.73877425254724', '2018-01-29 05:54:04', '2018-01-29 05:54:04');

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
(17, 28, 7, 'ankit.sharma@nanowebtech.com', '0', '2018-01-29 06:26:36'),
(16, 28, 7, 'ankit.sharma@nanowebtech.com', '0', '2018-01-29 06:26:36'),
(15, 28, 7, 'ab@gmail.com', '0', '2018-01-29 06:19:09'),
(14, 28, 7, 'ab@gmail.com', '0', '2018-01-29 06:18:24'),
(13, 28, 7, 'ab@gmail.com', '0', '2018-01-29 06:13:05'),
(11, 2, 1, 'a@gmail.com', '0', '2018-01-23 11:41:39'),
(12, 28, 7, 'ankit.sharma@nanowebtech.com', '0', '2018-01-29 06:02:04');

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
(13, 1, 28, '1', '1', '2018-01-25 10:04:20', '2018-01-25 10:04:20'),
(14, 7, 20, '1', '1', '2018-01-29 06:55:23', '2018-01-29 06:55:23'),
(16, 6, 28, '1', '1', '2018-01-29 08:04:14', '2018-01-29 08:04:14'),
(17, 7, 2, '1', '1', '2018-02-03 11:00:37', '2018-02-03 11:00:37');

-- --------------------------------------------------------

--
-- Table structure for table `itribe_contact`
--

CREATE TABLE `itribe_contact` (
  `contact_id` int(15) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `subject` varchar(256) DEFAULT NULL,
  `message` text,
  `status` int(15) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itribe_contact`
--

INSERT INTO `itribe_contact` (`contact_id`, `name`, `email`, `subject`, `message`, `status`, `created_at`) VALUES
(1, 'Ankit', 'ankit.sharma@nanowebtech.com', 'Community', NULL, 1, '2018-02-02 15:18:07'),
(2, 'Ankit', 'ankit.sharma@nanowebtech.com', 'Chaina Community', NULL, 1, '2018-02-02 15:18:41');

-- --------------------------------------------------------

--
-- Table structure for table `itribe_library`
--

CREATE TABLE `itribe_library` (
  `library_id` int(15) NOT NULL,
  `community_id` int(15) DEFAULT NULL,
  `library_subtitle` varchar(256) NOT NULL,
  `library_desc` text,
  `user_id` int(15) DEFAULT NULL,
  `filename` varchar(256) DEFAULT NULL,
  `file_extension` varchar(256) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(15) NOT NULL DEFAULT '1',
  `originalname` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itribe_library`
--

INSERT INTO `itribe_library` (`library_id`, `community_id`, `library_subtitle`, `library_desc`, `user_id`, `filename`, `file_extension`, `created_at`, `updated_at`, `status`, `originalname`) VALUES
(1, 1, 'This is doc related to user information', 'This is doc related to user information', 2, 'libfiles_1517297688475.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2018-01-30 07:34:48', '2018-01-30 07:34:48', 1, 'working.docx'),
(2, 1, 'ff', 'ff', 2, 'libfiles_1517298159843.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2018-01-30 07:42:39', '2018-01-30 07:42:39', 1, 'working.docx'),
(3, 1, 'info in pdf', 'info in pdf', 2, 'libfiles_1517298224160.pdf', 'application/pdf', '2018-01-30 07:43:44', '2018-01-30 07:43:44', 1, 'reference.pdf'),
(4, 1, 'This is video', 'this is video', 2, 'libfiles_1517555202815.mp4', 'video/mp4', '2018-02-02 07:06:42', '2018-02-02 07:06:42', 1, 'big_buck_bunny_720p_2mb.mp4');

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
(5, 28, 2, 'nice', 1, '2018-01-26 09:32:04', '2018-01-26 09:32:04', NULL, NULL, 0, 'text', ''),
(6, 28, 2, 'ok', 1, '2018-01-29 08:10:49', '2018-01-29 08:10:49', NULL, NULL, 6, 'text', ''),
(7, 28, 2, 'okay', 1, '2018-01-29 08:15:48', '2018-01-29 08:15:48', NULL, NULL, 6, 'text', ''),
(8, 2, 28, 'ok', 1, '2018-02-02 10:45:57', '2018-02-02 10:45:57', NULL, NULL, 0, 'text', '');

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
-- Indexes for table `itribe_contact`
--
ALTER TABLE `itribe_contact`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `itribe_library`
--
ALTER TABLE `itribe_library`
  ADD PRIMARY KEY (`library_id`);

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
  MODIFY `community_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `itribe_commu_invitation`
--
ALTER TABLE `itribe_commu_invitation`
  MODIFY `invitation_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `itribe_commu_members`
--
ALTER TABLE `itribe_commu_members`
  MODIFY `commun_rel_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `itribe_contact`
--
ALTER TABLE `itribe_contact`
  MODIFY `contact_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `itribe_library`
--
ALTER TABLE `itribe_library`
  MODIFY `library_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `itribe_messages`
--
ALTER TABLE `itribe_messages`
  MODIFY `msg_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `itribe_users`
--
ALTER TABLE `itribe_users`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

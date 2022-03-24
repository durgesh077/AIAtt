-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: attendence
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branchcoursesubjects`
--

DROP TABLE IF EXISTS `branchcoursesubjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branchcoursesubjects` (
  `bid` char(10) NOT NULL,
  `cid` char(10) NOT NULL,
  `s_code` char(10) NOT NULL,
  `elective` tinyint(1) DEFAULT (false),
  `semester_no` int NOT NULL,
  PRIMARY KEY (`bid`,`cid`,`s_code`),
  KEY `cid` (`cid`),
  KEY `s_code` (`s_code`),
  CONSTRAINT `branchcoursesubjects_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `branch` (`bid`),
  CONSTRAINT `branchcoursesubjects_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `course` (`cid`),
  CONSTRAINT `branchcoursesubjects_ibfk_3` FOREIGN KEY (`s_code`) REFERENCES `subjects` (`s_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branchcoursesubjects`
--

LOCK TABLES `branchcoursesubjects` WRITE;
/*!40000 ALTER TABLE `branchcoursesubjects` DISABLE KEYS */;
INSERT INTO `branchcoursesubjects` VALUES ('CE','btech','kcs-501',0,2),('CE','btech','kcs-52',0,2),('cse','btech','kcs-52',1,2);
/*!40000 ALTER TABLE `branchcoursesubjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-15 19:36:28

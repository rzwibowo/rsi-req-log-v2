-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: ti_request
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.34-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_kategori`
--

DROP TABLE IF EXISTS `t_kategori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_kategori` (
  `id_kategori` int(11) NOT NULL AUTO_INCREMENT,
  `nama_kategori` varchar(100) NOT NULL,
  `is_aktif` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_kategori`),
  UNIQUE KEY `t_kategori_un` (`nama_kategori`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_request`
--

DROP TABLE IF EXISTS `t_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_request` (
  `id_request` int(11) NOT NULL AUTO_INCREMENT,
  `tanggal` date NOT NULL,
  `jam_lapor` time NOT NULL,
  `jam_selesai` time NOT NULL,
  `isi_request` varchar(500) NOT NULL,
  `keterangan` varchar(500) DEFAULT NULL,
  `rencanatl` varchar(500) DEFAULT NULL,
  `img_name` varchar(100) DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `id_unit` int(11) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_request`),
  KEY `t_request_fk` (`id_user`),
  KEY `t_request_fk_1` (`id_unit`),
  KEY `t_request_fk_2` (`id_kategori`),
  CONSTRAINT `t_request_fk` FOREIGN KEY (`id_user`) REFERENCES `t_user` (`id_user`),
  CONSTRAINT `t_request_fk_1` FOREIGN KEY (`id_unit`) REFERENCES `t_unit` (`id_unit`),
  CONSTRAINT `t_request_fk_2` FOREIGN KEY (`id_kategori`) REFERENCES `t_kategori` (`id_kategori`)
) ENGINE=InnoDB AUTO_INCREMENT=1249 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_unit`
--

DROP TABLE IF EXISTS `t_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_unit` (
  `id_unit` int(11) NOT NULL AUTO_INCREMENT,
  `nama_unit` varchar(100) NOT NULL,
  `is_aktif` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_unit`),
  UNIQUE KEY `nama_unit` (`nama_unit`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `psword` varchar(50) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `id_unit` int(11) DEFAULT NULL,
  `level` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `is_aktif` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'ti_request'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-31 21:50:21

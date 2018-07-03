-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: ebarrio
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administradores` (
  `nombre` varchar(45) DEFAULT NULL,
  `correo` varchar(45) NOT NULL,
  `contrasena` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
INSERT INTO `administradores` VALUES ('admin','admin@admin','unab2018');
/*!40000 ALTER TABLE `administradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administradores_has_proyectos`
--

DROP TABLE IF EXISTS `administradores_has_proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administradores_has_proyectos` (
  `administradores_idadministradores` int(11) NOT NULL,
  `proyectos_idproyectos` int(11) NOT NULL,
  `proyectos_aportes_idaportes` int(11) NOT NULL,
  PRIMARY KEY (`administradores_idadministradores`,`proyectos_idproyectos`,`proyectos_aportes_idaportes`),
  KEY `fk_administradores_has_proyectos_proyectos1_idx` (`proyectos_idproyectos`,`proyectos_aportes_idaportes`),
  CONSTRAINT `fk_administradores_has_proyectos_proyectos1` FOREIGN KEY (`proyectos_idproyectos`) REFERENCES `proyectos` (`idproyectos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores_has_proyectos`
--

LOCK TABLES `administradores_has_proyectos` WRITE;
/*!40000 ALTER TABLE `administradores_has_proyectos` DISABLE KEYS */;
/*!40000 ALTER TABLE `administradores_has_proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administradores_has_proyectos1`
--

DROP TABLE IF EXISTS `administradores_has_proyectos1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administradores_has_proyectos1` (
  `administradores_correo` varchar(45) NOT NULL,
  `proyectos_idproyectos` int(11) NOT NULL,
  PRIMARY KEY (`administradores_correo`,`proyectos_idproyectos`),
  KEY `fk_administradores_has_proyectos1_proyectos1_idx` (`proyectos_idproyectos`),
  KEY `fk_administradores_has_proyectos1_administradores1_idx` (`administradores_correo`),
  CONSTRAINT `fk_administradores_has_proyectos1_administradores1` FOREIGN KEY (`administradores_correo`) REFERENCES `administradores` (`correo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_administradores_has_proyectos1_proyectos1` FOREIGN KEY (`proyectos_idproyectos`) REFERENCES `proyectos` (`idproyectos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores_has_proyectos1`
--

LOCK TABLES `administradores_has_proyectos1` WRITE;
/*!40000 ALTER TABLE `administradores_has_proyectos1` DISABLE KEYS */;
/*!40000 ALTER TABLE `administradores_has_proyectos1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aportes`
--

DROP TABLE IF EXISTS `aportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aportes` (
  `idaportes` int(11) NOT NULL AUTO_INCREMENT,
  `dinero` int(11) DEFAULT NULL,
  `materiales` int(11) DEFAULT NULL,
  `trabajo` varchar(45) DEFAULT NULL,
  `proyectos_idproyectos` int(11) NOT NULL,
  PRIMARY KEY (`idaportes`,`proyectos_idproyectos`),
  KEY `fk_aportes_proyectos1_idx` (`proyectos_idproyectos`),
  CONSTRAINT `fk_aportes_proyectos1` FOREIGN KEY (`proyectos_idproyectos`) REFERENCES `proyectos` (`idproyectos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aportes`
--

LOCK TABLES `aportes` WRITE;
/*!40000 ALTER TABLE `aportes` DISABLE KEYS */;
/*!40000 ALTER TABLE `aportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumos`
--

DROP TABLE IF EXISTS `consumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consumos` (
  `idconsumos` int(11) NOT NULL AUTO_INCREMENT,
  `ncliente` varchar(45) DEFAULT NULL,
  `distribuidora` varchar(45) DEFAULT NULL,
  `inmueble` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `nmedidor` int(11) DEFAULT NULL,
  `mes_uno` date DEFAULT NULL,
  `consumo_uno` int(11) DEFAULT NULL,
  `boleta_uno` int(11) DEFAULT NULL,
  `mes_dos` date DEFAULT NULL,
  `consumo_dos` int(11) DEFAULT NULL,
  `boleta_dos` int(11) DEFAULT NULL,
  `mes_tres` date DEFAULT NULL,
  `consumo_tres` int(11) DEFAULT NULL,
  `boleta_tres` int(11) DEFAULT NULL,
  `mes_cuatro` date DEFAULT NULL,
  `consumo_cuatro` int(11) DEFAULT NULL,
  `boleta_cuatro` int(11) DEFAULT NULL,
  `mes_cinco` date DEFAULT NULL,
  `consumo_cinco` int(11) DEFAULT NULL,
  `boleta_cinco` int(11) DEFAULT NULL,
  `mes_seis` date DEFAULT NULL,
  `consumo_seis` int(11) DEFAULT NULL,
  `boleta_seis` int(11) DEFAULT NULL,
  `usuarios_correo` varchar(45) NOT NULL,
  PRIMARY KEY (`idconsumos`),
  KEY `fk_consumos_usuarios1_idx` (`usuarios_correo`),
  CONSTRAINT `fk_consumos_usuarios1` FOREIGN KEY (`usuarios_correo`) REFERENCES `usuarios` (`correo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumos`
--

LOCK TABLES `consumos` WRITE;
/*!40000 ALTER TABLE `consumos` DISABLE KEYS */;
INSERT INTO `consumos` VALUES (1,'124567','Conafe','Trabajo','Quillota 960',345577,'2018-01-03',600,88200,'2017-12-06',650,95500,'2017-11-08',600,88200,'2017-10-10',800,117600,'2017-09-05',759,111573,'2017-08-08',900,132900,'franco@gmail.com'),(2,'156789','Conafe','casa','rio grande 305 ',145678,'2018-01-09',180,26460,'2017-12-05',175,25725,'2017-11-08',147,21600,'2017-10-10',155,22578,'2017-08-09',170,24990,'2017-08-08',165,24250,'mauricio@gmail.com');
/*!40000 ALTER TABLE `consumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promedios`
--

DROP TABLE IF EXISTS `promedios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promedios` (
  `idmeta` int(11) NOT NULL AUTO_INCREMENT,
  `promedio` int(11) NOT NULL,
  `usuarios_correo` varchar(45) NOT NULL,
  PRIMARY KEY (`idmeta`),
  KEY `usuarios_correo` (`usuarios_correo`),
  CONSTRAINT `promedios_ibfk_1` FOREIGN KEY (`usuarios_correo`) REFERENCES `usuarios` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promedios`
--

LOCK TABLES `promedios` WRITE;
/*!40000 ALTER TABLE `promedios` DISABLE KEYS */;
INSERT INTO `promedios` VALUES (1,24267,'mauricio@gmail.com'),(2,105662,'franco@gmail.com');
/*!40000 ALTER TABLE `promedios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyectos` (
  `idproyectos` int(11) NOT NULL AUTO_INCREMENT,
  `razonsocial` varchar(45) DEFAULT NULL,
  `rutsocial` varchar(45) DEFAULT NULL,
  `organizacion` varchar(45) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `tarifa` varchar(45) DEFAULT NULL,
  `destinatario` varchar(45) DEFAULT NULL,
  `beneficiariodirecto` int(11) DEFAULT NULL,
  `beneficiarioindirecto` int(11) DEFAULT NULL,
  `dimensiones` int(11) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'En Postulación fase 1	',
  `meta` int(11) DEFAULT NULL,
  `dinero` int(30) NOT NULL,
  `aporte` int(11) DEFAULT NULL,
  `manodeobra` int(11) DEFAULT NULL,
  `materiales` int(11) DEFAULT NULL,
  PRIMARY KEY (`idproyectos`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (1,'Universidad Andre Bello','71540100-2','Establecimientos educacionales',322456789,'Construcción muro facultad','No','Personas con discapacidad',150,300,246,18,'Valparaíso','En proceso fase 1',15,25000000,50000000,10000000,5000000),(2,'Conafe S.A','311430002','Fundación',32458907,'Mejorar luminarias sector las palmas chilenas','no','Personas de escasos recursos',500,1000,234,6,'Valparaíso','En postulación fase 1',10,20000000,10000000,NULL,NULL),(3,'Los canelos S.A','16500789-6','Fundación',23456789,'Mejorar para tercera edad sector Rodelillo','No','Personas con discapacidad',100,300,34,10,'Santiago','En Proceso fase 1',20,0,10000000,NULL,NULL);
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `contrasena` varchar(45) DEFAULT NULL,
  `correo` varchar(45) NOT NULL,
  PRIMARY KEY (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Franco','unab2018','franco@gmail.com'),(2,'Mauricio','unab2018','mauricio@gmail.com');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_has_proyectos`
--

DROP TABLE IF EXISTS `usuarios_has_proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios_has_proyectos` (
  `usuarios_correo` varchar(45) NOT NULL,
  `proyectos_idproyectos` int(11) NOT NULL,
  `promedio` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Consumo_1` tinyint(1) NOT NULL,
  `consumo_2` tinyint(1) NOT NULL,
  `Consumo_3` int(11) NOT NULL,
  PRIMARY KEY (`usuarios_correo`,`proyectos_idproyectos`),
  KEY `fk_usuarios_has_proyectos_proyectos1_idx` (`proyectos_idproyectos`),
  KEY `fk_usuarios_has_proyectos_usuarios1_idx` (`usuarios_correo`),
  CONSTRAINT `fk_usuarios_has_proyectos_proyectos1` FOREIGN KEY (`proyectos_idproyectos`) REFERENCES `proyectos` (`idproyectos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_proyectos_usuarios1` FOREIGN KEY (`usuarios_correo`) REFERENCES `usuarios` (`correo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_has_proyectos`
--

LOCK TABLES `usuarios_has_proyectos` WRITE;
/*!40000 ALTER TABLE `usuarios_has_proyectos` DISABLE KEYS */;
INSERT INTO `usuarios_has_proyectos` VALUES ('franco@gmail.com',1,105662,'2017-12-06',0,0,0),('mauricio@gmail.com',1,24267,'0000-00-00',0,0,0);
/*!40000 ALTER TABLE `usuarios_has_proyectos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-27 16:23:44


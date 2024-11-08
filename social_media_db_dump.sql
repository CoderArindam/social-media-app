-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: social_media_db
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,2,1,'yess 💪','2024-11-07 20:17:14'),(3,3,2,'zyada mat peena 😁','2024-11-07 20:22:48'),(4,4,3,'handsome as always😍','2024-11-07 20:24:09'),(5,5,3,'nah kuch khash nahi hai 😒😂','2024-11-07 20:29:57'),(6,6,5,'looking great 😊','2024-11-07 20:31:20'),(7,9,5,'yellow suits you 💛','2024-11-07 20:39:03'),(8,9,8,'you look cool! 😊','2024-11-07 20:40:29'),(9,10,4,'true words 💯','2024-11-07 20:43:24'),(10,11,3,'nice ✌️','2024-11-07 20:48:04'),(11,11,4,'looking nice ✌️','2024-11-07 20:48:31'),(12,11,10,'you look great ✌️','2024-11-07 20:49:15'),(13,1,3,'aur bhai kaisa hai?','2024-11-07 20:49:50'),(14,8,3,'i have the same outfit!','2024-11-07 20:51:36'),(15,8,7,'looking great 😍','2024-11-07 20:52:16');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `follower_username` varchar(50) NOT NULL,
  `following_username` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `follower_username` (`follower_username`,`following_username`),
  KEY `following_username` (`following_username`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`follower_username`) REFERENCES `users` (`username`) ON DELETE CASCADE,
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`following_username`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (1,'meera_kapoor','aarav_singh','2024-11-07 20:17:17'),(2,'aditya_verma','meera_kapoor','2024-11-07 20:22:51'),(3,'riya_sharma','aditya_verma','2024-11-07 20:24:15'),(4,'nisha_patel','aditya_verma','2024-11-07 20:30:01'),(5,'nisha_patel','riya_sharma','2024-11-07 20:30:15'),(6,'john_smith','nisha_patel','2024-11-07 20:31:05'),(7,'john_smith','meera_kapoor','2024-11-07 20:33:56'),(8,'john_smith','aditya_verma','2024-11-07 20:34:05'),(9,'emily_johnson','aditya_verma','2024-11-07 20:35:41'),(10,'emily_johnson','nisha_patel','2024-11-07 20:35:44'),(11,'emily_johnson','aarav_singh','2024-11-07 20:35:46'),(12,'michael_brown','aditya_verma','2024-11-07 20:37:29'),(13,'michael_brown','riya_sharma','2024-11-07 20:37:31'),(14,'michael_brown','nisha_patel','2024-11-07 20:37:33'),(15,'michael_brown','meera_kapoor','2024-11-07 20:37:37'),(16,'sarah_davis','nisha_patel','2024-11-07 20:38:40'),(17,'sarah_davis','michael_brown','2024-11-07 20:41:02'),(18,'sarah_davis','riya_sharma','2024-11-07 20:41:05'),(19,'sarah_davis','meera_kapoor','2024-11-07 20:41:07'),(20,'david_wilson','riya_sharma','2024-11-07 20:43:26'),(21,'david_wilson','emily_johnson','2024-11-07 20:43:28'),(22,'david_wilson','sarah_davis','2024-11-07 20:43:30'),(23,'david_wilson','aditya_verma','2024-11-07 20:43:34'),(24,'jessica_moore','emily_johnson','2024-11-07 20:47:46'),(25,'jessica_moore','michael_brown','2024-11-07 20:47:48'),(26,'jessica_moore','sarah_davis','2024-11-07 20:47:49'),(27,'jessica_moore','david_wilson','2024-11-07 20:47:50'),(28,'jessica_moore','aditya_verma','2024-11-07 20:47:54'),(29,'aditya_verma','aarav_singh','2024-11-07 20:53:08'),(30,'aarav_singh','jessica_moore','2024-11-07 20:55:28');
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`post_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,2,2,'2024-11-07 20:12:26'),(2,2,1,'2024-11-07 20:17:44'),(3,3,2,'2024-11-07 20:22:08'),(5,4,3,'2024-11-07 20:26:15'),(6,5,3,'2024-11-07 20:28:49'),(7,6,5,'2024-11-07 20:31:08'),(8,6,4,'2024-11-07 20:31:26'),(9,6,3,'2024-11-07 20:31:27'),(11,7,5,'2024-11-07 20:35:34'),(12,7,3,'2024-11-07 20:35:35'),(13,9,8,'2024-11-07 20:40:16'),(14,9,7,'2024-11-07 20:40:32'),(15,9,5,'2024-11-07 20:40:36'),(16,9,3,'2024-11-07 20:40:38'),(17,9,1,'2024-11-07 20:40:42'),(18,10,9,'2024-11-07 20:42:50'),(19,10,7,'2024-11-07 20:42:53'),(20,10,4,'2024-11-07 20:43:07'),(21,10,3,'2024-11-07 20:43:36'),(22,10,1,'2024-11-07 20:43:38'),(23,11,10,'2024-11-07 20:47:41'),(24,11,9,'2024-11-07 20:47:43'),(25,11,7,'2024-11-07 20:47:46'),(26,11,3,'2024-11-07 20:47:56'),(27,11,1,'2024-11-07 20:48:45'),(28,1,3,'2024-11-07 20:50:16'),(29,1,2,'2024-11-07 20:50:20'),(30,8,4,'2024-11-07 20:51:52'),(32,8,7,'2024-11-07 20:52:03');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` text,
  `image` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'Believe in yourself, and you will be unstoppable. 💪✨','','','2024-11-07 20:10:37'),(2,2,'Mood: 100% caffeine. ☕⚡','','','2024-11-07 20:12:05'),(3,3,'Take time to do what makes your soul happy. 🌞💫','https://www.gngmodels.com/wp-content/uploads/2023/12/male-model-portfolio-6-e1703576778868.jpg','#model #selflove #photoshoot ','2024-11-07 20:21:50'),(4,4,'Hard work beats talent when talent doesn’t work hard. 💼⚡','https://t3.ftcdn.net/jpg/08/57/93/22/240_F_857932237_BA5A91YaZsRa1x9bRO8i9HBfht5UJ2kS.jpg','','2024-11-07 20:26:02'),(5,5,'Radiate positivity and good vibes. ✨🌈','https://t4.ftcdn.net/jpg/06/37/30/53/240_F_637305349_qfWYJbm2IZZvpyupgufpfA2vi97BjxOS.jpg','#goodvibes','2024-11-07 20:28:32'),(6,6,'Being busy is a blessing!\n\nI said what i said ✌️😈','','','2024-11-07 20:33:34'),(7,7,'You are the author of your own story. 📖✍️','https://t4.ftcdn.net/jpg/05/17/69/51/240_F_517695126_xVHlxMfMqZlBw1dtwgtiRKjunSjxX0wj.jpg','','2024-11-07 20:35:17'),(8,8,'Just one of those ‘I woke up like this’ days. 😴✨','https://t4.ftcdn.net/jpg/09/70/23/07/240_F_970230710_lT6N2QZaO13HhPeuy9NoeyYtVZwqt5LO.jpg','','2024-11-07 20:37:19'),(9,9,'Loving yourself is the first step to true happiness. 😍🌸','https://t3.ftcdn.net/jpg/09/46/38/90/240_F_946389008_V4e0JEU0sFdtP3jUQxa0MuWsO17F8VXw.jpg','','2024-11-07 20:40:09'),(10,10,'Confidence is the best outfit, rock it and own it. 👠💃','https://t4.ftcdn.net/jpg/09/56/40/41/240_F_956404168_ApD4gVGZGCjVc608QbFZeoiZpdv3na0g.jpg','#fresh #mood #photogenic','2024-11-07 20:42:41'),(11,11,'So many books, so little time. 📖⏳','https://t3.ftcdn.net/jpg/09/27/73/58/240_F_927735803_P5dhubrfGsRqxYTEzLA3utHwCQzNKoV6.jpg','','2024-11-07 20:47:23');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'aarav_singh','aarav.singh@example.com','$2b$10$bb4ZUoXW7cud81OOcwn3K.qSqdIerrTkrCzK0Ux30ggZiskFeZ9B.','2024-11-07 20:09:19'),(2,'meera_kapoor','meera.kapoor@example.com','$2b$10$fTmkYCzaCbmk23rER1CvwumnhEjnpSpTshKRkheslcrHGzkUT04r2','2024-11-07 20:11:34'),(3,'aditya_verma','aditya.verma@example.com','$2b$10$S8/pCWhcoCX0t3NKemoKl.nENpGcCI/d2gM5WpgX16yBnI1E72VWO','2024-11-07 20:20:09'),(4,'riya_sharma','riya.sharma@example.com','$2b$10$SlfbnDVSKnsRjgQfy2TfuuyVQscrHfcddtgJAiI8QdbGMczcuggFS','2024-11-07 20:23:43'),(5,'nisha_patel','nisha.patel@example.com','$2b$10$sLwjUakA8vsRRWphAg0PmONAhhrSGmSAh.BTF/o0GPOVwt7u/qeUu','2024-11-07 20:27:04'),(6,'john_smith','john.smith@example.com','$2b$10$AmehwPIew0BQdKwfp./zSeQWB.PK3qT1lxLV.Z8Tpkb/JzMqku0z2','2024-11-07 20:30:59'),(7,'emily_johnson','emily.johnson@example.com','$2b$10$oWSpDwRIMipUZu4GDQS1MewVpqnn88r9fDaEGZunMarJ2gbCE4X72','2024-11-07 20:34:28'),(8,'michael_brown','michael.brown@example.com','$2b$10$qEQHojcl0hHn9lwqs7eG3ORBGZdUKFxgGWwDAlf5oYvgCWZCDnqOa','2024-11-07 20:36:05'),(9,'sarah_davis','sarah.davis@example.com','$2b$10$AgGiio/GoJlbG8yVK8ZCd.9L/twnW8EbIu7pcVgJpyk7TeCnhUGta','2024-11-07 20:38:31'),(10,'david_wilson','david.wilson@example.com','$2b$10$l0Mdhh3iMkU1Eh6CC7DM2.y8fdO7DOA5rI4BrZ6XvlcvcCpJHbL3y','2024-11-07 20:41:26'),(11,'jessica_moore','jessica.moore@example.com','$2b$10$vvDllNj.GNgt7SWzBkWW6.9JoH2a9gUCBDDR8da85U0Rydoxpe//W','2024-11-07 20:44:02'),(12,'Arindam','arindam@gmail.com','$2b$10$84x6X1LBxcq37DLd54O8lep5zyV8KL7SzCX3cidUDJ9WzBjns8scK','2024-11-07 21:04:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'social_media_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-08  2:55:09

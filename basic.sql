-- DATABASE ----------------------
CREATE DATABASE IF NOT EXISTS `demo_2`

DROP DATABASE IF EXISTS `demo_2`

USE `demo`

-- TABLE ----------------------
CREATE TABLE `Users` (
	`id` INT,
	`fullName` VARCHAR(255),
	`otp` CHAR (5),
	`avatar` VARCHAR(255)
)

RENAME TABLE `Users` TO `User_Ten_moi`

-- Xoá table
DROP TABLE `User_Ten_moi`

-- Xoá dữ liệu bên trong table Users, nhưng không xoá table
-- Reset auto_increament
TRUNCATE TABLE `Users`

-- Khi table đã được tạo: thì dùng ALTER
ALTER TABLE `Users`
ADD `age` INT;

-- RÀNG BUỘC 
-- DEFAULT: đặt giá trị mặc định cho cột, khi không truyền gì hết
-- NOT NULL: không được rỗng, bắt buộc phải có dữ liệu

CREATE TABLE `Foods` (
	`id` INT,
	`name` VARCHAR(255),
	`description` VARCHAR(255) DEFAULT "Chưa có thông tin"
)

ALTER TABLE `Foods`
MODIFY `name` VARCHAR(255) NOT NULL

ALTER TABLE `Foods`
ADD `price` INT NOT NULL DEFAULT 10000

INSERT INTO `Foods` (`id`, `name`, `description`) VALUES 
					(3, "gỏi heo", "gỏi làm từ heo"),
					(4, "gỏi vịt", "gỏi làm từ vịt"),
					(5, "gỏi cá", "gỏi làm từ cá")
					
ALTER TABLE `Users`
MODIFY `id` INT PRIMARY KEY AUTO_INCREMENT
					
INSERT INTO `Users` (`fullName`) VALUES 
					("Nguyễn Văn A"),
					("Nguyễn Văn B"),
					("Nguyễn Văn C"),
					("Nguyễn Văn D"),
					("Nguyễn Văn E")

					





-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `BinhLuan`;
CREATE TABLE `BinhLuan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `noi_dung` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sao_binh_luan` varchar(255) DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `phong_id` int DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `phong_id` (`phong_id`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `NguoiDung` (`nguoi_dung_id`),
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`phong_id`) REFERENCES `Phong` (`phong_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`binh_luan_id`, `noi_dung`, `sao_binh_luan`, `ngay_binh_luan`, `nguoi_dung_id`, `phong_id`) VALUES
(1,	'Phong rat dep',	'10',	'2020-12-23 12:45:00',	1,	2),
(5,	'Mui rat thom',	'3',	'2020-12-30 12:45:00',	3,	1),
(6,	'Tuyet voi',	'10',	'2020-12-30 12:45:00',	4,	1),
(8,	'Tuyet voi!!!',	'10',	'2023-06-02 12:45:00',	4,	1);

DROP TABLE IF EXISTS `DatPhong`;
CREATE TABLE `DatPhong` (
  `dat_phong_id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` varchar(255) DEFAULT NULL,
  `ngay_den` datetime DEFAULT NULL,
  `ngay_di` datetime DEFAULT NULL,
  `so_luong_khach` int DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `phong_id` int DEFAULT NULL,
  PRIMARY KEY (`dat_phong_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `phong_id` (`phong_id`),
  CONSTRAINT `DatPhong_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `NguoiDung` (`nguoi_dung_id`),
  CONSTRAINT `DatPhong_ibfk_2` FOREIGN KEY (`phong_id`) REFERENCES `Phong` (`phong_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `DatPhong` (`dat_phong_id`, `ma_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `nguoi_dung_id`, `phong_id`) VALUES
(3,	'111',	'2020-11-30 12:45:00',	'2020-12-30 12:45:00',	2,	4,	1),
(4,	'12',	'2022-11-30 12:45:00',	'2022-12-30 12:45:00',	3,	4,	3),
(5,	'789',	'2022-04-30 12:45:00',	'2022-01-30 12:45:00',	5,	1,	3),
(6,	'321',	'2022-04-30 12:45:00',	'2022-01-30 12:45:00',	10,	1,	3),
(8,	'A11',	'2022-04-30 12:45:00',	'2022-01-30 12:45:00',	1,	1,	3);

DROP TABLE IF EXISTS `NguoiDung`;
CREATE TABLE `NguoiDung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `ten` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `dien_thoai` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ngay_sinh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `gioi_tinh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `NguoiDung` (`nguoi_dung_id`, `ten`, `email`, `mat_khau`, `dien_thoai`, `ngay_sinh`, `gioi_tinh`, `role`) VALUES
(1,	'Huy',	'huy@gmail.com',	'1234',	'0321343532',	'1888-01-01',	NULL,	'admin'),
(3,	'An',	'an@gmail.com',	'1234',	NULL,	NULL,	NULL,	NULL),
(4,	'Duong',	'duong@gmail.com',	'1234',	NULL,	NULL,	NULL,	NULL),
(5,	'Truong Vo Ky',	'truongvoky@gmail.com',	'1234',	'0321343532',	'2000-01-01',	NULL,	'user'),
(6,	'Meo Meo',	'meomeo@gmail.com',	'1234',	'0321343532',	'2000-01-01',	NULL,	'user'),
(8,	'Hoang',	'hoang@gmail.com',	'1234',	NULL,	NULL,	NULL,	NULL),
(9,	'Hung',	'hung@gmail.com',	'1234',	NULL,	NULL,	NULL,	NULL),
(10,	'Gau Gau',	'meomeo1@gmail.com',	'1234',	'0321343532',	'2000-01-01',	NULL,	'user');

DROP TABLE IF EXISTS `Phong`;
CREATE TABLE `Phong` (
  `phong_id` int NOT NULL AUTO_INCREMENT,
  `ten_phong` varchar(255) DEFAULT NULL,
  `khach` int DEFAULT NULL,
  `phong_ngu` int DEFAULT NULL,
  `giuong` int DEFAULT NULL,
  `phong_tam` int DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `may_giat` tinyint(1) DEFAULT NULL,
  `ban_la` tinyint(1) DEFAULT NULL,
  `tivi` tinyint(1) DEFAULT NULL,
  `dieu_hoa` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `do_xe` tinyint(1) DEFAULT NULL,
  `ho_boi` tinyint(1) DEFAULT NULL,
  `ban_ui` tinyint(1) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `vi_tri_id` int DEFAULT NULL,
  PRIMARY KEY (`phong_id`),
  KEY `vi_tri_id` (`vi_tri_id`),
  CONSTRAINT `Phong_ibfk_1` FOREIGN KEY (`vi_tri_id`) REFERENCES `ViTri` (`vi_tri_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Phong` (`phong_id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `vi_tri_id`) VALUES
(1,	'La Beach Hotel',	2,	1,	1,	1,	'84 Võ Nguyên Giáp',	210000,	1,	0,	1,	1,	1,	1,	0,	0,	'1685723261803_cer-toeic-udemy.jpg',	3),
(2,	'Gold Plaza Hotel Da Nang',	2,	1,	1,	1,	'11 Trần Thị Lý, Quận Hải Châu, Đà Nẵng, Việt Nam, 550000',	440000,	1,	0,	1,	1,	1,	1,	0,	0,	'gold-plaza.png',	1),
(3,	'Peninsula Hotel Danang',	2,	1,	1,	1,	'84 Võ Nguyên Giáp - Mân Thái - Sơn Trà - Đà Nẵng, Mân Thái, Sơn Trà, Đà Nẵng, Việt Nam, 550000',	1486000,	1,	0,	1,	1,	1,	1,	0,	0,	'hotel-danang.png',	2),
(5,	'Hotel Saigon',	2,	1,	1,	1,	'Nguyen Hue Sai Gon',	1486000,	1,	0,	1,	1,	1,	1,	0,	0,	'1685723281712_cer-toeic-udemy.jpg',	2);

DROP TABLE IF EXISTS `ViTri`;
CREATE TABLE `ViTri` (
  `vi_tri_id` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(255) DEFAULT NULL,
  `binh_luan` varchar(255) DEFAULT NULL,
  `quoc_gia` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vi_tri_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `ViTri` (`vi_tri_id`, `ten_vi_tri`, `binh_luan`, `quoc_gia`, `hinh_anh`) VALUES
(1,	'Ho Chi Minh',	'Ho Chi Minh',	'Viet Nam',	'1685282368761_cer-toeic-udemy.jpg'),
(2,	'Ca Mau',	'noi tan cung cua Viet Nam',	'Viet Nam',	'abc.jpg'),
(3,	'Ha Noi',	'thu do nuoc cong hoa xa hoi chu nghia viet nam',	'Viet nam',	'1685723129992_cer-toeic-udemy.jpg');

-- 2023-06-04 03:12:44
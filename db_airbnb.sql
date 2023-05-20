create database airbnb;

use airbnb;

CREATE TABLE `NguoiDung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birth_day` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
 );
drop table Phong;
CREATE TABLE `Phong` (
	`phong_id` int NOT NULL AUTO_INCREMENT,
	`ten_phong` varchar(255) DEFAULT NULL,
	`khach` int DEFAULT NULL,
	`phong_ngu` int DEFAULT NULL,
	`giuong` int DEFAULT NULL,
	`phong_tam` int DEFAULT NULL,
	`mo_ta` varchar(255) DEFAULT NULL,
	`gia_tien` int DEFAULT NULL,
	`may_giat` boolean DEFAULT NULL,
    `ban_la` boolean DEFAULT NULL, 
    `tivi` boolean DEFAULT NULL,
	`dieu_hoa` boolean DEFAULT NULL,
	`wifi` boolean DEFAULT NULL,
	`do_xe` boolean DEFAULT NULL,
    `ho_boi` boolean DEFAULT NULL,
    `ban_ui` boolean DEFAULT NULL,
    `hinh_anh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`phong_id`),
  
  vi_tri_id int,
foreign key (`vi_tri_id`) references ViTri(`vi_tri_id`)
 );

drop table DatPhong;
CREATE TABLE `DatPhong` (
  `dat_phong_id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` varchar(255) DEFAULT NULL,
  `ngay_den` datetime,
  `ngay_di` datetime,
  `so_luong_khach` int,
  PRIMARY KEY (`dat_phong_id`),

	`nguoi_dung_id` INT,
    `phong_id` INT,
  foreign key (`nguoi_dung_id`) references NguoiDung(`nguoi_dung_id`),
  foreign key (`phong_id`) references Phong(`phong_id`)
);

drop table BinhLuan;
CREATE TABLE `BinhLuan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `ma_cong_viec` int,
  `ma_nguoi_binh_luan` int,
  `ngay_binh_luan` datetime,
  `noi_dung` varchar(255) DEFAULT NULL,
  `sao_binh_luan` int,
  PRIMARY KEY (`binh_luan_id`),
  
  `nguoi_dung_id` INT,
    `phong_id` INT,
  foreign key (`nguoi_dung_id`) references NguoiDung(`nguoi_dung_id`),
  foreign key (`phong_id`) references Phong(`phong_id`)
);

drop table ViTri;
create table ViTri (
	vi_tri_id int NOT NULL AUTO_INCREMENT,
    ten_vi_tri varchar(255) ,
    binh_luan varchar(255),
    quoc_gia varchar(255),
    hinh_anh varchar(255),
    
     PRIMARY KEY (`vi_tri_id`)
);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
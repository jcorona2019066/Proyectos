#--------------Prueba de programacion--------------------------
drop database if exists DBImportadoraPrueba;
create database DBImportadoraPrueba;

use DBImportadoraPrueba;


create table usuario(
	codigoUsuario int not null auto_increment,
	dpi varchar(13) ,
    username varchar(50) not null,
    correoUsuario varchar(30) ,
    password varchar(150) not null,
    rol varchar(50),
    primary key PK_codigoUsuario(codigoUsuario)
);

create table carros(
	codigoCarro int not null auto_increment,
	placa varchar(20) not null,
    marca varchar(50) not null,
    modelo varchar(50) not null,
    año varchar(20) not null,
    estado varchar(50) not null,
    codigoUsuario int not null,
    primary key PK_codigoCarro(codigoCarro),
    constraint FK_carros_usuario foreign key (codigoUsuario) references usuario(codigoUsuario) ON DELETE CASCADE
);

insert into usuario(dpi, username, correoUsuario, password,rol) values ("1234567891011","juan carlos", "juancarlos@gmail.com","123","usuario");
insert into usuario(dpi, username, correoUsuario, password,rol) values ("4576543210987","Carlos perez", "carlosperez@gmail.com","123","administrador");
insert into usuario(dpi, username, correoUsuario, password,rol) values ("434543210987","Mario Corado", "mariocorado@gmail.com","123","usuario");
insert into usuario(dpi, username, correoUsuario, password,rol) values ("945210987","Marlon Gutierrez", "marlongutierrez@gmail.com","123","usuario");



insert into carros (placa,marca,modelo,año,estado,codigoUsuario) values ("P-132TGH","Mazda", "CX-5","2015","Perfecto",1);
insert into carros (placa,marca,modelo,año,estado,codigoUsuario) values ("P-957IOW","Honda", "Civic","2010","Daño menor",2);
insert into carros (placa,marca,modelo,año,estado,codigoUsuario) values ("P-985QWT","Hyundai", "Tucson","2019","Reparación urgente",4);
insert into carros (placa,marca,modelo,año,estado,codigoUsuario) values ("P-845WDG","Toyota", "Corrola","2017","En reparación",3);





#-----------Consultas-----------------
#select E.nombreEstado, C.codigoCarro,C.placa, C.marca,C.modelo,C.año from estados E inner join carros C on
#	E.codigoEstado = C.codigoEstado;

select * from usuario where codigoUsuario <> 1 ;
select * from usuario;
select * from carros;

#ALTER USER 'root'@'localhost' identified with mysql_native_password by 'admin';

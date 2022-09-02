#--------------Jairo Daniel Corona Boch--------------------------
drop database if exists DBTonysKinal2019066;
create database DBTonysKinal2019066;

use DBTonysKinal2019066;


create table Empresas (
	codigoEmpresa int not null auto_increment,	
    nombreEmpresa varchar(150) not null,
    direccion varchar(150)not null,
    telefono varchar(20)not null,
	primary key PK_codigoEmpresa(codigoEmpresa)
);


create table Presupuesto(
	codigoPresupuesto int not null auto_increment,
    fechaSolicitud date not null,
    cantidadPresupuesto decimal(10,2) not null,
    codigoEmpresa int not null,
    primary key PK_codigoPresupuesto(codigoPresupuesto),
    constraint FK_Presupuesto_Empresas foreign key (codigoEmpresa) references Empresas(codigoEmpresa) ON DELETE CASCADE
);


create table Servicios(
	codigoServicio int not null auto_increment,
    fechaServicio date not null,
    tipoServicio varchar(100)not null,
    horaServicio time not null,
    lugarServicio varchar(100)not null,
	telefonoContacto varchar(10)not null,
	codigoEmpresa int not null,
    primary key PK_codigoServicio(codigoServicio),
	constraint FK_Servicios_Empresas foreign key (codigoEmpresa) references Empresas(codigoEmpresa)
);


create table TipoPlato(
	codigoTipoPlato int not null auto_increment,
	descripcionTipo varchar(100) not null,
	primary key PK_codigoTipoPlato(codigoTipoPlato)
);


create table Platos(
	codigoPlato int not null auto_increment,
    cantidad int not null,
    nombrePlato varchar(50) not null,
	descripcionPlato varchar(150) not null,
    precioPlato decimal(10,2)not null,
    codigoTipoPlato int ,
    primary key PK_codigoPlato(codigoPlato),
    constraint FK_Platos_tipoPlato foreign key(codigoTipoPlato) references  tipoPlato(codigoTipoPlato)
);


create table Productos(
	codigoProducto int not null,
    nombreProducto varchar(150) not null,
    cantidad int not null,
    primary key PK_codigoProducto(codigoProducto)
);


create table Servicios_has_Platos(
	Servicios_codigoServicio int,
    codigoPlato int not null,
    codigoServicio int not null,
    primary key PK_Servicios_codigoServicio(Servicios_codigoServicio),
    constraint FK_Servicios_has_Platos_Servicios foreign key(codigoServicio) references Servicios(codigoServicio),
    constraint FK_Servicios_has_Platos_Platos foreign key (codigoPlato) references Platos(codigoPlato)
);


create table Productos_has_Platos(
	Productos_codigoProducto int,
    codigoPlato int not null,
    codigoProducto int not null,
    primary key PK_Productos_codigoProducto(Productos_codigoProducto),
    constraint FK_Productos_has_Platos_Productos foreign key (codigoProducto) references Productos(codigoProducto),
	constraint FK_Productos_has_Platos_Platos foreign key (codigoPlato) references Platos(codigoPlato)
	
);


create table TipoEmpleado(
	codigoTipoEmpleado int not null auto_increment,
    descripcion varchar(100)not null,
    primary key PK_codigoTipoEmpleado(codigoTipoEmpleado)
);


create table Empleados(
	codigoEmpleado int not null auto_increment,
	numeroEmpleado int not null,
    apellidosEmpleado varchar(150) not null,
    nombresEmpleado varchar(150)not null,
	direccionEmpleado varchar(150)not null,
    telefonoContacto varchar(20)not null,
    gradoCocinero varchar(50),
    codigoTipoEmpleado int not null,
    primary key PK_codigoEmpleado(codigoEmpleado),
    constraint FK_Empleados_tipoEmpleado foreign key (codigoTipoEmpleado) references TipoEmpleado(codigoTipoEmpleado) ON DELETE CASCADE
);


create table Servicios_has_Empleados(
	Servicios_codigoServicio int,
    codigoServicio int not null,
    codigoEmpleado int not null,
    fechaEvento date not null,
	horaEvento time not null,
    lugarEvento varchar(150)not null,
    primary key PK_Servicios_codigoServicio(Servicios_codigoServicio),
    constraint Servicios_has_empleados_Servicios foreign key(codigoServicio) references Servicios(codigoServicio),
	constraint Servicios_has_empleados_Empleados foreign key(codigoEmpleado) references Empleados(codigoEmpleado)
);


#-----------------------------------Query-------------------------------

#------------Listar----------------------------
delimiter $$
	create procedure sp_ListarEmpleados()
    begin
		select e.codigoEmpleado, e.numeroEmpleado,e.apellidosEmpleado, e.nombresEmpleado, e.direccionEmpleado,e.telefonoContacto, 
			e.gradoCocinero, e.codigoTipoEmpleado from Empleados e;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ListarEmpresas()
    begin
		select e.codigoEmpresa, e.nombreEmpresa, e.direccion, e.telefono from Empresas e;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ListarPlatos()
    begin
		select p.codigoPlato, p.cantidad, p.nombrePlato, p.descripcionPlato, p.precioPlato, 
			p.codigoTipoPlato from Platos p;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ListarPresupuesto()
    begin
		select p.codigoPresupuesto, p.fechaSolicitud, p.cantidadPresupuesto, p.codigoEmpresa from Presupuesto p;
    end $$
delimiter ;
call sp_ListarPresupuesto();

delimiter $$
	create procedure sp_ListarProductos()
    begin
		select p.codigoProducto, p.nombreProducto, p.cantidad from Productos p;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ListarProductos_has_Platos()
    begin
		select p.Productos_codigoProducto, p.codigoPlato, p.codigoProducto from Productos_has_Platos p;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ListarServicios()
    begin
		select s.codigoServicio, s.fechaServicio, s.tipoServicio, s.horaServicio, s.lugarServicio, s.telefonoContacto,
			s.codigoEmpresa from Servicios s;
    end $$
delimiter ;


delimiter $$
	create procedure sp_ListarServicios_has_Empleados()
    begin
		select s.Servicios_codigoServicio, s.codigoServicio, s.codigoEmpleado, s.fechaEvento, s.horaEvento, s.lugarEvento
			from Servicios_has_Empleados s;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ListarServicios_has_Platos()
    begin
		select s.Servicios_codigoServicio, s.codigoPlato, s.codigoServicio from Servicios_has_Platos s;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ListarTipoEmpleado()
    begin
		select t.codigoTipoEmpleado, t.descripcion from TipoEmpleado t;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ListarTipoPlato()
    begin
		select t.codigoTipoPlato, t.descripcionTipo from TipoPlato t;
    end $$
delimiter ;

#------------------------Buscar----------------------------
delimiter $$
	create procedure sp_BuscarEmpleados(busc int)
    begin
		select * from Empleados where codigoEmpleado=busc;
    end $$
delimiter ;

delimiter $$
	create procedure sp_BuscarEmpresas(busc int)
    begin
		select * from Empresas where codigoEmpresa=busc;
    end $$
delimiter ;

delimiter $$
	create procedure sp_BuscarPlatos(busc int)
    begin
		select * from Platos where codigoPlato=busc;
    end $$
delimiter ;

delimiter $$
	create procedure sp_BuscarPresupuesto(busc int)
    begin
		select * from Presupuesto where codigoPresupuesto=busc;
    end $$
delimiter ;

delimiter $$
	create procedure sp_BuscarProductos(busc int)
    begin
		select * from Productos where codigoProducto=busc;
    end $$
delimiter ;

delimiter $$
	create procedure sp_BuscarProductos_has_Platos(busc int)
    begin
		select * from Productos_has_Platos where Productos_codigoProducto=busc;
    end $$
delimiter ;

delimiter $$
	create procedure sp_BuscarServicios(busc int)
    begin
		select * from Servicios where codigoServicio=busc;
    end $$
delimiter ;

delimiter $$
	create procedure sp_BuscarServicios_has_Empleados(busc int)
    begin
		select * from Servicios_has_Empleados where Servicios_codigoServicio=busc;
    end $$
delimiter ;

delimiter $$
	create procedure sp_BuscarServicios_has_Platos(busc int)
    begin
		select * from Servicios_has_Platos where Servicios_codigoServicio=busc;
    end $$
delimiter ;

delimiter $$
	create procedure sp_BuscarTipoEmpleado(busc int)
    begin
		select * from TipoEmpleado where codigoTipoEmpleado=busc;
    end $$
delimiter ;

delimiter $$
	create procedure sp_BuscarTipoPlato(busc int)
    begin
		select * from TipoPlato where codigoTipoPlato=busc;
    end $$
delimiter ;

#--------------------Actualizar----------------------------

#drop procedure sp_ActualizarEmpleados;
delimiter $$
	create procedure sp_ActualizarEmpleados(
		in codigoEmpleados int,
		in numeroEmpleados int,
        in apellidosEmpleados varchar(150),
        in nombresEmpleados varchar(150),
        in direccionEmpleados varchar(150),
        in telefonoContactos varchar(20),
        in gradoCocineros varchar(50),
        in codigoTipoEmpleados int
	)
	begin
        update Empleados set numeroEmpleado=numeroEmpleados  where codigoEmpleado=codigoEmpleados;
        update Empleados set apellidosEmpleado=apellidosEmpleados  where codigoEmpleado=codigoEmpleados;
        update Empleados set nombresEmpleado=nombresEmpleados  where codigoEmpleado=codigoEmpleados;
        update Empleados set direccionEmpleado=direccionEmpleados  where codigoEmpleado=codigoEmpleados;
        update Empleados set telefonoContacto=telefonoContactos  where codigoEmpleado=codigoEmpleados;
        update Empleados set gradoCocinero=gradoCocineros  where codigoEmpleado=codigoEmpleados;
        update Empleados set codigoTipoEmpleado=codigoTipoEmpleados where codigoEmpleado=codigoEmpleados;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ActualizarEmpresas(
		in codigoEmpresas int,
        in nombreEmpresas varchar(150),
        in direcciones varchar(150),
        in telefonos varchar(20)
	)
	begin
        update Empresas set nombreEmpresa=nombreEmpresas  where codigoEmpresa=codigoEmpresas;
        update Empresas set direccion=direcciones  where codigoEmpresa=codigoEmpresas;
        update Empresas set telefono=telefonos  where codigoEmpresa=codigoEmpresas;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ActualizarPlatos(
		in codigoPlatos int,
        in cantidades int,
        in nombrePlatos varchar(50),
        in descripcionPlatos varchar(150),
        in precioPlatos decimal(10,2),
        in codigoTipoPlatos int
	)
	begin
		update Platos set cantidad=cantidades  where codigoPlato=codigoPlatos;
        update Platos set nombrePlato=nombrePlatos  where codigoPlato=codigoPlatos;
        update Platos set descripcionPlato=descripcionPlatos  where codigoPlato=codigoPlatos;
        update Platos set precioPlato=precioPlatos  where codigoPlato=codigoPlatos;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ActualizarPresupuesto(
		in codigoPresupuestos int,
        in fechaSolicitudes date,
        in cantidadPresupuestos decimal(10,2),
        in codigoEmpresas int
	)
	begin
        update Presupuesto set fechaSolicitud=fechaSolicitudes  where codigoPresupuesto=codigoPresupuestos;
        update Presupuesto set cantidadPresupuesto=cantidadPresupuestos  where codigoPresupuesto=codigoPresupuestos;
		update Presupuesto set codigoEmpresa=codigoEmpresas  where codigoPresupuesto=codigoPresupuestos;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ActualizarProductos(
		in codigoProductos int,
        in nombreProductos varchar(100),
        in cantidades int
	)
	begin
        update Productos set nombreProducto=nombreProductos  where codigoProducto=codigoProductos;
		update Productos set cantidad=cantidades  where codigoProducto=codigoProductos;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ActualizarProductos_has_Platos(
		in Productos_codigoProductos int,
        in codigoPlatos int,
        in codigoProductos int
	)
	begin
        update Productos_has_Platos set codigoPlato=codigoPlatos  where Productos_codigoProducto=Productos_codigoProductos;
        update productos_has_platos set codigoProducto=codigoProductos where Productos_codigoProducto=Productos_codigoProductos;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ActualizarServicios(
		in codigoServicios int,
        in fechaServicios date,
        in tipoServicios varchar(100),
        in horaServicios time,
        in lugarServicios varchar(100),
        in telefonoContactos varchar(10),
        in codigoEmpresas int
	)
	begin
        update Servicios set fechaServicio=fechaServicios  where codigoServicio=codigoServicios;
		update Servicios set tipoServicio=tipoServicios  where codigoServicio=codigoServicios;
        update Servicios set horaServicio=horaServicios  where codigoServicio=codigoServicios;
        update Servicios set lugarServicio=lugarServicios  where codigoServicio=codigoServicios;
        update Servicios set telefonoContacto=telefonoContactos  where codigoServicio=codigoServicios;
        
    end $$
delimiter ;

delimiter $$
	create procedure sp_ActualizarServicios_has_Empleados(
		in Servicios_codigoServicios int,
        in codigoServicios int,
        in codigoEmpleados int,
        in fechaEventos date,
        in horaEventos time,
        in lugarEventos varchar(150)
	)
	begin
		
		update Productos_has_Platos set fechaEvento=fechaEventos  where Servicios_codigoServicio=Servicios_codigoServicios;
        update Productos_has_Platos set horaEvento=horaEventos  where Servicios_codigoServicio=Servicios_codigoServicios;
        update Productos_has_Platos set lugarEvento=lugarEventos  where Servicios_codigoServicio=Servicios_codigoServicios;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ActualizarServicios_has_Platos(
		in Servicios_codigoServicios int,
        in codigoPlatos int,
        in codigoServicios int
	)
	begin
        update Servicios_has_Platos set codigoPlato=codigoPlatos  where Servicios_codigoServicio=Servicios_codigoServicios;
        update Servicios_has_Platos set codigoServicio=codigoServicios  where Servicios_codigoServicio=Servicios_codigoServicios;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ActualizarTipoEmpleado(
		in codigoTipoEmpleados int,
        in descripciones varchar(100)
	)
	begin
        update TipoEmpleado set descripcion=descripciones  where codigoTipoEmpleado=codigoTipoEmpleados;
    end $$
delimiter ;

delimiter $$
	create procedure sp_ActualizarTipoPlato(
		in codigoTipoPlatos int,
        in descripcionTipos varchar(100)
	)
	begin
        update TipoPlato set descripcionTipo=descripcionTipos where codigoTipoPlato=codigoTipoPlatos;
    end $$
delimiter ;

#----------------------Agregar---------------------------
delimiter $$
	create procedure sp_AgregarEmpresas(
        in nombreEmpresa varchar(150),
        in direccion varchar(150),
        in telefono varchar(20)
    )
    begin
		insert into Empresas( nombreEmpresa, direccion, telefono)
        values ( nombreEmpresa, direccion, telefono);
    end $$
delimiter ;

call sp_AgregarEmpresas('Roten','Zona 10','1512635');
call sp_AgregarEmpresas('Taco Bell','Zona 12','5162639');
call sp_AgregarEmpresas('Patzi burguer','Zona 2','8459637');
call sp_AgregarEmpresas('Napoli','Zona 5','56123458');
call sp_AgregarEmpresas('Payless','Zona 8','59174863');
call sp_ListarEmpresas();

delimiter $$
	create procedure sp_AgregarPresupuesto(
        in fechaSolicitud date,
        in cantidadPresupuesto decimal(10,2),
        in codigoEmpresa int
    )
    begin
		insert into Presupuesto( fechaSolicitud, cantidadPresupuesto, codigoEmpresa)
        values(fechaSolicitud, cantidadPresupuesto, codigoEmpresa);
    end $$
delimiter ;

call sp_AgregarPresupuesto('2019-12-09',1200.50,1);
#call sp_ListarPresupuesto();


delimiter $$
	create procedure sp_AgregarServicios(
        in fechaServicio date,
        in tipoServicio varchar(100),
        in horaServicio time,
        in lugarServicio varchar(100),
        in telefonoContacto varchar(10),
        in codigoEmpresa int
    )
    begin
		insert into Servicios(fechaServicio, tipoServicio, horaServicio, lugarServicio, telefonoContacto,
								codigoEmpresa)
		values(fechaServicio, tipoServicio, horaServicio, lugarServicio, telefonoContacto,
				codigoEmpresa);
    end$$
delimiter ;

call sp_AgregarServicios('2020-03-20','Bufette',now(),'Centra Sur','15266203',1);
#select * from Servicios;


delimiter $$
	create procedure sp_AgregarTipoPlato(
        in descripcionTipo varchar(100)
    )
    begin
		insert into tipoPlato( descripcionTipo)
        values( descripcionTipo);
    end $$
delimiter ;

delimiter $$
	create procedure sp_AgregarPlatos(
        in cantidad int,
        in nombrePlato varchar(50),
        in descripcionPlato varchar(150),
        in precioPlato decimal(10,2),
        in codigoTipoPlato int
    )
    begin
		insert into Platos( cantidad, nombrePlato, descripcionPlato, precioPlato, codigoTipoPlato)
		values( cantidad, nombrePlato, descripcionPlato, precioPlato, codigoTipoPlato);
    end$$
delimiter ;

delimiter $$
	create procedure sp_AgregarProductos(
		in codigoProducto int,
        in nombreProducto varchar(100),
        in cantidad int
    )
    begin
		insert into Productos(codigoProducto, nombreProducto, cantidad)
        values(codigoProducto, nombreProducto, cantidad);
    end $$
delimiter ;

delimiter $$
	create procedure sp_AgregarServicios_has_Platos(
		in Servicios_codigoServicio int,
        in codigoPlato int,
        in codigoProducto int
    )
    begin
		insert into Servicios_has_Platos(Servicios_codigoServicio, codigoPlato, codigoProducto)
        values(Servicios_codigoServicio, codigoPlato, codigoProducto);
    end $$
delimiter ;

delimiter $$
	create procedure sp_AgregarProductos_has_Platos(
		in Productos_codigoProducto int,
        in codigoPlato int,
        in codigoServio int
    )
    begin
		insert into Productos_has_Platos(Productos_codigoProducto, codigoPlato, codigoServicio)
        values(Productos_codigoProducto, codigoPlato, codigoServicio);
    end $$
delimiter ;

delimiter $$
	create procedure sp_AgregarTipoEmpleado(
        in descripcion varchar(100)
    )
    begin
		insert into tipoEmpleado( descripcion)
        values(descripcion);
    end $$
delimiter ;

call sp_AgregarTipoEmpleado('Chef Ejecutivo');
call sp_AgregarTipoEmpleado('Chef segundo o tercer cocinero');
call sp_AgregarTipoEmpleado('Asistente de chef ejecutivo');
call sp_AgregarTipoEmpleado('Emplatador primero(Lider)');
call sp_AgregarTipoEmpleado('Experto en Pasteles');
call sp_ListarTipoEmpleado();

delimiter $$
	create procedure sp_AgregarEmpleados(
        in numeroEmpleado int,
        in apellidosEmpleado varchar(150),
        in nombresEmpleado varchar(150),
        in direccionEmpleado varchar(150),
        in telefonoContacto varchar(20),
        in gradoCocinero varchar(50),
        in codigoTipoEmpleado int
    )
    begin
		insert into Empleados( numeroEmpleado, apellidosEmpleado, nombresEmpleado, direccionEmpleado, 
							telefonoContacto, gradoCocinero, codigoTipoEmpleado)
        values( numeroEmpleado, apellidosEmpleado, nombresEmpleado, direccionEmpleado, telefonoContacto,
				gradoCocinero, codigoTipoEmpleado);
    end $$
delimiter ;

call sp_AgregarEmpleados(1,'Guerra Giron','Marvin David','Zona 1',51152719,'chef de partie',5);
call sp_AgregarEmpleados(2,'Guerra Hernandez','Jose David','Zona 12',49253691,'chef',1);

delimiter $$
	create procedure sp_AgregarServicios_has_Empleados(
		in Servicios_codigoServicio int,
        in codigoServicio int,
        in codigoEmpleado int,
        in fechaEvento date,
        in horaEvento time,
        in lugarEvento varchar(150)
    )
    begin
		insert into Servicios_has_Empleados(Servicios_codigoServicio, codigoServicio, codigoEmpleado, fechaEvento, horaEvento, lugarEvento)
        values(Servicios_codigoServicio,codigoServicio,codigoEmpleado, fechaEvento, horaEvento, lugarEvento);
    end $$
delimiter ;

#-------------------------Eliminar-----------------------------------
delimiter $$
	create procedure sp_EliminarEmpleados(eli int)
    begin
		delete from Empleados where codigoEmpleado=eli;
    end $$
delimiter ;

delimiter $$
	create procedure sp_EliminarEmpresas(eli int)
    begin
		delete from Empresas where codigoEmpresa=eli;
    end $$
delimiter ;

delimiter $$
	create procedure sp_EliminarPlatos(eli int)
    begin
		delete from Platos where codigoPlato=eli;
    end $$
delimiter ;

delimiter $$
	create procedure sp_EliminarPresupuesto(eli int)
    begin
		delete from Presupuesto where codigoPresupuesto=eli;
    end $$
delimiter ;

delimiter $$
	create procedure sp_EliminarProductos(eli int)
    begin
		delete from Productos where codigoProducto=eli;
    end $$
delimiter ;

delimiter $$
	create procedure sp_EliminarProductos_has_Platos(eli int)
    begin
		delete from Productos_has_Platos where Productos_codigoProducto=eli;
    end $$
delimiter ;

delimiter $$
	create procedure sp_EliminarServicios(eli int)
    begin
		delete from Servicios where codigoServicio=eli;
    end $$
delimiter ;

delimiter $$
	create procedure sp_EliminarServicios_has_Empleados(eli int)
    begin
		delete from Servicios_has_Empleados where Servicios_codigoServicio=eli;
    end $$
delimiter ;

delimiter $$
	create procedure sp_EliminarServicios_has_Platos(eli int)
    begin
		delete from Servicios_has_Platos where Servicios_codigoServicio=eli;
    end $$
delimiter ;

delimiter $$
	create procedure sp_EliminarTipoEmpleado(eli int)
    begin
		delete from TipoEmpleado where codigoTipoEmpleado=eli;
    end $$
delimiter ;

delimiter $$
	create procedure sp_EliminarTipoPlato(eli int)
    begin
		delete from TipoPlato where codigoTipoPlato=eli;
    end $$
delimiter ;



#ALTER USER 'root'@'localhost' identified with mysql_native_password by 'Admin';


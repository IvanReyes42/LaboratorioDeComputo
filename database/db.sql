create database Laboratorio;
use Laboratorio;

create table Users(IdUser int primary key auto_increment,
FullName varchar(50) not null, 
UserName varchar(50) not null,
Password varchar(100) not null,
Rol enum('Administrador','Tecnico') not null);

create table Laboratorios(IdLaboratorio int primary key auto_increment,
Nombre varchar(50) not null,
Ubicacion varchar(50) not null);

create table Computadoras(IdComputadora varchar(10) primary key,
Marca varchar(50) not null, 
Monitor varchar(50) not null,
Procesador varchar(50) not null,
RAM varchar(10) not null,
Almacenamiento varchar(10) not null,
Conexion enum('Cable','Inalambrico') not null,
Status enum('Funcionando','Reparacion','Baja') not null,
FkIdLab int not null,
Foreign Key (FkIdLab) REFERENCES Laboratorios(IdLaboratorio));

create table Mantenimientos(IdMantenimiento int primary key auto_increment,
Fecha date not null,
Tipo enum('Inicial','Preventivo','Correctivo') not null,
Problematica varchar(100) not null,
Status enum('Abierto','Proceso','Cerrado') not null,
FkIdUser int not null,
FkIdComputadora varchar(10) not null,
Foreign key (FkIdUser) REFERENCES Users(IdUser),
Foreign Key (FkIdComputadora) REFERENCES Computadoras(IdComputadora));


drop schema if exists miniuber;
create schema miniuber;

create table miniuber.passenger (
	passenger_id uuid primary key,
	name text,
	email text,
	document text
);

create table miniuber.driver (
	driver_id uuid primary key,
	name text,
	email text,
	document text,
	car_plate text
);
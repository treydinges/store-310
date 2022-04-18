-- psql -d postgres -U postgres
create user my_user with password '1234' createdb;
-- \q

-- psql -d postgres -U my_user
create database store;
-- \c store
create table users (
  user_id serial primary key,
  user_fname varchar(30) not null,
  user_lname varchar(30) not null,
  user_phone varchar(25) not null,
  user_password varchar(50) not null,
  user_is_admin varchar(5) not null default 'false'
);

create table orders (
  order_id serial primary key,
  user_id integer not null,
  order_is_completed varchar(5) not null default 'false',
  order_datetime timestamp not null,
  constraint order_fk1 foreign key (user_id) references users(user_id) on delete cascade
);

create table pickup_locations (
  pickup_location_id serial primary key,
  pickup_location_parking_spot varchar(25) not null
);

create table pickups (
  pickup_id serial primary key,
  order_id integer not null,
  pickup_location_id integer not null,
  pickup_start_time timestamp not null,
  pickup_end_time timestamp not null,
  constraint pickup_fk1 foreign key (order_id) references orders(order_id) on delete cascade,
  constraint pickup_fk2 foreign key (pickup_location_id) references pickup_locations(pickup_location_id) on delete cascade
);

create table categories (
  category_id serial primary key,
  category_name varchar(30) not null
);

create table items (
  item_id serial primary key,
  category_id integer not null,
  item_name varchar(30) not null,
  item_price decimal(9,2) not null,
  item_qoh integer not null,
  item_description varchar(256) not null,
  constraint item_fk1 foreign key (category_id) references categories(category_id) on delete cascade
);

create table items_users (
  item_user_id serial primary key,
  item_id integer not null,
  user_id integer not null,
  constraint item_user_fk1 foreign key (item_id) references items(item_id) on delete cascade,
  constraint item_user_fk2 foreign key (user_id) references users(user_id) on delete cascade
);

create table orderline (
  orderline_id serial primary key,
  item_id integer not null,
  order_id integer not null,
  item_quantity integer not null,
  constraint orderline_fk1 foreign key (item_id) references items(item_id) on delete cascade,
  constraint orderline_fk2 foreign key (order_id) references orders(order_id) on delete cascade
);

select * from categories;
select * from items;
select * from items_users;
select * from orderline;
select * from orders;
select * from pickup_locations;
select * from pickups;
select * from users;
-- \q

-- users table
create table if not exists users(
    user_id serial primary key,
    username varchar(255) unique not null,
    email varchar(255) unique not null,
    password varchar(255) not null,
    created_at date default current_date
)

create table if not exists curation(
    image_id serial primary key,
    image_url varchar(255) unique not null,
    original_url varchar(255) unique not null,
    image_tags text [],
    image_artist varchar(255) not null,
    image_title varchar(255),
    image_source varchar(255),
)

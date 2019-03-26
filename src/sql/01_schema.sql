create table Authors
(
  id        int auto_increment
    primary key,
  name      varchar(255) null,
  createdAt datetime     not null,
  updatedAt datetime     not null
);

create table Posts
(
  id        int auto_increment
    primary key,
  title     varchar(255) not null,
  body      text         not null,
  createdAt datetime     not null,
  updatedAt datetime     not null,
  AuthorId  int          null,
  constraint posts_ibfk_1
    foreign key (AuthorId) references Authors (id)
      on update cascade on delete cascade
);

create index AuthorId
  on Posts (AuthorId);

create table users
(
  id        int auto_increment
    primary key,
  username  varchar(255) not null,
  email     varchar(255) not null,
  password  varchar(255) not null,
  role      varchar(255) null,
  createdAt datetime     not null,
  updatedAt datetime     not null,
  constraint email
    unique (email),
  constraint username
    unique (username)
);

create table messages
(
  id        int auto_increment
    primary key,
  text      varchar(255) null,
  createdAt datetime     not null,
  updatedAt datetime     not null,
  userId    int          null,
  constraint messages_ibfk_1
    foreign key (userId) references users (id)
      on update cascade on delete cascade
);

create index userId
  on messages (userId);


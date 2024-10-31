-- Tạo database
CREATE DATABASE social_media;
USE social_media;

-- Bảng: users
CREATE TABLE users (
    id INT(255) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    coverPicture VARCHAR(255),
    profilePicture VARCHAR(255),
    city VARCHAR(255),
    website VARCHAR(255)
);

-- Bảng: posts
CREATE TABLE posts (
    id INT(255) PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255),
    img VARCHAR(255),
    userId INT(255),
    createdAt DATETIME(6),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng: comments
CREATE TABLE comments (
    id INT(255) PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255),
    postId INT(255),
    userId INT(255),
    createdAt DATETIME(6),
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng: likes
CREATE TABLE likes (
    id INT(255) PRIMARY KEY AUTO_INCREMENT,
    userId INT(255),
    postId INT(255),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

-- Bảng: relationships
CREATE TABLE relationships (
    id INT(255) PRIMARY KEY AUTO_INCREMENT,
    followerUserId INT(255),
    followedUserId INT(255),
    FOREIGN KEY (followerUserId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followedUserId) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng: conversations
CREATE TABLE conversations (
    id INT(255) PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255),
    userId INT(255),
    userId2 INT(255),
    createdAt DATETIME(6),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (userId2) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng: messages
CREATE TABLE messages (
    id INT(255) PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(255),
    userId INT(255),
    conversationId INT(255),
    createdAt DATETIME(6),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (conversationId) REFERENCES conversations(id) ON DELETE CASCADE
);

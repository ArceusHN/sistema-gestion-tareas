CREATE DATABASE task_management_system;
USE task_management_system;

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    role_id INT,
    is_password_encrypted TINYINT(1) DEFAULT 0 NOT NULL,
    created_by INT NULL,                
    updated_by INT NULL,           
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,   
    updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE TABLE task_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status_id INT DEFAULT 1,          
    user_id INT,                   
    created_by INT,                 
    updated_by INT NULL,             
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (status_id) REFERENCES task_statuses(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

INSERT INTO task_statuses (`name`) 
VALUES ('pending'), ('in-progress'), ('completed');

INSERT INTO roles (`name`)
VALUES('Administrador'),('Usuario');

INSERT INTO users(username, `password`, role_id, is_password_encrypted)
VALUES('SuperAdmin', 'admin', 1, 0);

INSERT INTO users(username, `password`, role_id, is_password_encrypted)
VALUES('NormalUser', 'user', 2, 0);
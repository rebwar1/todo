-- Create the 'Todo_Mysql' database
CREATE DATABASE Todo_Mysql;

-- Create the 'NGF' user and grant privileges on 'Todo_Mysql'
CREATE USER 'todotest'@'%' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON Todo_Mysql.* TO 'todotest'@'%';
FLUSH PRIVILEGES;

-- Switch to the 'Todo_Mysql' database
USE Todo_Mysql;

CREATE TABLE todo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255)
);





select user from mysql.user;
DROP USER 'todotest'@'%';
DROP DATABASE Todo_Mysql;
DROP TABLE todo;


-- ! delete rows
DELETE FROM todo WHERE id BETWEEN 1 AND 5;
DELETE FROM todo WHERE id = ?;

-- ! more readable
SELECT * FROM CheckIns\G
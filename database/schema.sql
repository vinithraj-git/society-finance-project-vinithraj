CREATE DATABASE IF NOT EXISTS society_finance;
USE society_finance;

CREATE TABLE members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    flat_no VARCHAR(20),
    phone VARCHAR(15),
    email VARCHAR(100)
);

CREATE TABLE expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    amount DECIMAL(10,2),
    expense_date DATE,
    description TEXT
);

CREATE TABLE income (
    income_id INT AUTO_INCREMENT PRIMARY KEY,
    source VARCHAR(100),
    amount DECIMAL(10,2),
    income_date DATE,
    description TEXT
);

CREATE TABLE maintenance (
    maintenance_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    amount DECIMAL(10,2),
    due_date DATE,
    status VARCHAR(20),
    FOREIGN KEY (member_id) REFERENCES members(member_id)
);
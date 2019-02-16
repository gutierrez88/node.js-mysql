DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  productName VARCHAR(100) ,
  departmentName VARCHAR(50),
  price FLOAT(10,2),
  stockQuantity INTEGER(10) NULL
);

SELECT * FROM products;


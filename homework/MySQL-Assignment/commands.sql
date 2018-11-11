CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	id INT(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INT(11) NOT NULL,
  stock_quantity INT(11) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing", "3.50", "100");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pants", "Clothing", "16.80", "30");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cool Hat", "Clothing", "116.42", "10");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fanny Packs", "Clothing", "2.50", "65412541");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yacht", "Boats", "1165121.00", "1");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fishing Boat", "Boats", "1116.00", "15");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apples", "Food", "1.08", "1500");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Steak", "Food", "31.08", "70");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ham", "Food", "2.03", "370");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cheese", "Food", "5.00", "33370");
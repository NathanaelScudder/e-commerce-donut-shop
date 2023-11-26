DROP SCHEMA IF EXISTS `pms`;
CREATE SCHEMA IF NOT EXISTS `pms`;

USE `pms`;

DROP TABLE IF EXISTS `PRODUCTS`;

CREATE TABLE IF NOT EXISTS `PRODUCTS` (
	`PRODUCT_ID` INT NOT NULL PRIMARY KEY,
    `PRODUCT_NAME` VARCHAR(255) NOT NULL,
	`DESCRIPTION` VARCHAR(255) NOT NULL,
    `LONG_DESCRIPTION` VARCHAR(1027) NOT NULL,
    `IMAGE_PATH` VARCHAR(255) NOT NULL,
	`PAGE_PATH` VARCHAR(255) NOT NULL,
	`COST` DOUBLE NOT NULL,
    `RATING` INT NOT NULL
);

INSERT INTO `PRODUCTS`
VALUES (
	1,
    "Classic Frosted",
    "$0.91 each",
    "Classic vanilla donut with a light glaze.",
    "classic.png",
    "classic-frosted",
    0.91,
    0
);

INSERT INTO `PRODUCTS`
VALUES (
	2,
    "Chocolate Frosted",
    "$1.08 each",
    "Vanilla donut glazed with chocolate frosting.",
    "chocolate.png",
    "chocolate-frosted",
    1.08,
    0
);

INSERT INTO `PRODUCTS`
VALUES (
	3,
    "Strawberry Frosted",
    "$1.08 each",
    "Vanilla donut glazed with strawberry frosting.",
    "strawberry.png",
    "strawberry-frosted",
    1.08,
    0
);

INSERT INTO `PRODUCTS`
VALUES (
	4,
    "Blueberry Filled",
    "$1.33 each",
    "Old fashion donut mixed with fresh blueberries an covered by a light glaze.",
    "blueberry.png",
    "blueberry-filled",
    1.33,
    0
);

INSERT INTO `PRODUCTS`
VALUES (
	5,
    "Cream Filled Chocolate Frosted",
    "$1.41 each",
    "Cream filled vanilla donut glazed with chocolate frosting.",
    "chocolate-filled.png",
    "cream-filled-chocolate-frosted",
    1.41,
    0
);

INSERT INTO `PRODUCTS`
VALUES (
	6,
    "Cream Filled Cake Batter Frosted",
    "$1.41 each",
    "Cream filled vanilla donut glazed with cake batter flavored frosting.",
    "cake-batter.png",
    "cream-filled-cake-batter-frosted",
    1.41,
    0
);

INSERT INTO `PRODUCTS`
VALUES (
	7,
    "Cream Filled Oreo Topped ",
    "$1.50 each",
    "Cream filled vanilla donut glazed with chocolate frosting. Topped with Oreo crumbs and an icing drizzle.",
    "oreo.png",
    "cream-filled-oreo-topped",
    1.50,
    0
);

INSERT INTO `PRODUCTS`
VALUES (
	8,
    "Raspberry Filled",
    "$1.41 each",
    "Vanilla donut filled with fresh raspberry jelly and covered by a light glaze.",
    "raspberry-filled.png",
    "raspberry-filled",
    1.41,
    0
);

INSERT INTO `PRODUCTS`
VALUES (
	9,
    "Mini Chocolate Frosted",
    "$0.40 each",
    "Miniature vanilla donut glazed with chocolate frosting.",
    "mini-chocolate.png",
    "mini-chocolate-frosted",
    0.40,
    0
);

INSERT INTO `PRODUCTS`
VALUES (
	10,
    "Donut Holes",
    "$0.35 each",
    "Vanilla cake shaped into donut holes and lightly glazed.",
    "holes.png",
    "donut-holes",
    0.35,
    0
);

SELECT * FROM `PRODUCTS`; 

DROP TABLE IF EXISTS `ORDERS`;

CREATE TABLE IF NOT EXISTS `ORDERS` (
	`ORDER_ID` INT NOT NULL PRIMARY KEY,
    `FIRST_NAME` VARCHAR(18) NOT NULL,
    `LAST_NAME` VARCHAR(18) NOT NULL,
	`PHONE_NUMBER` VARCHAR(31) NOT NULL,
    `CREDIT_CARD_NUMBER` VARCHAR(18) NOT NULL,
    `SHIPPING_ADDRESS` VARCHAR(127) NOT NULL,
    `SHIPPING_CITY` VARCHAR(127) NOT NULL,
    `SHIPPING_COUNTY` VARCHAR(127) NOT NULL,
    `SHIPPING_STATE` VARCHAR(4) NOT NULL,
    `SHIPPING_ZIP_CODE` VARCHAR(16) NOT NULL,
    `SHIPPING_METHOD` VARCHAR(18) NOT NULL
);

DROP TABLE IF EXISTS `ORDERED_ITEMS`;

CREATE TABLE IF NOT EXISTS `ORDERED_ITEMS` (
	`ORDER_ID` INT NOT NULL REFERENCES `PRODUCTS` (`PRODUCT_ID`),
    `PRODUCT_ID` INT NOT NULL REFERENCES `ORDERS` (`ORDER_ID`),
    `QUANTITY` INT NOT NULL,
    PRIMARY KEY (`ORDER_ID`, `PRODUCT_ID`)
);
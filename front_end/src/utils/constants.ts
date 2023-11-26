import { GetRequestStateCity, Product } from "./typedefs";

// Constant for the directory of each product
export const PRODUCT_PAGE_FOLDER: string = "product";

// Constant for the directory of each product's img
export const PRODUCT_IMAGE_FOLDER: string = "products"

export const NULL_STATE_CITY: GetRequestStateCity = {
    city: "NONE",
    state: "NONE",
};

export const NULL_PRODUCT:Product = {
    productID: 0,
    productName: "Nat Donuts Placeholder",
    description: "$0.00 each",
    longDescription: "NULL PRODUCT PLEASE IGNORE",
    imagePath: "/nat-donuts-logo.png",
    pagePath: "no-product-found",
    cost: 0,
    rating: 0,
};

export const enum PAGE {
    BASE = "localhost:3000/",
    CART = "shopping-cart",
    ORDER_DETAILS = "order-details",
}

export const enum PRODUCT_SLUGS {
    CLASSIC_FROSTED = "classic-frosted",
    CHOCOLATE_FROSTED = "chocolate-frosted",
    STRAWBERRY_FROSTED = "strawberry-frosted",
    BLUEBERRY_FILLED = "blueberry-filled",
    CREAM_FILLED_CHOCOLATE_FROSTED = "cream-filled-chocolate-frosted",
    CREAM_FILLED_CAKE_BATTER_FROSTED = "cream-filled-cake-batter-frosted",
    CREAM_FILLED_OREO_TOPPED = "cream-filled-oreo-topped",
    RASPBERRY_FILLED = "raspberry-filled",
    MINI_CHOCOLATE_FROSTED = "mini-chocolate-frosted",
    DONUT_HOLES = "donut-holes",
}

// Constants for retrieving data from the form
export const enum FORM_CONSTANTS {
    PRODUCT_ID = "productID",
    FIRST_NAME = "firstName",
    LAST_NAME = "lastName",
    NAME_LENGTH_MINIMUM = "2",
    NAME_LENGTH_MAXIMUM = "16",
    QUANTITY = "quantity",
    QUANTITY_MINIMUM = "1",
    QUANTITY_MAXIMUM = "24",
    PHONE_NUMER = "phoneNumber",
    CREDIT_CARD = "creditCard",
    ADDRESS = "shippingAddress",
    ADDRESS_LENGTH_MINIMUM = "2",
    ADDRESS_LENGTH_MAXIMUM = "124",
    ADDRESS_CITY = "shippingCity",
    ADDRESS_COUNTY = "shippingCounty",
    ADDRESS_ZIP_CODE = "shippingZipCode",
    ADDRESS_STATE = "shippingState",
    SHIPPING_METHOD = "shippingMethod",
    SHIPPING_METHOD_SIX_HOUR = "6 Hour",
    SHIPPING_METHOD_SIX_HOUR_COST = "10",
    SHIPPING_METHOD_ONE_DAY = "1 Day",
    SHIPPING_METHOD_ONE_DAY_COST = "5",
    SHIPPING_METHOD_TWO_DAY = "2 Day",
    SHIPPING_METHOD_TWO_DAY_COST = "2",
};

export const enum EXPRESS_CONSTANTS {
    EXPRESS_SERVER = "http://localhost:8000",
    END_POINT_CART = "/cart",
    END_POINT_CART_CONTENTS = "/contents",
    END_POINT_CART_ITEM = "/item",
    END_POINT_DB = "/db",
    END_POINT_DB_PRODUCT = "/product/",
    END_POINT_DB_PRODUCT_RATING = "rating",
    END_POINT_DB_PRODUCT_ALL = "/product/all",
    END_POINT_DB_ORDER = "/order",
    END_POINT_DB_ORDER_NEXT_ID = "/nextID",
    END_POINT_DB_LAST_FIVE = "/last-five-items",
    END_POINT_LOOKUP = "/lookup",
    END_POINT_LOOKUP_TAX_RATE = "/tax-rate/",
    END_POINT_LOOKUP_STATE_CITY  = "/state-city/",
    NULL_STRING = "NONE",
}

export const enum SESSION_CONSTANTS {
    CART = "CART_CONTENTS",
    LAST_ORDER = "LAST_ORDER",
}
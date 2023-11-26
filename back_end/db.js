const NUM_ORDERS = "NUM_ORDERS";
const PRODUCTS_TABLE = "PRODUCTS";
const PRODUCTS_ID = "PRODUCT_ID";
const PRODUCTS_NAME = "PRODUCT_NAME";
const PRODUCTS_DESCRIPTION = "DESCRIPTION";
const PRODUCTS_LONG_DESCRIPTION = "LONG_DESCRIPTION";
const PRODUCTS_IMAGE_PATH = "IMAGE_PATH";
const PRODUCTS_PAGE_PATH = "PAGE_PATH";
const PRODUCTS_COST = "COST";
const PRODUCTS_RATING = "RATING";

const ORDERS_TABLE = "ORDERS";
const ORDERS_ID = "ORDER_ID";

const ORDERED_ITEMS_TABLE = "ORDERED_ITEMS"

function transformProductData(productData) {
    if(!productData) {
        return {};
    }

    return {
        productID: productData.PRODUCT_ID,
        productName: productData.PRODUCT_NAME,
        imagePath: productData.IMAGE_PATH,
        pagePath: productData.PAGE_PATH,
        description: productData.DESCRIPTION,
        longDescription: productData.LONG_DESCRIPTION,
        cost: productData.COST,
        rating: productData.RATING,
    }
}

function transformProductDataArray(productDataArray)
{
    if(!productDataArray) {
        return {};
    }

    let newArray = [];

    for(let i = 0; i < productDataArray.length; i++)
    {
        newArray.push(transformProductData(productDataArray[i]));
    }

    return newArray;
}

function isInArray(product, productArray)
{
    for(let i = 0; i < productArray.length; i++)
    {
        if(product.productID == productArray[i].productID)
        {
            return true;
        }
    }

    return false;
}

const express = require("express");
const router = express.Router();
const dbConfig = require("./config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
    },
    define: {
        scopes: {
            excludeCreatedAtUpdateAt: {
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
           },
        timestamps: false
    }
});

const Product = sequelize.define(PRODUCTS_TABLE, {
    PRODUCT_ID: {type: Sequelize.INTEGER, primaryKey: true},
    PRODUCT_NAME: {type: Sequelize.STRING},
    DESCRIPTION: {type: Sequelize.STRING},
    LONG_DESCRIPTION: {type: Sequelize.STRING},
    IMAGE_PATH: {type: Sequelize.STRING},
    PAGE_PATH: {type: Sequelize.STRING},
    COST: {type: Sequelize.DOUBLE},
    RATING: {type: Sequelize.INTEGER},
});

const Order = sequelize.define(ORDERS_TABLE, {
    ORDER_ID: {type: Sequelize.INTEGER, primaryKey: true},
    FIRST_NAME: {type: Sequelize.STRING},
    LAST_NAME: {type: Sequelize.STRING},
    PHONE_NUMBER: {type: Sequelize.STRING},
    CREDIT_CARD_NUMBER: {type: Sequelize.STRING},
    SHIPPING_ADDRESS: {type: Sequelize.STRING},
    SHIPPING_CITY: {type: Sequelize.STRING},
    SHIPPING_COUNTY: {type: Sequelize.STRING},
    SHIPPING_STATE: {type: Sequelize.STRING},
    SHIPPING_ZIP_CODE: {type: Sequelize.STRING},
    SHIPPING_METHOD: {type: Sequelize.STRING},
});

const OrderedItems = sequelize.define(ORDERED_ITEMS_TABLE, {
    ORDER_ID: {type: Sequelize.INTEGER, primaryKey: true},
    PRODUCT_ID: {type: Sequelize.INTEGER, primaryKey: true},
    QUANTITY: {type: Sequelize.INTEGER},
});

router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.use(express.static('public'));

router.post('/product/rating', async (req, res) => {
    let productID = req.body.productID;
    let rating = req.body.rating;

    const dbResponse = await Product.update({RATING: rating}, {where: {PRODUCT_ID: productID}});

    return res.send(dbResponse);
});

router.get('/product/all', async (req, res) => {
    const dbResponse = await sequelize.query(`SELECT * FROM ${PRODUCTS_TABLE}`);
    res.send({
        products: transformProductDataArray(dbResponse[0])
    });
});

router.get('/product/:productID', async (req, res) => {
    const dbResponse = await sequelize.query(`SELECT * FROM ${PRODUCTS_TABLE} WHERE ${PRODUCTS_ID}=${req.params["productID"]}`);
    res.send({
        product: transformProductData(dbResponse[0][0])
    });
});

router.get('/order/nextID', async (req, res) => {
    const dbResponse = await sequelize.query(`SELECT COUNT(*) AS ${NUM_ORDERS} FROM ${ORDERS_TABLE}`);
    res.send({
        numOrders: dbResponse[0][0][NUM_ORDERS],
    });
});

router.get('/order/last-five-items', async (req, res) => {
    const dbResponse = await sequelize.query(`
    SELECT ${ORDERS_ID}, ${PRODUCTS_ID}, ${PRODUCTS_NAME}, ${PRODUCTS_DESCRIPTION}, ${PRODUCTS_LONG_DESCRIPTION}, ${PRODUCTS_IMAGE_PATH}, ${PRODUCTS_PAGE_PATH}, ${PRODUCTS_COST}, ${PRODUCTS_RATING} FROM ${ORDERS_TABLE}
    JOIN ${ORDERED_ITEMS_TABLE} USING (${ORDERS_ID})
    JOIN ${PRODUCTS_TABLE} USING (${PRODUCTS_ID})
    ORDER BY ${ORDERS_ID} DESC;
    `);


    let products = dbResponse[0];
    let lastFive = [];

    for(let i = 0; i < products.length; i++)
    {
        let nextProduct = transformProductData(products[i]);

        if(!isInArray(nextProduct, lastFive))
        {
            lastFive.push(nextProduct);

            if(lastFive.length >= 5)
            {
                break;
            }
        }
    }

    res.send({
        products: lastFive
    });
});

router.post('/order', async (req, res) => {
    const orderDetails = req.body.orderDetails;

    const order = {
        ORDER_ID: orderDetails.orderID,
        FIRST_NAME: orderDetails.firstName,
        LAST_NAME: orderDetails.lastName,
        PHONE_NUMBER: orderDetails.phoneNumber,
        CREDIT_CARD_NUMBER: orderDetails.creditCardNumber,
        SHIPPING_ADDRESS: orderDetails.shippingAddress,
        SHIPPING_CITY: orderDetails.shippingCity,
        SHIPPING_COUNTY: orderDetails.shippingCounty,
        SHIPPING_STATE: orderDetails.shippingState,
        SHIPPING_ZIP_CODE: orderDetails.shippingZipCode,
        SHIPPING_METHOD: orderDetails.shippingMethod,
    }

    await Order.create(order);

    const orderedItemsArray = orderDetails.orderedItems;

    for(let i = 0; i < orderedItemsArray.length; i++)
    {
        const nextItem = orderedItemsArray[i];

        const orderedItems = {
            ORDER_ID: orderDetails.orderID,
            PRODUCT_ID: nextItem.productID,
            QUANTITY: nextItem.quantity,
        }

        await OrderedItems.create(orderedItems);
    }

    res.send("Order received");
});


module.exports = router;
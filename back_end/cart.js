const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const router = express.Router();

router.use(cookieParser());

const sessionLife = 1000*60*60; // one hour
router.use(session({
    secret: "thisisaverysecretstring",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: sessionLife,
        secure: false,
        httpOnly: false,
    }}));

router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.use(express.static('public'));

router.post("/item", (req, res) => {
    const productID = req.body.productID;
    const quantity = req.body.quantity
    let isInCartAlready = false;

    if(req.session.cart)
    {
        for(let i = 0; i < req.session.cart.length; i++)
        {
            if(req.session.cart[i].productID == productID)
            {
                req.session.cart[i].quantity = quantity;
                isInCartAlready = true;
                break;
            }
        }

        if(!isInCartAlready)
        {
            req.session.cart.push({
                productID: productID,
                quantity: quantity,
            });
        }
    }
    else
    {
        req.session.cart = [{
            productID: productID,
            quantity: quantity,
        }];
    }

    console.log(req.session.cart);
    res.send(`Added ${quantity} of Product ${productID}`);
});

router.delete("/item", (req, res) => {
    const productID = req.body.productID;
    let wasInCart = false;

    if(req.session.cart)
    {
        req.session.cart = req.session.cart.filter(orderItem => {
            if(orderItem.productID == productID)
            {
                wasInCart = true;
            }
            return !(orderItem.productID == productID);
        })

        if(wasInCart)
        {
            res.send(`Product ${productID} removed from cart`);
        }
        else
        {
            res.send(`Product ${productID} not in cart`);
        }
    }
    else
    {
        res.send(`No cart to remove Product ${productID} from`);
    }
});

router.get("/contents", (req, res) => {
    console.log(req.session.cart)
    if(req.session.cart)
    {
        res.send({
            cartItems: req.session.cart
        });
    }
    else
    {
        res.send({
            cartItems: []
        });
    }
});

router.delete("/contents", (req, res) => {
    if(req.session.cart)
    {
        const contents = req.session.cart;
        req.session.cart = [];
        res.send({
            cartItems: contents
        });
    }
    else
    {
        res.send({
            cartItems: []
        });
    }
});

router.get('*', (req, res) => {
    res.send('Sorry, this is an invalid Cart API call.');
});

module.exports = router;
const express = require("express");
const app = express();
const db = require("./db.js");
const cart = require("./cart.js");
const lookup = require("./lookup.js");
const process = require("./process.js");
const cors = require("cors");

app.use(cors({
    credentials: true,
}));

app.use("/db", db);

app.use("/cart", cart);

app.use("/lookup", lookup);

// app.use("/process", process);

app.get('*', (req, res) => {
    res.send('Sorry, this is an invalid URL.');
});

const port = 8000;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
const express = require("express");
const router = express.Router();
const csv = require('fast-csv');
const fs = require("fs");

const taxRateInputFile = "./data/tax_rates2.csv";
const zipCodeInputFile = "./data/zip_codes.csv";


const taxRateOutputFile = "./data/taxRates.json";
const zipCodesOutputFile = "./data/zipCodes.json";

router.get('*', async (req, res) => {
    const taxRateWriteStream = fs.createWriteStream(taxRateOutputFile);

    const parse = csv.parse(
    { 
        ignoreEmpty: true,
        headers: true,
    });

    const taxRateInputStream = fs.createReadStream(taxRateInputFile)
                                    .pipe(parse)
                                    .pipe(taxRateWriteStream);

    console.log("Tax Rates Parsed Successfully");

    const zipCodeWriteStream = fs.createWriteStream(zipCodesOutputFile);

    const zipCodeInputStream = fs.createReadStream(zipCodeInputFile)
                                    .pipe(parse)
                                    .pipe(zipCodeWriteStream);

    console.log("Zip Codes Parsed Successfully");

    res.send('Files processed successfully.');
});

module.exports = router;
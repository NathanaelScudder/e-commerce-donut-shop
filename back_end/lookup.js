const ZIP_CODE = "ZipCode";
const STATE = "state";
const CITY = "city";
const TAX_RATE = "CombinedRate";

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require('path');

router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.use(express.static('public'));

// Adapted from https://gist.github.com/dhuang612/08d799b697065fa794ae74f2b86ef20a
function getDir() {
    if (process.pkg) {
        return path.resolve(process.execPath + "/..");
    } else {
        return path.join(require.main ? require.main.path : process.cwd());
    }
}

const taxRateJSONFile = require('path').join(getDir() + "/data/tax_rates2.json");
const zipCodesJSONFile = require('path').join(getDir() + "/data/zip_codes.json");

let taxRateData;
let zipCodeData;

fs.readFile(taxRateJSONFile, (err, data) => {
    if (err)
    {
        throw err;
    }

    taxRateData = JSON.parse(data);
    console.log("Read Tax Rate File");
});

fs.readFile(zipCodesJSONFile, (err, data) => {
    if (err)
    {
        throw err;
    }

    zipCodeData = JSON.parse(data);
    console.log("Read Zip Code File");
});

router.get('/tax-rate/:forZipCode', async (req, res) => {
    let taxRate = 0;
    let zipCode = parseInt(req.params["forZipCode"]);

    for(let i = 0; i < taxRateData.length; i++)
    {
        if(taxRateData[i][ZIP_CODE] == zipCode)
        {
            taxRate = taxRateData[i][TAX_RATE];
        }
    }

    res.send({
        taxRate: taxRate
    });
});

router.get('/state-city/:forZipCode', async (req, res) => {
    let city = "NONE";
    let state = "NONE";
    let zipCode = parseInt(req.params["forZipCode"]);

    for(let i = 0; i < zipCodeData.length; i++)
    {
        if(zipCodeData[i][ZIP_CODE] == zipCode)
        {
            city = zipCodeData[i][CITY];
            state = zipCodeData[i][STATE];
        }
    }

    res.send({
        city: city,
        state: state,
    });
});



module.exports = router;
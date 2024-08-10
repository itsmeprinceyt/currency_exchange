const CurrencyExchange = require("../api/currencyExchange.js");

async function FetchingDATA(baseCurrency, targetCurrency) {
    const result = await CurrencyExchange(baseCurrency, targetCurrency) // this will return something like this { "INR": "86.3154" }
    try {
        const exchangeRate = Object.values(result)[0];
        return exchangeRate;
    } catch (error) {
        console.log(error);
    }
}

module.exports = FetchingDATA;
const dotenv = require('dotenv').config();

async function fetchCurrencyRates(baseCurrency, targetCurrency) {
    const { default: Freecurrencyapi } = await import('@everapi/freecurrencyapi-js');
    const freecurrencyapi = new Freecurrencyapi(process.env.API);
    try {
        const response = await freecurrencyapi.latest({base_currency: baseCurrency,currencies: targetCurrency});
        return response;
    } catch (error) {
        console.error('Unable to fetch the data due to some issue! Please try again later!', error);
        throw error;
    }
}

module.exports = fetchCurrencyRates;
const dotenv = require('dotenv').config();

async function fetchCurrencyRates(baseCurrency ='USD', targetCurrency ='INR') {
    const { default: Freecurrencyapi } = await import('@everapi/freecurrencyapi-js');
    const freecurrencyapi = new Freecurrencyapi(process.env.API);
    try {
        const response = await freecurrencyapi.latest({base_currency: baseCurrency,currencies: targetCurrency});
        const rate = response.data
        console.log(`Data fetched from the API!`)
        return rate;
        
    } catch (error) {
        console.error('Unable to fetch the data due to some issue! Please try again later!', error);
        throw error;
    }
}
module.exports = fetchCurrencyRates;
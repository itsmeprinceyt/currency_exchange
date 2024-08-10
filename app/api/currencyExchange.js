require('dotenv').config();
async function currencyExchange(baseCurrency, targetCurrency) {
    try {
        const { default: Freecurrencyapi } = await import('@everapi/freecurrencyapi-js');
        const freecurrencyapi = new Freecurrencyapi(process.env.API);
        const response = await freecurrencyapi.latest({
            base_currency: baseCurrency,
            currencies: targetCurrency
        });
        console.log(`Data fetched from the API`);
        return response.data;
    } catch (error) {
        console.error('Error fetching currency data:', error);
    }
}

const FetchRate =  (baseCurrency,targetCurrency) => {
    (async () => {
        try {
            const data = await currencyExchange(baseCurrency,targetCurrency);
            console.log(`Data: ${data}`);
        } catch (error) {
            console.error('Error in fetching currency data:', error);
        }
    })();
}
FetchRate("USD","INR");
module.exports = currencyExchange;
"use client";
import { useState, useEffect } from 'react';
import dotenv from "dotenv"; // so that I can access private environment variables
export default function Home() {
  const [baseCurrency, setbaseCurrency] = useState("USD"); // default USD
  const [targetCurrency, settargetCurrency] = useState("INR"); // default INR
  const [baseAmount, setbaseAmount] = useState("");
  const [rate, setRate] = useState(); // storing current exchange rates for all currencies
  const [exchangeRateResult, setexchangeRateResult] = useState(); // storing the final exchange rate entered by the user

  useEffect(() => { // getting all the exchange rates on the first mount.
    const ExchangeFetch = async () => { 
      let response = await fetch(process.env.NEXT_PUBLIC_APIURL);
      let jsonResponse = await response.json();
      setRate(jsonResponse.data);
    };
    ExchangeFetch();
  }, [])

  const finalExchange = (baseCurrency, targetCurrency, baseAmount) => { // exchanging currency
    const baseAmountInUSD = (baseAmount / rate[baseCurrency]).toFixed(3); // converting to USD since the exchange is based on USD only so we need to  convert the input to USD first and after that we can convert it to desired targetCurrency.
    setexchangeRateResult(((baseAmountInUSD * rate[targetCurrency]).toFixed(3))); // using useState to set the result.
  }

  const ExchangeData = async () => { // fetching current exchange rate of all currencies.
    let response = await fetch(process.env.NEXT_PUBLIC_APIURL);
    let jsonResponse = await response.json(); // converting into JSON format
    setRate(jsonResponse.data);
    finalExchange(baseCurrency, targetCurrency, baseAmount);
  }

  const handleClick = () => { // Submit button
    console.log(`I Am Here`)
    ExchangeData();
  }

  const handleSwitch = () => { // Currency Switch
    setbaseCurrency(targetCurrency);
    settargetCurrency(baseCurrency);
  }

  const currencyCodes = ['EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY', 'AUD', 'BRL', 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD', 'THB', 'ZAR'];
  return (
    <div>
      <select onChange={(e) => setbaseCurrency(e.target.value)}>
        <option value={baseCurrency}>{baseCurrency}</option>
        {currencyCodes.map(currency => (
          <option key={currency} value={currency} >
            {currency}
          </option>
        ))}
      </select>
      <select onChange={(e) => settargetCurrency(e.target.value)}>
        <option value={targetCurrency}>{targetCurrency}</option>
        {currencyCodes.map(currency => (
          <option key={currency} value={currency} >
            {currency}
          </option>
        ))}
      </select>
      <input type="number" onChange={(e) => setbaseAmount(e.target.value)} placeholder="Base" value={baseAmount}></input>
      <div>
        <div>Selected: {baseCurrency} </div>
        <div>Target: {targetCurrency} </div>
        <div>Amount: {baseAmount}</div>
        <input value={exchangeRateResult} disabled></input>
      </div>
      <div>
        <button className="animate-pulse delay-1000 px-3 y-2 bg-red-400 rounded-md shadow-md" onClick={handleSwitch}>|</button>
        <button className="bg-sky-500 py-2 px-3 rounded-md shadow-md shadow-sky-500/30 text-white hover:opacity-75" onClick={handleClick}>Submit</button>
      </div>
    </div>
  );
}

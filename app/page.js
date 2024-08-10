"use client";
import { useState } from 'react';
import CurrencyExchange from "./api/currencyExchange.js";

export default function Home() {
  const [baseCurrency, setbaseCurrency] = useState("USD");
  const [targetCurrency, settargetCurrency] = useState("INR");
  const [baseAmount, setbaseAmount] = useState("");
  const [targetAmount, settargetAmount] = useState("");
  const [result, setResult] = useState(0.00);

  const rate =CurrencyExchange("USD","INR")
  const response = rate.json();
  console.log(response.data)
  const ExchangeData = (baseCurrency, targetCurrency, baseAmount, targetAmount) => {

  }
  ExchangeData(baseCurrency, targetCurrency, baseAmount, targetAmount);
  const BaseCurrencyHandle = (event) => { //to handle changing the base currency
    setbaseCurrency(event.target.value)
  }

  const targetCurrencyHandle = (event) => { //to handle changing the target currency
    settargetCurrency(event.target.value);
  }

  const baseAmountHandle = (event) => { //to handle changing the 1st amount
    setbaseAmount(event.target.value);
  }

  const targetAmountHandle = (event) => { //to handle changing the 2nd amount
    settargetAmount(event.target.value);
  }

  const currencyCodes = ['EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY', 'AUD', 'BRL', 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD', 'THB', 'ZAR'];
  return (
    <div>
      <select onChange={BaseCurrencyHandle}>
        <option value="USD">USD</option>
        {currencyCodes.map(currency => (
          <option key={currency} value={currency} >
            {currency}
          </option>
        ))}
      </select>
      <input type="number" onChange={baseAmountHandle} placeholder="Base" value={baseAmount}></input>
      <select onChange={targetCurrencyHandle}>
        <option value="INR">INR</option>
        {currencyCodes.map(currency => (
          <option key={currency} value={currency} >
            {currency}
          </option>
        ))}
      </select>
      <input type="number" onChange={targetAmountHandle} placeholder="Target" value={targetAmount}></input>
      <div>Selected: {baseCurrency} Amount: {baseAmount}</div>
      <div>Target: {targetCurrency} Target Amount: {targetAmount} </div>
      <div>Result: {result ? JSON.stringify(result) : 'No data available'}</div>
    </div>
  );
}

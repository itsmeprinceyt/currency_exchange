"use client";
import { useState,useEffect } from 'react';
import FetchingData from "./(components)/fetchingData.js";

export default function Home() {
  const [baseCurrency, setbaseCurrency] = useState("USD");
  const [targetCurrency, settargetCurrency] = useState("INR");
  const [baseAmount, setbaseAmount] = useState("");
  const [exchangeRateResult,setexchangeRateResult] = useState();
  
  useEffect(()=>{
    console.log("Result generated!")
  },[exchangeRateResult])

  const ExchangeData = (baseCurrency, targetCurrency, baseAmount) => {
    FetchingData(baseCurrency,targetCurrency).then(result => {
      setexchangeRateResult((baseAmount*result).toFixed(2));
    });
  }
  const BaseCurrencyHandle = (event) => { //to handle changing the base currency
    setbaseCurrency(event.target.value)
  }

  const targetCurrencyHandle = (event) => { //to handle changing the target currency
    settargetCurrency(event.target.value);
  }

  const baseAmountHandle = (event) => { //to handle changing the 1st amount
    setbaseAmount(event.target.value);
  }

  
  const handleClick = () => {
    ExchangeData(baseCurrency, targetCurrency, baseAmount);
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
      <select onChange={targetCurrencyHandle}>
        <option value="INR">INR</option>
        {currencyCodes.map(currency => (
          <option key={currency} value={currency} >
            {currency}
          </option>
        ))}
      </select>
      <input type="number" onChange={baseAmountHandle} placeholder="Base" value={baseAmount}></input>
      <div>
      <div>Selected: {baseCurrency} </div>
      <div>Target: {targetCurrency} </div>
      <div>Amount: {baseAmount}</div>
      <div>Result: {exchangeRateResult}</div>
      </div>
      <div>
        <button className="bg-sky-500 py-2 px-3 rounded-md shadow-md shadow-sky-500/30 text-white hover:opacity-75" onClick={handleClick}>Submit</button>
        </div>
    </div>
  );
}

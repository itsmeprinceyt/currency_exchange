"use client";
import { useState,useEffect } from 'react';
import FetchingDATA from "./api/currencyExchange.js";

export default function Home() {
  const [baseCurrency, setbaseCurrency] = useState("USD");
  const [targetCurrency, settargetCurrency] = useState("INR");
  const [baseAmount, setbaseAmount] = useState("");
  const [rate,setRate] = useState();
  const [exchangeRateResult,setexchangeRateResult] = useState();

  const ExchangeData = async (baseCurrency, targetCurrency, baseAmount) => {
    const FetchRate =  (baseCurrency,targetCurrency) => {
      (async () => {
          try {
              const data = await FetchingDATA(baseCurrency,targetCurrency);
              console.log(`Data: ${data}`);
              setRate(data);
          } catch (error) {
              console.error('Error in fetching currency data:', error);
          }
      })();
  }
  FetchRate(baseCurrency, targetCurrency);
  console.log(`hit`);
  };
  
  const handleClick = () => {
    console.log(`hit`)
    ExchangeData(baseCurrency, targetCurrency, baseAmount);
  }
  const currencyCodes = ['EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY', 'AUD', 'BRL', 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD', 'THB', 'ZAR'];
  return (
    <div>
      <select onChange={(e)=> setbaseCurrency(e.target.value)}>
        <option value="USD">USD</option>
        {currencyCodes.map(currency => (
          <option key={currency} value={currency} >
            {currency}
          </option>
        ))}
      </select>
      <select onChange={(e)=> settargetCurrency(e.target.value)}>
        <option value="INR">INR</option>
        {currencyCodes.map(currency => (
          <option key={currency} value={currency} >
            {currency}
          </option>
        ))}
      </select>
      <input type="number" onChange={(e)=> setbaseAmount(e.target.value)} placeholder="Base" value={baseAmount}></input>
      <div>
      <div>Selected: {baseCurrency} </div>
      <div>Target: {targetCurrency} </div>
      <div>Amount: {baseAmount}</div>
      <div>Result: {exchangeRateResult}</div>
      </div>
      <div>
        <button className="bg-sky-500 py-2 px-3 rounded-md shadow-md shadow-sky-500/30 text-white hover:opacity-75" onClick={()=>{handleClick()}}>Submit</button>
        </div>
    </div>
  );
}

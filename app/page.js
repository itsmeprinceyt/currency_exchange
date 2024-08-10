"use client";
import { useState, useEffect } from 'react';
import dotenv from "dotenv";
export default function Home() {
  const [baseCurrency, setbaseCurrency] = useState("USD");
  const [targetCurrency, settargetCurrency] = useState("INR");
  const [baseAmount, setbaseAmount] = useState("");
  const [rate, setRate] = useState();
  const [exchangeRateResult, setexchangeRateResult] = useState();

  useEffect(() => {
    const ExchangeFetch = async () => {
      let response = await fetch(process.env.NEXT_PUBLIC_APIURL);
      let jsonResponse = await response.json();
      setRate(jsonResponse.data);
    };
    ExchangeFetch();
  }, [])

  const finalExchange = (baseCurrency, targetCurrency, baseAmount) => {
    const baseAmountInUSD = (baseAmount / rate[baseCurrency]).toFixed(3);
    setexchangeRateResult(((baseAmountInUSD * rate[targetCurrency]).toFixed(3)));
  }

  const ExchangeData = async () => {
    let response = await fetch(process.env.NEXT_PUBLIC_APIURL);
    let jsonResponse = await response.json();
    setRate(jsonResponse.data);
    finalExchange(baseCurrency, targetCurrency, baseAmount);
  }

  const handleClick = () => {
    console.log(`hit`)
    ExchangeData();
  }
  const currencyCodes = ['EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY', 'AUD', 'BRL', 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD', 'THB', 'ZAR'];
  return (
    <div>
      <select onChange={(e) => setbaseCurrency(e.target.value)}>
        <option value="USD">USD</option>
        {currencyCodes.map(currency => (
          <option key={currency} value={currency} >
            {currency}
          </option>
        ))}
      </select>
      <select onChange={(e) => settargetCurrency(e.target.value)}>
        <option value="INR">INR</option>
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
        <button className="bg-sky-500 py-2 px-3 rounded-md shadow-md shadow-sky-500/30 text-white hover:opacity-75" onClick={() => { handleClick() }}>Submit</button>
      </div>
    </div>
  );
}

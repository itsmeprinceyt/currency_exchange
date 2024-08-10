"use client";
import { useState, useEffect } from 'react';
import dotenv from "dotenv"; // so that I can access private environment variables

export default function Main() {
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
    const baseAmountInUSD = (baseAmount / rate[baseCurrency]).toFixed(2); // converting to USD since the exchange is based on USD only so we need to  convert the input to USD first and after that we can convert it to desired targetCurrency.
    setexchangeRateResult(((baseAmountInUSD * rate[targetCurrency]).toFixed(2))); // using useState to set the result.
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
    <div className="bg-white w-[400px] h-[400px] rounded-xl flex flex-col justify-center items-center gap-5 shadow-2xl shadow-white/30">

      <p className="text-[35px] font-[800] text-gradient-black ">Currency Calculator</p>

      <div>

        <div className="p-3 flex justify-evenly items-center gap-5">
          <select
            className="px-3 py-3 background-gradient select-custom rounded-lg outline-none shadow-custom"
            onChange={(e) => setbaseCurrency(e.target.value)}>
            <option value={baseCurrency}>{baseCurrency}</option>
            {currencyCodes.map(currency => (
              <option key={currency} value={currency} >
                {currency}
              </option>
            ))}
          </select>
          <select 
            className="px-3 py-3 background-gradient select-custom rounded-lg outline-none shadow-custom"
          onChange={(e) => settargetCurrency(e.target.value)}>
            <option value={targetCurrency}>{targetCurrency}</option>
            {currencyCodes.map(currency => (
              <option key={currency} value={currency} >
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="p-3 flex justify-evenly items-center gap-5 mb-2">
          <input className="background-gradient text-white w-[190px] p-2 px-3 rounded-lg shadow-custom outline-none"
          type="number" onChange={(e) => setbaseAmount(e.target.value)} placeholder="Enter Here" value={baseAmount}></input>
        </div>

        <div className="flex justify-center items-center text-center">
          <div className="background-gradient text-white w-[190px] p-2 px-3 rounded-lg shadow-custom ">
          {exchangeRateResult}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex  justify-center gap-5">
              <button className="background-gradient text-white p-2 w-[83px] px-3 rounded-lg shadow-custom outline-none" onClick={handleClick}>Submit</button>
              <button className="px-3 py-3 background-gradient w-[83px] flex justify-center items-center text-white rounded-lg outline-none shadow-custom" onClick={handleSwitch}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

# Currency Exchange by ItsMe Prince

A currency exchange application built with Next.js. This project allows users to convert currencies using real-time exchange rates fetched from an API.

## Features

- **Real-time Currency Conversion**: Convert currencies with live exchange rates.
- **Dynamic Fetching**: Get the latest exchange rates using the FreeCurrencyAPI.
- **Responsive Design**: Built with Tailwind CSS for a modern, responsive interface.

## Tech Stack

- **Next.js**: React framework for building server-rendered applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **FreeCurrencyAPI**: API used to fetch real-time currency exchange rates.
- **@everapi/freecurrencyapi-js**: JavaScript library for interacting with the FreeCurrencyAPI.

## Installation

1. Install Dependencies
```bash
npm install
```

2. Set Up Environment Variables
```bash
NEXT_PUBLIC_FREECURRENCYAPI_KEY=your_api_key_here
```

3. Run the Development Server
```bash
npm run dev
```

Your application will be running on http://localhost:3000.

## Usage
1. Open the Application: Navigate to http://localhost:3000 in your browser.

2. Select Currencies: Choose the currencies you want to convert from and to.

3. Enter Amount: Input the amount you wish to convert.

4. View Results: The converted amount will be displayed based on real-time exchange rates.

## API Integration
The application uses the FreeCurrencyAPI to fetch exchange rates. Make sure to replace `'YOUR-API-URL'` with your actual API key.

Here's a brief example of how the API is used in the project:

```javascript
const ExchangeData = async () => { // fetching current exchange rate of all currencies.
    let response = await fetch('YOUR-API-URL');
    let jsonResponse = await response.json(); // converting into JSON format
    setRate(jsonResponse.data);
    finalExchange(baseCurrency, targetCurrency, baseAmount);
  }
```

## Customization
Feel free to customize the styles and functionality of the application according to your needs. The Tailwind CSS setup allows for easy adjustments to the design.

## Contributing
If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -am 'Add new feature').
5. Push to the branch (git push origin feature-branch).
6. Create a new Pull Request.

## Explanation Video

https://www.youtube.com/watch?v=hXyu8DO7SQ8

## Live Link
https://currency-exchange-lemon-ten.vercel.app/

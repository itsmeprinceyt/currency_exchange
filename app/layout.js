import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Currency Exchange - ItsMe Prince",
  description: "CurrencyExchange is a dynamic and user-friendly web application built with Next.js, designed to provide real-time currency conversion and exchange rate information.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
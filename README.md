# javascript-cryptoCurrencyList-challenge
An small tech challenge to create a crypto currency list with javascript, jquery and ajax

## Indication to run it:

* npm install
* npm run dev
* Go to http://localhost:5173/ (or the one with the port that the console show)


## NOTES:

* The API documentation is here: https://docs.wazirx.com/#24hr-tickers-price-change-statistics
* The API doesnt have a "limit/skip" or some way to manage the pagination from the server instead of the client (in that case, is much easy applying a lazy load)

## Challenge

In this challenge, we want to show a list with 10 crypto currency for page, in each row, should be displayed: symbol, base asset, open price, low price, high price, last price and volume. 

* Filters (Must be applied in all the pages):

   * search bar: depending on base asset.
   * select: low to high, high to low, no filter (depending on open price).
   * select: alphabetic order (A-Z, Z-A, no filter) (depending on base asset).

* Requirements:

   * The request must be done with Ajax.
   * Each page must be clickable and load the correct cryptos.


* Initial state (Must show all the results and pages):

   * Search bar: Empty
   * Select: No filter

API to use: https://api.wazirx.com/sapi/v1/tickers/24hr


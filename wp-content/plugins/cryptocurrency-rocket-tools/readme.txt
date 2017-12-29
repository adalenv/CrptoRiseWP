=== Cryptocurrency Rocket Tools ===
Contributors: liberteam, webstulle
Tags: bitcoin, cryptocurrency, ethereum, ripple, exchange, cryptocurrencies, prices, rates, trading, token, btc, eth, etc, dash, nmc, nvc, ppc, dsh, xcp, candlestick, usd, eur
Requires at least: 3.0
Tested up to: 4.8.2
Stable tag: trunk
License: GPL2 or later

CR Tools is an easy-to-use plugin providing features: table of current cryptocurrency prices, graph of historical cryptocurrency prices and cryptocurrency converter.

== Description ==

= Cryptocurrency Features =
* The Table - the table of current cryptocurrency prices
* The Graph - the graph of historical cryptocurrency prices
* The Converter - the cryptocurrency converter

This plugin gets data from [CryptoCompare](https://www.cryptocompare.com/api/) (no API key required)
This plugin uses: Bootstrap v3.3.7, Datatebles v1.10.15, amCharts v3.21.6, Chart.js v2.7.0

Powered by [Liberteam](https://profiles.wordpress.org/liberteam)
Designed by [Webstulle](http://webstulle.com/)

= Available cryptocurrencies =
All cryptocurrencies from [CryptoCompare](https://www.cryptocompare.com). [View full JSON list](https://www.cryptocompare.com/api/data/coinlist/).

= Available currencies =
USD, AUD, BRL, CAD, CHF, CLP, CNY, CZK, DKK, EUR, GBP, HKD, HUF, IDR, ILS, INR, JPY, KRW, MXN, MYR, NOK, NZD, PHP, PKR, PLN, RUB, SEK, SGD, THB, TRY, TWD, ZAR


= Instructions for the Table =

To show the Table, add a shortcode to the text of pages or posts.

Example shortcodes:

`[crtools-table coin="BTC,ETH,XRP,XMR,LTC" fiat="USD,EUR" cols="price,cap,supply,volume,change,graph" pagination="10,20,30"]`
`[crtools-table coin="BTC" cols="price,change,graph"]`
`[crtools-table]`

Parameters:
coin - list of cryptocurrencies, separated by commas. (Default: all cryptocurrencies)
fiat - list of currencies, separated by commas. (Default: all currencies)
cols - list of table columns, separated by commas. (Default: "price,cap,supply,volume,change,graph"). Number and Name are required.
pagination - show entries, separated by commas. (Default: "10,25")

Table columns:
price - Prices
cap - Market Capitalizations
supply - Circulating Supply
volume - Volume
change - % Change
graph - Price Graph.


= Instructions for the Graph =

To show the Graph, add a shortcode to the text of pages or posts.

Example shortcodes:

`[crtools-graph coin="BTC" fiat="USD,EUR" period="1M,1Y" graphColor="#5762b7" cursorColor="#5db75c"]`
`[crtools-graph coin="BTC" fiat="USD,EUR" period="1M,1Y"]`
`[crtools-graph coin="BTC" fiat="USD,EUR"]`
`[crtools-graph]`

Parameters:
coin - cryptocurrency. (Default: BTC)
fiat - list of currencies, separated by commas. (Default: all currencies)
period - list of historical data display periods. (Default: "12H,1D,1W,1M,6M,ALL"). Available: 12H,1D,1W,1M,6M,ALL
graphColor - graph color
cursorColor - color of graph cursor

= Instructions for the Converter =

To show the Converter, add a shortcode to the text of pages or posts.

Example shortcodes:

`[crtools-converter from="BTC,ETH" to="USD" other="EUR,RUB,GBP"]`
`[crtools-converter from="BTC"]`

Parameters:
from - list of cryptocurrencies or currencies, separated by commas. (Required)
fiat - list of cryptocurrencies or currencies, separated by commas. (Default: all currencies)

== Installation ==

1. Unzip the `cryptocurrency-rocket-tools.zip` folder.
2. Upload the `cryptocurrency-rocket-tools` folder to your `/wp-content/plugins` directory.
3. In your WordPress dashboard, head over to the *Plugins* section.
4. Activate *Cryptocurrency Rocket Tools*.

== Screenshots ==

1. Example of the Table (all cryptocurrencies are shown).
2. Example of the Graph (historical BTC prices).
3. Example of the Converter.

== Changelog ==

= 1.2 =
* New feature and BugFix! Now you can edit graph color in graph module using two option as graphColor and cursorColor".

= 1.1 =
* New feature! Now you can add new fields to your converter using parameter "other" into "crtools-converter".

= 1.0.1 =
* Table module bugFix (pagination, size, etc.)

= 1.0 =
* Plugin is released. Everything is new!

== Upgrade Notice ==

= 1.2 =
* New feature and BugFix! Now you can edit graph color in graph module using two option as graphColor and cursorColor".

= 1.1 =
* New feature! Now you can add new fields to your converter using parameter "other" into "crtools-converter".

= 1.0.1 =
* Updated the plugin and library to handle issues related to invalid Table

= 1.0 =
* Hello, this is the first version.
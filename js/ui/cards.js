import { getPrices } from "../modules/prices.js";
import { formatPrice, formatDate } from "../utils/formatters.js";

const orPriceInfo = document.querySelector("#or-price-info");
const moneyPriceInfo = document.querySelector("#money-price-info");
const date = document.querySelector("#date");

export async function renderCards(currency) {
    const currencyPrices = await getPrices(currency);

    const priceFormatGold = formatPrice(
        currencyPrices[0].price,
        currency
    );

    const priceFormatSilver = formatPrice(
        currencyPrices[1].price,
        currency
    );

    const formattedDate = formatDate(currencyPrices[0].updatedAt);

    orPriceInfo.textContent = priceFormatGold;
    moneyPriceInfo.textContent = priceFormatSilver;
    date.textContent = formattedDate;
}
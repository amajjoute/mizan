import { getPrices } from "../modules/prices.js";


export async function formatPrice(currency) {
    const data = await getPrices(currency);

    const dataPriceGold = data[0].price;
    const dataPriceSilver = data[1].price;

    const numberFormatGoldPrice = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: currency
        }
    );

    const numberFormatSilverPrice = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: currency
        }
    );

    const formattedPriceGold = numberFormatGoldPrice.format(dataPriceGold);
    const formattedPriceSilver = numberFormatSilverPrice.format(dataPriceSilver);

    return [ formattedPriceGold, formattedPriceSilver];
}
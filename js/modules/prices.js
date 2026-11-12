import { getData } from "../services/api.js";

const TROY_OUNCE_IN_GRAM = 31.1035;

export async function getPrices(currency) {
    const data = await getData(currency);

    const gold = {
        name: "Or",
        price: Number(data.xau.price.toFixed(2)),
        currency: data.xau.currency,
        unit: "gram",
        updatedAt: data.updated_at
    };

    const silver = {
        name: "Argent",
        price: Number(((data.silver_usd_oz * data.fx_rate) / TROY_OUNCE_IN_GRAM).toFixed(2)),
        currency: currency,
        unit: "gram",
        updatedAt: data.updated_at
    };

    return [gold, silver];
}
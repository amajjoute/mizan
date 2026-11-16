import { getData } from "../services/api.js";
import { variationAndPercentage } from "../utils/calculations.js";

const TROY_OUNCE_IN_GRAM = 31.1035;

export async function getPrices(currency) {
    const data = await getData(currency);

    const goldVariation = await variationAndPercentage("xau");
    const silverVariation = await variationAndPercentage("silver");

    const gold = {
        name: "Or",
        price: Number(data.xau.price.toFixed(2)),
        currency: data.xau.currency,
        unit: "gram",
        updatedAt: data.updated_at,
        variation: Number(((goldVariation[0] * data.fx_rate) / TROY_OUNCE_IN_GRAM).toFixed(2)),
        percentage: goldVariation[1],
        direction: goldVariation[0] > 0 ? "up" : goldVariation[0] < 0 ? "down" : "neutral"
    };

    const silver = {
        name: "Argent",
        price: Number(((data.silver_usd_oz * data.fx_rate) / TROY_OUNCE_IN_GRAM).toFixed(2)),
        currency: currency,
        unit: "gram",
        updatedAt: data.updated_at,
        variation: Number(((silverVariation[0] * data.fx_rate) / TROY_OUNCE_IN_GRAM).toFixed(2)),
        percentage: silverVariation[1],
        direction: silverVariation[0] > 0 ? "up" : silverVariation[0] < 0 ? "down" : "neutral"
    };

    return [gold, silver];
}
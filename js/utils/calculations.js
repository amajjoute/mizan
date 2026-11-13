import { getHistoricalData } from '../services/api.js'

export async function variationAndPercentage(symbol) {

    const getDataHistorique = await getHistoricalData(symbol);

    if (!getDataHistorique.points || getDataHistorique.points.length < 2) {
        throw new Error("Not enough historical data");
    }

    const points = getDataHistorique.points.map( point => ({
        t: point.t,
        c: point.c
    }));

    const previousClose = points[points.length - 2].c;
    const currentClose = points[points.length - 1].c;

    if (previousClose === 0) {
        throw new Error("Previous closing price cannot be zero");
    }

    const variation = currentClose - previousClose;
    const percentage = (variation / previousClose) * 100;

    return [Number(variation.toFixed(2)), Number(percentage.toFixed(2))];
}
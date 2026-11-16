async function getData(currency) {
    const allowedCurrency = ["MAD", "USD", "EUR"];

    if (!allowedCurrency.includes(currency)) {
        throw new Error("Unsupported currency");
    }

    const url = `https://xaus.com/api/v1/spot?currency=${currency}&unit=gram`;
        
    return await fetchData(url);
}

async function getHistoricalData(symbol) {
    const allowedSymbols = ["xau", "silver"];

    if (!allowedSymbols.includes(symbol)) {
        throw new Error("Unsupported symbol");
    }

    const url = `https://xaus.com/api/v1/chart?symbol=${symbol}&range=5d&interval=1d`;

    return await fetchData(url);
}

async function getHistory(symbol, period) {
    const allowedSymbols = ["xau", "silver"];
    const allowedPeriods = ["7d", "30d"];

    if (!allowedSymbols.includes(symbol)) {
        throw new Error(`Unsupported symbol!`);
    }

    if (!allowedPeriods.includes(period)) {
        throw new Error(`Unsupported period!`);
    }

    const url = `https://xaus.com/api/v1/chart?symbol=${symbol}&range=${period}&interval=1d`;

    const result = await fetchData(url);

    const days = Number(parseInt(period));

    const latestTimeStamp = result.points[result.points.length - 1].t;
    const startTimeStamp = latestTimeStamp - days * 86400;

    const filteredPoints = result.points.filter(
        point => point.t >= startTimeStamp
    )

    return {
        ...result,
        points: filteredPoints
    }
}

async function fetchData(url) {
    if (!navigator.onLine) {
        throw new Error("OFFLINE");
    }

    let response;

    try {
        response = await fetch(url);
    } catch (error) {
        if (!navigator.onLine) {
            throw new Error("OFFLINE");
        }

        throw new Error("NETWORK_ERROR");
    }

    if (!response.ok) {
        if (response.status === 429) {
            throw new Error("Too_Many_Requests");
        }

        if (response.status >= 400 && response.status < 500) {
            throw new Error("HTTP_Client_ERROR");
        }

        if (response.status >= 500) {
            throw new Error("HTTP_Server_ERROR");
        }
    }

    try {
        return await response.json();
    } catch (error) {
        throw new Error("Parsing_Fails_Invalid_JSON");
    }
}

export { getData, getHistoricalData, getHistory, fetchData };
function formatPrice(price, currency) {

    const numberFormatPrice = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: currency
        }
    );

    const formattedPrice = numberFormatPrice.format(price);

    return formattedPrice;

}

function formatDate(date) {

    const  formattedDate = new Date(date).toLocaleString("fr-FR");
    
    return formattedDate;

}

export { formatPrice, formatDate };
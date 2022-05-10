function currencyFormat(price) {
    return new Intl.NumberFormat("es-CO", {
        style: 'currency', currency: 'COP', maximumFractionDigits: 0
    }).format(price);
}

export {
    currencyFormat,
}
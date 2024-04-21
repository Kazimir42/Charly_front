export function formatPercentage(value, decimalPlaces = 2) {
    // Transform value for using NumberFormat
    value = value / 100

    let options = {
        style: 'percent',
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    }

    return new Intl.NumberFormat('default', options).format(value)
}

export function formatPrice(value, currency = 'USD', withSymbol = true) {
    // Define options
    let options = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }

    // Currency
    options.currency = currency

    // Symbol
    if (withSymbol) {
        options.style = 'currency'
    }

    // Local
    let locale = 'en-US'
    if (currency === 'EUR') {
        locale = 'fr-FR'
    }

    return new Intl.NumberFormat(locale, options).format(value)
}

export function formatDate(date, withTime = true, lang = 'en-US') {
    let parsedDate = new Date(date)

    if (withTime) {
        parsedDate = parsedDate.toLocaleString(lang)
    }else {
        parsedDate = parsedDate.toLocaleDateString(lang)
    }

    return parsedDate
}

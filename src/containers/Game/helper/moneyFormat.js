export const moneyFormat = (price) => {
    if (isNaN(price)) return '0'
    // const pieces = parseFloat(price).toFixed(2).split('')
    const formatPrice = Math.round(price)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    return formatPrice
}

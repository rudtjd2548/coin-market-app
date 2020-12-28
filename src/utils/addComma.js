/* Price Comma Function */

export function addComma(num) {
  let regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ',');
}
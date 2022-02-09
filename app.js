const TAX_RATE = 12.5 / 100;

function Cart() {
  this.products = [];

  this.findSKU = (sku) => {
    return this.products.find((product) => product.sku === sku);
  };

  this.addToCart = function (sku, priceCents, quantity = 1) {
    existingProductInCart = this.findSKU(sku);
    if (existingProductInCart) {
      existingProductInCart.quantity += quantity;
    } else this.products.push({ sku, quantity, priceCents });
  };

  this.productTotal = function () {
    return this.products.reduce(function (runningTotal, product) {
      return runningTotal + product.priceCents * product.quantity;
    }, 0);
  };

  this.taxTotal = () => Math.round(this.productTotal() * TAX_RATE);

  this.cartTotal = () => this.productTotal() + this.taxTotal();
}

module.exports = Cart;

const Cart = require("./app");

test("Step 1: Add products to the shopping cart", () => {
  let myCart = new Cart();
  myCart.addToCart("Shower Gel", 4999, 5);

  expect(myCart.products).toStrictEqual([
    { sku: "Shower Gel", quantity: 5, priceCents: 4999 },
  ]);

  expect(myCart.productTotal()).toEqual(24995);
});

test("Step 2: Add additional products of the same type to the shopping cart", () => {
  let myCart = new Cart();

  myCart.addToCart("Shower Gel", 4999, 5);
  myCart.addToCart("Shower Gel", 4999, 3);

  expect(myCart.findSKU("Toothpaste")).toBeFalsy();
  expect(myCart.findSKU("Shower Gel")).toBeTruthy();

  expect(myCart.products).toStrictEqual([
    { sku: "Shower Gel", quantity: 8, priceCents: 4999 },
  ]);

  expect(myCart.productTotal()).toEqual(39992);
});

test("Step 3: ​Calculate the tax rate of the shopping cart with multiple items", () => {
  let myCart = new Cart();

  myCart.addToCart("Shower Gel", 4999, 2);
  myCart.addToCart("Deodorant", 9999, 2);

  expect(myCart.findSKU("Toothpaste")).toBeFalsy();
  expect(myCart.findSKU("Shower Gel")).toBeTruthy();
  expect(myCart.findSKU("Deodorant")).toBeTruthy();

  expect(myCart.products).toEqual(
    expect.arrayContaining([
      { sku: "Shower Gel", quantity: 2, priceCents: 4999 },
      { sku: "Deodorant", quantity: 2, priceCents: 9999 },
    ])
  );

  expect(myCart.productTotal()).toEqual(29996);
  expect(myCart.taxTotal()).toEqual(3750);
  expect(myCart.cartTotal()).toEqual(33746);
});

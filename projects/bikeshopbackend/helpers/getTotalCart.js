const getTotalCart = (dataCartBike, shippingMode) => {
  let totalCart = 0;
  let shippingRates = shippingMode.value;

  for (let item of dataCartBike) {
    totalCart += item.quantity * item.price;
  }

  totalCart += shippingRates;

  return { totalCart, shippingRates };
};

module.exports = getTotalCart;

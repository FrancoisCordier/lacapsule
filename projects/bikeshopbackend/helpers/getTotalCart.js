const getTotalCart = (dataCartBike, shippingMode, couponCode) => {
  if (dataCartBike.length === 0)
    return { totalCart: 0, totalCartReduc: 0, shippingRates: 0 };

  let totalCart = 0;
  let totalDiscount = 0;
  let shippingRates = shippingMode.value;
  let hasDiscount = false;

  for (let item of dataCartBike) {
    if (item.quantity >= 2) {
      hasDiscount = true;
      totalCart += item.price * item.quantity;
      totalDiscount += item.price * 0.2;
    } else {
      totalCart += item.price * item.quantity;
    }
  }

  totalCart -= totalDiscount;

  if (couponCode) {
    if (couponCode.type === "percent") {
      totalCart = totalCart - (couponCode.value * totalCart) / 100;
      console.log(totalCart);
    } else if (couponCode.type === "fixed") {
      totalCart = totalCart - couponCode.value;
    }
  }

  return { totalCart, totalDiscount, hasDiscount, shippingRates };
};

module.exports = getTotalCart;

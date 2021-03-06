const getShippingMode = (dataCartBike) => {
  let totalCart = 0;
  let totalQuantity = 0;
  let shippingAvailable = [];

  for (let i = 0; i < dataCartBike.length; i++) {
    totalCart += dataCartBike[i].price * dataCartBike[i].quantity;
    totalQuantity += dataCartBike[i].quantity;
    shippingAvailable =
      i === 0
        ? dataCartBike[0].shipping
        : shippingAvailable.filter((el) =>
            dataCartBike[i].shipping.includes(el)
          );
  }

  let shippingRatesNormal = totalQuantity * 30;

  if (totalCart > 4000) shippingRatesNormal = 0;
  else if (totalCart > 2000) shippingRatesNormal /= 2;

  let shippingRatesExpress = shippingRatesNormal + 100;
  let shippingRatesRelais = totalQuantity * 20 + 50;

  let shippingModes = [
    { id: 1, name: "Normal", value: shippingRatesNormal },
    { id: 2, name: "Express", value: shippingRatesExpress },
    { id: 3, name: "Point relais", value: shippingRatesRelais },
  ];

  // for (let mode of shippingModes) {
  //   if (mode.name === "Normal") {
  //     if (totalCart > 4000) mode.value = 0;
  //     else if (totalCart > 2000) mode.value = (totalQuantity * 30) / 2;
  //     else mode.value = totalQuantity * 30;
  //   } else if (mode.name === "Express") {
  //     if (totalCart > 4000) mode.value = 100;
  //     else if (totalCart > 2000) mode.value = (totalQuantity * 30) / 2 + 100;
  //     else mode.value = totalQuantity * 30 + 100;
  //   } else if (mode.name === "Point relais") {
  //     mode.value = totalQuantity * 20 + 50;
  //   }
  // }

  shippingModes = shippingModes.filter((el) =>
    shippingAvailable.includes(el.id)
  );

  return shippingModes.sort((a, b) => a.value - b.value);
};

module.exports = getShippingMode;

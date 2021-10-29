const getShippingMode = (dataCartBike) => {
  const shippingModes = [
    { id: 1, name: "Normal", value: 0 },
    { id: 2, name: "Express", value: 0 },
    { id: 3, name: "Point relais", value: 0 },
  ];
  let totalCart = 0;
  let totalQuantity = 0;

  for (let item of dataCartBike) {
    totalCart += item.price * item.quantity;
    totalQuantity += item.quantity;
  }

  for (let mode of shippingModes) {
    if (mode.name === "Normal") {
      if (totalCart > 4000) mode.value = 0;
      else if (totalCart > 2000) mode.value = (totalQuantity * 30) / 2;
      else mode.value = totalQuantity * 30;
    } else if (mode.name === "Express") {
      if (totalCart > 4000) mode.value = 100;
      else if (totalCart > 2000) mode.value = (totalQuantity * 30) / 2 + 100;
      else mode.value = totalQuantity * 30 + 100;
    } else if (mode.name === "Point relais") {
      mode.value = totalQuantity * 20 + 50;
    }
  }

  return shippingModes.sort((a, b) => a.value - b.value);
};

module.exports = getShippingMode;

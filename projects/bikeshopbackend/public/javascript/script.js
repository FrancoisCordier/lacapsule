const shippingModes = document.getElementsByClassName("shippingMode");

for (let shippingMode of shippingModes) {
  shippingMode.addEventListener("change", function () {
    document.getElementById("update-shipping").submit();
  });
}

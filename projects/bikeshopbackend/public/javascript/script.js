const shippingModes = document.getElementsByClassName("shippingMode");
const deleteCoupon = document.getElementById("deleteCoupon");

for (let shippingMode of shippingModes) {
  shippingMode.addEventListener("change", function () {
    document.getElementById("update-shipping").submit();
  });
}

deleteCoupon.addEventListener("click", function () {
  document.getElementById("deleteCouponForm").submit();
});

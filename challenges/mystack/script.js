$("#button_header").click(function () {
  $(this).fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn();
});

$("#color").click(function () {
  if ($(this).text() === "Color Stack / OFF") {
    $(".stack_container")
      .fadeOut(0)
      .removeClass("stack_container")
      .addClass("stack_container2")
      .fadeIn(1000);
    $(this).text("Color Stack / ON");
  } else {
    $(".stack_container2")
      .fadeOut(0)
      .removeClass("stack_container2")
      .addClass("stack_container")
      .fadeIn(1000);
    $(this).text("Color Stack / OFF");
  }
});

$(".bigger").click(function () {
  $(this)
    .parent()
    .animate({ width: "+=20vw", fontSize: "+=10px" })
    .delay(300)
    .animate({ width: "-=20vw", fontSize: "-=10px" });
});

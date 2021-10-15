$("body").keydown(function (e) {
  console.log(e.key);
  switch (e.key) {
    case "ArrowUp":
      $("#player").attr("src", "images/mario-back-1.png");
      break;
    case "ArrowDown":
      $("#player").attr("src", "images/mario-front-1.png");
      break;
    case "ArrowRight":
      $("#player").attr("src", "images/mario-right-1.png");
      break;
    case "ArrowLeft":
      $("#player").attr("src", "images/mario-left-1.png");
      break;
    default:
      $("#player").attr("src", "images/mario-front-1.png");
      break;
  }
});

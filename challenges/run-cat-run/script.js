let count = 1;

$("#action").click(function () {
  if (count < 13) {
    $("#cat-run").attr("src", `images/cat-${count + 1}.jpg`);
    count++;
  } else {
    $("#cat-run").attr("src", `images/cat-1.jpg`);
    count = 1;
  }
});

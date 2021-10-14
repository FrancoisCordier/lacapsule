const cookie = document.getElementsByClassName("cookie");

for (let i = 0; i < cookie.length; i++) {
  cookie[i].addEventListener("click", function () {
    if (cookie[i].getAttribute("src") === "ressources/cookie-1.jpg") {
      this.src = "ressources/cookie-2.jpg";
    } else {
      this.style.display = "none";
    }
  });
}

const sectionPlayer1 = document.getElementById("p1");
const sectionPlayer2 = document.getElementById("p2");
const inputPlayer1 = document.getElementById("inputp1");
const inputPlayer2 = document.getElementById("inputp2");
const btnPlayer1 = document.getElementById("btn-val-p1");
const btnPlayer2 = document.getElementById("btn-val-p2");
const gameZone = document.getElementById("gamezone");
const playerPoints = document.getElementById("points");
const victory = document.getElementById("victory");
const defeat = document.getElementById("defeat");

let wordToFind;
let points = 10;
playerPoints.textContent = points;

btnPlayer1.addEventListener("click", function () {
  const underscore = "_ ";
  wordToFind = inputPlayer1.value.toLowerCase();
  sectionPlayer1.classList.add("hidden");
  sectionPlayer2.classList.remove("hidden");
  gameZone.textContent = underscore.repeat(wordToFind.length).trim();
  gameZone.classList.remove("hidden");
  console.log(gameZone.textContent.split(" "));
});

btnPlayer2.addEventListener("click", function () {
  let letter = inputPlayer2.value.toLowerCase();
  inputPlayer2.value = "";

  if (wordToFind.includes(letter)) {
    const letterIndices = [];

    for (let i = 0; i < wordToFind.length; i++) {
      if (wordToFind[i] === letter) letterIndices.push(i);
    }

    console.log(letterIndices);
    let guess = gameZone.textContent.split(" ");

    for (let i = 0; i < letterIndices.length; i++) {
      guess[letterIndices[i]] = letter;
    }
    gameZone.textContent = guess.join(" ");

    if (!gameZone.textContent.includes("_")) {
      gameZone.classList.add("hidden");
      victory.classList.remove("hidden");
    }
  } else {
    if (playerPoints.textContent > 1) {
      playerPoints.textContent = points--;
      playerPoints.textContent = points;
    } else {
      playerPoints.textContent = points--;
      playerPoints.textContent = points;
      gameZone.classList.add("hidden");
      defeat.classList.remove("hidden");
    }
  }
});

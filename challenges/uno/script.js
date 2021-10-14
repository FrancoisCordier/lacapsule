let lastPlay = {
  couleur: "blue",
  chiffre: "6",
};

let cards = [
  {
    couleur: "red",
    chiffre: "6",
  },
  {
    couleur: "green",
    chiffre: "6",
  },
  {
    couleur: "blue",
    chiffre: "9",
  },
  {
    couleur: "green",
    chiffre: "9",
  },
];

const myCards = document.getElementsByClassName("own");
const cardsNumbers = document.getElementsByClassName("cardnumber");
let lastCardPlayed = document.getElementById("lastcardplayed");
let lastCardPlayedNumber = document.getElementById("lastcardnumber");

for (let i = 0; i < myCards.length; i++) {
  myCards[i].style.backgroundColor = cards[i].couleur;
  cardsNumbers[i].textContent = cards[i].chiffre;
}

lastCardPlayed.style.backgroundColor = lastPlay.couleur;
lastCardPlayedNumber.textContent = lastPlay.chiffre;

while (cards.length > 0) {
  let possiblePlay = [];

  // if (cards.length === 1) {
  //   console.log("Uno !");
  // }

  for (card of cards) {
    if (
      card.couleur === lastPlay.couleur ||
      card.chiffre === lastPlay.chiffre
    ) {
      possiblePlay.push(card);
    }
  }

  for (let i = 0; i < possiblePlay.length; i++) {
    if (
      possiblePlay[i].couleur === myCards[i].style.backgroundColor &&
      possiblePlay[i].chiffre === cardsNumbers[i].textContent
    ) {
      myCards[i].style.border = "10px solid orange";
    }
  }

  if (possiblePlay.length === 0) {
    console.log("Je passe mon tour");
  }

  //lastPlay = possiblePlay[0];

  for (let i = 0; i < myCards.length; i++) {
    myCards[i].addEventListener("click", function () {
      if (myCards[i].style.border === "10px solid orange") {
        this.style.display = "none";
        lastCardPlayed.style.backgroundColor = this.style.backgroundColor;
        lastCardPlayedNumber.textContent = this.textContent;
        lastPlay.chiffre = this.textContent;
        lastPlay.couleur = this.style.backgroundColor;
      }
    });
  }

  let i = cards.findIndex(
    (card) =>
      card.couleur === possiblePlay[0].couleur &&
      card.chiffre === possiblePlay[0].chiffre
  );

  cards.splice(i, 1);
  // console.log("Index de la carte jouée : ", i);
  // console.log("Possibilités de jeu : ", possiblePlay);
  console.log("Dernier coup joué : ", lastPlay);
  // console.log("Mes cartes : ", JSON.stringify(cards, null, " "));
}

// if (cards.length === 0) {
//   console.log("Vous avez gagné !");
// }

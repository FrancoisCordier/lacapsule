const searchResult = document.getElementById("result");
const searchButton = document.getElementById("button");
const text = document.getElementById("textarea");
const inputSearch = document.getElementById("input");

searchButton.addEventListener("click", function () {
  let search = inputSearch.value.toLowerCase();
  inputSearch.value = "";

  if (!search.length) {
    searchResult.textContent = `Il y a ${
      text.textContent.split(" ").length
    } mots dans le texte ci-dessus`;
  } else {
    const count = text.textContent
      .replace(/\n/g, " ")
      .split(" ")
      .filter(function (word) {
        word.toLowerCase() === search ? true : false;
      }).length;

    if (count > 0) {
      searchResult.textContent = `Le mot "${search}" est présent ${count} fois dans le texte ci-dessus`;
    } else {
      searchResult.textContent = `Le mot "${search}" n'a pas été trouvé dans le texte ci-dessus`;
    }
  }
});

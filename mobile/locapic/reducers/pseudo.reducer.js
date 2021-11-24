export default function (pseudo = "", action) {
  if (action.type === "savePseudo") {
    const tempPseudo = action.pseudo;
    return tempPseudo;
  } else {
    return pseudo;
  }
}

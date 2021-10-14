const criticality = document.getElementsByClassName("criticality");

for (let i = 0; i < criticality.length; i++) {
  if (criticality[i].textContent < 3) {
    criticality[i].parentNode.style.display = "none";
  }

  switch (criticality[i].textContent) {
    case "1":
      criticality[i].style.backgroundColor = "green";
      break;
    case "2":
      criticality[i].style.backgroundColor = "yellow";
      break;
    case "3":
      criticality[i].style.backgroundColor = "orange";
      break;
    case "4":
      criticality[i].style.backgroundColor = "red";
      break;
    default:
      criticality[i].style.backgroundColor = "grey";
      break;
  }
}

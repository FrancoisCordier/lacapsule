const messages = document.getElementsByClassName("message");
const messagesCountDisplay = document.getElementById("countmessages");
const trashes = document.getElementsByClassName("trash");
const btnAddMessage = document.getElementById("btn-add");
const input = document.getElementById("new-message");
const messagesContainer = document.getElementById("messagescontainer");

messagesCountDisplay.textContent = messages.length;

const deleteMessage = () => {
  for (let i = 0; i < trashes.length; i++) {
    trashes[i].addEventListener("click", function () {
      this.parentNode.remove();
      messagesCountDisplay.textContent = messages.length;
    });
  }
};

deleteMessage();

btnAddMessage.addEventListener("click", function () {
  // Nouvelle row
  let newRow = document.createElement("div");
  newRow.className = "row";

  // Nouvel avatar
  let newAvatar = document.createElement("img");
  newAvatar.src = "assets/avatar-1.jpg";
  newAvatar.className = "avatar";

  // Nouvelle div qui contient nom et message
  let newDiv = document.createElement("div");

  // Nouveau nom
  let newName = document.createElement("h6");
  newName.className = "name";
  newName.textContent = "François Cordier";

  // Nouveau message
  let newMessage = document.createElement("p");
  newMessage.className = "message";
  newMessage.textContent = input.value;
  input.value = "";

  // Nouvelle corbeille
  let newTrash = document.createElement("img");
  newTrash.src = "assets/trash.png";
  newTrash.className = "trash";

  // Création de la div contenant le nom et le message
  newDiv.appendChild(newName);
  newDiv.appendChild(newMessage);

  // Création de la row entière
  newRow.appendChild(newAvatar);
  newRow.appendChild(newDiv);
  newRow.appendChild(newTrash);

  // Ajout de la nouvelle row au container des messages
  messagesContainer.appendChild(newRow);

  // Mise à jour du compteur de messages
  messagesCountDisplay.textContent = messages.length;

  deleteMessage();
});

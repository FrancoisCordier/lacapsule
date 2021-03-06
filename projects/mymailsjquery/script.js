$("#countmessages").text($(".message").length);

$("body").on("click", ".trash", function () {
  $(this).parent().remove();
  $("#countmessages").text($(".message").length);
});

$("#search").on("keyup", function () {
  let searchValue = $(this).val().toLowerCase();
  $("#messagescontainer h6").filter(function () {
    console.log(
      "Nom: ",
      $(this).text(),
      "Index: ",
      $(this).text().toLowerCase().indexOf(searchValue)
    );
    $(this)
      .parentsUntil(".container")
      .toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
  });
});

$("#btn-add").click(function () {
  let rowTemplate = `<div class='row'>
    <img src='assets/avatar-1.jpg' class='avatar' />
    <div>
      <h6 class='name'>François Cordier</h6>
      <p class='message'>${$("#new-message").val()}</p>
    </div>
    <img src='assets/trash.png' class='trash'/>
  </div>`;

  $("#messagescontainer").append(rowTemplate);
  $("#countmessages").text($(".message").length);
  $("#new-message").val("");
});

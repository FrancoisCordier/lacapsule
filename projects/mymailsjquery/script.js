$("#countmessages").text($(".message").length);

$("body").on("click", ".trash", function () {
  $(this).parent().remove();
  $("#countmessages").text($(".message").length);
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

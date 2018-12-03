$(document).ready(function() {
    
  $(".devour-burger").on("submit", function(event) {

    event.preventDefault();
    let burger_id = $(this).children(".burger_id").val();
    console.log(burger_id);

    $.ajax({

      method: "PUT",
      url: "/" + burger_id

    }).then(function(data) {

      location.reload();

    });
  });
});

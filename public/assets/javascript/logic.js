$(function() {
    $(".change-devour").on("click", function(event) {
        var id=$(this).data("id");
        var newDevour = $(this).attr("data-newDevour");

        var newDevourState ={
            devour: newDevour
        }

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        }).then(
            function() {
                console.log("changed devoured to", newDevour);
                location.reload();
                
            }
        )
    })

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            name: $("#bu").val().trim(),
            devoured: 0,
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("Created new burger!")
                location.reload();
            }
        )
    })

    $(".delete-burger").on("click", function(event){
        var id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function() {
                console.log("deleted burger," + id);
                location.reload()
            }
        )
    })
});
var topics = ["jay-z", "boosie", "cardi b", "lil uzi vert", "gucci mane", "snoop", "tyler the creator", "lil wayne", "drake",];
var responseArray = [];

//function to make buttons 
function makeBtn() {
    for (var i = 0; i < topics.length; i++) {
        var gifBtn = $("<button>").addClass("gifButtons");
        gifBtn.attr("data-topic", topics[i]);
        gifBtn.text(topics[i]);
        $("#buttonDiv").append(gifBtn);
    }
};

$(document).ready(function () {
    makeBtn();

    $(document.body).on("click", "#searchBtn", function () {
        event.preventDefault()

        newRapper = $("#newSearch").val();
        topics.push(newRapper);
        console.log(newRapper)
        console.log(topics)

        var newBtn = $("<button>").addClass("gifButtons");
        newBtn.attr("data-topic", newRapper);
        newBtn.text(newRapper);
        $("#buttonDiv").append(newBtn);
        $("#newSearch").val(" ");

    });
    //on button click 

    $(document.body).on("click", ".gifButtons", function () {
        var searchTopic = $(this).attr("data-topic");
        console.log(searchTopic)
        //construct url 
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
            searchTopic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryUrl,
            method: "GET"
        })

            //After data comes back from API
            .then(function (response) {
                //store results in array
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var topicImage = $("<img>").addClass("gif");

                    //give gif image tag src attr 
                    topicImage.attr("src", results[i].images.fixed_height_still.url);
                    topicImage.attr("still-src", results[i].images.fixed_height_still.url);
                    topicImage.attr("animate-src", results[i].images.fixed_height.url);
                    
                    topicImage.attr("data-state", "still");
                    //append p to topicImage 
                    gifDiv.append(p);
                    gifDiv.append(topicImage);

                    //prepend gifdiv to gifDump div

                    $("#gifDump").prepend(gifDiv);

                    //push results to reponseArray
                    responseArray.push(results[i].images);

                    console.log(responseArray)

                    var fix = results[i].images;
                   

                }
                $(".gif").on("click", function () {
                    var state = $(this).attr("data-state");
                    console.log("This src ",this.src)
                
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("animate-src"));
                        $(this).attr("data-state", "animate");
                        console.log("i am  playing")
                    } else {
                        $(this).attr("src", $(this).attr("still-src"));
                        $(this).attr("data-state", "still");
                        console.log("i am still")
                    }


                });
            });



    });

});







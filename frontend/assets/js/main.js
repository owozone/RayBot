// The biggest wumpus

var essentials = {
    ajaxify: function(link, type) {
        $.ajax({
            type: "GET", // Request type
            url: link, // The URL we plan to use
            dataType: type, // The data type. Basically the end extension of the file.
            success: function(response) { // On success, do this
                $('.content').html(response); // Replace the entire HTML of the element with the class 'content' with the content from the module
            }
        })
    }
}
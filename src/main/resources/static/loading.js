$(document).ready(function() {
    var counter = 0;

    // Set the percentage off
    loading();
});


function loading(){
    var num = 0;

    for(i=0; i<=100; i++) {
        setTimeout(function() {
            $('.loader span').html(num+'%');

            if(num == 100) {
                window.location="/map";

            }
            num++;
        },i*45); //Ändrar hastigheten på räknaren
    };

    $(window).load(function() {
        $(".loader").show("");
        $("/pictures/kut.gif").show("");

    });


}

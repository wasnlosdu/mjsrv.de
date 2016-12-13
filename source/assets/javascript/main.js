/**
 * Created by Johannes Konze on 13.12.2016.
 */
$(document).ready(function () {
    console.log('init');
    $.get("http://ipinfo.io", function (response) {
        console.log('get');
        console.log(response.country);
        var flagsrc = "assets/images/flags/" + response.country + ".png".toLowerCase();
        var image = new Image();
        image.src = flagsrc;
        if (image.width !== 0) {
            $('#flag').attr('src', flagsrc);
        }
        $('#flag').show();
    }, "jsonp");
    console.log('done');
});
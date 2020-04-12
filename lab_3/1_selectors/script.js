$(() => {
    // 2
    $(function () {
        $('#a').css('color', 'red').append(' appended text');
    });

    // 3
    $('#a').css('color', 'red').append(' appended text');
    $('div').css('color', 'green');
    $('.c').css('font-size', 'x-large');
    $('tr + tr').css('color', 'aqua');

    // 4
    $('table tr:first').css('color', 'yellow');
    $('tr:last').css('color', 'yellow');
    $('p:even').css('color', 'orange');

    // 5
    $('[href]').css('border', '1px solid black').css('padding', '3px');
    $('a[href*=kalaka]').css('border', '1px solid pink');
    $('a[href$=\'.pdf\']').css('border', '1px solid red');

});
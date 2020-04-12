$(() => {
    // 6
    alert('The color of an element with id="a" is ' + $('#a').css('color'));

    // 7
    $('button:contains(\'A\')').click(function () {
    $('#classic').addClass('asdf');
    });
    $('button:contains(\'B\')').click(function () {
    $('#classic').removeClass('asdf');
    });
    $('button:contains(\'C\')').click(function () {
    $('#toggle').toggleClass('asdf');
    });

    // 8
    $('tr:even').addClass('asdf');

    // 9
    $('ol > li.a:not(:has( .b a))').css('background-color', 'red')

});
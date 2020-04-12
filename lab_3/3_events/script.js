$(() => {

    // 10
    const edit = (event) => {
        const jqTd = $(event.target);
        const val = jqTd.html();

        const stop = () => {
            jqTd.html($('#edit').val())
            jqTd.one('click', edit)
        };

        jqTd.html(`<input id="edit" type="text" value="${val}"/>`);
        $('#edit').focus();
        $('#edit').blur(stop)
    };

    $('td').one('click', edit);

    // 11
    $('button').bind('asdf', function () { alert('The cake is a lie!'); });
    $('button').trigger('asdf');
    // $('*').unbind();
});
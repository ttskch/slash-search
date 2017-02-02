'use strict';

$(function () {
    // restore options from chrome.storage.
    restore();

    // save options to chrome.storage.
    $('#save').on('click', () => {
        save();
    });

    // add row.
    $('#add-row').on('click', () => {
        addRow();
    });

    // delete row.
    $(document).on('click', '.delete-row', function () {
        $(this).closest('tr').remove();
    });
});

function restore() {
    chrome.storage.sync.get({urls: [], elems: []}, items => {
        let urls = items.urls.length ? items.urls : defaultConfig.urls;
        let elems = items.elems.length ? items.elems : defaultConfig.elems;

        for (let i = 0; i < urls.length; i++) {
            let $row = addRow();
            $row.find('input.url').val(urls[i]);
            $row.find('input.elem').val(elems[i]);
        }
    });
}

function save() {
    $('#save').addClass('disabled');

    let urls = [], elems = [];
    $('tr.data-row').each(function () {
        urls.push($(this).find('input.url').val());
        elems.push($(this).find('input.elem').val());
    });
    console.log(urls, elems);

    chrome.storage.sync.set({
        urls: urls,
        elems: elems,
    }, () => {
        $('#alert').show().delay(1500).fadeOut(500);
        $('#save').removeClass('disabled');
        console.log('Options saved.');
    });
}

function addRow() {
    let $row = $('#row-template').clone().removeAttr('id').addClass('data-row').css('display', 'table-row');
    $('#row-template').before($row);

    return $row;
}

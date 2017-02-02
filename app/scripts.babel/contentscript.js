'use strict';

$(function () {
    chrome.storage.sync.get({urls: [], elems: []}, items => {
        let urls = items.urls.length ? items.urls : defaultConfig.urls;
        let elems = items.elems.length ? items.elems : defaultConfig.elems;

        for (let i = 0; i < urls.length; i++) {
            if (window.location.href.match(urls[i])) {
                $(window).on('keyup', e => {
                    if ([191, 111].includes(e.keyCode) && $('input:focus').length < 1) {
                        $(elems[i]).focus();
                    }
                });
            }
        }
    });
});

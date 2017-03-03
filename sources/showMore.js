var ShowMore = (function (btn, attr) {
    'use strict';

    var el = btn ? $(btn) : $('.js-btn-more');
    var opt = {
        method: attr.method || 'get',
        delay:  attr.delay || 100,
        output: attr.output ? $(attr.output) : $('.js-more-output'),
        url:    attr.url || window.location
    };

    // get data
    var pageNum = parseInt(el.attr("data-page-num"));
    var maxNum  = parseInt(el.attr("data-max-num"));
    var perPage = parseInt(el.attr("data-per-page"));

    // get data for request
    var data  = "ajax=1";
    data += "&page=" + pageNum;

    el.on('click', function () {
        // show preloader
        el.addClass('preloader');

        // AJAX request
        $.ajax({
            url:      opt.url,
            data:     data,
            method:   opt.method,
            dataType: 'json',
            success: function(result){
                setTimeout(function () {

                    // if result has't errors
                    if ( !result.errors ) {
                        // message
                        console.log('Request successfull!');

                        // set content
                        opt.output.append(result.content);

                        // hide preloader
                        el.removeClass('preloader');

                        // hide btn if necessary
                        if ( (pageNum) * perPage >= maxNum ) {
                            el.hide();
                        } else {
                            pageNum = pageNum + 1;
                        }
                        // if result has errors
                    } else {

                        // get errors
                        var errors = '';
                        var arr = result.errors;
                        for ( var i = 0; i < arr.length; i++ ) {
                            errors += arr[i] + '\n\r';
                        }

                        // message to user
                        alert("Обнаружены ошибки: \n\r" + errors);

                        // hide preloader
                        el.removeClass('preloader');
                    }

                }, opt.delay);
            },
            error: function () {
                setTimeout(function () {
                    // message
                    console.log('Request error');

                    // hide preloader
                    el.removeClass('preloader');
                }, opt.delay);
            }
        })
    });
    return this;

});
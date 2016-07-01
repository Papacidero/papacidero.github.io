'use strict';

/*! Input Fit Plugin - v0.0.1 - 2015-07-08
 * https://github.com/Papacidero/inputfit
 *
 * Copyright (c) 2015 Carlos Eduardo Papacidero <papacidero@gmail.com>;
 * Licensed under the MIT license */

(function ($) {

    $.fn.inputFit = function (options) {

        var elem = this;

        var defaults = {
            'maxFontSize': this.css('font-size'),
            'minFontSize': 5
        };

        var options = $.extend({}, defaults, options);

        var originalFontSize = elem.css('font-size');
        var originalFontFamily = elem.css('font-family');
        var originalFontAlignment = elem.css('text-align');
        var originalFontWeight = elem.css('font-weight');
        var originalTextTransform = elem.css('text-transform');
        var maxWidth = elem.width();
        var maxHeight = elem.height();
        var actualWidth = '';
        var actualHeight = '';
        var actualFontSize = '';

        elem.addClass('inputFit');
        elem.after('<span class="inputFit" style="display: none; position: absolute; bottom: 0; left: 0; border: 1px solid gray; float: left; font-size: ' + originalFontSize + '; font-family: ' + originalFontFamily + '; text-align: ' + originalFontAlignment + '; font-weight: ' + originalFontWeight + '; text-transform: ' + originalTextTransform + ';"></span>');

        function actualSizes() {
            actualWidth = $('span.inputFit').width();
            actualHeight = $('span.inputFit').height();
            actualFontSize = parseInt($('span.inputFit').css('font-size'));
        }

        function resize() {
            var fontSize = '';
            fontSize = actualFontSize * maxWidth / actualWidth * 0.9;
            if (maxWidth < actualWidth) {
                $('input.inputFit').css({ 'font-size': fontSize, 'height': maxHeight, 'width': maxWidth });
            } else if (maxWidth > actualWidth) {
                fontSize = actualFontSize * maxWidth / actualWidth * 0.9;
                if (fontSize <= parseInt(originalFontSize)) {
                    $('input.inputFit').css({ 'font-size': fontSize, 'height': maxHeight, 'width': maxWidth });
                }
            }
        }

        elem.keydown(function (event) {
            $('span.inputFit').html(elem.val().replace(/(\s)/g, "&nbsp;"));
            actualSizes();
            resize();
        });

        elem.keyup(function () {
            $('span.inputFit').html(elem.val().replace(/(\s)/g, "&nbsp;"));
            actualSizes();
            if (elem.val() === '') {
                elem.css('font-size', originalFontSize);
            }
        });
    };
})(jQuery);
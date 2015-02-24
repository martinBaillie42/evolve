// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var emvt = emvt || {};



(function (emvt) {
    "use strict";
    $(window).on('load', function () {
        emvt.targetPage = emvt.targetPage || $('#variate').contents();
        emvt.clickedElement = emvt.clickedElement || $();

        // TODO Is typeof function reliable?
        emvt.initialiseMenu = function () {
                //emvt.clickedElement.wrap('<div class="dropdown">');
                //debugger;

            };

        // Change cursor to pointer when entering iframe, back to default on way out
        emvt.targetPage.find('body').on('mouseenter', function() {
                $(this).css('cursor', 'pointer'); // TODO does not always work. See RSS links on blog.
            }).on('mouseleave', function () {
                $('body').css('cursor', 'default');
            });

        // Highlight and add a class to the current hover over element
        $('*', emvt.targetPage).on('mouseenter', function() {
            if (emvt.highlightOn){
                $('.emvt_red', emvt.targetPage).css('outline-width', '0px').removeClass('emvt_red');
                $(this).addClass('emvt_red').css('outline', '#f00 solid 1px');
            }
        });

        // set the current object when mouse is clicked
        emvt.targetPage.on('click', function (e) {
            e.preventDefault();
            emvt.clickedElement = $(e.target);
            $('.emvt_blue', emvt.targetPage).css('outline-width', '0px');
            emvt.clickedElement.css('outline', '#00f solid 1px').removeClass('emvt_red').addClass('emvt_blue');
            //emvt.initialiseMenu();
        });

        emvt.highlightOn = true;

        $('.variate-menu').draggable({
            opacity: 0.7,
            start: function () {
                $('.emvt_red', emvt.targetPage).css('outline-width', '0px').removeClass('emvt_red');
                emvt.highlightOn = false;
            },
            stop: function () {
                emvt.highlightOn = true;
            }
        });
    });

})(emvt);

// http://learn.jquery.com/plugins/basic-plugin-creation/
//(function( $ ) {
//
//    $.fn.currentElement = function() {
//
//        debugger;
//
//    };
//
//}( jQuery ));

/*

(function( $ ) {

    $.fn.showLinkLocation = function() {

        this.filter( "a" ).each(function() {
            var link = $( this );
            link.append( " (" + link.attr( "href" ) + ")" );
        });

        return this;

    };

}( jQuery ));

*/

/*

 (function( $ ) {

 $.fn.showLinkLocation = function() {

 this.filter( "a" ).append(function() {
 return " (" + this.href + ")";
 });

 return this;

 };

 }( jQuery ));


 */
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var emvt = emvt || {};

(function () {
    "use strict";
    $(window).on('load', function () {

        emvt.targetPageDOM = emvt.targetPageDOM || $('#variate').contents();
        emvt.ui = emvt.ui || {};

        emvt.pointer = (function (targetPageDOM) {

            var $body = targetPageDOM.find('body'),
                $allElements = $('*', targetPageDOM);

            $body.on('mouseenter', function(e) {
                $.publish('enterDOM/pointer/emvt', this);
            });

            $body.on('mouseleave', function() {
                $.publish('leaveDOM/pointer/emvt');
            });

            $allElements.on('click', function (event) {
                event.preventDefault();
                $.publish('clickDOM/pointer/emvt', event.target);
            });

        })(emvt.targetPageDOM);

        emvt.ui.pointer = (function(){

            // too complex, just need to set this!
            $.subscribe('enterDOM/pointer/emvt', function(e, that){
                $(that).css('cursor', 'pointer');
            });

        })();

        emvt.ui.element = (function () {

            var currentSelectedElement;

            $.subscribe('clickDOM/pointer/emvt', function(e, clickedElement){
                debugger;
                //if (currentSelectedElement !== clickedElement) {
                    //$(currentSelectedElement).css('outline-width', '0px');
                    //currentSelectedElement = clickedElement;
                    $(clickedElement).css('outline', '#00f solid 1px');
                //}
                //emvt.clickedElement = $(e.target);
                //$('.emvt_blue', emvt.targetPageDOM).css('outline-width', '0px').removeClass('emvt_blue');
                //emvt.clickedElement.css('outline', '#00f solid 1px').removeClass('emvt_red').addClass('emvt_blue');
                //emvt.initialiseMenu();
            });

        })();

        emvt.clickedElement = emvt.clickedElement || $();

        // TODO Is typeof function reliable?
        emvt.initialiseMenu = function () {
            //console.log(emvt.clickedElement);
            var tagName = emvt.clickedElement.prop('tagName').toLowerCase();
            var id = emvt.clickedElement.attr('id');
            var classes = emvt.clickedElement.attr('class');
            var parent = emvt.clickedElement.parent();
            var firstChild = emvt.clickedElement.children()[0]; // this might play up on only one return
            var text = emvt.clickedElement.contents().filter(function() {
                    // http://stackoverflow.com/questions/5913031/jquery-get-text-but-not-the-text-in-span
                    return this.nodeType == 3;
                }).text();
            console.log('id', id);
            console.log('classes', classes);
            console.log('parent', parent);
            console.log('firstChild', firstChild);
            console.log('text', text);
            $('span', '[data-emvt="menu-tagname"]').text(tagName);
            $('span', '[data-emvt="menu-id"]').text(id);
            $('span', '[data-emvt="menu-classes"]').text(classes);
            $('span', '[data-emvt="menu-parent"]').text(parent.prop('tagName').toLowerCase() + parent.attr('id') + parent.attr('class'));
            $('span', '[data-emvt="menu-firstchild"]').text(firstChild);
            $('span', '[data-emvt="menu-text"]').text(text);
            //debugger;
        };

        // Highlight and add a class to the current hover over element
        $('*', emvt.targetPageDOM).on('mouseenter', function() {
            if (emvt.highlightOn){
                $('.emvt_red', emvt.targetPageDOM).removeClass('emvt_red').not('.emvt_blue').css('outline-width', '0px');
                $(this).addClass('emvt_red').css('outline', '#f00 solid 1px');
                $(this).on('mouseout', function() {
                    $('.emvt_blue', emvt.targetPageDOM).css('outline', '#00f solid 1px');
                });
            }
        });

        // set the current object when mouse is clicked
        //emvt.targetPageDOM.on('click', function (e) {
        //    e.preventDefault();
        //    emvt.clickedElement = $(e.target);
        //    $('.emvt_blue', emvt.targetPageDOM).css('outline-width', '0px').removeClass('emvt_blue');
        //    emvt.clickedElement.css('outline', '#00f solid 1px').removeClass('emvt_red').addClass('emvt_blue');
        //    emvt.initialiseMenu();
        //});

        emvt.highlightOn = true;

        // TODO Draggable menu performance is not what it could be
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

})();

// http://learn.jquery.com/events/introduction-to-custom-events/
// http://learn.jquery.com/code-organization/concepts/
// http://api.jquery.com/on/#event-names
// https://gist.github.com/cowboy/661855
// http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript

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
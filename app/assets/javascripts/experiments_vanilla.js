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

            // Not currently used
            $body.on('mouseleave', function() {
                $.publish('leaveDOM/pointer/emvt');
            });

            $allElements.on('click', function (event) {
                event.preventDefault();
                $.publish('clickDOM/pointer/emvt', event.target);
            });

            $allElements.on('mouseover', function(event) {
                //console.log('mouseover', event.target);
                $.publish('overElement/pointer/emvt', event.target);
            });

            // Not used currently
            $allElements.on('mouseout', function(event) {
                //console.log('mouseout', event.target);
                //$.publish('exitElement/pointer/emvt', event.target);
            });

        })(emvt.targetPageDOM);

        emvt.ui.pointer = (function(targetPageDOM){

            $.subscribe('enterDOM/pointer/emvt', function(e, that){
                $(that).css('cursor', 'pointer');
            });

        })(emvt.targetPageDOM);

        emvt.ui.element = (function (targetPageDOM) {

            // Could insert some CSS into the HTML to control this styling

            $.subscribe('clickDOM/pointer/emvt', function(e, clickedElement){
                $('*', targetPageDOM).css('outline', '#00f solid 0px');
                $(clickedElement).css('outline', '#00f solid 1px');
            });

            $.subscribe('overElement/pointer/emvt', function(e, overElement){
                $('*', targetPageDOM).css('outline', '0');
                $(overElement).css('outline', '#f00 solid 1px');
            });

            // Not used currently
            $.subscribe('exitElement/pointer/emvt', function(e, exitedElement){
                //$('*', targetPageDOM).css('outline', '#f00 solid 0px');
                $(exitedElement).css('outline', '#f00 solid 0px');
            });

        })(emvt.targetPageDOM);

        emvt.selectedElement = (function (){
            // TODO: Public getters and setters?
            var currentElement = {};
            $.subscribe('clickDOM/pointer/emvt', function(e, clickedElement){
                //console.log(clickedElement);
                currentElement.tagName = $(clickedElement).prop('tagName').toLowerCase();
                currentElement.id = $(clickedElement).attr('id');
                currentElement.classes = $(clickedElement).attr('class');
                currentElement.parent = $(clickedElement).parent();
                currentElement.firstChild = $(clickedElement).children()[0]; // this might play up on only one return
                currentElement.text = $(clickedElement).contents().filter(function() {
                    // http://stackoverflow.com/questions/5913031/jquery-get-text-but-not-the-text-in-span
                    return this.nodeType == 3;
                }).text();
            //    TODO: Maybe add change event here?
            });
            return currentElement;
        })();

        emvt.ui.elementMenu = (function (emvt){
            // TODO https://github.com/petersirka/jquery.bindings ?
            console.log(emvt);
            $.subscribe('clickDOM/pointer/emvt', function(e) {
                $('span', '[data-emvt="menu-tagname"]').text(emvt.selectedElement.tagName);
                $('span', '[data-emvt="menu-id"]').text(emvt.selectedElement.id);
                $('span', '[data-emvt="menu-classes"]').text(emvt.selectedElement.classes);
                $('span', '[data-emvt="menu-parent"]').text(emvt.selectedElement.parent.prop('tagName').toLowerCase() +
                                                            emvt.selectedElement.parent.attr('id') +
                                                            emvt.selectedElement.parent.attr('class'));
                $('span', '[data-emvt="menu-firstchild"]').text(emvt.selectedElement.firstChild);
                $('span', '[data-emvt="menu-text"]').text(emvt.selectedElement.text);
            });
        })(emvt);

        emvt.clickedElement = emvt.clickedElement || $();

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
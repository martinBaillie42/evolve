// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var emvt = emvt || {};

// var testPub1 = new emvt.Publish.init('hello1', 'click',  $('*','body'), {options: true});
emvt.Publish = (function () {

    function event(message, eventType, jqueryObject, options){

        if(options) {
            var preventDefault = options.preventDefault || false;
        }
        //console.log(jqueryObject);
        jqueryObject.on(eventType, function(event) {
            if (preventDefault) {
                event.preventDefault();
            }
            $.publish(message, [event, this]);
        });
    }

    return {
        init: event // ,
        //trigger: trigger
    }
})();

// var testEvent1 = new emvt.Subscribe.init('hello1', hello1, {optional: parameters});
// function hello1 (subscribeEvent, publishEvent, eventElement, callbackParametersObject) {
emvt.Subscribe = (function () {

    function event(message, callback, callbackParametersObject){
        $.subscribe(message, function(subscribeEvent, publishEvent, eventElement) {
            return callback(subscribeEvent, publishEvent, eventElement, callbackParametersObject);
        });
    }

    return {
        init: event
    }
})();

(function () {
    "use strict"
    $(window).on('load', function () {



        emvt.variateDom = $('#variate').contents();



        emvt.variatePageUI = (function (Subscribe, variateDom) {

            var allElements = variateDom.find('*'),
                body = variateDom.find('body'),
                hoverCss = '#f00 solid 1px',
                selectCss = '#00f solid 1px',
                selectClass = 'emvt_selected-element',
                selectedClass = '.' + selectClass,

                enterDom = function (subscribeEvent, publishEvent, eventElement) {
                    $(eventElement).css('cursor', 'pointer');
                },



                overElement = function  (subscribeEvent, publishEvent, eventElement, allElements) {
                    var dataElement = $(eventElement).data('emvt-element'),
                        dataRelative = $(eventElement).data('emvt-relative');
                    //console.log(dataElement);
                    clearHighlighting(allElements, false);
                    if (dataElement && dataElement.indexOf('move') === 0) {
                        if (dataElement === 'moveUp') {
                            highlightFlash(emvt.currentElement.getGrandParent(), false, false, false);
                        } else if (dataElement === 'moveDown') {
                            highlightFlash(emvt.currentElement.getNextSibling(), false, false, false);
                        } else if (dataElement === 'moveRight') {
                            highlightFlash(emvt.currentElement.getNextSibling(), false, false, false);
                            highlightFlash($(emvt.currentElement.getNextSibling()).next(), false, false, false);
                        } else if (dataElement === 'moveLeft') {
                            highlightFlash(emvt.currentElement.getPreviousSibling(), false, false, false);
                            highlightFlash($(emvt.currentElement.getPreviousSibling()).prev(), false, false, false);
                        }
                    } else if (dataRelative && dataRelative.indexOf('select') === 0) {
                        if (dataRelative === 'selectParent') {
                            highlightFlash(emvt.currentElement.getParent(), false, false, false);
                        } else if (dataRelative === 'selectFirstChild') {
                            highlightFlash(emvt.currentElement.getFirstChild(), false, false, false);
                        } else if (dataRelative === 'selectNextSibling') {
                            highlightFlash(emvt.currentElement.getNextSibling(), false, false, false);
                        } else if (dataRelative === 'selectPreviousSibling') {
                            highlightFlash(emvt.currentElement.getPreviousSibling(), false, false, false);
                        }
                    } else {
                        highlightFlash(publishEvent.target, false, false, false);
                    }

                },

                leaveDom = function (subscribeEvent, publishEvent, eventElement, allElements) {
                    clearHighlighting(allElements, false);
                },

                highlightFlash = function(highlightElement, select, backgroundFlash, outlineFlash) {
                    var currentBackgroundColor = $(highlightElement).css('background-color'),
                        currentBoxShadow = $(highlightElement).css('box-shadow'),
                        highlightColour = select ? '0, 0, 255' : '255, 0, 0',
                        backgroundColour = backgroundFlash ? "rgba(" + highlightColour + ", 0.1)" : currentBackgroundColor,
                        boxShadowColour = "0px 0px 31px 0px rgba(" + highlightColour + ",0.4)",
                        highlightFlashSettings = {
                                "background-color": $.Color(backgroundColour),
                                "box-shadow": boxShadowColour
                            },
                        restoreElementSettings = {
                                "background-color": $.Color(currentBackgroundColor),
                                "box-shadow": currentBoxShadow
                            };

                    if (select) {
                        $(highlightElement).css('outline', selectCss).addClass(selectClass);
                    } else {
                        $(highlightElement).not(selectedClass).css('outline', hoverCss);
                    }

                    if (outlineFlash) {
                        $(highlightElement).animate(highlightFlashSettings, 100, function(){
                            $(this).animate(restoreElementSettings, 500);
                        });
                    }

                },

                clearHighlighting = function(allElements, select) {
                    if (select) {
                        $(allElements).css('outline-width', '0px').removeClass(selectClass);
                    } else {
                        $(allElements).not(selectedClass).css('outline-width', '0px');
                    }

                },

                clickElement = function (subscribeEvent, publishEvent, eventElement, callBackParams) {

                    if (callBackParams) {
                        var allElements = callBackParams.allElements;
                    }

                    if ($(eventElement).data('emvt-relative')) {
                        // TODO add scroll to if element not on screen
                        // TODO make this called by message from object?
                        clearHighlighting(allElements, true);
                        setTimeout(function(){
                            highlightFlash(emvt.currentElement.getElement(), true, true, true);
                        },100);
                    } else if (publishEvent.target === eventElement && !$(eventElement).data('emvt-element')) {
                        clearHighlighting(allElements, true);
                        highlightFlash(publishEvent.target, true, false, true);
                    }

                },

                subEnterDom = new Subscribe.init('enterDom', enterDom),
                subOverElement = new Subscribe.init('overElement', overElement, allElements),
                subSelectElement = new Subscribe.init('selectElement', clickElement, {allElements: allElements}),
                subLeaveDom = new Subscribe.init('leaveDom', leaveDom, allElements);

        })(emvt.Subscribe, emvt.variateDom);



        emvt.variatePage = (function (Publish, variateDom) {

            // could create array of pub objects, then call them and let object iterate.

            var variateBody = variateDom.find('body'),
                allElements = variateDom.find('*'),

                pubEnterDom = new Publish.init('enterDom', 'mouseenter',  variateBody),
                pubOverElement = new Publish.init('overElement', 'mouseover',  allElements),
                pubSelectElement = new Publish.init('selectElement', 'click',  allElements, {"preventDefault": true}),
                pubLeaveDom = new Publish.init('leaveDom', 'mouseleave',  variateBody);

        })(emvt.Publish, emvt.variateDom);



        emvt.currentElement = (function (Subscribe, variateDom) {
            var currentElement = variateDom.find('body'),

                setElement = function(selectedElement) {
                    currentElement = selectedElement;
                },

                getElement = function() {
                    return currentElement;
                },

                selectElement = function(subscribeEvent, publishEvent, eventElement) {
                    if ($(eventElement).data('emvt-relative')) {
                        selectRelation($(eventElement).data('emvt-relative'));
                    } else if ($(eventElement).data('emvt-element')) {
                        move.element($(eventElement).data('emvt-element'));
                    } else if (eventElement === publishEvent.target && !$(eventElement).data('emvt-relative') && !$(eventElement).data('emvt-element')) {
                        setElement($(eventElement));
                    }
                },

                getParent = function(){
                    var current = getElement();
                    return current.parent().prop('tagName') === 'HTML' ? false : current.parent();
                },

                getGrandParent = function(){
                    var current = getElement();
                    return current.parent().prop('tagName') === 'BODY' ? false : current.parent().parent();
                },

                getNextSibling = function(){
                    var current = getElement();
                    return current.next().length > 0 ? current.next() : false
                },

                getPreviousSibling = function(){
                    var previousSibling = getElement().prev();
                    return previousSibling.length > 0 ? previousSibling : false
                },

                getFirstChild = function(){
                    var firstChild = getElement().children().first();
                    return firstChild.length > 0 ? firstChild : false;
                },

                move = {
                    "up":       function (current) {
                                    var grandParent = getGrandParent()
                                    if(grandParent) {
                                        current.detach().prependTo(grandParent);
                                    }
                                },
                    "down":    function (current) {
                                    var next = getNextSibling();
                                    if (next) {
                                        current.detach().prependTo(next);
                                    }
                                },
                    "right":    function (current) {
                                    var next = getNextSibling();
                                    if (next) {
                                        current.detach().insertAfter(next);
                                    }
                                },
                    "left":     function (current) {
                                    var prev = getPreviousSibling();
                                    if (prev) {
                                        current.detach().insertBefore(prev);
                                    }
                                },
                    "element":  function (direction) {
                                    var current = getElement(),
                                        dir = direction.replace('move', '').toLowerCase();
                                    move[dir](current);
                                }
                },

                selectRelation = function (relative) {
                    emvt.currentElement[relative]();
                },

                selectParent = function() {
                    var parent = getParent();
                    setElement(parent ? parent : getElement());
                },

                selectFirstChild = function() {
                    var firstChild = getElement().children().first();
                    setElement(firstChild.length > 0 ? firstChild : getElement());
                },

                selectNextSibling = function() {
                    var nextSibling = getNextSibling(),
                        current = getElement(),
                        firstSibling = current.siblings().first();
                    setElement(nextSibling.length > 0 ? nextSibling : firstSibling.length > 0 ? firstSibling : current);
                },

                selectPreviousSibling = function() {
                    var previousSibling = getPreviousSibling(),
                        current = getElement(),
                        lastSibling = current.siblings().last();
                    setElement(previousSibling.length > 0 ? previousSibling : lastSibling.length > 0 ? lastSibling : current);
                },

                subSelectElement = new Subscribe.init('selectElement', selectElement);


            return {
                //setElement: setElement,
                getElement: getElement,
                selectParent: selectParent,
                selectFirstChild: selectFirstChild,
                selectNextSibling: selectNextSibling,
                selectPreviousSibling: selectPreviousSibling,
                getGrandParent: getGrandParent,
                getParent: getParent,
                getNextSibling: getNextSibling,
                getPreviousSibling: getPreviousSibling,
                getFirstChild: getFirstChild
            };
        })(emvt.Subscribe, emvt.variateDom);



        emvt.ElementMenu = (function (currentElement, Subscribe, Publish) {

            var selectElement = function(subscribeEvent, publishEvent, eventElement) {
                    //console.log(currentElement.getElement());
                },

                selectRelatedElement = $("li", '.variate-menu'),
                hoverMoveElement = $("li[data-emvt-element]", '.variate-menu'),
                hoverRelativeElement = $("li[data-emvt-relative]", '.variate-menu'),
                //selectRelatedElement = $("[data-emvt='menu-parent']"),

                subSelectElement = new Subscribe.init('selectElement', selectElement),

                pubSelectElement = new Publish.init('selectElement', 'click', selectRelatedElement),

                pubHoverElement = new Publish.init('overElement', 'mouseover', hoverMoveElement);

                pubHoverElement = new Publish.init('overElement', 'mouseover', hoverRelativeElement);

            return {

            };

        })(emvt.currentElement, emvt.Subscribe, emvt.Publish);



        emvt.ElementMenuUI = (function () {

        })();



    });
})();
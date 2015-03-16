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
                    var dataElement = $(eventElement).data('emvt-element');
                    clearHoverHighlights(allElements);
                    //debugger;
                    if (dataElement && dataElement.indexOf('move') === 0) {
                        if (dataElement === 'moveUp') {
                            emvt.currentElement.getGrandParent().not(selectedClass).css('outline', hoverCss);
                        }
                        //console.log($(publishEvent.target));
                        //console.log(eventElement);
                    } else {
                        $(publishEvent.target).not(selectedClass).css('outline', hoverCss);
                    }

                },

                clearHoverHighlights = function (allElements) {
                    $(allElements).not(selectedClass).css('outline-width', '0px');
                },

                leaveDom = function (subscribeEvent, publishEvent, eventElement, allElements) {
                    clearHoverHighlights(allElements);
                },

                clickElement = function (subscribeEvent, publishEvent, eventElement, callBackParams) {
                    if (callBackParams) {
                        var allElements = callBackParams.allElements;
                    }
                    var previousElement,
                        backgroundColor,
                        boxShadow;
                    if ($(eventElement).data('emvt-relative')) {
                        // TODO add scroll to if element not on screen
                        // TODO make this called by message from object?
                        allElements.css('outline-width', '0px').removeClass(selectClass);
                        setTimeout(function(){
                            backgroundColor = $(emvt.currentElement.getElement()).css('background-color');
                            boxShadow = $(emvt.currentElement.getElement()).css('box-shadow');
                            $(emvt.currentElement.getElement()).css('outline', selectCss).addClass(selectClass);
                            $(emvt.currentElement.getElement()).animate(
                                {"background-color": $.Color("rgba(0, 0, 255, 0.1)"),
                                "box-shadow": "0px 0px 31px 0px rgba(0,0,255,0.4)"},
                                100, function(){
                                    $(this).animate(
                                        {"background-color": $.Color(backgroundColor),
                                        "box-shadow": boxShadow
                                        },
                                        500);
                            });
                        },100);
                    } else if (publishEvent.target === eventElement && !$(eventElement).data('emvt-element')) {
                        allElements.css('outline-width', '0px').removeClass(selectClass);
                        boxShadow = $(publishEvent.target).css('box-shadow');
                        $(publishEvent.target).css('box-shadow', "0px 0px 31px 0px rgba(0,0,255,0.0)");
                        $(publishEvent.target).css('outline', selectCss).addClass(selectClass);
                        $(publishEvent.target).animate(
                            {"box-shadow": "0px 0px 31px 0px rgba(0,0,255,0.4)"},
                            100, function(){
                                $(this).animate(
                                    {"box-shadow": boxShadow},
                                    500);
                            });
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
                    console.log(selectedElement);
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

                getGrandParent = function(){
                    var current = getElement();
                    return current.parent().prop('tagName') === 'BODY' ? false : current.parent().parent();
                },

                move = {
                    "up":       function (current) {
                                    //var grandParent = current.parent().parent(),
                                    //    isParentBody = current.parent().prop('tagName') === 'BODY';
                                    var grandParent = getGrandParent()
                                    if(grandParent) {
                                        current.detach().prependTo(grandParent);
                                    }
                                },
                    "down":    function (current) {
                                    var next = current.next(),
                                        isNext = next.length > 0;
                                    if (isNext) {
                                        current.detach().prependTo(next);
                                    }
                                },
                    "right":    function (current) {
                                    var next = current.next(),
                                        isNext = next.length > 0;
                                    if (isNext) {
                                        current.detach().insertAfter(next);
                                    }
                                },
                    "left":     function (current) {
                                    var prev = current.prev(),
                                        isPrev = prev.length > 0;
                                    if (isPrev) {
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
                    var isBody = getElement().prop('tagName') === 'BODY';
                    setElement(isBody ? getElement() : getElement().parent() );
                },

                selectFirstChild = function() {
                    var firstChild = getElement().children().first();
                    setElement(firstChild.length > 0 ? firstChild : getElement());
                },

                selectNextSibling = function() {
                    var current = getElement(),
                        nextSibling = current.next(),
                        firstSibling = current.siblings().first();
                    setElement(nextSibling.length > 0 ? nextSibling : firstSibling.length > 0 ? firstSibling : current);
                },

                selectPreviousSibling = function() {
                    var current = getElement(),
                        previousSibling = current.prev(),
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
                getGrandParent: getGrandParent
                //moveRight: moveRight,
                //moveLeft: moveLeft
            };
        })(emvt.Subscribe, emvt.variateDom);



        emvt.ElementMenu = (function (currentElement, Subscribe, Publish) {

            var selectElement = function(subscribeEvent, publishEvent, eventElement) {
                    //console.log(currentElement.getElement());
                },

                selectRelatedElement = $("li", '.variate-menu'),
                hoverMoveElement = $("li[data-emvt-element^='move']", '.variate-menu'),
                //selectRelatedElement = $("[data-emvt='menu-parent']"),

                subSelectElement = new Subscribe.init('selectElement', selectElement),

                pubSelectElement = new Publish.init('selectElement', 'click', selectRelatedElement),

                pubHoverElement = new Publish.init('overElement', 'mouseover', hoverMoveElement);

            return {

            };

        })(emvt.currentElement, emvt.Subscribe, emvt.Publish);



        emvt.ElementMenuUI = (function () {

        })();



    });
})();
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
        init: event
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
                    clearHoverHighlights(allElements);
                    $(publishEvent.target).not(selectedClass).css('outline', hoverCss);
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
                    var previousElement;
                    allElements.css('outline-width', '0px').removeClass(selectClass);
                    if ($(eventElement).data('emvt-relative')) {
                        setTimeout(function(){
                            $(emvt.currentElement.getElement()).css('outline', selectCss).addClass(selectClass);
                        },100);
                    } else {
                        $(publishEvent.target).css('outline', selectCss).addClass(selectClass);
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
                    } else if (eventElement === publishEvent.target && !$(eventElement).data('emvt-relative')) {
                        setElement($(eventElement));
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
                    var nextSibling = getElement().next();
                    setElement(nextSibling.length > 0 ? getElement().next() : getElement());
                },

                selectPreviousSibling = function() {
                    var previousSibling = getElement().prev();
                    setElement(previousSibling.length > 0 ? getElement().prev() : getElement());
                },

                subSelectElement = new Subscribe.init('selectElement', selectElement);

            return {
                //setElement: setElement,
                getElement: getElement,
                selectParent: selectParent,
                selectFirstChild: selectFirstChild,
                selectNextSibling: selectNextSibling,
                selectPreviousSibling: selectPreviousSibling
            };
        })(emvt.Subscribe, emvt.variateDom);



        emvt.ElementMenu = (function (currentElement, Subscribe, Publish) {

            var selectElement = function(subscribeEvent, publishEvent, eventElement) {
                    //console.log(currentElement.getElement());
                },

                selectRelatedElement = $("li", '.variate-menu'),
                //selectRelatedElement = $("[data-emvt='menu-parent']"),


                subSelectElement = new Subscribe.init('selectElement', selectElement),

                pubSelectElement = new Publish.init('selectElement', 'click', selectRelatedElement);

            return {

            };

        })(emvt.currentElement, emvt.Subscribe, emvt.Publish);



        emvt.ElementMenuUI = (function () {

        })();



    });
})();
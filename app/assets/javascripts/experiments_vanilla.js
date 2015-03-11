// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var emvt = emvt || {};

(function () {
    "use strict"
    $(window).on('load', function () {
        emvt.variatePageUi = (function () {

        })();

        emvt.variatePage = (function () {

        })();

        emvt.selectedElement = (function () {

        })();

        emvt.ElementMenu = (function () {

        })();

        emvt.ElementMenuUI = (function () {

        })();

        emvt.Publish = (function () {

            function event(message, eventType, jqueryObject){
                jqueryObject.on(eventType, function(event) {
                    $.publish(message, [event, this]);
                });
            }

            return {
                init: event
            }
        })();

        emvt.Subscribe = (function () {

            function event(message, callback, callbackParametersObject){
                $.subscribe(message, function(subscribeEvent, publishEvent, eventElement, callbackParametersObject) {
                    return callback(subscribeEvent, publishEvent, eventElement, callbackParametersObject);
                });
            }

            return {
                init: event
            }
        })();

        var testPub1 = new emvt.Publish.init('hello1', 'click',  $('*','body'));
        var testPub2 = new emvt.Publish.init('hello2', 'click',  $('*','body'));

        function hello1 (subscribeEvent, publishEvent, eventElement, callbackParametersObject) {
            console.log('hello1');
        }

        function hello2 (subscribeEvent, publishEvent, eventElement, callbackParametersObject) {
            console.log('hello2');
        }

        var testEvent1 = new emvt.Subscribe.init('hello1', hello1);
        var testEvent2 = new emvt.Subscribe.init('hello2', hello2);

    });
})();
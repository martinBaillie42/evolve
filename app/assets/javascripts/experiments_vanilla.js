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

        emvt.publish = (function () {

            function event(jqueryObject, eventType, message){
                jqueryObject.on(eventType, function(event) {
                    $.publish(message, [event, this]);
                });
            }

            return {
                event: event
            }
        })();

        emvt.subscribe = (function () {

            function event(message, callback, callbackParametersObject){
                $.subscribe(message, function(subscribeEvent, publishEvent, eventElement, callbackParametersObject) {
                    return callback(subscribeEvent, publishEvent, eventElement, callbackParametersObject);
                });
            }

            return {
                event: event
            }
        })();

        var testEvent = new emvt.publish.event($('*','body'), 'click', 'hello');

        function hello (subscribeEvent, publishEvent, eventElement, callbackParametersObject) {
            console.log(subscribeEvent, publishEvent, eventElement);
        }

        var testEvent = new emvt.subscribe.event('hello', hello);

    });
})();
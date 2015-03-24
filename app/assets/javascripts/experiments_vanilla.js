// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
//if (!Array.isArray) {
//    Array.isArray = function(arg) {
//        return Object.prototype.toString.call(arg) === '[object Array]';
//    };
//}

var emvt = emvt || {};

// var testPub1 = new emvt.Publish.init('hello1', 'click',  $('*','body'), {options: true});
emvt.Publish = (function () {

    function event(message, eventType, jqueryObject, options){

        if(options) {
            var preventDefault = options.preventDefault || false;
            var delegateElement = options.delegateElement || false;
        }

        if (delegateElement) {
            jqueryObject.on(eventType, delegateElement, function(event) {
                if (preventDefault) {
                    event.preventDefault();
                }
                $.publish(message, [event, this]);
            });
        } else {
            jqueryObject.on(eventType, function(event) {
                if (preventDefault) {
                    event.preventDefault();
                }
                $.publish(message, [event, this]);
            });
        }


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
                hoverCss = '#f00 solid 2px',
                selectCss = '#00f solid 2px',
                selectClass = 'emvt_selected-element',
                selectedClass = '.' + selectClass,

                enterDom = function (subscribeEvent, publishEvent, eventElement) {
                    $(eventElement).css('cursor', 'pointer');
                },



                overElement = function  (subscribeEvent, publishEvent, eventElement, allElements) {
                    var dataElement = $(eventElement).data('emvt-element'),
                        dataRelative = $(eventElement).data('emvt-relative');

                    //clearHighlighting(allElements, false);
                    if (dataElement /*&& dataElement.indexOf('move') === 0*/) {
                        if (dataElement === 'moveUp') {
                            highlightFlash(emvt.currentElement.getGrandParent(), false, false, false);
                        } else if (dataElement === 'moveDown') {
                            highlightFlash(emvt.currentElement.getNextSibling(), false, false, false);
                        } else if (dataElement === 'moveRight') {
                            highlightFlash(emvt.currentElement.getNextSibling(), false, false, false);
                        } else if (dataElement === 'moveLeft') {
                            highlightFlash(emvt.currentElement.getPreviousSibling(), false, false, false);
                        } else if (dataElement === 'current') {
                            highlightFlash(emvt.currentElement.getElement(), true, false, false);
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
                    var isAnimated = $(highlightElement).is(':animated'),
                        currentBackgroundColor = $(highlightElement).css('background-color'),
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

                    if (!isAnimated) {
                        clearHighlighting(allElements, false);
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
                        clearHighlighting(allElements, true);
                        setTimeout(function(){
                            highlightFlash(emvt.currentElement.getElement(), true, false, false);
                        },100);
                    } else if (publishEvent.target === eventElement && !$(eventElement).data('emvt-element')) {
                        // TODO add scroll to if element not on screen
                        // TODO make this called by message from object?
                        clearHighlighting(allElements, true);
                        highlightFlash(publishEvent.target, true, false, false);
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

                getDomElement = function() {
                    return currentElement[0];
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

                isForbiddenTag = function(element) {
                    var elementTag = element.prop('tagName'),
                        forbiddenTags = ['HTML', 'SCRIPT', 'LINK', 'HEAD'],
                        i;

                    for (i = 0; i < forbiddenTags.length; i++) {
                        if (forbiddenTags[i] === elementTag) {
                            return true;
                        }
                    }

                    return false;
                },

                getParent = function(){
                    var current = getElement();
                    return isForbiddenTag(current.parent()) ? false : current.parent();
                },

                getGrandParent = function(){
                    var current = getElement();
                    return isForbiddenTag(current.parent().parent()) ? false : current.parent().parent();
                },

                getNextSibling = function(){
                    var current = getElement();
                    return current.next().length > 0 && !isForbiddenTag(current.next()) ? current.next() : false
                },

                getPreviousSibling = function(){
                    var previousSibling = getElement().prev();
                    return previousSibling.length > 0 && !isForbiddenTag(previousSibling) ? previousSibling : false
                },

                getFirstChild = function(){
                    var firstChild = getElement().children().first();
                    return firstChild.length > 0 ? firstChild : false;
                },

                move = {
                    "up":       function (current) {
                                    var grandParent = getGrandParent();
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
                                    if(move[dir]) {
                                        move[dir](current);
                                    }

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
                        current = getElement();
                    setElement(nextSibling.length > 0 ? nextSibling : current);
                },

                selectPreviousSibling = function() {
                    var previousSibling = getPreviousSibling(),
                        current = getElement();
                    setElement(previousSibling.length > 0 ? previousSibling : current);
                },

                getElementIdClasses = function (element, noDefault) {
                    var tagname = '',
                        id = '',
                        classes = '';

                    if (!noDefault && !element) {
                        element = getElement();
                    }

                    if (element) {
                        tagname = $(element).prop('tagName').toLowerCase();
                        id = $(element).attr('id') ? '#' + $(element).attr('id') : '';
                        classes = $(element)[0].className.replace('emvt_selected-element', '').length > 0
                            ? '.' + $(element)[0].className.replace(' emvt_selected-element', '').replace(/\s/g, '.')
                            : '';
                    }

                    return tagname + id + classes;
                },

                subSelectElement = new Subscribe.init('selectElement', selectElement);


            return {
                //setElement: setElement,
                getElement: getElement,
                getDomElement: getDomElement,
                selectParent: selectParent,
                selectFirstChild: selectFirstChild,
                selectNextSibling: selectNextSibling,
                selectPreviousSibling: selectPreviousSibling,
                getGrandParent: getGrandParent,
                getParent: getParent,
                getNextSibling: getNextSibling,
                getPreviousSibling: getPreviousSibling,
                getFirstChild: getFirstChild,
                getElementIdClasses: getElementIdClasses
            };
        })(emvt.Subscribe, emvt.variateDom);



        emvt.css = (function (currentElement) {
            var styles = [
                    ['dimensions', ['width', 'height']],
                    ['text', ['color', 'line-height', 'text-align', 'text-decoration', 'text-indent', 'text-transform', 'white-space']],
                    ['font', ['font-family', 'font-style', 'font-size', 'font-weight']],
                    ['background', ['background-color', 'background-image', 'background-repeat', 'background-attachment', 'background-position']],
                    ['positioning', ['position', 'top', 'right', 'bottom', 'left', 'z-index']],
                    ['floating', ['float', 'clear']],
                    ['appearance', ['display', 'visibility', 'opacity']],
                    ['margins', ['margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left']],
                    ['padding', ['padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left']],
                    ['borders', ['border', 'border-top', 'border-right', 'border-bottom', 'border-left']]
                ],

                //setStyles = function (style, index) {
                //    index > -1 ? styles.splice(index, 0, style) : styles.push(style);
                //},

                getStylesAndValues = function () {
                    var element = currentElement.getDomElement(),
                        computedStyles = window.getComputedStyle(element),
                        i,
                        j,
                        styleName;

                    for (i = 0; i < styles.length; i++) {
                        for (j = 0; j < styles[i][1].length; j++) {
                            styleName = styles[i][1][j].style || styles[i][1][j];
                            if (computedStyles[styleName]) {
                                styles[i][1][j] = {style: styleName, value: computedStyles[styleName]};
                            } else {
                                styles[i][1][j] = {style: styleName, value: ''};
                            }

                        }
                    }

                    return styles;
                }

                ;

            return {
                getStylesAndValues: getStylesAndValues
            };
        })(emvt.currentElement);

        emvt.ElementMenuUI = (function (Publish) {

            var menuItems = function (items) {
                    var i,
                        menuItems = '',
                        name,
                        value;

                    for (i = 0; i < items.length; i++) {
                        name = items[i].style;
                        value = items[i].value;
                        menuItems += 	'<li data-emvt-style="' + name + '" >' +
                        '<label for="' + name + '">' + name + ':</label>' +
                        '<input type="text" name="' + name + '" value="' + value + '">' +
                        '</li>';
                    }

                    return menuItems;
                },

                menuGroup = function (heading, collapsed, items) {
                    var mItems = menuItems(items),
                        inClass = collapsed === true ? '' : 'in',
                        groupId =  'emvt-menu-' + heading,
                        group = $('#' + groupId);

                        if (group.length > 0) {
                            inClass = group.hasClass('in') ? 'in' : '';
                        }

                    return  '<li class="dropdown-header" data-emvt="style-group">' + '' +
                                '<span data-toggle="collapse" data-target="#' + groupId + '">' + heading + '</span>' +
                                '<ul id="' + groupId + '" class="collapse ' + inClass + '">' +
                                    mItems +
                                '</ul>' +
                            '</li>';
                },

                menu = $('.variate-menu'),
                cssValues = '[data-emvt=style-group] input',


                pubMenuInputFocus = new Publish.init('menuInputFocus', 'focus', menu, {delegateElement: cssValues}),
                pubMenuInputKeyup = new Publish.init('menuInputKeyup', 'keyup', menu, {delegateElement: cssValues});
                //pubMenuInputChange = new Publish.init('menuInputChange', 'change', menu, {delegateElement: cssValues});

            return {
                menuGroup: menuGroup
            };
        })(emvt.Publish);

        emvt.ElementMenu = (function (currentElement, Subscribe, Publish, css, menuUI) {

            var displayStyles = function (element) {
                    var styles = css.getStylesAndValues(element),
                        menu = $('.variate-menu'),
                        i,
                        menuStyles = '';
                    for (i = 0; i < styles.length; i++){
                        menuStyles += menuUI.menuGroup(styles[i][0], true, styles[i][1]);
                    }

                    $('[data-emvt="style-group"]', '.variate-menu').remove();
                    menu.append(menuStyles);
                },

                selectElement = function(subscribeEvent, publishEvent, eventElement) {
                    var menu = $('.variate-menu'),
                        relative = $("li[data-emvt-relative]", menu),
                        move = $("li[data-emvt-element]", menu),
                        moveMap = {"current": "getElement", "moveUp": "getGrandParent", "moveDown": "getNextSibling", "moveLeft": "getPreviousSibling", "moveRight": "getNextSibling"},
                        i,
                        methodName,
                        id;

                    for (i = 0; i < relative.length; i++) {
                        methodName = $(relative[i]).data('emvt-relative').replace('select', 'get');
                        id = currentElement.getElementIdClasses(currentElement[methodName](), true);
                        $(relative[i]).find('.text').text(id);

                    }

                    for (i = 0; i < move.length; i++) {
                        methodName = $(move[i]).data('emvt-element');
                        methodName = moveMap[methodName];
                        id = currentElement.getElementIdClasses(currentElement[methodName](), true);
                        $(move[i]).find('.text').text(id);

                    }

                    displayStyles();
                },


                selectRelatedElement = $("li", '.variate-menu'),
                hoverMoveElement = $("li[data-emvt-element]", '.variate-menu'),
                hoverRelativeElement = $("li[data-emvt-relative]", '.variate-menu'),
                //selectRelatedElement = $("[data-emvt='menu-parent']"),

                subSelectElement = new Subscribe.init('selectElement', selectElement),

                pubSelectElement = new Publish.init('selectElement', 'click', selectRelatedElement),

                pubHoverElement = new Publish.init('overElement', 'mouseover', hoverMoveElement);
                pubHoverElement = new Publish.init('overElement', 'click', hoverMoveElement);

                pubHoverElement = new Publish.init('overElement', 'mouseover', hoverRelativeElement);
                pubHoverElement = new Publish.init('overElement', 'click', hoverRelativeElement);



            return {

            };

        })(emvt.currentElement, emvt.Subscribe, emvt.Publish, emvt.css, emvt.ElementMenuUI);



        emvt.variateJquery = (function (Subscribe, currentElement) {

            var element, property, value,

                setElement = function (elementObj) {
                    element = elementObj;
                },

                setProperty = function (cssProperty) {
                    property = cssProperty;
                },

                setValue = function (cssValue) {
                    value = cssValue;
                },

                getElement = function () {
                    return element;
                },

                getProperty = function () {
                    return property;
                },

                getValue = function () {
                    return value;
                },

                init = function (subscribeEvent, publishEvent, eventElement) {

                    setElement(currentElement.getElement());
                    setProperty(eventElement.name);
                    setValue(eventElement.value);

                },

                displayChange = function (cssValue) {
                    getElement().css(getProperty(), cssValue);
                },

                saveChange = function (cssValue) {
                    var jQueryText = "$('" + currentElement.getElementIdClasses() + "')" +
                                        ".css('" + getProperty() + "', '" + cssValue + "');";
                    console.log(jQueryText);
                },

                generate = function (subscribeEvent, publishEvent, eventElement) {
                    var editedValue = eventElement.value;
                    displayChange(editedValue);
                    saveChange(editedValue);
                },


            subMenuInputFocus = new Subscribe.init('menuInputFocus', init),
            subMenuInputKeyup = new Subscribe.init('menuInputKeyup', generate);
            //subMenuInputChange = new Subscribe.init('menuInputChange', generate);

        })(emvt.Subscribe, emvt.currentElement);

        emvt.EditedElement = function (elementIdClasses, cssProperty, cssValue) {
            // Use the unique id as a key
            this.elementIdClasses = elementIdClasses;
            this.cssProperty = cssProperty;
            this.cssValue = cssValue;
        };

        emvt.EditedElement.prototype.classMethod = function () {
            console.log(this.elementIdClasses);
        }

        var ee = new emvt.EditedElement('hello', 'world', '!');
        ee.classMethod();

    });
})();
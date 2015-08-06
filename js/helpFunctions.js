"use strict";
/**
 * [HelpFunction description]
 * Namensbereich für Hilfsmethoden
 */
function HelpFunction() {

}

/**
 * [description]
 * Staatische Methoden
 * @return {[type]} [description]
 */
(function() {
	// Schließt die Lightbox
	this.closeLightbox = function(e) {
		if(typeof e === "undefined")
		{
			document.getElementById("closeLightbox").click();
		}
		else if(e.target.className == "lightboxWrapper") {
			document.getElementById("closeLightbox").click();
		}
		return true;
	}


	this.merge = function(defaultObject, overWriteObject) {
		for (var prop in overWriteObject) {
		    defaultObject[prop] = overWriteObject[prop];
		}
		return defaultObject;
	}

	/**
	 * [toggleClassName description]
	 * Toggelt einen Klassenname auf einem Element
	 * @param  {[object]} ele        [description]
	 * Dom Element
	 * @param  {[boolean]} visbility  [description]
	 * Ob das Element aus oder eingeblendet werden soll
	 * @param  {[type]} toggleName [description]
	 * Name der Toggle Klasse
	 */
	this.toggleClassName = function(ele, visbility, toggleName) {
	    var className = ' ' + ele.className + ' ';

	    if (visbility == false && ~className.indexOf(' ' + toggleName + ' ') ) {
	        ele.className = className.replace(' ' + toggleName + ' ', ' ');
	    } 
	    else if(visbility == true){
	        ele.className += ' ' + toggleName;
	    }
	}

	/**
	 * [getRandomInt description]
	 * @param  {[int]} min [description]
	 * Minimum Wert
	 * @param  {[int]} max [description]
	 * Maximal Wert
	 * @return {[int]}     [description]
	 * Zufälliger Wert
	 */
	this.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * [readForm description]
	 * Wird über call und der Form aufgerufen. Liest alle Felder der Form aus und gibt sie in einem Object mit einsprechenden Namen der Inputs zurück
	 * @return {[object]} [description]
	 */
	this.readForm = function () {
        var inputs = this.getElementsByTagName("input");
        var fields = {};
        for (var i = 0; i < inputs.length; i++) {
            fields[inputs[i].name] = inputs[i].value;
        };

        var selects = this.getElementsByTagName("select");
        for (var i = 0; i < selects.length; i++) {
            fields[selects[i].name] = selects[i].value;
        };

        var textareas = this.getElementsByTagName("textarea");
        for (var i = 0; i < textareas.length; i++) {
            fields[textareas[i].name] = textareas[i].value;
        };
        //this.reset();
        return fields;
    }

}).call(HelpFunction);


/**
 * Fallback für ältere Browser bei Request Animation Frame
 */
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
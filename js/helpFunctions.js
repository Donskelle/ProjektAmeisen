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
	/**
	 * [getProcentValue description]
	 * @param  {[type]} min     [description]
	 * @param  {[type]} max     [description]
	 * @param  {[type]} procent [description]
	 * @return {[type]}         [description]
	 */
	this.getProcentValue = function(min, max, procent){
		var intValue = max-min;
		if (procent > 100) {
			procent = 100;
		};
		intValue = Math.floor((intValue * procent / 100) + min);

		return intValue;
	}


	/**
	 * [closeLightbox description]
	 * Schließt alle geöffneten Lightboxes
	 * Die Lightboxes werden über die Pseudo Klasse :target geöffnet. Wenn diese nun geöffnet sind,
	 * wird ein Klick auf einem anderem Element ausgeführt und so die Lightbox geschlossen.
	 */
	this.closeLightbox = function(e) {
		// Kein Event
		if(typeof e === "undefined")
		{
			document.getElementById("closeLightbox").click();
		}
		// Durch Event ausgelöst. Prüfen ob das rictige Element ausgewählt wurde
		else if(e.target.className == "lightboxWrapper") {
			document.getElementById("closeLightbox").click();
		}
		return true;
	}

	/**
	 * [pushEvent description]
	 * Érstellt ein "Ant" Event auf dem Canvas
	 * @param  {[type]} action [description]
	 * string identifier für auszuführende Aktion
	 * @param  {[type]} data   [description]
	 * object daten die übermittelt werden sollen
	 */
	this.pushEvent = function(action, data) {

		var buildEvent = new CustomEvent(
			'ant', 
			{
				'detail': 
				{
					'action': action,
					'eventData' : data
				}
			}
		);

		zid("canvas").dispatchEvent(buildEvent);
	}

	/**
	 * [merge description]
	 * Verbindet 2. Objecte. Alle Einträge aus dem overWriteObject werden ins 1. Object kopiert.
	 * Elemente werden kopiert. Keine Referenz
	 * @param  {[type]} defaultObject   [description]
	 * Das zu bearbeitende Objekt
	 * @param  {[type]} overWriteObject [description]
	 * Das zu kopierende Objekt
	 * @return {[type]}                 [description]
	 * Der erweiterte 1. Parameter
	 */
	this.merge = function(defaultObject, overWriteObject) {
		for (var prop in overWriteObject) {
		    defaultObject[prop] = overWriteObject[prop];
		}
		return defaultObject;
	}

	
	this.clone = function(obj) {
		return JSON.parse(JSON.stringify(obj));
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


    this.getConnectedBuildingsLevelByType = function(buildingTypes, buildedBuildings, type) {
		var level = 0;

		for (var i = 0; i < buildingTypes[type].buildedBuildings.length; i++) {
			if(buildedBuildings[buildingTypes[type].buildedBuildings[i]].connected == true) {
				level += buildedBuildings[buildingTypes[type].buildedBuildings[i]].lvl;
			}
		};

		return level;
	}

	this.getConnectedBuildingsCountByType = function(buildingTypes, buildedBuildings, type) {
		var count = 0;

		for (var i = 0; i < buildingTypes[type].buildedBuildings.length; i++) {
			if(buildedBuildings[buildingTypes[type].buildedBuildings[i]].connected == true)
				count++;
		};


		return count;
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

/**
 * Fallback für ältere Browser bei date.now()
 */
if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}
function menuBarDragger (ele, sub) {
	var offsetLeft = 0;
	var offsetTop = 0;
	var timerId = null;
	var visible = true;
	var startClick = 0;

	var click = {
		x : null,
		y : null
	};

	(function init() {
		ele.parentNode.style.position = 'absolute';

		ele.addEventListener('mousedown', mouseDown, false);
		window.addEventListener('mouseup', mouseUp, false);

		// Fix für Faltmenu
		// Größe würde sich verkleiner
		ele.style.width = ele.parentNode.offsetWidth + "px";
		if(typeof sub != "undefined"){
			var subVisible = true;
			sub.addEventListener("click", function (e) {
				if(subVisible) {
					sub.parentNode.querySelector(".subHideContent").style.display = "none";
					HelpFunction.toggleClassName(sub, false, "visible");
					subVisible = false;
				}
				else {
					sub.parentNode.querySelector(".subHideContent").style.display = "block";
					HelpFunction.toggleClassName(sub, true, "visible");
					subVisible = true;
					divMove();
				}
			})
		}
	})();

	function mouseUp()
	{
	    window.removeEventListener('mousemove', newMousePos, true);
	    if(timerId != null){
	    	window.cancelAnimationFrame(timerId);
	  		timerId = null;
	    }

	    if((Date.now() - startClick) <= 250)
			changeDisplayContent();
	}

	function changeDisplayContent() {
		if(visible) {
			ele.parentNode.querySelector(".hideContent").style.display = "none";
			HelpFunction.toggleClassName(ele.parentNode, false, "visible");
			visible = false;
		}
		else {
			ele.parentNode.querySelector(".hideContent").style.display = "block";
			HelpFunction.toggleClassName(ele.parentNode, true, "visible");
			visible = true;
			// Prüfen ob dadurch angeschlagen
			divMove();
		}
	}

	function mouseDown(e) 
	{
		startClick = Date.now();

		offsetTop = (ele.parentNode.offsetTop - e.clientY );
		offsetLeft = (ele.parentNode.offsetLeft - e.clientX );
		newMousePos(e);

		// Eine Aktualisierugn des Views (der Dom) bei mousemove ist unglücklich, da es sehr häufig aufgerufen werden kann
		// Deshalb wird beim Mousemove Event lediglich die Position der Maus gespeichert und in einer anderen Loop, welche sich der Geschwindigkeit des Geräts anpasst,
		// die View aktualisiert.
		timerId = window.requestAnimationFrame(divMove);
		window.addEventListener('mousemove', newMousePos, true);
	}

	function newMousePos(e) {
		click.x = e.clientX;
  		click.y = e.clientY;

  		// Kein Makieren von Texten bei Bewegung
  		e.preventDefault();
	}

	function divMove(){
		var values = {
			x: 0,
			y: 0
		};

		// Oben angeschlagen 
		if(click.y + offsetTop <= 20) {
			values.y = 0
		}
		// Unten angeschlagen
		else if ( (window.innerHeight - (click.y + offsetTop + ele.parentNode.offsetHeight)) <= 20){
			values.y = window.innerHeight - ele.parentNode.offsetHeight;
		}
		else {
			values.y = (click.y + offsetTop);
		}

		// Links angeschlagen
		if(click.x + offsetLeft <= 20){
			values.x = 0;
		}
		// Rechts angeschlagen
		else if( (window.innerWidth - (click.x + offsetLeft + ele.parentNode.offsetWidth)) <= 20 ){
			values.x = window.innerWidth - ele.parentNode.offsetWidth;
		}
		else {
			values.x = (click.x + offsetLeft);
		}


		ele.parentNode.style.top = values.y + 'px';
		ele.parentNode.style.left = values.x + 'px';


		timerId = window.requestAnimationFrame(divMove);
	}
}
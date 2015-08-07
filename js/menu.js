function menuBarDragger (ele) {
	var offsetLeft = 0;
	var offsetTop = 0;
	var timerId = null;
	var click = {
		x : null,
		y : null
	};

	(function init() {
		ele.parentNode.style.position = 'absolute';

		ele.addEventListener('mousedown', mouseDown, false);
		window.addEventListener('mouseup', mouseUp, false);
	})();

	function mouseUp()
	{
	    window.removeEventListener('mousemove', newMousePos, true);
	    if(timerId != null){
	    	window.cancelAnimationFrame(timerId);
	  		timerId = null;
	    }
	}

	function mouseDown(e){
	  offsetTop = (ele.parentNode.offsetTop - e.clientY );
	  offsetLeft = (ele.parentNode.offsetLeft - e.clientX ) ;
	  newMousePos(e);

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
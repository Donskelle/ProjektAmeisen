
window.addEventListener('load', init);

function init(){

	
	
	// Menu Bars verschiebar machen
	var bars = document.querySelectorAll(".handle");
	for (var i = bars.length - 1; i >= 0; i--) {
		new menuBarDragger(bars[i]);
	};

	// Lightbox schließen via Klick auf Rand
	var bars = document.querySelectorAll(".handle");
	var width = 0;
	for (var i = 0; i < bars.length; i++) {
		bars[i].parentNode.style.left = width + "px";
		width += bars[i].parentNode.offsetWidth + 3;
		new menuBarDragger(bars[i]);
	};


	// Url zeile auf Handy entfernen
	setTimeout(function() {window.scrollTo(0, 1);}, 100); 

	zid("btn_toggleMenu").style.display = "none";
	// Start gedrückt 
	zid("gameStart").addEventListener("click", function(e) {
		zid("btn_toggleMenu").style.display = "block";
		zid("btn_toggleMenu").click();

		var stage = new AmeisenStage({});
	});
}
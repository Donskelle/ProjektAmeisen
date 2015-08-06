
window.addEventListener('load', init);

function init(){

	var stage = new AmeisenStage({});
	
	// Url zeile auf Handy entfernen
	setTimeout(function() {window.scrollTo(0, 1);}, 100); 
}
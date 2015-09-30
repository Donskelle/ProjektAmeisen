
window.addEventListener('load', init);

function init() {
	// Url zeile auf Handy entfernen
	setTimeout(function() {window.scrollTo(0, 1);}, 100); 

	new AntGame({});
}
/**
 * [amaeisenStage description]
 * Der eigentliche Controller, welcher die Kommunikation zwischen den Klassen abbildet.
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function AmeisenStage(_options) {
	var options = {
		canvas: "canvas",
		canvasConnector: "connector",
		wrapperBuildMenu: "",
		forms: {	
			dumpingBuild: "dumpingBuild",
			pantryBuild: "pantryBuild",
			storageBuild: "storageBuild",
			broodBuild: "broodBuild",
			mushroomBuild: "mushroomBuild"	
		}
	};
	var builder,canvasBuilder, tester;

	function init() {
		var that = this;
		canvasResize();
		options = HelpFunction.merge(options, _options);

		canvasBuilder = new Canvas(
			options
		);

		tester = new test(
			options
		);

		zid("canvas").addEventListener("ant", function(e) 
		{
			switch(e.detail.action)
			{
				// Gebäude wird gebaut
				case "buildBuilding": 
					canvasBuilder.createBuilding(e.detail.typeId);
					break;
				// Upgrade wird angefragt
				case 2: 
					
					break;
				case 3:
				
					break;
				case 4:
				
					break;
				case 5:
				
					break;
			}

			
		});


		/**
         * Alle lightboxWrapper Klassen werden mit einem Click oder Touch Listener belegt,
         * um bei offener Lightbox auch durch Berührung des dunklen Feldes die Lightbox zu schließen.
         * Lightbox bei Canvas erstellen oder Gruppe erstellen
         */
        var lightboxWrapper = document.querySelectorAll(".lightboxWrapper");
        for (var i = lightboxWrapper.length - 1; i >= 0; i--) {
            lightboxWrapper[i].addEventListener("click", HelpFunction.closeLightbox);
        };
	}

	var canvasResize = function() {
		var canv = zid(options.canvas);
		canv.style.width = window.innerWidth + "px";
		canv.style.height = window.innerHeight + "px";
		canv.height = window.innerHeight;
		canv.width = window.innerWidth;
	}


	init();
}
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
	var builder,canvasBuilder, tester, disasters;

	function init() {
		var that = this;
		canvasResize();
		options = HelpFunction.merge(options, _options);


		tester = new test(
			options
		);

		canvasBuilder = new Canvas(
			options
		);

		disasters = new NaturalDisasters();

		initController();

		canvasBuilder.createDefaults();


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

	function initController() {
		zid("canvas").addEventListener("ant", function(e) 
		{
			console.log("event erhalten");
			switch(e.detail.action)
			{
				// Gebäude wird gebaut
				case "buildBuilding": 
					canvasBuilder.createBuilding(e.detail.eventData.typeId);
					break;

				// Upgrade Kosten werden angefragt
				case "getUpgradeCosts": 
				
					var costs = tester.getUpgradeCots(e.detail.eventData.buildingId);

					canvasBuilder.setUpgradeCosts(e.detail.eventData.buildingId, costs, e.detail.eventData.updateView);
					break;

				// Upgrade wird angefragt
				case "requestUpdate":
					var updated = tester.requestUpdate(e.detail.eventData.buildingId);
					if(updated) {
						canvasBuilder.upgradeBuilding(e.detail.eventData.buildingId);
						

						HelpFunction.pushEvent("getUpgradeCosts", {
							'buildingId': e.detail.eventData.buildingId,
							'updateView': true
						});
					}
					else {
						alert("Upgrade konnte nicht durchgeführt werden");
					}
					break;

				//
				case 4:
				
					break;

				//
				case 5:
				
					break;
			}

			
		});
	}


	init();
}
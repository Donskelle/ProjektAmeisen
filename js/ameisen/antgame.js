/**
 * [AntGame description]
 * Der eigentliche Controller, welcher die Kommunikation zwischen den Klassen abbildet.
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function AntGame(_options) {
	/**
	 * [options description]
	 * Die standart Optionen
	 */
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
	var builder,canvasBuilder, game;

	/**
	 * [init description]
	 * Initzialisiert das Spiel. Diese Function wird automatisch aufgerufen, sobald das Objekt erstellt wurde.
	 */
	function init() {
		var that = this;
		options = HelpFunction.merge(options, _options);
		new layout(options);
		new backgroundPlayer();

		/**
		 * Klick Listener zum Starten des Spiels anlegen
		 */
		var gameStarted = false;
		zid("btn_toggleMenu").addEventListener("click", function(e) {
			if(gameStarted == false){
				startGame();
				gameStarted = true;
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

	/**
	 * [startGame description]
	 * Spiel wird gestartet
	 * @return {[type]} [description]
	 */
	function startGame() {

		game = new GameLoop(
			options
		);

		canvasBuilder = new Canvas(
			options
		);

		var incidentClass = new incidents();

		/**
		 * Hier findet die Kommunikation zwischen den Klassen statt.
		 */
		initController();
	}


	function initController() {
		zid("canvas").addEventListener("ant", function(e) 
		{
			switch(e.detail.action)
			{
				// Gebäude wird gebaut
				case "buildBuilding": 
					canvasBuilder.createBuilding(e.detail.eventData.typeId);
					break;

				// Upgrade Kosten werden angefragt
				case "getUpgradeCosts": 
					var costs = game.getUpgradeCots(e.detail.eventData.buildingId);

					canvasBuilder.setUpgradeCosts(e.detail.eventData.buildingId, costs, e.detail.eventData.updateView);
					break;

				// Upgrade wird angefragt
				case "requestUpdate":
					var updated = game.requestUpdate(e.detail.eventData.buildingId);
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

				// Katastrophe ausgebrochen
				case "incident":
					var values = e.detail.eventData.calculateFunction(game.getCurrentValues());
					game.setValues(values);
					break;

				// Gebäude nicht mehr verbunden
				case "buidlingDisconnected":
					game.disconnectBuilding(e.detail.eventData);
					break;
				
				// Gebäude verbunden
				case "buidlingConnected":
					game.connectBuilding(e.detail.eventData);
					break;
			}
		});
	}

	init();
}
function NaturalDisasters() {
	var disastersTypes = [
		{
			'name': 'Ameisen verschwunden',
			'description': '1/3 deiner Ameisen ist verschwunden. Sie sind nicht zu ihrem Lager zurück gegommen.',
			'image': 'http://img4.wikia.nocookie.net/__cb20140909155820/creepypasta/de/images/3/34/Atompilz.jpg',
			'calculateFunction': function(values) {
				values.antCount = values.antCount / 3 * 2;
				console.log(values);
			}
		},
		{
			'name': 'Ameisen Schub',
			'description': 'Deiner Königin geht es aktuell wirklich gut. Du erhälst 5 neue Ameisen.',
			'image': 'http://img4.wikia.nocookie.net/__cb20140909155820/creepypasta/de/images/3/34/Atompilz.jpg',
			'calculateFunction': function(values) {
				values.antCount += 5;
				console.log(values);
				return values;
			}
		},
		{
			'name': 'Ameisen Schub',
			'description': 'Deiner Königin geht es aktuell wirklich gut. Du erhälst 5 neue Ameisen.',
			'image': 'http://img4.wikia.nocookie.net/__cb20140909155820/creepypasta/de/images/3/34/Atompilz.jpg',
			'calculateFunction': function(values) {
				values.antCount += 5;
				console.log(values);
				return values;
			}
		}
	];

	(function init(){

		window.setTimeout(randomDisasters, 120000);
	})();

	function randomDisasters() {
		/**
		 * 30 % Chance -> Zeit(ms) * 10 / 3 = Durschnittszeit
		 */
		switch (HelpFunction.getRandomInt(0,10))
		{
			case 0: 
				console.log("Disaster 1");
				showDisaster(0);

				HelpFunction.pushEvent("disaster", {
					'calculateFunction': disastersTypes[0].calculateFunction
				});
				break;
			case 1: 
				console.log("Disaster 2");
				showDisaster(1);
				HelpFunction.pushEvent("disaster", {
					'calculateFunction': disastersTypes[1].calculateFunction
				});
				break;
			case 2: 
				console.log("Disaster 3");
				showDisaster(2);

				HelpFunction.pushEvent("disaster", {
					'calculateFunction': disastersTypes[2].calculateFunction
				});
				break;
			default: 
				console.log("Kein Event");

				break;
		}
		window.setTimeout(randomDisasters, 120000);
	}


	function showDisaster(type) {
		var desaster = disastersTypes[type];

		zid("naturalDisasterTitle").innerHTML = desaster.name;
		zid("naturalDisasterImage").src = desaster.image;
		zid("naturalDisasterText").innerHTML = desaster.description;

		//öffnet Lightbox
		zid("openLightboxNaturalDisasterView").click();
	}
}
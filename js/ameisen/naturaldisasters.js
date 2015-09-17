function NaturalDisasters() {
	var disastersTypes = [
		{
			'name': 'Ameisen verschwunden',
			'description': 'Ein paar deiner Ameisen ist verschwunden. Sie sind nicht in dein Lager zurück gekommen.',
			'image': 'http://img4.wikia.nocookie.net/__cb20140909155820/creepypasta/de/images/3/34/Atompilz.jpg',
			'calculateFunction': function(values) {
				values.antCount = Math.floor(values.antCount / 3 * 2) + 1;
				return values;
			}
		},
		{
			'name': 'Ameisen Schub',
			'description': 'Deiner Königin geht es aktuell wirklich gut. Du erhälst 5 neue Ameisen.',
			'image': 'http://img4.wikia.nocookie.net/__cb20140909155820/creepypasta/de/images/3/34/Atompilz.jpg',
			'calculateFunction': function(values) {
				values.antCount += 5;
				return values;
			}
		},
		{
			'name': 'Vorräte wurde gestohlen',
			'description': 'Eine deiner Arbeitin endeckte, das viele deiner Vorräte geplündert wurden.',
			'image': 'http://img4.wikia.nocookie.net/__cb20140909155820/creepypasta/de/images/3/34/Atompilz.jpg',
			'calculateFunction': function(values) {
				values.resources.leafs = Math.floor(values.resources.leafs / 2);
				values.resources.stone -= Math.floor(values.resources.leafs / 2);
				values.resources.food -= Math.floor(values.resources.leafs / 2);
				return values;
			}
		},
		{
			'name': 'Schlechte Ausbaute',
			'description': 'Viele deiner Blätter sind leider nicht brauchbar und werden aus deinem Lager entfernt.',
			'image': 'http://img4.wikia.nocookie.net/__cb20140909155820/creepypasta/de/images/3/34/Atompilz.jpg',
			'calculateFunction': function(values) {
				values.resources.leafs -= 15;
				return values;
			}
		},
		{
			'name': 'Rohstoff Schub',
			'description': 'Deine Ameisen haben ein leeres Ameisenlager in der Nähe gefunden und füllen damit all deine Rohstoff aufs Maximum auf.',
			'image': 'http://img4.wikia.nocookie.net/__cb20140909155820/creepypasta/de/images/3/34/Atompilz.jpg',
			'calculateFunction': function(values) {
				// 2147483647 = Safe Max Int
				values.resources.leafs = Number.MAX_VALUE;
				values.resources.stone = Number.MAX_VALUE;
				values.resources.food = Number.MAX_VALUE;
				return values;
			}
		}
	];

	(function init(){

		window.setTimeout(randomDisasters, 120000);
	})();

	function randomDisasters() {
		/**
		 * 50 % Chance -> Zeit(ms) * 10 / 5 = Durschnittszeit
		 */
		switch (HelpFunction.getRandomInt(0,10))
		{
			case 0: 
				showDisaster(0);

				HelpFunction.pushEvent("disaster", {
					'calculateFunction': disastersTypes[0].calculateFunction
				});
				break;
			case 1: 
				showDisaster(1);
				HelpFunction.pushEvent("disaster", {
					'calculateFunction': disastersTypes[1].calculateFunction
				});
				break;
			case 2: 
				showDisaster(2);

				HelpFunction.pushEvent("disaster", {
					'calculateFunction': disastersTypes[2].calculateFunction
				});
				break;
			case 3: 
				showDisaster(3);

				HelpFunction.pushEvent("disaster", {
					'calculateFunction': disastersTypes[3].calculateFunction
				});
				break;
			case 4: 
				showDisaster(4);

				HelpFunction.pushEvent("disaster", {
					'calculateFunction': disastersTypes[4].calculateFunction
				});
				break;
			default: 
				//console.log("Kein Event");
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
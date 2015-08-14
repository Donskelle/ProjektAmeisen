function NaturalDisasters() {

	{
		test
	}

	var disastersTypes = [
		{
			'name': 'Disaster 1',
			'description': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
			'image': 'http://img4.wikia.nocookie.net/__cb20140909155820/creepypasta/de/images/3/34/Atompilz.jpg',
			'calculateFunction': function() {alert("hi")}
		},
		{
			'name': 'Disaster 2',
			'description': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
			'image': 'http://img4.wikia.nocookie.net/__cb20140909155820/creepypasta/de/images/3/34/Atompilz.jpg',
			'calculateFunction': function() {alert("hi")}
		},
		{
			'name': 'Disaster 3',
			'description': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
			'image': 'http://img4.wikia.nocookie.net/__cb20140909155820/creepypasta/de/images/3/34/Atompilz.jpg',
			'calculateFunction': function() {alert("hi")}
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
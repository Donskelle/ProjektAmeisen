/**
 * [incidents description]
 * Incidents Klasse dient zur Erstellung von Ereignissen, welche Zufällig ausgelöst werden.
 * @return {[type]} [description]
 */
function incidents() {
	var incidentTimeout = 120000;

	var incidentTypes = [
		{
			'name': 'Ameisen verschwunden',
			'description': 'Ein paar deiner Ameisen sind verschwunden. Sie sind nicht in dein Lager zurückgekommen.',
			'image': 'img/icons/Achtung-01.png',
			'calculateFunction': function(values) {
				var removedAnts = 0;

				var antCount = values.ants.unemployed;
				antCount += values.ants.jobLeaf;
				antCount += values.ants.jobStone;
				antCount += values.ants.jobHunt;
				antCount += values.ants.jobHatch;
				antCount += values.ants.jobClean;

				// 1/3 Der Ameisen wird entfernt
				var newAntCount = Math.floor(antCount / 3 * 2) + 1;
				var antsToRemove = antCount - newAntCount;

				for (var job in values.ants) {
					values.ants[job] = removeAntsFromAnts(values.ants[job]);
				}

				function removeAntsFromAnts(jobCount) {
					// Wenn fertig
					if(removedAnts == antsToRemove) {
						return jobCount;
					}
					// Wenn zuviele Angezogen würden
					if(removedAnts + jobCount > antsToRemove){
						jobCount -= antsToRemove - removedAnts;
						return jobCount;
					}
					// Ameisen abziehen
					else {
						removedAnts += jobCount;
						return 0;
					}
				}
				return values;
			}
		},
		{
			'name': 'Geburtenglück',
			'description': 'Deiner Königin geht es aktuell wirklich gut. Du erhälst 5 neue Ameisen.',
			'image': 'img/icons/AchtungGut-01.png',
			'calculateFunction': function(values) {
				values.ants.unemployed += 5;
				return values;
			}
		},
		{
			'name': 'Vorräte wurden gestohlen',
			'description': 'Eine deiner Arbeitin entdeckte, dass viele deiner Vorräte geplündert wurden.',
			'image': 'img/icons/Achtung-01.png',
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
			'image': 'img/icons/Achtung-01.png',
			'calculateFunction': function(values) {
				values.resources.leafs -= 15;
				return values;
			}
		},
		{
			'name': 'Rohstoff Schub',
			'description': 'Deine Ameisen haben ein leeres Ameisenlager in der Nähe gefunden und füllen damit all deine Rohstoff aufs Maximum auf.',
			'image': 'img/icons/AchtungGut-01.png',
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

		window.setTimeout(randomIncident, incidentTimeout);
	})();

	/**
	 * [randomIncident description]
	 * Diese Funktion wird entsprechend des incidentTimers ausgeführt und löst in 50% der Fälle ein Ereiggnis aus. 
	 * Die Ereignisse können sowohl positiv und Negativ sein
	 */
	function randomIncident() {
		/**
		 * 50 % Chance -> Zeit(ms) * 10 / 5 = Durschnittszeit
		 */
		var incidentTypeInt = HelpFunction.getRandomInt(0,10);
		switch (incidentTypeInt)
		{
			case 0: 
				showIncident(incidentTypeInt);

				HelpFunction.pushEvent("incident", {
					'calculateFunction': incidentTypes[incidentTypeInt].calculateFunction
				});
				break;
			case 1: 
				showIncident(incidentTypeInt);

				HelpFunction.pushEvent("incident", {
					'calculateFunction': incidentTypes[incidentTypeInt].calculateFunction
				});
				break;
			case 2: 
				showIncident(incidentTypeInt);

				HelpFunction.pushEvent("incident", {
					'calculateFunction': incidentTypes[incidentTypeInt].calculateFunction
				});
				break;
			case 3: 
				showIncident(incidentTypeInt);

				HelpFunction.pushEvent("incident", {
					'calculateFunction': incidentTypes[incidentTypeInt].calculateFunction
				});
				break;
			case 4: 
				showIncident(incidentTypeInt);

				HelpFunction.pushEvent("incident", {
					'calculateFunction': incidentTypes[incidentTypeInt].calculateFunction
				});
				break;
			default: 
				// Kein Auslösen
				break;
		}

		window.setTimeout(randomIncident, incidentTimeout);
	}

	/**
	 * [showIncident description]
	 * Stellt ein Ereignis des übergebenen Typs da.
	 * @param  {[number]} type [description]
	 * Type des Ereignisses
	 */
	function showIncident(type) {
		var incident = incidentTypes[type];

		zid("incidentTitle").innerHTML = incident.name;
		zid("incidentImage").src = incident.image;
		zid("incidentText").innerHTML = incident.description;

		//öffnet Lightbox
		zid("openLightboxincidentView").click();


		// resize
		window.setTimeout(function() {
			var height = zid("incidentViewContent").clientHeight || zid("incidentViewContent").offsetHeight;
				zid("incidentViewContentBG").style.height = height + "px";
		}, 10);
		
	}
}
/**
 * [Canvas description]
 * Einzige Klasse, welche auf dem Canvas mahlt. Außerdem werden die Erstellten Gebüude gespeichert.
 * Der eigentliche Bauprozess wird, wird in "test" durchgeführt.
 * @param {[object]} _options [description]
 */
function Canvas(_options) {
	var self = this;

	var stage;
	var ctx;
	var stageW;
	var stageH;
	var preload;
	var progress;
	var options;
	var bounds;
	var eles = new Array();
	var connections = new Array();

	var buidlingsTypes = [
		{
			name: "Brutkammer",
			images: [
				"img/buildings/Brutkammer-01.png",
				"img/buildings/Brutkammer-02.png",
				"img/buildings/Brutkammer-03.png",
				"img/buildings/Brutkammer-04.png"
			],
			lvl: 1,
			text: "Durch ein Upgrade der Brutkammer, erhöhst du die Anzahl der Ameisen, die du bauen kannst. Alle 5 Upgradestufen erhählst du eine zusätzliche Warteschlangenposition.",
			costs: {
				leafs: null,
		    	stone: null,
		    	food: null
			}
		},
		{
			name: "Pilzkammer",
			images: [
				"img/buildings/Pilzkammer-01.png",
				"img/buildings/Pilzkammer-02.png",
				"img/buildings/Pilzkammer-03.png",
				"img/buildings/Pilzkammer-04.png"
			],
			lvl: 1,
			text: "Die Pilzkammer wandelt Blätter in Nahrung um. Jede Upgradestufe erhöht die Anzahl der Blätter, welche zum Produzieren von Nahrung genutzt wird.",
			costs: {
				leafs: null,
		    	stone: null,
		    	food: null
			}
		},
		{
			name: "Lager",
			images: [
				"img/buildings/Rohstofflager-01.png",
				"img/buildings/Rohstofflager-02.png",
				"img/buildings/Rohstofflager-03.png",
				"img/buildings/Rohstofflager-04.png"
			],
			lvl: 1,
			text: "Im Lager werden deine Baumaterialien gespeichert, also Blätter und Steine. Je höher die Ausbaustufe, desto mehr Einheiten können gelagert werden.",
			costs: {
				leafs: null,
		    	stone: null,
		    	food: null
			}
		},
		{
			name: "Speisekammer",
			images: [
				"img/buildings/Vorratskammer-01.png",
				"img/buildings/Vorratskammer-02.png",
				"img/buildings/Vorratskammer-03.png",
				"img/buildings/Vorratskammer-04.png"
			],
			lvl: 1,
			text: "Hier werden Nahrungsmittel gelagert, die der Pilz produziert oder deine Arbeiterinnen bei der Jagt erbeutet haben. Auch hier bestimmt die Ausbaustufe die Größe des Speichers.",
			costs: {
				leafs: null,
		    	stone: null,
		    	food: null
			}
		},
		{
			name: "Deponie",
			images: [
				"img/buildings/Deponie-01.png",
				"img/buildings/Deponie-02.png",
				"img/buildings/Deponie-03.png",
				"img/buildings/Deponie-04.png"
			],
			lvl: 1,
			text: "Dies ist der Ort wo Abfälle, die dein Volk produziert, entsorgt werden. Dazu zählen tote Ameisen, verdorbene Nahrungsreste und die Notdurft deines Volkes. Je höher die Kammer ausgebaut ist, desto mehr Platz bietet sie und desto schneller wird der Abfall abgebaut.",
			costs: {
				leafs: null,
		    	stone: null,
		    	food: null
			}
		},
		{
			name: "Start",
			images: [
				"img/buildings/Deponie-01.png",
				"img/buildings/Deponie-02.png",
				"img/buildings/Deponie-03.png",
				"img/buildings/Deponie-04.png"
			],
			lvl: 1,
			text: "In diesem Gebäude lebt deine Königin.",
			costs: {
				leafs: 2,
		    	stone: 2,
		    	food: 2
			}
		}
	]


	/**
	 * [init description]
	 * Wird deim Erstellen des Objekts ausgeführt. 
	 * 
	 * @return {[type]} [description]
	 */
	function init() {
		options = _options;
		var canv = zid(options.canvas);
		
		stageW = window.innerWidth;
		stageH = window.innerHeight;

		// In diesem Rectangle dürfen sich die Gebäude bewegen
		bounds = new createjs.Rectangle(
		 	50,
			50,
			stageW - 100,
			stageH - 100
		);

		stage = new createjs.Stage(options.canvas);

		// Mouseover aktivieren
		stage.enableMouseOver(10);

		// Für Touch
		createjs.Touch.enable(stage, true);

		// Upgrade eines Gebäudes
		zid("buildingUpgradeViewForm").addEventListener("submit", function(e) {
			var fields = HelpFunction.readForm.apply(zid("buildingUpgradeViewForm"));
	
			HelpFunction.pushEvent("requestUpdate", {
				'buildingId': parseInt(fields.buildingId)
			});

			e.preventDefault();
		});
		// Startgebäude
		new Building(5, 0);
	}

	/**
	 * [createBuilding description]
	 * Erstellt eine Instanz des Objects Building und fragt die Upgradekosten ab. 
	 * @param  {[number]} type [description]
	 */
	this.createBuilding = function(type) {
		var i = eles.length;
		new Building((type-1), i);
		stage.update();
		
		HelpFunction.pushEvent("getUpgradeCosts", {
			'buildingId': i,
			'updateView': false
		});
	}

	/**
	 * [upgradeBuilding description]
	 * Public Mehtode für das Upgrade eines Gebäudes
	 * @param  {[number]} id [description]
	 * Die Id des Gebäudes
	 */
	this.upgradeBuilding = function(id) {
		eles[id].upgradeBuilding();
	}

	/**
	 * [setUpgradeCosts description]
	 * Public Mehtode um die Upgrade Kosten eines Geäudes festzulegen
	 * @param {[number]} id         [description]
	 * Id des Gebäudes
	 * @param {[object]} costs      [description]
	 * Object mit allen Werten
	 */
	this.setUpgradeCosts = function(id, costs, updateView) {
		eles[id].setUpgradeCost(costs);
		if(updateView)
			showInfoBox(id);
	}

	/**
	 * [Building description]
	 * Erstellt ein Shape Object zur Darstellung eines Gebäudes
	 * @param {[number]} type [description]
	 * Art des Gebäudes
	 * @param {[number]} i    [description]
	 * Index im Ele Array. Hier wird es eingefügt
	 */
	function Building(type, i) {
		(function init() {
			var c = new createjs.Shape();
			var bitmapC = new createjs.Bitmap();
			var g = c.graphics;
			var number = i; 

			c.buildingData = {}
			c.buildingData = HelpFunction.clone(buidlingsTypes[type]);
			c.connector = new Array();


			c.x = window.innerWidth/2 + ((i * 15) - 50);
			c.y = window.innerHeight/2 + ((i * 15) - 50);

			c.radius = HelpFunction.getProcentValue(25, 65, c.buildingData.lvl);


			g.f("#000").dc(0,0,c.radius);
			c.setBounds(-c.radius, -c.radius, c.radius*2, c.radius*2);


			eles[i] = c;

			
			addDrag(c);
			stage.addChild(c);
			// Startverbindunge nach oben
			if(type == 5) {
				var connector = createConnector(i, "top");
				eles[i].topConnector = connector;

				eles[i].on("pressmove", function(e) 
				{
					connector.updateLine();
				});
			}


			var image = new Image();
			switch(type)
			{
				// Brood
				case 0: 
					image.src = "img/icons/buildings/Brutkammer-01.png";
					break;
				// Mush
				case 1: 
					image.src = "img/icons/buildings/Pilzkammer-01.png";
					break;
				// Storage
				case 2: 
					image.src = "img/icons/buildings/Lager-01.png";
					break;
				// Pantry
				case 3: 
					image.src = "img/icons/buildings/Speisekammer-01.png";
					break;
				// Dumping
				case 4: 
					image.src = "img/icons/buildings/Deponie-01.png";
					break;
				// Startegebäude
				case 5: 
					image.src = "img/icons/buildings/Thronsaal-01.png";
					break;
			}
			image.onload = handleImageLoad;

			/**
			 * [addHitTest description]
			 * @param {[type]} i [description]
			 * @param {[type]} j [description]
			 */
			c.addHitTest = function (i, j) {
				createHitTest(i,j);
			}
			/**
			 * [upgradeBuilding description]
			 * @return {[type]} [description]
			 */
			c.upgradeBuilding = function() {
				this.buildingData.lvl += 1;
				this.radius = HelpFunction.getProcentValue(25, 65, c.buildingData.lvl);

				this.graphics.c().f("#000").dc(0,0,this.radius);
				stage.update();
			}
			/**
			 * [setUpgradeCost description]
			 * @param {[type]} _costs [description]
			 */
			c.setUpgradeCost = function(_costs) {
				this.buildingData.costs = _costs;
			}

			/**
			 * [handleImageLoad description]
			 * 
			 * @param  {[type]} event [description]
			 * @return {[type]}       [description]
			 */
			function handleImageLoad (event) {
				var logo = new createjs.Bitmap(event.target);	

				logo.x = eles[number].x - 25; 
				logo.y = eles[number].y - 25;

				logo.alpha = .8;
				logo.cursor = "pointer";

				stage.addChild(logo);
				stage.update();

				addDragImage();


				function addDragImage() {
					logo.on("pressmove", function(e) {
						eles[number].x = logo.x + 25;
						eles[number].y = logo.y + 25;


						if(number == 0) {
							eles[number].topConnector.updateLine();
						}

						eles[number].connector.forEach(redraw); 
					});


					logo.on("mousedown", function(e) {
						eles[number].dispatchEvent("mousedown");
					}); 

					logo.on("click", function(e){
						eles[number].dispatchEvent("click");
						eles[number].x = logo.x + 25;
						eles[number].y = logo.y + 25;


						/*if(number == 0) {
							eles[number].topConnector.updateLine();
						}

						eles[number].connector.forEach(redraw); */

						stage.update();
					});

					eles[number].on("pressmove", function(e) {
						logo.x = eles[number].x - 25;
						logo.y = eles[number].y - 25;
					});

					zim.drag(logo, bounds);


					function redraw(element, index, array) {
						element.hittesten();
					}
				}

			}
		})();

		
		
		/**
		 * [addDrag description]
		 * 
		 * @param {[object]} c [description]
		 * Shape
		 */
		function addDrag(c) {
			c.on("mousedown",function(e){
				c.clickStart = Date.now();

				e.target.graphics.c().f("#84BB67").dc(0,0,c.radius);
				e.target.graphics.beginStroke("black");
				e.target.graphics.f("rgba(0,0,0,0.1)").dc(0,0,120);
			}); 

			c.on("click",function(e){
				e.target.graphics.c().f("#000").dc(0,0,c.radius);
				stage.update();


				// Wenn weniger als 250 MS vergangen sind
				if((Date.now() - c.clickStart) <= 250)
					showInfoBox(i);
			});

			

			zim.drag(c, bounds);

			for (var j = 0; j < eles.length; j++) {
				if(i == j) {
					// eigenes element, kein Hitest
				}
				else {
					createHitTest(i, j);
					eles[j].addHitTest(j,i);
				}
			};
		}

		/**
		 * [createHitTest description]
		 * Erstellt ein Hittest zwischen den übergebenen Index Elementen
		 * @param  {[number]} _i [description]
		 * Index des zu verbindenden Elements
		 * @param  {[number]} _j [description]
		 * Index des zu verbindenden Elements
		 */
		function createHitTest(_i, _j) {
			var hitTest = false;
			

			if(_j != "top") {
				eles[_i].connector[_j] = createConnector(_i, _j);
				eles[_i].connector[_j].hittesten = function() {
					hitTesten();
				}
			}

			hitTesten();

			eles[_i].on("pressmove", function(e) 
			{
				hitTesten();

				for (var k = 0; k < eles.length; k++) {
					if(k != _j) {
						if(typeof eles[k].connector[_i] != "undefined") {
							eles[k].connector[_i].hittesten();
						}
					}
				};
			});

			/**
			 * [hitTesten description]
			 * Stellt den Hittest zwischen 2 Shapes her und 
			 * @return {[type]} [description]
			 */
			function hitTesten() {
				if ( zim.hitTestCircle(eles[_i], eles[_j]) ) 
				{
					if (!hitTest) {
					// if it was not hitting, now it is...
						
						eles[_i].connector[_j].updateLine();

						HelpFunction.pushEvent("buidlingConnected", {
							"from": _i,
							"to": _j
						});

						hitTest = true;
						stage.update();
					}
					else {
						eles[_i].connector[_j].updateLine();
					}
				}
				else 
				{
					if (hitTest) {
						// if it was hitting, now it is not...	

						eles[_i].connector[_j].hideLine();

						HelpFunction.pushEvent("buidlingDisconnected", {
							"from": _i,
							"to": _j
						});

						hitTest = false;
						stage.update();	
					}
				}
			}
		}
	}

	/**
	 * [showInfoBox description]
	 * Stellt das Gebäude des übergebenen Gebäude Indexes dar.
	 * @param  {[number]} i [description]
	 * Index des Gebäudes
	 */
	function showInfoBox(i)
	{
		//Startgebäude
		if(i != 0)
		{
			zid("buildingUpgradeViewTitle").innerHTML = eles[i].buildingData.name;
			zid("buildingUpgradeViewFormBuildingName").innerHTML = eles[i].buildingData.name;

			var img = "";
			if(eles[i].buildingData.lvl <= 14)
				img = eles[i].buildingData.images[0];
			else if (eles[i].buildingData.lvl <= 29)
				img = eles[i].buildingData.images[1];
			else if(eles[i].buildingData.lvl <= 45)
				img = eles[i].buildingData.images[2];
			else 
				img = eles[i].buildingData.images[3];

			zid("buildingUpgradeViewImage").src = img;

			zid("buildingUpgradeViewTextUpgrade").innerHTML = eles[i].buildingData.text;
			zid("buildingUpgradeViewFormBuildingId").value = i;
			zid("buildingUpgradeViewLevel").innerHTML = eles[i].buildingData.lvl;




			zid("buildingUpgradeViewCostLeafs").innerHTML = eles[i].buildingData.costs.leafs;
			//zid("buildingUpgradeViewCostLeafsHidden").innerHTML = eles[i].buildingData.costs.leafs;
			zid("buildingUpgradeViewCostStone").innerHTML = eles[i].buildingData.costs.stone;
			//zid("buildingUpgradeViewCostStoneHidden").innerHTML = eles[i].buildingData.costs.stone;
			zid("buildingUpgradeViewCostFood").innerHTML = eles[i].buildingData.costs.food;
			//zid("buildingUpgradeViewCostFoodHidden").innerHTML = eles[i].buildingData.costs.food;


			zid("openLightboxBuildingUpgradeView").click();


			zid("buildingUpgradeViewBG").style.height = zid("lightboxContentbuildingUpgradeView").offsetHeight + "px";
			zid("buildingUpgradeViewBG").style.marginTop = (- zid("lightboxContentbuildingUpgradeView").offsetHeight)/2 + "px";
		}
	}

	/**
	 * [createConnector description]
	 * Erstellt eine Linie ziwschen den übergebenen Shape Objekten
	 * @param  {[number]} _i [description]
	 * Index des 1. Elements
	 * @param  {[number]} _j [description]
	 * Index des zu verbindenen Elements
	 * @return {[object]}    [description]
	 */
	function createConnector(_i, _j) 
	{
		var connector = new createjs.Shape();
		connector.visible = false;

		if(_j == "top")
			drawTop();

		/**
		 * [draw description]
		 * Stellt Verbindungslinie da und korrigiert Position der Verbindung
		 */
		function draw() {
			connector.visible = true;
			connector.graphics.c().setStrokeStyle(6, 'round', 'round').beginStroke("black").moveTo(eles[_i].x, eles[_i].y).lineTo(eles[_j].x, eles[_j].y);
			// Connector wird als oberesten Element eingefügt, damit es oberhalb der anderen Elemente liegt.
			stage.addChildAt(connector,0);
		}

		/**
		 * [drawTop description]
		 * Erstellt eine Verbindung für das Startgebäude, welche nach oben geht
		 */
		function drawTop() {
			connector.visible = true;
			connector.graphics.c().setStrokeStyle(6, 'round', 'round').beginStroke("black").moveTo(eles[_i].x, eles[_i].y).lineTo(stageW/2, 0);
			stage.addChildAt(connector,0);
		}

		/**
		 * [hide description]
		 * Blendet den Connector aus
		 */
		function hide() {
			connector.visible = false;
			connector.graphics.c();
		}

		/**
		 * [updateLine description]
		 * Public Mehtode um Verbindungslinie zu aktualsieren und darzustellen.
		 */
		connector.updateLine = function() {
			if(_j == "top")
				drawTop();
			else {
				if(typeof eles[_j].connector[_i] != "undefined") {
					if(eles[_j].connector[_i].visible == true) {
						eles[_j].connector[_i].updateLine();
					}
					else 
						draw();
				}
				else {
					draw();
				}
			}
		}

		/**
		 * [hideLine description]
		 * Public Mehtode zum Verbergen der Gebäudeverbindugn
		 */
		connector.hideLine = function() {
			if(eles[_j].connector[_i].visible == true) {
				eles[_j].connector[_i].hideLine();
			}
			else {
				hide();
			}
		}

		stage.addChildAt(connector,0);

		return connector;
	}

	init();
}
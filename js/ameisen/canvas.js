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
			image1: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image2: "https://org.de/wp-content/uploads/2012/11/Atomkraftwerk.jpg",
			image3: "http://images.zeit.de/politik/deutschland/2010-07/akw-schwarz-gelb-010710/akw-schwarz-gelb-010710-540x304.jpg",
			image4: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image5: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			lvl: 1,
			text: "Ich mach die super Energie, byebye global warming",
			costs: {
				leafs: null,
		    	stone: null,
		    	food: null
			}
		},
		{
			name: "Pilzkammer",
			image1: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image2: "https://org.de/wp-content/uploads/2012/11/Atomkraftwerk.jpg",
			image3: "http://images.zeit.de/politik/deutschland/2010-07/akw-schwarz-gelb-010710/akw-schwarz-gelb-010710-540x304.jpg",
			image4: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image5: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			lvl: 1,
			text: "Ich mach die super Energie, byebye global warming",
			costs: {
				leafs: null,
		    	stone: null,
		    	food: null
			}
		},
		{
			name: "Lager",
			image1: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image2: "https://org.de/wp-content/uploads/2012/11/Atomkraftwerk.jpg",
			image3: "http://images.zeit.de/politik/deutschland/2010-07/akw-schwarz-gelb-010710/akw-schwarz-gelb-010710-540x304.jpg",
			image4: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image5: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			lvl: 1,
			text: "Ich mach die SUPER ENERGIE. BYE BYE global warming",
			costs: {
				leafs: null,
		    	stone: null,
		    	food: null
			}
		},
		{
			name: "Speisekammer",
			image1: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image2: "https://org.de/wp-content/uploads/2012/11/Atomkraftwerk.jpg",
			image3: "http://images.zeit.de/politik/deutschland/2010-07/akw-schwarz-gelb-010710/akw-schwarz-gelb-010710-540x304.jpg",
			image4: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image5: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			lvl: 1,
			text: "Ich mach die super Energie, byebye global warming",
			costs: {
				leafs: null,
		    	stone: null,
		    	food: null
			}
		},
		{
			name: "Deponie",
			image1: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image2: "https://org.de/wp-content/uploads/2012/11/Atomkraftwerk.jpg",
			image3: "http://images.zeit.de/politik/deutschland/2010-07/akw-schwarz-gelb-010710/akw-schwarz-gelb-010710-540x304.jpg",
			image4: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image5: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			lvl: 1,
			text: "Ich mach die super Energie, byebye global warming",
			costs: {
				leafs: null,
		    	stone: null,
		    	food: null
			}
		},
		{
			name: "Start",
			image1: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image2: "https://org.de/wp-content/uploads/2012/11/Atomkraftwerk.jpg",
			image3: "http://images.zeit.de/politik/deutschland/2010-07/akw-schwarz-gelb-010710/akw-schwarz-gelb-010710-540x304.jpg",
			image4: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image5: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			lvl: 1,
			text: "",
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
	 * [createDefaults description]
	 * Erstellt Standart Gebäude
	 */
	this.createDefaults = function() {
		stage.update();
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
	 * @param {[boolean]} updateView [description]
	 */
	this.setUpgradeCosts = function(id, costs, updateView) {
		eles[id].setUpgradeCost(costs);
		if(updateView)
			showInfoBox(id);
	}


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

			c.radius = HelpFunction.getProcentValue(20, 80, c.buildingData.lvl);


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
					image.src = "img/icons/buildings/hatch_sm.png";
					break;
				// Mush
				case 1: 
					image.src = "img/icons/buildings/mushroom_sm.png";
					break;
				// Storage
				case 2: 
					image.src = "img/icons/buildings/storage_sm.png";
					break;
				// Pantry
				case 3: 
					image.src = "img/icons/buildings/speisekammer_sm.png";
					break;
				// Dumping
				case 4: 
					image.src = "img/icons/buildings/dump_sm.png";
					break;
				// Startegebäude
				case 5: 
					image.src = "img/icons/buildings/queen_sm.png";
					break;
			}
			image.onload = handleImageLoad;


			c.addHitTest = function (i, j) {
				createHitTest(i,j);
			}
			c.upgradeBuilding = function() {
				this.buildingData.lvl += 1;
				this.radius = HelpFunction.getProcentValue(20, 80, c.buildingData.lvl);

				this.graphics.c().f("#000").dc(0,0,this.radius);
				stage.update();
			}
			c.setUpgradeCost = function(_costs) {
				this.buildingData.costs = _costs;
			}


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

		function createHitTest(_i, _j) {
			var hitTest = false;
			if(_j == "top") {

			}
			eles[_i].connector[_j] = createConnector(_i, _j);
			eles[_i].connector[_j].hittesten = function() {
				hitTesten();
			}

			hitTesten();

			eles[_i].on("pressmove", function(e) 
			{
				console.log(e);
				hitTesten();

				for (var k = 0; k < eles.length; k++) {
					if(k != _j) {
						if(typeof eles[k].connector[_i] != "undefined") {
							eles[k].connector[_i].hittesten();
						}
					}
				};
			});

			function hitTesten() {
				if ( zim.hitTestCircle(eles[_i], eles[_j]) ) 
				{
					if (!hitTest) {
					// if it was not hitting, now it is...
						zog("circle " + _i + " hits Circle " + _j);
						
						eles[_i].connector[_j].updateLine();

						HelpFunction.pushEvent("buidlingConnected", {
							"from": _i,
							"to": _j
						});

						hitTest = true;
						stage.update();
					}
					else {
						/*HelpFunction.pushEvent("buidlingConnected", {
							"from": _i,
							"to": _j
						});*/
						eles[_i].connector[_j].updateLine();
					}
				}
				else 
				{
					if (hitTest) {
					// if it was hitting, now it is not...	
						zog("circle " + _i + " unhids Circle " + _j);

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

	function showInfoBox(i)
	{
		//Startgebäude
		if(i != 0)
		{
			zid("buildingUpgradeViewTitle").innerHTML = eles[i].buildingData.name;
			zid("buildingUpgradeViewFormBuildingName").innerHTML = eles[i].buildingData.name;

			var img = "";
			if(eles[i].buildingData.lvl <= 9)
				img = eles[i].buildingData.image1;
			else if (eles[i].buildingData.lvl <= 19)
				img = eles[i].buildingData.image2;
			else if(eles[i].buildingData.lvl <= 29)
				img = eles[i].buildingData.image3;
			else if(eles[i].buildingData.lvl <= 39)
				img = eles[i].buildingData.image4;
			else 
				img = eles[i].buildingData.image5;

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
		}
	}

	function createConnector(_i, _j) 
	{
		var connector = new createjs.Shape();
		connector.visible = false;

		if(_j == "top")
			drawTop();

		function draw() {
			connector.visible = true;
			connector.graphics.c().setStrokeStyle(6, 'round', 'round').beginStroke("black").moveTo(eles[_i].x, eles[_i].y).lineTo(eles[_j].x, eles[_j].y);
			// Connector wird als oberesten Element eingefügt, damit es oberhalb der anderen Elemente liegt.
			stage.addChildAt(connector,0);
		}

		function drawTop() {
			connector.visible = true;
			connector.graphics.c().setStrokeStyle(6, 'round', 'round').beginStroke("black").moveTo(eles[_i].x, eles[_i].y).lineTo(stageW/2, 0);
			stage.addChildAt(connector,0);
		}

		function hide() {
			connector.visible = false;
			connector.graphics.c();
		}

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
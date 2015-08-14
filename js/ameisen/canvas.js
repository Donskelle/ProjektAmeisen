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
			name: "Dumping Ground",
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
			name: "Pantry",
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
			name: "Brood Chamber",
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
			name: "Mushroom Chamber",
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
			name: "Storage",
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
		})

		
	}

	/**
	 * [createDefaults description]
	 * Erstellt Standart Gebäude
	 */
	this.createDefaults = function() {
		var circle = self.createBuilding(0);
		var circle2 = self.createBuilding(1);
		var circle3 = self.createBuilding(2);
		var circle4 = self.createBuilding(3);
				
		stage.update();	
	}

	/**
	 * [createBuilding description]
	 * Erstellt eine Instanz des Objects Building und fragt die Upgradekosten ab. 
	 * @param  {[number]} type [description]
	 */
	this.createBuilding = function(type) {
		var i = eles.length;
		var build = new Building((type-1), i);
		stage.update();
		
		console.log(i);
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
			c.buildingData = {}
			HelpFunction.merge(c.buildingData, buidlingsTypes[type]);
			c.connector = new Array();


			c.x = 300 * (i +1);
			c.y = 200 * (i +1);
			var g = c.graphics;
			c.radius = 50;
			c.addHitTest = function (i, j) {
				createHitTest(i,j);
			}
			c.upgradeBuilding = function() {
				this.buildingData.lvl += 1;
			}
			c.setUpgradeCost = function(_costs) {
				this.buildingData.costs = _costs;
				console.log(this.buildingData.costs);
			}

			g.f("#f58e25").dc(0,0,50);

			c.setBounds(-c.radius, -c.radius, c.radius*2, c.radius*2);
			eles[i] = c;

			addDrag(c);
			stage.addChild(c);
		})();

		
		

		function addDrag(c) {		
			c.on("mousedown",function(e){
				c.clickStart = Date.now();


				e.target.graphics.beginStroke("black");
				e.target.graphics.f("rgba(0,0,0,0.1)").dc(0,0,130);
			}); 

			c.on("click",function(e){
				e.target.graphics.c().f("#f58e25").dc(0,0,50);
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
			eles[_i].connector[_j] = createConnector(_i, _j);


			eles[_i].on("pressmove", function(e) 
			{
				if ( zim.hitTestCircle(eles[_i], eles[_j]) ) 
				{
					if (!hitTest) {
					// if it was not hitting, now it is...
						zog("circle " + _i + " hits Circle " + _j);
						
						e.target.connector[_j].updateLine();

						hitTest = true;
						stage.update();
					}
					else {
						e.target.connector[_j].updateLine();
					}
				}
				else 
				{
					if (hitTest) {
					// if it was hitting, now it is not...	
						zog("circle " + _i + " unhids Circle " + _j);

						e.target.connector[_j].hideLine();
						console.log(e.target.connector);


						hitTest = false;
						stage.update();	
					}
				}
			});	
		}
	}

	function showInfoBox(i) {


		zid("buildingUpgradeViewTitle").innerHTML = eles[i].buildingData.name;

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
	}

	function createConnector(_i, _j) {
		var connector = new createjs.Shape();
		connector.visible = false;

		function draw() {
			connector.visible = true;
			connector.graphics.c().setStrokeStyle(10, 'round', 'round').beginStroke("black").moveTo(eles[_i].x, eles[_i].y).lineTo(eles[_j].x, eles[_j].y);
			// Connector wird als oberesten Element eingefügt, damit es oberhalb der anderen Elemente liegt.
			stage.addChild(connector);
		}

		function hide() {
			connector.visible = false;
			connector.graphics.c();
		}

		connector.updateLine = function() {
			if(eles[_j].connector[_i].visible == true) {
				eles[_j].connector[_i].updateLine();
			}
			else {
				draw();
			}
		}

		connector.hideLine = function() {
			if(eles[_j].connector[_i].visible == true) {
				console.log("hi")
				eles[_j].connector[_i].hideLine();
			}
			else {
				hide();
			}
		}

		stage.addChild(connector);

		return connector;
	}


	init();
}
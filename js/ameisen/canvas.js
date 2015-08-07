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
			name: "Atomkraftwerk",
			image1: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image2: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image3: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image4: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image5: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			lvl: "1",
			text: "Ich mach die super Energie, byebye global warming",
			costs: {
				leafs: null,
		    	stone: null,
		    	food: null
			}
		},
		{
			name: "Atomkraftwerk 2",
			image1: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image2: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image3: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image4: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			image5: "http://www.handelsblatt.com/images/france-politics-energy-company-edf-privatisation/6483362/2-format2010.jpg",
			lvl: "1",
			text: "Ich mach die SUPER ENERGIE. BYE BYE global warming",
			costs: {
				leafs: null,
		    	stone: null,
		    	food: null
			}
		}
	]

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
			console.log(e);
			e.preventDefault();
		})

		create();
	}


	function animateProgress(e) {
		
		// zog("progress " + e.target.progress);	
		// this event runs quite quickly and often
		// e.target is the preload object in this case
		// the progress property gives a number from 0-1 representing progress
		// in percent we would multiply by 100
		// we would operate on the progress object we established in makeProgress() 

	}

	function create() {
		var circle = self.createBuilding(0);
		var circle2 = self.createBuilding(1);
		var circle3 = self.createBuilding(1);
		var circle4 = self.createBuilding(1);
				
		stage.update();	
	}

	this.createBuilding = function(type) {
		var i = eles.length;
		var build = new Building(type, i);
		stage.update();
	}


	function Building(type, i) {
		(function init() {
			var c = new createjs.Shape();
			c.buildingData = buidlingsTypes[type];
			c.connector = new Array();


			c.x = 300 * (i +1);
			c.y = 200 * (i +1);
			var g = c.graphics;
			c.radius = 50;
			c.addHitTest = function (i, j) {
				createHitTest(i,j);
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
		zid("buildingUpgradeViewImage").src = eles[i].buildingData.image1;
		zid("buildingUpgradeViewTextUpgrade").innerHTML = eles[i].buildingData.text;
		zid("buildingUpgradeViewFormBuildingId").innerHTML = i;



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
function test (_options) {
	var options = _options;


	var _leafCount = zid("leafCount");
    var _stoneCount = zid("stoneCount");
    var _foodCount = zid("foodCount");
    var _dumpCount = zid("dumpCount");
    var _workerCount = zid("workerCount");
   
    var _leafProd = zid("leafProd");
    var _stoneProd = zid("stoneProd");
    var _foodProd = zid("foodProd");
    var _dumpProd = zid("dumpProd");
    var _leafStorage = zid("leafStorage");
    var _stoneStorage = zid("stoneStorage");
    var _foodStorage = zid("foodStorage");
    var _dumpStorage = zid("dumpStorage");
    var _dumpHillhtml = zid("dumpHill");


	//Fuellstand der Vorratslager
	var leafBar = zid("leafBar");
	var stoneBar = zid("stoneBar");
	var foodBar = zid("foodBar");
	var dumpBar = zid("dumpBar");

	//Bestand von Rohstoffen
	var _leafs = 100;
	var _stone = 100;
	var _food = 10;
	var _dump = 10;
	
	var _prodDump = 0;
	
	var _jobCleanRatio = 2;
    var _dumpHill = 0;
	
	//Bestand und Kosten von Ameisen
	var _antW = 1;
	var _antS = 0;
	
	var _antCostW = {
		leafs: 10,
		stone: 10,
		food: 10
	};
	var _antCostS = {
		leafs: 10,
		stone: 10,
		food: 10
	};
	
	//belegte Jobs
	var _jobLeafs = 0;
	var _jobStone = 0;
	var _jobHunt = 0;
	var _jobHatch = 0;
	var _jobClean = 0;
	
	//Produktionsrate von Rohstoffen pro Tick und Faktor zur Berechnung(Balancing)
	var _prodLeafs = 0;
	var _prodStone = 0;
	var _prodFood = 0;
	
	
	var _ratioLeafs = 1;
	var _ratioStone = 1;
	var _ratioHunt = 2;
	var _ratioHatch = 1;
	var _ratioClean = 1;

	
	var _upgradeCostIncrease = 1.13;
	
	//Tickrate der verschiedenen Loops
	var _tickRate = 500;
	
	var _hatchRateW = 10;	
	var _hatchRateS = 15;
	
	//zur Berechnung s. setJobs case 4
	var _HATCHW = 10; 
	var _HATCHS = 15;
	
	//Balancing
	var _hatchRatioW = .1;
	var _hatchRatioS = .15;
	
	//Gebaeudevariablen
	var _broodLevel = 0; //Anzahl aller Gebaeudelevel vom gleichen Typ
	var _mushroomLevel = 0;
	var _storageLevel = 0;
	var _pantryLevel = 0;
	var _garbageLevel = 0;
	
	//Balancing: wird mit dem entsprechenden Gebaeudelevel multipliziert
	var _broodRatio = 1;
	var _mushroomRatio = 1;
	var _storageRatio = 200;
	var _pantryRatio = 200;
	var _garbageRatio = 500;
	
	
	
	//Buildings
    var _buildingCostRatio = 10; //balancing
    
    
    var buildedBuildings = [
	    {
	    	type: "start",
	    	connected: false,

			connections: []
	    }
    ];
    var timerBuild = new antBuilder();


    //Kosten für neue Gebaeude(nicht Upgrades)
    var _buildings = {
	    1 : { //brood chamber
	    	count: 0,
	    	costLeafs: 20,
	    	costStone: 10,
	    	costFood: 0,
	    	costLeafsHtml: zid("broodCostL"),
	    	costStoneHtml:	zid("broodCostS"),
	    	upgradeCost: {
	    		totalUpgrades: 0,
	    		leafs: 10,
	    		stone: 10,
	    		food: 0
	    	},
	    	buildedBuildings : []
	    },
	   	2 : { //mushroom chdump
	    	count: 0,
	    	costLeafs: 100,
	    	costStone: 50,
	    	costFood: 0,
	    	costLeafsHtml: zid("mushCostL"),
	    	costStoneHtml:	zid("mushCostS"),
	    	leafConsume: 1,
	    	foodProd: 3,
	    	upgradeCost: {
	    		totalUpgrades: 0,
	    		leafs: 10,
	    		stone: 10,
	    		food: 0
	    	},
	    	buildedBuildings : []	    	
	    },
	    3 : { //storage
	    	count: 0,
	    	costLeafs: 10,
	    	costStone: 10,
	    	costFood: 0,
	    	costLeafsHtml: zid("storageCostL"),
	    	costStoneHtml:	zid("storageCostS"),
	    	storeLeafs: 15,
	    	storeStone: 15,
	    	upgradeCost: {
	    		totalUpgrades: 0,
	    		leafs: 10,
	    		stone: 10,
	    		food: 0
	    	},
	    	buildedBuildings : []
	    },
	    4 : { //pantry
	    	count: 0,
	    	costLeafs: 10,
	    	costStone: 10,
	    	costFood: 0,
	    	costLeafsHtml: zid("pantryCostL"),
	    	costStoneHtml:	zid("pantryCostS"),
	    	storeFood: 15,
	    	upgradeCost: {
	    		totalUpgrades: 0,
	    		leafs: 10,
	    		stone: 10,
	    		food: 0
	    	},
	    	buildedBuildings : []
	    },
	    5 : { //dumping ground
	    	count: 0,
	    	costLeafs: 250,
	    	costStone: 500,
	    	costFood: 0,
	    	costLeafsHtml: zid("dumpingCostL"),
	    	costStoneHtml:	zid("dumpingCostS"),
	    	storeDump: 15,
	    	upgradeCost: {
	    		totalUpgrades: 0,
	    		leafs: 10,
	    		stone: 10,
	    		food: 0
	    	},
	    	buildedBuildings : []
	    }
	};
  	
  	function init() {
  		var dumpingForm = zid(options.forms.dumpingBuild);
		var pantryForm = zid(options.forms.pantryBuild);
		var broodForm = zid(options.forms.broodBuild);
		var mushroomForm = zid(options.forms.mushroomBuild);
		var storageForm = zid(options.forms.storageBuild);

		broodForm.addEventListener("click", function(e) {
			build(1);
		});
		mushroomForm.addEventListener("click", function(e) {
			build(2);
		});
		storageForm.addEventListener("click", function(e) {
			build(3);
		});
		pantryForm.addEventListener("click", function(e) {
			build(4);
		});
		dumpingForm.addEventListener("click", function(e) {
			build(5);
		});
		
		
		
		var addLeafs = zid("btn_addLeafs");
		var addStone = zid("btn_addStone");
		var addFood = zid("btn_addFood");
		
		var addAntW = zid("btn_addAntW");
		
		
		var addJobL = zid("btn_addJobL");
		var subJobL = zid("btn_subJobL");
		
		var addJobS = zid("btn_addJobS");
		var subJobS = zid("btn_subJobS");
		
		var addJobHu = zid("btn_addJobHu");
		var subJobHu = zid("btn_subJobHu");
		
		var addJobHa = zid("btn_addJobHa");
		var subJobHa = zid("btn_subJobHa");
		
		var addJobC = zid("btn_addJobC");
		var subJobC = zid("btn_subJobC");
		
		addLeafs.addEventListener("click", function(e) {
			_leafs++;
			updateRes();
		});
		addStone.addEventListener("click", function(e) {
			_stone++;
			updateRes();
		});
		addFood.addEventListener("click", function(e) {
			_food++;
			updateRes();
		});
		
		addAntW.addEventListener("click", function(e) {
			setJobs(6,1);
		});	
				
		
		addJobL.addEventListener("click", function(e) {
			setJobs(1,1);
		});	
		subJobL.addEventListener("click", function(e) {
			setJobs(1,-1);
		});
		
		addJobS.addEventListener("click", function(e) {
			setJobs(2,1);
		});	
		subJobS.addEventListener("click", function(e) {
			setJobs(2,-1);
		});
		
		addJobHu.addEventListener("click", function(e) {
			setJobs(3,1);
		});	
		subJobHu.addEventListener("click", function(e) {
			setJobs(3,-1);
		});
		
		addJobHa.addEventListener("click", function(e) {
			setJobs(4,1);
		});	
		subJobHa.addEventListener("click", function(e) {
			setJobs(4,-1);
		});
		
		addJobC.addEventListener("click", function(e) {
			setJobs(5,1);
		});	
		subJobC.addEventListener("click", function(e) {
			setJobs(5,-1);
		});
		

		for(var i=1; i<=5; i++) {
			_buildings[i]["costLeafsHtml"].innerHTML = _buildings[i]["costLeafs"];
			_buildings[i]["costStoneHtml"].innerHTML = _buildings[i]["costStone"];
		}
  	}
  	init();
  

    function gameLoop() {
    	if(_leafs + _prodLeafs <= _buildings[3]["storeLeafs"]){
    		_leafs += _prodLeafs;
    	}
    	else {
    		_leafs = _buildings[3]["storeLeafs"];
    	}
    	if(_stone + _prodStone <= _buildings[3]["storeStone"]){
    		_stone += _prodStone;
    	}
    	else {
    		_stone = _buildings[3]["storeStone"];
    	}
    	if(_food + _prodFood <= _buildings[4]["storeFood"]){
    		_food += _prodFood;
    	}
    	else {
    		_food = _buildings[4]["storeFood"];
    	}
    	
    	if(_dump + _prodDump > _buildings[5]["storeDump"]){
    		_dump = _buildings[5]["storeDump"];
    		_dumpHill -= (_dump) - (_buildings[5]["storeDump"] + (_antW + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean));
    		
    	}
    	else {
    		_dump += _prodDump;
    		_dumpHill -= _prodDump;
    		
    	}
    	
      _dumpHill += _antW;
       
       
       updateRes();
       
	

		window.setTimeout(gameLoop, _tickRate);
    }
		
    function updateRes() {
    	var connectedBuildingsLevel = getConnectedBuildingsLevelByType(3);
    	var maxRes = 15;
    	for (var i = 0; i < connectedBuildingsLevel; i++) {
    		maxRes = 10 + Math.floor(maxRes * 1.03);
    	};

    	_buildings[3]["storeLeafs"] = maxRes;
    	_buildings[3]["storeStone"] = maxRes;


    	connectedBuildingsLevel = getConnectedBuildingsLevelByType(4);
    	var maxFood = 25;
    	for (var i = 0; i < connectedBuildingsLevel; i++) {
    		maxFood = 10 + Math.floor(maxFood * 1.03);
    	};
    	_buildings[4]["storeFood"] = maxFood;

		
    	connectedBuildingsLevel = getConnectedBuildingsLevelByType(2);
    	var connectedBuildingsCount = getConnectedBuildingsCountByType(2);

    	_prodLeafs = (_jobLeafs * _ratioLeafs) - (_buildings[2]["leafConsume"] * connectedBuildingsLevel);
    	_prodStone = _jobStone * _ratioStone;
    	_prodFood = (_jobHunt * _ratioHunt) + (_buildings[2]["foodProd"] * connectedBuildingsLevel) - (_antW + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean);
	
    	
    	if(_dumpHill >= _jobClean * _jobCleanRatio){
    		_prodDump = (_jobClean * _jobCleanRatio);
    	}
    	else {
    		_prodDump = _dumpHill;
    	}



    	if(_prodLeafs < 0){
    		_leafProd.style.color = "red";
    		_leafProd.innerHTML = _prodLeafs;
    	}
    	else if(_prodLeafs > 0){
    		_leafProd.style.color = "green";
    		_leafProd.innerHTML = "+" + _prodLeafs;
    	}
    	else {
    		_leafProd.style.color = "black";
    		_leafProd.innerHTML = _prodLeafs;
    	}
    	if(_prodStone < 0){
    		_stoneProd.style.color = "red";
    		_stoneProd.innerHTML = _prodStone;
    	}
    	else if(_prodStone > 0){
    		_stoneProd.style.color = "green";
    		_stoneProd.innerHTML = "+" + _prodStone;
    	}
    	else {
    		_stoneProd.style.color = "black";
    		_stoneProd.innerHTML = _prodStone;
    	}
    	 
    	
    	if(_prodFood < 0){
    		_foodProd.style.color = "red";
    		_foodProd.innerHTML = _prodFood;
    	}
    	else if(_prodFood > 0){
    		_foodProd.style.color = "green";
    		_foodProd.innerHTML = "+" + _prodFood;
    	}
    	else {
    		_foodProd.style.color = "black";
    		_foodProd.innerHTML = _prodFood;
    	}
    	
    	
    	_workerCount.innerHTML = _antW;
    	
    	_leafCount.innerHTML = _leafs;
    	_stoneCount.innerHTML = _stone;
    	_foodCount.innerHTML = _food;
    	_dumpCount.innerHTML = _dump;
    	_dumpHillhtml.innerHTML = _dumpHill;
    	
    	
    	_dumpProd.innerHTML = _prodDump;
    	
    	_leafStorage.innerHTML = _buildings[3]["storeLeafs"];
		_stoneStorage.innerHTML = _buildings[3]["storeStone"];
		_foodStorage.innerHTML = _buildings[4]["storeFood"];
		_dumpStorage.innerHTML = _buildings[5]["storeDump"];
		
		
		leafBar.style.width = (_leafs/_buildings[3]["storeLeafs"])*100 + "%"; 
		stoneBar.style.width = (_stone/_buildings[3]["storeStone"])*100 + "%"; ;
		foodBar.style.width = (_food/_buildings[4]["storeFood"])*100 + "%"; ;
		dumpBar.style.width = "100%";


		timerBuild.update();
    }
 


	
    _jobAntW = zid("jobAntW");
    _jobAntS = zid("jobAntS");
    _jobCountL = zid("jobCountL");
    _jobCountS = zid("jobCountS");
    _jobCountHu = zid("jobCountHu");
    _jobCountHa = zid("jobCountHa");
    _jobCountC = zid("jobCountC");
    
    //type = {1,2,3,4,5,6,7}, amount = {1,-1}
    function setJobs(type, amount) {
    	
    	if(type <= 5 && _antW >= 1 || amount == -1)
    	{
	    	switch(type)
	    	{
	    		case 1: //collect leafs
	    			if(_jobLeafs >= 1 || amount == 1){
	    				_jobLeafs += amount;
	    				_jobCountL.innerHTML = _jobLeafs;
	    				_antW += -amount;
	    			}
	    			break;
	    		case 2:	//collect stone
	    			if(_jobStone >= 1 || amount == 1){
	    				_jobStone += amount;
	    				_jobCountS.innerHTML = _jobStone;
	    				_antW += -amount;
	    			}
	    			break;
	    		case 3: //hunt
	    			if(_jobHunt >= 1 || amount == 1){
	    				_jobHunt += amount;
	    				_jobCountHu.innerHTML = _jobHunt;
	    				_antW += -amount;
	    			}
	    			break;
	    		case 4: //hatch
	    			if(_jobHatch >= 1 || amount == 1){
	    				_jobHatch += amount;
	    				_hatchRateW = _HATCHW - (_hatchRatioW * _jobHatch);
	    				_hatchRateS = _HATCHS - (_hatchRatioS * _jobHatch);
	    				_jobCountHa.innerHTML = _jobHatch;
	    				_antW += -amount;
	    			}
	    			break;
	    		case 5:	//clean
	    			if(_jobClean >= 1 || amount == 1){
	    				_jobClean += amount;
	    				_jobCountC.innerHTML = _jobClean;
	    				_antW += -amount;
	    			}
	    			//weitere Berechnung fehlt noch
	    			break;
	    	}
	    	
	    	
	    }
	    else {
	    	if( type == 6 ){	    		
    			if(_leafs >= _antCostW["leafs"] && _stone >= _antCostW["stone"] && _food >= _antCostW["food"])
    			{
	    			if(timerBuild.addW(_hatchRateW)) {
	    				_leafs -= _antCostW["leafs"];
  						_stone -= _antCostW["stone"];
  						_food -= _antCostW["food"];
  					}
    			}
    			amount *= 0;
    		}
    		/*else if( type == 7 ) {
    			if(_leafs >= _antCostS["leafs"] && _stone >= _antCostS["stone"] && _food >= _antCostW["food"])
				{
    				timerBuild.addS(_hatchRateS);
    				_leafs -= _antCostS["leafs"];
  					_stone -= _antCostS["stone"];
  					_food -= _antCostS["food"];
				}
    			amount *= 0;
    		}*/
	    }
	    updateRes();
    }
    
    var countdownW = zid("countdownW");
   function antBuilder () {
    	var timer;
    	var self = this;
    	var countDowns = {
    		ants: {
    			end: null
    		}
    	}
    	var ants = [];
    	//var solders = [];
    	var posibleAnts = 1;

    	function updateViewBuilder() {
    		var countsAnt = ants.length;
    		//var countsSolders = solders.length;
    		

    		var countBuildingsLvl = getConnectedBuildingsLevelByType(1);
    		var countBuildings = getConnectedBuildingsCountByType(1);

    		var lvlWithoutBuildung = countBuildingsLvl - countBuildings;


    		posibleAnts = countBuildings + (Math.floor( lvlWithoutBuildung /5 )) + 1;

    		//zid("possibleSolderProduction").innerHTML = posibleAnts;
    		zid("possibleAntProduction").innerHTML = posibleAnts;


    		//zid("currentSolderProduction").innerHTML = countsSolders;
    		zid("currentAntProduction").innerHTML = countsAnt;
    	}

    	this.update = function() {
			updateViewBuilder();
    	}

    	this.addW = function(rate) {
    		if(posibleAnts == ants.length) {
    			alert("Sie können nicht mehr Ameisen in Auftrag geben.");
    			return false;
    		}
    		ants[ants.length] = {
    			end: Date.now() + (rate * 1000) + Math.floor(countDowns.ants.end * 1000)
    		};

    		countDowns.ants.end += (rate);

    		if(timer == null)
    			start();

    		updateViewBuilder();
    		return true;
    	}
    	/*this.addS = function(rate) {
    		solders[solders.length] = {
    			end: Date.now() + (rate * 1000) + Math.floor(countDowns.solders.end * 1000)
    		}

    		countDowns.solders.end += (rate);

    		if(timer == null)
    			start();
    		
    		updateViewBuilder();
    	}*/


    	function start() {
    		timer = window.setInterval(function() {
    			tick();
	    	}, 100);
    	}
    	function end() {
    		window.clearInterval(timer);
    		timer = null;
    	}

    	function tick() {
    		if(ants.length > 0) {
    			countDowns.ants.end -= .1;

	    		for (var i = 0; i < ants.length; i++) {
	    			if(typeof ants[i] != undefined) {
	    				// Prüfen, ob fertig
	    				if(ants[i].end <= Date.now()) {
	    					_antW++;
	   						ants.splice(i, 1);
	   						updateViewBuilder();
	   						if(ants.length == 0)
	   							countDowns.ants.end = 0;
	    				}
	    			}
	    		};
	    	}

	    	/*if(solders.length > 0) {
	    		countDowns.solders.end -= .1;

	    		for (var i = 0; i < solders.length; i++) {
	    			if(typeof solders[i] != undefined) {
	    				// Prüfen, ob fertig
	    				if(solders[i].end <= Date.now()) {
	    					_antS++;
	   						solders.splice(i, 1);
	   						
							updateViewBuilder();

	   						if(ants.length == 0)
	   							countDowns.solders.end = 0;
	    				}
	    			}
	    		};
    		}*/
    		if(allDone())
    			end();

    		updateView();
    		updateRes();
    	}

    	function allDone() {
    		//if(solders.length > 0 || ants.length > 0)
    		if(ants.length > 0)
    			return false;

    		return true;
    	}

    	function updateView() {
    		countdownW.innerHTML = (Math.floor(countDowns.ants.end * 10) / 10).toFixed(2);
    	}
	}
    gameLoop();
    

	
	
	
	//type = {1,2,3,4,5}
	function build(type) {
		//Abfrage, ob die Ressourcen die Kosten uebersteigen
		if(_leafs >= _buildings[type]["costLeafs"] && _stone >= _buildings[type]["costStone"] && _food >= _buildings[type]["costFood"])
		{
			
			//Abzug der Kosten
			_leafs -= _buildings[type]["costLeafs"];
			_stone -= _buildings[type]["costStone"];
			_food -= _buildings[type]["costFood"];
			
			//Neuberechnung der Kosten
			_buildings[type]["costLeafs"] *= _buildingCostRatio;
			_buildings[type]["costStone"] *= _buildingCostRatio;
			_buildings[type]["costFood"] *= _buildingCostRatio;
			
			_buildings[type]["count"]++;
			
			_buildings[type]["upgradeCost"]["totalUpgrades"]++;
				
			_buildings[type]["costLeafsHtml"].innerHTML = _buildings[type]["costLeafs"];
			_buildings[type]["costStoneHtml"].innerHTML = _buildings[type]["costStone"];
			
			if(type == 1) {
				timerBuild.update();
			}

			else if(type == 3) {
		    	_buildings[3]["storeLeafs"] = 10 + Math.floor(_buildings[3]["storeLeafs"] * (1.03));
		    	_buildings[3]["storeStone"] = 10 + Math.floor(_buildings[3]["storeStone"] * (1.03));
			}
			else if(type == 4) {
	    		_buildings[4]["storeFood"] = 10 + Math.floor(_buildings[4]["storeFood"] * (1.03));
			}
			
			updateRes();
			
			
			var countBuildings = buildedBuildings.length;

			_buildings[type].buildedBuildings[_buildings[type].buildedBuildings.length] = countBuildings;

			buildedBuildings[countBuildings] = {};
			buildedBuildings[countBuildings] = HelpFunction.clone(_buildings[type]);
			buildedBuildings[countBuildings].connected = false;

			buildedBuildings[countBuildings].connections = [];

			/**
			 * Buildings um Connector erweitern 
			 */
			for (var j = 0; j < buildedBuildings.length; j++) {
				if(countBuildings != j) {
					buildedBuildings[countBuildings].connections[j] = false;
					buildedBuildings[j].connections[countBuildings] = false;
				}
			};


			buildedBuildings[countBuildings].lvl = 1;
			buildedBuildings[countBuildings].type = type;
			

			HelpFunction.pushEvent("buildBuilding", {
				'typeId': type
			});
		}
	}
	
	
	this.requestUpdate = function(buildingId) {
		if(buildedBuildings[buildingId].upgradeCost.stone <= _stone
			&& buildedBuildings[buildingId].upgradeCost.leafs <= _leafs
			&& buildedBuildings[buildingId].upgradeCost.food <= _food
			)
		{
			_leafs -= buildedBuildings[buildingId].upgradeCost.leafs;
			_stone -= buildedBuildings[buildingId].upgradeCost.stone;
			_food -= buildedBuildings[buildingId].upgradeCost.food;
			
			_buildings[buildedBuildings[buildingId].type]["upgradeCost"]["totalUpgrades"]++;
			
			
			buildedBuildings[buildingId].lvl += 1;
			buildedBuildings[buildingId].upgradeCost.leafs = Math.floor(buildedBuildings[buildingId].upgradeCost.leafs * _upgradeCostIncrease);
			buildedBuildings[buildingId].upgradeCost.stone = Math.floor(buildedBuildings[buildingId].upgradeCost.stone * _upgradeCostIncrease);
			buildedBuildings[buildingId].upgradeCost.food = Math.floor(buildedBuildings[buildingId].upgradeCost.food * _upgradeCostIncrease);  	
			
			updateRes();
			return true;
		}
		else {
			return false;
		}
	}

	this.getUpgradeCots = function(buildingId) {
		return buildedBuildings[buildingId].upgradeCost;
	}

	this.getCurrentValues = function() {
		var values = {
			'resources': {
				'leafs': _leafs,
				'stone': _stone,
				'food': _food
			},
			'antCount': _antW
		};

		console.log(values);
		return values;
	}

	this.setValues = function(values) {
		_leafs = values.resources.leafs;
		_stone = values.resources.stone;
		_food = values.resources.food;

		_antW = values.antCount;
	}

	/**
	 * [connectBuilding description]
	 * Verbindung von Gebäuden wurde hergestellt
	 * @param  {[object]} eventData [description]
	 * Enthählt "from" id (number) des 1. Gebäudes
	 * Enthält "to" id (number) des 2. Gebäudes
	 */
	this.connectBuilding = function(eventData) {
		buildedBuildings[eventData.from].connections[eventData.to] = true;
		buildedBuildings[eventData.to].connections[eventData.from] = true;

		buildedBuildings[eventData.from].connected = true;
		buildedBuildings[eventData.to].connected = true;
	}

	function checkConnection(arr) { 
		arr.connected = false;
		
		arr.connections.forEach(check);


		function check(element, index, array) {
			if(element == true) {
				arr.connected = true;
			}
		}

		
	}

	/**
	 * [disconnectBuilding description]
	 * Verbindung zwischen Gebäuden wurde getrennt
	 * @param  {[object]} eventData [description]
	 * Enthählt "from" id (number) des 1. Gebäudes
	 * Enthält "to" id (number) des 2. Gebäudes
	 */
	this.disconnectBuilding = function(eventData) {
		buildedBuildings[eventData.from].connections[eventData.to] = false;
		buildedBuildings[eventData.to].connections[eventData.from] = false;

		
		checkConnection(buildedBuildings[eventData.from]);
		checkConnection(buildedBuildings[eventData.to]);
	}


	function getConnectedBuildingsLevelByType(type) {
		var level = 0;

		for (var i = 0; i < _buildings[type].buildedBuildings.length; i++) {
			if(buildedBuildings[_buildings[type].buildedBuildings[i]].connected == true) {
				level += buildedBuildings[_buildings[type].buildedBuildings[i]].lvl;
			}
		};

		return level;
	}

	function getConnectedBuildingsCountByType(type) {
		var count = 0;

		for (var i = 0; i < _buildings[type].buildedBuildings.length; i++) {
			if(buildedBuildings[_buildings[type].buildedBuildings[i]].connected == true)
				count++;
		};


		return count;
	}
}
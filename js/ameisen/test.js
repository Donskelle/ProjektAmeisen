function test (_options) {
	var options = _options;

	//Bestand von Rohstoffen
	var _leafs = 1000;
	var _stone = 1000;
	var _food = 1000;
	var _amber = 1000;
	
	//Bestand und Kosten von Ameisen
	var _antW = 100;
	var _antS = 100;
	
	var _antCostW = {
		leafs: 10,
		stone: 10,
		food: 20
	};
	var _antCostS = {
		leafs: 10,
		stone: 10,
		food: 20
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
	var _prodAmber = 0;
	
	var _ratioLeafs = 1;
	var _ratioStone = 1;
	var _ratioHunt = 1;
	var _ratioHatch = 1;
	var _ratioClean = 1;

	
	var _upgradeCostIncrease = 2;
	
	//Tickrate der verschiedenen Loops
	var _tickRate = 1500;
	
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
	
	var _increment = 1.13;
	
			    //Buildings
    var _buildingCostRatio = 10; //balancing
    
    
    var buildedBuildings = [];


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
	    		leafs: 10,
	    		stone: 10,
	    		food: 0
	    	}
	    },
	    2 : { //mushroom chamber
	    	count: 1,
	    	costLeafs: 100,
	    	costStone: 50,
	    	costFood: 0,
	    	costLeafsHtml: zid("mushCostL"),
	    	costStoneHtml:	zid("mushCostS"),
	    	leafConsume: 2,
	    	foodProd: 1,
	    	upgradeCost: {
	    		leafs: 10,
	    		stone: 10,
	    		food: 0
	    	}
	    },
	    3 : { //storage
	    	count: 0,
	    	costLeafs: 200,
	    	costStone: 100,
	    	costFood: 0,
	    	costLeafsHtml: zid("storageCostL"),
	    	costStoneHtml:	zid("storageCostS"),
	    	upgradeCost: {
	    		leafs: 10,
	    		stone: 10,
	    		food: 0
	    	}
	    },
	    4 : { //pantry
	    	count: 0,
	    	costLeafs: 200,
	    	costStone: 100,
	    	costFood: 0,
	    	costLeafsHtml: zid("pantryCostL"),
	    	costStoneHtml:	zid("pantryCostS"),
	    	upgradeCost: {
	    		leafs: 10,
	    		stone: 10,
	    		food: 0
	    	}
	    },
	    5 : { //dumping ground
	    	count: 0,
	    	costLeafs: 500,
	    	costStone: 250,
	    	costFood: 0,
	    	costLeafsHtml: zid("dumpingCostL"),
	    	costStoneHtml:	zid("dumpingCostS"),
	    	upgradeCost: {
	    		leafs: 10,
	    		stone: 10,
	    		food: 0
	    	}
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
		
		
		
		
		var addAntW = zid("btn_addAntW");
		var addAntS = zid("btn_addAntS");
		
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
		
		addAntW.addEventListener("click", function(e) {
			setJobs(6,1);
		});	
		addAntS.addEventListener("click", function(e) {
			setJobs(7,1);
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
       _leafs += _prodLeafs;
       _stone += _prodStone;
       _food += _prodFood;
       _amber += _prodAmber;
       updateRes();
       
	

		window.setTimeout(gameLoop, _tickRate);
    }
    var _leafCount = zid("leafCount");
    var _stoneCount = zid("stoneCount");
    var _foodCount = zid("foodCount");
    var _amberCount = zid("amberCount");
    var _workerCount = zid("workerCount");
    var _soldierCount = zid("soldierCount");
    var _leafProd = zid("leafProd");
    var _stoneProd = zid("stoneProd");
    var _foodProd = zid("foodProd");
    var _amberProd = zid("amberProd");


    function updateRes() {
    	_prodLeafs = (_jobLeafs * _ratioLeafs) - (_buildings[2]["leafConsume"] * _buildings[2]["count"]);
    	if(_prodLeafs < 0){
    		_leafProd.style.color = "red";
    	}
    	else{
    		_leafProd.style.color = "green";
    	}
    	_prodStone = _jobStone * _ratioStone;
    	_prodFood = (_jobHunt * _ratioHunt) + (_buildings[2]["foodProd"] * _buildings[2]["count"]); //_mushroomLevel -> Gebaeudestufen
    	_workerCount.innerHTML = _antW;
    	_soldierCount.innerHTML = _antS;
    	_leafCount.innerHTML = _leafs;
    	_stoneCount.innerHTML = _stone;
    	_foodCount.innerHTML = _food;
    	_amberCount.innerHTML = _amber;
    	_leafProd.innerHTML = _prodLeafs;
    	_stoneProd.innerHTML = _prodStone;
    	_foodProd.innerHTML = _prodFood;
    	_amberProd.innerHTML = _prodAmber;
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
    	
    	if(_antW >= 1 || amount == -1)
    	{
	    	switch(type)
	    	{
	    		case 1: //collect leafs
	    			if(_jobLeafs >= 1 || amount == 1)
	    			_jobLeafs += amount;
	    			_jobCountL.innerHTML = _jobLeafs;
	    			
	    			break;
	    		case 2:	//collect stone
	    			if(_jobStone >= 1 || amount == 1)
	    			_jobStone += amount;
	    			_jobCountS.innerHTML = _jobStone;
	    			break;
	    		case 3: //hunt
	    			if(_jobHunt >= 1 || amount == 1)
	    			_jobHunt += amount;
	    			_jobCountHu.innerHTML = _jobHunt;
	    			break;
	    		case 4: //hatch
	    			if(_jobHatch >= 1 || amount == 1)
	    			_jobHatch += amount;
	    			_hatchRateW = _HATCHW - (_hatchRatioW * _jobHatch);
	    			_hatchRateS = _HATCHS - (_hatchRatioS * _jobHatch);
	    			_jobCountHa.innerHTML = _jobHatch;
	    			break;
	    		case 5:	//clean
	    			if(_jobClean >= 1 || amount == 1)
	    			_jobClean += amount;
	    			_jobCountC.innerHTML = _jobClean;
	    			//weitere Berechnung fehlt noch
	    			break;
	    		case 6:	//addAntW
	    		
	    			if(_leafs >= _antCostW["leafs"] && _stone >= _antCostW["stone"] && _food >= _antCostW["food"])
	    			{
		    			countdown(1, _hatchRateW);
		    			_leafs -= _antCostW["leafs"];
	  					_stone -= _antCostW["stone"];
	  					_food -= _antCostW["food"];
	    			}
	    			amount *= 0;
	    			break;
	    		case 7:	//addAntS
	    			if(_leafs >= _antCostS["leafs"] && _stone >= _antCostS["stone"] && _food >= _antCostW["food"])
    				{
	    				countdown(2, _hatchRateS);
	    				_leafs -= _antCostS["leafs"];
	  					_stone -= _antCostS["stone"];
	  					_food -= _antCostS["food"];
    				}
	    			amount *= 0;
	    			break;
	    	}
	    	_antW += -amount;
	    	updateRes();
	    }
    }
    
    var countdownW = zid("countdownW");
    function countdown (type, i) {
    	if(type == 1) {
    		 
    		countdownW.innerHTML = (Math.floor(i * 10) / 10).toFixed(2);
    		
    	}
    	else {
    		countdownS.innerHTML = (Math.floor(i * 10) / 10).toFixed(2);
    	}
	  
  		
	  if (i > 0) {
	    i -= .1;
	
	    window.setTimeout(function() {
	    	countdown(type,i);
	    }, 100);
	  }
	  else {
	  	switch(type) {
	  	case 1:
	  			countdownW.innerHTML = (0.00).toFixed(2);
	  			_antW++;
	  			
	  		break;
	  	case 2:
	  			countdownS.innerHTML = (0.00).toFixed(2);
	  			_antS++;
	  			
	  		break;
	  }
	  updateRes();
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
			
			
				
			_buildings[type]["costLeafsHtml"].innerHTML = _buildings[type]["costLeafs"];
			_buildings[type]["costStoneHtml"].innerHTML = _buildings[type]["costStone"];
			updateRes();
			
			switch(type) //kann eventuell raus?
			{
				case 1: //mushroom chamber
					
					
					break;
				case 2: //brood chamber
				
					break;
				case 3: //storage
				
					break;
				case 4: //pantry
				
					break;
				case 5: //dumping ground
				
					break;
			}

			var countBuildings = buildedBuildings.length;


			buildedBuildings[countBuildings] = {};

			HelpFunction.merge(buildedBuildings[countBuildings], _buildings[type]);
			buildedBuildings[countBuildings].lvl = 1;
			

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
			buildedBuildings[buildingId].upgradeCost.lvl += 1;
			buildedBuildings[buildingId].upgradeCost.stone *= _upgradeCostIncrease;
			buildedBuildings[buildingId].upgradeCost.food *= _upgradeCostIncrease;
			buildedBuildings[buildingId].upgradeCost.leafs *= _upgradeCostIncrease;
			return true;
		}
		else {
			return false;
		}
	}

	this.getUpgradeCots = function(buildingId) {
		return buildedBuildings[buildingId].upgradeCost;
	}

	this.getValues = function() {
		var values = {
			'ressources': {
				'leafs': 0,
				'stone': 0,
				'food': 0
			},
			'antCount': 0,
			'buildings': [
				{
					'buildingId': 0,
					'lvl': 10,
					'type': 0
				},
				{
					'buildingId': 0,
					'lvl': 10,
					'type': 0
				}
			]
		};

		return values;
	}

	this.setValues = function(values) {
		// zum zusammenfüheren verwenden
		//HelpFunction.merge(a,b);
	}


}
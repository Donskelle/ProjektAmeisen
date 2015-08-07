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
	
	
	//Tickrate der verschiedenen Loops
	var _tickRate = 1500;
	
	var _hatchRateW = 10000;	
	var _hatchRateS = 15000;
	
	//zur Berechnung s. setJobs case 4
	var _HATCHW = 10000; 
	var _HATCHS = 15000;
	
	//Balancing
	var _hatchRatioW = 10;
	var _hatchRatioS = 15;
	
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
	
	
  	
  	function init() {
  		var dumpingForm = zid(options.forms.dumpingBuild);
		var pantryForm = zid(options.forms.pantryBuild);
		var broodForm = zid(options.forms.broodBuild);
		var mushroomForm = zid(options.forms.mushroomBuild);
		var storageForm = zid(options.forms.storageBuild);

		dumpingForm.addEventListener("click", function(e) {
			build(1);
		});
		pantryForm.addEventListener("click", function(e) {
			build(2);
		});
		broodForm.addEventListener("click", function(e) {
			build(3);
		});
		mushroomForm.addEventListener("click", function(e) {
			build(4);
		});
		storageForm.addEventListener("click", function(e) {
			build(5);
		});
		
		
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
    function updateRes() {
    	_leafCount.innerHTML = _leafs;
    	_stoneCount.innerHTML = _stone;
    	_foodCount.innerHTML = _food;
    	_amberCount.innerHTML = _amber;

    	
    }
    
    // type = {1,2}
    function addAnts(type) {
    	switch(type)
    	{
    		case 1:
	    		if(_leafs >= _antCostW["leafs"] && _stone >= _antCostW[stone] && _food >= _antCostW[food])
	    		{
	    			_antW++;
	    		}
    			break;
    		case 2:
    			if(_leafs >= _antCostS[leafs] && _stone >= _antCostS[stone] && _food >= _antCostW[food])
    			{
    				_antS++;
    			}
    			break;
    	}
    }	
    
    _jobCountL = zid("jobCountL");
    _jobCountS = zid("jobCountS");
    _jobCountHu = zid("jobCountHu");
    _jobCountHa = zid("jobCountHa");
    _jobCountC = zid("jobCountC");
    
    //type = {1,2,3,4,5}, amount = {1,-1}
    function setJobs(type, amount) {
    	
    	if(_antW >= 1 || amount == -1)
    	{
	    	switch(type)
	    	{
	    		case 1: //collect leafs
	    			if(_jobLeafs >= 1 || amount == 1)
	    			_jobLeafs += amount;
	    			_prodLeafs = _jobLeafs * _ratioLeafs;
	    			_jobCountL.innerHTML = _jobLeafs;
	    			
	    			break;
	    		case 2:	//collect stone
	    			if(_jobStone >= 1 || amount == 1)
	    			_jobStone += amount;
	    			_prodStone = _jobStone * _ratioStone;
	    			_jobCountS.innerHTML = _jobStone;
	    			break;
	    		case 3: //hunt
	    			if(_jobHunt >= 1 || amount == 1)
	    			_jobHunt += amount;
	    			_prodFood = (_jobHunt * _ratioHunt) + (_mushroomLevel * _mushroomRatio); //_mushroomLevel -> Gebaeudestufen
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
	    	}
	    }
    }
    
    gameLoop();
    
    //Buildings
    var _buildingCostRatio = 10; //balancing
    
    
    
    //Kosten für neue Gebaeude(nicht Upgrades)
    var _buildings = {
	    1 : { //brood chamber
	    	count: 0,
	    	costLeafs: 20,
	    	costStone: 10,
	    	costFood: 0
	    },
	    2 : { //mushroom chamber
	    	count: 0,
	    	costLeafs: 100,
	    	costStone: 50,
	    	costFood: 0
	    },
	    3 : { //storage
	    	count: 0,
	    	costLeafs: 200,
	    	costStone: 100,
	    	costFood: 0
	    },
	    4 : { //pantry
	    	count: 0,
	    	costLeafs: 200,
	    	costStone: 100,
	    	costFood: 0
	    },
	    5 : { //dumping ground
	    	count: 0,
	    	costLeafs: 500,
	    	costStone: 250,
	    	costFood: 0
	    }
	};
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


			HelpFunction.pushEvent("buildBuilding", {
				'typeId': type
			});
		}
	}
	
	
	this.requestUpdate = function(buildingId) {
		// if(möglich) 
			// upgrade
		return true;
		// else
		return false;
	}

	this.getUpgradeCots = function(buildingId) {
		var costs = {
			leafs: 5,
			stone: 5,
			food: 0
		};

		
		return costs;
	}



}
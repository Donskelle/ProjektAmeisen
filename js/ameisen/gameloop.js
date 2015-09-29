function GameLoop (_options) {
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
	var dumpHillBar = zid("dumpHillBar");

	//Bestand von Rohstoffen
	var _leafs = 100;
	var _stone = 100;
	var _food = 25;
	var _dump = 10;
	
	var _prodDump = 0;
	
	var _jobCleanRatio = 1;
    var _dumpHill = 0;
	
	//Bestand und Kosten von Ameisen
	var unemployedAnts = 100;
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
	
	var ants = [];
	var posibleAnts = 1;
	
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
	
	var enoughFood = true;
	var enoughDump = true;
	
	//Buildings
    var _buildingCostRatio = 10; //balancing
    
    
    var buildedBuildings = [
	    {
	    	type: "start",
	    	connected: false,

			connections: []
	    }
    ];


    //Kosten für neue Gebaeude(nicht Upgrades)
    var buildingTypes = {
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
	    	costLeafs: 100,
	    	costStone: 100,
	    	costFood: 0,
	    	costLeafsHtml: zid("dumpingCostL"),
	    	costStoneHtml:	zid("dumpingCostS"),
	    	storeDump: 10,
	    	removeDump: 1,
	    	upgradeCost: {
	    		totalUpgrades: 1,
	    		leafs: 10,
	    		stone: 10,
	    		food: 0
	    	},
	    	
	    	buildedBuildings : []
	    }
	};


	var antBuildTimer = new antBuilder();
	var antJob = new antJobs();
  	
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


		zid("formSetLeafs").addEventListener("click", function(e) {
			antJob.setJobs(1, zid("jobCountL").value, true);

			e.preventDefault();
			return false;
		});
		zid("formSetStone").addEventListener("click", function(e) {
			antJob.setJobs(2, zid("jobCountS").value, true);

			e.preventDefault();
			return false;
		});
		zid("formSetHunt").addEventListener("click", function(e) {
			antJob.setJobs(3, zid("jobCountHu").value, true);

			e.preventDefault();
			return false;
		});
		zid("formSetBrood").addEventListener("click", function(e) {
			antJob.setJobs(4, zid("jobCountHa").value, true);

			e.preventDefault();
			return false;
		});
		zid("formSetClean").addEventListener("click", function(e) {
			antJob.setJobs(5, zid("jobCountC").value, true);

			e.preventDefault();
			return false;
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
			antBuildTimer.buildAnt(_hatchRateW);
		});	

		
		addJobL.addEventListener("click", function(e) {
			antJob.setJobs(1,1, false);
		});	
		subJobL.addEventListener("click", function(e) {
			antJob.setJobs(1,-1, false);
		});
		
		addJobS.addEventListener("click", function(e) {
			antJob.setJobs(2,1, false);
		});	
		subJobS.addEventListener("click", function(e) {
			antJob.setJobs(2,-1, false);
		});
		
		addJobHu.addEventListener("click", function(e) {
			antJob.setJobs(3,1, false);
		});	
		subJobHu.addEventListener("click", function(e) {
			antJob.setJobs(3,-1, false);
		});
		
		addJobHa.addEventListener("click", function(e) {
			antJob.setJobs(4,1, false);
		});	
		subJobHa.addEventListener("click", function(e) {
			antJob.setJobs(4,-1, false);
		});
		
		addJobC.addEventListener("click", function(e) {
			antJob.setJobs(5,1, false);
		});	
		subJobC.addEventListener("click", function(e) {
			antJob.setJobs(5,-1, false);
		});
		

		for(var i=1; i<=5; i++) {
			buildingTypes[i]["costLeafsHtml"].innerHTML = buildingTypes[i]["costLeafs"];
			buildingTypes[i]["costStoneHtml"].innerHTML = buildingTypes[i]["costStone"];
		}
  	}
  	init();
  

    function gameLoop() {
    	if(_leafs + _prodLeafs <= buildingTypes[3]["storeLeafs"]){
    		_leafs += _prodLeafs;
    	}
    	else {
    		_leafs = buildingTypes[3]["storeLeafs"];
    	}
    	if(_stone + _prodStone <= buildingTypes[3]["storeStone"]){
    		_stone += _prodStone;
    	}
    	else {
    		_stone = buildingTypes[3]["storeStone"];
    	}
    	if(_food + _prodFood <= buildingTypes[4]["storeFood"]){
    		_food += _prodFood;
    	}
    	else {
    		_food = buildingTypes[4]["storeFood"];
    	}
    	if(_food + _prodFood < 0){
    		_food = 0;
    		
    	}
    	
    	if(_dump + _prodDump > buildingTypes[5]["storeDump"]) {
    		_dumpHill -= buildingTypes[5]["storeDump"] - _dump;
    		_dump = buildingTypes[5]["storeDump"];
    		//_dumpHill -= _dump - (buildingTypes[5]["storeDump"] + (unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean)-10);
    		//alert(_dump - (buildingTypes[5]["storeDump"] + (unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean)-10));
    	}
    	else {
    		_dump += _prodDump;
    		_dumpHill -= _prodDump;
    	}
    	
    	if((unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean) > 0){
    		_dumpHill += Math.floor((unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean)/10);
    	}
    	if(_dump - (2 + buildingTypes[5]["removeDump"] * buildingTypes[5]["upgradeCost"].totalUpgrades) >= 0){
    		_dump -= 2 + buildingTypes[5]["removeDump"] * buildingTypes[5]["upgradeCost"].totalUpgrades;
    	}
    	else {
    		_dump = 0;
    	}
    	
      
       
       
       updateRes();
       
	

		window.setTimeout(gameLoop, _tickRate);
    }
		
    function updateRes() {
    	var connectedBuildingsLevel = HelpFunction.getConnectedBuildingsLevelByType(buildingTypes, buildedBuildings, 3);
    	var maxRes = 15;
    	for (var i = 0; i < connectedBuildingsLevel; i++) {
    		maxRes = 10 + Math.floor(maxRes * 1.03);
    	};

    	buildingTypes[3]["storeLeafs"] = maxRes;
    	buildingTypes[3]["storeStone"] = maxRes;
		buildingTypes[5]["storeDump"] =  Math.round(10 * buildingTypes[5]["upgradeCost"].totalUpgrades * 1.03);
		
		

    	connectedBuildingsLevel = HelpFunction.getConnectedBuildingsLevelByType(buildingTypes, buildedBuildings, 4);
    	var maxFood = 25;
    	for (var i = 0; i < connectedBuildingsLevel; i++) {
    		maxFood = 10 + Math.floor(maxFood * 1.03);
    	};
    	buildingTypes[4]["storeFood"] = maxFood;

		
    	connectedBuildingsLevel = HelpFunction.getConnectedBuildingsLevelByType(buildingTypes, buildedBuildings, 2);
    	var connectedBuildingsCount = HelpFunction.getConnectedBuildingsCountByType(buildingTypes, buildedBuildings, 2);

    	_prodLeafs = (_jobLeafs * _ratioLeafs) - (buildingTypes[2]["leafConsume"] * connectedBuildingsLevel);
    	_prodStone = _jobStone * _ratioStone;
    	_prodFood = (_jobHunt * _ratioHunt) + (buildingTypes[2]["foodProd"] * connectedBuildingsLevel) - (unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean);
	
    	
    	if(_dumpHill >= _jobClean * _jobCleanRatio){
    		_prodDump = (_jobClean * _jobCleanRatio);
    	}
    	else {
    		_prodDump = _dumpHill;
    	}

    	if(_prodLeafs < 0) {
    		_leafProd.style.color = "red";
    		_leafProd.innerHTML = _prodLeafs;
    	}
    	else if(_prodLeafs > 0) {
    		_leafProd.style.color = "green";
    		_leafProd.innerHTML = "+" + _prodLeafs;
    	}
    	else {
    		_leafProd.style.color = "black";
    		_leafProd.innerHTML = _prodLeafs;
    	}
    	if(_prodStone < 0) {
    		_stoneProd.style.color = "red";
    		_stoneProd.innerHTML = _prodStone;
    	}
    	else if(_prodStone > 0) {
    		_stoneProd.style.color = "green";
    		_stoneProd.innerHTML = "+" + _prodStone;
    	}
    	else {
    		_stoneProd.style.color = "black";
    		_stoneProd.innerHTML = _prodStone;
    	}
    	 
    	if(enoughDump && _dumpHill > (unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean) * 10) {
			alert("Warnung! In deinem Bau befinden sich zu viele Abfälle. Deine Ameisen werden krank und sterben. Du solltest deine Ameisen schnell den Bau säubern lassen und ggf. die Abfallkammer erweitern.");
			enoughDump = false;
    	}
    	if(enoughFood && _food <= 0) {
			alert("Deine Nahrung ist leer.\nStell schnell wieder ein Gleichgewicht her! Deine Ameisen werden nun nach und nach sterben, außerdem kannst du keine Gebäude bauen oder upgraden.");
			enoughFood = false;
    	}
    	else if(!enoughFood && _food > 0) {
			enoughFood = true;
    	}
    	else if(!enoughDump && _dumpHill < (unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean) * 10) {
			enoughDump = true;
    	}
    	else if(!enoughFood || _dumpHill > (unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean) * 10) {
    		var deathRate = Math.ceil((unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean)/25);
			var random = Math.random();
			// Jeden 20sten Durchlauf
			if(random <= 0.05)
			{
				var reduced = false;
				
				var antCount = deathRate;

				if(antCount>0) 
				{ 
					while (!reduced) 
					{
						var randomJob = Math.floor(Math.random() * 6);
						switch(randomJob) {
				    		case 0:
				    			if(unemployedAnts > 0) {
				    				unemployedAnts -= 1;
				    				reduced = true;
				    			}
				    			break;
				    		case 1:
	 							if(_jobLeafs > 0) {
				    				_jobLeafs -= 1;
				    				reduced = true;
				    			}
				    			break;
				    		case 2:
	 							if(_jobStone > 0) {
				    				_jobStone -= 1;
				    				reduced = true;
				    			}
				    			break;
				    		case 3:
	 							if(_jobHatch > 0) {
				    				_jobHatch -= 1;
				    				reduced = true;
				    			}
				    			break;
				    		case 4:
	 							if(_jobHunt > 0) {
				    				_jobHunt -= 1;
				    				reduced = true;
				    			}
				    			break;
				    		case 5:
	 							if(_jobClean > 0) {
				    				_jobClean -= 1;
				    				reduced = true;
				    			}
				    			break;
						}
					}
				}
				antJob.updateJobs();
			}
    	}




    	if(_prodFood < 0) {
    		_foodProd.style.color = "red";
    		_foodProd.innerHTML = _prodFood;
    	}
    	else if(_prodFood > 0) {
    		_foodProd.style.color = "green";
    		_foodProd.innerHTML = "+" + _prodFood;
    	}
    	else {
    		_foodProd.style.color = "black";
    		_foodProd.innerHTML = _prodFood;
    	}
    	
    	var allAnts = Math.floor((unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean) * 10);

    	_workerCount.innerHTML = unemployedAnts;
    	
    	_leafCount.innerHTML = _leafs;
    	_stoneCount.innerHTML = _stone;
    	_foodCount.innerHTML = _food;
    	_dumpCount.innerHTML = _dump;
    	
    	
    	
    	_dumpProd.innerHTML = _prodDump;
    	
    	_leafStorage.innerHTML = buildingTypes[3]["storeLeafs"];
		_stoneStorage.innerHTML = buildingTypes[3]["storeStone"];
		_foodStorage.innerHTML = buildingTypes[4]["storeFood"];
		_dumpStorage.innerHTML = buildingTypes[5]["storeDump"];
		
		
		leafBar.style.width = (_leafs/buildingTypes[3]["storeLeafs"])*100 + "%"; 
		stoneBar.style.width = (_stone/buildingTypes[3]["storeStone"])*100 + "%"; 
		foodBar.style.width = (_food/buildingTypes[4]["storeFood"])*100 + "%"; 
		dumpBar.style.width = (_dump/buildingTypes[5]["storeDump"])*100 + "%"; 
		
				
		if(_dumpHill < allAnts * 10/100){
			dumpHillBar.style.background = "green";
		}
		else if(_dumpHill < allAnts * 20/100){
			dumpHillBar.style.background = "#4D960E";
		}
		else if(_dumpHill < allAnts * 30/100){
			dumpHillBar.style.background = "#6B960E";
		}
		else if(_dumpHill < allAnts * 40/100){
			dumpHillBar.style.background = "#82960E";
		}
		else if(_dumpHill < allAnts * 50/100){
			dumpHillBar.style.background = "#968F0E";
		}
		else if(_dumpHill < allAnts * 60/100){
			dumpHillBar.style.background = "#967C0E";
		}
		else if(_dumpHill < allAnts * 70/100){
			dumpHillBar.style.background = "#965E0E";
		}
		else if(_dumpHill < allAnts * 80/100){
			dumpHillBar.style.background = "#96550E";
		}
		else if(_dumpHill < allAnts * 90/100){
			dumpHillBar.style.background = "#913F10";
		}
		else if(_dumpHill >= allAnts){
			dumpHillBar.style.background = "#912C10";
			_dumpHill = allAnts;
		}
		
		_dumpHillhtml.innerHTML = _dumpHill + " / " + allAnts;

		antBuildTimer.update();
		
		updateButtons();
    }
 
 
 	var broodBuild = zid("broodBuild");
 	var mushroomBuild = zid("mushroomBuild");
 	var storageBuild = zid("storageBuild");
 	var pantryBuild = zid("pantryBuild");
 	var dumpingBuild = zid("dumpingBuild");
 	
 	var broodBuildWrapper = zid("broodChamberWrapper");
 	var mushroomBuildWrapper = zid("mushroomChamberWrapper");
 	var storageBuildWrapper = zid("storageWrapper");
 	var pantryBuildWrapper = zid("pantryWrapper");
 	var dumpingBuildWrapper = zid("dumpingGroundWrapper");
 	
 	var jobButtons = {
 		1 : zid("btn_addJobL"),
 		2 : zid("btn_subJobL"),
 		3 : zid("btn_addJobS"),
 		4 : zid("btn_subJobS"),
 		5 : zid("btn_addJobHu"),
 		6 : zid("btn_subJobHu"),
 		7 : zid("btn_addJobHa"),
 		8 : zid("btn_subJobHa"),
 		9 : zid("btn_addJobC"),
 		10: zid("btn_subJobC")
 	};
 	

 	var buildFormElements = {
 		//brood: 
 		1: {
 			wrapper: broodBuildWrapper,
 			button: broodBuild 
 		},
 		// mushroom: {
 		2: {
 			wrapper: mushroomBuildWrapper,
 			button: mushroomBuild
 		},
 		//storage: {
 		3: {
 			wrapper: storageBuildWrapper,
 			button: storageBuild
 		},
 		//pantry: {
 		4: {
 			wrapper: pantryBuildWrapper,
 			button: pantryBuild
 		},
 		//dumping {
 		5: {
 			wrapper: dumpingBuildWrapper,
 			button: dumpingBuild
 		}
 	};
 	

 	/**
 	 * [updateButtons description]
 	 * Diese Funktion prüft, ob unterschiedliche Aktionen durchführbar sind und ggf. die Buttons auf disabled
 	 */
	function updateButtons(){
		
		for(var i=1; i<=5; i++){
			if(_leafs >= buildingTypes[i].costLeafs && _stone >= buildingTypes[i].costStone && _food >= buildingTypes[i].costFood){
				buildFormElements[i].button.disabled = false;	
				HelpFunction.toggleClassName(buildFormElements[i].wrapper, false, "disabled");	
			}
			else{
				//alert(buildButtons[i]);
				buildFormElements[i].button.disabled = true;
				HelpFunction.toggleClassName(buildFormElements[i].wrapper, true, "disabled");
			}
		}
		
		if(_antCostW["leafs"] <= _leafs && _antCostW["stone"] <= _stone && _antCostW["food"] <= _food && posibleAnts != ants.length){
			zid("btn_addAntW").disabled = false;
		}
		else {
			zid("btn_addAntW").disabled = true;
		}
			
		if(unemployedAnts <= 0) {
			jobButtons[1].disabled = true;
			jobButtons[3].disabled = true;
			jobButtons[5].disabled = true;
			jobButtons[7].disabled = true;
			jobButtons[9].disabled = true;
		}
		else {
			jobButtons[1].disabled = false;
			jobButtons[3].disabled = false;
			jobButtons[5].disabled = false;
			jobButtons[7].disabled = false;
			jobButtons[9].disabled = false;
		}
		
		if(_jobLeafs <= 0){
			jobButtons[2].disabled = true;
		}
		else{
			jobButtons[2].disabled = false;
		}
		if(_jobStone <= 0){
			jobButtons[4].disabled = true;
		}
		else{
			jobButtons[4].disabled = false;
		}
		if(_jobHunt <= 0){
			jobButtons[6].disabled = true;
		}
		else{
			jobButtons[6].disabled = false;
		}
		if(_jobHatch <= 0){
			jobButtons[8].disabled = true;
		}
		else{
			jobButtons[8].disabled = false;
		}
		if(_jobClean <= 0){
			jobButtons[10].disabled = true;
		}
		else{
			jobButtons[10].disabled = false;
		}
	}

	
	/**
	 * [antJobs description]
	 * Dieses Object ist für die Einstellung der Jobs zuständig. Sollte Aktionen nicht möglich sein, werden diese per Alert ausgeben.
	 */
    function antJobs()
    {
    	var _jobAntW = zid("jobAntW");
	    var _jobCountL = zid("jobCountL");
	    var _jobCountS = zid("jobCountS");
	    var _jobCountHu = zid("jobCountHu");
		var _jobCountHa = zid("jobCountHa");
	    var _jobCountC = zid("jobCountC");

	    /**
	     * [setJobs description]
	     * Diese public Methode stellt die Schnittstelle zum eigentlichen Einstellen der Ameisen dar.
	     * Sie prüft, ob Ameisen entfernt oder hinzugefügt werden können.
	     * @param {[number]} type     [description]
	     * Art des Jobs der Verändert werden soll
	     * @param {[number]} amount   [description]
	     * Anzahl der Ameisen für diesen Job
	     * @param {[boolean]} override [description]
	     * Boolean der angibt, ob der aktuelle Wert überschrieben werden soll.
	     */
    	this.setJobs = function (type, amount, override) 
    	{
    		
    		amount = parseInt(amount);

    		if(!isNaN(amount)) 
    		{
	    		if(override && amount >= 0) 
	    		{
	    			switch(type)
			    	{
			    		case 1: //collect leafs
			    			// Wird verringert
			    			if(_jobLeafs >= amount) {
			    				unemployedAnts += _jobLeafs - amount;
			    				_jobLeafs = amount;
			    			}
			    			// Genug arbeiter
			    			else if(_jobLeafs + unemployedAnts >= amount) {
			    				unemployedAnts += _jobLeafs - amount;
			    				_jobLeafs = amount;
			    			}	
			    			else {
			    				alert("Nicht genug arbeiter")
			    			}
			    			_jobCountL.value = _jobLeafs;
			    			break;
			    		case 2:	// collect stone
			    			if(_jobStone >= amount) {
			    				unemployedAnts += _jobStone - amount;
			    				_jobStone = amount;
			    			}
			    			// Genug arbeiter
			    			else if(_jobStone + unemployedAnts >= amount) {
			    				unemployedAnts += _jobStone - amount;
			    				_jobStone = amount;
			    			}	
			    			else {
			    				alert("Nicht genug arbeiter");
			    			}
			    			_jobCountS.value = _jobStone;

			    			break;
			    		case 3: // hunt
			    			if(_jobHunt >= amount) {
			    				unemployedAnts += _jobHunt - amount;
			    				_jobHunt = amount;
			    			}
			    			// Genug arbeiter
			    			else if(_jobHunt + unemployedAnts >= amount) {
			    				unemployedAnts += _jobHunt - amount;
			    				_jobHunt = amount;
			    			}	
			    			else {
			    				alert("Nicht genug arbeiter")
			    			}
			    			_jobCountHu.value = _jobHunt;

			    			break;
			    		case 4: // hatch
			    			if(_jobHatch >= amount) {
			    				unemployedAnts += _jobHatch - amount;
			    				_jobHatch = amount;
			    			}
			    			// Genug arbeiter
			    			else if(_jobHatch + unemployedAnts >= amount) {
			    				unemployedAnts += _jobHatch - amount;
			    				_jobHatch = amount;
			    			}	
			    			else {
			    				alert("Nicht genug arbeiter")
			    			}
			    			_hatchRateW = _HATCHW - (_hatchRatioW * _jobHatch);
		    				_hatchRateS = _HATCHS - (_hatchRatioS * _jobHatch);
		    				_jobCountHa.value = _jobHatch;

			    			break;
			    		case 5:	//clean
			    			if(_jobClean >= amount) {
			    				unemployedAnts += _jobClean - amount;
			    				_jobClean = amount;
			    			}
			    			// Genug arbeiter
			    			else if(_jobClean + unemployedAnts >= amount) {
			    				unemployedAnts += _jobClean - amount;
			    				_jobClean = amount;
			    			}	
			    			else {
			    				alert("Nicht genug arbeiter")
			    			}
			    			_jobCountC.value = _jobClean;

			    			break;
			    	}
	    		}
	    		else if(unemployedAnts 	>= amount || amount == -1 && override == false)
		    	{
			    	switch(type)
			    	{
			    		case 1: //collect leafs
			    			if(_jobLeafs >= 1 || amount == 1) {
			    				_jobLeafs += amount;
			    				_jobCountL.value = _jobLeafs;
			    				unemployedAnts += -amount;
			    			}
			    			break;
			    		case 2:	//collect stone
			    			if(_jobStone >= 1 || amount == 1) {
			    				_jobStone += amount;
			    				_jobCountS.value = _jobStone;
			    				unemployedAnts += -amount;
			    			}
			    			break;
			    		case 3: //hunt
			    			if(_jobHunt >= 1 || amount == 1) {
			    				_jobHunt += amount;
			    				_jobCountHu.value = _jobHunt;
			    				unemployedAnts += -amount;
			    			}
			    			break;
			    		case 4: //hatch
			    			if(_jobHatch >= 1 || amount == 1) {
			    				_jobHatch += amount;
			    				_hatchRateW = _HATCHW - (_hatchRatioW * _jobHatch);
			    				_hatchRateS = _HATCHS - (_hatchRatioS * _jobHatch);
			    				_jobCountHa.value = _jobHatch;
			    				unemployedAnts += -amount;
			    			}
			    			break;
			    		case 5:	//clean
			    			if(_jobClean >= 1 || amount == 1) {
			    				_jobClean += amount;
			    				_jobCountC.value = _jobClean;
			    				unemployedAnts += -amount;
			    			}
			    			break;
			    	}
			    }
			    checkSize();
			    updateRes();
		    }
    	}

    	/**
    	 * [updateJobs description]
    	 * Diese public Methode updatet die dargestellten Jobs, entsprechend der aktuellen Variablen
    	 */
    	this.updateJobs = function() {
    		_jobCountL.value = _jobLeafs;
    		_jobCountS.value = _jobStone;
    		_jobCountHu.value = _jobHunt;

    		_hatchRateW = _HATCHW - (_hatchRatioW * _jobHatch);
			_hatchRateS = _HATCHS - (_hatchRatioS * _jobHatch);
			_jobCountHa.value = _jobHatch;

			_jobCountC.value = _jobClean;
    	}
    }
    
    
    gameLoop();
    

	
	
	/**
	 * [build description]
	 * Diese Methode erstellt ein neues Gebäude des angebenen Typs
	 * @param  {[number]} type [description]
	 * Art des Gebäudes
	 * 1: brood
	 * 2: mush
	 * 3: storage
	 * 4: pantry
	 * 5: dumping
	 */
	function build(type) {
		//Abfrage, ob die Ressourcen die Kosten uebersteigen
		if(_leafs >= buildingTypes[type]["costLeafs"] && _stone >= buildingTypes[type]["costStone"] && _food >= buildingTypes[type]["costFood"])
		{
			
			//Abzug der Kosten
			_leafs -= buildingTypes[type]["costLeafs"];
			_stone -= buildingTypes[type]["costStone"];
			_food -= buildingTypes[type]["costFood"];
			
			//Neuberechnung der Kosten
			buildingTypes[type]["costLeafs"] *= _buildingCostRatio;
			buildingTypes[type]["costStone"] *= _buildingCostRatio;
			buildingTypes[type]["costFood"] *= _buildingCostRatio;
			
			buildingTypes[type]["count"]++;
			
			buildingTypes[type]["upgradeCost"]["totalUpgrades"]++;
				
			buildingTypes[type]["costLeafsHtml"].innerHTML = buildingTypes[type]["costLeafs"];
			buildingTypes[type]["costStoneHtml"].innerHTML = buildingTypes[type]["costStone"];
			
			if(type == 1) {
				antBuildTimer.update();
			}

			else if(type == 3) {
		    	buildingTypes[3]["storeLeafs"] = 10 + Math.floor(buildingTypes[3]["storeLeafs"] * (1.03));
		    	buildingTypes[3]["storeStone"] = 10 + Math.floor(buildingTypes[3]["storeStone"] * (1.03));
			}
			else if(type == 4) {
	    		buildingTypes[4]["storeFood"] = 10 + Math.floor(buildingTypes[4]["storeFood"] * (1.03));
			}
			
			updateRes();
			
			
			var countBuildings = buildedBuildings.length;

			buildingTypes[type].buildedBuildings[buildingTypes[type].buildedBuildings.length] = countBuildings;

			buildedBuildings[countBuildings] = {};
			buildedBuildings[countBuildings] = HelpFunction.clone(buildingTypes[type]);
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
	
	/**
	 * [requestUpdate description]
	 * Public Mehtode überprüft, ob genügend Rohstoffe für ein Upgrade verfügbar sind.
	 * @param  {[number]} buildingId [description]
	 * Id des Gebäudes, welches upgedrated werden soll
	 */
	this.requestUpdate = function(buildingId) {
		if(buildedBuildings[buildingId].upgradeCost.stone <= _stone
			&& buildedBuildings[buildingId].upgradeCost.leafs <= _leafs
			&& buildedBuildings[buildingId].upgradeCost.food <= _food
			)
		{
			_leafs -= buildedBuildings[buildingId].upgradeCost.leafs;
			_stone -= buildedBuildings[buildingId].upgradeCost.stone;
			_food -= buildedBuildings[buildingId].upgradeCost.food;
			
			buildingTypes[buildedBuildings[buildingId].type]["upgradeCost"]["totalUpgrades"]++;
			
			
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

	/**
	 * [getUpgradeCots description]
	 * Public Methode zur Abfrage der aktuellen Upgradekosten für ein Gebäude
	 * @param  {[number]} buildingId [description]
	 * Id des abzufragenden Gebäudes
	 */
	this.getUpgradeCots = function(buildingId) {
		return buildedBuildings[buildingId].upgradeCost;
	}

	/**
	 * [getCurrentValues description]
	 * Public Mehtode zur Abfrage der aktuellen Rohstoffe und Jobs
	 * @return {[object]} [description]
	 */
	this.getCurrentValues = function() {
		var values = {
			'resources': {
				'leafs': _leafs,
				'stone': _stone,
				'food': _food
			},
			'ants': {
				'unemployed': unemployedAnts,
				'jobLeaf': _jobLeafs,
				'jobStone': _jobStone,
				'jobHunt': _jobHunt,
				'jobHatch': _jobHatch,
				'jobClean': _jobClean
			}
		};

		return values;
	}

	/**
	 * [setValues description]
	 * Public Methode zum Überschreiben der Rohstoffe und Jobs
	 * @param {[object]} values [description]
	 * Siehe getCurrentValues
	 */
	this.setValues = function(values) {
		_leafs = values.resources.leafs;
		_stone = values.resources.stone;
		_food = values.resources.food;

		unemployedAnts = values.ants.unemployed;
		_jobLeafs = values.ants.jobLeaf;
		_jobStone = values.ants.jobStone;
		_jobHunt = values.ants.jobHunt;
		_jobClean = values.ants.jobClean;

		antJob.updateJobs();
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

	/**
	 * [checkConnection description]
	 * Prüft, ob eine Gebäude noch eine Verbindung zu einem anderen hat
	 * @param  {[object]} arr [description]
	 * Gebäude welches durchsucht werden soll
	 */
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


	/**
	 * [antBuilder description]
	 * @return {[type]} [description]
	 */
	function antBuilder () {
		var timer;
		var countdownW = zid("countdownW");

		var countDowns = {
			ants: {
				end: null
			}
		}
		


		function updateViewBuilder() {
			var countsAnt = ants.length;
			//var countsSolders = solders.length;
			

			var countBuildingsLvl = HelpFunction.getConnectedBuildingsLevelByType(buildingTypes, buildedBuildings, 1);
			var countBuildings = HelpFunction.getConnectedBuildingsCountByType(buildingTypes, buildedBuildings, 1);

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

		this.buildAnt = function(rate) {
			if(_leafs >= _antCostW["leafs"] && _stone >= _antCostW["stone"] && _food >= _antCostW["food"])
			{
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

				_leafs -= _antCostW["leafs"];
				_stone -= _antCostW["stone"];
				_food -= _antCostW["food"];

				updateViewBuilder();
			}
			else {
				alert("Sie haben nicht genügend Rohstoffe");
			}
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
	    					unemployedAnts++;
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
	
	// Startbildschirm
	var menuWrapper = zid("menuWrapper");
	var screens = {
		1 :  "url(./img/Startbild-01.png)",
		2 :  "url(./img/Startbild-02.png)",
		3 :  "url(./img/Startbild-03.png)",
		4 :  "url(./img/Startbild-04.png)",
	};
	function checkSize() {
		if(unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean > 1000){
			menuWrapper.style.backgroundImage = screens[4];
		}
		else if(unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean > 500){
			menuWrapper.style.backgroundImage = screens[3];
		}
		else if(unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean > 100){
			menuWrapper.style.backgroundImage = screens[2];
		}
		else if(unemployedAnts + _jobLeafs + _jobStone + _jobHunt + _jobHatch + _jobClean < 100){
			menuWrapper.style.backgroundImage = screens[1];
		}
		
	}
	
	
}
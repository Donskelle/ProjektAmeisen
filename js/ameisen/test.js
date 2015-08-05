window.addEventListener('load', function() {

	//Bestand von Rohstoffen
	var _leafs = 0;
	var _stone = 0;
	var _food = 0;
	var _amber = 0;
	
	//Bestand und Kosten von Ameisen
	var _antW = 0;
	var _antS = 0;
	
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
	
  
  
    function gameLoop() {
       _leafs += _prodLeafs;
       _stone += _prodStone;
       _food += _prodFood;
       _amber += _prodAmber;
       
       
	

		window.setTimeout(gameLoop, tickRate);
    }
    
    // type = {1,2}
    function addAnts(type) {
    	switch(type)
    	{
    		case 1:
	    		if(_leafs >= _antCostW[leafs] && _stone >= _antCostW[stone] && _food >= _antCostW[food])
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
	    			break;
	    		case 2:	//collect stone
	    			if(_jobStone >= 1 || amount == 1)
	    			_jobStone += amount;
	    			_prodStone = _jobStone * _ratioStone;
	    			break;
	    		case 3: //hunt
	    			if(_jobHunt >= 1 || amount == 1)
	    			_jobHunt += amount;
	    			_prodFood = _jobHunt * _ratioHunt;
	    			break;
	    		case 4: //hatch
	    			if(_jobHatch >= 1 || amount == 1)
	    			_jobHatch += amount;
	    			_hatchRateW = _HATCHW - (_hatchRatioW * _jobHatch);
	    			_hatchRateS = _HATCHS - (_hatchRatioS * _jobHatch);
	    			break;
	    		case 5:	//clean
	    			if(_jobClean >= 1 || amount == 1)
	    			_jobClean += amount;
	    			//weitere Berechnung fehlt noch
	    			break;
	    	}
	    }
    }
    
    gameLoop();
    
    //Buildings
    var buildingCostRatio = 5; //balancing
    
    
    
    //Kosten für neue Gebaeude(nicht Upgrades)
    var buildings = {
	    1 : { //mushroom chamber
	    	count: 0,
	    	costLeafs: 20,
	    	costStone: 10,
	    	costFood: 0
	    },
	    2 : { //brood chamber
	    	count: 0,
	    	costLeafs: 0,
	    	costStone: 0,
	    	costFood: 0
	    },
	    3 : { //storage
	    	count: 0,
	    	costLeafs: 0,
	    	costStone: 0,
	    	costFood: 0
	    },
	    4 : { //pantry
	    	count: 0,
	    	costLeafs: 0,
	    	costStone: 0,
	    	costFood: 0
	    },
	    5 : { //dumping ground
	    	count: 0,
	    	costLeafs: 0,
	    	costStone: 0,
	    	costFood: 0
	    }
	};
	//type = {1,2,3,4,5}
	function build(type) {
		if(_leafs >= buildins[type][costLeafs] && _stone >= buildings[type][costStone] && _food >= buildings[type][costFood])
		{
			switch(type)
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
		}

	}

});
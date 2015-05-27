var Model = {
    eigenschaft : 1,
    test : 4,
	    
	//Je nachdem, welcher zugehörige Button gedrückt wurde, wird ein Wert übergeben und die neue Ameisenanzahl errechnet    
	setAnts : function (test) {
      	test++;
        alert("test = " + test);
        view.methode(test);
  	},
  	//Wird eine Ameise umverteilt, wird ein Wert (Typ) und eine Anzahl (+1, -1) uebergeben und daraus die neuen Werte errechnet
	setJobs : function (test) {

        view.methode(test);
   	},
   	//Addiert die Gewinne bzw. subtraiert die Kosten (pro Tick, Bau/Upgrade von Gebaeuden) von den Rohstoffen
	setResources : function (test) {

        view.methode(test);
  	},
  	//Addiert neu produzierte Larven hinzu bzw. subtraiert Larven, wenn z.B. eine neue Soldatin "gebaut" wurde
	setLarvae : function (test) {

        view.methode(test);
    }, 
    //erhoeht die entsprechende Kammeranzahl, wenn eine neue gebaut wurde
    setChamberCount : function (test) {

        view.methode(test);
    },
    //erhoeht die Stufe einer bereits gebauten Kammer
    setChamberUpgrade : function (test) {

        view.methode(test);
    },
    //Berechnet aus gegebenen Werden (Nahrungsmittelvorrat, Sauberkeit, etc.) die Bedürfnisse und gibt sie ueber die View aus
    setNeeds : function (test) {

        view.methode(test);
    },
    //Bei einem zufaelligen Event wird hier bestimmt, welches Ereignis ausgelöst wird
    getConsoleText : function (test) {

        view.methode(test);
    },
       
};

var test = 1;
var Controller = {
    eigenschaft : 1,
    test : 4,
	    
	//Hier wird ein zufaelliges Event ausgeloest. Wenn es ausgeloest wird, aktiviert sich ein Timer (zufaelliger Wert), 
	//der das naechste Event ausloest   
	randomConsoleEvent : function (test) {

        Model.methode(test);
  	},
  
  //Hier folgen spaeter noch die ClickFunctions der einzelnen Buttons
    
};

window.onload = codeAddress();

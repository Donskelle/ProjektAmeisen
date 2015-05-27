var View = {
    eigenschaft : 1,
    test : 4,
    
    //Updatet die Textfelder der Ameisen (Arbeiterinnen und Soldatinnen), sobald eine neu Ameise "geboren"/hinzugefügt wurde
    updateAnts : function (test) {
    	test++;
        alert("test = " + test);

    },
    //Updatet die Textfelder der verschiedenen Jobs, sobald Ameisen umverteilt wurden
    updateJobs : function (test) {
    	test++;
        alert("test = " + test);

    },
    //Updatet die Ressourcen, sobald erforderlich (pro Tick, Kammer gebaut, Ameise "gebaut")
    updatResources : function (test) {
    	test++;
        alert("test = " + test);

    },
    //Updatet die Textfelder der Larven, sobald eine neue geboren bzw. eine vorhandene weiterentwickelt wurde
    updateLarvae : function (test) {
    	test++;
        alert("test = " + test);

    },
    //Sobald eine neue Kammer gebaut wurde, wird diese Methode vom Model aufgerufen
    updateChamberCount : function (test) {
    	test++;
        alert("test = " + test);

    },
    //Sobald eine Kammer erweitert wurde, wird diese Methode vom Model aufgerufen
    updateChamberUpgrade : function (test) {
    	test++;
        alert("test = " + test);

    },
    //Im Model werden die Bedürfnisse errechnet und hier die grafische Anzeige geupdatet
    updateNeeds : function (test) {
    	test++;
        alert("test = " + test);

    },
    //Sobald im Model z.B. ein zufaelliges Ereignis ausgeloest wird, wird diese Methode aufgerufen und die Konsole geupdatet
    updateConsoleText : function (test) {
    	test++;
        alert("test = " + test);

    },
    //Zeichnet auf dem Canvas die entsprechenden Kammern und Tunnel (sofern vorhanden)
    drawCanvas : function (test) {
    	test++;
        alert("test = " + test);

    }
};
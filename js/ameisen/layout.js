/**
 * [load description]
 * @return {[type]} [description]
 */
function load() {
	var isClicked = false;

	var menuButton = zid("btn_toggleMenu");
	var menuWrapper = zid("menuWrapper");
	var gameWrapper = zid("gameWrapper");

	var menuHowToPlay = zid("menuHowToPlay");
	var menuSettings = zid("menuSettings");
	var howToPlay = zid("howToPlay");
	var settings = zid("settings");

	/**
	 * Wechsel zwischen Spiel und Menü
	 */
	menuButton.addEventListener("click", function(e) {
		
		if(isClicked == false) {
			isClicked = true;
			menuWrapper.style.margin = "-100vh 0 0 0";
			gameWrapper.style.margin = "0 0 0 0";
			menuButton.style.top = "92%";
			menuButton.style.backgroundImage = "url(img/menu.png)";
		}
		else {
			isClicked = false;
			menuWrapper.style.margin = "0 0 0 0";
			gameWrapper.style.margin = "100vh 0 0 0";
			menuButton.style.top = "5px";
			menuButton.style.backgroundImage = "url('img/play.png')";
		}
	});
	
	
	/**
	 * Intzialiserung Spieleinführung
	 */
	var togIntro = zid("menuHowToPlay");
	var quitIntro = zid("quitIntro");
	var introBox = zid("introBox");
	var btnNext = zid("next");
	var btnPrev = zid("prev");
	var curPage = 1;
	var pageAmount = 5;
	var pages = {
		1 : pageOne,
		2 : pageTwo,
		3 : pageThree,
		4 : pageFour,
		5 : pageFive
	};
	
	var introIsActive = false;
	togIntro.addEventListener("click", function(e) {
		if(introIsActive == false){
			introBox.style.display = "block";
			pages[curPage].style.display = "block";
			introIsActive = true;
		}
		else {
			introBox.style.display = "none";
			pages[curPage].style.display = "none";	
			introIsActive = false;
		}
	});

	quitIntro.addEventListener("click", function(e) {
		introBox.style.display = "none";
		introIsActive = false;
	});
	btnNext.addEventListener("click", function(e) {
		
		pages[curPage].style.display = "none";
		curPage++;
		if(curPage > pageAmount){
			curPage = 1;
		}
		pages[curPage].style.display = "block";
	});
	btnPrev.addEventListener("click", function(e) {
		pages[curPage].style.display = "none";
		curPage--;
		if(curPage < 1){
			curPage = pageAmount;
		}
		pages[curPage].style.display = "block";
	});
	
	/**
	 * Init Menu 
	 */
	htpToggle = false;
	settingsToggle = false;
	
	menuSettings.addEventListener("click", function(e) {
		if(settingsToggle == true){
			settings.style.display = "none";
			settingsToggle = false;
		}
		else {
			settings.style.display = "block";
			settingsToggle = true;
			howToPlay.style.display = "none";
			htpToggle = false;
		}
	});
	$(document).on('click', function(event){length
	  	if(!$(event.target).closest('#howToPlay')){
	  		if(!$(event.target).closest('#menuHowToPlay').length){
	  			howToPlay.style.display = "none";
				htpToggle = false;
	  		}
	  	}
	  	if(!$(event.target).closest('#settings').length){
	  		if(!$(event.target).closest('#menuSettings').length){
	  			settings.style.display = "none";
				settingsToggle = false;
	  		}
	  	}
	});
	/**
	 * Ende Spieleinführung
	 */



	// Menu Bars verschiebar machen
	var bars = document.querySelectorAll(".handle");
	for (var i = bars.length - 1; i >= 0; i--) {
		new menuBarDragger(bars[i]);
	};

	// Lightbox schließen via Klick auf Rand
	var bars = document.querySelectorAll(".handle");
	var width = 0;
	for (var i = 0; i < bars.length; i++) {
		bars[i].parentNode.style.left = width + "px";
		width += bars[i].parentNode.offsetWidth + 3;
		new menuBarDragger(bars[i]);
	};


	/** 
	 * Inizialiserung Tooltips
	 */
	(function initTooltip () {
		var tipArray = {
			broodChamber : {
				title : "Brutkammer",
				text : "Hier werden neue Arbeiterinnen ausgebildet. Die Ausbaustufe entscheidet darüber, wie viele Larven sich gleichzeitig in der Warteschleife befinden können."
			},
			mushroomChamber : {
				title : "Pilzkammer",
				text : "In der Pilzkammer gedeiht ein Speisepilz, der hervorragend auf Blättern und anderen Pflanzenteilen wächst. Deine Ameisen ernähren sich von ihm. Du solltest dafür sorgen, dass immer genug Blätter vorhanden sind, da der Pilz sich sonst zurück entwickelt."
			},
			storage : {
				title : "Lager",
				text : "Im Lager werden deine Baumaterialien gespeichert, also Blätter und Steine. Je höher die Ausbaustufe, desto mehr Einheiten können gelagert werden."
			},
			pantry : {
				title : "Speisekammer",
				text : "Hier werden Nahrungsmittel gelagert, die der Pilz produziert oder deine Arbeiterinnen bei der Jagt erbeutet haben. Auch hier bestimmt die Ausbaustufe die Größe des Speichers."
			},
			dumpingGround : {
				title : "Deponie",
				text : "Dies ist der Ort wo Abfälle, die dein Volk produziert, entsorgt werden. Dazu zählen tote Ameisen, verdorbene Nahrungsreste und die Notdurft deines Volkes. Je höher die Kammer ausgebaut ist, desto mehr Platz bietet sie und desto schneller wird der Abfall abgebaut."
			},
			worker : {
				title : "Arbeiter",
				text : "Hier kannst du neue Arbeiterinnen ausbrüten. Sie bilden das Rückrat deines Volkes und übernehmen sämtliche Aufgaben. Jede Ameise muss fressen und verbraucht pro Spielrunde (Tick) eine Nahrungseinheit. Sorge dafür, dass immer genug Nahrung vorhanden ist oder deine Ameisen verhungern."
			},
			jLeafs : {
				title : "Blätter sammeln",
				text : "Ameisen auf diesem Posten sammeln eifrig Blätter. Pro Spielrunde (Tick) sammelt jede Ameise auf diesem Posten ein Blatt."
			},
			jStone : {
				title : "Steine sammeln",
				text : "Steine zu sammeln ist keine einfache Aufgabe. Jede Ameise sammelt pro Spielrunde (Tick) einen Stein."
			},
			jHunt : {
				title : "Jagen",
				text : "Du kannst deine Ameisen auf die Jagt schicken, um Insekten und andere Kleintiere zu erbeuten. Es gibt Ameisenarten, die sogar Jungvögel erlegen."
			},
			jHatch : {
				title : "Brutpflege",
				text : "Die Brutpflege ist ein wichtiger Bestandteil einer florierenden Kolonie. Je mehr Ameisen sich um den Nachwuchs kümmern, desto schneller wächst dieser heran."
			},
			jClean : {
				title : "Bau säubern",
				text : "Ist dein Nest nicht gepflegt, können deine Ameisen krank werden. Sorge also dafür, dass sich immer genug Arbeiterinnen um die Sauberkeit im Bau kümmern."
			},
			leafs : {
				title : "Blätter",
				text : "Blätter sind äußerst wichtig für die Entwicklung deines Volkes. Du kannst sie entweder zum Bau von neuen Kammern oder zum speisen deines Pilzes verwenden."
			},
			stone : {
				title : "Steine",
				text : "Steine dienen ebenfalls als Baumaterial, das erforderlich ist, um Kammern zu erweitern oder neue zu bauen. Dieser Rohstoff ist unabdingbar und du solltest den Füllstand ständig im Auge behalten, damit das Wachstum nicht stagniert."
			},
			food : {
				title : "Nahrung",
				text : "Nahrung ist die Basis, damit dein Volk existieren kann. Es gibt verschiedene Möglichkeiten um Nahrung zu gewinnen. Du kannst entweder über den Pilz Blätter in Nahrung umwandeln oder deine Ameisen auf die Jagt schicken."
			},
			amber : {
				title : "Bernstein",
				text : "Die antibakteriellen Eigenschaften von Harz sind sogar den Ameisen bekannt. Besonders Waldameisen machen sich diese zunutze, indem sie Baumharzstücke in den Bau schleppen und so die Vermehrung von Keimen unterbinden bzw. erschweren."
			}
		};


		var eles = document.querySelectorAll(".tooltip");

		for (var i = 0; i < eles.length; i++) {
			eles[i].addEventListener("mouseenter", function(e) {
			    var toolType = e.target.attributes["data-type"].value;

				zid("tipTitle").innerHTML = tipArray[toolType].title;
				zid("tipText").innerHTML = tipArray[toolType].text;
				zid("tipBox").style.display = "block";
			});

			eles[i].addEventListener("mouseleave", function(e) {
				zid("tipBox").style.display = "none";
			});

			eles[i].addEventListener("mousemove", function(e) {
				zid("tipBox").style.left = event.pageX + 10 + "px";
		 		zid("tipBox").style.top =  event.pageY + 10 + "px";
		 	});
		};
	})();
}
load();
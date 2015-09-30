function layout(options) {
	/**
	 * [load description]
	 * Die Load Funktion wird beim Aufruf der Webseite ausgeführt.
	 * Sie legt grundlegende Styles an, erstellt Menüs und erstellt die Tooltips
	 */
	function load() {
		var isClicked = false;

		var menuButton = zid("btn_toggleMenu");
		var menuWrapper = zid("menuWrapper");
		var gameWrapper = zid("gameWrapper");


		/**
		 * Menüleiste
		 */
		var introIsActive = false;
		btnTutorial = zid("btn_tutorial");
		btnPause = zid("btn_pause");
		btnPause.addEventListener("click", function(e) {
			alert(
				"Das Spiel ist nun pausiert. Klicke auf ok um fortzufahren."
			);	
		});
		btnTutorial.addEventListener("click", function(e) {
			if(introIsActive == false){
				introBox.style.display = "block";
				pages[curPage].style.display = "block";
				introIsActive = true;
			}	
			
		});
		
		/**
		 * Wechsel zwischen Spiel und Menü
		 */
		menuButton.addEventListener("click", function(e) {
			
			if(isClicked == false) {
				isClicked = true;
				menuWrapper.style.margin = "-100vh 0 0 0";
				gameWrapper.style.margin = "0 0 0 0";
				
				menuButton.style.backgroundImage = "url(img/icons/arrow_up.png)";
			}
			else {
				isClicked = false;
				menuWrapper.style.margin = "0 0 0 0";
				gameWrapper.style.margin = "100vh 0 0 0";
				
				menuButton.style.backgroundImage = "url('img/icons/arrow_down.png')";
			}
		});
		
		// Canvas der Größe des Bildschirms anpassen
		var canv = zid(options.canvas);
			canv.style.width = window.innerWidth + "px";
			canv.style.height = window.innerHeight + "px";
			canv.height = window.innerHeight;
			canv.width = window.innerWidth;
		
		/**
		 * Initialiserung Spieleinführung
		 */
		
		var loginBox = zid("loginBox");
		var login = zid("login");
		var start = zid("start");
		var btnlogin = zid("btn_login");
		var btnStartTut = zid("btn_startTut");
		var btnStartGame = zid("btn_startGame");
		
		
		var quitIntro = zid("quitIntro");
		var introBox = zid("introBox");
		var btnNext = zid("next");
		var btnPrev = zid("prev");
		var curPage = 1;
		var pageAmount = 6;
		var pages = {
			1 : pageOne,
			2 : pageTwo,
			3 : pageThree,
			4 : pageFour,
			5 : pageFive,
			6 : pageSix
		};
		
		btnlogin.addEventListener("click", function(e) {
			login.style.display = "none";
			start.style.display = "block";
			
		});
		btnStartTut.addEventListener("click", function(e) {
			loginBox.style.display = "none";
			introBox.style.display = "block";
			pages[curPage].style.display = "block";
			introIsActive = true;
			
		});
		btnStartGame.addEventListener("click", function(e) {
			loginBox.style.display = "none";
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
			if(curPage == pageAmount){
				btnNext.style.display = "none";
			}
			else {
				btnNext.style.display = "block";
			}
			if(curPage != 1){
				btnPrev.style.display = "block";
			}
			pages[curPage].style.display = "block";
		});
		btnPrev.addEventListener("click", function(e) {
			pages[curPage].style.display = "none";
			curPage--;
			if(curPage < 1){
				curPage = pageAmount;
			}
			
			if(curPage == 1){
				btnPrev.style.display = "none";
			}
			else {
				btnPrev.style.display = "block";
			}
			if(curPage != pageAmount){
				btnNext.style.display = "block";
			}
			pages[curPage].style.display = "block";
		});
		
		



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
			if(bars[i].parentNode.querySelector(".handleSub"))
				new menuBarDragger(bars[i], bars[i].parentNode.querySelector(".handleSub"));
			else
				new menuBarDragger(bars[i]);
		};


		/** 
		 * Inizialiserung Tooltips
		 */
		(function initTooltip () {
			var tipArray = {
				broodChamber : {
					title : "Brutkammer",
					text : "Alle Fünf Stufen wird die Warteschleife für neu zu produzierende Larven um 1 erweitert."
				},
				mushroomChamber : {
					title : "Pilzkammer",
					text : "Je Stufe wird ein Blatt in drei Einheiten Nahrung umgewandelt."
				},
				storage : {
					title : "Lager",
					text : "Jede Stufe erweitert die maximale Speicherkapazität von Blättern und Steinen."
				},
				pantry : {
					title : "Speisekammer",
					text : "Jede Stufe erweitert deinen Nahrungsspeicher."
				},
				dumpingGround : {
					title : "Kompost",
					text : "Jede Stufe erweitert die Speicherkapazität deines Komposts, sowie die Abbaurate von eingelagerten Abfällen um eine Einheit pro Runde."
				},
				worker : {
					title : "ohne Aufgabe",
					text : "Diese Ameisen produzieren nichts, jedoch bewachen sie deinen Bau."
				},
				jLeafs : {
					title : "Blätter sammeln",
					text : "Jede Ameise auf diesem Posten sammelt ein Blatt pro Runde."
				},
				jStone : {
					title : "Steine sammeln",
					text : "Jede Ameise auf diesem Posten sammelt einen Stein pro Runde."
				},
				jHunt : {
					title : "Jagen",
					text : "Jede Ameise auf der Jagt sammelt zwei Einheiten Nahrung pro Runde."
				},
				jHatch : {
					title : "Brutpflege",
					text : "Je mehr Ameisen sich um den Nachwuchs kümmern, desto schneller entwickeln sich die Larven."
				},
				jClean : {
					title : "Bau säubern",
					text : "Ameisen, die den Bau säubern, bringen pro Runde eine Einheit Abfall zur Deponie, wo sie vergammelt."
				},
				leafs : {
					title : "Blätter",
					text : "Ein wichtiger Rohstoff zur Entwicklung deiner Kammern und zur Produktion von Nahrung über die Pilzkammer."
				},
				stone : {
					title : "Steine",
					text : "Steine dienen als Baumaterial für neue Kammern und deren Ausbau."
				},
				food : {
					title : "Nahrung",
					text : "Dein wichtigster Rohstoff. Ohne Nahrung kann dein Volk nicht überleben!"
				},
				dump : {
					title : "Kompost",
					text : "Der Kreislauf der Kompostierung muss stets im Auge behalten werden. Der untere Balken zeigt links die Verschmutzung im Bau und rechts den Höchstwert. Wenn dieser erreicht ist, fangen Ameisen an krank zu werden und zu sterben."
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

				$(eles[i]).mousemove(function(e) {
					zid("tipBox").style.left = e.pageX + 10 + "px";
			 		zid("tipBox").style.top =  e.pageY + 10 + "px";
			 	});
			};
		})();
	}
	load();
}

var menuButton = zid("btn_toggleMenu");
var menuWrapper = zid("menuWrapper");
var gameWrapper = zid("gameWrapper");

var menuHowToPlay = zid("menuHowToPlay");
var menuSettings = zid("menuSettings");
var howToPlay = zid("howToPlay");
var settings = zid("settings");

var isClicked = false;
function load() {
	menuButton.addEventListener("click", function(e) {
		
		if(isClicked == false){
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
	//Menu
	htpToggle = false;
	settingsToggle = false;
	menuHowToPlay.addEventListener("click", function(e) {
		if(htpToggle == true){
			howToPlay.style.display = "none";
			htpToggle = false;
		}
		else {
			howToPlay.style.display = "block";
			htpToggle = true;
			settings.style.display = "none";
			settingsToggle = false;
		}
		
	});
	
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
	$(document).on('click', function(event){
	  	if(!$(event.target).closest('#howToPlay').length){
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
}
load();

//tooltip
var target;
var toolType;
function handler(e) {
	
    target = $(e.target);
    toolType = target.attr('data-type');
    if( target.is(".tooltip") ) {
       //alert('The mouse was over'+ toolType );
    }
}
$(".tooltip").mouseenter(handler);


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

$( ".tooltip" ).mouseenter(function() {
	
	$("#tipTitle").text(tipArray[toolType].title);
	$("#tipText").text(tipArray[toolType].text);
	$("#tipBox").css("display", "block");
});
$( ".tooltip" ).mouseleave(function() {
	$("#tipBox").css("display", "none");
});

$(".tooltip").on( "mousemove", function( event ) {
  $("#tipBox").css("left", event.pageX + 10);
  $("#tipBox").css("top", event.pageY + 10);
});






	

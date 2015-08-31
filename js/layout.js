
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
			menuButton.style.top = "93%";
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
		title : "Brood Chamber",
		text : "brutkammer text text text text"
	},
	mushroomChamber : {
		title : "Mushroom Chamber",
		text : "mushroom text text text text"
	},
	storage : {
		title : "Storage",
		text : "storage text text text text"
	},
	pantry : {
		title : "Pantry",
		text : "pantry text text text text"
	},
	dumpingGround : {
		title : "Dumping Ground",
		text : "dump text text text text"
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






	

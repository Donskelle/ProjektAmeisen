
var menuButton = zid("btn_toggleMenu");
var menuWrapper = zid("menuWrapper");
var gameWrapper = zid("gameWrapper");

var isClicked = false;
function load() {
	menuButton.addEventListener("click", function(e) {
		
		if(isClicked == false){
			isClicked = true;
			menuWrapper.style.margin = "-67% 0 0 0";
			gameWrapper.style.margin = "0 0 0 0";
		}
		else {
			isClicked = false;
			menuWrapper.style.margin = "0 0 0 0";
			gameWrapper.style.margin = "67% 0 0 0";
		}
		
		});
}
load();

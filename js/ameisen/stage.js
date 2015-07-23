/**
 * [amaeisenStage description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function AmeisenStage(_options) {
	var options = {
		canvas: "canvas",
		canvasConnector: "connector",
		wrapperBuildMenu: "",
		forms: {	
			dumpingBuild: "dumpingBuild",
			pantryBuild: "pantryBuild",
			storageBuild: "storageBuild",
			broodBuild: "broodBuild",
			mushroomBuild: "mushroomBuild"	
		}
	};
	var builder,canvasBuilder;

	function init() {
		var that = this;
		canvasResize();
		options = HelpFunction.merge(options, _options);


		builder = new Builder(
			options
		);

		canvasBuilder = new Canvas(
			options
		);

		

		//window.addEventListener("resize", canvasResize);
	}

	var canvasResize = function() {
		var canv = zid(options.canvas);
		var canvCon = zid(options.canvasConnector);
		canv.style.width = window.innerWidth + "px";
		canv.style.height = window.innerHeight + "px";
		canv.style.marginTop = -window.innerHeight + "px";
		canv.height = window.innerHeight;
		canv.width = window.innerWidth;


		canvCon.style.width = window.innerWidth + "px";
		canvCon.style.height = window.innerHeight + "px";
		canvCon.height = window.innerHeight;
		canvCon.width = window.innerWidth;
	}



	init();
}
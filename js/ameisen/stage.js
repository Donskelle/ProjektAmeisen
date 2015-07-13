/**
 * [amaeisenStage description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function AmeisenStage(_options) {
	var options = {
		canvas: "canvas",
		wrapperBuildMenu: "",
		forms: {	
			dumpingBuild: "dumpingBuild",
			pantryBuild: "pantryBuild",
			storageBuild: "storageBuild",
			broodBuild: "broodBuild",
			mushroomBuild: "mushroomBuild"	
		}
	};
	var builder;

	function init() {
		var that = this;
		options = HelpFunction.merge(options, _options);


		builder = new Builder(
			options
		);

		this.canvasResize();

		window.addEventListener("resize", that.canvasResize);
	}

	canvasResize = function() {
		var wrapper = document.getElementById(options.canvas);
		wrapper.width = window.innerWidth;
		wrapper.height = window.innerHeight;
	}



	init();
}
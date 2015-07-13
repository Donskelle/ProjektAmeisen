/**
 * [builder description]
 * @return {[type]} [description]
 */
function Builder(_options) {
	var options = _options;

	/**
	 * [init description]
	 * Intizialisiert Events 
	 * @return {[type]} [description]
	 */
	this.init = function() {
		var dumpingForm = document.getElementById(options.forms.dumpingBuild);
		var pantryForm = document.getElementById(options.forms.pantryBuild);
		var broodForm = document.getElementById(options.forms.broodBuild);
		var mushroomForm = document.getElementById(options.forms.mushroomBuild);
		var storageForm = document.getElementById(options.forms.storageBuild);

		this.addFormListener(dumpingForm);
		this.addFormListener(pantryForm);
		this.addFormListener(broodForm);
		this.addFormListener(mushroomForm);
		this.addFormListener(storageForm);
	};

	/**
	 * [addBuilding description]
	 * @param {[type]} type [description]
	 */
	this.addBuilding = function(type) {
    
    };

	/**
	 * [increasePrice description]
	 * @param  {[type]} ele [description]
	 * @return {[type]}     [description]
	 */
	this.increasePrice = function(ele) {
		ele.innerHTML = parseInt(ele.innerHTML)*2;
	}

	/**
	 * [addFormListener description]
	 * @param {[type]} ele [description]
	 */
	this.addFormListener = function(ele) {
		var that = this;

		ele.getElementsByClassName("build")[0].addEventListener("click", function() {
			that.increasePrice(ele.getElementsByClassName("buildCostStone")[0]);
			that.increasePrice(ele.getElementsByClassName("buildCostLeafs")[0]);
		});
	}



	return this.init();
}
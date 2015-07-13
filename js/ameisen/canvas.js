function Canvas(_options){
	var canvas,ctx;

	this.init = function() {
		canvas = _options.wrapper;
		ctx = canvas.getContext('2d');
		

	}
}
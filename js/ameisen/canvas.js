function Canvas(_options){
	var canvas,ctx;

	this.init = function() {
		canvas = _options.canvas;
		ctx = canvas.getContext('2d');
		

	}
}
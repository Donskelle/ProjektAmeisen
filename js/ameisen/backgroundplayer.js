function backgroundPlayer() {
	var playStatus = true;

	var audioElement;

	(function init() {
		audioElement = zid("backgroundAudio");

		zid("btn_toggleSound").addEventListener("click", function(e) {
			changeMusic();
		});
	})();

	function changeMusic() {
		if(playStatus) {
			audioElement.pause();
			playStatus = false;
		}
		else {
			audioElement.play();
			playStatus = true;
		}
	}
}
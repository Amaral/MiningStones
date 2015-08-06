(function(){

	var Audio = function() {
		throw "Audio cannot be instantiated.";
	};

	Audio.source = [];

	Audio.load = function() {
		game.load.audio('steak', ['assets/audio/combination.mp3']);
		game.load.audio('levelup', ['assets/audio/levelup.wav']);
		game.load.audio('gem', ['assets/audio/gem.wav']);
		game.load.audio('gameover', ['assets/audio/gameover.wav']);
		game.load.audio('powerup', ['assets/audio/powerup.wav']);
	}

	Audio.create = function() {
		var music = game.add.audio('steak');
    	Audio.source['steak'] = music;

    	music = game.add.audio('levelup');
    	Audio.source['levelup'] = music;

    	music = game.add.audio('gem');
    	Audio.source['gem'] = music;

    	music = game.add.audio('gameover');
    	Audio.source['gameover'] = music;

    	music = game.add.audio('powerup');
    	Audio.source['powerup'] = music;
	}

	Audio.play = function(name) {
		Audio.source[name].play();
	}


	window.Audio = Audio;

}());
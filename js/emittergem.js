
(function(){

	var EmitterGem = function() {
		throw 'cannot instantiate EmitterGem';
	};

	EmitterGem.init = function() {

		EmitterGem.red = game.add.emitter(0, 0, 200);
		EmitterGem.red.makeParticles('minigem1');

		EmitterGem.green = game.add.emitter(0, 0, 100);
		EmitterGem.green.makeParticles('minigem2');

		EmitterGem.blue = game.add.emitter(0, 0, 100);
		EmitterGem.blue.makeParticles('minigem3');

		EmitterGem.yellow = game.add.emitter(0, 0, 100);
		EmitterGem.yellow.makeParticles('minigem4');

		EmitterGem.purple = game.add.emitter(0, 0, 100);
		EmitterGem.purple.makeParticles('minigem5');

		EmitterGem.white = game.add.emitter(0, 0, 100);
		EmitterGem.white.makeParticles('minigem6');

		EmitterGem.emitters = [EmitterGem.red, EmitterGem.green, EmitterGem.blue, EmitterGem.yellow, EmitterGem.purple, EmitterGem.white];

		for (var i = 0; i < EmitterGem.emitters.length; i++) {
			e = EmitterGem.emitters[i]
			e.minParticleScale = 0.1;
			e.maxParticleScale = 1;
		};
	}
	

	

	EmitterGem.start = function(x, y, kind, delay) {
		var e = EmitterGem.emitters[kind];
		x = x + Main.stageGroup.x + Grid.group.x;
		y = y + Main.stageGroup.y + Grid.group.y;
		EmitterGem.startDelay(x, y, e, delay);
		
		
	}

	EmitterGem.startDelay = function(x, y, emitter, delay) {

		setTimeout(function(){
			emitter.emitX = x;
			emitter.emitY = y;
			emitter.start(true, 1500, null, 10);	
		},16*delay)
	}

	EmitterGem.update = function() {

		
		for (var i = 0; i < EmitterGem.emitters.length; i++) {
			e = EmitterGem.emitters[i];
			e.forEachAlive(function(p) {
				p.alpha = p.lifespan / e.lifespan;

			});
		};
		
	}

	
	

	window.EmitterGem = EmitterGem;

}());

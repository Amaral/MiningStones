var w = window.innerWidth * window.devicePixelRatio,
	h = window.innerHeight * window.devicePixelRatio,
	banner = document.getElementById("super-banner"),
	stageGroup = null,
	game = new Phaser.Game(w, h, Phaser.AUTO, '', { preload: preload, create: create, update: update })
	Main = {stageGroup:null},
	currentView = null;

function preload() {



	game.load.image("background", "assets/bg.png");

	

	PowerUpMenu.load();
	StartScreen.load();
	MiningStones.load();
	BarLevel.load();
	Audio.load();

	
}
 
function create() {

	game.stage.backgroundColor = '#1d1d1d';
	game.stage.scaleMode = Phaser.StageScaleMode.NO_SCALE;
	background = game.add.sprite(0, 0, "background");
	Main.stageGroup = game.add.group();

	StartScreen.create();

	

	MiningStones.create();
	Audio.create();

	
	Main.stageGroup.add(StartScreen.group);
	Main.stageGroup.add(MiningStones.group);

	window.addEventListener('resize', resize);
	resize();
	//Audio.create();

	currentView = StartScreen;

}




function resize() {
	w = window.innerWidth * window.devicePixelRatio,
	h = window.innerHeight * window.devicePixelRatio;

	game.width = w;
	game.height = h;
	game.stage.bounds.width = w;
	game.stage.bounds.height = h;

	Main.stageGroup.x = (w - 768)/2;
	Main.stageGroup.y = (h - 768)/2;

	banner.style.top = Main.stageGroup.y + 20 + 'px';

	if (game.renderType === Phaser.WEBGL) {
		game.renderer.resize(w, h);
	}

	//MiningStones.resize();
}
 
function update() {
	MiningStones.update();
}

Main.continueGame = function(){
	Main.changeView(MiningStones)
}

Main.newGame = function(){

}

Main.scoreView = function() {

}

Main.optionsView = function() {

}

Main.changeView = function(newView) {
	currentView.hide(newView.show);
}


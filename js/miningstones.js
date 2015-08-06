(function(){

	var MiningStones = function() {
		this.initialize();
	};
	
	var p = MiningStones.prototype;

	MiningStones.gems = ['gem1','gem2','gem3','gem4','gem5','gem6'];
	MiningStones.gemsToPlay = [];
	MiningStones.level = 1;
	MiningStones.group;

	MiningStones.load = function() {
		
		for (var i = 0; i < MiningStones.gems.length; i++) {
			game.load.image(MiningStones.gems[i], 'assets/' + MiningStones.gems[i] + '.png');
			game.load.image('mini' + MiningStones.gems[i], 'assets/mini' + MiningStones.gems[i] + '.png');
		};

		game.load.image('squareGrid', 'assets/squaregrid.png');
		game.load.image("gembar", "assets/gembar.png");
		game.load.image("bglvup", "assets/bglvup.png");
		game.load.image("btnok", "assets/btnok.png");
	};


	MiningStones.drawGem = function(x, y, kind) {
		var groupGem = game.add.group();
		groupGem.create(-43, -44, MiningStones.gems[kind[0]]);
		if(kind[1] != -1) groupGem.create(-18, -19, 'mini' + MiningStones.gems[kind[1]]);
		groupGem.x = x;
		groupGem.y = y;

		return groupGem;	
	}

	MiningStones.create = function() {
		MiningStones.group = game.add.group();
		Grid.create();
		BarLevel.create();
		LevelUp.create();
		PowerUpMenu.create();
		GemMenu.create(100,100);

		Grid.setY(135);
		Grid.setX(20);

		MiningStones.group.add(Grid.group);
		MiningStones.group.add(BarLevel.group);
		MiningStones.group.add(GemMenu.group);
		MiningStones.group.add(PowerUpMenu.group);

		MiningStones.resize();
	};

	MiningStones.show = function() {
		game.input.onTap.add(MiningStones.selectPointGrid, MiningStones);
		Grid.show();
		BarLevel.show();
		PowerUpMenu.show();
		GemMenu.show();
	};

	MiningStones.hide = function() {
		game.input.onTap.remove(MiningStones.selectPointGrid, MiningStones);
		Grid.hide();
		BarLevel.hide();
		PowerUpMenu.hide();
		LevelUp.hide();
		PowerUpMenu.hide();
		GemMenu.hide();
	};

	MiningStones.selectPointGrid = function(pointer) {
		Grid.addGemOnGrid(pointer.x-Main.stageGroup.x, pointer.y - Main.stageGroup.y);
	};

	MiningStones.resize = function() {
		var w = game.width;
		var h = game.height;
		
		LevelUp.resize();
		GameOver.create();
	};

	MiningStones.levelCompleted = function() {
		MiningStones.level++;
		game.input.onTap.remove(MiningStones.selectPointGrid, MiningStones);
		LevelUp.show(MiningStones.level-1);
	};

	MiningStones.GameOver = function() {
		game.input.onTap.remove(MiningStones.selectPointGrid, MiningStones);
		GameOver.show();
	};

	MiningStones.playNextLevel = function() {
		game.input.onTap.add(MiningStones.selectPointGrid, MiningStones);
		GemMenu.changeLevel();
		Grid.changeGrid();
		Grid.show();
		BarLevel.reset(function(){
			BarLevel.setLevel();
			BarLevel.show();
		});
	};

	MiningStones.newGame = function() {
		MiningStones.level = 1;
		MiningStones.gemsToPlay = [];
		GemMenu.changeLevel();
		BarLevel.reset();
		GemMenu.reset();
		Score.reset();
		Grid.reset();
		game.input.onTap.add(MiningStones.selectPointGrid, MiningStones);
	};

	MiningStones.update = function() {

		Grid.update();
	}



	window.MiningStones = MiningStones;

}());

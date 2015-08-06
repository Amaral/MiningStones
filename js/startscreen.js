(function(){

	var StartScreen = function() {
		throw 'cannot instantiate StartScreen';
	};


	StartScreen.logo = null;
	StartScreen.group = null;
	StartScreen.btnContinue = null;

	StartScreen.load = function() {
		game.load.image('logo', 'assets/logo.png');
		game.load.image('btnContinue', 'assets/btnContinue.png');
		game.load.image('btnNewGame', 'assets/btnNewGame.png');
		game.load.image('btnScore', 'assets/btnScore.png');
		game.load.image('btnOptions', 'assets/btnOptions.png');

	};

	StartScreen.create = function() {
		StartScreen.group = game.add.group();
		StartScreen.logo = game.add.sprite(0, 0, "logo");
		
		StartScreen.logo.x = 111;
		StartScreen.logo.y = 180;

		StartScreen.btnContinue = new Phaser.Button(game, 0, 0, 'btnContinue', StartScreen.continueCallback, StartScreen);

		StartScreen.btnContinue.pivot.x = StartScreen.btnContinue.width / 2;
		StartScreen.btnContinue.pivot.y = StartScreen.btnContinue.height / 2;

		StartScreen.btnContinue.x = 230 + StartScreen.btnContinue.pivot.x;
		StartScreen.btnContinue.y = 335 + StartScreen.btnContinue.pivot.y;

		StartScreen.btnNewGame = new Phaser.Button(game, 0, 0, 'btnNewGame', StartScreen.newGameCallback, StartScreen);

		StartScreen.btnNewGame.pivot.x = StartScreen.btnNewGame.width / 2;
		StartScreen.btnNewGame.pivot.y = StartScreen.btnNewGame.height / 2;

		StartScreen.btnNewGame.x = 230 + StartScreen.btnNewGame.width / 2;
		StartScreen.btnNewGame.y = 425 + StartScreen.btnNewGame.height / 2;

		StartScreen.btnScore = new Phaser.Button(game, 0, 0, 'btnScore', StartScreen.scoreCallback, StartScreen);

		StartScreen.btnScore.pivot.x = StartScreen.btnScore.width / 2;
		StartScreen.btnScore.pivot.y = StartScreen.btnScore.height / 2;

		StartScreen.btnScore.x = 230 + StartScreen.btnScore.pivot.x;
		StartScreen.btnScore.y = 517 + StartScreen.btnScore.pivot.y;

		
		StartScreen.btnOptions = new Phaser.Button(game, 0, 0, 'btnOptions', StartScreen.optionsCallback, StartScreen);

		StartScreen.btnOptions.pivot.x = StartScreen.btnOptions.width / 2;
		StartScreen.btnOptions.pivot.y = StartScreen.btnOptions.height / 2;

		StartScreen.btnOptions.x = 230 + StartScreen.btnOptions.pivot.x;
		StartScreen.btnOptions.y = 607 + StartScreen.btnOptions.pivot.y;

		StartScreen.group.add(StartScreen.logo);
		StartScreen.group.add(StartScreen.btnContinue);
		StartScreen.group.add(StartScreen.btnNewGame);
		StartScreen.group.add(StartScreen.btnScore);
		StartScreen.group.add(StartScreen.btnOptions);


		StartScreen.btnContinue.scale.setTo(0,0);
		StartScreen.btnNewGame.scale.setTo(0,0);
		StartScreen.btnScore.scale.setTo(0,0);
		StartScreen.btnOptions.scale.setTo(0,0);


		StartScreen.show();

	
	};

	StartScreen.show = function() {
		StartScreen.logo.visible = true;
		game.add.tween(StartScreen.btnContinue.scale).to( { x: 1, y:1 }, 500, Phaser.Easing.Back.Out, true,0);
		game.add.tween(StartScreen.btnNewGame.scale).to( { x: 1, y:1 }, 500, Phaser.Easing.Back.Out, true,100);
		game.add.tween(StartScreen.btnScore.scale).to( { x: 1, y:1 }, 500, Phaser.Easing.Back.Out, true,200);
		game.add.tween(StartScreen.btnOptions.scale).to( { x: 1, y:1 }, 500, Phaser.Easing.Back.Out, true,300);

	}

	StartScreen.hide = function(callback) {
		StartScreen.logo.visible = false;
		var t = game.add.tween(StartScreen.btnContinue.scale).to( { x: 0, y:0 }, 500, Phaser.Easing.Back.In, true,300);
		game.add.tween(StartScreen.btnNewGame.scale).to( { x: 0, y:0 }, 500, Phaser.Easing.Back.In, true,200);
		game.add.tween(StartScreen.btnScore.scale).to( { x: 0, y:0 }, 500, Phaser.Easing.Back.In, true,100);
		game.add.tween(StartScreen.btnOptions.scale).to( { x: 0, y:0 }, 500, Phaser.Easing.Back.In, true,0);

		t.onComplete.add(callback);
	}

	StartScreen.continueCallback = function(){
		Main.continueGame();
	};

	StartScreen.newGameCallback = function() {
		Main.newGame();
	};

	StartScreen.scoreCallback = function() {
		Main.scoreView();
	};

	StartScreen.optionsCallback = function() {
		Main.optionsView();
	};


	window.StartScreen = StartScreen;

}());

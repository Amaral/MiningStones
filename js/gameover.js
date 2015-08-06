(function(){

	var GameOver = function() {
		throw "GameOver cannot be instantiated.";
	};

	GameOver.group;
	GameOver.text;
	GameOver.btnOK;
	GameOver.bg;
	GameOver.clicked = false;

	GameOver.create = function() {
		GameOver.group = game.add.group();

		GameOver.text = game.add.text(0, 20, 'GAME OVER', {
			font: "35px AldotheApacheRegular",
			align: "left",
			fill:"#cc4444"
		});

		GameOver.bg = GameOver.group.create(0, 0, 'bglvup');
		GameOver.btnOK = new Phaser.Button(game, 0, 0, 'btnok', GameOver.buttonCallback, GameOver);
		GameOver.btnOK.x = (GameOver.bg.width - GameOver.btnOK.width) / 2;
		GameOver.btnOK.y = GameOver.bg.height - GameOver.btnOK.height - 30;
		GameOver.text.x = (GameOver.bg.width - GameOver.text.width) / 2;

		GameOver.group.add(GameOver.text);
		GameOver.group.add(GameOver.btnOK);

		GameOver.group.pivot.x = GameOver.bg.width /2;
		GameOver.group.pivot.y = GameOver.bg.height/2;
	
		GameOver.group.alpha = 0;
		GameOver.group.scale.setTo(1.5, 1.5);
		GameOver.btnOK.visible = false;

		GameOver.resize();
	}

	GameOver.show = function(level) {
		Audio.play('gameover');
		GameOver.group.alpha = 0;
		GameOver.btnOK.visible = true;
		GameOver.clicked = false;
		game.add.tween(GameOver.group).to( {alpha:1}, 300 , Phaser.Easing.Linear.none, true);
		game.add.tween(GameOver.group.scale).to( {x:1, y:1}, 500 , Phaser.Easing.Bounce.Out, true);
	}

	GameOver.close = function() { 
		var t = game.add.tween(GameOver.group.scale).to( {x:0, y:0}, 500 , Phaser.Easing.Back.In, true);
		t.onComplete.add(function() {
			GameOver.btnOK.visible = false;
		});			
	}

	GameOver.buttonCallback = function() {
		if(!GameOver.clicked) {
			GameOver.clicked = true;
			GameOver.close();
			MiningStones.newGame();
		}		
	}

	GameOver.resize = function() {
		var w = game.width;
		var h = game.height;
		GameOver.group.x = w / 2;
		GameOver.group.y = h / 2;
	}


	window.GameOver = GameOver;

}());
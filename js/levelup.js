(function(){

	var LevelUp = function() {
		throw "LevelUp cannot be instantiated.";
	};

	LevelUp.group;
	LevelUp.text;
	LevelUp.btnOK;
	LevelUp.bg;
	LevelUp.clicked = false;

	LevelUp.create = function() {
		LevelUp.group = game.add.group();

		LevelUp.text = game.add.text(0, 20, 'LEVEL 1 COMPLETED', {
			font: "35px AldotheApacheRegular",
			align: "left",
			fill:"#cc4444"
		});

		LevelUp.bg = LevelUp.group.create(0, 0, 'bglvup');
		LevelUp.btnOK = new Phaser.Button(game, 0, 0, 'btnok', LevelUp.buttonCallback, LevelUp);
		LevelUp.btnOK.x = (LevelUp.bg.width - LevelUp.btnOK.width) / 2;
		LevelUp.btnOK.y = LevelUp.bg.height - LevelUp.btnOK.height - 30;
		LevelUp.text.x = (LevelUp.bg.width - LevelUp.text.width) / 2;

		LevelUp.group.add(LevelUp.text);
		LevelUp.group.add(LevelUp.btnOK);

		LevelUp.group.pivot.x = LevelUp.bg.width /2;
		LevelUp.group.pivot.y = LevelUp.bg.height/2;
	
		LevelUp.group.alpha = 0;
		LevelUp.group.scale.setTo(1.5, 1.5);
		LevelUp.btnOK.visible = false;

		LevelUp.resize();
	}

	LevelUp.show = function(level) {
		LevelUp.text.setText('LEVEL ' + level + ' COMPLETED');
		Audio.play('levelup');
		LevelUp.group.alpha = 0;
		LevelUp.clicked = false;
		LevelUp.btnOK.visible = true;
		game.add.tween(LevelUp.group).to( {alpha:1}, 300 , Phaser.Easing.Linear.none, true);
		game.add.tween(LevelUp.group.scale).to( {x:1, y:1}, 500 , Phaser.Easing.Bounce.Out, true);
	}

	LevelUp.close = function() { 
		
		var t = game.add.tween(LevelUp.group.scale).to( {x:0, y:0}, 500 , Phaser.Easing.Back.In, true);
		t.onComplete.add(function() {
			LevelUp.btnOK.visible = false;
		});
		
	}

	LevelUp.buttonCallback = function() {
		if(!LevelUp.clicked) {
			LevelUp.clicked = true;
			LevelUp.close();
			MiningStones.playNextLevel();
		}
	}

	LevelUp.resize = function() {
		var w = game.width;
		var h = game.height;
		LevelUp.group.x = w / 2;
		LevelUp.group.y = h / 2;
	}


	window.LevelUp = LevelUp;

}());
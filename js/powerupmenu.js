(function(){

	var PowerUpMenu = function() {
		throw " PowerUpMenu cannot be instantiated.";
	};

	PowerUpMenu.group;
	PowerUpMenu.groupButton;
	PowerUpMenu.groupRandom;
	PowerUpMenu.bgIco;
	PowerUpMenu.bgRandom;
	PowerUpMenu.btn;
	PowerUpMenu.text;
	PowerUpMenu.colors = ['#cc4444', '#9ccc43', '#399ed1', '#d6d220', '#a138d1', '#ffffff'];
	PowerUpMenu.gem = null;
	PowerUpMenu.countPowers = 3;
	PowerUpMenu.usingPower = false;

	PowerUpMenu.load = function() {
		game.load.image('bgico', 'assets/bgright.png');
		game.load.image('powerupico', 'assets/powerupico.png');
		game.load.image('bgpup', 'assets/bgpup.png');
	};

	PowerUpMenu.create = function() {

		PowerUpMenu.text = game.add.text(110, 5, PowerUpMenu.countPowers, {
			font: "55px AldotheApacheRegular",
			align: "left",
			fill:"#cc4444"
		});

		PowerUpMenu.textPowerUp = game.add.text(27, 27, 'POWER UP', {
			font: "30px AldotheApacheRegular",
			align: "left",
			fill:"#cc4444"
		});

		PowerUpMenu.group = game.add.group();
		PowerUpMenu.groupButton = game.add.group();
		PowerUpMenu.groupRandom = game.add.group();

		PowerUpMenu.bgIco = game.add.sprite(0, 0, 'bgico');
		PowerUpMenu.btn = new Phaser.Button(game, 20, 9, 'powerupico', this.buttonCallback, this);
		PowerUpMenu.bgRandom =  game.add.sprite(0, 0, 'bgpup');
		PowerUpMenu.groupButton.x = 572;
		PowerUpMenu.groupButton.y = 242;
		PowerUpMenu.groupRandom.x = 575;
		PowerUpMenu.groupRandom.y = PowerUpMenu.groupButton.y + 107;

		PowerUpMenu.groupRandom.alpha = 0;
		PowerUpMenu.groupRandom.pivot.x = 85;
		PowerUpMenu.groupRandom.x = PowerUpMenu.groupRandom.x + PowerUpMenu.groupRandom.pivot.x;
		PowerUpMenu.groupRandom.pivot.y = 115
		PowerUpMenu.groupRandom.y = PowerUpMenu.groupRandom.y + PowerUpMenu.groupRandom.pivot.y;
		PowerUpMenu.groupRandom.scale.setTo(3 ,3);


		PowerUpMenu.groupButton.alpha = 0;
		PowerUpMenu.groupButton.visible = false;
		PowerUpMenu.groupButton.pivot.x = 85;
		PowerUpMenu.groupButton.x = PowerUpMenu.groupButton.x + PowerUpMenu.groupButton.pivot.x;
		PowerUpMenu.groupButton.pivot.y = 33
		PowerUpMenu.groupButton.y = PowerUpMenu.groupButton.y + PowerUpMenu.groupButton.pivot.y;
		PowerUpMenu.groupButton.scale.setTo(1.5, 1.5);
		
		PowerUpMenu.groupButton.add(PowerUpMenu.bgIco);
		PowerUpMenu.groupButton.add(PowerUpMenu.btn);
		PowerUpMenu.groupButton.add(PowerUpMenu.text);

		PowerUpMenu.groupRandom.add(PowerUpMenu.bgRandom);
		PowerUpMenu.groupRandom.add(PowerUpMenu.textPowerUp);

		PowerUpMenu.group.add(PowerUpMenu.groupButton);
		PowerUpMenu.group.add(PowerUpMenu.groupRandom);
	};

	PowerUpMenu.showRandomModal = function() {
		if(PowerUpMenu.countPowers <= 0) return;
		if(PowerUpMenu.usingPower) return

		PowerUpMenu.usingPower = true;
		PowerUpMenu.countPowers--;
		PowerUpMenu.text.setText(PowerUpMenu.countPowers);

		var id = utils.randomInt(0,5);
		PowerUpMenu.textPowerUp._style.fill = PowerUpMenu.colors[id]; 
		PowerUpMenu.textPowerUp.setText('POWER UP');

		if(PowerUpMenu.gem) PowerUpMenu.gem.destroy();
		PowerUpMenu.gem = game.add.sprite(46, 105, 'gem' + (id+1));
		PowerUpMenu.groupRandom.add(PowerUpMenu.gem);

		PowerUpMenu.groupRandom.alpha = 0;
		PowerUpMenu.groupRandom.scale.setTo(1.5, 1.5);

		game.add.tween(PowerUpMenu.groupRandom).to( { alpha: 1}, 500, Phaser.Easing.Linear.None, true,0);
		var t = game.add.tween(PowerUpMenu.groupRandom.scale).to( { x: 1, y:1 }, 500, Phaser.Easing.Back.Out, true,0);

		Grid.powerUpColor(id);

		t.onComplete.add(function() {
			game.add.tween(PowerUpMenu.groupRandom).to( { alpha: 0}, 500, Phaser.Easing.Linear.None, true,1000);
			var t2 = game.add.tween(PowerUpMenu.groupRandom.scale).to( { x: 0, y:0 }, 500, Phaser.Easing.Back.In, true,1000);
			t2.onComplete.add(function(){PowerUpMenu.usingPower = false});
		});

	};

	PowerUpMenu.addPower = function() {
		PowerUpMenu.countPowers++;
		PowerUpMenu.text.setText(PowerUpMenu.countPowers);
	}

	PowerUpMenu.show = function() {
		PowerUpMenu.groupButton.visible = true;
		game.add.tween(PowerUpMenu.groupButton).to( { alpha: 1}, 500, Phaser.Easing.Linear.None, true,0);
		game.add.tween(PowerUpMenu.groupButton.scale).to( { x: 1, y:1 }, 500, Phaser.Easing.Back.Out, true,0);
	};

	PowerUpMenu.hide = function() {
		var t = game.add.tween(PowerUpMenu.groupButton).to( { alpha: 0}, 500, Phaser.Easing.Linear.None, true,0);
		game.add.tween(PowerUpMenu.groupButton.scale).to( { x: 0, y:0 }, 500, Phaser.Easing.Back.In, true,0);
		t.onComplete.add(function() {
			PowerUpMenu.groupButton.visible = false;
		});
	};


	PowerUpMenu.buttonCallback = function(e) {
		PowerUpMenu.showRandomModal();
	};

	window.PowerUpMenu = PowerUpMenu;

}());
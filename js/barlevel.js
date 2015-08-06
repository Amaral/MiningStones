(function(){

	var BarLevel = function() {
		throw " BarLevel cannot be instantiated.";
	};

	BarLevel.max = 28;
	BarLevel.min = 4;
	BarLevel.group;
	BarLevel.groupScore;
	BarLevel.width = 0;
	BarLevel.grid = [];
	BarLevel.countGrid = -1;
	BarLevel.quantityPerLevel = [4,7,10,13,16,19,22,24,28];

	BarLevel.bgScore = null;


	BarLevel.load = function(){
		game.load.image('bgscore', 'assets/bgright.png');
	};

	BarLevel.create = function() {

		Score.create();
		BarLevel.bgScore = game.add.sprite(0, 0, 'bgscore');

		BarLevel.text = game.add.text(0, 0, 'LEVEL 1', {
			font: "25px AldotheApacheRegular",
			align: "center",
			fill:"#cc4444"
		});

		BarLevel.group = game.add.group();
		BarLevel.groupBg = game.add.group();
		BarLevel.groupScore = game.add.group();
		BarLevel.groupGem = game.add.group();
		BarLevel.group.add(BarLevel.groupBg);
		BarLevel.group.add(BarLevel.groupGem);
		BarLevel.groupScore.add(BarLevel.bgScore);
		BarLevel.groupScore.add(BarLevel.text);
		BarLevel.groupScore.add(Score.group);
		BarLevel.group.add(BarLevel.groupScore);

		
		BarLevel.groupScore.x = 572;
		BarLevel.groupScore.y = 135;
		BarLevel.text.x = (170-BarLevel.text.width)/2; 
		BarLevel.text.y = 10;
		BarLevel.groupGem.x = BarLevel.groupBg.x = 20;
		BarLevel.groupGem.y = BarLevel.groupBg.y = 710;

		BarLevel.groupScore.alpha = 0;
		BarLevel.groupScore.pivot.x = 85;
		BarLevel.groupScore.x = BarLevel.groupScore.x + BarLevel.groupScore.pivot.x;
		BarLevel.groupScore.pivot.y = 33
		BarLevel.groupScore.y = BarLevel.groupScore.y + BarLevel.groupScore.pivot.y;
		BarLevel.groupScore.scale.setTo(1.5, 1.5);

		BarLevel.setLevel();
	};

	BarLevel.show = function() {
		game.add.tween(BarLevel.groupScore).to( { alpha: 1}, 500, Phaser.Easing.Linear.None, true,0);
		game.add.tween(BarLevel.groupScore.scale).to( { x: 1, y:1 }, 500, Phaser.Easing.Back.Out, true,0);
		var bg = null;
		for (var i = 0; i < BarLevel.grid.length; i++) {
			bg = BarLevel.grid[i].bg;
			game.add.tween(bg.scale).to( { x: 1, y:1 }, 500, Phaser.Easing.Back.Out, true,30*i);
		};
		
	}

	BarLevel.hide = function(callback) {
		game.add.tween(BarLevel.groupScore).to( { alpha: 0}, 500, Phaser.Easing.Linear.None, true,0);
		game.add.tween(BarLevel.groupScore.scale).to( { x: 0, y:0 }, 500, Phaser.Easing.Back.In, true,0);
		BarLevel.reset(callback);
	}

	BarLevel.setLevel = function() {
		BarLevel.grid = [];

		var px = -13;
		var py = 0;
		var count = 0;
		var bg = 0;
		var tot;
		if(MiningStones.level < BarLevel.quantityPerLevel.length) {
			tot = BarLevel.quantityPerLevel[MiningStones.level-1];
		}else {
			tot = BarLevel.quantityPerLevel[BarLevel.quantityPerLevel.length-1];
		}

		for (var i = 0; i < tot; i++) {
			
			if(count == 0) {
				py = 0;
				px += 13;
			}else if(count == 1) {
				py = -13;
				px += 13
			}else if(count == 2) {
				py = 13;
				count = -1;
			}

			bg = BarLevel.groupBg.create(px+13, py+13, 'gembar');
			BarLevel.grid.push({x:px,y:py,gem:null,bg:bg});

		
			bg.anchor.setTo(0.5, 0.5);
			bg.scale.setTo(0, 0);

			
			count++;
			BarLevel.width = px + 25;

		};
		BarLevel.text.setText('LEVEL ' + MiningStones.level);
		BarLevel.text.x = (170-BarLevel.text.width)/2; 
	}

	BarLevel.add = function(kind) {
		BarLevel.countGrid++;

		if(BarLevel.countGrid > BarLevel.grid.length-1) return;
		
		var o = BarLevel.grid[BarLevel.countGrid];

		o.gem = BarLevel.groupGem.create(o.x + 13,o.y + 13,'mini' + MiningStones.gems[kind]);
		o.gem.anchor.setTo(0.5, 0.5);
		o.gem.scale.setTo(1.5, 1.5);
		o.gem.alpha = 0;
		game.add.tween(o.gem).to( { alpha:1 }, 200, Phaser.Easing.Linear.None, true);
		game.add.tween(o.gem.scale).to( { x: 1, y:1 }, 500, Phaser.Easing.Bounce.Out, true);

		if(BarLevel.countGrid == BarLevel.grid.length-1) {
			console.log('passou de level');
			MiningStones.levelCompleted();
		}
		
	}

	BarLevel.reset = function(callback) {
		BarLevel.countGrid = -1;
		var o;
		var tween;
		var tot = BarLevel.grid.length
		for (var i = 0; i < tot; i++) {
			o = BarLevel.grid[i];
			if(o.gem) {
				tween = game.add.tween(o.gem.scale).to( { x: 0, y:0 }, 300, Phaser.Easing.Back.In, true, 400+30*i);
			}
			game.add.tween(o.bg.scale).to( { x: 0, y:0 }, 300, Phaser.Easing.Back.In, true, 400+30*i);
			if(i == tot-1) {
				tween.onComplete.add(function(){
					//removeAll
					BarLevel.groupBg.removeAll();
					BarLevel.groupGem.removeAll();
					BarLevel.grid = [];
					if(callback) callback();
					console.log('BarLevel Reseted');
				});
			}
			
		};
	}

	window.BarLevel = BarLevel;

}());
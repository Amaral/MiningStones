(function(){

	var GemMenu = function() {
		throw 'cannot instantiate GemMenu';
	};

	GemMenu.group;
	GemMenu.groupGem = null;
	GemMenu.groupRemove = null;
	GemMenu.kinds = [2,3,4,4,5,5];
	GemMenu.kindsMini = [-1,-1,-1,4,4,5,5];
	GemMenu.gemRdm = GemMenu.kinds[0];
	GemMenu.miniRdm = GemMenu.kindsMini[0];
	GemMenu.gemsOnScreen = [];

	GemMenu.create = function() {
		GemMenu.group = game.add.group();
		GemMenu.groupGem = game.add.group();
		GemMenu.groupRemove = game.add.group();

		GemMenu.groupGem.x = GemMenu.groupRemove.x = 475;
		GemMenu.groupGem.y = GemMenu.groupRemove.y = 730;

		GemMenu.group.add(GemMenu.groupGem);
		GemMenu.group.add(GemMenu.groupRemove);

		var scale = 0.7;
		GemMenu.groupGem.scale.setTo(scale, scale);
		GemMenu.groupRemove.scale.setTo(scale, scale);

		GemMenu.reset();
		
	}

	GemMenu.show = function() {
		var gem = null;

		for (var i = 0; i < GemMenu.gemsOnScreen.length; i++) {
			gem = GemMenu.gemsOnScreen[i];
			game.add.tween(gem).to( {alpha:1 }, 500, Phaser.Easing.Linear.None, true,400+i*100);
			game.add.tween(gem.scale).to( { x: 1, y:1 }, 500, Phaser.Easing.Bounce.Out, true,400+i*100);
		};
	};

	GemMenu.hide = function() {
		var gem = null;

		for (var i = 0; i < GemMenu.gemsOnScreen.length; i++) {
			gem = GemMenu.gemsOnScreen[i];
			game.add.tween(gem).to( {alpha:0 }, 500, Phaser.Easing.Linear.None, true,400+i*100);
			game.add.tween(gem.scale).to( { x: 0, y:0 }, 500, Phaser.Easing.Bounce.In, true,400+i*100);
		};
	};

	GemMenu.reset = function() {
		var numGens = 4;
		var color1;
		var color2;

		GemMenu.groupGem.removeAll();
		GemMenu.groupRemove.removeAll();

		GemMenu.changeLevel();
		
		for (var i = 0; i < numGens; i++) {

			color1 = utils.randomInt(0, GemMenu.gemRdm);
			color2 = color1;

			while (color2 === color1) {
				 color2 = utils.randomInt(-1, GemMenu.miniRdm);
			}
			
			MiningStones.gemsToPlay.push([color1,color2]);
		};

		var gem;
		GemMenu.gemsOnScreen = [4];
		for (i = 0; i < 4; i++) {
			gem = MiningStones.drawGem((i*30), 0, MiningStones.gemsToPlay[i]);
			gem.scale.setTo(1.5, 1.5);
			gem.alpha = 0;
			
			GemMenu.gemsOnScreen[i] = gem;
			GemMenu.groupGem.addAt(gem,0);
		};
	}

	GemMenu.changeLevel = function() {
		if(MiningStones.level < GemMenu.kinds.length) {
			GemMenu.gemRdm = GemMenu.kinds[MiningStones.level-1];
		} else {
			GemMenu.gemRdm = GemMenu.kinds[GemMenu.kinds.length-1];
		}

		if(MiningStones.level < GemMenu.kindsMini.length) {
			GemMenu.miniRdm = GemMenu.kindsMini[MiningStones.level-1];
		} else {
			GemMenu.miniRdm = GemMenu.kindsMini[GemMenu.kindsMini.length-1];
		}
	}
	
	GemMenu.createNextGemGroup = function() {
		var gem;
		for (var i = 0; i < 4; i++) {
			gem = MiningStones.drawGem((i*30), 0, MiningStones.gemsToPlay[i]);
			GemMenu.gemsOnScreen[i] = gem;
			GemMenu.groupGem.addAt(gem,0);
		};
		
	}

	GemMenu.updateNextGem = function() {

		var color1 = utils.randomInt(0, GemMenu.gemRdm);
		var color2 = color1;
		while (color2 === color1) {
			 color2 = utils.randomInt(-1, GemMenu.miniRdm);
		}
		
		MiningStones.gemsToPlay.push([color1,color2]);

		var removeGem = GemMenu.groupGem.getAt(GemMenu.groupGem.length-1);

		GemMenu.groupGem.remove(removeGem);

		GemMenu.groupRemove.add(removeGem);
		var tween = game.add.tween(removeGem).to( { alpha:0, x: 30 *- 1}, 300, Phaser.Easing.Exponential.Out, true, 0);
		tween.onComplete.add(GemMenu.onCompleteCallbackRemoveNextGem, GemMenu);
		var index = GemMenu.groupGem.length;

		if(MiningStones.gemsToPlay.length > GemMenu.groupGem.length) {
			var newgem = MiningStones.drawGem((GemMenu.groupGem.length+1)*30, 0, MiningStones.gemsToPlay[index]);
			newgem.alpha = 0;
			game.add.tween(newgem).to( { alpha:1, }, 300, Phaser.Easing.Linear.None, true, 0);
			GemMenu.groupGem.addAt(newgem,0);
		};

		for (var i = 0; i <  GemMenu.groupGem.length; i++) {
			var gem = GemMenu.groupGem.getAt(i);
			game.add.tween(gem.position).to( { x: (GemMenu.groupGem.length-1-i)*30, alpha: 1 }, 300, Phaser.Easing.Exponential.Out, true, 0);
		};

	}

	GemMenu.onCompleteCallbackRemoveNextGem = function(gem) {
		GemMenu.groupRemove.remove(gem);
	}

	GemMenu.update = function() {

	}

	


	

	window.GemMenu = GemMenu;

}());

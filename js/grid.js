(function(){

	var Grid = function() {
		throw 'cannot instantiate Grid';
	};


	Grid.sizeTile = 78;
	Grid.marginTitle = 5;
	Grid.rows = 7;
	Grid.cols = 7;
	Grid.pointsSteak = 0;
	Grid.groupTiles;
	Grid.arrayTiles = [];
	Grid.groupGem;
	Grid.gemOnGrid = [];
	Grid.gemOnGridSprite = [];
	Grid.displayPerLevel = [];
	Grid.group = null;

	Grid.create = function() {
		


		Grid.groupTiles = game.add.group();
		Grid.groupGem = game.add.group();
		Grid.group = game.add.group();
		Grid.group.add(Grid.groupTiles);
		Grid.group.add(Grid.groupGem);


		var tile;
		for (var i = 0; i < Grid.rows; i++)
		{
			Grid.arrayTiles[i] = [];

			for (var j = 0; j < Grid.cols; j++) {
				tile = Grid.groupTiles.create(Grid.sizeTile * i + Grid.sizeTile/2, Grid.sizeTile * j + Grid.sizeTile/2, 'squareGrid');
				tile.scale.setTo(0.0, 0.0);
				tile.anchor.setTo(0.5, 0.5);
				Grid.arrayTiles[i][j] = { sprite:tile, onScreen:1 };
			};
		}

		for (i = 0; i < 7; i++) {
			Grid.gemOnGrid[i] = [];
			Grid.gemOnGridSprite[i] = [];
			for(j = 0; j < 7; j++){
				Grid.gemOnGrid[i][j] = [-1,-1];
				Grid.gemOnGridSprite[i][j] = -1;
			}
		};



		var display1 = [[0,0],[6,0],[0,6],[6,6]];
		var display2 = [[3,3],[3,2],[3,4]];
		var display3 = [[3,3],[3,2],[3,4],[2,3],[4,3]];
		var display4 = [[0,0],[6,0],[0,6],[6,6],[0,1],[1,0],[5,6],[6,5],[0,5],[1,6],[5,0],[6,1]];
		var display5 = [[0,0],[6,0],[0,6],[6,6],[0,1],[1,0],[5,6],[6,5],[0,5],[1,6],[5,0],[6,1],[3,3]];
		


		Grid.displayPerLevel.push(display5, display5, display4, display4, display3, display3, display2, display2, display1, display1, []);

		Grid.changeGrid();
		EmitterGem.init();
		
	}

	Grid.reset = function() {
		var size = Grid.sizeTile;
		var m = Grid.marginTitle;
		var gemValue = -1;
		var spriteGem = null;
		var count = 0;
		for (var i = 0; i < Grid.rows; i++) {
			for(var j = 0; j < Grid.cols; j++){
				gemValue = Grid.gemOnGrid[i][j][0];
				if(gemValue > -1) {
					spriteGem = Grid.gemOnGridSprite[i][j];
					Grid.gemOnGridSprite[i][j] = -1;
					Grid.removeGem(spriteGem, 0);
					EmitterGem.start(i*(size)+size/2+m, j*(size)+size/2+m,gemValue,count);
					count++;
				}

				Grid.gemOnGrid[i][j] = [-1,-1];
				Grid.gemOnGridSprite[i][j] = -1;
			}
		};
		Grid.changeGrid();
		Grid.show();
	}

	Grid.changeGrid = function() {

		var r;
		var c;

		var display;
		if(MiningStones.level < Grid.displayPerLevel.length) {
			display = Grid.displayPerLevel[MiningStones.level-1];
		}else {
			display = Grid.displayPerLevel[Grid.displayPerLevel.length-1];
		}


		var size = Grid.sizeTile;
		var m = Grid.marginTitle;
		var gemValue = -1;
		var spriteGem = null;

		for (i = 0; i < Grid.rows; i++) {
			for(j = 0; j < Grid.cols; j++){
				if(Grid.gemOnGrid[i][j][0] == -2){
					Grid.gemOnGrid[i][j][0] = -1;
				}
			}
		};


		for (var i = 0; i < display.length; i++) {
			r = display[i][0];
			c = display[i][1];

			gemValue = Grid.gemOnGrid[r][c][0];
			if(gemValue > -1) {
				spriteGem = Grid.gemOnGridSprite[r][c];
				Grid.gemOnGridSprite[r][c] = -1;
				Grid.removeGem(spriteGem, 0);
				EmitterGem.start(r*(size)+size/2+m, c*(size)+size/2+m,gemValue,i);
			}
			

			Grid.gemOnGrid[r][c][0] = -2;
			Grid.gemOnGrid[r][c][1] = -1;
		};

	}
	
	Grid.show = function(delay) {
		var tile;
		var positionGrid;

		for (var i = 0; i < Grid.rows; i++)
		{
			for (var j = 0; j < Grid.cols; j++) {
				positionGrid = Grid.gemOnGrid[i][j][0];
				tile = Grid.arrayTiles[i][j].sprite;
				if(positionGrid >= -1){
					game.add.tween(tile.scale).to({x: 1.0, y: 1.0}, 500, Phaser.Easing.Back.Out, true, 100*i);
				}else {
					game.add.tween(tile.scale).to({x: 0, y: 0}, 500, Phaser.Easing.Back.In, true, 0 );
				}
				
			};
		}
	}

	Grid.powerUpColor = function(kind) {

		var size = Grid.sizeTile;
		var m = Grid.marginTitle;
		var gemValue = -1;
		var num = 0;
		var spriteGem = null;
		var count = 0;
		var isDoubleCheck = false;
		Audio.play('powerup');
		var miniGems = [];

		for (var i = 0; i < Grid.rows; i++) {
			for(var j = 0; j < Grid.cols; j++){
				
				gemValue = Grid.gemOnGrid[i][j][0];

				if(gemValue == kind) {
					spriteGem = Grid.gemOnGridSprite[i][j];
					Grid.removeGem(spriteGem, 0);
					
					EmitterGem.start(i*(size)+size/2+m, j*(size)+size/2+m,gemValue,count);
					count++;
					Grid.gemOnGrid[i][j][0] = -1;

					miniGemValue = Grid.gemOnGrid[i][j][1];
					if(miniGemValue != -1) {
						isDoubleCheck = true;
						miniGems.push([miniGemValue,i,j]);
					} else {
						Grid.gemOnGrid[i][j][0] = -1;
						Grid.gemOnGridSprite[i][j] = -1;
					}
				}
			}
		};

		var v,r,c = null;
		var sprite;
		for ( i = 0; i < miniGems.length; i++) {
			v = miniGems[i][0];
			r = miniGems[i][1];
			c = miniGems[i][2];
			Grid.gemOnGrid[r][c][0] = v;
			Grid.gemOnGrid[r][c][1] = -1;
			sprite = Grid.gemOnGridSprite[r][c] = MiningStones.drawGem(r*(size)+m+size/2,c*(size)+m+size/2 , Grid.gemOnGrid[r][c]);
			Grid.groupGem.add(sprite);
			sprite.scale.setTo(1.5, 1.5);
			sprite.alpha = 0;
			game.add.tween(sprite).to( { alpha:1 }, 200, Phaser.Easing.Linear.None, true,400);
			game.add.tween(sprite.scale).to( { x: 0.85, y: 0.85 }, 500, Phaser.Easing.Bounce.Out, true,400);
		};


		// VERIFICAR SE AS PECAS DUPLAS TEM COMBINACOES, SENAO PONTUA
		if(isDoubleCheck) {
			var combo = 0;
			for(i = 0; i < Grid.rows; i++){
				for(j = 0; j < Grid.cols; j++){
					if(Grid.isStreak(i, j)){
						Grid.removeGems(i, j,300);
					};
				}
			}
		}

	
	}

	Grid.addGemOnGrid = function(x, y) {

		x = x - Grid.group.x;
		y = y - Grid.group.y;

		var size = Grid.sizeTile;
		var m = Grid.marginTitle;
		var row = Math.floor(x / size);
		var col = Math.floor(y / size);

		if(row < 0 || row >= Grid.rows || col < 0 || col >= Grid.cols ) return;

		// se estiver vazio entao coloca uma nova gema

		if(Grid.gemOnGrid[row][col][0] == -1) {
			Audio.play('gem');
			Grid.pointsSteak = 0;
			Grid.gemOnGrid[row][col] = MiningStones.gemsToPlay.shift();
			GemMenu.updateNextGem();

			var sprite = Grid.gemOnGridSprite[row][col] = MiningStones.drawGem(row*(size)+m + size/2,col*(size)+m + size/2, Grid.gemOnGrid[row][col]);
			Grid.groupGem.add(sprite);
			sprite.scale.setTo(1.5, 1.5);
			sprite.alpha = 0;
			game.add.tween(sprite).to( { alpha:1 }, 200, Phaser.Easing.Linear.None, true);
			game.add.tween(sprite.scale).to( { x: 0.85, y:0.85 }, 500, Phaser.Easing.Bounce.Out, true);


			if(Grid.isStreak(row, col)){
				Grid.removeGems(row, col, 300);
			}
			Grid.checkIsGameOver();
		}
	}

	Grid.checkIsGameOver = function () {
		var hasSpace = false;
		for(var i = 0; i < Grid.rows; i++){
			for(var j = 0; j < Grid.cols; j++){
				if(Grid.gemOnGrid[i][j][0] == -1){
					hasSpace = true;
					break;
				};
			}
		}
		if(!hasSpace) {
			MiningStones.GameOver();
		}
	}

	Grid.removeGems = function(row, col, delay) {

		delay = delay || 0;

		var gemValue = Grid.gemOnGrid[row][col][0];

		if(gemValue <= -1) return;

		var tmp = row;
		var size = Grid.sizeTile;
		var m = Grid.marginTitle;

		var miniGemValue;
		var spriteGem;
		

		var isDoubleCheck = false;

		var miniGems = [];
		
		var num = 1;

		EmitterGem.start(row*(size)+size/2+m, col*(size)+size/2+m,gemValue,0);

		if(Grid.isHorizontalStreak(row,col)){
			// VERIFICA NA HORIZONTAL

			// VERIFICA SE AS PECAS A ESQUERDA SAO DO MESMO TIPO
		
			while(tmp > 0 && Grid.gemOnGrid[tmp-1][col][0] == gemValue){     

				//console.log('direita');
				spriteGem = Grid.gemOnGridSprite[tmp-1][col];
				Grid.removeGem(spriteGem, delay);
				miniGemValue = Grid.gemOnGrid[tmp-1][col][1];
				EmitterGem.start((tmp-1)*(size)+size/2+m, col*(size)+size/2+m,gemValue,num);
				if(miniGemValue != -1) {

					miniGems.push([miniGemValue,(tmp-1),col]);
					isDoubleCheck = true;
				} else {
					Grid.gemOnGrid[tmp-1][col][0] = -1;
					Grid.gemOnGridSprite[(tmp-1)][col] = -1;
				}

				tmp--;
				num++;
			}

			tmp = row;

			// VERIFICA SE AS PECAS A DIREITA SAO DO MESMO TIPO

			while(tmp < Grid.rows-1 && Grid.gemOnGrid[tmp+1][col][0] == gemValue){
				
				//console.log('esquerda');

				spriteGem = Grid.gemOnGridSprite[tmp+1][col];
				Grid.removeGem(spriteGem, delay);
				miniGemValue = Grid.gemOnGrid[tmp+1][col][1];
				EmitterGem.start((tmp+1)*(size)+size/2+m,  col*(size)+size/2+m,gemValue,num);
				if(miniGemValue != -1) {
					miniGems.push([miniGemValue,(tmp+1),col]);
					isDoubleCheck = true;
				} else {
					Grid.gemOnGrid[tmp+1][col][0] = -1;
					Grid.gemOnGridSprite[(tmp+1)][col] = -1;
				}
				tmp++;
				num++;
			}

		}

		if(Grid.isVerticalStreak(row,col)){

			// verifica na vertical

			// VERIFICA SE AS PECAS ACIMA DA ATUAL SAO DO MESMO TIPO
			tmp = col;

			while(tmp > 0 && Grid.gemOnGrid[row][tmp-1][0] == gemValue){
				//console.log('ACIMA')
				spriteGem = Grid.gemOnGridSprite[row][tmp-1];
				Grid.removeGem(spriteGem, delay);
				EmitterGem.start( row*(size)+size/2+m,(tmp-1)*(size)+size/2+m,gemValue,num);
				miniGemValue = Grid.gemOnGrid[row][tmp-1][1];
				if(miniGemValue != -1) {;
					miniGems.push([miniGemValue,row,tmp-1]);
					isDoubleCheck = true;
				} else {
					Grid.gemOnGrid[row][tmp-1][0] = -1;
					Grid.gemOnGridSprite[row][tmp-1] = -1;
				}

				tmp--;
				num++;
			}

			// VERIFICA SE AS PECAS ABAIXO DA ATUAL SAO DO MESMO TIPO

			tmp = col;

			while(tmp < Grid.cols-1 && Grid.gemOnGrid[row][tmp+1][0] == gemValue){
				//console.log('ABAIXO')
				spriteGem = Grid.gemOnGridSprite[row][tmp+1];
				Grid.removeGem(spriteGem, delay);
				EmitterGem.start(row*(size)+size/2+m, (tmp+1)*(size)+size/2+m,gemValue,num);
				miniGemValue = Grid.gemOnGrid[row][tmp+1][1];

				if(miniGemValue != -1) {
					miniGems.push([miniGemValue,row,tmp+1])
					isDoubleCheck = true;
				} else {
					Grid.gemOnGrid[row][tmp+1][0] = -1;
					Grid.gemOnGridSprite[row][tmp+1] = -1;
				}
				tmp++;
				num++;
			}
		}

		// 	REMOVER PECA QUE ACABOU DE INSERIR.

		
		Grid.removeGem(Grid.gemOnGridSprite[row][col], delay);
		miniGemValue = Grid.gemOnGrid[row][col][1];

		if(miniGemValue != -1) {

			miniGems.push([miniGemValue,row,col]);
			isDoubleCheck = true;
		} else {
			miniGemValue = -1;
			Grid.gemOnGridSprite[row][col] = -1;
		}

		Grid.gemOnGrid[row][col][0] = miniGemValue;

		// VERIFICAR SE AS PECAS REMOVIDAS TEM SEGUNDA COR
		
		var v,r,c = null;
		var sprite;
		for ( i = 0; i < miniGems.length; i++) {
			v = miniGems[i][0];
			r = miniGems[i][1];
			c = miniGems[i][2];
			Grid.gemOnGrid[r][c][0] = v;
			Grid.gemOnGrid[r][c][1] = -1;
			sprite = Grid.gemOnGridSprite[r][c] = MiningStones.drawGem(r*(size)+m+size/2,c*(size)+m+size/2 , Grid.gemOnGrid[r][c]);
			Grid.groupGem.add(sprite);
			sprite.scale.setTo(1.5, 1.5);
			sprite.alpha = 0;
			game.add.tween(sprite).to( { alpha:1 }, 200, Phaser.Easing.Linear.None, true,400);
			game.add.tween(sprite.scale).to( { x: 0.85, y:0.85 }, 500, Phaser.Easing.Bounce.Out, true,400);
		};


		// PONTUACAO
		// SE OS PONTOS DA RODADA NAO FOREM ZERO, EH PORQUE AS PECAS DUPLAS TB FORMARAM COMBICOES ENTAO APLICA-SE UM BONUS
		if(Grid.pointsSteak != 0) {
			Grid.pointsSteak = 10 + Grid.pointsSteak + 10 + (num-3)*10;
		}else {
			Grid.pointsSteak = 10 + (num-3)*10;	
		}
		Audio.play('steak')
		Score.updatePoints(Grid.pointsSteak);

		// VERIFICAR SE AS PECAS DUPLAS TEM COMBINACOES, SENAO PONTUA
		if(isDoubleCheck) {
			var combo = 0;
			for(i = 0; i < Grid.rows; i++){
				for(j = 0; j < Grid.cols; j++){
					if(Grid.isStreak(i, j)){
						Grid.removeGems(i, j,300);
					};
				}
			}
		}

		BarLevel.add(gemValue);
	}

	
	Grid.removeGem = function(gem, delay) {
		var tween = game.add.tween(gem).to( { alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 100 + delay);
		tween.onComplete.add(Grid.onCompleteCallbackRemoveGemGrid, Grid);
	}

	Grid.onCompleteCallbackRemoveGemGrid = function(gem) {
		gem.destroy();
		//Grid.groupGem.remove(gem);
	}


	Grid.isHorizontalStreak = function(row, col) {
		var gemValue = Grid.gemOnGrid[row][col][0];

		var streak = 0;
		var tmp = row;

		while(tmp > 0 && Grid.gemOnGrid[tmp-1][col][0] == gemValue){
			streak++;
			tmp--;
		}

		tmp = row;

		while(tmp < Grid.rows-1 && Grid.gemOnGrid[tmp+1][col][0] == gemValue){
			streak++;
			tmp++;
		}

		return streak > 1;
	}

	Grid.isVerticalStreak  = function(row, col) {
		var gemValue = Grid.gemOnGrid[row][col][0];
		var streak = 0;
		var tmp = col;

		while(tmp > 0 && Grid.gemOnGrid[row][tmp-1][0] == gemValue){
			streak++;
			tmp--;
		}

		tmp = col;

		while(tmp < Grid.cols-1 && Grid.gemOnGrid[row][tmp+1][0] == gemValue){
			streak++;
			tmp++;
		}

		return streak > 1;
	};

	Grid.isStreak = function(row, col) {
		return Grid.isVerticalStreak(row, col) || Grid.isHorizontalStreak(row, col);
	} 

	Grid.setX = function(x) {
		Grid.group.x = x;
	}

	Grid.setY = function(y) {
		Grid.group.y = y;
	}


	Grid.update = function() {

		EmitterGem.update();
	}
	

	window.Grid = Grid;

}());

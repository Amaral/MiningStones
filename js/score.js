(function(){

	var Score = function() {
		throw 'cannot instantiate Score';
	};

	Score.text = null;
	Score.group;
	Score.totalPoints = 0;

	Score.create = function() {
		Score.group = game.add.group();
		Score.text = game.add.text(0, 30, '0', {
			font: "35px AldotheApacheRegular",
			align: "left",
			fill:"#cc4444"
		});

		Score.updatePoints(0);
		Score.group.add(Score.text);

	}

	Score.updatePoints = function(points) {
		Score.totalPoints += points;
		Score.text.setText(Score.totalPoints.toString());
		Score.text.x = (170-Score.text.width)/2; 
	};

	Score.setX = function(x) {
		Score.text.x = x;
	};

	Score.setY = function(y) {
		Score.text.y = y;
	};

	Score.reset = function() {
		Score.totalPoints = 0;
		Score.updatePoints(Score.totalPoints);
	};

	window.Score = Score;

}());

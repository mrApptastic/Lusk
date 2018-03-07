var lusk = function (elem) {
	var ib = this;
	ib.elem = document.getElementById(elem);	
	ib.ct = ib.elem.getContext("2d");
	ib.height = 2000;
	ib.width = 2000;
	ib.ct.imageSmoothingEnabled = false;
	
	ib.ct.clear = function() {
		ib.clearRect(0, 0, ib.width, ib.height);
	};
	ib.ct.reSize = function (width, height) {
		ib.height = height;
		ib.width = width;
	};
	// ib.img = new Image();
	// ib.img.src = "Sprites/Lusk/Lusk2.png";
	// ib.ct.drawImage(ib.img, 5, 5);
	ib.global = {
		maxX : 100,
		maxY : 100,
		step : 5,
		gravity : 10,
		leap : 60,
		level : 1,
		falling : false,
		game : null,
		clock : 50
	};
	
	ib.protagonist = {
		element : null, // document.getElementById("protagonist"),
		x : 45,
		y : 0
	};
	
	ib.antagonists = [];
	
	ib.start = function () {
		ib.global.game = setInterval(ib.handleEvents, ib.global.clock);
	};

	ib.stop = function () {
		clearInterval(game);
	};

	ib.init = function () {
		ib.protagonist.y = ib.global.maxY;
		ib.placeItem();
		ib.start();
	};

	ib.handleGravity = function () {
		if (ib.protagonist.y < ib.global.maxY) {
			ib.global.falling = true;
			ib.protagonist.y += ib.global.gravity;		
			ib.placeItem();
		}
		else {
			ib.global.falling = false;
		}
	};

	ib.handleAntagonists = function () {

	};

	ib.handleEvents = function () {
		ib.ct.clear();
		ib.handleGravity();
	};

	ib.placeItem = function (index) {
		if (!index) {
			ib.ct.fillStyle = "Red";
			ib.ct.fillRect(ib.protagonist.x,ib.protagonist.y,20,20);
			/*
			ib.protagonist.element.style.left = ib.protagonist.x + "vw";
			ib.protagonist.element.style.top = ib.protagonist.y + "vh";
			*/
		}
		else {

			/*
			ib.antagonists[index].element.style.left = ib.protagonist.x + "vw";
			ib.antagonists[index].element.style.top = ib.protagonist.y + "vh";
			*/
		}	
	};

	ib.jump = function (index) {
		var elm = ib.protagonist;
		if (index) {
			elm = ib.antagonists[index];
		}
		if (!ib.global.falling) {
			elm.y -= ib.global.leap;
			index ? ib.placeItem(index) : ib.placeItem();
		}
	};

	ib.move = function (direction) {
		if (direction) {
			if (ib.protagonist.x < ib.global.maxX) {
				ib.protagonist.x += ib.global.step;
			}	
		}
		else {
			if (ib.protagonist.x > 0) {
				ib.protagonist.x -= ib.global.step;
			}	
		}
		ib.placeItem();
	};
	
	ib.init();

	window.addEventListener("keydown", function(e) {
		var code = e.keyCode;
		if (code) {
			switch (code) {
				case 32: ib.jump(); break;
				case 38: ib.jump(); break;
				case 37: ib.move(false); break;
				case 39: ib.move(true); break;			
				case 65: ib.move(false); break;			
				case 68: ib.move(true); break;
				case 87: ib.jump(); break;
			}
		}
	});
	document.addEventListener("click", function() {
		ib.jump();
	});
	
};

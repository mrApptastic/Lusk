var lusk = function (elem) {
	var ib = this;
	ib.elem = document.getElementById(elem);	
	ib.ct = ib.elem.getContext("2d");
	ib.height = 2000;
	ib.width = 2000;
	ib.ct.imageSmoothingEnabled = false;
	
	ib.ct.clear = function() {
		ib.ct.clearRect(0, 0, 400, 400);
	};
	ib.ct.reSize = function (wth, hgt) {
		ib.height = hgt;
		ib.width = wth;
	};	
	ib.global = {
		maxX : 300,
		maxY : 100,
		step : 5,
		gravity : 10,
		leap : 60,
		level : 1,
		falling : false,
		game : null,
		clock : 50,
		ticks : 0
	};
	
	ib.protagonist = {
		element : null, // document.getElementById("protagonist"),
		selectedFrame : 0,
		img : new Image(),	
		frms : ["Sprites/Runner/Runner-Running-0.png","Sprites/Runner/Runner-Running-1.png","Sprites/Runner/Runner-Running-2.png","Sprites/Runner/Runner-Running-3.png","Sprites/Runner/Runner-Running-4.png","Sprites/Runner/Runner-Running-5.png","Sprites/Runner/Runner-Running-6.png","Sprites/Runner/Runner-Running-7.png"],
		x : 45,
		y : 0,
		h : 125,
		w : 125
	};
	
	ib.antagonists = [
	{
 		selectedFrame : 0,
		img : new Image(),	
		frms : ["Sprites/MrUfo/mrUfo_0.png","Sprites/MrUfo/mrUfo_1.png","Sprites/MrUfo/mrUfo_2.png","Sprites/MrUfo/mrUfo_3.png","Sprites/MrUfo/mrUfo_4.png","Sprites/MrUfo/mrUfo_5.png"],
		x : 0,
		y : 80,		
		h : 100,
		w : 100
	},
	{
 		selectedFrame : 0,
		img : new Image(),	
		frms : ["Sprites/Bat/Bat_Flying_1.png","Sprites/Bat/Bat_Flying_2.png"],
		x : 120,
		y : 72,		
		h : 50,
		w : 50
	}
	];
	
	ib.start = function () {
		ib.global.game = setInterval(ib.handleEvents, ib.global.clock);
	};

	ib.stop = function () {
		clearInterval(game);
	};

	ib.init = function () {
		// var wt = window.innerWidth;
		// var ht = window.innerHeight;
		// ib.global.maxX = wt;
		// ib.global.maxY = ht;
		//ib.ct.reSize(400, 400);
		ib.protagonist.y = ib.global.maxY;
		ib.placeItem();
		ib.start();
	};

	ib.handleGravity = function () {
		if (ib.protagonist.y < ib.global.maxY) {
			ib.global.falling = true;
			ib.protagonist.y += ib.global.gravity;				
		}
		else {
			ib.global.falling = false;
		}
	};
	
	ib.handleAntagonists = function () {

	};
	
	ib.handleCollisons = function () {
		for (let i = 0; i < ib.antagonists.length; i++) {
			let b = 20;
			let x = ib.antagonists[i].x;
			let y = ib.antagonists[i].y;			
			if (x >= ib.protagonist.x - b && x <= ib.protagonist.x + b && y >= ib.protagonist.y - b && y <= ib.protagonist.y + b) {
				ib.global.ticks = 0;
			}			 
		}		
	};
	
	ib.handleEvents = function () {
		ib.global.ticks++;
		ib.ct.clear();
		ib.handleGravity();		
		ib.handleAntagonists();
		for (let i = 0; i < ib.antagonists.length; i++) {
			ib.placeItem(i);
		}
		ib.placeItem();		
		ib.ct.fillText(ib.global.ticks, ib.elem.width - (ib.global.ticks.toString().length * 7), 10);
		ib.handleCollisons();
	};
	
	ib.placeItem = function (index) {
		if (index === undefined || index === null) {
			//ib.ct.fillStyle = "Red";
			//ib.ct.fillRect(ib.protagonist.x,ib.protagonist.y,20,20);
			if (ib.protagonist.selectedFrame < ib.protagonist.frms.length) {
				ib.protagonist.selectedFrame++;
			}
			else {
				ib.protagonist.selectedFrame = 0;
			}
			ib.protagonist.img.src = ib.protagonist.frms[ib.protagonist.selectedFrame];
			//ib.ct.clear();
			ib.ct.drawImage(ib.protagonist.img, ib.protagonist.x, ib.protagonist.y - 74, ib.protagonist.w, ib.protagonist.h);			
			/*
			ib.protagonist.element.style.left = ib.protagonist.x + "vw";
			ib.protagonist.element.style.top = ib.protagonist.y + "vh";
			*/
		}
		else {
			
			if (ib.antagonists[index].selectedFrame < ib.antagonists[index].frms.length) {
				ib.antagonists[index].selectedFrame++;
			}
			else {
				ib.antagonists[index].selectedFrame = 0;
			}
			ib.antagonists[index].img.src = ib.antagonists[index].frms[ib.antagonists[index].selectedFrame];
			//ib.ct.clear();
			ib.ct.drawImage(ib.antagonists[index].img, ib.antagonists[index].x, ib.antagonists[index].y - 74, ib.antagonists[index].w, ib.antagonists[index].h);	
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
		//ib.placeItem();
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

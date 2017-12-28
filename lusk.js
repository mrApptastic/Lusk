var lusk = function (back, middle, antagonists, protagonist, front) {
	var ib = this;
	ib.back = document.getElementById("back");
	ib.middle = document.getElementById("middle");
	ib.protagonist = document.getElementById("protagonist");
	ib.antagonists = document.getElementById("antagonists");
	ib.front = document.getElementById("front");	
	ib.bg = ib.back.getContext("2d");
	ib.md = ib.middle.getContext("2d");
	ib.pg = ib.protagonist.getContext("2d");
	ib.ag = ib.antagonists.getContext("2d");
	ib.fr = ib.front.getContext("2d");
	ib.height = 400;
	ib.width = 400;
	
	ib.clear = function(layer) {
		try {
			ib[layer].clearRect(0, 0, ib.width, ib.height);
		}
		catch (error) {
			console.log(error);
		}
	};
	ib.reSize = function (width, height) {
		ib.back.height = height;
		ib.middle.height = height;
		ib.protagonist.height = height;
		ib.antagonists.height = height;
		ib.front.height = height;
		ib.back.width = width;
		ib.middle.width = width;
		ib.protagonist.width = width;
		ib.antagonists.width = width;
		ib.front.width = width;
	};
	
	//ib.clear("pg");
	ib.pg.imageSmoothingEnabled= false;
	ib.reSize(ib.height,ib.width);	
	ib.img = new Image();
	ib.img.src = "Sprites/Lusk/Lusk2.png";
	ib.pg.drawImage(ib.img, 5, 5);
	
	ib.img2 = new Image();
	ib.img2.src = "Sprites/Textures/Pixelgrass0.png";
	ib.md.drawImage(ib.img2, 0, 763);
	ib.md.drawImage(ib.img2, 64, 763);
};

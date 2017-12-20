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
	
	ib.clear = function() {
		
	};
	ib.reSize = function (height, width) {
		ib.bg.height = height;
		ib.md.height = height;
		ib.pg.height = height;
		ib.ag.height = height;
		ib.fr.height = height;
		ib.bg.width = width;
		ib.md.width = width;
		ib.pg.width = width;
		ib.ag.width = width;
		ib.fr.width = width;
	};
};

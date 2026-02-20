var w = false
var a = false
var s = false
var d = false
var space = false
var q = false

window.addEventListener("keydown", function(key){
		if(key.key == "w"){
			w = true;
		}
		if(key.key == "a"){
			a = true;
		}
		if(key.key == "s"){
			s = true;
		}
		if(key.key == "d"){
			d = true;
		}
		if(key.key == " "){
			space = true;
		}
		if(key.key == "q"){
			q = true;
		}
})

window.addEventListener("keyup", function(key){
		if(key.key == "w"){
			w = false;
		}
		if(key.key == "a"){
			a = false;
		}
		if(key.key == "s"){
			s = false;
		}
		if(key.key == "d"){
			d = false;
		}
		if(key.key == " "){
			space = false;
		}
		if(key.key == "q"){
			q = false;
		}
})
var w = false
var a = false
var s = false
var d = false
var space = false
var q = false
var shift = false

window.addEventListener("keydown", function(key){
		if(key.code == "KeyW"){
			w = true;
		}
		if(key.code == "KeyA"){
			a = true;
		}
		if(key.code == "KeyS"){
			s = true;
		}
		if(key.code == "KeyD"){
			d = true;
		}
		if(key.code == "Space"){
			space = true;
		}
		if(key.code == "KeyQ"){
			q = true;
		}
		if(key.code == "ShiftLeft"){
			shift = true;
		}
})

window.addEventListener("keyup", function(key){
		if(key.code == "KeyW"){
			w = false;
		}
		if(key.code == "KeyA"){
			a = false;
		}
		if(key.code == "KeyS"){
			s = false;
		}
		if(key.code == "KeyD"){
			d = false;
		}
		if(key.code == "Space"){
			space = false;
		}
		if(key.code == "KeyQ"){
			q = false;
		}
		if(key.code == "ShiftLeft"){
			shift = false;
		}
})
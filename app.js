var fragmentShaderRaw = `
precision mediump float;
varying vec3 fragColor;
void main(){
	gl_FragColor = vec4(fragColor, 1.0);
}`

var vertexShaderRaw = `
precision mediump float;
attribute vec3 verticePos;
attribute vec3 verticeColor;
varying vec3 fragColor;
uniform mat4 world;
uniform mat4 view;
uniform mat4 projection;
void main(){
	fragColor = verticeColor;
	gl_Position = projection * view * world * vec4(verticePos, 1.0);
}`

/* height 500 width 400 */

const gameWindow = document.getElementById("gameWindow");
const webgl = gameWindow.getContext("webgl");

if(!webgl){
	console.log("Webgl isn't working :(");
}else{
	console.log("Webgl loaded :)");
}

webgl.clearColor(0.0, 0.0, 0.0, 1.0);
webgl.enable(webgl.DEPTH_TEST);

/*webgl.enable(webgl.CULL_FACE);
webgl.frontFace(webgl.CCW);
webgl.cullFace(webgl.BACK);*/

var fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(fragmentShader, fragmentShaderRaw);
webgl.compileShader(fragmentShader);

var vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vertexShader, vertexShaderRaw);
webgl.compileShader(vertexShader);

var program = webgl.createProgram();
webgl.attachShader(program, fragmentShader);
webgl.attachShader(program, vertexShader);
webgl.linkProgram(program);

var triVerts = [
    -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
     0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
     0.0,  0.5, 0.0, 0.0, 0.0, 1.0,
];  

var triangleVBO = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleVBO);
webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(triVerts), webgl.STATIC_DRAW);

var positionAttrib = webgl.getAttribLocation(program, "verticePos");
webgl.vertexAttribPointer(positionAttrib, 3, webgl.FLOAT, webgl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);

var colorAttrib = webgl.getAttribLocation(program, "verticeColor");
webgl.vertexAttribPointer(colorAttrib, 3, webgl.FLOAT, webgl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

webgl.enableVertexAttribArray(positionAttrib);
webgl.enableVertexAttribArray(colorAttrib);

webgl.useProgram(program);

var worldUniform = webgl.getUniformLocation(program, "world");
var viewUniform = webgl.getUniformLocation(program, "view");
var projectionUniform = webgl.getUniformLocation(program, "projection");

var worldMatrix = new Float32Array(16);
var viewMatrix = new Float32Array(16);
var projectionMatrix = new Float32Array(16);
glMatrix.mat4.identity(worldMatrix);
glMatrix.mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
glMatrix.mat4.perspective(projectionMatrix, (90 * Math.PI / 180), gameWindow.width / gameWindow.height, 0.01, 1000);

webgl.uniformMatrix4fv(worldUniform, webgl.FALSE, worldMatrix);
webgl.uniformMatrix4fv(viewUniform, webgl.FALSE, viewMatrix);
webgl.uniformMatrix4fv(projectionUniform, webgl.FALSE, projectionMatrix);

var translationMatrix = new Float32Array(16);
var rotationMatrix = new Float32Array(16);
var scaleMatrix = new Float32Array(16);

var identityMatrix = new Float32Array(16);
glMatrix.mat4.identity(identityMatrix);

var x = 0;
var y = 0;
var z = 0;

var canPlayerMove = true;

var walkSpeed = 0.05;
var sprintSpeed = 0.1;
var speed = walkSpeed;

var angle = 0;
var angle2 = 0;

var input = function(){
	if(w == true){
		if(y < 4.4 && canPlayerMove){
			y += speed;
			angle2 = 360;
		}
	}
	if(a == true && canPlayerMove){
		if(x < 6){
			x += speed;
			angle2 = 270;
		}
	}
	if(s == true && canPlayerMove){
		if(y > -4.4){
			y -= speed;
			angle2 = 180;
		}
	}
	if(d == true && canPlayerMove){
		if(x > -6){
			x -= speed;
			angle2 = 90;
		}
	}
	
	if(shift == true){
		speed = sprintSpeed;
	}else{
		speed = walkSpeed;
	}
};

var loop = function(){
	/*console.log("the render loop is looping");*/
	webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
	
	input();
	
	angle = performance.now() / 1000 / 2 * 2 * Math.PI;
	
	glMatrix.mat4.translate(translationMatrix, identityMatrix, [0, 0, 8]);
	glMatrix.mat4.rotate(rotationMatrix, identityMatrix, angle, [0, 1, 0]);
	
	glMatrix.mat4.multiply(worldMatrix, translationMatrix, rotationMatrix);
	
	webgl.uniformMatrix4fv(worldUniform, webgl.FALSE, worldMatrix);
	
	webgl.drawArrays(webgl.TRIANGLES, 0, 3);
	
	glMatrix.mat4.translate(translationMatrix, identityMatrix, [x, y, z]);
	glMatrix.mat4.rotate(rotationMatrix, identityMatrix, (angle2 * Math.PI / 180), [0, 0, 1]);
	
	glMatrix.mat4.multiply(worldMatrix, translationMatrix, rotationMatrix);
	
	webgl.uniformMatrix4fv(worldUniform, webgl.FALSE, worldMatrix);
	
	webgl.drawArrays(webgl.TRIANGLES, 0, 3);
	
	requestAnimationFrame(loop);
};
requestAnimationFrame(loop);

//Everything up to this point is to render the first frame

var scene, camera, renderer, loop,cube,cubedata,controller ;
var frame = 0;
var xSpeed = 0.5;
var zSpeed = 0.5;
var ySpeed = 0;

cubedata = {
	W:1,
	H:1,
	B:1,
	jump:true,
	x_vel:0,
	y_vel:0,
	z_vel:0,
	x:0,
	y:0,
	z:0
};

init();

function init(){
	scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer();

	camera.position.set(0,3,20);
	camera.lookAt(0,0,0);
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement );
	// GenPlane();
	// SetLight();
	// GenCube(cubedata.x,cubedata.y,cubedata.z);
}


function render(){
	renderer.render(scene,camera);
};



controller = {

		forward:false,
		back:false,
		left:false,
		right:false,
		up:false,

keyListener:function(event){
	var keystate = (event.type == "keydown")?true:false;
	switch (event.keyCode) {
		case 87:
				controller.forward = keystate;
			break;
		case 83:
				controller.back = keystate;
			break;
		case 65:
				controller.left = keystate;
			break;
		case 68:
				controller.right = keystate;
			break;
		case 32:
				controller.up = keystate;
			break;
	}




}

// function CubeMove(event) {
//     var keyCode = event.which;
//
//     if (keyCode == 87) {
//         cube.position.z -= zSpeed;
//     } else if (keyCode == 83) {
//         cube.position.z += zSpeed;
//     } else if (keyCode == 65) {
//         cube.position.x -= xSpeed;
//     } else if (keyCode == 68) {
//         cube.position.x += xSpeed;
//     } else if (keyCode == 32) {
//         cube.position.set(0, 0.5, 0);
//     }
// };

}

loop = function(){

	if(controller.up && cubedata.jump == false){
		cubedata.y_vel +=5;
		cubedata.jump = true;
	}

	if(controller.left){
		cubedata.x_vel -=0.01;
	}
	if(controller.right){
		cubedata.x_vel +=0.01;
	}
	if(controller.forward){
		cubedata.z_vel -=0.01;
	}
	if(controller.back){
		cubedata.z_vel +=0.01;
	}

	cubedata.y_vel -=0.7;//gravity
	cubedata.x += cubedata.x_vel;
	cubedata.z += cubedata.z_vel;
	cubedata.y += cubedata.y_vel;
	cubedata.x_vel *= 0.9;//friction
	cubedata.y_vel *= 0.9;//friction
	cubedata.z_vel *= 0.9;//friction

	//colision detection
	if(cubedata.y < 1){
		cubedata.jump = false;
		cubedata.y = 1;
		cubedata.t_vel = 0;
	}
	GenPlane();
	SetLight();
	GenCube(cubedata.x,cubedata.y,cubedata.z);
	render();
  window.requestAnimationFrame(loop);

}






function GenPlane(){

	var geometry = new THREE.PlaneGeometry( 5, 20, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	var plane = new THREE.Mesh( geometry, material );
	plane.rotation.x = Math.PI / 2;
	scene.add( plane );

};


function SetLight(){
	var light = new THREE.AmbientLight(0x404040);
	scene.add(light);

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
	directionalLight.position.set( 0,4,1 );
	directionalLight.castShadow = true;
	scene.add( directionalLight );
};

function GenCube(x1,y1,z1){
	scene.remove(cube);
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	cube = new THREE.Mesh( geometry, material );
	cube.position.x = x1;
	cube.position.y = y1;
	cube.position.z = z1;
	scene.add(cube);
}



//Event Listeners:

window.addEventListener("keydown",controller.keyListener);
window.addEventListener("keyup",controller.keyListener);
window.requestAnimationFrame(loop);

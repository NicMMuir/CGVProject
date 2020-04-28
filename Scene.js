//Quick notes:
//ground with height differencr of 1 will act as a stair

var scene, camera,raycamera, renderer, loop,cube,cubedata,controller;
var Colidables = [];
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
	y:2,
	z:0
};



//raycasting
var rayforward = new THREE.Raycaster();
var raybackward = new THREE.Raycaster();
var raydown = new THREE.Raycaster();
var rayleft = new THREE.Raycaster();
var rayright = new THREE.Raycaster();

// Direction Vectors
var vecforward = new THREE.Vector3(0,0,-1);
var vecbackward = new THREE.Vector3(0,0,1);
var vecleft = new THREE.Vector3(-1,0,0);
var vecright = new THREE.Vector3(1,0,0);
var vecdown = new THREE.Vector3(0,-1,0);

//cube Vector3

var cubevec = new THREE.Vector3(cubedata.x,cubedata.y,cubedata.z);

//array of intersecting objects
var fobj = new Array();
var bobj= new Array();
var dobj= new Array();
var lobj= new Array();
var robj= new Array();



var geometry1 = new THREE.BoxGeometry( 20, 1, 20 );
var material1 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var floor1 = new THREE.Mesh( geometry1, material1 );



var geometry2 = new THREE.BoxGeometry( 22, 3, 22 );
var material2 = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
var floor2 = new THREE.Mesh( geometry2, material2 );
var floor3 = new THREE.Mesh( geometry2, material2 );
var floor4 = new THREE.Mesh( geometry2, material2 );
// cube1.position.x = 0;
// cube1.position.y = y1;
var geometryC = new THREE.BoxGeometry( 1, 1, 1 );
var materialC = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
cube = new THREE.Mesh( geometryC, materialC );










init();

function init(){
	scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer();

	camera.position.set(0,15,30);
	camera.lookAt(0,0,0);
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement );
	floor2.position.z = -20;
	floor3.position.x = -20;
	floor4.position.x = +20;


	scene.add( floor1 );
	scene.add( floor2 );
	scene.add( floor3 );
	scene.add( floor4 );
	Colidables.push(floor1);
	Colidables.push(floor2);
	Colidables.push(floor3);
	Colidables.push(floor4);
	scene.add(cube);

	SetLight();
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

	GenCube(cubedata.x,cubedata.y,cubedata.z);
	colisiondetection(cube);
	if(controller.up && cubedata.jump == false){
		cubedata.y_vel +=6;
		cubedata.jump = true;
	}

	if(controller.left){
		cubedata.x_vel -=0.04;
	}
	if(controller.right){
		cubedata.x_vel +=0.04;
	}
	if(controller.forward){
		cubedata.z_vel -=0.04;
	}
	if(controller.back){
		cubedata.z_vel +=0.04;
	}

	cubedata.y_vel -=0.3;//gravity
	cubedata.x += cubedata.x_vel;
	cubedata.z += cubedata.z_vel;
	cubedata.y += cubedata.y_vel;
	cubedata.x_vel *= 0.9;//friction
	cubedata.y_vel *= 0.9;//friction
	cubedata.z_vel *= 0.9;//friction

	//colision detection
	// if(cubedata.y < 1){
	// 	cubedata.jump = false;
	// 	cubedata.y = 1;
	// 	cubedata.t_vel = 0;
	// }

	// down collis
	//console.log(fobj);
	  //fall through map
	if(cubedata.y<-50){
		cubedata.x=0
		cubedata.y=2
		cubedata.z=0
	}
	if(cubedata.y<1.2){
		cubedata.jump = false;
	}
	if(cubedata.jump != true && dobj.length != 0){
	if(dobj[0].distance <= 1.5){
		cubedata.jump = false;
		cubedata.y = dobj[0].point.y+0.5;
		//cubedata.t_vel = 0;
	}
}
	//forward collis
	if(fobj.length != 0){
		if(fobj[0].distance <= 1){
			cubedata.jump = false;
			cubedata.z = fobj[0].point.z+1.1;
			//cubedata.t_vel = 0;
		}
	}
	if(bobj.length != 0){
		if(bobj[0].distance <= 1){
			cubedata.jump = false;
			cubedata.z = bobj[0].point.z-1.1;
			//cubedata.t_vel = 0;
		}
	}
	if(lobj.length != 0){
		if(lobj[0].distance <= 1){
			cubedata.jump = false;
			cubedata.x = lobj[0].point.x+1.1;
			//cubedata.t_vel = 0;
		}
	}
	if(robj.length != 0){
		if(robj[0].distance <= 1){
			cubedata.jump = false;
			cubedata.x = robj[0].point.x-1.1;
			//cubedata.t_vel = 0;
		}
	}





//

	GenCube(cubedata.x,cubedata.y,cubedata.z);

	render();
  window.requestAnimationFrame(loop);

}

function colisiondetection(cube){
		cubevec.set(cubedata.x,cubedata.y,cubedata.z);
		//raycaster.set(pos , direc);
		rayforward.set(cubevec , vecforward ,far=5);
		raybackward.set(cubevec , vecbackward,far=5);
		raydown.set(cubevec , vecdown,far=5);
		rayleft.set(cubevec , vecleft,far=5);
		rayright.set(cubevec , vecright,far=5);
		//.intersectObjects ( objects : Array, recursive : Boolean, optionalTarget : Array ) : Array


		 fobj = rayforward.intersectObjects(Colidables).slice(0,3);
		 bobj = raybackward.intersectObjects(Colidables).slice(0,3);
		 dobj = raydown.intersectObjects(Colidables).slice(0,3);
		 lobj = rayleft.intersectObjects(Colidables).slice(0,3);
		 robj = rayright.intersectObjects(Colidables).slice(0,3);

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


	cube.position.x = x1;
	cube.position.y = y1;
	cube.position.z = z1;
}


//Event Listeners:

window.addEventListener("keydown",controller.keyListener);
window.addEventListener("keyup",controller.keyListener);
window.requestAnimationFrame(loop);

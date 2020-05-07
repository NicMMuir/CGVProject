//Quick notes:
//ground with height differencr of 1 will act as a stair


//Heightmap
//orbital controls

//---pause menu functionality (currenlty broken)------//
/*var gamePaused = true; //for pause menu 
document.getElementById("menu").style.display = "block"; 

window.onload=function(){document.getElementById("startBtn").addEventListener("click", hideMenu); }

function hideMenu(){
//hides pause menu
	gamePaused = false; 
	document.getElementById("menu").style.display = "none"; 
	gamePaused = false; 
	console.log("started!");
}*/


var scene, camera,raycamera, renderer, loop,cube,cubedata,controller;
var Collidables = [];
var distanceprev;
var frame = 0;
var xSpeed = 0.5;
var zSpeed = 0.5;
var ySpeed = 0;

var camstartx = 0;
var camstarty = 15;
var camstartz = 30;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
renderer = new THREE.WebGLRenderer();


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
	z:0,
	rotationy:0
};

camera.position.set(camstartx,camstarty,camstartz);
camera.lookAt(cubedata.x,cubedata.y,cubedata.z);
camera.updateProjectionMatrix();
var controls = new THREE.PointerLockControls(camera);

//raycasting
var rayforward = new THREE.Raycaster();
var raybackward = new THREE.Raycaster();
var raydown = new THREE.Raycaster();
var rayleft = new THREE.Raycaster();
var rayright = new THREE.Raycaster();

// Direction Vectors


//camerarotation

//cube Vector3

var cubevec = new THREE.Vector3(cubedata.x,cubedata.y,cubedata.z);

//array of intersecting objects
var fobj = new Array();
var bobj= new Array();
var dobj= new Array();
var lobj= new Array();
var robj= new Array();




// cube1.position.x = 0;
// cube1.position.y = y1;
var geometryC = new THREE.BoxGeometry( 1, 1, 1 );
var materialC = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
cube = new THREE.Mesh( geometryC, materialC );






init();

function init(){
	



	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement );

	getarr();
	for(let k =0 ;k<ObjectsArr.length;k++){
		scene.add( ObjectsArr[k] );
		Collidables.push(ObjectsArr[k]);
	}

	controls.getObject().add(cube);


	scene.add(controls.getObject());
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

}

loop = function(){
	distanceprev = cubedata.y;
	MoveCube(cubedata.x,cubedata.y,cubedata.z);
	colisiondetection(controls.getObject());
	if(controller.up && cubedata.jump == false){
		//must be a mutiple of the gravity
		cubedata.y_vel +=10;
		cubedata.jump = true;
	}

	if(controller.left){
		// cube.rotation.y-=0.04;
		// cubedata.rotationy -= 0.04
		cubedata.x_vel -=0.04;
	}
	if(controller.right){
		cubedata.x_vel +=0.04;
		// cube.rotation.y +=0.04;
		// cubedata.rotationy += 0.04
	}
	if(controller.forward){
		cubedata.z_vel -=0.04;
	}
	if(controller.back){
		cubedata.z_vel +=0.04;
	}

	cubedata.y_vel -=0.25;//gravity
	// cubedata.x += cubedata.x_vel;
	// cubedata.z += cubedata.z_vel;
	cubedata.y += cubedata.y_vel;
	cubedata.x_vel *= 0.9;//friction
	cubedata.y_vel *= 0.9;//friction
	cubedata.z_vel *= 0.9;//friction


if(dobj.length != 0){
	if(cubedata.jump == true && dobj[0].distance<1.5 && distanceprev>cubedata.y){
			cubedata.jump = false;
	}
}

	if(cubedata.y<-50){
		cubedata.x=0;
		cubedata.y=2;
		cubedata.z=0;
		cubedata.jump = false;
		camera.position.set(camstartx,camstarty,camstartz);
		camera.lookAt(0,0,0);
	}
	if(cubedata.jump == false && dobj.length != 0){
	//if(dobj[0].distance <= 10){
		cubedata.jump = false;
		cubedata.y = dobj[0].point.y+0.5;
//	}
}
	//forward collis
	if(fobj.length != 0){
		if(fobj[0].distance <= 1){
			cubedata.jump = false;
			controls.getObject().position.z = fobj[0].point.z-1.1;
			//cubedata.t_vel = 0;
		}
	}
	if(bobj.length != 0){
		if(bobj[0].distance <= 1){
			cubedata.jump = false;
			controls.getObject().position.z = bobj[0].point.z+1.1;
			//cubedata.t_vel = 0;
		}
	}
	if(lobj.length != 0){
		if(lobj[0].distance <= 1){
			cubedata.jump = false;
			controls.getObject().position.x = lobj[0].point.x+1.1;
			//cubedata.t_vel = 0;
		}
	}
	if(robj.length != 0){
		if(robj[0].distance <= 1){
			cubedata.jump = false;
			controls.getObject().position.x = robj[0].point.x+1.1;
			//cubedata.t_vel = 0;
		}
	}





//

	MoveCube(cubedata.x,cubedata.y,cubedata.z);


	render();
  window.requestAnimationFrame(loop);


}


function colisiondetection(cube){

	let realRot = controls.getObject().rotation.y;
	let screenRot;
	 if(controls.getObject().position.z == 0) {
			 screenRot = Math.PI / 2 * Math.sign(controls.getObject().position.x);
	 } else {
			 if(controls.getObject().position.x != 0) {
					 screenRot = Math.atan(controls.getObject().position.x / controls.getObject().position.z);
			 } else {
					 if(controls.getObject().position.z == -1) {
							 screenRot = Math.PI;
					 } else {
							 screenRot = 0;
					 }
			 }
	 }
		let rot = (Math.PI + realRot) + screenRot;

		 //rays in order to check for collisions
		 var forw = new THREE.Vector3(Math.sin(rot), 0, -Math.cos(rot)); //Forward
		 var backw  = new THREE.Vector3(Math.sin(rot), 0, Math.cos(rot)); //back
		 var left = new THREE.Vector3(Math.sin(rot - Math.PI / 2), 0, Math.cos(rot - Math.PI / 2)); //Left
		 var right = new THREE.Vector3(Math.sin(rot + Math.PI / 2), 0, Math.cos(rot + Math.PI / 2)); //Right
		 var downw = new THREE.Vector3(0, -1, 0); //Down

		cubevec.set(controls.getObject().position.x,controls.getObject().position.y,controls.getObject().position.z);
		//raycaster.set(pos , direc);
		rayforward.set(cubevec , forw);//farward
		raybackward.set(cubevec , backw);//back
		raydown.set(cubevec , downw);//down
		rayleft.set(cubevec , left);//left
		rayright.set(cubevec , right);//right
		//.intersectObjects ( objects : Array, recursive : Boolean, optionalTarget : Array ) : Array
		fobj = rayforward.intersectObjects(Collidables);
		bobj = raybackward.intersectObjects(Collidables);
		dobj = raydown.intersectObjects(Collidables);
		lobj = rayleft.intersectObjects(Collidables);
		robj = rayright.intersectObjects(Collidables);

};


function SetLight(){
	var light = new THREE.AmbientLight(0x404040);
	scene.add(light);

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
	directionalLight.position.set( 0,4,1 );
	directionalLight.castShadow = true;
	scene.add( directionalLight );
};


function MoveCube(x1,y1,z1){
	controls.getObject().translateZ(cubedata.z_vel);
	controls.getObject().translateX(cubedata.x_vel);
	controls.getObject().position.y=cubedata.y;
}



//rotate Vectors

function rotatevec(vec , angle){
	vector.applyAxisAngle( axis, angle );
}

function OnMouseDown(event){
	if(!controls.isLocked){
		controls.lock();
	}
}

//Event Listeners:

window.addEventListener("keydown",controller.keyListener);
window.addEventListener("keyup",controller.keyListener);
window.addEventListener("mousedown",OnMouseDown,false);
window.requestAnimationFrame(loop);

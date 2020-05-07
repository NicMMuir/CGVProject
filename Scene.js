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


//camerarotation

//cube Vector3

var cubevec = new THREE.Vector3(cubedata.x,cubedata.y,cubedata.z);

//array of intersecting objects
var fobj = new Array();
var bobj= new Array();
var dobj= new Array();
var lobj= new Array();
var robj= new Array();




// ***********************************************************************************************************************
	// This section creates the geometry and material for the different objects
// ***********************************************************************************************************************
var geometry1 = new THREE.BoxGeometry( 20, 0, 20 );
var material1 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide, wireframe: false} );


var geometry2 = new THREE.BoxGeometry( 22, 3, 22 );
var material2 = new THREE.MeshBasicMaterial( { color: 0xFF0000, side: THREE.DoubleSide, wireframe: false } );

// cube1.position.x = 0;
// cube1.position.y = y1;
var geometryC = new THREE.BoxGeometry( 1, 1, 1 );
var materialC = new THREE.MeshBasicMaterial( { color: 0x00ff00 , side: THREE.DoubleSide, wireframe: false} );
cube = new THREE.Mesh( geometryC, materialC );

// -----------------------------------------------------------------------------------------
// Geometry for floor incline/decline( eg floor4/floor2 ):
var geometry3 = [];
	geometry3.push( new THREE.Vector2 ( 0, 3 ) );
	geometry3.push( new THREE.Vector2 ( 5, 3 ) );
	geometry3.push( new THREE.Vector2 ( 15, 2.3 ) );
	geometry3.push( new THREE.Vector2 ( 20, 1.1 ) );
	geometry3.push( new THREE.Vector2 ( 25, 1 ) );
	geometry3.push( new THREE.Vector2 ( 25, 0 ) );
	geometry3.push( new THREE.Vector2 ( 0, 0 ) );

var floorShape = new THREE.Shape( geometry3 );

var extrudeSettings = {
	steps: 2,
	depth: 20,
	bevelEnabled: false,
	bevelThickness: 20,
	bevelSize: 1,
	bevelOffset: 0,
	bevelSegments: 1
}

var floorGeometry = new THREE.ExtrudeGeometry( floorShape, extrudeSettings );

// ===============================================================================================

// -----------------------------------------------------------------------------------------
// Geometry and material for cubic log in path:
var geometry4 = new THREE.BoxGeometry( 20, 3, 3 );
var material4 = new THREE.MeshBasicMaterial( { color: 0xFF00ff, side: THREE.DoubleSide, wireframe: false } );
// ===============================================================================================

// -----------------------------------------------------------------------------------------
// Geometry for staircase incline/decline:
var geometry5 = [];
	geometry5.push( new THREE.Vector2 ( 0,0 ) );
	geometry5.push( new THREE.Vector2 ( 0,4 ) );
	geometry5.push( new THREE.Vector2 ( 5,4 ) );
	geometry5.push( new THREE.Vector2 ( 5,8 ) );
	geometry5.push( new THREE.Vector2 ( 10,8 ) );
	geometry5.push( new THREE.Vector2 ( 10,12 ) );
	geometry5.push( new THREE.Vector2 ( 15,12 ) );
	geometry5.push( new THREE.Vector2 ( 15,20 ) );
	geometry5.push( new THREE.Vector2 ( 20,20 ) );
	geometry5.push( new THREE.Vector2 ( 20,28 ) );
	geometry5.push( new THREE.Vector2 ( 25,28 ) );
	geometry5.push( new THREE.Vector2 ( 25,36 ) );
	geometry5.push( new THREE.Vector2 ( 30,36 ) );
	geometry5.push( new THREE.Vector2 ( 30,0 ) );

var floorShape2 = new THREE.Shape( geometry5 );

var extrudeSettings = {
	steps: 100,
	depth: 20,
	bevelEnabled: false,
	bevelThickness: 10,
	bevelSize: 1,
	bevelOffset: 0,
	bevelSegments: 10
}

var floorGeometry2 = new THREE.ExtrudeGeometry( floorShape2, extrudeSettings );

// ===============================================================================================

var geometry8 = new THREE.SphereGeometry( 55, 55, 55 );

// -----------------------------------------------------------------------------------------
// Geometry for the finishing podium:
var geometry9 = new THREE.CylinderGeometry( 3, 3, 6, 8 );
var material9 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide, wireframe: false} );
// ===============================================================================================

// -----------------------------------------------------------------------------------------
// wall geometry:
var geometry10 = new THREE.BoxGeometry( 2, 100, 230 );
var material10 = new THREE.MeshBasicMaterial( {color: 0xF4A460, side: THREE.DoubleSide, wireframe: false} );

var geometry12 = new THREE.BoxGeometry( 370, 100, 2 );
var material12 = new THREE.MeshBasicMaterial( {color: 0xF4A460, side: THREE.DoubleSide, wireframe: false} );
// ===============================================================================================

// -----------------------------------------------------------------------------------------
// Geometry for wall curve to the right( left wall ):
var geometry11 = [];
	geometry11.push( new THREE.Vector2 ( 0, 0 ) );
	geometry11.push( new THREE.Vector2 ( 0,10 ) );
	geometry11.push( new THREE.Vector2 ( 4,21 ) );
	geometry11.push( new THREE.Vector2 ( 13,38 ) );
	geometry11.push( new THREE.Vector2 ( 32,50 ) );
	geometry11.push( new THREE.Vector2 ( 42,50 ) );
	geometry11.push( new THREE.Vector2 ( 42,52 ) );
	geometry11.push( new THREE.Vector2 ( -2,52 ) );
	geometry11.push( new THREE.Vector2 ( -2,0 ) );

var wallShape = new THREE.Shape( geometry11 );

var wallSettings = {
	steps: 2,
	depth: 40,
	bevelEnabled: false,
	bevelThickness: 20,
	bevelSize: 1,
	bevelOffset: 0,
	bevelSegments: 1
}

var wallGeometry = new THREE.ExtrudeGeometry( wallShape, wallSettings );

// ===============================================================================================

// -----------------------------------------------------------------------------------------
// Geometry for wall curve to the right( Right wall ):
var geometry13 = [];
	geometry13.push( new THREE.Vector2 ( 0, 0 ) );
	geometry13.push( new THREE.Vector2 ( 0,10 ) );
	geometry13.push( new THREE.Vector2 ( 8,25 ) );
	geometry13.push( new THREE.Vector2 ( 17,30 ) );
	geometry13.push( new THREE.Vector2 ( 22,30 ) );
	geometry13.push( new THREE.Vector2 ( 22,28 ) );
	geometry13.push( new THREE.Vector2 ( 2,0 ) );

var wallShape2 = new THREE.Shape( geometry13 );

var wallSettings = {
	steps: 2,
	depth: 40,
	bevelEnabled: false,
	bevelThickness: 20,
	bevelSize: 1,
	bevelOffset: 0,
	bevelSegments: 1
}

var wallGeometry2 = new THREE.ExtrudeGeometry( wallShape2, wallSettings );

// ===============================================================================================









// ***********************************************************************************************************************
	// This section Meshes the geometry and material together
// ***********************************************************************************************************************
var floor1 = new THREE.Mesh( geometry1, material1 );
var floor2 = new THREE.Mesh( floorGeometry, material2 );
var floor3 = new THREE.Mesh( geometry1, material2 );
var cubicLog1 = new THREE.Mesh( geometry4, material4 );
var floor4 = new THREE.Mesh( floorGeometry, material2 );
var floor5 = new THREE.Mesh( geometry1, material2 );
var floor6 = new THREE.Mesh( geometry1, material2 );
var floor7 = new THREE.Mesh( floorGeometry, material2 );
var floor8 = new THREE.Mesh( floorGeometry2, material1 );
var floor9 = new THREE.Mesh( geometry1, material2 );
var cubicLog2 = new THREE.Mesh( geometry4, material4 );
var floor10 = new THREE.Mesh( geometry1, material2 );
var floor11 = new THREE.Mesh( geometry1, material2 );
var floor12 = new THREE.Mesh( geometry1, material2 );
var floor13 = new THREE.Mesh( geometry1, material2 );
var floor14 = new THREE.Mesh( floorGeometry, material2 );
var floor15 = new THREE.Mesh( floorGeometry, material2 );
var floor16 = new THREE.Mesh( geometry1, material2 );
var cubicLog3 = new THREE.Mesh( geometry4, material4 );
var floor17 = new THREE.Mesh( floorGeometry, material2 );
var floor18 = new THREE.Mesh( geometry8, material2 );
var floor19 = new THREE.Mesh( floorGeometry, material2 );
var floor20 = new THREE.Mesh( geometry1, material2 );
var cubicLog4 = new THREE.Mesh( geometry4, material4 );
var floor21 = new THREE.Mesh( geometry1, material2 );
var floor22 = new THREE.Mesh( floorGeometry, material2 );
var floor23 = new THREE.Mesh( geometry1, material2 );
var floor24 = new THREE.Mesh( geometry1, material2 );
var floor25 = new THREE.Mesh( floorGeometry, material2 );
var floor26 = new THREE.Mesh( geometry1, material2 );
var floor27 = new THREE.Mesh( floorGeometry, material2 );
var floor28 = new THREE.Mesh( geometry1, material2 );
var podium = new THREE.Mesh( geometry9, material9 );
var wall1 = new THREE.Mesh( geometry10, material10 );
var wall2 = new THREE.Mesh( geometry10, material10 );
var wall3 = new THREE.Mesh( wallGeometry, material10 );
var wall4 = new THREE.Mesh( geometry12, material12 );
var wall5 = new THREE.Mesh( geometry12, material12 );
var wall6 = new THREE.Mesh( geometry12, material12 );
var wall7 = new THREE.Mesh( geometry12, material12 );
var wall8 = new THREE.Mesh( wallGeometry2, material10 );









init();

function init(){
	scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer();

	camera.position.set(0,15,30);//(0,15,30)

	camera.lookAt(0, 0, 0);
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement );

	// ***********************************************************************************************************************
	// Here we simply position the floor
// ***********************************************************************************************************************
	floor2.position.x = -10;
	floor2.position.y = -2.5;
	floor2.position.z = -10;
	floor2.rotation.set(0, Math.PI/2, 0);
	floor3.position.y = -2.5;
	floor3.position.z = -50;
	cubicLog1.position.y = -1;
	cubicLog1.position.z = -50;
	floor4.position.y = -2.5;
	floor4.position.x = 10;
	floor4.position.z = -90;
	floor4.rotation.set(0, -Math.PI/2, 0);
	floor5.position.z = -105;
	floor6.position.z = -130;
	floor7.position.x = 10;
	floor7.position.z = -170;
	floor7.rotation.set(0, -Math.PI/2, 0);
	floor8.position.x = -10;
	floor8.position.y = 2;
	floor8.position.z = -160;
	floor8.rotation.set(0, Math.PI/2, 0);
	floor9.position.y = 38;
	floor9.position.z = -195;
	cubicLog2.position.y = 39;
	cubicLog2.position.z = -205;
	floor10.position.y = 38;
	floor10.position.z = -215;
	floor11.position.x = 7;
	floor11.position.y = 38;
	floor11.position.z = -240;
	floor11.rotation.set(0, -Math.PI/6, 0);
	floor12.position.x = 18;
	floor12.position.y = 38;
	floor12.position.z = -250;
	floor12.rotation.set(0, -Math.PI/3, 0);
	floor13.position.x = 32;
	floor13.position.y = 38;
	floor13.position.z = -255;
	floor14.position.x = 42;
	floor14.position.y = 35.5;
	floor14.position.z = -265;
	floor15.position.x = 97;
	floor15.position.y = 35.5;
	floor15.position.z = -245;
	floor15.rotation.set(0, Math.PI, 0);
	floor16.position.x = 115;
	floor16.position.y = 37;
	floor16.position.z = -255;
	cubicLog3.position.x = 115;
	cubicLog3.position.y = 39;
	cubicLog3.position.z = -255;
	cubicLog3.rotation.set(0, Math.PI/2, 0);
	floor17.position.x = 160;
	floor17.position.y = 36;
	floor17.position.z = -246;
	floor17.rotation.set(0, Math.PI, 0);
	floor18.position.x = 180;
	floor18.position.y = -12;
	floor18.position.z = -256;
	floor19.position.x = 200;
	floor19.position.y = 36;
	floor19.position.z = -266;
	floor20.position.x = 245;
	floor20.position.y = 38;
	floor20.position.z = -255;
	cubicLog4.position.x = 265;
	cubicLog4.position.y = 37;
	cubicLog4.position.z = -255;
	floor21.position.x = 285;
	floor21.position.y = 38;
	floor21.position.z = -255;
	floor22.position.x = 330;
	floor22.position.y = 36;
	floor22.position.z = -246;
	floor22.rotation.set(0, Math.PI, 0);
	floor23.position.x = 340;
	floor23.position.y = 38.5;
	floor23.position.z = -255;
	floor24.position.x = 340;
	floor24.position.y = 38.5;
	floor24.position.z = -275;
	floor25.position.x = 330;
	floor25.position.y = 36;
	floor25.position.z = -266;
	floor25.rotation.set(0, Math.PI, 0);
	floor26.position.x = 297;
	floor26.position.y = 37;
	floor26.position.z = -275;
	floor27.position.x = 380;
	floor27.position.y = 38;
	floor27.position.z = -246;
	floor27.rotation.set(0, Math.PI, 0);
	floor28.position.x = 390;
	floor28.position.y = 40.5;
	floor28.position.z = -255;
	podium.position.x = 390;
	podium.position.y = 42;
	podium.position.z = -255;
	wall1.position.x = 10;
	wall1.position.y = 20;
	wall1.position.z = -102;
	wall2.position.x = -10;
	wall2.position.y = 20;
	wall2.position.z = -100;
	wall3.position.x = -9;
	wall3.position.y = 28;
	wall3.position.z = -214;
	wall3.rotation.set(-Math.PI/2, 0, 0);
	wall4.position.x = 215;
	wall4.position.y = 28;
	wall4.position.z = -245;
	wall5.position.x = 135;
	wall5.position.y = 28;
	wall5.position.z = -265;
	wall6.position.x = 300;
	wall6.position.y = 28;
	wall6.position.z = -285;
	wall7.position.x = 535;
	wall7.position.y = 28;
	wall7.position.z = -265;
	wall8.position.x = 9;
	wall8.position.y = 28;
	wall8.position.z = -216;
	wall8.rotation.set(-Math.PI/2, 0, 0);


	
	

// ***********************************************************************************************************************
	// Adding the objects to the scene
// ***********************************************************************************************************************
	scene.add( floor1 );
	scene.add( floor2 );
	scene.add( floor3 );
	scene.add( cubicLog1 );
	scene.add( floor4 );
	scene.add( floor5 );
	scene.add( floor6 );
	scene.add( floor7 );
	scene.add( floor8 );
	scene.add( floor9 );
	scene.add( cubicLog2 );
	scene.add( floor10 );
	scene.add( floor11 );
	scene.add( floor12 );
	scene.add( floor13 );
	scene.add( floor14 );
	scene.add( floor15 );
	scene.add( floor16 );
	scene.add( cubicLog3 );
	scene.add( floor17 );
	scene.add( floor18 );
	scene.add( floor19 );
	scene.add( floor20 );
	scene.add( cubicLog4 );
	scene.add( floor21 );
	scene.add( floor22 );
	scene.add( floor23 );
	scene.add( floor24 );
	scene.add( floor25 );
	scene.add( floor26 );
	scene.add( floor27 );
	scene.add( floor28 );
	scene.add( podium );
	scene.add( wall1 );
	scene.add( wall2 );
	scene.add( wall3 );
	scene.add( wall4 );
	scene.add( wall5 );
	scene.add( wall6 );
	scene.add( wall7 );
	scene.add( wall8 );

	// ***********************************************************************************************************************
	// Here we allow objects to take a solid form
// ***********************************************************************************************************************
	Colidables.push(floor1);
	Colidables.push(floor2);
	Colidables.push(floor3);
	Colidables.push(cubicLog1);
	Colidables.push(floor4);
	Colidables.push(floor5);
	Colidables.push(floor6);
	Colidables.push(floor7);
	Colidables.push(floor8);
	Colidables.push(floor9);
	Colidables.push(cubicLog2);
	Colidables.push(floor10);
	Colidables.push(floor11);
	Colidables.push(floor12);
	Colidables.push(floor13);
	Colidables.push(floor14);
	Colidables.push(floor15);
	Colidables.push(floor16);
	Colidables.push(cubicLog2);
	Colidables.push(floor17);
	Colidables.push(floor18);
	Colidables.push(floor19);
	Colidables.push(floor20);
	Colidables.push(cubicLog4);
	Colidables.push(floor21);
	Colidables.push(floor22);
	Colidables.push(floor23);
	Colidables.push(floor24);
	Colidables.push(floor25);
	Colidables.push(floor26);
	Colidables.push(floor27);
	Colidables.push(floor28);
	Colidables.push(podium);
	Colidables.push(wall1);
	Colidables.push(wall2);
	Colidables.push(wall3);
	Colidables.push(wall4);
	Colidables.push(wall5);
	Colidables.push(wall6);
	Colidables.push(wall7);
	Colidables.push(wall8);
	
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
		cubedata.y_vel +=6;//(6)
		cubedata.jump = true;
	}

	if(controller.left){
		cubedata.x_vel -=0.04;//(0.04)
	}
	if(controller.right){
		cubedata.x_vel +=0.04;//(0.04)
	}
	if(controller.forward){
		cubedata.z_vel -=0.04;//(0.04)
	}
	if(controller.back){
		cubedata.z_vel +=0.04;//(0.04)
	}

	cubedata.y_vel -=0.3;//gravity(0.3)_
	cubedata.x += cubedata.x_vel;
	cubedata.z += cubedata.z_vel;
	cubedata.y += cubedata.y_vel;
	cubedata.x_vel *= 0.9;//friction(0.9)
	cubedata.y_vel *= 0.9;//friction(0.9)
	cubedata.z_vel *= 0.9;//friction(0.9)

	//colision detection
	// if(cubedata.y < 1){
	// 	cubedata.jump = false;
	// 	cubedata.y = 1;
	// 	cubedata.t_vel = 0;
	// }

	// down collis
	//console.log(fobj);
	  //fall through map
	if(cubedata.y<-50){//(-50)//Distance cube falls before it restarts
		//restart at this position:
		cubedata.x=0
		cubedata.y=2//(2)
		cubedata.z=0
	}
	if(cubedata.y<1.2){//(1.2)
		cubedata.jump = false;
	}
	if(cubedata.jump != true && dobj.length != 0){
	if(dobj[0].distance <= 1.5){
		cubedata.jump = false;
		cubedata.y = dobj[0].point.y+0.5;//(0.5)Could this be it?
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
	//mouserotate.update();
	movecam();
	render();
  window.requestAnimationFrame(loop);

}

function colisiondetection(cube){
		cubevec.set(cubedata.x,cubedata.y,cubedata.z);
		//raycaster.set(pos , direc);
		rayforward.set(cubevec , vecforward);
		raybackward.set(cubevec , vecbackward);
		raydown.set(cubevec , vecdown);
		rayleft.set(cubevec , vecleft);
		rayright.set(cubevec , vecright);
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

function movecam(){
	//move the camera with the cube
	camera.position.set(cubedata.x,cubedata.y+15,cubedata.z+15);//(cubedata.x,cubedata.y+15,cubedata.z+15)(340,130,-240)
}


//Event Listeners:

window.addEventListener("keydown",controller.keyListener);
window.addEventListener("keyup",controller.keyListener);
window.requestAnimationFrame(loop);

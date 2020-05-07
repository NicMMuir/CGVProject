//Quick notes:
//ground with height differencr of 1 will act as a stair

var scene, camera,raycamera, renderer, loop,cube,cubedata,controller;
var Colidables = [];
var distanceprev;
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

//Textures
//Textures
var texture = new THREE.TextureLoader().load( 'Textures/pebble.jpg' );
var texture2 = new THREE.TextureLoader().load( 'Textures/wood.jpg' );
var texture3 = new THREE.TextureLoader().load( 'Textures/brick.jpg' );
var texture4 = new THREE.TextureLoader().load( 'Textures/steel.jpg' );
var texture5 = new THREE.TextureLoader().load( 'Textures/start.jpg' );

var geometry1 = new THREE.BoxGeometry( 20, 1, 20 );
var material1 = new THREE.MeshBasicMaterial( {map: texture5, side: THREE.DoubleSide} );



var geometry2 = new THREE.BoxGeometry( 22, 3, 22 );
var material2 = new THREE.MeshBasicMaterial( { map: texture } );

// cube1.position.x = 0;
// cube1.position.y = y1;
var geometryC = new THREE.BoxGeometry( 1, 1, 1 );
var materialC = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
cube = new THREE.Mesh( geometryC, materialC );

var geometry3 = new THREE.BoxGeometry( 22, 3, 3 );
var material3 = new THREE.MeshBasicMaterial( { map: texture3 } );

var geometry4 = new THREE.BoxGeometry( 22, 3, 10 );
var material4 = new THREE.MeshBasicMaterial( { map: texture4 } );

var geometry5 = new THREE.BoxGeometry( 22, 3, 5 );
var material5 = new THREE.MeshBasicMaterial( { map: texture2 } );

var geometry6 = new THREE.BoxGeometry( 7, 3, 5 );
var material6 = new THREE.MeshBasicMaterial( { map: texture3 } );

var geometry7 = new THREE.BoxGeometry( 14, 3, 5 );

var geometry8 = new THREE.CircleGeometry( 10, 10, 10 );

var floor1 = new THREE.Mesh( geometry1, material1 );
var floor2 = new THREE.Mesh( geometry2, material2 );
var floor3 = new THREE.Mesh( geometry2, material2 );
var floor4 = new THREE.Mesh( geometry2, material2 );
var floor5 = new THREE.Mesh( geometry2, material2 );
var cubicLog1 = new THREE.Mesh( geometry3, material3 );
var floor6 = new THREE.Mesh( geometry4, material4 );
var floor7 = new THREE.Mesh( geometry4, material4 );
//Steps begin:
var floor8 = new THREE.Mesh( geometry5, material5 );
var floor9 = new THREE.Mesh( geometry5, material5 );
var floor10 = new THREE.Mesh( geometry5, material5 );
var floor11 = new THREE.Mesh( geometry6, material6 );
var floor12 = new THREE.Mesh( geometry6, material6 );
var floor13 = new THREE.Mesh( geometry5, material5 );
var floor14 = new THREE.Mesh( geometry5, material5 );
var floor15 = new THREE.Mesh( geometry5, material5 );
var floor16 = new THREE.Mesh( geometry7, material6 );
var floor17 = new THREE.Mesh( geometry5, material5 );
var floor18 = new THREE.Mesh( geometry5, material5 );
var floor19 = new THREE.Mesh( geometry7, material6 );
var floor20 = new THREE.Mesh( geometry5, material5 );
//Steps end
var floor21 = new THREE.Mesh( geometry2, material2 );
var cubicLog2 = new THREE.Mesh( geometry3, material3 );
var floor22 = new THREE.Mesh( geometry2, material2 );
var floor23 = new THREE.Mesh( geometry2, material2 );
var floor24 = new THREE.Mesh( geometry2, material2 );
var cubicLog3 = new THREE.Mesh( geometry3, material3 );
var floor25 = new THREE.Mesh( geometry8, material2 );




init();

function init(){
	scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer();

	camera.position.set(0,25,30);

	camera.lookAt(0,0,0);
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement );
	floor2.position.y = -2;
	floor2.position.z = -20;
	floor3.position.x = -20;
	floor4.position.x = +20;
	floor5.position.z = -45;
	floor5.position.y = -2;
	cubicLog1.position.z = -40;
	floor6.position.y = -4;
	floor6.position.z = -65;
	floor7.position.y = -4;
	floor7.position.z = -85;
	floor8.position.y = -2;
	floor8.position.z = -90;
	floor9.position.y = 1;
	floor9.position.z = -95;
	floor10.position.y = 4;
	floor10.position.z = -100;
	floor11.position.x = 7.5;
	floor11.position.y = 7;
	floor11.position.z = -100;
	floor12.position.x = -7.5;
	floor12.position.y = 7;
	floor12.position.z = -100;
	floor13.position.y = 7;
	floor13.position.z = -105;
	floor14.position.y = 10;
	floor14.position.z = -105;
	floor15.position.y = 13;
	floor15.position.z = -110;
	floor16.position.x = 4;
	floor16.position.y = 16;
	floor16.position.z = -110;
	floor17.position.y = 16;
	floor17.position.z = -115;
	floor18.position.y = 19;
	floor18.position.z = -115;
	floor19.position.x = -4;
	floor19.position.y = 22;
	floor19.position.z = -115;
	floor20.position.y = 22;
	floor20.position.z = -120;
	floor21.position.y = 25;
	floor21.position.z = -128;
	cubicLog2.position.y = 28;
	cubicLog2.position.z = -128;
	floor22.position.x = 7;
	floor22.position.y = 25;
	floor22.position.z = -158;
	floor22.rotation.set(0, -Math.PI / 6, 0);
	floor23.position.x = 22;
	floor23.position.y = 25;
	floor23.position.z = -180;
	floor23.rotation.set(0, -40, 0);
	floor24.position.x = 40;
	floor24.position.y = 25;
	floor24.position.z = -200;
	floor24.rotation.set(0, -40, 0);
	cubicLog3.position.x = 40;
	cubicLog3.position.y = 28;
	cubicLog3.position.z = -200;
	cubicLog3.rotation.set(0,40, 0);
	floor25.position.x = 55;
	floor25.position.y = 25;
	floor25.position.z = -200;


	scene.add( floor1 );
	scene.add( floor2 );
	scene.add( floor3 );
	scene.add( floor4 );
	scene.add( floor5 );
	scene.add( cubicLog1 );
	scene.add( floor6 );
	scene.add( floor7 );
	scene.add( floor8 );
	scene.add( floor9 );
	scene.add( floor10 );
	scene.add( floor11 );
	scene.add( floor12 );
	scene.add( floor13 );
	scene.add( floor14 );
	scene.add( floor15 );
	scene.add( floor16 );
	scene.add( floor17 );
	scene.add( floor18 );
	scene.add( floor19 );
	scene.add( floor20 );
	scene.add( floor21 );
	scene.add( cubicLog2 );
	scene.add( floor22 );
	scene.add( floor23 );
	scene.add( floor24 );
	scene.add( cubicLog3 );
	scene.add( floor25 );
	Colidables.push(floor1);
	Colidables.push(floor2);
	Colidables.push(floor3);
	Colidables.push(floor4);
	Colidables.push(floor5);
	Colidables.push(cubicLog1);
	Colidables.push(floor6);
	Colidables.push(floor7);
	Colidables.push(floor8);
	Colidables.push(floor9);
	Colidables.push(floor10);
	Colidables.push(floor11);
	Colidables.push(floor12);
	Colidables.push(floor13);
	Colidables.push(floor14);
	Colidables.push(floor15);
	Colidables.push(floor16);
	Colidables.push(floor17);
	Colidables.push(floor19);
	Colidables.push(floor20);
	Colidables.push(floor21);
	Colidables.push(cubicLog2);
	Colidables.push(floor22);
	Colidables.push(floor23);
	Colidables.push(floor24);
	Colidables.push(cubicLog3);
	Colidables.push(floor25);
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
	distanceprev = cubedata.y;
	GenCube(cubedata.x,cubedata.y,cubedata.z);
	colisiondetection(cube);
	if(controller.up && cubedata.jump == false){
		cubedata.y_vel +=10;
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
		fobj = rayforward.intersectObjects(Colidables);
		bobj = raybackward.intersectObjects(Colidables);
		dobj = raydown.intersectObjects(Colidables);
		lobj = rayleft.intersectObjects(Colidables);
		robj = rayright.intersectObjects(Colidables);

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
	camera.position.set(cubedata.x,cubedata.y+15,cubedata.z+30);
}


//Event Listeners:

window.addEventListener("keydown",controller.keyListener);
window.addEventListener("keyup",controller.keyListener);
window.requestAnimationFrame(loop);

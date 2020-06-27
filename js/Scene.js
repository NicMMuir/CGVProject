//Quick notes:
//ground with height difference of 1 will act as a stair

//Heightmap
//orbital controls
var scene, camera,raycamera,renderer,loop,char,chardata,controller;
var mesh, material, clock, TWEEN;
var Collidables = [];
var spinToplist3 = [];
var spinTop1, spinTop2, spinTop3, spinTop4, spinTop5, spinTop6, spinTop7, spinTop8, spinTop9;
var mapCamera, mapWidth = 360, mapHeight = 200; // w/h should match div dimensions
var directionalLight;

var PauseState = false;

var DeathCounter = -1.;
var PointsCounter = 0;

var CoinCounter = 0;
var RubyCounter = 0;

var RPosList = [];
var RubyArr = [];
var CPosList = [];
var CoinArr = [];

var Direction = new THREE.Vector3();
var YDirection = new THREE.Vector3(0,1,0);

//Variables for speeds and distances etc
var distanceprev;
var frame = 0;
var xSpeed = 0.5;
var zSpeed = 0.5;
var ySpeed = 0;
var camstartx = 0;
var camstarty = 15;
var camstartz = 30;
var charstartx = -1955;
var charstarty = 300;
var charstartz = 1060;

//character data for jump and y height aswell as spawn position etc
chardata = {
	jump:true,
	x_vel:0,
	y_vel:0,
	z_vel:0,
	x:-1955,
	y:300,
	z:1060,
	rotationy:0
};
var character = new THREE.Object3D();

//Vectors

	 //rays in order to check for collisions
	 var forw = new THREE.Vector3(0, 0, -1); //Forward
	 var backw  = new THREE.Vector3(0,0,1); //back
	 var left = new THREE.Vector3(-1,0,0); //Left
	 var right = new THREE.Vector3(1,0,0); //Right
	 var downw = new THREE.Vector3(0, -1, 0); //Down

//raycasting
var rayforward = new THREE.Raycaster();
var raybackward = new THREE.Raycaster();
var raydown = new THREE.Raycaster();
var rayleft = new THREE.Raycaster();
var rayright = new THREE.Raycaster();

//Scene and camear etc
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 9000 );

renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.soft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

camera.position.set(camstartx,camstarty,camstartz);
//camera.lookAt(chardata.x,chardata.y,chardata.z);
camera.updateProjectionMatrix();
controls = new THREE.PointerLockControls(camera);

// orthographic cameras
	mapCamera = new THREE.OrthographicCamera(
    -2020,		// Left  (-2020)
    190,		// Right (190)
    1010,		// Top (1010)
    -1170,	// Bottom (-1170)
    -5000,            			// Near (-5000)
    10000 );           			// Far (10000)
	mapCamera.up = new THREE.Vector3(0,0,-1);
	mapCamera.lookAt( new THREE.Vector3(0,-1,0) );
	scene.add(mapCamera);

var time;


//char Vector3 another way to holde currect characters position in a vector
var charvec = new THREE.Vector3(chardata.x,chardata.y,chardata.z);


var fobj = new Array();
var bobj= new Array();
var dobj= new Array();
var lobj= new Array();
var robj= new Array();
var tp = new THREE.Vector3();



init();
//to initialise the map and objects for the initial render(only called once)
function init(){

	clock = new THREE.Clock();

	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement );

	getarrMap1();
	Charinit(charstartx,charstarty,charstartz);

	 RPosList = gerrubyl3();
	 RubyArr = genruby(RPosList);
	 CPosList = getcoinl3();
	 CoinArr = gencoin(CPosList);
	 CurvyMap3();
	 SpinTopMap3();
	 //console.log(RPosList);


	for(let k =0 ;k<ObjectsMap1Arr.length;k++){
		scene.add(ObjectsMap1Arr[k] );
		Collidables.push(ObjectsMap1Arr[k]);
	}
	bgmmusic();
	// SetLight();
	controls.getObject().position.x = charstartx;
	controls.getObject().position.y = charstarty;
	controls.getObject().position.z = charstart;

	// Traverse each mesh and add shadows:
	scene.traverse (function (node){
  if (node instanceof THREE.Mesh){
    node.castShadow = true;
    node.receiveShadow = true;
  }
  });


}

//animate and render work hand in hand for rendering specific things
function animate() {
				requestAnimationFrame( animate );
				var time = Date.now() * 0.0005;
				var delta = clock.getDelta();
				mixer.update( delta );
				TWEEN.update();

				directionalLight.position.x = Math.sin( time / 13) * 2000 - 890;
				directionalLight.position.z = Math.cos( time / 13) * 2000 + 380;
				
				skybox.rotation.x += 0.002;
				skybox.rotation.y += 0.001;
				skybox.rotation.z += 0.003;

				//EVENTS (Allows game to scale when screen size is changed)
				THREEx.WindowResize(renderer, camera);

				render();
			}


function render(){

	var w = window.innerWidth, h = window.innerHeight;

	// setViewport parameters:
	//  lower_left_x, lower_left_y, viewport_width, viewport_height
	renderer.setViewport( 0, 0, w, h );
	renderer.clear();

	// full display
	// renderer.setViewport( 0, 0, SCREEN_WIDTH - 2, 0.5 * SCREEN_HEIGHT - 2 );
	renderer.render( scene, camera );

	// minimap (overhead orthogonal camera)
	//  lower_left_x, lower_left_y, viewport_width, viewport_height
	renderer.setViewport( 10, h - mapHeight - 10, mapWidth, mapHeight );
	renderer.render( scene, mapCamera );

	// renderer.setSize( window.innerWidth, window.innerHeight );
	// renderer.setClearColor( 0x000000, 1 );
	renderer.autoClear = false;

	mushRender(mush_e1,-1860,955,35,35);
	mushRender(mush_e2,-1730,940,35,35);
	mushRender(mush_e3,-1662,1030,35,35);
	mushRender(mush_e4,-300,-527,390,390);

	spikesRender_y1(trapm3_1,300,85);
	spikesRender_y2(trapm3_2,300,85);
	spikesRender_y3(trapm3_3,300,85);

	if (spinTop1) spinTop1.rotation.y += 0.05;
	if (spinTop2) spinTop2.rotation.y += 0.05;
	if (spinTop3) spinTop3.rotation.y += 0.05;
	if (spinTop4) spinTop4.rotation.y += 0.05;
	if (spinTop5) spinTop5.rotation.y += 0.05;
	if (spinTop6) spinTop6.rotation.y += 0.05;
	if (spinTop7) spinTop7.rotation.y += 0.05;
	if (spinTop8) spinTop8.rotation.y += 0.05;
	if (spinTop9) spinTop9.rotation.y += 0.05;

	mushRender_zp1(mush_e5,890,200);
	mushRender_zp2(mush_e6,890,215);
	mushRender_zp3(mush_e7,890,215);
	mushRender_zp3(mush_e8,890,215);

	mushRender_zn1(mush_e9,1116,215);
	mushRender_zn2(mush_e10,1116,215);
	mushRender_zn3(mush_e11,1116,215);

};


controller = {
		forward:false,
		back:false,
		left:false,
		right:false,
		up:false,
		forwardUP: true,
		//fowardUP: true,
			keyListener:function(event){
				//var keystateUP = (event.type == "keyup")?true:false;

				var keystate = (event.type == "keydown")?true:false;
				switch (event.keyCode){
					case 87://the "W" key is pressed
							controller.forward = keystate;
							// console.log("Character has just moved forward...");

							//controller.fowardUP = keystateUP;
							action.play();
							//action.stop();
						break;
					case 83://the "S" key is pressed
							controller.back = keystate;
						break;
					case 65://the "A" key is pressed
							controller.left = keystate;
						break;
					case 68://the "D" key is pressed
							controller.right = keystate;
						break;
					case 32://the spacebar is pressed
							controller.up = keystate;
						break;
					case 82: //the 'R' key is pressed
							window.location.assign("index.html");
						break;
					case 70: //the 'F' key is pressed
					// First person view
							camera.position.set(0, 4, -3);
						break;
					case 84: //the 'T' key is pressed
					// Third person view
							camera.position.set(camstartx,camstarty,camstartz);
						break;
				}

				if (controller.forward == false){
					action.stop();
				}

			}
}




loop = function(){

	checkruby();
	checkcoin();

	time = clock.getElapsedTime() * 5;

			 for(let k = 0;k<CoinArr.length;k++){
				 CoinArr[k].rotateY(0.01);
			 }
			 for(let k = 0;k<RubyArr.length;k++){
				 RubyArr[k].rotateY(0.01);
			 }

 // onRender();


	distanceprev = chardata.y;
	colisiondetection(controls.getObject());
	if(controller.up && chardata.jump == false){

		//must be a mutiple of the gravity
		chardata.y_vel +=8;
		chardata.jump = true;

		//Rotate Char 360° when jumping in TPV
		var charRotation = new TWEEN.Tween(CharacterBuild.rotation)
        .to({ x: "-" + 2*Math.PI}, 2000) // relative animation
        .delay(500)
        charRotation.start();

        if (camera.position.x == 0 && camera.position.y == 4 && camera.position.z == -3){
        	//Rotate camera in FPV 360° when jumping
			var charRotation = new TWEEN.Tween(camera.rotation)
	        .to({ x: "-" + 2*Math.PI}, 2000) // relative animation
	        .delay(500)
	        charRotation.start();
        }
	}

	if(controller.left){
		// char.rotation.y-=0.04;
		// chardata.rotationy -= 0.04
		chardata.x_vel -=0.3;
	}
	if(controller.right){
		chardata.x_vel +=0.3;
		// char.rotation.y +=0.04;
		// chardata.rotationy += 0.04
	}
	if(controller.forward){
		chardata.z_vel -=0.2;//0.12
		action.play(); //need to figure out how controller event listener processes 'keyup' events to call action.stop() when 'W' is released

	}
	if(controller.back){
		chardata.z_vel +=0.3;
	}
	// if (!controller.forward){
	// 	act.enabled = false;
	// }

	chardata.y_vel -=0.4;//gravity(0.4)
	chardata.y += chardata.y_vel;
	chardata.x_vel *= 0.8;//friction
	chardata.y_vel *= 0.8;//friction
	chardata.z_vel *= 0.9;//friction




	/////////////////////Normal collisions
if(dobj.length != 0){
	if(dobj[0].distance>3){
		chardata.jump = true;
	}
	if(chardata.jump == true && dobj[0].distance<3 && distanceprev>chardata.y){
			chardata.jump = false;
	}
}
	if(chardata.y<-20){
		genSound();
		DeathCounter= DeathCounter+1;
		chardata.x=-1955;
		chardata.y=300;
		chardata.z=1060;
		chardata.jump = false;
		controls.getObject().position.set(charstartx,charstarty,charstartz);
	}
	if(chardata.jump == false && dobj.length != 0){
		chardata.jump = false;
		chardata.y = dobj[0].point.y+0.2;
}
	//forward collisions
	if(fobj.length != 0){
		if(fobj[0].distance < 2){
			chardata.jump = true;
			if(chardata.z_vel > 0){
				chardata.z_vel = chardata.z_vel*-1;
			}
			controls.getObject().position.z = fobj[0].point.z+2.2;
		}
	}
	//back collisions
	if(bobj.length != 0){
		if(bobj[0].distance < 2){
			chardata.jump = true;
			if(chardata.z_vel < 0){
				chardata.z_vel = chardata.z_vel*-1;
			}
			controls.getObject().position.z = bobj[0].point.z-2.2;
		}
	}
	//left collisions
	if(lobj.length != 0){
		if(lobj[0].distance < 2){
			chardata.jump = true;
			if(chardata.x_vel > 0){
				chardata.x_vel = 0;
			}
			controls.getObject().position.x = lobj[0].point.x+2.2;
		}
	}
	//right collisions
	if(robj.length != 0){
		if(robj[0].distance < 2){
			chardata.jump = true;
			if(chardata.x_vel < 0){
				chardata.x_vel = 0;
			}
			controls.getObject().position.x = robj[0].point.x-2.1;
		}
	}
/////////enemy collisions for each direction
if(efobj.length != 0){
	if(efobj[0].distance < 2){
		genSound();
		DeathCounter= DeathCounter+1;
		chardata.x=-1955;
		chardata.y=300;
		chardata.z=1060;
		chardata.jump = false;
		controls.getObject().position.set(charstartx,charstarty,charstartz);
	}
}else if(ebobj.length != 0){
	if(ebobj[0].distance < 1.5){
		genSound();
		DeathCounter= DeathCounter+1;
		chardata.x=-1955;
		chardata.y=300;
		chardata.z=1060;
		chardata.jump = false;
		controls.getObject().position.set(charstartx,charstarty,charstartz);
	}
}else if(elobj.length != 0){
	if(elobj[0].distance < 1.5){
		genSound();
		DeathCounter= DeathCounter+1;
		chardata.x=-1955;
		chardata.y=300;
		chardata.z=1060;
		chardata.jump = false;
		controls.getObject().position.set(charstartx,charstarty,charstartz);
	}
}else if(erobj.length != 0){
	if(erobj[0].distance < 1.5){
		genSound();
		DeathCounter= DeathCounter+1;
		chardata.x=-1955;
		chardata.y=300;
		chardata.z=1060;
		chardata.z_vel = 0;
		chardata.x_vel = 0;
		chardata.jump = false;
		controls.getObject().position.set(charstartx,charstarty,charstartz);
		}
	}

	//end of the level is reached when this block is touched
	{
	if((controls.getObject().position.x <= (End.position.x+11) && controls.getObject().position.x >= (End.position.x-11) && controls.getObject().position.z >= End.position.z-11 && controls.getObject().position.z <= End.position.z+11)&& PointsCounter == 0){

		document.getElementById('menu').style.visibility = 'visible';
		document.getElementById('winlose').innerText = "TRY AGAIN";
		document.getElementById('scorecard').innerText = "Score: " + PointsCounter;
		document.getElementById('deathcount').innerText = "Deaths: " + DeathCounter;
		document.getElementById('coincount').innerText = "Coins: " + CoinCounter + " / " + CoinArr.length;
		document.getElementById('rubycount').innerText = "Rubies: " + RubyCounter + " / " + RubyArr.length;
		
		//wait seven seconds and then route back to main menu
		window.setTimeout(function()
		{
			window.location.assign("index.html");
		},
		 7000);
			}

	else if((controls.getObject().position.x <= (End.position.x+11) && controls.getObject().position.x >= (End.position.x-11) && controls.getObject().position.z >= End.position.z-11 && controls.getObject().position.z <= End.position.z+11)&& PointsCounter >= 1){

		document.getElementById('menu').style.visibility = 'visible';
		document.getElementById('winlose').innerText = "YOU WIN";
		document.getElementById('scorecard').innerText = "Score: " + PointsCounter;
		document.getElementById('deathcount').innerText = "Deaths: " + DeathCounter;
		document.getElementById('coincount').innerText = "Coins: " + CoinCounter + " / " + CoinArr.length;
		document.getElementById('rubycount').innerText = "Rubies: " + RubyCounter + " / " + RubyArr.length;
		
		//wait seven seconds and then route back to main menu
		window.setTimeout(function()
		{
			window.location.assign("index.html");
		},
		 7000);
			}
	}

	Movechar(chardata.x,chardata.y,chardata.z);
	render();
  window.requestAnimationFrame(loop);
}


function colisiondetection(char){
		charvec.set(controls.getObject().position.x,controls.getObject().position.y,controls.getObject().position.z);
		//raycaster.set(pos , direc);
		rayforward.set(charvec , forw);//farward
		raybackward.set(charvec , backw);//back
		raydown.set(charvec , downw);//down
		rayleft.set(charvec , left);//left
		rayright.set(charvec , right);//right
		//.intersectObjects ( objects : Array, recursive : Boolean, optionalTarget : Array ) : Array

		//arrays of all collidable objects in a specific direction
		fobj = rayforward.intersectObjects(Collidables,true);
		bobj = raybackward.intersectObjects(Collidables,true);
		dobj = raydown.intersectObjects(Collidables,true);
		lobj = rayleft.intersectObjects(Collidables,true);
		robj = rayright.intersectObjects(Collidables,true);
		//arrays of all collidable objects in a specific direction
		efobj = rayforward.intersectObjects(EnemyList,true);
		ebobj = raybackward.intersectObjects(EnemyList,true);
		edobj = raydown.intersectObjects(EnemyList,true);
		elobj = rayleft.intersectObjects(EnemyList,true);
		erobj = rayright.intersectObjects(EnemyList,true);
};

//Sets Custom lights; NOT USED!!! LIGHTS SET IN NEWMAP3.JS!!!
// function SetLight(){
// 	var light = new THREE.AmbientLight(0x404040);
// 	scene.add(light);

// 	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
// 	directionalLight.position.set( 0,4,1 );
// 	directionalLight.castShadow = true;

// 	scene.add( directionalLight );
// };

//Move Character
function Movechar(x1,y1,z1){
	controls.getObject().translateZ(chardata.z_vel);
	controls.getObject().translateX(chardata.x_vel);
	controls.getObject().position.y=chardata.y;
}


//Locks Mouse to screen
function OnMouseDown(event){
	if(!controls.isLocked){
		controls.lock();
	}
}
///Checks collisions with each Ruby
function checkruby(){
	for(let k = 0 ; k< RubyArr.length;k++){
		if((controls.getObject().position.x <= (RPosList[k].x+2) && controls.getObject().position.x >= (RPosList[k].x-2) && controls.getObject().position.z >= RPosList[k].z-2 && controls.getObject().position.z <= RPosList[k].z+2)&& scene.getObjectById(RubyArr[k].id,true) != null ){
			PointsCounter = PointsCounter+5;
			RubyCounter += 1;
			genaudio();
			scene.remove(RubyArr[k]);

		}
	}
}

///Checks collisions with each coin
function checkcoin(){
	for(let k = 0 ; k< CoinArr.length;k++){
		if((controls.getObject().position.x <= (CPosList[k].x+2) && controls.getObject().position.x >= (CPosList[k].x-2) && controls.getObject().position.z >= CPosList[k].z-2 && controls.getObject().position.z <= CPosList[k].z+2)&& scene.getObjectById(CoinArr[k].id,true) != null){
			PointsCounter = PointsCounter+1;
			CoinCounter += 1;
			genaudio();
			scene.remove(CoinArr[k]);

		}
	}
}

//Used with loading screen
function onTransitionEnd( event ) {

	const element = event.target;
	element.remove();

}

//Event Listeners:
window.addEventListener("keydown",controller.keyListener);
window.addEventListener("keyup",controller.keyListener);
window.addEventListener("mousedown",OnMouseDown,false);
window.requestAnimationFrame(loop);

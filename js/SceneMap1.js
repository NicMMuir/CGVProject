//Quick notes:
//ground with height differencr of 1 will act as a stair

//Heightmap
//orbital controls

var scene, camera,raycamera,loop,char,chardata,controller;
var mesh, oceanGeometry, material, clock;
var Collidables = [];
var curveEnemy;
var renderer, renderer2;
var sunDirectionalLight, moonDirectionalLight;
var CharacterBuild;


var mixer, mixer1, mixer2, TWEEN;
//Orthographic map:
var mapCamera, mapWidth = 240, mapHeight = 160; // w/h should match div dimensions

var PauseState = false;

var DeathCounter = -1;
var PointsCounter = 0;

var CoinCounter = 0;
var RubyCounter = 0;

var RPosList = [];
var RubyArr = [];
var CPosList = [];
var CoinArr = [];

var Direction = new THREE.Vector3();
var YDirection = new THREE.Vector3(0,1,0);

var distanceprev;
var frame = 0;
var xSpeed = 0.5;
var zSpeed = 0;
var ySpeed = 0;
var camstartx = 0;
var camstarty = 15;
var camstartz = 30;

var camstartFPx = 0;
var camstartFPy = 3;
var camstartFPz = -3;

var charstartx = 0;
var charstarty = 6;
var charstartz = 0;

chardata = {
	jump:true,
	x_vel:0,
	y_vel:6,
	z_vel:0,
	y:6,
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
camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 5000 );

renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.soft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


camera.position.set(camstartx,camstarty,camstartz);
//camera.lookAt(chardata.x,chardata.y,chardata.z);
camera.updateProjectionMatrix();
controls = new THREE.PointerLockControls(camera);


//////////////////////////////////////////////////////////////////////////



// orthographic cameras
	mapCamera = new THREE.OrthographicCamera(
    -520,		// Left (-520)
    520,		// Right (520)
    650,		// Top (650)
    -130,	// Bottom (-130)
    -5000,            			// Near (-5000)
    10000 );           			// Far (10000)
	mapCamera.up = new THREE.Vector3(0,0,-1);
	mapCamera.lookAt( new THREE.Vector3(0,-1,0) );
	scene.add(mapCamera);

var position;//Ocean moveement
var time;

//char Vector3
var charvec = new THREE.Vector3(chardata.x,chardata.y,chardata.z);

var fobj = new Array();
var bobj= new Array();
var dobj= new Array();
var lobj= new Array();
var robj= new Array();
var tp = new THREE.Vector3();


//to play music after loading
audioplay = false;


init();


function init(){

	clock = new THREE.Clock();

	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement );

	//Renderer2 renders the orthographic camera
	renderer2 = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer2.shadowMap.enabled = true;
	renderer2.shadowMap.soft = true;
	renderer2.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer2.setPixelRatio( window.devicePixelRatio );
	renderer2.setSize( window.innerWidth, window.innerHeight );
	renderer2.domElement.style.position = 'absolute';
	renderer2.domElement.style.top = 0;
	renderer2.domElement.style.zIndex = '0.5';
	document.body.appendChild( renderer2.domElement );

	CurvyMap1(); //This funct contains all the curvedEnemy data from Curvy.js
	getarrMap1();
	Charinit(charstartx,charstarty,charstartz);

	   RPosList = gerrubyl1();
	// }
	 RubyArr = genruby(RPosList);
	// for(let k = 0;k<5;k++){
	// 	 tp = new THREE.Vector3(-10*k,5,10*k);
	    CPosList = getcoinl1();
	// }
	CoinArr = gencoin(CPosList);
	 //console.log(RPosList);

	for(let k =0 ;k<ObjectsMap1Arr.length;k++){
		scene.add(ObjectsMap1Arr[k] );
		Collidables.push(ObjectsMap1Arr[k]);
	}
	bgmmusic();
	// SetLight();


  scene.traverse (function (node){
  if (node instanceof THREE.Mesh){
    node.castShadow = true;
    node.receiveShadow = true;
  }
  });

}

function animate() {
				requestAnimationFrame( animate );
				TWEEN.update();
				var delta = clock.getDelta();
				mixer1.update( delta*3 ); //Waterfall Model (clouds)
				mixer.update( delta*2 ); //Shark Model
				sphereCamera.update(renderer,scene);

				//Rotating sun & moon motion:
    			var time = Date.now() * 0.0005;

				sunDirectionalLight.position.x = Math.sin( time / -30) * 1000;
				sunDirectionalLight.position.y = Math.cos( time / -30) * 1000;
				moonDirectionalLight.position.x = - Math.sin( time / 30) * 1000 ;
				moonDirectionalLight.position.y = - Math.cos( time / 30) * 1000 - 300;


	//EVENTS (Allows game to scale when screen size is changed)

	THREEx.WindowResize(renderer, camera);
	THREEx.WindowResize(renderer2, mapCamera);



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
	renderer2.setViewport( 10, h - mapHeight - 10, mapWidth, mapHeight );
	renderer2.render( scene, mapCamera );

	// renderer.setSize( window.innerWidth, window.innerHeight );
	// renderer.setClearColor( 0x000000, 1 );
	renderer2.autoClear = false;

			spikesRender_z1(trap1,-150,40);
			spikesRender_z2(trap_2,-413,43);

			pillRender(p_e1,0,45,60,15);
			pillRender(p_e2,200,105,80,65);
			pillRender(p_e3,-200,-155,35,40);
			pillRender(p_e4,-200,105,80,65);
			pillRender(p_e5,-300,-260,35,40);

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

				position = oceanGeometry.attributes.position;

			 for ( let i = 0; i < position.count; i ++ ) {

				 var y = 5 * Math.sin( i / 5 + ( time + i ) / 7 );
				 position.setY( i, y );

			 }
			 for(let k = 0;k<CoinArr.length;k++){
				 CoinArr[k].rotateY(0.01);
			 }
			 for(let k = 0;k<RubyArr.length;k++){
				 RubyArr[k].rotateY(0.01);
			 }

			 position.needsUpdate = true;
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
		chardata.x=0;
		chardata.y=6;
		chardata.z=0;
		chardata.jump = false;
		controls.getObject().position.set(charstartx,charstarty,charstartz);
		//camera.lookAt(0,0,0);
	}
	if(chardata.jump == false && dobj.length != 0){
		chardata.jump = false;
		chardata.y = dobj[0].point.y+0.2;
}
	//forward collis
	if(fobj.length != 0){
		if(fobj[0].distance < 2){
			chardata.jump = true;
			if(chardata.z_vel > 0){
				chardata.z_vel = chardata.z_vel*-1;
			}
			controls.getObject().position.z = fobj[0].point.z+2.2;
		}
	}
	if(bobj.length != 0){
		if(bobj[0].distance < 2){
			chardata.jump = true;
			if(chardata.z_vel < 0){
				chardata.z_vel = chardata.z_vel*-1;
			}
			controls.getObject().position.z = bobj[0].point.z-2.2;
		}
	}
	if(lobj.length != 0){
		if(lobj[0].distance < 2){
			chardata.jump = true;
			if(chardata.x_vel > 0){
				chardata.x_vel = 0;
			}
			controls.getObject().position.x = lobj[0].point.x+2.2;
		}
	}
	if(robj.length != 0){
		if(robj[0].distance < 2){
			chardata.jump = true;
			if(chardata.x_vel < 0){
				chardata.x_vel = 0;
			}
			controls.getObject().position.x = robj[0].point.x-2.1;
		}
	}
/////////enemy ccollisions

if(efobj.length != 0){
	if(efobj[0].distance < 1.5){
		genSound();
		DeathCounter= DeathCounter+1;
		chardata.x=0;
		chardata.y=2;
		chardata.z=0;
		chardata.jump = false;
		controls.getObject().position.set(charstartx,charstarty,charstartz);
	}
}
if(ebobj.length != 0){
	if(ebobj[0].distance < 1.5){
		genSound();
		DeathCounter= DeathCounter+1;
		chardata.x=0;
		chardata.y=2;
		chardata.z=0;
		chardata.jump = false;
		controls.getObject().position.set(charstartx,charstarty,charstartz);
	}
}
if(elobj.length != 0){
	if(elobj[0].distance < 1.5){
		genSound();
		DeathCounter= DeathCounter+1;
		chardata.x=0;
		chardata.y=2;
		chardata.z=0;
		chardata.jump = false;
		controls.getObject().position.set(charstartx,charstarty,charstartz);
	}
}
if(erobj.length != 0){
	if(erobj[0].distance < 1.5){
		genSound();
		DeathCounter= DeathCounter+1;
		chardata.x=0;
		chardata.y=2;
		chardata.z=0;
		chardata.z_vel = 0;
		chardata.x_vel = 0;
		chardata.jump = false;
		controls.getObject().position.set(charstartx,charstarty,charstartz);
		}
	}//end of the level is reached when this block is touched
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
		fobj = rayforward.intersectObjects(Collidables,true);
		bobj = raybackward.intersectObjects(Collidables,true);
		dobj = raydown.intersectObjects(Collidables,true);
		lobj = rayleft.intersectObjects(Collidables,true);
		robj = rayright.intersectObjects(Collidables,true);

		efobj = rayforward.intersectObjects(EnemyList,true);
		ebobj = raybackward.intersectObjects(EnemyList,true);
		edobj = raydown.intersectObjects(EnemyList,true);
		elobj = rayleft.intersectObjects(EnemyList,true);
		erobj = rayright.intersectObjects(EnemyList,true);
};


// function SetLight(){ Not used!!! Light set in NewMap1.js!!!
// 	var light = new THREE.AmbientLight(0x404040);
// 	scene.add(light);

// 	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
// 	directionalLight.position.set( 0,4,1 );
// 	directionalLight.castShadow = false;

// 	scene.add( directionalLight );
// };


function Movechar(x1,y1,z1){
	controls.getObject().translateZ(chardata.z_vel);
	controls.getObject().translateX(chardata.x_vel);
	controls.getObject().position.y=chardata.y;
	//
}

function OnMouseDown(event){
	if(!controls.isLocked){
		controls.lock();
	}
}

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

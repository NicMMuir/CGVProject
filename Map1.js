var ObjectsArr = [];

//Textures
var texture = new THREE.TextureLoader().load( 'Textures/pebble.jpg' );
var texture2 = new THREE.TextureLoader().load( 'Textures/wood.jpg' );
var texture3 = new THREE.TextureLoader().load( 'Textures/brick.jpg' );
var texture4 = new THREE.TextureLoader().load( 'Textures/steel.jpg' );
var texture5 = new THREE.TextureLoader().load( 'Textures/start.jpg' );
var texture6 = new THREE.TextureLoader().load( 'Textures/ladder.jpg' );

var material1 = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
var material2 = new THREE.MeshBasicMaterial( { map: texture2, polygonOffset: true, polygonOffsetUnits: 1,
polygonOffsetFactor: 1 } );
var material3 = new THREE.MeshBasicMaterial( { map: texture3, side: THREE.DoubleSide, wireframe: false } );
var material4 = new THREE.MeshBasicMaterial( { map: texture4 } );
var material5 = new THREE.MeshBasicMaterial( { map: texture5 } );
var material6 = new THREE.MeshBasicMaterial( { map: texture6 } );


// ***********************************************************************************************************************
	// This section creates the geometry and material for the different objects
// ***********************************************************************************************************************
var geometry1 = new THREE.BoxGeometry( 25, 20, 25 );
var geometry2 = new THREE.BoxGeometry( 22, 3, 22 );
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
	depth: 25,
	bevelEnabled: false,
	bevelThickness: 10,
	bevelSize: 1,
	bevelOffset: 0,
	bevelSegments: 1
}

var floorGeometry = new THREE.ExtrudeGeometry( floorShape, extrudeSettings );

// ===============================================================================================
// -----------------------------------------------------------------------------------------
// Geometry and material for cubic log in path:
var geometry4 = new THREE.BoxGeometry( 20, 3, 3 );
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

var geometry8 = new THREE.SphereGeometry( 55, 55, 55, 0, Math.PI);

// -----------------------------------------------------------------------------------------
// Geometry for the finishing podium:
var geometry9 = new THREE.CylinderGeometry( 3, 3, 6, 8 );
// ===============================================================================================

// -----------------------------------------------------------------------------------------
// wall geometry:
var geometry10 = new THREE.BoxGeometry( 1, 100, 240 );
var geometry12 = new THREE.BoxGeometry( 370, 100, 1 );
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
var geometry14 = new THREE.BoxGeometry( 5, 4, 5 );//Blocks on the staircase
var geometry15 = new THREE.BoxGeometry( 12, 4, 5 );//Blocks on the staircase
var geometry16 = new THREE.CylinderGeometry( 11,11,100,8,1,true,0,Math.PI );//CylinderGeometry to close the end of map




// ***********************************************************************************************************************
	// This section Meshes the geometry and material together
// ***********************************************************************************************************************
var floor1 = new THREE.Mesh( geometry1, material1 );
var floor2 = new THREE.Mesh( floorGeometry, material1 );
var floor3 = new THREE.Mesh( geometry1, material1 );
var cubicLog1 = new THREE.Mesh( geometry4, material2 );
var floor4 = new THREE.Mesh( floorGeometry, material1 );
var floor5 = new THREE.Mesh( geometry1, material1 );
var floor6 = new THREE.Mesh( geometry1, material1 );
var floor7 = new THREE.Mesh( floorGeometry, material1 );
var floor8 = new THREE.Mesh( floorGeometry2, material2 );
var floor9 = new THREE.Mesh( geometry1, material1 );
var cubicLog2 = new THREE.Mesh( geometry4, material2 );
var floor10 = new THREE.Mesh( geometry1, material1 );
var floor11 = new THREE.Mesh( geometry1, material1 );
var floor12 = new THREE.Mesh( geometry1, material1 );
var floor13 = new THREE.Mesh( geometry1, material1 );
var floor14 = new THREE.Mesh( floorGeometry, material1 );
var floor15 = new THREE.Mesh( floorGeometry, material1 );
var floor16 = new THREE.Mesh( geometry1, material1 );
var floor17 = new THREE.Mesh( floorGeometry, material1 );
var floor19 = new THREE.Mesh( floorGeometry, material1 );
var floor20 = new THREE.Mesh( geometry1, material1 );
var cubicLog4 = new THREE.Mesh( geometry4, material4 );
var floor21 = new THREE.Mesh( geometry1, material1 );
var floor22 = new THREE.Mesh( floorGeometry, material1 );
var floor23 = new THREE.Mesh( geometry1, material1 );
var floor24 = new THREE.Mesh( geometry1, material1 );
var floor25 = new THREE.Mesh( floorGeometry, material1 );
var floor26 = new THREE.Mesh( geometry1, material1 );
var floor27 = new THREE.Mesh( floorGeometry, material1 );
var floor28 = new THREE.Mesh( geometry1, material1 );
var floor29 = new THREE.Mesh( geometry14, material3 );//Blocks on the staircase
var floor30 = new THREE.Mesh( geometry14, material3 );//Blocks on the staircase
var floor31 = new THREE.Mesh( geometry15, material3 );//Blocks on the staircase
var floor32 = new THREE.Mesh( geometry15, material3 );//Blocks on the staircase
var podium = new THREE.Mesh( geometry9, material5 );
var wall1 = new THREE.Mesh( geometry10, material3 );
var wall2 = new THREE.Mesh( geometry10, material3 );
var wall3 = new THREE.Mesh( wallGeometry, material3 );//Left wall that curves
var wall4 = new THREE.Mesh( geometry12, material3 );
var wall5 = new THREE.Mesh( geometry12, material3 );
var wall6 = new THREE.Mesh( geometry12, material3 );
var wall7 = new THREE.Mesh( geometry12, material3 );
var wall8 = new THREE.Mesh( wallGeometry2, material3 );//wall that curves, right wall
var wall9 = new THREE.Mesh( geometry10, material3 );
var wall10 = new THREE.Mesh( geometry16, material3 );
var wall11 = new THREE.Mesh( geometry16, material3 );


function genarr(){
  ObjectsArr.push(floor1);
  ObjectsArr.push(floor2);
  ObjectsArr.push(floor3);
  ObjectsArr.push(cubicLog1);
  ObjectsArr.push(floor4);
  ObjectsArr.push(floor5);
  ObjectsArr.push(floor6);
  ObjectsArr.push(floor7);
  ObjectsArr.push(floor8);
  ObjectsArr.push(floor9);
  ObjectsArr.push(cubicLog2);
  ObjectsArr.push(floor10);
  ObjectsArr.push(floor11);
  ObjectsArr.push(floor12);
  ObjectsArr.push(floor13);
  ObjectsArr.push(floor14);
  ObjectsArr.push(floor15);
  ObjectsArr.push(floor16);
  ObjectsArr.push(floor17);
  ObjectsArr.push(floor19);
  ObjectsArr.push(floor20);
  ObjectsArr.push(cubicLog4);
  ObjectsArr.push(floor21);
  ObjectsArr.push(floor22);
  ObjectsArr.push(floor23);
  ObjectsArr.push(floor24);
  ObjectsArr.push(floor25);
  ObjectsArr.push(floor26);
  ObjectsArr.push(floor27);
  ObjectsArr.push(floor28);
  ObjectsArr.push(floor29);
  ObjectsArr.push(floor30);
  ObjectsArr.push(floor31);
  ObjectsArr.push(floor32);
  ObjectsArr.push(podium);
  ObjectsArr.push(wall1);
  ObjectsArr.push(wall2);
  ObjectsArr.push(wall3);
  ObjectsArr.push(wall4);
  ObjectsArr.push(wall5);
  ObjectsArr.push(wall6);
  ObjectsArr.push(wall7);
  ObjectsArr.push(wall8);
  ObjectsArr.push(wall9);
  ObjectsArr.push(wall10);
  ObjectsArr.push(wall11);
}

function moveobjects(){
  	floor1.position.y = -8;
  	floor2.position.x = -10;
	floor2.position.y = -1.2;
	floor2.position.z = -10;
	floor2.rotation.set(0, Math.PI/2, 0);
	floor3.position.y = -10.5;
	floor3.position.z = -52.5;
	cubicLog1.position.z = -50;
	floor4.position.y = -2.5;
	floor4.position.x = 10;
	floor4.position.z = -95;
	floor4.rotation.set(0, -Math.PI/2, 0);
	floor5.position.y = -8.5;
	floor5.position.z = -115;
	floor6.position.y = -8.5;
	floor6.position.z = -145;
	floor7.position.x = 10;
	floor7.position.z = -185;
	floor7.rotation.set(0, -Math.PI/2, 0);
	floor8.position.x = -10;//floor8 = Staircase
	floor8.position.y = 2;
	floor8.position.z = -185;
	floor8.rotation.set(0, Math.PI/2, 0);
	floor9.position.y = 28;
	floor9.position.z = -223;
	cubicLog2.position.y = 38;
	cubicLog2.position.z = -235;
	floor10.position.y = 28;
	floor10.position.z = -247;//-215
	floor11.position.x = 7;
	floor11.position.y = 28;
	floor11.position.z = -277;//-240
	floor11.rotation.set(0, -Math.PI/6, 0);
	floor12.position.x = 18;
	floor12.position.y = 28;
	floor12.position.z = -285;
	floor12.rotation.set(0, -Math.PI/3, 0);
	floor13.position.x = 32;
	floor13.position.y = 28;
	floor13.position.z = -288.5;
	floor14.position.x = 50;
	floor14.position.y = 35.5;
	floor14.position.z = -298.5;
	floor15.position.x = 105;
	floor15.position.y = 35.5;
	floor15.position.z = -278.5;
	floor15.rotation.set(0, Math.PI, 0);
	floor16.position.x = 125;
	floor16.position.y = 28;
	floor16.position.z = -288.5;
	floor17.position.x = 168;
	floor17.position.y = 37;
	floor17.position.z = -278.5;
	floor17.rotation.set(0, Math.PI, 0);
	floor19.position.x = 167;
	floor19.position.y = 37;
	floor19.position.z = -298.5;
	floor20.position.x = 210;
	floor20.position.y = 28;
	floor20.position.z = -288.5;
	cubicLog4.position.x = 232.5;
	cubicLog4.position.y = 36.5;
	cubicLog4.position.z = -288.5;
	floor21.position.x = 255;
	floor21.position.y = 28;
	floor21.position.z = -288.5;
	floor22.position.x = 298;
	floor22.position.y = 38;
	floor22.position.z = -278.5;
	floor22.rotation.set(0, Math.PI, 0);
	floor23.position.x = 310;
	floor23.position.y = 31;
	floor23.position.z = -288.5;
	floor24.position.x = 310;
	floor24.position.y = 30;
	floor24.position.z = -312;
	floor25.position.x = 298;
	floor25.position.y = 37;
	floor25.position.z = -298.5;
	floor25.rotation.set(0, Math.PI, 0);
	floor26.position.x = 262;
	floor26.position.y = 28;
	floor26.position.z = -312;
	floor27.position.x = 355;
	floor27.position.y = 41;
	floor27.position.z = -278.5;
	floor27.rotation.set(0, Math.PI, 0);
	floor28.position.x = 366;//Final floor
	floor28.position.y = 34;
	floor28.position.z = -288.5;
	floor29.position.x = -7;//Block on the staircase
	floor29.position.y = 16;
	floor29.position.z = -198;
	floor30.position.x = 7;//Block on the staircase
	floor30.position.y = 16;
	floor30.position.z = -198;
	floor31.position.x = -4;//Block on the staircase
	floor31.position.y = 24;
	floor31.position.z = -202.5;
	floor32.position.x = 4;//Block on the staircase
	floor32.position.y = 32;
	floor32.position.z = -207.5;
	podium.position.x = 366;
	podium.position.y = 43;
	podium.position.z = -288.5;
	wall1.position.x = 10;
	wall1.position.y = 20;
	wall1.position.z = -130;
	wall2.position.x = -10;
	wall2.position.y = 20;
	wall2.position.z = -130;
	wall3.position.x = -9;//Left wall that curves
	wall3.position.y = 28;
	wall3.position.z = -249;
	wall3.rotation.set(-Math.PI/2, 0, 0);
	wall4.position.x = 215;
	wall4.position.y = 28;
	wall4.position.z = -278;
	wall5.position.x = 120;
	wall5.position.y = 28;
	wall5.position.z = -299;
	wall6.position.x = 300;
	wall6.position.y = 28;
	wall6.position.z = -322;
	wall7.position.x = 507.5;
	wall7.position.y = 28;
	wall7.position.z = -299;
	wall8.position.x = 9;//right wall that curves
	wall8.position.y = 28;
	wall8.position.z = -248.5;
	wall8.rotation.set(-Math.PI/2, 0, 0);
	wall9.position.x = 263;
	wall9.position.y = 28.5;
	wall9.position.z = -402.6;
	wall9.rotation.set( 0, Math.PI/6, 0 );
	wall10.position.x = 366;//End wall for end of map
	wall10.position.y = 34;
	wall10.position.z = -288.5;
	wall11.position.x = 262;//End wall for secret passage
	wall11.position.y = 28;
	wall11.position.z = -310;//-275
	wall11.rotation.set( 0, Math.PI, 0 );
}

function getarr(){
  moveobjects();
  genarr();
}
var ObjectsArr = [];

//Textures
var texture = new THREE.TextureLoader().load( 'Textures/pebble.jpg' );
var texture2 = new THREE.TextureLoader().load( 'Textures/wood.jpg' );
var texture3 = new THREE.TextureLoader().load( 'Textures/brick.jpg' );
var texture4 = new THREE.TextureLoader().load( 'Textures/steel.jpg' );
var texture5 = new THREE.TextureLoader().load( 'Textures/start.jpg' );
var texture6 = new THREE.TextureLoader().load( 'Textures/ladder.jpg' );
var SeaSandTexture = new THREE.TextureLoader().load( 'Textures/SeaSand.jpg' );

var material1 = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
var material2 = new THREE.MeshBasicMaterial( { map: texture2, polygonOffset: true, polygonOffsetUnits: 1,
polygonOffsetFactor: 1 } );
var material3 = new THREE.MeshBasicMaterial( { map: texture3, side: THREE.DoubleSide, wireframe: false } );
var material4 = new THREE.MeshBasicMaterial( { map: texture4 } );
var material5 = new THREE.MeshBasicMaterial( { map: texture5 } );
var material6 = new THREE.MeshBasicMaterial( { map: texture6 } );
var SeaSandMat = new THREE.MeshBasicMaterial( { map: SeaSandTexture } );


// // ***********************************************************************************************************************
// 	// This section creates the geometry and material for the different objects
// // ***********************************************************************************************************************
// var geometry1 = new THREE.BoxGeometry( 25, 20, 25 );
// var geometry2 = new THREE.BoxGeometry( 22, 3, 22 );
// // -----------------------------------------------------------------------------------------
// // Geometry for floor incline/decline( eg floor4/floor2 ):
// var geometry3 = [];
// 	geometry3.push( new THREE.Vector2 ( 0, 3 ) );
// 	geometry3.push( new THREE.Vector2 ( 5, 3 ) );
// 	geometry3.push( new THREE.Vector2 ( 15, 2.3 ) );
// 	geometry3.push( new THREE.Vector2 ( 20, 1.1 ) );
// 	geometry3.push( new THREE.Vector2 ( 25, 1 ) );
// 	geometry3.push( new THREE.Vector2 ( 25, 0 ) );
// 	geometry3.push( new THREE.Vector2 ( 0, 0 ) );

// var floorShape = new THREE.Shape( geometry3 );

// var extrudeSettings = {
// 	steps: 2,
// 	depth: 25,
// 	bevelEnabled: false,
// 	bevelThickness: 10,
// 	bevelSize: 1,
// 	bevelOffset: 0,
// 	bevelSegments: 1
// }

// var floorGeometry = new THREE.ExtrudeGeometry( floorShape, extrudeSettings );

// // ===============================================================================================
// // -----------------------------------------------------------------------------------------
// // Geometry and material for cubic log in path:
// var geometry4 = new THREE.BoxGeometry( 20, 3, 3 );
// // ===============================================================================================
// // -----------------------------------------------------------------------------------------
// // Geometry for staircase incline/decline:
// var geometry5 = [];
// 	geometry5.push( new THREE.Vector2 ( 0,0 ) );
// 	geometry5.push( new THREE.Vector2 ( 0,4 ) );
// 	geometry5.push( new THREE.Vector2 ( 5,4 ) );
// 	geometry5.push( new THREE.Vector2 ( 5,8 ) );
// 	geometry5.push( new THREE.Vector2 ( 10,8 ) );
// 	geometry5.push( new THREE.Vector2 ( 10,12 ) );
// 	geometry5.push( new THREE.Vector2 ( 15,12 ) );
// 	geometry5.push( new THREE.Vector2 ( 15,20 ) );
// 	geometry5.push( new THREE.Vector2 ( 20,20 ) );
// 	geometry5.push( new THREE.Vector2 ( 20,28 ) );
// 	geometry5.push( new THREE.Vector2 ( 25,28 ) );
// 	geometry5.push( new THREE.Vector2 ( 25,36 ) );
// 	geometry5.push( new THREE.Vector2 ( 30,36 ) );
// 	geometry5.push( new THREE.Vector2 ( 30,0 ) );

// var floorShape2 = new THREE.Shape( geometry5 );

// var extrudeSettings = {
// 	steps: 100,
// 	depth: 20,
// 	bevelEnabled: false,
// 	bevelThickness: 10,
// 	bevelSize: 1,
// 	bevelOffset: 0,
// 	bevelSegments: 10
// }

// var floorGeometry2 = new THREE.ExtrudeGeometry( floorShape2, extrudeSettings );

// // ===============================================================================================

// var geometry8 = new THREE.SphereGeometry( 55, 55, 55, 0, Math.PI);

// // -----------------------------------------------------------------------------------------
// // Geometry for the finishing podium:
// var geometry9 = new THREE.CylinderGeometry( 3, 3, 6, 8 );
// // ===============================================================================================

// // -----------------------------------------------------------------------------------------
// // wall geometry:
// var geometry10 = new THREE.BoxGeometry( 1, 100, 240 );
// var geometry12 = new THREE.BoxGeometry( 370, 100, 1 );
// // ===============================================================================================

// // -----------------------------------------------------------------------------------------
// // Geometry for wall curve to the right( left wall ):
// var geometry11 = [];
// 	geometry11.push( new THREE.Vector2 ( 0, 0 ) );
// 	geometry11.push( new THREE.Vector2 ( 0,10 ) );
// 	geometry11.push( new THREE.Vector2 ( 4,21 ) );
// 	geometry11.push( new THREE.Vector2 ( 13,38 ) );
// 	geometry11.push( new THREE.Vector2 ( 32,50 ) );
// 	geometry11.push( new THREE.Vector2 ( 42,50 ) );
// 	geometry11.push( new THREE.Vector2 ( 42,52 ) );
// 	geometry11.push( new THREE.Vector2 ( -2,52 ) );
// 	geometry11.push( new THREE.Vector2 ( -2,0 ) );

// var wallShape = new THREE.Shape( geometry11 );

// var wallSettings = {
// 	steps: 2,
// 	depth: 40,
// 	bevelEnabled: false,
// 	bevelThickness: 20,
// 	bevelSize: 1,
// 	bevelOffset: 0,
// 	bevelSegments: 1
// }

// var wallGeometry = new THREE.ExtrudeGeometry( wallShape, wallSettings );

// // ===============================================================================================

// // -----------------------------------------------------------------------------------------
// // Geometry for wall curve to the right( Right wall ):
// var geometry13 = [];
// 	geometry13.push( new THREE.Vector2 ( 0, 0 ) );
// 	geometry13.push( new THREE.Vector2 ( 0,10 ) );
// 	geometry13.push( new THREE.Vector2 ( 8,25 ) );
// 	geometry13.push( new THREE.Vector2 ( 17,30 ) );
// 	geometry13.push( new THREE.Vector2 ( 22,30 ) );
// 	geometry13.push( new THREE.Vector2 ( 22,28 ) );
// 	geometry13.push( new THREE.Vector2 ( 2,0 ) );

// var wallShape2 = new THREE.Shape( geometry13 );

// var wallSettings = {
// 	steps: 2,
// 	depth: 40,
// 	bevelEnabled: false,
// 	bevelThickness: 20,
// 	bevelSize: 1,
// 	bevelOffset: 0,
// 	bevelSegments: 1
// }

// var wallGeometry2 = new THREE.ExtrudeGeometry( wallShape2, wallSettings );

// // ===============================================================================================
// var geometry14 = new THREE.BoxGeometry( 5, 4, 5 );//Blocks on the staircase
// var geometry15 = new THREE.BoxGeometry( 12, 4, 5 );//Blocks on the staircase
// var geometry16 = new THREE.CylinderGeometry( 11,11,100,8,1,true,0,Math.PI );//CylinderGeometry to close the end of map
// var geometry2000 = new THREE.PlaneGeometry(10, 20,);
// var material2000 = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true });
// var aeroplane = new THREE.Mesh(geometry2000, material2000);













var floorGeometry = new THREE.BoxGeometry( 50, 20, 50 );



//Load SandHill Model
	let loader = new THREE.GLTFLoader();
	loader.load('./SandHill/scene.gltf', function(gltf){
			gltf.scene.position.y = 0;
	gltf.scene.scale.set(10,10,10);

		scene.add(gltf.scene);
		gltf.Collidables(gltf.scene);
	})





// ***********************************************************************************************************************
	// This section Meshes the geometry and material together
// ***********************************************************************************************************************
var floor = new THREE.Mesh( floorGeometry, SeaSandMat );



function genarr(){
	ObjectsArr.push(floor);
  
}

function moveobjects(){
	floor.position.y = -10;

}

function getarr(){
  moveobjects();
  genarr();
}

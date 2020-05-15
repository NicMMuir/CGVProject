var ObjectsMap1Arr = [];

var camera, controls, scene, renderer, stats;
var Mesh, oceanGeometry, oceanMaterial, clock;

//Textures
var MainFloortexture = new THREE.TextureLoader().load( 'Textures/Grass.jpg' );
var MainFloormaterial = new THREE.MeshBasicMaterial( { map: MainFloortexture, side: THREE.DoubleSide } );
var Startpadtexture = new THREE.TextureLoader().load( 'Textures/start.jpg' );
var Startpadmaterial = new THREE.MeshBasicMaterial( { map: Startpadtexture, side: THREE.DoubleSide } );
var waterTexture = new THREE.TextureLoader().load( 'Textures/water.jpg' );
var waterMat = new THREE.MeshBasicMaterial( { map: waterTexture } );



MainFloortexture.wrapS = THREE.RepeatWrapping;
MainFloortexture.wrapT = THREE.RepeatWrapping;
//floor geometries
var startpadgeom = new THREE.BoxGeometry( 5, 2, 5 );

var SouthSegmentgeom = new THREE.BoxGeometry( 1000, 20, 220 );
var NorthEastSegmentgeom = new THREE.BoxGeometry( 220, 20, 220 );
var NorthWestSegmentgeom = new THREE.BoxGeometry( 220, 20, 220 );

var startpad = new THREE.Mesh( startpadgeom, Startpadmaterial );
var SotheSeg = new THREE.Mesh( SouthSegmentgeom , MainFloormaterial );
var NorthEastSeg = new THREE.Mesh( NorthEastSegmentgeom , MainFloormaterial );
var NorthWestSeg = new THREE.Mesh( NorthWestSegmentgeom , MainFloormaterial );


var oceanGeometry = new THREE.PlaneBufferGeometry( 20000, 20000, 128-1, 128-1);
        oceanGeometry.rotateX( - Math.PI / 2 );

        var position = oceanGeometry.attributes.position;
        position.usage = THREE.DynamicDrawUsage;

        for ( var i = 0; i < position.count; i ++ ) {

          var y = 5 * Math.sin( i / 2 );
          position.setY( i, y );

        }

var texture = new THREE.TextureLoader().load( 'textures/water.jpg' );
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 5, 5 );

var oceanMaterial = new THREE.MeshBasicMaterial( { color: 0x0044ff, map: texture } );
var oceanMesh = new THREE.Mesh( oceanGeometry, oceanMaterial );


function genarrMap1(){
  
  ObjectsMap1Arr.push(startpad);
  ObjectsMap1Arr.push(SotheSeg);
  ObjectsMap1Arr.push(NorthEastSeg);
  ObjectsMap1Arr.push(NorthWestSeg);
  ObjectsMap1Arr.push(oceanMesh);
}
function moveobjectsMap1(){
  //startpad.position.y = 2;
  SotheSeg.position.y = -10
  NorthEastSeg.position.y = -10
  NorthWestSeg.position.y = -10



  NorthEastSeg.position.z = -260;
  NorthEastSeg.position.x = 250

  NorthWestSeg.position.z = -260;
  NorthWestSeg.position.x = -250;

  oceanMesh.position.y = -10;
}



function getarrMap1(){
  moveobjectsMap1();
  genarrMap1();
}


//   //Load SandHill Model
//   var loader = new THREE.GLTFLoader();
//   loader.load('./SandHill/scene.gltf', function(gltf){

//     var temp = gltf.scene;
//     // var mesh = temp.children[3];
//       temp.position.x = 20;
//       // ObjectsMap1Arr.push(temp);
//       scene.add(temp);


// })
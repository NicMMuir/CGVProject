var ObjectsMap1Arr = [];

var camera, controls, scene, renderer, stats;
var Mesh, oceanGeometry, oceanMaterial, clock;

//Skybox
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( 'Textures/bay_ft.jpg');
let texture_bk = new THREE.TextureLoader().load( 'Textures/bay_bk.jpg');
let texture_up = new THREE.TextureLoader().load( 'Textures/bay_up.jpg');
let texture_dn = new THREE.TextureLoader().load( 'Textures/bay_dn.jpg');
let texture_rt = new THREE.TextureLoader().load( 'Textures/bay_rt.jpg');
let texture_lf = new THREE.TextureLoader().load( 'Textures/bay_lf.jpg');

materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;

let skyboxGeo = new THREE.BoxGeometry( 700, 700, 700);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );



//Textures
var MainFloortexture = new THREE.TextureLoader().load( 'Textures/Grass.jpg' );
var MainFloormaterial = new THREE.MeshBasicMaterial( { map: MainFloortexture, side: THREE.DoubleSide } );
var Startpadtexture = new THREE.TextureLoader().load( 'Textures/start.jpg' );
var Startpadmaterial = new THREE.MeshBasicMaterial( { map: Startpadtexture, side: THREE.DoubleSide } );
var waterTexture = new THREE.TextureLoader().load( 'Textures/water.jpg' );
var waterMat = new THREE.MeshBasicMaterial( { map: waterTexture } );
var transMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    opacity: 0,
    transparent: true,
  });



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
var NorthSeg = new THREE.Mesh( SouthSegmentgeom , MainFloormaterial );



 oceanGeometry = new THREE.PlaneBufferGeometry( 20000, 20000, 128-1, 128-1);
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

 oceanMaterial = new THREE.MeshBasicMaterial( { color: 0x0044ff, map: texture } );
var oceanMesh = new THREE.Mesh( oceanGeometry, oceanMaterial );


//Load SandHill Model
var sandHill = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/SandHill/scene.gltf', function(gltf){

    sandHill.add(gltf.scene);
    console.log(dumpObject(gltf.scene).join('\n'));
});
}


//Load Short Bridge Model
var rightBridge1 = new THREE.Object3D();
var leftBridge1 = new THREE.Object3D();
var rightBridge2 = new THREE.Object3D();
var leftBridge2 = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/Bridge/scene.gltf', function(gltf){

    var rightWoodBridge1 = gltf.scene;
    rightBridge1.add(rightWoodBridge1);

    var leftWoodBridge1 = gltf.scene.clone();
    leftBridge1.add(leftWoodBridge1);

    var rightWoodBridge2 = gltf.scene.clone();
    rightBridge2.add(rightWoodBridge2);

    var leftWoodBridge2 = gltf.scene.clone();
    leftBridge2.add(leftWoodBridge2);
  });
}

//Load Long Bridge Model
var centreBridge = new THREE.BufferGeometry();
{
var loader = new THREE.GLTFLoader();
loader.load('./3DObjects/LongBridge/scene.gltf', function(gltf){

gltf.scene.traverse( function ( child ) {

    if ( child.isMesh ) {

        //Setting the buffer geometry
        centreBridge = child.geometry;
    }

} );
  gltf.scene.position.x = 0;
  gltf.scene.position.y = -43;
  gltf.scene.position.z = -250;
  gltf.scene.rotation.set(0, Math.PI/2, 0);
  gltf.scene.scale.set(5, 5, 8.5);
  scene.add(gltf.scene);
  console.log(dumpObject(gltf.scene).join('\n'));
});
}


//transparent floor geometry (Goes under the bridge)
var transGeometry = new THREE.BoxGeometry(15,20,45);
var rightTransBox = new THREE.Mesh(transGeometry, transMaterial);
var leftTransBox = new THREE.Mesh(transGeometry, transMaterial);


function genarrMap1(){

  ObjectsMap1Arr.push(startpad);
  ObjectsMap1Arr.push(SotheSeg);
  ObjectsMap1Arr.push(NorthEastSeg);
  ObjectsMap1Arr.push(NorthWestSeg);
  ObjectsMap1Arr.push(NorthSeg);
  ObjectsMap1Arr.push(oceanMesh);
  ObjectsMap1Arr.push(sandHill);
  
  ObjectsMap1Arr.push(rightBridge1);
  ObjectsMap1Arr.push(rightTransBox);

  ObjectsMap1Arr.push(leftBridge1);
  ObjectsMap1Arr.push(leftTransBox);
  // ObjectsMap1Arr.push(glTFGeometry);
  ObjectsMap1Arr.push(rightBridge2);

  ObjectsMap1Arr.push(leftBridge2);


  // ObjectsMap1Arr.push(centreBridge);
  //ObjectsMap1Arr.push(skybox);
  scene.add( skybox );

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

  NorthSeg.position.y = -10;
  NorthSeg.position.z = -520;

  oceanMesh.position.y = -10;
  
  sandHill.position.y = -10;
  sandHill.scale.set(50,50,50);

  rightBridge1.position.x = 200;
  rightBridge1.position.y = -7;
  rightBridge1.position.z = -150;
  rightBridge1.scale.set(0.07,0.07,0.07);

  rightBridge2.position.x = 200;
  rightBridge2.position.y = -7;
  rightBridge2.position.z = -410;
  rightBridge2.scale.set(0.07,0.07,0.07);

  leftBridge1.position.x = -200;
  leftBridge1.position.y = -7;
  leftBridge1.position.z = -150;
  leftBridge1.scale.set(0.07,0.07,0.07);

  leftBridge2.position.x = -200;
  leftBridge2.position.y = -7;
  leftBridge2.position.z = -410;
  leftBridge2.scale.set(0.07,0.07,0.07);
  
  rightTransBox.position.x = 200;
  rightTransBox.position.y = -10;
  rightTransBox.position.z = -130;

  leftTransBox.position.x = -200;
  leftTransBox.position.y = -10;
  leftTransBox.position.z = -130;

  
}


function getarrMap1(){
  moveobjectsMap1();
  genarrMap1();
}

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}
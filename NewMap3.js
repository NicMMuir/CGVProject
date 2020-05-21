var ObjectsMap1Arr = [];
var EnemyList = [];
var End;
var Mesh, oceanGeometry, oceanMaterial, clock;

//Skybox
var enmy = new THREE.Object3D();

let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( 'Textures/sleepyhollow_ft.jpg');
let texture_bk = new THREE.TextureLoader().load( 'Textures/sleepyhollow_bk.jpg');
let texture_up = new THREE.TextureLoader().load( 'Textures/sleepyhollow_up.jpg');
let texture_dn = new THREE.TextureLoader().load( 'Textures/sleepyhollow_dn.jpg');
let texture_rt = new THREE.TextureLoader().load( 'Textures/sleepyhollow_rt.jpg');
let texture_lf = new THREE.TextureLoader().load( 'Textures/sleepyhollow_lf.jpg');

materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;

let skyboxGeo = new THREE.BoxGeometry( 2000, 1000, 2000);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );



//Textures
var MainFloortexture = new THREE.TextureLoader().load( 'Textures/Grass.jpg' );
var GrassMat = new THREE.MeshBasicMaterial( { map: MainFloortexture, side: THREE.DoubleSide } );
var Startpadtexture = new THREE.TextureLoader().load( 'Textures/start.jpg' );
var Startpadmaterial = new THREE.MeshBasicMaterial( { map: Startpadtexture, side: THREE.DoubleSide } );
var waterTexture = new THREE.TextureLoader().load( 'Textures/water.jpg' );
var waterMat = new THREE.MeshBasicMaterial( { map: waterTexture } );
var seaSandTexture = new THREE.TextureLoader().load( 'Textures/seasand.jpg' );
var seaSandMat = new THREE.MeshBasicMaterial( { map: seaSandTexture } );
var colloseumTexture = new THREE.TextureLoader().load( 'Textures/collosWall.jpg' );
var colloseumMat = new THREE.MeshBasicMaterial( { map: colloseumTexture } );



MainFloortexture.wrapS = THREE.RepeatWrapping;
MainFloortexture.wrapT = THREE.RepeatWrapping;
//floor geometries
var endpadgeom = new THREE.BoxGeometry( 10, 10, 10 );
var startpadgeom = new THREE.BoxGeometry( 5, 2, 5 );
var StartFloorGeo = new THREE.BoxGeometry( 1000, 20, 220 );
var middleFloorGeo = new THREE.BoxGeometry( 520, 20, 240 );
var FinalFloorGeo = new THREE.BoxGeometry( 750, 20, 1000 );


//Mesh:
var endpad = new THREE.Mesh( endpadgeom , Startpadmaterial );
var startpad = new THREE.Mesh( startpadgeom, Startpadmaterial );
var StartSeg = new THREE.Mesh( StartFloorGeo , GrassMat );
var middleFloor = new THREE.Mesh( middleFloorGeo , GrassMat );
var FinalFloor = new THREE.Mesh( FinalFloorGeo , seaSandMat );




 oceanGeometry = new THREE.PlaneBufferGeometry( 5000, 5000, 128-1, 128-1);
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

 oceanMaterial = new THREE.MeshBasicMaterial( { color: 0x0055a5, map: texture } );
var oceanMesh = new THREE.Mesh( oceanGeometry, oceanMaterial );

//Load Big Blue Mushroom Tree Model
var mushTree = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/BlueShroom/scene.gltf', function(gltf){

    mushTree.add(gltf.scene);
});
}

//Load Glow Flower Model
var glowFlower1 = new THREE.Object3D();
var glowFlower2 = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/GlowFlower/scene.gltf', function(gltf){
    gltf.scene.scale.set(2,2,2);

    glowFlower1.add(gltf.scene);
    glowFlower2.add(gltf.scene.clone());
});

}//Load Glow Mushroom Model
var glowMush1 = new THREE.Object3D();
var glowMush2 = new THREE.Object3D();
var glowMush3 = new THREE.Object3D();
var glowMush4 = new THREE.Object3D();
var glowMush5 = new THREE.Object3D();
var glowMush6 = new THREE.Object3D();
var glowMush7 = new THREE.Object3D();
var glowMush8 = new THREE.Object3D();
var glowMush9 = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/GlowMushroom/scene.gltf', function(gltf){
    glowMush1.add(gltf.scene);
    glowMush2.add(gltf.scene.clone());
    glowMush3.add(gltf.scene.clone());
    glowMush4.add(gltf.scene.clone());
    glowMush5.add(gltf.scene.clone());
    glowMush6.add(gltf.scene.clone());
    glowMush7.add(gltf.scene.clone());
    glowMush8.add(gltf.scene.clone());
    glowMush9.add(gltf.scene.clone());
});
}

//Load Red Mushroom Model
var redMush1 = new THREE.Object3D();
var redMush2 = new THREE.Object3D();
var redMush3 = new THREE.Object3D();
var redMush4 = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/RedGlowShroom/scene.gltf', function(gltf){

    redMush1.add(gltf.scene);
    redMush2.add(gltf.scene.clone());
    redMush3.add(gltf.scene.clone());
    redMush4.add(gltf.scene.clone());
});
}

//Load Low Poly Bridge Model
var lowPolyBridge1 = new THREE.Object3D();
var lowPolyBridge2 = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/LowPolyBridge/scene.gltf', function(gltf){

    lowPolyBridge1.add(gltf.scene);
    lowPolyBridge2.add(gltf.scene.clone());
});
}

//Load Lavender Model

  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/Lavender/scene.gltf', function(gltf){
  var lavender = gltf.scene;

  lavender.scale.set(0.1,0.1,0.1);
  for(i=900; i<=1120; i += 40){
    for(k=-640; k<-140; k += 40){
      lavender.position.x = k;
    lavender.position.y = 206;
  lavender.position.z = i;
      scene.add(lavender.clone());
    }
  }
});

  //Load Red Mushroom Model
var dragon = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/Dragon/scene.gltf', function(gltf){

    dragon.add(gltf.scene);
        } );
}

  //Load Dragon Egg Model
var dragonEgg1 = new THREE.Object3D();
var dragonEgg2 = new THREE.Object3D();
var dragonEgg3 = new THREE.Object3D();
var dragonEgg4 = new THREE.Object3D();
var dragonEgg5 = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/DragonEgg/scene.gltf', function(gltf){
    gltf.scene.scale.set(0.2,0.2,0.2);
    dragonEgg1.add(gltf.scene);
    dragonEgg2.add(gltf.scene.clone());
    dragonEgg3.add(gltf.scene.clone());
    dragonEgg4.add(gltf.scene.clone());
    dragonEgg5.add(gltf.scene.clone());
        } );
}

 //Load Colloseum Model
var colloseum = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/colloseum/scene.gltf', function(gltf){
    gltf.scene.scale.set(10,10,10);
    colloseum.add(gltf.scene);
        } );
}

//Load Colloseum Pillar Model
var pillar1 = new THREE.Object3D();
var pillar2 = new THREE.Object3D();
var pillar3 = new THREE.Object3D();
var pillar4 = new THREE.Object3D();
var pillar5 = new THREE.Object3D();
var pillar6 = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/Pillar/scene.gltf', function(gltf){
    gltf.scene.scale.set(0.15,0.15,0.15);
    pillar1.add(gltf.scene);
    pillar2.add(gltf.scene.clone());
    pillar3.add(gltf.scene.clone());
    pillar4.add(gltf.scene.clone());
    pillar5.add(gltf.scene.clone());
    pillar6.add(gltf.scene.clone());
        } );
}

//Load Colloseum Pillar Model
var palmTree1 = new THREE.Object3D();
var palmTree2 = new THREE.Object3D();
var palmTree3 = new THREE.Object3D();
var palmTree4 = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/PalmTree/scene.gltf', function(gltf){
    gltf.scene.scale.set(25,25,25);
    palmTree1.add(gltf.scene);
    palmTree2.add(gltf.scene.clone());
    palmTree3.add(gltf.scene.clone());
    palmTree4.add(gltf.scene.clone());
        } );
}

//Load Fluffy Cloud Pillar Model

  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/FluffyCloud/scene.gltf', function(gltf){
    var cloud = gltf.scene;
    cloud.scale.set(8, 4, 8);
    for(i=200; i<=1250; i += 150){
    for(k=-2400; k<=-400; k += 400){
      cloud.position.x = k;
    cloud.position.y = 100;
  cloud.position.z = i;
      scene.add(cloud.clone());
    }
  }
    // palmTree2.add(gltf.scene.clone());
    // palmTree3.add(gltf.scene.clone());
    // palmTree4.add(gltf.scene.clone());
        } );



function genarrMap1(){
  // scene.fog = new THREE.FogExp2( 0xaaccff, 0.0007 );
  scene.add(oceanMesh)

  enmy = GenEnemey();
  enmy.position.x = 10;
  enmy.position.z = 0;
  enmy.position.y = 0;
  enmy.scale.x = 3;
  enmy.scale.y = 3;
  enmy.scale.z = 3;




  End = endpad;
  ObjectsMap1Arr.push(endpad);


  ObjectsMap1Arr.push(enmy);
  EnemyList.push(enmy);

  ObjectsMap1Arr.push(startpad);
  ObjectsMap1Arr.push(StartSeg);

  ObjectsMap1Arr.push(middleFloor);

  ObjectsMap1Arr.push(FinalFloor);

  ObjectsMap1Arr.push(mushTree);

  ObjectsMap1Arr.push(glowFlower1);
  ObjectsMap1Arr.push(glowFlower2);

  ObjectsMap1Arr.push(glowMush1);//big ones
  ObjectsMap1Arr.push(glowMush2);
  ObjectsMap1Arr.push(glowMush3);
  ObjectsMap1Arr.push(glowMush4);
  ObjectsMap1Arr.push(glowMush5);
  // ObjectsMap1Arr.push(glowMush6);//from 6 is the small ones
  // ObjectsMap1Arr.push(glowMush7);
  // ObjectsMap1Arr.push(glowMush8);
  // ObjectsMap1Arr.push(glowMush9);

  ObjectsMap1Arr.push(redMush1);//Large Mushy
  ObjectsMap1Arr.push(redMush2);
  ObjectsMap1Arr.push(redMush3);
  ObjectsMap1Arr.push(redMush4);

  ObjectsMap1Arr.push(lowPolyBridge1);
  ObjectsMap1Arr.push(lowPolyBridge2);

  ObjectsMap1Arr.push(dragon);

  ObjectsMap1Arr.push(dragonEgg1);
  ObjectsMap1Arr.push(dragonEgg2);
  ObjectsMap1Arr.push(dragonEgg3);
  ObjectsMap1Arr.push(dragonEgg4);
  ObjectsMap1Arr.push(dragonEgg5);

  ObjectsMap1Arr.push(colloseum);

  ObjectsMap1Arr.push(pillar1);
  ObjectsMap1Arr.push(pillar2);
  ObjectsMap1Arr.push(pillar3);
  ObjectsMap1Arr.push(pillar4);
  ObjectsMap1Arr.push(pillar5);
  ObjectsMap1Arr.push(pillar6);

  ObjectsMap1Arr.push(palmTree1);
  ObjectsMap1Arr.push(palmTree2);
  ObjectsMap1Arr.push(palmTree3);
  ObjectsMap1Arr.push(palmTree4);


  // ObjectsMap1Arr.push(skybox);
   scene.add( skybox )
}

function moveobjectsMap1(){
  //startpad.position.y = 2;
  StartSeg.position.x = -1500;
  StartSeg.position.y = 250;
  StartSeg.position.z = 1000;

  startpad.position.x = -1800;
  startpad.position.y = 250;
  startpad.position.z = 1000;

  endpad.position.x = -300;
  endpad.position.y = 3;
  endpad.position.z = -500;

  middleFloor.position.x = -400;
  middleFloor.position.y = 200;
  middleFloor.position.z = 1000;

  FinalFloor.position.x = -300;
  FinalFloor.position.y = -10;
  FinalFloor.position.z = -500;

  mushTree.position.x = -1500;
  mushTree.position.y = 300;
  mushTree.position.z = 1000;
  mushTree.scale.set(50,50,50);

  glowFlower1.position.x = -1450;
  glowFlower1.position.y = 260;
  glowFlower1.position.z = 1050;
   glowFlower2.position.x = -1550;
  glowFlower2.position.y = 260;
  glowFlower2.position.z = 1000;

    glowMush1.position.x = -1070;
  glowMush1.position.y = 255;
  glowMush1.position.z = 1000;
  glowMush1.scale.set(10,10,10);
   glowMush2.position.x = -1170;
  glowMush2.position.y = 255;
  glowMush2.position.z = 980;
  glowMush2.scale.set(10,10,10);
    glowMush3.position.x = -1330;
  glowMush3.position.y = 255;
  glowMush3.position.z = 1000;
  glowMush3.scale.set(10,10,10);
   glowMush4.position.x = -1660;
  glowMush4.position.y = 255;
  glowMush4.position.z = 1040;
  glowMush4.scale.set(10,10,10);
    glowMush5.position.x = -1860;
  glowMush5.position.y = 255;
  glowMush5.position.z = 960;
  glowMush5.scale.set(10,10,10);
glowMush6.position.x = -1860;
  glowMush6.position.y = 255;
  glowMush6.position.z = 960;
  glowMush6.scale.set(10,10,10);
glowMush7.position.x = -1860;
  glowMush7.position.y = 255;
  glowMush7.position.z = 960;
  glowMush7.scale.set(10,10,10);
glowMush8.position.x = -1860;
  glowMush8.position.y = 255;
  glowMush8.position.z = 960;
  glowMush8.scale.set(10,10,10);
glowMush9.position.x = -1860;
  glowMush9.position.y = 255;
  glowMush9.position.z = 960;
  glowMush9.scale.set(10,10,10);

  redMush1.position.x = -1730;
  redMush1.position.y = 255;
  redMush1.position.z = 950;
  redMush1.scale.set(10,10,10);
  redMush2.position.x = -1500;
  redMush2.position.y = 255;
  redMush2.position.z = 1070;
  redMush2.scale.set(10,10,10);
  redMush3.position.x = -1240;
  redMush3.position.y = 255;
  redMush3.position.z = 935;
  redMush3.scale.set(10,10,10);
  redMush4.position.x = -1130;
  redMush4.position.y = 255;
  redMush4.position.z = 1060;
  redMush4.scale.set(10,10,10);

lowPolyBridge1.position.x = 400;
  lowPolyBridge1.position.y = -600;
  lowPolyBridge1.position.z = 1100;
  lowPolyBridge1.scale.set(7,7,15);
  lowPolyBridge1.rotation.set(0, Math.PI/2, Math.PI/6);
lowPolyBridge2.position.x = -1130;
  lowPolyBridge2.position.y = 50;
  lowPolyBridge2.position.z = 1060;
  lowPolyBridge2.scale.set(1,1,1);

  dragon.position.x = -635;
  dragon.position.y = 200;
  dragon.position.z = 1130;
  dragon.scale.set(4,4,4);
  dragon.rotation.set(Math.PI/6, 0.349066, 0);

  dragonEgg1.position.x = -580;
  dragonEgg1.position.y = 210;
  dragonEgg1.position.z = 995;
  dragonEgg1.rotation.set(0, Math.PI, 0);
  dragonEgg2.position.x = -420;
  dragonEgg2.position.y = 210;
  dragonEgg2.position.z = 950;
  dragonEgg2.rotation.set(0, Math.PI/2, 0);
  dragonEgg3.position.x = -420;
  dragonEgg3.position.y = 210;
  dragonEgg3.position.z = 1060;
  dragonEgg3.rotation.set(0, Math.PI, 0);
  dragonEgg4.position.x = -300;
  dragonEgg4.position.y = 210;
  dragonEgg4.position.z = 1030;
  dragonEgg4.rotation.set(0, Math.PI/2, 0);
  dragonEgg5.position.x = -200;
  dragonEgg5.position.y = 210;
  dragonEgg5.position.z = 960;
  dragonEgg5.rotation.set(0, Math.PI, 0);



    oceanMesh.position.y = -10;

  colloseum.position.x = -300;
  colloseum.position.y = 0;
  colloseum.position.z = -600;

pillar1.position.x = -205;
  pillar1.position.y = 0;
  pillar1.position.z = -360;
pillar2.position.x = -395;
  pillar2.position.y = 0;
  pillar2.position.z = -360;
pillar3.position.x = -205;
  pillar3.position.y = 0;
  pillar3.position.z = -200;
pillar4.position.x = -395;
  pillar4.position.y = 0;
  pillar4.position.z = -200;
pillar5.position.x = -205;
  pillar5.position.y = 0;
  pillar5.position.z = -40;
pillar6.position.x = -395;
  pillar6.position.y = 0;
  pillar6.position.z = -40;

  palmTree1.position.x = -190;
  palmTree1.position.y = 0;
  palmTree1.position.z = -280;
palmTree2.position.x = -380;
  palmTree2.position.y = 0;
  palmTree2.position.z = -280;
palmTree3.position.x = -190;
  palmTree3.position.y = 0;
  palmTree3.position.z = -120;
palmTree4.position.x = -380;
  palmTree4.position.y = 0;
  palmTree4.position.z = -120;


}


function getarrMap1(){
  moveobjectsMap1();
  genarrMap1();
}

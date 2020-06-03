var ObjectsMap1Arr = [];
var EnemyList = [];
var End;
var Mesh, oceanGeometry, oceanMaterial, clock;
var sphereCamera;
var End;

//Placing a camera inside the start/end pad to create a reflection
sphereCamera = new THREE.CubeCamera(1,1000,500);
        sphereCamera.position.set(-300,213,-910);

//Loading screen using css and Threejs LoadingManager
  const loadingManager = new THREE.LoadingManager( () => {

    const loadingScreen = document.getElementById( 'loading-screen' );
    loadingScreen.classList.add( 'fade-out' );

    // optional: remove loader from DOM via event listener
    loadingScreen.addEventListener( 'transitionend', onTransitionEnd );

  } );


//Skybox
//Initialize an array which loads textures
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
//Creates cube of set dimensions
let skyboxGeo = new THREE.BoxGeometry( 5000, 5000, 5000);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );



//Textures
//Texture loaders for all the used textures to be called later
var MainFloortexture = new THREE.TextureLoader().load( 'Textures/Grass.jpg' );
var GrassMat = new THREE.MeshBasicMaterial( { map: MainFloortexture, side: THREE.DoubleSide } );
var Startpadtexture = new THREE.TextureLoader().load( 'Textures/start.jpg' );
var Startpadmaterial = new THREE.MeshBasicMaterial( { map: Startpadtexture, side: THREE.DoubleSide } );
var waterTexture = new THREE.TextureLoader().load( 'Textures/water.jpg' );
var waterMat = new THREE.MeshBasicMaterial( { map: waterTexture } );
var seaSandTexture = new THREE.TextureLoader().load( 'Textures/seasand.jpg' );
var seaSandMat = new THREE.MeshBasicMaterial( { map: seaSandTexture } );
let sphereMaterial = new THREE.MeshBasicMaterial({
          envMap: sphereCamera.renderTarget
        });

var transMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    opacity: 0,
    transparent: true,
  });


//lights
//Sets a directional light at a position with colour and intensity
var directionalLight = new THREE.DirectionalLight( 	0xB4CCE1, 2 );
directionalLight.position.set( 3000, 1000, -3000 );

MainFloortexture.wrapS = THREE.RepeatWrapping;
MainFloortexture.wrapT = THREE.RepeatWrapping;
//floor geometries
var startpadgeom = new THREE.BoxGeometry( 5, 2, 5 );
var StartFloorGeo = new THREE.BoxGeometry( 1000, 20, 220 );
var middleFloorGeo = new THREE.BoxGeometry( 520, 20, 240 );
var endpadgeom = new THREE.BoxGeometry( 10, 10, 10 );
var transGeometry = new THREE.BoxGeometry(75,20,1000);




//Mesh:
var startpad = new THREE.Mesh( startpadgeom, Startpadmaterial );
var endpad = new THREE.Mesh( endpadgeom , sphereMaterial );
var StartSeg = new THREE.Mesh( StartFloorGeo , GrassMat );
var middleFloor = new THREE.Mesh( middleFloorGeo , GrassMat );
var transBox = new THREE.Mesh( transGeometry , transMaterial );




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

//Load Glow Mushroom Model
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

//Load Rope Bridge Model
var ropeBridge1 = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/RopeBridge/scene.gltf', function(gltf){

    ropeBridge1.add(gltf.scene);
});
}

//Load FantasyBridge Model
var fantasyBridge = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/FantasyBridge/scene.gltf', function(gltf){

    fantasyBridge.add(gltf.scene);
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

//Load Ship In Cloud Model
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/ShipClouds/scene.gltf', function(gltf){
    gltf.scene.scale.set(0.8,0.8,0.8);

    //here we remove the outer sphere of the cloud model cause it gets in the way
    var outSphere = gltf.scene.getObjectByName("Sky");
    var parent = outSphere.parent;
    parent.remove( outSphere );

    shipInCloud = gltf.scene;
    shipInCloud.position.x = -230;
    shipInCloud.position.y = 260;
    shipInCloud.position.z = 380;
    shipInCloud.rotation.set(0,Math.PI/2,0);

    scene.add(shipInCloud);

        } );

   //Load Fantasy Ring Model
   //Final Platform
var fantasyRing = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/FantasyRing/scene.gltf', function(gltf){
    gltf.scene.scale.set(500,500,500);
    fantasyRing.add(gltf.scene);

        } );
}

//Load Energy Sphere Model
//Final Platform
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/EnergySphere/scene.gltf', function(gltf){
    gltf.scene.scale.set(250,250,250);
    energySphere = gltf.scene;
    energySphere.position.x = -300;
    energySphere.position.y = 117;
    energySphere.position.z = -525;
    scene.add(energySphere);

    mixer = new THREE.AnimationMixer( energySphere ); //This animates the Energy Sphere model
        mixer.clipAction( gltf.animations[ 0 ] ).play();

        animate();//calls the animate function

        } );
}


function genarrMap1(){
  scene.add(oceanMesh);

  boxe1 = new getEnemy();
  boxe1.position.x = 40;
  boxe1.position.z = -20;
  boxe1.position.y = 4.1;
  boxe1.scale.x = 8;
  boxe1.scale.y = 8;
  boxe1.scale.z = 8;

  ObjectsMap1Arr.push(boxe1);
  EnemyList.push(boxe1);

  boxe2 = boxe1.clone();
  boxe2.position.x = -40;
  boxe2.position.z = -10;
  boxe2.position.y = 4.1;
  boxe2.scale.x = 8;
  boxe2.scale.y = 8;
  boxe2.scale.z = 8;

   ObjectsMap1Arr.push(boxe2);
   EnemyList.push(boxe2);

   mush_e1 = new mushEnemy();
   mush_e1.position.x = -1860;
   mush_e1.position.z = 955;
   mush_e1.position.y = 256;
   mush_e1.scale.x = 8;
   mush_e1.scale.y = 8;
   mush_e1.scale.z = 8;

    ObjectsMap1Arr.push(mush_e1);
    EnemyList.push(mush_e1);

    mush_e2 = mush_e1.clone();
    mush_e2.position.x = -1730;
    mush_e2.position.z = 940;
    mush_e2.position.y = 256;
     ObjectsMap1Arr.push(mush_e2);
     EnemyList.push(mush_e2);

     mush_e3 = mush_e1.clone();
     mush_e3.position.x = -1662;
     mush_e3.position.z = 1030;
     mush_e3.position.y = 256;
      ObjectsMap1Arr.push(mush_e3);
      EnemyList.push(mush_e3);

      trapm3_1 = new getTrapM3();
      trapm3_1.position.x = -845;
      trapm3_1.position.z = 998;
      trapm3_1.position.y = 300;
      trapm3_1.scale.x = 8;
      trapm3_1.scale.y = 8;
      trapm3_1.scale.z = 8;

       ObjectsMap1Arr.push(trapm3_1);
       EnemyList.push(trapm3_1);

       trapm3_2 = trapm3_1.clone();
       trapm3_2.position.x = -308;
       trapm3_2.position.z = 683;
       trapm3_2.position.y = 300;
       trapm3_2.scale.x = 8;
       trapm3_2.scale.y = 8;
       trapm3_2.scale.z = 8;

        ObjectsMap1Arr.push(trapm3_2);
        EnemyList.push(trapm3_2);

        trapm3_3 = trapm3_1.clone();
        trapm3_3.position.x = -300;
        trapm3_3.position.z = 146;
        trapm3_3.position.y = 300;
        trapm3_3.scale.x = 8;
        trapm3_3.scale.y = 8;
        trapm3_3.scale.z = 8;

         ObjectsMap1Arr.push(trapm3_3);
         EnemyList.push(trapm3_3);

  End = endpad;
  ObjectsMap1Arr.push(endpad);

  ObjectsMap1Arr.push(startpad);
  ObjectsMap1Arr.push(StartSeg);

  ObjectsMap1Arr.push(middleFloor);

  ObjectsMap1Arr.push(fantasyRing);//FinalFloor

  ObjectsMap1Arr.push(mushTree);

  ObjectsMap1Arr.push(glowMush1);//big ones
  ObjectsMap1Arr.push(glowMush2);
  ObjectsMap1Arr.push(glowMush3);
  ObjectsMap1Arr.push(glowMush4);
  ObjectsMap1Arr.push(glowMush5);

  ObjectsMap1Arr.push(redMush1);//Large Mushy
  ObjectsMap1Arr.push(redMush2);
  ObjectsMap1Arr.push(redMush3);
  ObjectsMap1Arr.push(redMush4);

  ObjectsMap1Arr.push(ropeBridge1); //First bridge after start floor
  ObjectsMap1Arr.push(fantasyBridge);//Connects to Fantasy Ring
  ObjectsMap1Arr.push(transBox);//Goes under Fantasy Bridge

  ObjectsMap1Arr.push(dragon);

  ObjectsMap1Arr.push(dragonEgg1);
  ObjectsMap1Arr.push(dragonEgg2);
  ObjectsMap1Arr.push(dragonEgg3);
  ObjectsMap1Arr.push(dragonEgg4);
  ObjectsMap1Arr.push(dragonEgg5);

  // //Adding Lights and Skybox
   scene.add( skybox );
   scene.add( directionalLight );

  //Adding reflective camera
  scene.add(sphereCamera);
}

function moveobjectsMap1(){
  StartSeg.position.x = -1500;
  StartSeg.position.y = 250;
  StartSeg.position.z = 1000;

  startpad.position.x = -1955;
  startpad.position.y = 260;
  startpad.position.z = 1060;

  endpad.position.x = -300;
  endpad.position.y = 210;
  endpad.position.z = -910;

  middleFloor.position.x = -400;
  middleFloor.position.y = 200;
  middleFloor.position.z = 1000;

  fantasyRing.position.x = -300;
  fantasyRing.position.y = 117;
  fantasyRing.position.z = -525;

  mushTree.position.x = -1500;
  mushTree.position.y = 300;
  mushTree.position.z = 1000;
  mushTree.scale.set(50,50,50);

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

ropeBridge1.position.x = -825;//First Rope Bridge after Starting
  ropeBridge1.position.y = 250;
  ropeBridge1.position.z = 1000;
  ropeBridge1.scale.set(200,200,200);
  ropeBridge1.rotation.set(0, 0, -0.174);//10 degrees

fantasyBridge.position.x = -300;//Long wooden bridge in clouds
  fantasyBridge.position.y = 179;
  fantasyBridge.position.z = 380;
  fantasyBridge.scale.set(0.2,0.2,0.2);
  fantasyBridge.rotation.set(0, Math.PI/2,0);

  transBox.position.x = -300;
  transBox.position.y = 200;
  transBox.position.z = 390;

  dragon.position.x = -583;
  dragon.position.y = 177;
  dragon.position.z = 1150;
  dragon.scale.set(10,10,10);
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

}


function getarrMap1(){
  moveobjectsMap1();
  genarrMap1();
}

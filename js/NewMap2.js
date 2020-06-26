var ObjectsMap1Arr = [];
var EnemyList = [];
var End;
var Mesh, oceanGeometry, oceanMaterial, clock;
var tween, tweenBack, ball;
var sphereCamera;
var spikeEnemy = [];

//Placing a camera inside the start/end pad to create a reflection
sphereCamera = new THREE.CubeCamera(1,2000,500);
        sphereCamera.position.set(297,13,-519);

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
let texture_ft = new THREE.TextureLoader().load( 'Textures/wasteland_ft.jpg');//front
let texture_bk = new THREE.TextureLoader().load( 'Textures/wasteland_bk.jpg');//bk
let texture_up = new THREE.TextureLoader().load( 'Textures/wasteland_up.jpg');//up
let texture_dn = new THREE.TextureLoader().load( 'Textures/wasteland_dn.jpg');//Dn
let texture_rt = new THREE.TextureLoader().load( 'Textures/wasteland_rt.jpg');//Rt
let texture_lf = new THREE.TextureLoader().load( 'Textures/wasteland_lf.jpg');//Lt

materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
//Creates cube of set dimensions
let skyboxGeo = new THREE.BoxGeometry( 3000, 1500, 3000);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
skybox.rotation.set(0, Math.PI, 0);



//Lights
//Sets a directional light at a position with colour and intensity
var directionalLight = new THREE.DirectionalLight( 	0xFF8C00, 2 );
directionalLight.position.set( -200, 400, -1400 );
directionalLight.target.position.set( 70, 0, -55);
directionalLight.castShadow = true;

//Set up shadow properties for the light
directionalLight.shadow.camera.near = 60;
directionalLight.shadow.camera.far = 1500;
directionalLight.shadow.mapSize.width = 2048;  // default
directionalLight.shadow.mapSize.height = 2048; // default
directionalLight.shadow.bias = -0.004;
// directionalLight.shadow.darkness = 2;
directionalLight.shadow.camera.right = 700;
directionalLight.shadow.camera.left = -700;
directionalLight.shadow.camera.top = 900;
directionalLight.shadow.camera.bottom = -900;
//Create a helper for the shadow camera (optional)
var helper = new THREE.CameraHelper( directionalLight.shadow.camera );

//Creates an ambient light at origin just for testing
var light = new THREE.AmbientLight(0x404040);
//Textures
//Texture loaders for all the used textures to be called later
var MainFloortexture = new THREE.TextureLoader().load( 'Textures/Grass.jpg' );
var lavaRockMaterial = new THREE.MeshPhongMaterial( { map: MainFloortexture, side: THREE.DoubleSide } );
var Startpadtexture = new THREE.TextureLoader().load( 'Textures/start.jpg' );
var Startpadmaterial = new THREE.MeshPhongMaterial( { map: Startpadtexture, side: THREE.DoubleSide } );
var waterTexture = new THREE.TextureLoader().load( 'Textures/water.jpg' );
var waterMat = new THREE.MeshPhongMaterial( { map: waterTexture } );
var mountRockTexture = new THREE.TextureLoader().load( 'Textures/mountainRock.jpg' );
var mountRockMat = new THREE.MeshPhongMaterial( { map: mountRockTexture, polygonOffset: true, polygonOffsetUnits: 1,
polygonOffsetFactor: 1, side: THREE.DoubleSide } );
var lavaRockTexture = new THREE.TextureLoader().load( 'Textures/lavaRock.jpg' );
var lavaRockMaterial = new THREE.MeshPhongMaterial( { map: lavaRockTexture, side: THREE.DoubleSide } );
let sphereMaterial = new THREE.MeshBasicMaterial({
          envMap: sphereCamera.renderTarget
        });

var transMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    opacity: 0,
    transparent: true,
  });



MainFloortexture.wrapS = THREE.RepeatWrapping;
MainFloortexture.wrapT = THREE.RepeatWrapping;
//floor geometries
var startpadgeom = new THREE.BoxBufferGeometry( 5, 2, 5 );
var endpadgeom = new THREE.BoxBufferGeometry( 10, 10, 10 );

var SouthSegmentgeom = new THREE.BoxBufferGeometry( 1000, 20, 220 );
var NorthEastSegmentgeom = new THREE.BoxBufferGeometry( 220, 20, 220 );
var NorthWestSegmentgeom = new THREE.BoxBufferGeometry( 220, 20, 220 );
var platformGeometry = new THREE.BoxBufferGeometry( 50, 10, 50 );
var highPlatformGeometry = new THREE.BoxBufferGeometry( 51, 20, 51 );
var veryHighPlatformGeometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
var wallGeometry = new THREE.PlaneBufferGeometry(50,50);

//Mesh:
var startpad = new THREE.Mesh( startpadgeom, Startpadmaterial );
var endpad = new THREE.Mesh( endpadgeom , sphereMaterial );
var SotheSeg = new THREE.Mesh( SouthSegmentgeom , lavaRockMaterial );
var NorthEastSeg = new THREE.Mesh( NorthEastSegmentgeom , lavaRockMaterial );
var NorthWestSeg = new THREE.Mesh( NorthWestSegmentgeom , lavaRockMaterial );
var NorthSeg = new THREE.Mesh( SouthSegmentgeom , lavaRockMaterial );



 oceanGeometry = new THREE.PlaneBufferGeometry( 2000, 3000, 127, 127);
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

 oceanMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, map: texture } );
var oceanMesh = new THREE.Mesh( oceanGeometry, oceanMaterial );


//Load Short Bridge Model
var rightBridge1 = new THREE.Object3D();
var leftBridge2 = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/Bridge/scene.gltf', function(gltf){

    //Cast and receive a shadow on the model
      gltf.scene.traverse (function (node){
      if (node instanceof THREE.Mesh){
        node.castShadow = true;
        node.receiveShadow = true;
      }
      });

    var rightWoodBridge1 = gltf.scene;
    rightBridge1.add(rightWoodBridge1);

    var leftWoodBridge2 = gltf.scene.clone();
    leftBridge2.add(leftWoodBridge2);
  });
}

//Load Long Bridge Model
var centreBridge = new THREE.Object3D();
var loader = new THREE.GLTFLoader();
loader.load('./3DObjects/LongBridge/scene.gltf', function(gltf){

  //Cast and receive a shadow on the model
      gltf.scene.traverse (function (node){
      if (node instanceof THREE.Mesh){
        node.castShadow = true;
        node.receiveShadow = true;
      }
      });
    centreBridge.add(gltf.scene);
    animate();
});

//Load Glowing Rock Model
var glowingRock1 = new THREE.Object3D();
var glowingRock2 = new THREE.Object3D();
var glowingRock3 = new THREE.Object3D();
var glowingRock4 = new THREE.Object3D();
var glowingRock5 = new THREE.Object3D();
var glowingRock6 = new THREE.Object3D();
var glowingRock7 = new THREE.Object3D();
var glowingRock8 = new THREE.Object3D();
var glowingRock9 = new THREE.Object3D();
var glowingRock10 = new THREE.Object3D();
var glowingRock11 = new THREE.Object3D();
var glowingRock12 = new THREE.Object3D();
var glowingRock13 = new THREE.Object3D();
var glowingRock14 = new THREE.Object3D();
//loadingManager is called here
//Once this glowingRock model is loaded, then only is the loading screen removed
var loader = new THREE.GLTFLoader( loadingManager );
loader.load('./3DObjects/GlowingRock/scene.gltf', function(gltf){
    gltf.scene.scale.set(1.5,1.5,1.5);

  gltf.scene.traverse (function (node){
  if (node instanceof THREE.Mesh){
    node.castShadow = true;
    node.receiveShadow = true;
  }
  });

    glowingRock1.add(gltf.scene);
    glowingRock2.add(gltf.scene.clone());
    glowingRock3.add(gltf.scene.clone());
    glowingRock4.add(gltf.scene.clone());
    glowingRock5.add(gltf.scene.clone());
    glowingRock6.add(gltf.scene.clone());
    glowingRock7.add(gltf.scene.clone());
    glowingRock8.add(gltf.scene.clone());
    glowingRock9.add(gltf.scene.clone());
    glowingRock10.add(gltf.scene.clone());
    glowingRock11.add(gltf.scene.clone());
    glowingRock12.add(gltf.scene.clone());
    glowingRock13.add(gltf.scene.clone());
    glowingRock14.add(gltf.scene.clone());
});



//Creating a few platforms XD:
// Start floor
var platform1 = new THREE.Mesh( platformGeometry , mountRockMat );
var highPlatform2 = new THREE.Mesh( highPlatformGeometry , mountRockMat );
var platform3 = new THREE.Mesh( platformGeometry , mountRockMat );
var platform4 = new THREE.Mesh( platformGeometry , mountRockMat );
var highPlatform5 = new THREE.Mesh( highPlatformGeometry , mountRockMat );
var platform6 = new THREE.Mesh( platformGeometry , mountRockMat );
var platform7 = new THREE.Mesh( platformGeometry , mountRockMat );
var highPlatform8 = new THREE.Mesh( highPlatformGeometry , mountRockMat );
var platform9 = new THREE.Mesh( platformGeometry , mountRockMat );

var wallPlane1 = new THREE.Mesh(wallGeometry, mountRockMat);
var wallPlane2 = new THREE.Mesh(wallGeometry, mountRockMat);
var wallPlane3 = new THREE.Mesh(wallGeometry, mountRockMat);
var wallPlane4 = new THREE.Mesh(wallGeometry, mountRockMat);
var wallPlane5 = new THREE.Mesh(wallGeometry, mountRockMat);
var wallPlane6 = new THREE.Mesh(wallGeometry, mountRockMat);



//West Wing platforms
var wallPlane7 = new THREE.Mesh(wallGeometry, mountRockMat);
var wallPlane8 = new THREE.Mesh(wallGeometry, mountRockMat);
var wallPlane9 = new THREE.Mesh(wallGeometry, mountRockMat);

//East Wing Platforms
var platform10 = new THREE.Mesh( platformGeometry , mountRockMat );
var platform11 = new THREE.Mesh( platformGeometry , mountRockMat );

//North Wing Platforms:
var highPlatform9 = new THREE.Mesh( highPlatformGeometry , mountRockMat );
var highPlatform10 = new THREE.Mesh( highPlatformGeometry , mountRockMat );

var platform14 = new THREE.Mesh( platformGeometry , mountRockMat );
var platform15 = new THREE.Mesh( platformGeometry , mountRockMat );
var platform16 = new THREE.Mesh( platformGeometry , mountRockMat );
var platform17 = new THREE.Mesh( platformGeometry , mountRockMat );
var platform18 = new THREE.Mesh( platformGeometry , mountRockMat );
var platform19 = new THREE.Mesh( platformGeometry , mountRockMat );
var platform20 = new THREE.Mesh( platformGeometry , mountRockMat );
var platform21 = new THREE.Mesh( platformGeometry , mountRockMat );
var platform22 = new THREE.Mesh( platformGeometry , mountRockMat );
var platform23 = new THREE.Mesh( platformGeometry , mountRockMat );


//transparent floor geometry (Goes under the small bridge)
var transGeometry = new THREE.BoxBufferGeometry(15,20,45);
var rightTransBox = new THREE.Mesh(transGeometry, transMaterial);
var leftTransBox = new THREE.Mesh(transGeometry, transMaterial);



function genarrMap1(){
  // scene.fog = new THREE.FogExp2( 0xaaccff, 0.0007 );
  scene.add(oceanMesh)

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
   ObjectsMap1Arr.push(boxe2);
   EnemyList.push(boxe2);

   boxe3 = boxe1.clone();
   ObjectsMap1Arr.push(boxe3);
   EnemyList.push(boxe3);

   boxe4 = boxe1.clone();
    ObjectsMap1Arr.push(boxe4);
    EnemyList.push(boxe4);

    boxe5 = boxe1.clone();
     ObjectsMap1Arr.push(boxe5);
     EnemyList.push(boxe5);

    boxe6 = boxe1.clone();
     ObjectsMap1Arr.push(boxe6);
     EnemyList.push(boxe6);

     p_e1= new pillEnemey() ;
     p_e1.position.x = 0;
     p_e1.position.z = 45;
     p_e1.position.y = 4.1;
     p_e1.scale.x = 8;
     p_e1.scale.y = 8;
     p_e1.scale.z = 8;
     ObjectsMap1Arr.push(p_e1);
     EnemyList.push(p_e1);

     p_e2 = p_e1.clone();
     p_e2.position.x = 200;
     p_e2.position.z = 105;
     p_e2.position.y = 4.1;
     ObjectsMap1Arr.push(p_e2);
     EnemyList.push(p_e2);

     p_e3 = p_e1.clone();
     p_e3.position.x = -198;
     p_e3.position.z = -155;
     p_e3.position.y = 4.1;
     ObjectsMap1Arr.push(p_e3);
     EnemyList.push(p_e3);

     p_e4 = p_e1.clone();
     p_e4.position.x = -205;
     p_e4.position.z = 105;
     p_e4.position.y = 4.1;
     ObjectsMap1Arr.push(p_e4);
     EnemyList.push(p_e4);

     p_e5 = p_e1.clone();
     p_e5.position.x = -300;
     p_e5.position.z = -275;
     p_e5.position.y = 4.1;
     ObjectsMap1Arr.push(p_e5);
     EnemyList.push(p_e5);

     trap1 = new getTrap();
     trap1.position.x = 196;
     trap1.position.z = -150;
     trap1.position.y = 0.2;
     trap1.scale.x = 10;
     trap1.scale.y = 10;
     trap1.scale.z = 10;
     ObjectsMap1Arr.push(trap1);
     EnemyList.push(trap1);

     trap_2 = trap1.clone();
     trap_2.position.x = -204;
     trap_2.position.z = -413;
     trap_2.position.y = 0.2;
     ObjectsMap1Arr.push(trap_2);
     EnemyList.push(trap_2);

     top1 = getTop();
     top1.position.x = 0;
     top1.position.z = -68;
     top1.position.y = 14;
     top1.scale.x = 4;
     top1.scale.y = 4;
     top1.scale.z = 4;
     ObjectsMap1Arr.push(top1);
     EnemyList.push(top1);

     top2 = top1.clone();
     top2.position.x = 190;
     top2.position.z = -320;
     top2.position.y = 10;
     ObjectsMap1Arr.push(top2);
     EnemyList.push(top2);

     top3 = top1.clone();
     top3.position.x = -300;
     top3.position.z = -520;
     top3.position.y = 14;
     ObjectsMap1Arr.push(top3);
     EnemyList.push(top3);


  End = endpad;
  ObjectsMap1Arr.push(endpad);
  ObjectsMap1Arr.push(startpad);
  ObjectsMap1Arr.push(SotheSeg);
  ObjectsMap1Arr.push(NorthEastSeg);
  ObjectsMap1Arr.push(NorthWestSeg);
  ObjectsMap1Arr.push(NorthSeg);

  ObjectsMap1Arr.push(rightBridge1);
  ObjectsMap1Arr.push(rightTransBox);

  ObjectsMap1Arr.push(centreBridge);

  ObjectsMap1Arr.push(leftBridge2);
  ObjectsMap1Arr.push(leftTransBox);

  //pushing the platforms:
  ObjectsMap1Arr.push(platform1);
  ObjectsMap1Arr.push(highPlatform2);
  ObjectsMap1Arr.push(platform3);
  ObjectsMap1Arr.push(platform4);
  ObjectsMap1Arr.push(highPlatform5);
  ObjectsMap1Arr.push(platform6);
  ObjectsMap1Arr.push(platform7);
  ObjectsMap1Arr.push(highPlatform8);
  ObjectsMap1Arr.push(platform9);

  ObjectsMap1Arr.push(glowingRock1);
  ObjectsMap1Arr.push(glowingRock2);
  ObjectsMap1Arr.push(glowingRock3);
  ObjectsMap1Arr.push(glowingRock4);

  ObjectsMap1Arr.push(wallPlane1);
  ObjectsMap1Arr.push(wallPlane2);
  ObjectsMap1Arr.push(wallPlane3);
  ObjectsMap1Arr.push(wallPlane4);
  ObjectsMap1Arr.push(wallPlane5);
  ObjectsMap1Arr.push(wallPlane6);

//West Wing :
  ObjectsMap1Arr.push(glowingRock5);
  ObjectsMap1Arr.push(glowingRock6);

  ObjectsMap1Arr.push(wallPlane7);
  ObjectsMap1Arr.push(wallPlane8);
  ObjectsMap1Arr.push(wallPlane9);

//East Wing platforms:
  ObjectsMap1Arr.push(glowingRock7);
  ObjectsMap1Arr.push(glowingRock8);

  ObjectsMap1Arr.push(platform10);
  ObjectsMap1Arr.push(platform11);

// North Wing Platform
  ObjectsMap1Arr.push(highPlatform9);
  ObjectsMap1Arr.push(highPlatform10);
  ObjectsMap1Arr.push(platform14);
  ObjectsMap1Arr.push(platform15);
  ObjectsMap1Arr.push(platform16);
  ObjectsMap1Arr.push(platform17);
  ObjectsMap1Arr.push(platform18);
  ObjectsMap1Arr.push(platform19);
  ObjectsMap1Arr.push(platform20);
  ObjectsMap1Arr.push(platform21);

//North Wing Centre Piece:
  ObjectsMap1Arr.push(glowingRock9);
  ObjectsMap1Arr.push(glowingRock10);

  ObjectsMap1Arr.push(glowingRock11);
  ObjectsMap1Arr.push(glowingRock12);
  ObjectsMap1Arr.push(glowingRock13);
  ObjectsMap1Arr.push(glowingRock14);

  ObjectsMap1Arr.push(platform22);
  ObjectsMap1Arr.push(platform23);

//Adding Lights
scene.add( directionalLight );
scene.add( directionalLight.target );
scene.add( light );

// Directional light helper:
// scene.add( helper );

  // adding skybox
  scene.add( skybox )

//Adding reflective camera
  scene.add(sphereCamera);
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

  //First small bridge
  rightBridge1.position.x = 200;
  rightBridge1.position.y = -7;
  rightBridge1.position.z = -150;
  rightBridge1.scale.set(0.07,0.07,0.07);

  //Second small bridge
  leftBridge2.position.x = -200;
  leftBridge2.position.y = -7;
  leftBridge2.position.z = -410;
  leftBridge2.scale.set(0.07,0.07,0.07);

  centreBridge.position.x = 0;
  centreBridge.position.y = -43.5;
  centreBridge.position.z = -250;
  centreBridge.rotation.set(0, Math.PI/2, 0);
  centreBridge.scale.set(5, 5, 8.5);

  rightTransBox.position.x = 200;
  rightTransBox.position.y = -10;
  rightTransBox.position.z = -130;

  leftTransBox.position.x = -200;
  leftTransBox.position.y = -10;
  leftTransBox.position.z = -390;

  //Platforms for start floor
    platform1.position.x = -250;
    platform1.position.y = 0;
    platform1.position.z = 70;
    highPlatform2.position.x = -210;
    highPlatform2.position.y = 0;
    highPlatform2.position.z = 70;
    platform3.position.x = -170;
    platform3.position.y = 0;
    platform3.position.z = 70;
    platform4.position.x = 170;
    platform4.position.y = 0;
    platform4.position.z = 70;
    highPlatform5.position.x = 210;
    highPlatform5.position.y = 0;
    highPlatform5.position.z = 70;
    platform6.position.x = 250;
    platform6.position.y = 0;
    platform6.position.z = 70;
    platform7.position.x = -40;
    platform7.position.y = 0;
    platform7.position.z = -70;
    highPlatform8.position.x = 0;
    highPlatform8.position.y = 0;
    highPlatform8.position.z = -70;
    platform9.position.x = 40;
    platform9.position.y = 0;
    platform9.position.z = -70;

    glowingRock1.position.x = -210;
    glowingRock1.position.y = 0;
    glowingRock1.position.z = -20;
    glowingRock2.position.x = 210;
    glowingRock2.position.y = 0;
    glowingRock2.position.z = -20;
    glowingRock3.position.x = -400;
    glowingRock3.position.y = 0;
    glowingRock3.position.z = -40;
    glowingRock4.position.x = 370;
    glowingRock4.position.y = 0;
    glowingRock4.position.z = -40;

    wallPlane1.position.x = -70;
    wallPlane1.position.y =0;
    wallPlane1.position.z =30;
    wallPlane1.rotation.set(0, Math.PI/2, 0);
    wallPlane2.position.x = 70;
    wallPlane2.position.y =0;
    wallPlane2.position.z =30;
    wallPlane2.rotation.set(0, Math.PI/2, 0);
    wallPlane3.position.x = -45;
    wallPlane3.position.y =0;
    wallPlane3.position.z =55;
    wallPlane4.position.x = 45;
    wallPlane4.position.y =0;
    wallPlane4.position.z =55;
    wallPlane5.position.x = 45;
    wallPlane5.position.y =0;
    wallPlane5.position.z =5;
    wallPlane6.position.x = -45;
    wallPlane6.position.y =0;
    wallPlane6.position.z =5;


    //West Wing Platforms:
    glowingRock5.position.x = -300;
    glowingRock5.position.y = 0;
    glowingRock5.position.z = -350;
    glowingRock6.position.x = -200;
    glowingRock6.position.y = 0;
    glowingRock6.position.z = -250;

    wallPlane7.position.x = -300;
    wallPlane7.position.y =0;
    wallPlane7.position.z =-235;
    wallPlane7.rotation.set(0, Math.PI/2, 0);
    wallPlane8.position.x = -275;
    wallPlane8.position.y =0;
    wallPlane8.position.z =-260;
    wallPlane9.position.x = -325;
    wallPlane9.position.y =0;
    wallPlane9.position.z =-210;

    //East Wing Platforms:
    glowingRock7.position.x = 275;
    glowingRock7.position.y = 0;
    glowingRock7.position.z = -325;
    glowingRock8.position.x = 225;
    glowingRock8.position.y = 0;
    glowingRock8.position.z = -275;

    platform10.position.x = 190;//top left platform
    platform10.position.y = 0;
    platform10.position.z = -320;
    platform11.position.x = 310;//bottom right platform
    platform11.position.y = 0;
    platform11.position.z = -200;

    //North Wing Platform:
    highPlatform9.position.x = 300;//Right centre Platform
    highPlatform9.position.y = 0;
    highPlatform9.position.z = -520;
    highPlatform10.position.x = -300;//left centre platform
    highPlatform10.position.y = 0;
    highPlatform10.position.z = -520;
    platform14.position.x = 350;//R-right platfom
    platform14.position.y = 0;
    platform14.position.z = -520;
    platform15.position.x = 300;//T-right platform
    platform15.position.y = 0;
    platform15.position.z = -570;
    platform16.position.x = 250;//L-right platform
    platform16.position.y = 0;
    platform16.position.z = -520;
    platform17.position.x = 300;//B-right platform
    platform17.position.y = 0;
    platform17.position.z = -480;
    platform18.position.x = -250;//R-left platform
    platform18.position.y = 0;
    platform18.position.z = -520;
    platform19.position.x = -300;//T-left platform
    platform19.position.y = 0;
    platform19.position.z = -570;
    platform20.position.x = -350;//L-left platform
    platform20.position.y = 0;
    platform20.position.z = -520;
    platform21.position.x = -300;//B-left platform
    platform21.position.y = 0;
    platform21.position.z = -480;

    platform22.position.x = 90;//ontop of rock - right
    platform22.position.y = 25;
    platform22.position.z = -520;
    platform23.position.x = -90;//ontop of rock - left
    platform23.position.y = 25;
    platform23.position.z = -520;

    //North Wing Centre Piece
    glowingRock9.position.x = 40;//right-centre-top
    glowingRock9.position.y = 0;
    glowingRock9.position.z = -540;
    glowingRock9.rotation.set(0, Math.PI, 0);
    glowingRock10.position.x = -40;//left-centre-bottom
    glowingRock10.position.y = 0;
    glowingRock10.position.z = -505;

    glowingRock11.position.x = 90;//right-right-top
    glowingRock11.position.y = 0;
    glowingRock11.position.z = -540;
    glowingRock11.rotation.set(0, Math.PI, 0);
    glowingRock12.position.x = 90;//right-right-bottom
    glowingRock12.position.y = 0;
    glowingRock12.position.z = -505;
    glowingRock13.position.x = -90;//left-left-top
    glowingRock13.position.y = 0;
    glowingRock13.position.z = -540;
    glowingRock13.rotation.set(0, Math.PI, 0);
    glowingRock14.position.x = -90;//left-left-bottom
    glowingRock14.position.y = 0;
    glowingRock14.position.z = -505;

    endpad.position.x = 297;
    endpad.position.y = 10;
    endpad.position.z = -519;



}



function getarrMap1(){
  moveobjectsMap1();
  genarrMap1();
}

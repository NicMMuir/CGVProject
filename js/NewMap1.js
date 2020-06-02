var ObjectsMap1Arr = [];
var EnemyList = [];
var Mesh, oceanGeometry, oceanMaterial, clock;
var sphereMaterial;
var tween, tweenBack;
var End;


  //Placing a camera inside the start/end pad to create a reflection
let sphereCamera = new THREE.CubeCamera(1,3000,500);
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
let texture_ft = new THREE.TextureLoader().load( 'Textures/tropic_ft.jpg');
let texture_bk = new THREE.TextureLoader().load( 'Textures/tropic_bk.jpg');
let texture_up = new THREE.TextureLoader().load( 'Textures/tropic_up.jpg');
let texture_dn = new THREE.TextureLoader().load( 'Textures/tropic_dn.jpg');
let texture_rt = new THREE.TextureLoader().load( 'Textures/tropic_rt.jpg');
let texture_lf = new THREE.TextureLoader().load( 'Textures/tropic_lf.jpg');

materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
//Creates cube of set dimensions
let skyboxGeo = new THREE.BoxGeometry( 2500, 1000, 2500);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );


//Textures
//Texture loaders for all the used textures to be called later
var MainFloortexture = new THREE.TextureLoader().load( 'Textures/Grass.jpg' );
var MainFloormaterial = new THREE.MeshBasicMaterial( { map: MainFloortexture, side: THREE.DoubleSide } );
var Startpadtexture = new THREE.TextureLoader().load( 'Textures/start.jpg' );
var Startpadmaterial = new THREE.MeshBasicMaterial( { map: Startpadtexture } );
var waterTexture = new THREE.TextureLoader().load( 'Textures/water.jpg' );
var waterMat = new THREE.MeshBasicMaterial( { map: waterTexture } );
var woodTexture = new THREE.TextureLoader().load( 'Textures/wood.jpg' );
var woodMat = new THREE.MeshBasicMaterial( { map: woodTexture, polygonOffset: true, polygonOffsetUnits: 1,
polygonOffsetFactor: 1, side: THREE.DoubleSide } );
var woodenBoxTex = new THREE.TextureLoader().load( 'Textures/woodenbox.jpg' );
var woodenBoxMat = new THREE.MeshBasicMaterial( { map: woodenBoxTex } );
sphereMaterial = new THREE.MeshBasicMaterial({
          envMap: sphereCamera.renderTarget
        });
var transMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    opacity: 0,
    transparent: true,
  });

//Lights
//Sets a directional light at a position with colour and intensity
var directionalLight = new THREE.DirectionalLight( 	0xDBBD8F, 3 );
directionalLight.position.set( 3000, 1000, 6000 );



MainFloortexture.wrapS = THREE.RepeatWrapping;
MainFloortexture.wrapT = THREE.RepeatWrapping;
//floor geometries
var startpadgeom = new THREE.BoxGeometry( 5,2,5 );
var endpadgeom = new THREE.BoxGeometry( 10, 10, 10 );

var SouthSegmentgeom = new THREE.BoxGeometry( 1000, 20, 220 );
var NorthEastSegmentgeom = new THREE.BoxGeometry( 220, 20, 220 );
var NorthWestSegmentgeom = new THREE.BoxGeometry( 220, 20, 220 );
var platformGeometry = new THREE.BoxGeometry( 50, 10, 50 );
var highPlatformGeometry = new THREE.BoxGeometry( 51, 20, 51 );
var veryHighPlatformGeometry = new THREE.BoxGeometry( 50, 25, 50 );
var wallGeometry = new THREE.PlaneGeometry(50,50);

//Mesh:
var startpad = new THREE.Mesh( startpadgeom, Startpadmaterial );
var endpad = new THREE.Mesh( endpadgeom , sphereMaterial );
var SotheSeg = new THREE.Mesh( SouthSegmentgeom , MainFloormaterial );
var NorthEastSeg = new THREE.Mesh( NorthEastSegmentgeom , MainFloormaterial );
var NorthWestSeg = new THREE.Mesh( NorthWestSegmentgeom , MainFloormaterial );
var NorthSeg = new THREE.Mesh( SouthSegmentgeom , MainFloormaterial );



 oceanGeometry = new THREE.PlaneBufferGeometry( 2000, 2000, 128-1, 128-1);
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

 oceanMaterial = new THREE.MeshBasicMaterial( { color: '#ADD8E6', map: texture } );
var oceanMesh = new THREE.Mesh( oceanGeometry, oceanMaterial );


//Load Short Bridge Model
var rightBridge1 = new THREE.Object3D();
var leftBridge2 = new THREE.Object3D();
{
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/Bridge/scene.gltf', function(gltf){

    var rightWoodBridge1 = gltf.scene;
    rightBridge1.add(rightWoodBridge1);

    var leftWoodBridge2 = gltf.scene.clone();
    leftBridge2.add(leftWoodBridge2);
  });
}

//Load Long Bridge Model
//loadingManager is called here
//Once this bridge model is loaded, then only is the loading screen removed
var centreBridge = new THREE.Object3D();
var loader = new THREE.GLTFLoader( loadingManager );
loader.load('./3DObjects/LongBridge/scene.gltf', function(gltf){
    centreBridge.add(gltf.scene);
});

//Load Palm Tree Model
var palmTree1 = new THREE.Object3D();
var palmTree2 = new THREE.Object3D();
var palmTree3 = new THREE.Object3D();
var palmTree4 = new THREE.Object3D();
var loader = new THREE.GLTFLoader();
loader.load('./3DObjects/palmTree/scene.gltf', function(gltf){
    palmTree1.add(gltf.scene);
    palmTree2.add(gltf.scene.clone());
    palmTree3.add(gltf.scene.clone());
    palmTree4.add(gltf.scene.clone());
});


//Load WaterFall Model
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/FloatIsland/scene.gltf', function(gltf){

    var model = gltf.scene;
    model.scale.set(1000,1000,1000);
    model.position.x =1500;
    model.position.y =150 ;
    model.position.z =-1070 ;
    model.rotation.set(0, -Math.PI/3, 0);

        scene.add( model );

        mixer1 = new THREE.AnimationMixer( model ); //This animates the clouds in waterfall model
        mixer1.clipAction( gltf.animations[ 0 ] ).play();

        } );

  //Load Shark Model
  var loader = new THREE.GLTFLoader();
  loader.load('./3DObjects/JumpShark/scene.gltf', function(gltf){

    var sharkModel = gltf.scene;
    sharkModel.scale.set(0.15,0.15,0.15);
    sharkModel.position.x = 390 ;
    sharkModel.position.y = -28 ;
    sharkModel.position.z = -130 ;
    sharkModel.rotation.set(0, 0, 0);

        scene.add( sharkModel );
        EnemyList.push(sharkModel);

     mixer = new THREE.AnimationMixer( sharkModel ); //This animates the shark model
    mixer.clipAction( gltf.animations[ 0 ] ).play();

    animate();//calls the animate function

    //Here we use Tween to move the shark between four points,
    //the shark moves from its current position to the targetPosition
    var targetPosition1 = new THREE.Vector3( -395, -28, -130 );
    var targetPosition2 = new THREE.Vector3( -395, -28, -390 );
    var targetPosition3 = new THREE.Vector3( 395, -28, -390 );
    var targetPosition4 = new THREE.Vector3( 395, -28, -130 );

    var tween1 = new TWEEN.Tween( sharkModel.position ).to( targetPosition1, 20000 );//10000 = 10sec, time..
    var tween2 = new TWEEN.Tween( sharkModel.position ).to( targetPosition2, 10000 );//..it takes to move..
    var tween3 = new TWEEN.Tween( sharkModel.position ).to( targetPosition3, 20000 );//..between a point
    var tween4 = new TWEEN.Tween( sharkModel.position ).to( targetPosition4, 10000 );

    tween1.chain( tween2 );
    tween2.chain( tween3 );
    tween3.chain( tween4 );
    tween4.chain( tween1 );

    //We also rotate the shark model depending in which direction its moving
    //
    var tweenRot1 = new TWEEN.Tween(sharkModel.rotation)
                .to({ y: "-" + Math.PI/2}, 1000) // relative animation
                .delay(20000)
                .onComplete(function() {
                  // Check that the full 360 degrees of rotation,
                  // and calculate the remainder of the division to avoid overflow.
                    if (Math.abs(sharkModel.rotation.y)>=2*Math.PI) {
                        sharkModel.rotation.y = sharkModel.rotation.y % (2*Math.PI);
                    }
                })

    var tweenRot2 = new TWEEN.Tween(sharkModel.rotation)
                .to({ y: "-" + Math.PI/2}, 1000) // relative animation
                .delay(8000)
                .onComplete(function() {
                  // Check that the full 360 degrees of rotation,
                  // and calculate the remainder of the division to avoid overflow.
                    if (Math.abs(sharkModel.rotation.y)>=2*Math.PI) {
                        sharkModel.rotation.y = sharkModel.rotation.y % (2*Math.PI);
                    }
                })

    var tweenRot3 = new TWEEN.Tween(sharkModel.rotation)
                .to({ y: "-" + Math.PI/2}, 1000) // relative animation
                .delay(20000)
                .onComplete(function() {
                  // Check that the full 360 degrees of rotation,
                  // and calculate the remainder of the division to avoid overflow.
                    if (Math.abs(sharkModel.rotation.y)>=2*Math.PI) {
                        sharkModel.rotation.y = sharkModel.rotation.y % (2*Math.PI);
                    }
                })

    var tweenRot4 = new TWEEN.Tween(sharkModel.rotation)
                .to({ y: "-" + Math.PI/2}, 1000) // relative animation
                .delay(8000)
                .onComplete(function() {
                  // Check that the full 360 degrees of rotation,
                  // and calculate the remainder of the division to avoid overflow.
                    if (Math.abs(sharkModel.rotation.y)>=2*Math.PI) {
                        sharkModel.rotation.y = sharkModel.rotation.y % (2*Math.PI);
                    }
                })

    tweenRot1.chain( tweenRot2 );
    tweenRot2.chain( tweenRot3 );
    tweenRot3.chain( tweenRot4 );
    tweenRot4.chain( tweenRot1 );

    tween1.start(); //This begins the chain movement between the four positions
    tweenRot1.start(); //This begins the rotation of the shark

        } );


//Creating a few platforms XD:
// Start floor
var platform1 = new THREE.Mesh( platformGeometry , woodMat );
var highPlatform2 = new THREE.Mesh( highPlatformGeometry , woodMat );
var platform3 = new THREE.Mesh( platformGeometry , woodMat );
var platform4 = new THREE.Mesh( platformGeometry , woodMat );
var highPlatform5 = new THREE.Mesh( highPlatformGeometry , woodMat );
var platform6 = new THREE.Mesh( platformGeometry , woodMat );
var platform7 = new THREE.Mesh( platformGeometry , woodMat );
var highPlatform8 = new THREE.Mesh( highPlatformGeometry , woodMat );
var platform9 = new THREE.Mesh( platformGeometry , woodMat );

var veryHighPlatform1 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);
var veryHighPlatform2 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);
var veryHighPlatform3 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);
var veryHighPlatform4 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);

var wallPlane1 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane2 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane3 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane4 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane5 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane6 = new THREE.Mesh(wallGeometry, woodMat);



//West Wing platforms
var veryHighPlatform5 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);
var veryHighPlatform6 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);

var wallPlane7 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane8 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane9 = new THREE.Mesh(wallGeometry, woodMat);

//East Wing Platforms
var veryHighPlatform7 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);
var veryHighPlatform8 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);

var platform10 = new THREE.Mesh( platformGeometry , woodMat );
var platform11 = new THREE.Mesh( platformGeometry , woodMat );

//North Wing Platforms:
var highPlatform9 = new THREE.Mesh( highPlatformGeometry , woodMat );
var highPlatform10 = new THREE.Mesh( highPlatformGeometry , woodMat );

var platform14 = new THREE.Mesh( platformGeometry , woodMat );
var platform15 = new THREE.Mesh( platformGeometry , woodMat );
var platform16 = new THREE.Mesh( platformGeometry , woodMat );
var platform17 = new THREE.Mesh( platformGeometry , woodMat );
var platform18 = new THREE.Mesh( platformGeometry , woodMat );
var platform19 = new THREE.Mesh( platformGeometry , woodMat );
var platform20 = new THREE.Mesh( platformGeometry , woodMat );
var platform21 = new THREE.Mesh( platformGeometry , woodMat );

//North Wing Centre Piece:
var veryHighPlatform9 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);
var veryHighPlatform10 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);

var wallPlane10 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane11 = new THREE.Mesh(wallGeometry, woodMat);

var veryHighPlatform11 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);
var veryHighPlatform12 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);
var veryHighPlatform13 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);
var veryHighPlatform14 = new THREE.Mesh(veryHighPlatformGeometry, woodenBoxMat);

var wallPlane12 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane13 = new THREE.Mesh(wallGeometry, woodMat);

var highPlatform11 = new THREE.Mesh( highPlatformGeometry , woodMat );
var highPlatform12 = new THREE.Mesh( highPlatformGeometry , woodMat );



//transparent floor geometry (Goes under the small bridge)
var transGeometry = new THREE.BoxGeometry(15,20,45);
var rightTransBox = new THREE.Mesh(transGeometry, transMaterial);
var leftTransBox = new THREE.Mesh(transGeometry, transMaterial);


function genarrMap1(){
  scene.add(oceanMesh);
  scene.add(sphereCamera);

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
  p_e3.position.x = -200;
  p_e3.position.z = -155;
  p_e3.position.y = 4.1;
  ObjectsMap1Arr.push(p_e3);
  EnemyList.push(p_e3);

  p_e4 = p_e1.clone();
  p_e4.position.x = -200;
  p_e4.position.z = 105;
  p_e4.position.y = 4.1;
  ObjectsMap1Arr.push(p_e4);
  EnemyList.push(p_e4);

  p_e5 = p_e1.clone();
  p_e5.position.x = -300;
  p_e5.position.z = -260;
  p_e5.position.y = 4.1;
  ObjectsMap1Arr.push(p_e5);
  EnemyList.push(p_e5);

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

     trap_3 = trap1.clone();
     trap_3.position.x = -130;
     trap_3.position.z = -243;
     trap_3.position.y = 1.3;
     trap_3.rotateZ(Math.PI/2);
     trap_3.scale.x = 19;
     trap_3.scale.y = 19;
     trap_3.scale.z = 19;

     ObjectsMap1Arr.push(trap_3);
     EnemyList.push(trap_3);

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
  //South Wing
  ObjectsMap1Arr.push(platform1);
  ObjectsMap1Arr.push(highPlatform2);
  ObjectsMap1Arr.push(platform3);
  ObjectsMap1Arr.push(platform4);
  ObjectsMap1Arr.push(highPlatform5);
  ObjectsMap1Arr.push(platform6);
  ObjectsMap1Arr.push(platform7);
  ObjectsMap1Arr.push(highPlatform8);
  ObjectsMap1Arr.push(platform9);

  ObjectsMap1Arr.push(veryHighPlatform1);
  ObjectsMap1Arr.push(veryHighPlatform2);
  ObjectsMap1Arr.push(veryHighPlatform3);
  ObjectsMap1Arr.push(veryHighPlatform4);

  ObjectsMap1Arr.push(wallPlane1);
  ObjectsMap1Arr.push(wallPlane2);
  ObjectsMap1Arr.push(wallPlane3);
  ObjectsMap1Arr.push(wallPlane4);
  ObjectsMap1Arr.push(wallPlane5);
  ObjectsMap1Arr.push(wallPlane6);

//West Wing :
  ObjectsMap1Arr.push(veryHighPlatform5);
  ObjectsMap1Arr.push(veryHighPlatform6);

  ObjectsMap1Arr.push(wallPlane7);
  ObjectsMap1Arr.push(wallPlane8);
  ObjectsMap1Arr.push(wallPlane9);

//East Wing platforms:
  ObjectsMap1Arr.push(veryHighPlatform7);
  ObjectsMap1Arr.push(veryHighPlatform8);

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
  ObjectsMap1Arr.push(veryHighPlatform9);
  ObjectsMap1Arr.push(veryHighPlatform10);

  ObjectsMap1Arr.push(wallPlane10);
  ObjectsMap1Arr.push(wallPlane11);

  ObjectsMap1Arr.push(veryHighPlatform11);
  ObjectsMap1Arr.push(veryHighPlatform12);
  ObjectsMap1Arr.push(veryHighPlatform13);
  ObjectsMap1Arr.push(veryHighPlatform14);

  ObjectsMap1Arr.push(wallPlane12);
  ObjectsMap1Arr.push(wallPlane13);


  ObjectsMap1Arr.push(palmTree1);
  ObjectsMap1Arr.push(palmTree2);
  ObjectsMap1Arr.push(palmTree3);
  ObjectsMap1Arr.push(palmTree4);

  ObjectsMap1Arr.push(highPlatform11);
  ObjectsMap1Arr.push(highPlatform12);

  //Add the skybox and lights instead of pushing
  scene.add( skybox );
  scene.add( directionalLight );
}

function moveobjectsMap1(){

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

  rightBridge1.position.x = 200;
  rightBridge1.position.y = -7;
  rightBridge1.position.z = -150;
  rightBridge1.scale.set(0.07,0.07,0.07);

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

    veryHighPlatform1.position.x = -210;
    veryHighPlatform1.position.y = 12.5;
    veryHighPlatform1.position.z = 20;
    veryHighPlatform2.position.x = 210;
    veryHighPlatform2.position.y = 12.5;
    veryHighPlatform2.position.z = 20;
    veryHighPlatform3.position.x = -400;
    veryHighPlatform3.position.y = 12.5;
    veryHighPlatform3.position.z = 0;
    veryHighPlatform4.position.x = 370;
    veryHighPlatform4.position.y = 12.5;
    veryHighPlatform4.position.z = 0;

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
    veryHighPlatform5.position.x = -300;
    veryHighPlatform5.position.y = 12.5;
    veryHighPlatform5.position.z = -300;
    veryHighPlatform6.position.x = -200;
    veryHighPlatform6.position.y = 12.5;
    veryHighPlatform6.position.z = -200;

    wallPlane7.position.x = -300;
    wallPlane7.position.y =0;
    wallPlane7.position.z =-210;
    wallPlane7.rotation.set(0, Math.PI/2, 0);
    wallPlane8.position.x = -275;
    wallPlane8.position.y =0;
    wallPlane8.position.z =-235;
    wallPlane9.position.x = -325;
    wallPlane9.position.y =0;
    wallPlane9.position.z =-185;

    //East Wing Platforms:
    veryHighPlatform7.position.x = 275;
    veryHighPlatform7.position.y = 12.5;
    veryHighPlatform7.position.z = -285;
    veryHighPlatform8.position.x = 225;
    veryHighPlatform8.position.y = 12.5;
    veryHighPlatform8.position.z = -235;

    platform10.position.x = 195;
    platform10.position.y = 0;
    platform10.position.z = -315;
    platform11.position.x = 305;
    platform11.position.y = 0;
    platform11.position.z = -205;

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

    //North Wing Centre Piece
    veryHighPlatform9.position.x = 40;
    veryHighPlatform9.position.y = 12.5;
    veryHighPlatform9.position.z = -570;
    veryHighPlatform10.position.x = -40;
    veryHighPlatform10.position.y = 12.5;
    veryHighPlatform10.position.z = -480;

    wallPlane10.position.x = 40;
    wallPlane10.position.y =0;
    wallPlane10.position.z =-455;
    wallPlane11.position.x = -40;
    wallPlane11.position.y =0;
    wallPlane11.position.z =-595;

    veryHighPlatform11.position.x = 90;
    veryHighPlatform11.position.y = 12.5;
    veryHighPlatform11.position.z = -570;
    veryHighPlatform12.position.x = 90;
    veryHighPlatform12.position.y = 12.5;
    veryHighPlatform12.position.z = -480;
    veryHighPlatform13.position.x = -90;
    veryHighPlatform13.position.y = 12.5;
    veryHighPlatform13.position.z = -570;
    veryHighPlatform14.position.x = -90;
    veryHighPlatform14.position.y = 12.5;
    veryHighPlatform14.position.z = -480;

    wallPlane12.position.x = 90;
    wallPlane12.position.y =25;
    wallPlane12.position.z =-520;
    wallPlane12.rotation.set(Math.PI/2, 0, 0);
    wallPlane13.position.x = -90;
    wallPlane13.position.y =25;
    wallPlane13.position.z =-520;
    wallPlane13.rotation.set(Math.PI/2, 0, 0);

    highPlatform11.position.x = -140;
    highPlatform11.position.y = 0;
    highPlatform11.position.z = -570;
    highPlatform12.position.x = 140;
    highPlatform12.position.y = 0;
    highPlatform12.position.z = -480;

    palmTree1.position.x = -480;
    palmTree1.position.y = 0;
    palmTree1.position.z = -100;
    palmTree1.scale.set(10,10,10);
     palmTree2.position.x = -210;
    palmTree2.position.y = 0;
    palmTree2.position.z = -360;
    palmTree2.scale.set(15,15,15);
     palmTree3.position.x = 350;
    palmTree3.position.y = 0;
    palmTree3.position.z = -160;
    palmTree3.scale.set(20,20,20);
     palmTree4.position.x = 180;
    palmTree4.position.y = 0;
    palmTree4.position.z = -610;
    palmTree4.scale.set(30,30,30);

    endpad.position.x = 297;
    endpad.position.y = 10;
    endpad.position.z = -519;

}

function getarrMap1(){
  moveobjectsMap1();
  genarrMap1();
}

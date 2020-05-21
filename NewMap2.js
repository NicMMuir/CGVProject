var ObjectsMap1Arr = [];
var EnemyList = [];
var camera, controls, scene, renderer, stats;
var Mesh, oceanGeometry, oceanMaterial, clock;

//Skybox
var enmy = new THREE.Object3D();

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

let skyboxGeo = new THREE.BoxGeometry( 2000, 1000, 2000);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );



//Textures
var MainFloortexture = new THREE.TextureLoader().load( 'Textures/Grass.jpg' );
var lavaRockMaterial = new THREE.MeshBasicMaterial( { map: MainFloortexture, side: THREE.DoubleSide } );
var Startpadtexture = new THREE.TextureLoader().load( 'Textures/start.jpg' );
var Startpadmaterial = new THREE.MeshBasicMaterial( { map: Startpadtexture, side: THREE.DoubleSide } );
var waterTexture = new THREE.TextureLoader().load( 'Textures/water.jpg' );
var waterMat = new THREE.MeshBasicMaterial( { map: waterTexture } );
var mountRockTexture = new THREE.TextureLoader().load( 'Textures/mountainRock.jpg' );
var mountRockMat = new THREE.MeshBasicMaterial( { map: mountRockTexture, polygonOffset: true, polygonOffsetUnits: 1,
polygonOffsetFactor: 1, side: THREE.DoubleSide } );
var lavaRockTexture = new THREE.TextureLoader().load( 'Textures/lavaRock.jpg' );
var lavaRockMaterial = new THREE.MeshBasicMaterial( { map: lavaRockTexture, side: THREE.DoubleSide } );

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
var platformGeometry = new THREE.BoxGeometry( 50, 10, 50 );
var highPlatformGeometry = new THREE.BoxGeometry( 50, 20, 50 );
var veryHighPlatformGeometry = new THREE.BoxGeometry( 50, 50, 50 );
var wallGeometry = new THREE.PlaneGeometry(50,50);

//Mesh:
var startpad = new THREE.Mesh( startpadgeom, Startpadmaterial );
var SotheSeg = new THREE.Mesh( SouthSegmentgeom , lavaRockMaterial );
var NorthEastSeg = new THREE.Mesh( NorthEastSegmentgeom , lavaRockMaterial );
var NorthWestSeg = new THREE.Mesh( NorthWestSegmentgeom , lavaRockMaterial );
var NorthSeg = new THREE.Mesh( SouthSegmentgeom , lavaRockMaterial );



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

 oceanMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, map: texture } );
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
var centreBridge = new THREE.Object3D();
var loader = new THREE.GLTFLoader();
loader.load('./3DObjects/LongBridge/scene.gltf', function(gltf){
    centreBridge.add(gltf.scene);
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
var loader = new THREE.GLTFLoader();
loader.load('./3DObjects/GlowingRock/scene.gltf', function(gltf){
    gltf.scene.scale.set(1.5,1.5,1.5);
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
var transGeometry = new THREE.BoxGeometry(15,20,45);
var rightTransBox = new THREE.Mesh(transGeometry, transMaterial);
var leftTransBox = new THREE.Mesh(transGeometry, transMaterial);



function genarrMap1(){
  scene.fog = new THREE.FogExp2( 0xaaccff, 0.0007 );
  scene.add(oceanMesh)

  enmy = GenEnemey();
  enmy.position.x = 10;
  enmy.position.z = 0;
  enmy.position.y = 0;
  enmy.scale.x = 3;
  enmy.scale.y = 3;
  enmy.scale.z = 3;
  ObjectsMap1Arr.push(enmy);
  EnemyList.push(enmy);
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


  // ObjectsMap1Arr.push(skybox);
  scene.add( skybox )
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



}


function getarrMap1(){
  moveobjectsMap1();
  genarrMap1();
}

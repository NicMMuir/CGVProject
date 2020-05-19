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

let skyboxGeo = new THREE.BoxGeometry( 1000, 1000, 1000);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );



//Textures
var MainFloortexture = new THREE.TextureLoader().load( 'Textures/Grass.jpg' );
var MainFloormaterial = new THREE.MeshBasicMaterial( { map: MainFloortexture, side: THREE.DoubleSide } );
var Startpadtexture = new THREE.TextureLoader().load( 'Textures/start.jpg' );
var Startpadmaterial = new THREE.MeshBasicMaterial( { map: Startpadtexture, side: THREE.DoubleSide } );
var waterTexture = new THREE.TextureLoader().load( 'Textures/water.jpg' );
var waterMat = new THREE.MeshBasicMaterial( { map: waterTexture } );
var woodTexture = new THREE.TextureLoader().load( 'Textures/wood.jpg' );
var woodMat = new THREE.MeshBasicMaterial( { map: woodTexture, polygonOffset: true, polygonOffsetUnits: 1,
polygonOffsetFactor: 1, side: THREE.DoubleSide } );
var transMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    opacity: 0.8,
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
var SotheSeg = new THREE.Mesh( SouthSegmentgeom , MainFloormaterial );
var NorthEastSeg = new THREE.Mesh( NorthEastSegmentgeom , MainFloormaterial );
var NorthWestSeg = new THREE.Mesh( NorthWestSegmentgeom , MainFloormaterial );
var NorthSeg = new THREE.Mesh( SouthSegmentgeom , MainFloormaterial );



 oceanGeometry = new THREE.PlaneBufferGeometry( 1000, 1000, 128-1, 128-1);
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
var centreBridge = new THREE.Object3D();
var loader = new THREE.GLTFLoader();
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

var veryHighPlatform1 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);
var veryHighPlatform2 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);
var veryHighPlatform3 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);
var veryHighPlatform4 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);

var wallPlane1 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane2 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane3 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane4 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane5 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane6 = new THREE.Mesh(wallGeometry, woodMat);



//West Wing platforms
var veryHighPlatform5 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);
var veryHighPlatform6 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);

var wallPlane7 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane8 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane9 = new THREE.Mesh(wallGeometry, woodMat);

//East Wing Platforms
var veryHighPlatform7 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);
var veryHighPlatform8 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);

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
var veryHighPlatform9 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);
var veryHighPlatform10 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);

var wallPlane10 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane11 = new THREE.Mesh(wallGeometry, woodMat);

var veryHighPlatform11 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);
var veryHighPlatform12 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);
var veryHighPlatform13 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);
var veryHighPlatform14 = new THREE.Mesh(veryHighPlatformGeometry, woodMat);

var wallPlane12 = new THREE.Mesh(wallGeometry, woodMat);
var wallPlane13 = new THREE.Mesh(wallGeometry, woodMat);






//transparent floor geometry (Goes under the small bridge)
var transGeometry = new THREE.BoxGeometry(15,20,45);
var rightTransBox = new THREE.Mesh(transGeometry, transMaterial);
var leftTransBox = new THREE.Mesh(transGeometry, transMaterial);



function genarrMap1(){
  scene.add(oceanMesh)

  enmy = GenEnemey();
  enmy.position.x = 10;
  enmy.position.z = 0;
  enmy.position.y = 0;
  enmy.scale.x = 3;
  enmy.scale.y = 3;
  enmy.scale.z = 3;
  EnemyList.push(enmy);
  ObjectsMap1Arr.push(startpad);
  ObjectsMap1Arr.push(SotheSeg);
  ObjectsMap1Arr.push(NorthEastSeg);
  ObjectsMap1Arr.push(NorthWestSeg);
  ObjectsMap1Arr.push(NorthSeg);
  // ObjectsMap1Arr.push(sandHill);

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

  ObjectsMap1Arr.push(skybox);
  // scene.add( skybox );

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

    veryHighPlatform1.position.x = -210;
    veryHighPlatform1.position.y = 0;
    veryHighPlatform1.position.z = 20;
    veryHighPlatform2.position.x = 210;
    veryHighPlatform2.position.y = 0;
    veryHighPlatform2.position.z = 20;
    veryHighPlatform3.position.x = -400;
    veryHighPlatform3.position.y = 0;
    veryHighPlatform3.position.z = 0;
    veryHighPlatform4.position.x = 370;
    veryHighPlatform4.position.y = 0;
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
    veryHighPlatform5.position.y = 0;
    veryHighPlatform5.position.z = -300;
    veryHighPlatform6.position.x = -200;
    veryHighPlatform6.position.y = 0;
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
    veryHighPlatform7.position.y = 0;
    veryHighPlatform7.position.z = -285;
    veryHighPlatform8.position.x = 225;
    veryHighPlatform8.position.y = 0;
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
    veryHighPlatform9.position.y = 0;
    veryHighPlatform9.position.z = -570;
    veryHighPlatform10.position.x = -40;
    veryHighPlatform10.position.y = 0;
    veryHighPlatform10.position.z = -480;

    wallPlane10.position.x = 40;
    wallPlane10.position.y =0;
    wallPlane10.position.z =-455;
    wallPlane11.position.x = -40;
    wallPlane11.position.y =0;
    wallPlane11.position.z =-595;

    veryHighPlatform11.position.x = 90;
    veryHighPlatform11.position.y = 0;
    veryHighPlatform11.position.z = -570;
    veryHighPlatform12.position.x = 90;
    veryHighPlatform12.position.y = 0;
    veryHighPlatform12.position.z = -480;
    veryHighPlatform13.position.x = -90;
    veryHighPlatform13.position.y = 0;
    veryHighPlatform13.position.z = -570;
    veryHighPlatform14.position.x = -90;
    veryHighPlatform14.position.y = 0;
    veryHighPlatform14.position.z = -480;

    wallPlane12.position.x = 90;
    wallPlane12.position.y =25;
    wallPlane12.position.z =-520;
    wallPlane12.rotation.set(Math.PI/2, 0, 0);
    wallPlane13.position.x = -90;
    wallPlane13.position.y =25;
    wallPlane13.position.z =-520;
    wallPlane13.rotation.set(Math.PI/2, 0, 0);

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



}


function getarrMap1(){
  moveobjectsMap1();
  genarrMap1();
}

var ObjectsMap1Arr = [];
var EnemyList = [];
var End;
var Mesh, oceanGeometry, oceanMaterial, clock;
var sphereCamera;
var End;
var enmy = new THREE.Object3D();

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

  //Load Curved Spiky Enemy Model
  //loadingManager is called here
  //Once this enemy model is loaded, then only is the loading screen removed 
  var CurvyEnemi = [];
  var CurvyEnemiShort = [];
  var CurvyEnemiLong = [];
var loader = new THREE.GLTFLoader( loadingManager );
loader.load('./3DObjects/Enemy/scene.gltf', function(gltf){
    var poison1 = gltf.scene.getObjectByName("mesh_0");
    var poison2 = gltf.scene.getObjectByName("mesh_2");
    var poison3 = gltf.scene.getObjectByName("mesh_4");
    var poison4 = gltf.scene.getObjectByName("mesh_5");

    var parent1 = poison4.parent;
    parent1.remove( poison1 );
    parent1.remove( poison2 );
    parent1.remove( poison3 );
    parent1.remove( poison4 );

    gltf.scene.scale.set(2,2,2);

    //curveEnemy 1 to 12 move in z-axis
    var curveEnemy1 = gltf.scene;
    curveEnemy1.position.x = -1800;
    curveEnemy1.position.y = 258;
    curveEnemy1.position.z = 1000;
    
    scene.add(curveEnemy1);
    EnemyList.push(curveEnemy1);
    CurvyEnemi.push(curveEnemy1);

    var curveEnemy2 = gltf.scene.clone();
    curveEnemy2.position.x = -1690;
    curveEnemy2.position.y = 258;
    curveEnemy2.position.z = 1000;
    
    scene.add(curveEnemy2);
    EnemyList.push(curveEnemy2);
    CurvyEnemi.push(curveEnemy2);

    var curveEnemy3 = gltf.scene.clone();
    curveEnemy3.position.x = -1600;
    curveEnemy3.position.y = 258;
    curveEnemy3.position.z = 1000;
    
    scene.add(curveEnemy3);
    EnemyList.push(curveEnemy3);
    CurvyEnemi.push(curveEnemy3);

    var curveEnemy4 = gltf.scene.clone();
    curveEnemy4.position.x = -1390;
    curveEnemy4.position.y = 258;
    curveEnemy4.position.z = 1000;
    
    scene.add(curveEnemy4);
    EnemyList.push(curveEnemy4);
    CurvyEnemi.push(curveEnemy4);

    var curveEnemy5 = gltf.scene.clone();
    curveEnemy5.position.x = -1290;
    curveEnemy5.position.y = 258;
    curveEnemy5.position.z = 1000;
    
    scene.add(curveEnemy5);
    EnemyList.push(curveEnemy5);
    CurvyEnemi.push(curveEnemy5);

    var curveEnemy6 = gltf.scene.clone();
    curveEnemy6.position.x = -1200;
    curveEnemy6.position.y = 258;
    curveEnemy6.position.z = 1000;
    
    scene.add(curveEnemy6);
    EnemyList.push(curveEnemy6);
    CurvyEnemi.push(curveEnemy6);

    var curveEnemy7 = gltf.scene.clone();
    curveEnemy7.position.x = -1100;
    curveEnemy7.position.y = 258;
    curveEnemy7.position.z = 1000;
    
    scene.add(curveEnemy7);
    EnemyList.push(curveEnemy7);
    CurvyEnemi.push(curveEnemy7);

    var curveEnemy8 = gltf.scene.clone();
    curveEnemy8.position.x = -1000;
    curveEnemy8.position.y = 258;
    curveEnemy8.position.z = 1000;
    
    scene.add(curveEnemy8);
    EnemyList.push(curveEnemy8);
    CurvyEnemi.push(curveEnemy8);

    var curveEnemy9 = gltf.scene.clone();
    curveEnemy9.position.x = -500;
    curveEnemy9.position.y = 208;
    curveEnemy9.position.z = 1000;
    
    scene.add(curveEnemy9);
    EnemyList.push(curveEnemy9);
    CurvyEnemi.push(curveEnemy9);

    var curveEnemy10 = gltf.scene.clone();
    curveEnemy10.position.x = -340;
    curveEnemy10.position.y = 208;
    curveEnemy10.position.z = 1000;
    
    scene.add(curveEnemy10);
    EnemyList.push(curveEnemy10);
    CurvyEnemi.push(curveEnemy10);

    var curveEnemy11 = gltf.scene.clone();
    curveEnemy11.position.x = -240;
    curveEnemy11.position.y = 208;
    curveEnemy11.position.z = 1000;
    
    scene.add(curveEnemy11);
    EnemyList.push(curveEnemy11);
    CurvyEnemi.push(curveEnemy11);

    var curveEnemy12 = gltf.scene.clone();
    curveEnemy12.position.x = -140;
    curveEnemy12.position.y = 208;
    curveEnemy12.position.z = 1000;
    
    scene.add(curveEnemy12);
    EnemyList.push(curveEnemy12);
    CurvyEnemi.push(curveEnemy12);

    //curveEnemy 13 to 20 move along x-axis
    var curveEnemy13 = gltf.scene.clone();
    curveEnemy13.position.x = -1750;
    curveEnemy13.position.y = 258;
    curveEnemy13.position.z = 1115;
    
    scene.add(curveEnemy13);
    EnemyList.push(curveEnemy13);
    CurvyEnemiLong.push(curveEnemy13);

    var curveEnemy14 = gltf.scene.clone();
    curveEnemy14.position.x = -1750;
    curveEnemy14.position.y = 258;
    curveEnemy14.position.z = 1000;
    
    scene.add(curveEnemy14);
    EnemyList.push(curveEnemy14);
    CurvyEnemiLong.push(curveEnemy14);

    var curveEnemy15 = gltf.scene.clone();
    curveEnemy15.position.x = -1750;
    curveEnemy15.position.y = 258;
    curveEnemy15.position.z = 900;
    
    scene.add(curveEnemy15);
    EnemyList.push(curveEnemy15);
    CurvyEnemiLong.push(curveEnemy15);

    var curveEnemy16 = gltf.scene.clone();
    curveEnemy16.position.x = -1220;
    curveEnemy16.position.y = 258;
    curveEnemy16.position.z = 1115;
    
    scene.add(curveEnemy16);
    EnemyList.push(curveEnemy16);
    CurvyEnemiLong.push(curveEnemy16);

    var curveEnemy17 = gltf.scene.clone();
    curveEnemy17.position.x = -1220;
    curveEnemy17.position.y = 258;
    curveEnemy17.position.z = 1000;
    
    scene.add(curveEnemy17);
    EnemyList.push(curveEnemy17);
    CurvyEnemiLong.push(curveEnemy17);

    var curveEnemy18 = gltf.scene.clone();
    curveEnemy18.position.x = -1220;
    curveEnemy18.position.y = 258;
    curveEnemy18.position.z = 900;
    
    scene.add(curveEnemy18);
    EnemyList.push(curveEnemy18);
    CurvyEnemiLong.push(curveEnemy18);

    var curveEnemy19 = gltf.scene.clone();
    curveEnemy19.position.x = -355;
    curveEnemy19.position.y = 208;
    curveEnemy19.position.z = 1100;
    
    scene.add(curveEnemy19);
    EnemyList.push(curveEnemy19);
    CurvyEnemiLong.push(curveEnemy19);

    var curveEnemy20 = gltf.scene.clone();
    curveEnemy20.position.x = -355;
    curveEnemy20.position.y = 208;
    curveEnemy20.position.z = 930;
    
    scene.add(curveEnemy20);
    EnemyList.push(curveEnemy20);
    CurvyEnemiLong.push(curveEnemy20);

    //curveEnemy 21 to 28 move along z-axis (short)
    //Going to the right, around fantasyRing
    var curveEnemy21 = gltf.scene.clone();
    curveEnemy21.position.x = -221;
    curveEnemy21.position.y = 208;
    curveEnemy21.position.z = -142;
    
    scene.add(curveEnemy21);
    EnemyList.push(curveEnemy21);
    CurvyEnemiShort.push(curveEnemy21);

    var curveEnemy22 = gltf.scene.clone();
    curveEnemy22.position.x = -59;
    curveEnemy22.position.y = 208;
    curveEnemy22.position.z = -210;
    
    scene.add(curveEnemy22);
    EnemyList.push(curveEnemy22);
    CurvyEnemiShort.push(curveEnemy22);

    var curveEnemy23 = gltf.scene.clone();
    curveEnemy23.position.x = -1;
    curveEnemy23.position.y = 208;
    curveEnemy23.position.z = -785;
    
    scene.add(curveEnemy23);
    EnemyList.push(curveEnemy23);
    CurvyEnemiShort.push(curveEnemy23);

    var curveEnemy24 = gltf.scene.clone();
    curveEnemy24.position.x = -229;
    curveEnemy24.position.y = 208;
    curveEnemy24.position.z = -907;
    
    scene.add(curveEnemy24);
    EnemyList.push(curveEnemy24);
    CurvyEnemiShort.push(curveEnemy24);

    var curveEnemy25 = gltf.scene.clone();
    curveEnemy25.position.x = -371;
    curveEnemy25.position.y = 208;
    curveEnemy25.position.z = -907;
    
    scene.add(curveEnemy25);
    EnemyList.push(curveEnemy25);
    CurvyEnemiShort.push(curveEnemy25);
    
    var curveEnemy26 = gltf.scene.clone();
    curveEnemy26.position.x = -599;
    curveEnemy26.position.y = 208;
    curveEnemy26.position.z = -785;
    
    scene.add(curveEnemy26);
    EnemyList.push(curveEnemy26);
    CurvyEnemiShort.push(curveEnemy26);

    var curveEnemy27 = gltf.scene.clone();
    curveEnemy27.position.x = -541;
    curveEnemy27.position.y = 208;
    curveEnemy27.position.z = -210;
    
    scene.add(curveEnemy27);
    EnemyList.push(curveEnemy27);
    CurvyEnemiShort.push(curveEnemy27);

    var curveEnemy28 = gltf.scene.clone();
    curveEnemy28.position.x = -379;
    curveEnemy28.position.y = 208;
    curveEnemy28.position.z = -142;

    scene.add(curveEnemy28);
    EnemyList.push(curveEnemy28);
    CurvyEnemiShort.push(curveEnemy28);


//For each curvedEnemy in the CurvyEnemi list, move them between two points
//We use the tween function and the elastic.inOut easing motion
//TargetPositionZ is the positive Z axis motion + point stop one
//TargetPositionNZ is the negative Z axis motion + point stop two
for (i=0; i<CurvyEnemi.length; i++){
   var  targetPositionZ = CurvyEnemi[i].position.z += 118;
  var  targetPositionNZ = CurvyEnemi[i].position.z += -219;

var targetPosition1 = new THREE.Vector3(  CurvyEnemi[i].position, CurvyEnemi[i].position, targetPositionZ );
    var targetPosition2 = new THREE.Vector3( CurvyEnemi[i].position, CurvyEnemi[i].position, targetPositionNZ );
    
    var tween1 = new TWEEN.Tween( CurvyEnemi[i].position ).to( targetPosition1, 5000 ).easing(TWEEN.Easing.Bounce.InOut);//10000 = 10sec, time.. 
    var tween2 = new TWEEN.Tween( CurvyEnemi[i].position ).to( targetPosition2, 5000 ).easing(TWEEN.Easing.Bounce.InOut);//..it takes to move.. 
    
    tween1.chain( tween2 );
    tween2.chain( tween1 );

    if (i % 2 == 0){ //for every even enemy in list, move in opposite direction to odd enemy in list  
    tween1.start();
    }
    else{ //If odd
    tween2.start();
    }
    
}

//This for loop is the same as above...
//...distance between two points is shorter
for (i=0; i<CurvyEnemiShort.length; i++){
   var  targetPositionZ = CurvyEnemiShort[i].position.z += 30;
  var  targetPositionNZ = CurvyEnemiShort[i].position.z += -50;

var targetPosition1 = new THREE.Vector3(  CurvyEnemiShort[i].position, CurvyEnemiShort[i].position, targetPositionZ );
    var targetPosition2 = new THREE.Vector3( CurvyEnemiShort[i].position, CurvyEnemiShort[i].position, targetPositionNZ );
    
    var tween1 = new TWEEN.Tween( CurvyEnemiShort[i].position ).to( targetPosition1 ).easing(TWEEN.Easing.Elastic.InOut);//10000 = 10sec, time.. 
    var tween2 = new TWEEN.Tween( CurvyEnemiShort[i].position ).to( targetPosition2 ).easing(TWEEN.Easing.Elastic.InOut);//..it takes to move.. 
    
    tween1.chain( tween2 );
    tween2.chain( tween1 );
    
    if (i % 2 == 0){ //for every even enemy in list, move in opposite direction to odd enemy in list  
    tween1.start();
    }
    else{ //If odd
    tween2.start();
    }
}

//This for loop is the same as above...
//Moving along the X-axis
//...distance between two points is longest
for (i=0; i<CurvyEnemiLong.length; i++){
   var  targetPositionX = CurvyEnemiLong[i].position.x += 230;
  var  targetPositionNX = CurvyEnemiLong[i].position.x += -460;

var targetPosition1 = new THREE.Vector3(  targetPositionX, CurvyEnemiLong[i].position, CurvyEnemiLong[i].position  );
    var targetPosition2 = new THREE.Vector3( targetPositionNX, CurvyEnemiLong[i].position, CurvyEnemiLong[i].position  );
    
    var tween1 = new TWEEN.Tween( CurvyEnemiLong[i].position ).to( targetPosition1, 5000 ).easing(TWEEN.Easing.Bounce.InOut);//10000 = 10sec, time.. 
    var tween2 = new TWEEN.Tween( CurvyEnemiLong[i].position ).to( targetPosition2, 5000 ).easing(TWEEN.Easing.Bounce.InOut);//..it takes to move.. 
    
    tween1.chain( tween2 );
    tween2.chain( tween1 );

    if (i % 2 == 0){ //for every even enemy in list, move in opposite direction to odd enemy in list  
    tween1.start();
    }
    else{ //If odd
    tween2.start();
    }
    
}


});



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


  End = endpad;
  ObjectsMap1Arr.push(endpad);


  ObjectsMap1Arr.push(enmy);
  EnemyList.push(enmy);

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

fantasyBridge.position.x = -300;
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

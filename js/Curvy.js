//Adding all the curvedEnemies to CurvyMap functions
//Postions, scale of enemy, TWEEN movement 
//This js file is called in init()


function CurvyMap1() { //Curved enemy data for Map 1

 //Load Curved Spiky Enemy Model
  var CurvyEnemi1 = [];
var loader = new THREE.GLTFLoader();
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

    var curveEnemy1 = gltf.scene;
    curveEnemy1.position.x = -315;
    curveEnemy1.position.y = -2;
    curveEnemy1.position.z = 0;
    
    scene.add(curveEnemy1);
    EnemyList.push(curveEnemy1);
    CurvyEnemi1.push(curveEnemy1);

    var curveEnemy2 = gltf.scene.clone();
    curveEnemy2.position.x = 315;
    curveEnemy2.position.y = -2;
    curveEnemy2.position.z = 0;
    
    scene.add(curveEnemy2);
    EnemyList.push(curveEnemy2);
    CurvyEnemi1.push(curveEnemy2);

    var curveEnemy3 = gltf.scene.clone();
    curveEnemy3.position.x = 165;
    curveEnemy3.position.y = -2;
    curveEnemy3.position.z = -260;
    
    scene.add(curveEnemy3);
    EnemyList.push(curveEnemy3);
    CurvyEnemi1.push(curveEnemy3);

    var curveEnemy4 = gltf.scene.clone();
    curveEnemy4.position.x = -230;
    curveEnemy4.position.y = -2;
    curveEnemy4.position.z = -260;
    
    scene.add(curveEnemy4);
    EnemyList.push(curveEnemy4);
    CurvyEnemi1.push(curveEnemy4);

    var curveEnemy5 = gltf.scene.clone();
    curveEnemy5.position.x = 500;
    curveEnemy5.position.y = -2;
    curveEnemy5.position.z = -520;
    
    scene.add(curveEnemy5);
    EnemyList.push(curveEnemy5);
    CurvyEnemi1.push(curveEnemy5);

    var curveEnemy6 = gltf.scene.clone();
    curveEnemy6.position.x = 10;
    curveEnemy6.position.y = -2;
    curveEnemy6.position.z = -520;
    
    scene.add(curveEnemy6);
    EnemyList.push(curveEnemy6);
    CurvyEnemi1.push(curveEnemy6);

    var curveEnemy7 = gltf.scene.clone();
    curveEnemy7.position.x = -145;
    curveEnemy7.position.y = -2;
    curveEnemy7.position.z = -520;
    
    scene.add(curveEnemy7);
    EnemyList.push(curveEnemy7);
    CurvyEnemi1.push(curveEnemy7);


//For each curvedEnemy in the CurvyEnemi2 list, move them between two points
//We use the tween function and the elastic in-out easing motion
//TargetPositionZ is the positive Z axis motion + point stop one
//TargetPositionNZ is the negative Z axis motion + point stop two
for (i=0; i<CurvyEnemi1.length; i++){
   var  targetPositionZ = CurvyEnemi1[i].position.z += 93;
  var  targetPositionNZ = CurvyEnemi1[i].position.z += -170;

var targetPosition1 = new THREE.Vector3(  CurvyEnemi1[i].position, -2, targetPositionZ );
    var targetPosition2 = new THREE.Vector3( CurvyEnemi1[i].position, -2, targetPositionNZ );
    
    var tween1 = new TWEEN.Tween( CurvyEnemi1[i].position ).to( targetPosition1, 20000 ).easing(TWEEN.Easing.Elastic.InOut);//10000 = 10sec, time.. 
    var tween2 = new TWEEN.Tween( CurvyEnemi1[i].position ).to( targetPosition2, 10000 ).easing(TWEEN.Easing.Elastic.InOut);//..it takes to move.. 
    
    tween1.chain( tween2 );
    tween2.chain( tween1 );
    
    tween1.start();
}
});

}


function CurvyMap2(){ //Curved enemy data for Map 2

//Load Curved Spiky Enemy Model
  var CurvyEnemi2 = [];
  var CurvyEnemiShort2 = [];
var loader = new THREE.GLTFLoader();
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

    var curveEnemy1 = gltf.scene;
    curveEnemy1.position.x = -315;
    curveEnemy1.position.y = -2;
    curveEnemy1.position.z = 0;
    
    scene.add(curveEnemy1);
    EnemyList.push(curveEnemy1);
    CurvyEnemi2.push(curveEnemy1);

    var curveEnemy2 = gltf.scene.clone();
    curveEnemy2.position.x = 315;
    curveEnemy2.position.y = -2;
    curveEnemy2.position.z = 0;
    
    scene.add(curveEnemy2);
    EnemyList.push(curveEnemy2);
    CurvyEnemi2.push(curveEnemy2);

    var curveEnemy3 = gltf.scene.clone();
    curveEnemy3.position.x = 165;
    curveEnemy3.position.y = -2;
    curveEnemy3.position.z = -260;
    
    scene.add(curveEnemy3);
    EnemyList.push(curveEnemy3);
    CurvyEnemi2.push(curveEnemy3);

    var curveEnemy4 = gltf.scene.clone();
    curveEnemy4.position.x = -230;
    curveEnemy4.position.y = -2;
    curveEnemy4.position.z = -260;
    
    scene.add(curveEnemy4);
    EnemyList.push(curveEnemy4);
    CurvyEnemi2.push(curveEnemy4);

    var curveEnemy5 = gltf.scene.clone();
    curveEnemy5.position.x = 500;
    curveEnemy5.position.y = -2;
    curveEnemy5.position.z = -520;
    
    scene.add(curveEnemy5);
    EnemyList.push(curveEnemy5);
    CurvyEnemi2.push(curveEnemy5);

    var curveEnemy6 = gltf.scene.clone();
    curveEnemy6.position.x = 10;
    curveEnemy6.position.y = -2;
    curveEnemy6.position.z = -520;
    
    scene.add(curveEnemy6);
    EnemyList.push(curveEnemy6);
    CurvyEnemi2.push(curveEnemy6);

    var curveEnemy7 = gltf.scene.clone();
    curveEnemy7.position.x = -145;
    curveEnemy7.position.y = -2;
    curveEnemy7.position.z = -520;
    
    scene.add(curveEnemy7);
    EnemyList.push(curveEnemy7);
    CurvyEnemi2.push(curveEnemy7);

    var curveEnemy8 = gltf.scene.clone();
    curveEnemy8.position.x = 0;
    curveEnemy8.position.y = 1;
    curveEnemy8.position.z = -260;
    
    scene.add(curveEnemy8);
    EnemyList.push(curveEnemy8);
    CurvyEnemiShort2.push(curveEnemy8);

    var curveEnemy9 = gltf.scene.clone();
    curveEnemy9.position.x = 215;
    curveEnemy9.position.y = -2;
    curveEnemy9.position.z = -140;
    
    scene.add(curveEnemy9);
    EnemyList.push(curveEnemy9);
    CurvyEnemiShort2.push(curveEnemy9);

    var curveEnemy10 = gltf.scene.clone();
    curveEnemy10.position.x = -185;
    curveEnemy10.position.y = -2;
    curveEnemy10.position.z = -400;
    
    scene.add(curveEnemy10);
    EnemyList.push(curveEnemy10);
    CurvyEnemiShort2.push(curveEnemy10);


//For each curvedEnemy in the CurvyEnemi2 list, move them between two points
//We use the tween function and the elastic.inOut easing motion
//TargetPositionZ is the positive Z axis motion + point stop one
//TargetPositionNZ is the negative Z axis motion + point stop two
for (i=0; i<CurvyEnemi2.length; i++){
   var  targetPositionZ = CurvyEnemi2[i].position.z += 118;
  var  targetPositionNZ = CurvyEnemi2[i].position.z += -219;

var targetPosition1 = new THREE.Vector3(  CurvyEnemi2[i].position, -2, targetPositionZ );
    var targetPosition2 = new THREE.Vector3( CurvyEnemi2[i].position, -2, targetPositionNZ );
    
    var tween1 = new TWEEN.Tween( CurvyEnemi2[i].position ).to( targetPosition1, 5000 ).easing(TWEEN.Easing.Bounce.InOut);//10000 = 10sec, time.. 
    var tween2 = new TWEEN.Tween( CurvyEnemi2[i].position ).to( targetPosition2, 5000 ).easing(TWEEN.Easing.Bounce.InOut);//..it takes to move.. 
    
    tween1.chain( tween2 );
    tween2.chain( tween1 );
    
    tween1.start();
}

//This for loop is the same as above...
//...distance between two points is shorter
for (i=0; i<CurvyEnemiShort2.length; i++){
   var  targetPositionZ = CurvyEnemiShort2[i].position.z += 28;
  var  targetPositionNZ = CurvyEnemiShort2[i].position.z += -19;

var targetPosition1 = new THREE.Vector3(  CurvyEnemiShort2[i].position, CurvyEnemiShort2[i].position, targetPositionZ );
    var targetPosition2 = new THREE.Vector3( CurvyEnemiShort2[i].position, CurvyEnemiShort2[i].position, targetPositionNZ );
    
    var tween1 = new TWEEN.Tween( CurvyEnemiShort2[i].position ).to( targetPosition1 ).easing(TWEEN.Easing.Elastic.InOut);//10000 = 10sec, time.. 
    var tween2 = new TWEEN.Tween( CurvyEnemiShort2[i].position ).to( targetPosition2 ).easing(TWEEN.Easing.Elastic.InOut);//..it takes to move.. 
    
    tween1.chain( tween2 );
    tween2.chain( tween1 );
    
    tween1.start();
}
});

}


function CurvyMap3 (){ //Curved enemy data for Map 3
	//Load Curved Spiky Enemy Model
  //loadingManager is called here
  //Once this enemy model is loaded, then only is the loading screen removed 
  var CurvyEnemi3 = [];
  var CurvyEnemiShort3 = [];
  var CurvyEnemiLong3 = [];
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
    CurvyEnemi3.push(curveEnemy1);

    var curveEnemy2 = gltf.scene.clone();
    curveEnemy2.position.x = -1690;
    curveEnemy2.position.y = 258;
    curveEnemy2.position.z = 1000;
    
    scene.add(curveEnemy2);
    EnemyList.push(curveEnemy2);
    CurvyEnemi3.push(curveEnemy2);

    var curveEnemy3 = gltf.scene.clone();
    curveEnemy3.position.x = -1600;
    curveEnemy3.position.y = 258;
    curveEnemy3.position.z = 1000;
    
    scene.add(curveEnemy3);
    EnemyList.push(curveEnemy3);
    CurvyEnemi3.push(curveEnemy3);

    var curveEnemy4 = gltf.scene.clone();
    curveEnemy4.position.x = -1390;
    curveEnemy4.position.y = 258;
    curveEnemy4.position.z = 1000;
    
    scene.add(curveEnemy4);
    EnemyList.push(curveEnemy4);
    CurvyEnemi3.push(curveEnemy4);

    var curveEnemy5 = gltf.scene.clone();
    curveEnemy5.position.x = -1290;
    curveEnemy5.position.y = 258;
    curveEnemy5.position.z = 1000;
    
    scene.add(curveEnemy5);
    EnemyList.push(curveEnemy5);
    CurvyEnemi3.push(curveEnemy5);

    var curveEnemy6 = gltf.scene.clone();
    curveEnemy6.position.x = -1200;
    curveEnemy6.position.y = 258;
    curveEnemy6.position.z = 1000;
    
    scene.add(curveEnemy6);
    EnemyList.push(curveEnemy6);
    CurvyEnemi3.push(curveEnemy6);

    var curveEnemy7 = gltf.scene.clone();
    curveEnemy7.position.x = -1100;
    curveEnemy7.position.y = 258;
    curveEnemy7.position.z = 1000;
    
    scene.add(curveEnemy7);
    EnemyList.push(curveEnemy7);
    CurvyEnemi3.push(curveEnemy7);

    var curveEnemy8 = gltf.scene.clone();
    curveEnemy8.position.x = -1000;
    curveEnemy8.position.y = 258;
    curveEnemy8.position.z = 1000;
    
    scene.add(curveEnemy8);
    EnemyList.push(curveEnemy8);
    CurvyEnemi3.push(curveEnemy8);

    var curveEnemy9 = gltf.scene.clone();
    curveEnemy9.position.x = -500;
    curveEnemy9.position.y = 208;
    curveEnemy9.position.z = 1000;
    
    scene.add(curveEnemy9);
    EnemyList.push(curveEnemy9);
    CurvyEnemi3.push(curveEnemy9);

    var curveEnemy10 = gltf.scene.clone();
    curveEnemy10.position.x = -340;
    curveEnemy10.position.y = 208;
    curveEnemy10.position.z = 1000;
    
    scene.add(curveEnemy10);
    EnemyList.push(curveEnemy10);
    CurvyEnemi3.push(curveEnemy10);

    var curveEnemy11 = gltf.scene.clone();
    curveEnemy11.position.x = -240;
    curveEnemy11.position.y = 208;
    curveEnemy11.position.z = 1000;
    
    scene.add(curveEnemy11);
    EnemyList.push(curveEnemy11);
    CurvyEnemi3.push(curveEnemy11);

    var curveEnemy12 = gltf.scene.clone();
    curveEnemy12.position.x = -140;
    curveEnemy12.position.y = 208;
    curveEnemy12.position.z = 1000;
    
    scene.add(curveEnemy12);
    EnemyList.push(curveEnemy12);
    CurvyEnemi3.push(curveEnemy12);

    //curveEnemy 13 to 20 move along x-axis
    var curveEnemy13 = gltf.scene.clone();
    curveEnemy13.position.x = -1750;
    curveEnemy13.position.y = 258;
    curveEnemy13.position.z = 1115;
    
    scene.add(curveEnemy13);
    EnemyList.push(curveEnemy13);
    CurvyEnemiLong3.push(curveEnemy13);

    var curveEnemy14 = gltf.scene.clone();
    curveEnemy14.position.x = -1750;
    curveEnemy14.position.y = 258;
    curveEnemy14.position.z = 1000;
    
    scene.add(curveEnemy14);
    EnemyList.push(curveEnemy14);
    CurvyEnemiLong3.push(curveEnemy14);

    var curveEnemy15 = gltf.scene.clone();
    curveEnemy15.position.x = -1750;
    curveEnemy15.position.y = 258;
    curveEnemy15.position.z = 900;
    
    scene.add(curveEnemy15);
    EnemyList.push(curveEnemy15);
    CurvyEnemiLong3.push(curveEnemy15);

    var curveEnemy16 = gltf.scene.clone();
    curveEnemy16.position.x = -1220;
    curveEnemy16.position.y = 258;
    curveEnemy16.position.z = 1115;
    
    scene.add(curveEnemy16);
    EnemyList.push(curveEnemy16);
    CurvyEnemiLong3.push(curveEnemy16);

    var curveEnemy17 = gltf.scene.clone();
    curveEnemy17.position.x = -1220;
    curveEnemy17.position.y = 258;
    curveEnemy17.position.z = 1000;
    
    scene.add(curveEnemy17);
    EnemyList.push(curveEnemy17);
    CurvyEnemiLong3.push(curveEnemy17);

    var curveEnemy18 = gltf.scene.clone();
    curveEnemy18.position.x = -1220;
    curveEnemy18.position.y = 258;
    curveEnemy18.position.z = 900;
    
    scene.add(curveEnemy18);
    EnemyList.push(curveEnemy18);
    CurvyEnemiLong3.push(curveEnemy18);

    var curveEnemy19 = gltf.scene.clone();
    curveEnemy19.position.x = -355;
    curveEnemy19.position.y = 208;
    curveEnemy19.position.z = 1100;
    
    scene.add(curveEnemy19);
    EnemyList.push(curveEnemy19);
    CurvyEnemiLong3.push(curveEnemy19);

    var curveEnemy20 = gltf.scene.clone();
    curveEnemy20.position.x = -355;
    curveEnemy20.position.y = 208;
    curveEnemy20.position.z = 930;
    
    scene.add(curveEnemy20);
    EnemyList.push(curveEnemy20);
    CurvyEnemiLong3.push(curveEnemy20);

    //curveEnemy 21 to 28 move along z-axis (short)
    //Going to the right, around fantasyRing
    var curveEnemy21 = gltf.scene.clone();
    curveEnemy21.position.x = -221;
    curveEnemy21.position.y = 208;
    curveEnemy21.position.z = -142;
    
    scene.add(curveEnemy21);
    EnemyList.push(curveEnemy21);
    CurvyEnemiShort3.push(curveEnemy21);

    var curveEnemy22 = gltf.scene.clone();
    curveEnemy22.position.x = -59;
    curveEnemy22.position.y = 208;
    curveEnemy22.position.z = -210;
    
    scene.add(curveEnemy22);
    EnemyList.push(curveEnemy22);
    CurvyEnemiShort3.push(curveEnemy22);

    var curveEnemy23 = gltf.scene.clone();
    curveEnemy23.position.x = -1;
    curveEnemy23.position.y = 208;
    curveEnemy23.position.z = -785;
    
    scene.add(curveEnemy23);
    EnemyList.push(curveEnemy23);
    CurvyEnemiShort3.push(curveEnemy23);

    var curveEnemy24 = gltf.scene.clone();
    curveEnemy24.position.x = -229;
    curveEnemy24.position.y = 208;
    curveEnemy24.position.z = -907;
    
    scene.add(curveEnemy24);
    EnemyList.push(curveEnemy24);
    CurvyEnemiShort3.push(curveEnemy24);

    var curveEnemy25 = gltf.scene.clone();
    curveEnemy25.position.x = -371;
    curveEnemy25.position.y = 208;
    curveEnemy25.position.z = -907;
    
    scene.add(curveEnemy25);
    EnemyList.push(curveEnemy25);
    CurvyEnemiShort3.push(curveEnemy25);
    
    var curveEnemy26 = gltf.scene.clone();
    curveEnemy26.position.x = -599;
    curveEnemy26.position.y = 208;
    curveEnemy26.position.z = -785;
    
    scene.add(curveEnemy26);
    EnemyList.push(curveEnemy26);
    CurvyEnemiShort3.push(curveEnemy26);

    var curveEnemy27 = gltf.scene.clone();
    curveEnemy27.position.x = -541;
    curveEnemy27.position.y = 208;
    curveEnemy27.position.z = -210;
    
    scene.add(curveEnemy27);
    EnemyList.push(curveEnemy27);
    CurvyEnemiShort3.push(curveEnemy27);

    var curveEnemy28 = gltf.scene.clone();
    curveEnemy28.position.x = -379;
    curveEnemy28.position.y = 208;
    curveEnemy28.position.z = -142;

    scene.add(curveEnemy28);
    EnemyList.push(curveEnemy28);
    CurvyEnemiShort3.push(curveEnemy28);


//For each curvedEnemy in the CurvyEnemi3 list, move them between two points
//We use the tween function and the elastic.inOut easing motion
//TargetPositionZ is the positive Z axis motion + point stop one
//TargetPositionNZ is the negative Z axis motion + point stop two
for (i=0; i<CurvyEnemi3.length; i++){
   var  targetPositionZ = CurvyEnemi3[i].position.z += 118;
  var  targetPositionNZ = CurvyEnemi3[i].position.z += -219;

var targetPosition1 = new THREE.Vector3(  CurvyEnemi3[i].position, CurvyEnemi3[i].position, targetPositionZ );
    var targetPosition2 = new THREE.Vector3( CurvyEnemi3[i].position, CurvyEnemi3[i].position, targetPositionNZ );
    
    var tween1 = new TWEEN.Tween( CurvyEnemi3[i].position ).to( targetPosition1, 5000 ).easing(TWEEN.Easing.Bounce.InOut);//10000 = 10sec, time.. 
    var tween2 = new TWEEN.Tween( CurvyEnemi3[i].position ).to( targetPosition2, 5000 ).easing(TWEEN.Easing.Bounce.InOut);//..it takes to move.. 
    
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
for (i=0; i<CurvyEnemiShort3.length; i++){
   var  targetPositionZ = CurvyEnemiShort3[i].position.z += 30;
  var  targetPositionNZ = CurvyEnemiShort3[i].position.z += -50;

var targetPosition1 = new THREE.Vector3(  CurvyEnemiShort3[i].position, CurvyEnemiShort3[i].position, targetPositionZ );
    var targetPosition2 = new THREE.Vector3( CurvyEnemiShort3[i].position, CurvyEnemiShort3[i].position, targetPositionNZ );
    
    var tween1 = new TWEEN.Tween( CurvyEnemiShort3[i].position ).to( targetPosition1 ).easing(TWEEN.Easing.Elastic.InOut);//10000 = 10sec, time.. 
    var tween2 = new TWEEN.Tween( CurvyEnemiShort3[i].position ).to( targetPosition2 ).easing(TWEEN.Easing.Elastic.InOut);//..it takes to move.. 
    
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
for (i=0; i<CurvyEnemiLong3.length; i++){
   var  targetPositionX = CurvyEnemiLong3[i].position.x += 230;
  var  targetPositionNX = CurvyEnemiLong3[i].position.x += -460;

var targetPosition1 = new THREE.Vector3(  targetPositionX, CurvyEnemiLong3[i].position, CurvyEnemiLong3[i].position  );
    var targetPosition2 = new THREE.Vector3( targetPositionNX, CurvyEnemiLong3[i].position, CurvyEnemiLong3[i].position  );
    
    var tween1 = new TWEEN.Tween( CurvyEnemiLong3[i].position ).to( targetPosition1, 5000 ).easing(TWEEN.Easing.Bounce.InOut);//10000 = 10sec, time.. 
    var tween2 = new TWEEN.Tween( CurvyEnemiLong3[i].position ).to( targetPosition2, 5000 ).easing(TWEEN.Easing.Bounce.InOut);//..it takes to move.. 
    
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

}
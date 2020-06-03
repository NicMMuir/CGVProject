//Adding all the Spintop to spinTopMap functions
//Postions, scale of enemy, TWEEN movement
//This js file is called in init()
var spinTop1;
var spinTop2;
var spinTop3;

function SpinTopMap2() { //Spintop enemy data for Map 1

 //Load SpinTop Enemy Model
  var spinToplist1 = [];
var loader = new THREE.GLTFLoader();
loader.load('./3DObjects/Enemy/scene.gltf', function(gltf){
    var poison1 = gltf.scene.getObjectByName("mesh_1");
    var poison2 = gltf.scene.getObjectByName("mesh_3");
    var poison3 = gltf.scene.getObjectByName("mesh_0");
    var poison4 = gltf.scene.getObjectByName("mesh_4");

    var parent1 = poison4.parent;
    parent1.remove( poison1 );
    parent1.remove( poison2 );
    parent1.remove( poison3 );
    parent1.remove( poison4 );

    gltf.scene.scale.set(2,2,2);

    spinTop1 = gltf.scene;
    spinTop1.position.x = -15;
    spinTop1.position.y = 10;
    spinTop1.position.z = -80;


    scene.add(spinTop1);
    EnemyList.push(spinTop1);

    spinTop2 = gltf.scene.clone();
    spinTop2.position.x = 176;
    spinTop2.position.y = 5.2;
    spinTop2.position.z = -330;

    scene.add(spinTop2);
    EnemyList.push(spinTop2);

    spinTop3 = gltf.scene.clone();
    spinTop3.position.x = -315;
    spinTop3.position.y = 10.2;
    spinTop3.position.z = -530;

    scene.add(spinTop3);
    EnemyList.push(spinTop3);

    spinToplist1.push(spinTop1);
    spinToplist1.push(spinTop2);
    spinToplist1.push(spinTop3);

    });


    return spinToplist1;

}

var t1 = 0;

function topRender1(top){
  t1 += 0.01;
  console.log(top);
  //console.log("t: "+t);
  //console.log("b.position.x:" +ob.position.x);
  //console.log("b.position.z:" +ob.position.z);
  //spinTop1.rotation.y += 0.05;
  top.position.x = 5*Math.cos(t1) +5;
  top.position.z = 5*Math.sin(t1) + 5;
};

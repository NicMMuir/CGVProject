//Adding all the Spintop to spinTopMap functions
//Postions, scale of enemy, TWEEN movement
//This js file is called in init()
var spinTop1;
var spinTop2;
var spinTop3;
var t = 0;

var store = []


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
    var t =t+0.1;
    var targetPosition1 = new THREE.Vector3( 2*Math.cos(t) +3, 10,s2*Math.sin(t) + 3 );
    var tween1 = new TWEEN.Tween( spinTop1.position ).to( targetPosition1, 1000 );
    tween1.start();


    });

}

var t1 = 0
function spinRender(ob){
    t1 += 0.01;

    ob.rotation.y += 0.05;
    ob.position.x = 1*Math.cos(t1) +2;
    ob.position.z = 1*Math.sin(t1) +2;
  };

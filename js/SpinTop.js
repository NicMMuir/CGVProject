//Adding all the Spintop to spinTopMap functions
//Postions, scale of enemy, TWEEN movement
//This js file is called in init()

function SpinTopMap3() { //Spintop enemy data for Map 3

 //Load SpinTop Enemy Model
  var spinToplist3 = [];
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

    gltf.scene.scale.set(2.5,2.5,2.5);

    spinTop1 = gltf.scene;
    spinTop1.position.x = -1330;
    spinTop1.position.y = 259.9;
    spinTop1.position.z = 1000;

    scene.add(spinTop1);
    EnemyList.push(spinTop1);
    spinToplist3.push(spinTop1);

    spinTop2 = gltf.scene.clone();
    spinTop2.position.x = -1070;
    spinTop2.position.y = 259.9;
    spinTop2.position.z = 1000;

    scene.add(spinTop2);
    EnemyList.push(spinTop2);
    spinToplist3.push(spinTop2);

    spinTop3 = gltf.scene.clone();
    spinTop3.position.x = -420;
    spinTop3.position.y = 210;
    spinTop3.position.z = 950;

    scene.add(spinTop3);
    EnemyList.push(spinTop3);
    spinToplist3.push(spinTop3);

        spinTop4 = gltf.scene.clone();
    spinTop4.position.x = -420;
    spinTop4.position.y = 210;
    spinTop4.position.z = 1060;

    scene.add(spinTop4);
    EnemyList.push(spinTop4);
    spinToplist3.push(spinTop4);

        spinTop5 = gltf.scene.clone();
    spinTop5.position.x = -200;
    spinTop5.position.y = 210;
    spinTop5.position.z = 960;

    scene.add(spinTop5);
    EnemyList.push(spinTop5);
    spinToplist3.push(spinTop5);

    });

}



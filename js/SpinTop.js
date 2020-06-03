//Adding all the Spintop to spinTopMap functions
//Postions, scale of enemy, TWEEN movement 
//This js file is called in init()


function SpinTopMap1() { //Spintop enemy data for Map 1

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

    var spinTop1 = gltf.scene;
    spinTop1.position.x = 20;
    spinTop1.position.y = 0;
    spinTop1.position.z = -20;
    
    scene.add(spinTop1);
    EnemyList.push(spinTop1);

    var spinTop2 = gltf.scene.clone();
    spinTop2.position.x = -20;
    spinTop2.position.y = 0;
    spinTop2.position.z = -20;
    
    scene.add(spinTop2);
    EnemyList.push(spinTop2);

    });

}
//Load Short Bridge Model
// var rightBridge = new THREE.Object3D();
// var leftBridge = new THREE.Object3D();
// {
//   var loader = new THREE.GLTFLoader();
//   loader.load('./3DObjects/Bridge/scene.gltf', function(gltf){
//     let leftWoodBridge = gltf.scene.clone();

//     var rightWoodBridge = gltf.scene;
//     rightBridge.add(rightWoodBridge);
//     leftBridge.add(leftWoodBridge);
//   });
// }


var Ruby = new THREE.Object3D();
var RubyArray = [];
function rubyinit(){

  const objLoader = new THREE.OBJLoader();
  objLoader.setPath('/Charblender/Points/');

  const mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath('/Charblender/Points/');



  new Promise((resolve) => {
    mtlLoader.load('Ruby.mtl', (materials) => {
      resolve(materials);
    });
  })
  .then((materials) => {
    materials.preload();
    objLoader.setMaterials(materials);
    objLoader.load('Ruby.obj', (object) => {

      object.castShadow = true;
      object.receiveShadow = true
      Ruby = object;
    });
  });
}


function genruby(){
    //If this is compented out and Ruby returned, it renders to scene

    rubyinit();

    Ruby.position.y = 7;

    scene.add(Ruby);
    for(let k =0;k<5;k++){
      var temp = new THREE.Object3D() ;
      temp.copy(Ruby);
      RubyArray.push(temp);
    }
  return RubyArray;
}

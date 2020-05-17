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

  var loader = new THREE.GLTFLoader();
  loader.load('/Charblender/Points/ruby.glb', function(gltf){
  var Ruby = gltf.scene;
  scene.add(Ruby)
});
}


function genruby(){
    //If this is compented out and Ruby returned, it renders to scene

    rubyinit();
    for(let k =0;k<5;k++){
      RubyArray.push(Ruby.clone());
    }
  return RubyArray;
}

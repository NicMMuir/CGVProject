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

var PosList = [];
var Ruby = new THREE.Object3D();
var RubyArray = [];
var temp;
function rubyinit(){

  var loader = new THREE.GLTFLoader();
  loader.load('/Charblender/Points/ruby.glb', function(gltf){
  Ruby = gltf.scene;

  for(let k = 0;k<5;k++){
    temp = gltf.scene.clone();
    temp.position.x = PosList[k].x ;
    temp.position.y = PosList[k].y;
    temp.position.z = PosList[k].z;
    RubyArray.push(temp);
    scene.add(temp);
  }

});
}


function genruby(poslist){
  PosList = poslist;
  rubyinit();
  return RubyArray;
}

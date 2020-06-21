var PosRubyList = [];
var Ruby = new THREE.Object3D();
var RubyArray = [];
var temp;
function rubyinit(){

  var loader = new THREE.GLTFLoader();
  loader.load('/Charblender/Points/ruby.glb', function(gltf){
  gltf.scene.scale.set(2,2,2);
  //Cast and receive a shadow on the model
  gltf.scene.traverse (function (node){
  if (node instanceof THREE.Mesh){
    node.castShadow = true;
    node.receiveShadow = true;
    node.material.metalness = 0;
  }
  });
  Ruby = gltf.scene;

  for(let k = 0;k<PosRubyList.length;k++){
    
    temp = gltf.scene.clone();
    temp.position.x = PosRubyList[k].x ;
    temp.position.y = PosRubyList[k].y;
    temp.position.z = PosRubyList[k].z;   

    RubyArray.push(temp);
    scene.add(temp);
  }

});
}


function genruby(posrlist){
  PosRubyList = posrlist;
  rubyinit();
  return RubyArray;
}

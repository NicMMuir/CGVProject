var PosCoinList = [];
var Coin = new THREE.Object3D();
var CoinArray = [];
var temp;
function coininit(){

  var loader = new THREE.GLTFLoader();
  loader.load('/Charblender/Points/coin.glb', function(gltf){
  gltf.scene.scale.set(1.5,1.5,1.5);
  //Cast and receive a shadow on the model
  gltf.scene.traverse (function (node){
  if (node instanceof THREE.Mesh){
    node.castShadow = true;
    node.receiveShadow = true;
    node.material.metalness = 0;
  }
  });
  Coin = gltf.scene;
  

  for(let k = 0;k<PosCoinList.length;k++){
    temp = gltf.scene.clone();
    temp.position.x = PosCoinList[k].x ;
    temp.position.y = PosCoinList[k].y;
    temp.position.z = PosCoinList[k].z;

    CoinArray.push(temp);
    scene.add(temp);
  }

});
}


function gencoin(posclist){
  PosCoinList = posclist;
  coininit();
  return CoinArray;
}

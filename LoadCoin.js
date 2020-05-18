var PosCoinList = [];
var Coin = new THREE.Object3D();
var CoinArray = [];
var temp;
function coininit(){

  var loader = new THREE.GLTFLoader();
  loader.load('/Charblender/Points/ruby.glb', function(gltf){
  Coin = gltf.scene;

  for(let k = 0;k<5;k++){
    temp = gltf.scene.clone();
    temp.position.x = PosList[k].x ;
    temp.position.y = PosList[k].y;
    temp.position.z = PosList[k].z;
    CoinArray.push(temp);
    scene.add(temp);
  }

});
}


function gencoin(posclist){
  PosCoinList = poslist;
  coininit();
  return CoinArray;
}

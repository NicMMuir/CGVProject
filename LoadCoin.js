var PosCoinList = [];
var Coin = new THREE.Object3D();
var CoinArray = [];
var temp;
function coininit(){

  var loader = new THREE.GLTFLoader();
  loader.load('/Charblender/Points/coin.glb', function(gltf){
  Coin = gltf.scene;

  for(let k = 0;k<5;k++){
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

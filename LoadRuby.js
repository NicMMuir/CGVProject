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
      Ruby = object ;
    });
  });
}


function genruby(){
    //If this is compented out and Ruby returned, it renders to scene

    rubyinit();
    console.log(Ruby);
    RubyArray.push(Ruby);
    for(let k =0;k<5;k++){
      var temp = new THREE.Object3D() ;
      temp.copy(Ruby);
      RubyArray.push(temp);
    }
  return RubyArray;
}

var Coin = new THREE.Object3D();
var Ruby = new THREE.Object3D();



function Coininit(){
    const objLoader = new THREE.OBJLoader();
    objLoader.setPath('/Charblender/Points/');

    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('/Charblender/Points');

    new Promise((resolve) => {
      mtlLoader.load('Coin.mtl', (materials) => {
        resolve(materials);
      });
    })
    .then((materials) => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load('Coin.obj', (object) => {
        Coin.add(object);


      });
    });

    new Promise((resolve) => {
      mtlLoader.load('Ruby.mtl', (materials) => {
        resolve(materials);
      });
    })
    .then((materials) => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load('Ruby.obj', (object) => {
        Coin.add(object);


      });
    });

}

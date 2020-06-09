//CharacCred.js creates the character and scene to add to the Credits page
//The character is displayed in the Rolling credits 
//Serves the same purpose as introscreen.js but with diff position and scale

//-----------------Scene Setup (camera, renderer, etc.)-----------------//
var character; 
const scene  = new THREE.Scene();
const light = new THREE.DirectionalLight('#ffffff', 0.9);

light.position.set(-20, 0, 100);
scene.add(light);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({alpha:true});//alpha value lets css shine through scene background
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//-----------------Loading the character model-------------------------//
//define object loaders
const objLoader = new THREE.OBJLoader();
objLoader.setPath('/Charblender/');

const mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('/Charblender/');

new Promise((resolve)=>{
    mtlLoader.load('Character.mtl', (materials)=>{//assign a callback function that waits for materials to be fetched, once they load resolve the promise
        resolve(materials);
    })
}).then((materials)=>{//load the materials and character object into the scene
    materials.preload();
    objLoader.setMaterials(materials);
    objLoader.load('Character.obj', (object)=>{
        character = object; 
        character.position.x = -10;
        character.position.y = -3;
        character.scale.set(3,3,3);
        scene.add(character);
    })
})

//----------------Render the character-------------------------//
function render(){
    if (character){
        character.rotation.y += 0.01;

    }
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
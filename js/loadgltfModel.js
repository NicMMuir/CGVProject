//This Javascript file is used to load the custom character model as a GLTF Model (a more useful format for animations)
//-----------Setup the scene-----------------//
var character; 
const scene  = new THREE.Scene();
const light = new THREE.DirectionalLight('#ffffff', 0.9);

light.position.set(-20, 0, 100);
// scene.add(light);
var color = new THREE.Color( "grey" );
scene.background = color;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const mixers = []; //holds one AnimationMixer for each model (an Animation Mixer attaches animations to models)
const clock = new THREE.Clock(); //controls timing for animations (a stopwatch that starts running once instantiated)


//--------------Load the character model--------------------//
//call the functions that load and render the character into the game world
function init(){
    loadModel();
    renderer.setAnimationLoop(()=>{
        update();
        render();
    })
}

function loadModel(){
    const gltfLoader = new THREE.GLTFLoader();
    const url = '/Charblender/GLTF/Character.glb';
    
    const onLoad = (gltf, position)=>{//gltf is the object the loader returns
        console.log(gltf);
        gltf.scene.traverse (function (node){
      if (node instanceof THREE.Mesh){
        node.castShadow = true;
        node.receiveShadow = true;
  }
});
        const model = gltf.scene;
        //copy the passed in position to the position of this model object
        model.position.copy(position);
        //get a reference to the animation clip for loaded model
        const animation = gltf.animations[0];
        //create animation mixer for loaded object (updates model as animation progresses)
        //push this mixer to the mixers array, loop over mixers once at start of each frame in update(), passing in clock time passed since prev frame
        const mixer = new THREE.AnimationMixer(model);
        mixers.push(mixer);
        //create animation action for animation clip. animation action controls state of clip (playing, stopped, paused, etc.)
        const action = mixer.clipAction(animation);
        action.play();
        scene.add(model);
       
    };
    
    const onError = (errorMessage) => {console.log(errorMessage)};
    const charPosition = new THREE.Vector3(0,0,0);
    gltfLoader.load(url, gltf => onLoad (gltf, charPosition), onError);
    
    };
    
    
    function update(){//get elapsed time (delta) since last frame and update mixer
        const delta = clock.getDelta();
    
        for (const mixer of mixers){//there's only one mixer for one model at current, but this is written to be able to work with multiple models
            mixer.update(delta);
        }
    }
    
    function render(){
    
      renderer.render(scene, camera);
    }
    
//------------Render the character into the game world---------------//
    init();
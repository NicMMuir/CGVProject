//This Javascript file is used to load the custom character model as a GLTF Model (a more useful format for animations)
//-----------Setup the scene-----------------// 
 var CharacterBuild = new THREE.Object3D();
 var Char;
 var childern = []
 const mixers = []; //holds one AnimationMixer for each model (an Animation Mixer attaches animations to models)
var action;
var charstartx;
var charstarty;
var charstart;

//--------------Load the character model--------------------//

//call the functions that load and render the character into the game world in Scene.js
function Charinit(csx,csy,csz){
  charstartx = csx;
  charstarty = csy;
  charstartz = csz;
  loadModel();
  renderer.setAnimationLoop(()=>{
    update();
    render();
  })
}



function update(){//get elapsed time (delta) since last frame and update mixer (mixers handle animation)
    const delta = clock.getDelta()*10; //multiplier applied to the clock tick determines animation speed

    for (const mixer of mixers){
        mixer.update(delta);
    }
}

function render(){
  renderer.render(scene, camera);
}



function loadModel(){
  const gltfLoader = new THREE.GLTFLoader();
  const url = '/Charblender/GLTF/Character.glb';

  const onLoad = (gltf)=>{//gltf is the object the loader returns
    CharacterBuild = gltf.scene;
    console.log("log gltf model of character", CharacterBuild);


    //get a reference to the animation clip for loaded model
    const animation = gltf.animations[0];
    //create animation mixer for loaded object (updates model as animation progresses)
    //push this mixer to the mixers array, loop over mixers once at start of each frame in update(), passing in clock time passed since prev frame
    const mixer = new THREE.AnimationMixer(CharacterBuild);
    mixers.push(mixer);
    //create animation action for animation clip. animation action controls state of clip (playing, stopped, paused, etc.)
    action = mixer.clipAction(animation);
    controls.getObject().add(CharacterBuild);
    controls.getObject().position.x = charstartx;
  	controls.getObject().position.y = charstarty;
  	controls.getObject().position.z = charstart;
	  scene.add(controls.getObject());

};

const onError = (errorMessage) => {console.log(errorMessage)};
gltfLoader.load(url, gltf => onLoad (gltf), onError);

};




















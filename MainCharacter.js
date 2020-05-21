 var CharacterBuild = new THREE.Object3D();
 var Char;
 var childern = []
 const mixers = []; //holds one AnimationMixer for each model (an Animation Mixer attaches animations to models)
var action;
var charstartx;
var charstarty;
var charstart;
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



function update(){//get elapsed time (delta) since last frame and update mixer
    const delta = clock.getDelta()*10;

    for (const mixer of mixers){//there's only one mixer for one model at current, but this is written to be able to work with multiple models
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























// var feet = new THREE.Object3D();
//
// // var graphics;
// // var scene = new THREE.Scene();
// // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// //
// // var renderer = new THREE.WebGLRenderer();
// // renderer.setSize( window.innerWidth, window.innerHeight );
// // document.body.appendChild( renderer.domElement );
// //
// // camera.position.z = 10;
//
//
//
//
//   CharBody();
//   //constructChar();
// 	//requestAnimationFrame( animate );
// 	//renderer.render( scene, camera );
//
//
//   function CharStationary(){
//     var geometry = new THREE.SphereGeometry(1, 20, 10 );
//     var material = new THREE.MeshBasicMaterial( {color: 0xAF24C8} );
//     var CharacterBody = new THREE.Mesh( geometry, material );
//     CharacterBody.translateY(2)
//     var feetobj = CharFeet();
//     feetobj.rotateX(90);
//     CharacterBuild.add(CharacterBody);
//     CharacterBuild.add(feetobj);
//   }
//
// //Might need to translate in the actual Sceen.js might be easier
//   // function CharLFforward(){
//   //   var geometry = new THREE.SphereGeometry(1, 20, 10 );
//   //   var material = new THREE.MeshBasicMaterial( {color: 0xAF24C8} );
//   //   var CharacterBody = new THREE.Mesh( geometry, material );
//   //   CharacterBody.translateY(2)
//   //   var feetobj = CharFeet();
//   //   feetobj.rotateX(Math.PI / 2);
//   //   feetobj.Foot1.translateZ(-1);
//   //   feetobj.Foot2.translateZ(1);
//   //   CharacterBuild.add(CharacterBody);
//   //   CharacterBuild.add(feetobj);
//   // }
//   //
//   // function CharRFforward(){
//   //   var geometry = new THREE.SphereGeometry(1, 20, 10 );
//   //   var material = new THREE.MeshBasicMaterial( {color: 0xAF24C8} );
//   //   var CharacterBody = new THREE.Mesh( geometry, material );
//   //   CharacterBody.translateY(2)
//   //   var feetobj = CharFeet();
//   //   feetobj.rotateX(Math.PI / 2);
//   //   feetobj.Foot1.translateZ(1);
//   //   feetobj.Foot2.translateZ(-1);
//   //
//   //   CharacterBuild.add(CharacterBody);
//   //   CharacterBuild.add(feetobj);
//   // }
//   //
//   //
//   //
//
// function CharBody(){
//   var geometry = new THREE.SphereGeometry(1, 20, 10 );
//   var material = new THREE.MeshBasicMaterial( {color: 0xAF24C8} );
//   var CharacterBody = new THREE.Mesh( geometry, material );
//   CharacterBody.translateY(2)
//   var feetobj = CharFeet();
//   feetobj.rotateX(90);
//   CharacterBuild.add(CharacterBody);
//   CharacterBuild.add(feetobj);
// }
//
// function CharFeet(){
//   var Foot1 = CharFoot(0.5,1,20);
//   Foot1.translateX(-0.5);
//   var Foot2 = CharFoot(0.5,1,20);
//   Foot2.translateX(0.5);
//   feet.add(Foot1);
//   feet.add(Foot2);
//   return(feet);
// }
//
//
//
//
// function CharFoot(radius, height,radialSegments){
// //Combination of triangles
// const geometry = new THREE.ConeBufferGeometry(radius, height, radialSegments);
// const material = new THREE.MeshBasicMaterial( {color: 0xAF24C8} );
// var foot = new THREE.Mesh(geometry,material);
// return(foot);
// }

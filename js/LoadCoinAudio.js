// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
var sound = new THREE.Audio(listener);
var audioLoader = new THREE.AudioLoader();

// load a sound and set it as the Audio object's buffer

function genaudio(){
  camera.add( listener );
  // create a global audio source
audioLoader.load( 'sounds/rubyNcoin/Mario-coin-sound.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( false );
	sound.setVolume( 0.5 );
	sound.play();
});
}

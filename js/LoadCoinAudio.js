// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
var sound = new THREE.Audio(listener);
var audioLoader = new THREE.AudioLoader();

var listener2 = new THREE.AudioListener();
var sound2 = new THREE.Audio(listener2);
var audioLoader2 = new THREE.AudioLoader();

var listener3 = new THREE.AudioListener();
var sound3 = new THREE.Audio(listener3);
var audioLoader3 = new THREE.AudioLoader();

//Background music sound
//var audioLoader2 = new THREE.AudioLoader();

// load a sound and set it as the Audio object's buffer

function genaudio(){
  //camera.add( listener );
  // create a global audio source
  audioLoader.load( 'sounds/rubyNcoin/Mario-coin-sound.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( false );
	sound.setVolume( 0.001 );
	sound.play();
});
}

function bgmmusic(){
  //camera.add( listener);
  // create a global audio source
  audioLoader2.load( 'sounds/Menu and Ingame/BLMMT.mp3', function( buffer2) {
  sound2.setBuffer( buffer2 );
  sound2.setLoop( true );
  sound2.setVolume( 0.005 );
  sound2.play();
});

}

function genSound(){
  //camera.add( listener );
  //Player looses life audio source
  audioLoader3.load( 'sounds/deathSound/WOAH.mp3', function( buffer3 ) {
  sound3.setBuffer( buffer3 );
  sound3.setLoop( false );
  sound3.setVolume( 0.006 );
  sound3.play();
});
}

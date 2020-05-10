var Character;
var graphics;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 10;



function animate() {
  CharBody();
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

function constructChar(){

}

function CharBody(){
  var geometry = new THREE.SphereGeometry( 5, 20, 10 );
  var material = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
  var CharacterBody = new THREE.Mesh( geometry, material );

  //CharacterBody.translate(0,3,0);
  scene.add(CharacterBody);
}

function CharFeet(){
  var Foot1 = CharFoot(5,10,4,1,false,Math.PI*1.70,Math.PI*1.04);
}
function CharFoot(radius, height,radialSegments, heightSegments,openEnded,thetaStart, thetaLength){
//Combination of triangles
const geometry = new THREE.ConeBufferGeometry(
    radius, height,
    radialSegments, heightSegments,
    openEnded,
    thetaStart, thetaLength);

return(geometry);
}

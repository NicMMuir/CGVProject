var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0,3,20);
camera.lookAt(0,0,0);
camera.updateProjectionMatrix();
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );




var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
cube.position.y += 0.5;
scene.add( cube );


var xSpeed = 0.5;
var zSpeed = 0.5;
GenPlane();
SetLight();

renderer.render(scene,camera)
document.addEventListener("keydown",onDocumentKeyDown, false);
function onDocumentKeyDown(event) {

    var keyCode = event.which;
    if (keyCode == 87) {
        cube.position.z -= zSpeed;
    } else if (keyCode == 83) {
        cube.position.z += zSpeed;
    } else if (keyCode == 65) {
        cube.position.x -= xSpeed;
    } else if (keyCode == 68) {
        cube.position.x += xSpeed;
    } else if (keyCode == 32) {
        cube.position.set(0, 0, 0);
    }
renderer.render(scene,camera)
};


function GenPlane(){

	var geometry = new THREE.PlaneGeometry( 5, 20, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	var plane = new THREE.Mesh( geometry, material );
	plane.rotation.x = Math.PI / 2;
	scene.add( plane );

}


function SetLight(){
	var light = new THREE.AmbientLight(0x404040);
	scene.add(light);

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
	scene.add( directionalLight );
}

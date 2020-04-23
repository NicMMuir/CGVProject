var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75 , window.innerWidth/window.innerHeight,0.1,1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth/2 , window.innerHeight/2);
document.body.appendChild(renderer.domElement);

//with perspective camera:
//FOV (Field of view)
//aspect ration = use (width of element / height)
//far and near clipping pane clips render distances

//To test output:
var geometry = new THREE.BoxGeometry(10,10,10);
var material = new THREE.MeshBasicMaterial({color:0x00ff00});
var cube = new THREE.Mesh(geometry,material);
scene.add(cube);
camera.position.z = 5;

//to actually render the scene:
function animate(){
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene,camera);

}
animate();

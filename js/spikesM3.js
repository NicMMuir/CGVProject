var trap = new THREE.Group();
var spikes= new THREE.Object3D();
var spikes_sides= new THREE.Object3D();


function getTrapM3(){
  //Adding flat plane for spikes
  var texture = new THREE.TextureLoader().load( 'Textures/wooden.jfif' );
  var geometry = new THREE.PlaneGeometry( 3, 10, 30 );
  var material = new THREE.MeshBasicMaterial( { map: texture } );
  var plane = new THREE.Mesh( geometry, material );
  plane.scale.set(1.3,0.3,0.2);
  plane.position.set(0,0.4,0);
//  scene.add(plane);

  //spikes.add(plane);
  //scene.add( spikes );


  //Creating cone(spike)
  var texture = new THREE.TextureLoader().load( 'Textures/wooden.jfif' );
  var material1 = new THREE.MeshBasicMaterial( { map: texture } );
  var geometry = new THREE.ConeGeometry( 1, 6.5, 22 );
  var material = new THREE.MeshBasicMaterial( {color: 0xcd853f} );
  var cone = new THREE.Mesh( geometry, material1 );
  cone.scale.set(0.1,0.1,0.1);
  cone.rotateX(Math.PI/2);


  var cone1 = cone.clone();
  var cone2 = cone.clone();
  var cone3 = cone.clone();
  var cone4 = cone.clone();
  var cone5 = cone.clone();
  var cone6 = cone.clone();
  var cone7 = cone.clone();
  var cone8 = cone.clone()

  cone1.position.set(0,1,0.32);
  cone2.position.set(0,0.8,0.32);
  cone3.position.set(0,0.6,0.32);
  cone4.position.set(0,0.4,0.32);
  cone5.position.set(0,0.2,0.32);
  cone6.position.set(0,0,0.32);
  cone7.position.set(0,-0.2,0.32);
  //cone.position.set(0,0,0.32);
  spikes.add(cone1);
  spikes.add(cone2);
  spikes.add(cone3);
  spikes.add(cone4);
  spikes.add(cone5);
  spikes.add(cone6);
  spikes.add(cone7);
  spikes.scale.set(0.73,0.73,0.73);
  spikes.position.set(-1.1,1.6,0);
  //spikes.rotateX(-Math.PI/2);

  spikes.rotateZ(-Math.PI/2);

  spikes.scale.set(2.5,2.5,2.5);

  spikes_2 = spikes.clone();
  spikes_2.position.set(-1.1,1.2,0);

  spikes_3 = spikes.clone();
  spikes_3.position.set(-1.1,0.8,0);

  spikes_4 = spikes.clone();
  spikes_4.position.set(-1.1,0.4,0);

  spikes_5 = spikes.clone();
  spikes_5.position.set(-1.1,0,0);

  spikes_6 = spikes.clone();
  spikes_6.position.set(-1.1,-0.4,0);

  spikes_7 = spikes.clone();
  spikes_7.position.set(-1.1,-0.8,0);

  //spikes.add(plane);


  trap.add(plane);
  trap.add(spikes);
  trap.add(spikes_2);
  trap.add(spikes_3);
  trap.add(spikes_4);
  trap.add(spikes_5);
  trap.add(spikes_6);
  trap.add(spikes_7);
  trap.rotateX(Math.PI/2);

  return trap;


}

var fra = -1;

function spikesRender_y(obj,y,dy) {
/*  console.log("frame is: "+fr);
  console.log("x+dx: "+ (x+dx));
  console.log(obj.position.x);*/
  obj.position.y +=fra;

  if(obj.position.y < y-dy){
    fra = 1;
  }

  if(obj.position.y > y){
    fra = -1
  }
//  console.log("f is: "+frame)

};
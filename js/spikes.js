var trap = new THREE.Object3D();


function getTrap(){
  //Adding box to d pillar


    //Adding flat plane for s
    var texture = new THREE.TextureLoader().load( 'Textures/steel.jpg' );
    var geometry = new THREE.PlaneGeometry( 3, 10, 30 );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var plane = new THREE.Mesh( geometry, material );
    plane.scale.set(0.1,0.14,0.2);
    plane.position.set(0,0.4,0);

    //s.add(plane);
    //scene.add( s );


    //Creating spike()
    var texture = new THREE.TextureLoader().load( 'Textures/steel.jpg' );
    var material1 = new THREE.MeshBasicMaterial( { map: texture } );
    var geometry = new THREE.ConeGeometry( 1, 6.5, 22 );
    var material = new THREE.MeshBasicMaterial( {color: 0xcd853f} );
    var spike = new THREE.Mesh( geometry, material1 );
    spike.scale.set(0.1,0.1,0.1);
    spike.rotateX(Math.PI/2);


    var spike1 = spike.clone();
    var spike2 = spike.clone();
    var spike3 = spike.clone();
    var spike4 = spike.clone();
    var spike5 = spike.clone();
    var spike6 = spike.clone();
    var spike7 = spike.clone();
    var spike8 = spike.clone()

    spike1.position.set(0,1,0.32);
    spike2.position.set(0,0.8,0.32);
    spike3.position.set(0,0.6,0.32);
    spike4.position.set(0,0.4,0.32);
    spike5.position.set(0,0.2,0.32);
    spike6.position.set(0,0,0.32);
    spike7.position.set(0,-0.2,0.32);
    //spike.position.set(0,0,0.32);
    trap.add(spike1);
    trap.add(spike2);
    trap.add(spike3);
    trap.add(spike4);
    trap.add(spike5);
    trap.add(spike6);
    trap.add(spike7);
    trap.scale.set(0.73,0.73,0.73);
    trap.position.set(0,-0.3,0.51);
    trap.rotateX(-Math.PI/2);

    trap.rotateZ(-Math.PI/2);

    trap.add(plane);

    return(trap);


}
var f =0.1;
function spikesRender_z(obj,z,dz) {
  obj.position.z +=f;

  if(obj.position.z > z+dz){
    console.log("yes")
    f = -0.1
  }

  if(obj.position.z < z){
    console.log("yes")
    f = 0.1
  }
//  console.log("f is: "+frame)

};

var fr = 5;

function spikesRender_x(obj,x,dx) {
/*  console.log("frame is: "+fr);
  console.log("x+dx: "+ (x+dx));
  console.log(obj.position.x);
  obj.position.x +=fr;*/

  if(obj.position.x > x+dx){
    fr = -5
  }

  if(obj.position.x < x){
    fr = 5
  }
//  console.log("f is: "+frame)

};

var spikes_pillar = new THREE.Object3D();
var obj = [];

   var pillar = new THREE.Object3D();
   var box = new THREE.Object3D();
   var spikes= new THREE.Object3D();
   var head= new THREE.Object3D();


function pillEnemey(){


   //Adding box to spiked pillar
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var cubeMaterials =
    [
      new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('Textures/wooden.jfif'),side: THREE.DoubleSide} ),
      new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('Textures/wooden.jfif'),side: THREE.DoubleSide} ),
      new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('Textures/wooden.jfif'),side: THREE.DoubleSide} ),
      new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('Textures/wooden.jfif'),side: THREE.DoubleSide} ),
      new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('Textures/wooden.jfif'),side: THREE.DoubleSide} ),
      new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('Textures/wooden.jfif'),side: THREE.DoubleSide} )
    ];
   var material = new THREE.MeshFaceMaterial(cubeMaterials);
   var cube = new THREE.Mesh( geometry, material );
   box.add(cube);
   //scene.add( cube );

   //Adding cylinder(pillar) to spiked pillar
   var texture = new THREE.TextureLoader().load( 'Textures/tribal.jpg' );
   var material = new THREE.MeshPhongMaterial( { map: texture } );
   var geometry = new THREE.CylinderGeometry( 1, 0.8, 3.5, 22 );
   var cylinder = new THREE.Mesh( geometry, material );
   cylinder.position.set(0,2.8,0);
   pillar.add(cylinder);
   pillar.scale.set(1/2,1/2,1/2);
   //scene.add( cylinder );

   //Creating cone(spike)
   var texture = new THREE.TextureLoader().load( 'Textures/lights.jpg' );
   var material1 = new THREE.MeshPhongMaterial( { map: texture } );
   var geometry = new THREE.ConeGeometry( 1, 6.5, 22 );
   var material = new THREE.MeshPhongMaterial( {color: 0xcd853f} );
   var cone = new THREE.Mesh( geometry, material1 );
   cone.scale.set(0.1,0.1,0.1);
   cone.rotateZ(-Math.PI/2);

   var cone1 = cone.clone();
   var cone2 = cone.clone();
   cone1.position.set(0,-0.6,0);
   cone2.position.set(0,-1.2,0);



  //Creating object spikes of 3 cones
  spikes.add(cone);
  spikes.add(cone1);
  spikes.add(cone2);

  //Creating spikes for pillar
  var spikes1 = spikes.clone();
  var spikes2 = spikes.clone();
  var spikes3 = spikes.clone();
  var spikes4 = spikes.clone();

  var texture = new THREE.TextureLoader().load( 'Textures/lights.jpg' );
  var material1 = new THREE.MeshPhongMaterial( { map: texture } );
  var geometry = new THREE.ConeGeometry( 5, 6.5, 22 );
  var head_cone = new THREE.Mesh( geometry, material1 );
  head_cone.scale.set(0.2,0.2,0.2);
  head_cone.position.set(0,5.2,0);
  head.add(head_cone);
  pillar.add(head);

  pillar.position.set(0,-0.1,0);

  //Right side of pillar spikes
  spikes1.scale.set(1.8,1.8,1.8);
  spikes1.position.set(1.4,3.8,0);
  pillar.add(spikes1);

  //Left side of pillar spikes
  spikes2.rotateZ(Math.PI);
  spikes2.scale.set(1.8,1.7,1.8);
  spikes2.position.set(-1.4,1.8,0);
  pillar.add(spikes2);

  //Front side of pillar spikes
  spikes3.rotateY(-Math.PI/2);
  spikes3.scale.set(1.8,1.8,1.8);
  spikes3.position.set(0,3.8,1.4);
  pillar.add(spikes3);

  //Back side of pillar spikes
  spikes4.rotateY(Math.PI/2);
  spikes4.scale.set(1.8,1.8,1.8);
  spikes4.position.set(0,3.8,-1.4);
  pillar.add(spikes4);

  spikes_pillar.add(box);
  spikes_pillar.add(pillar);
  spikes_pillar.scale.set(0.8,0.8,0.8);
  spikes_pillar.position.set(0,-1,0);

  //First right head spike
  h_cone1 = cone.clone();
  h_cone1.rotateZ(Math.PI/2);
  h_cone1.rotateZ(-Math.PI/3);
  h_cone1.scale.set(0.2,0.2,0.2);
  h_cone1.position.set(1,5.2,0.4);

  //Second right head spike
  h_cone2 = h_cone1.clone();
  h_cone2.position.set(1,5.2,-0.4);

  //First left head spike
  h_cone3 = cone.clone();
  h_cone3.rotateZ(Math.PI/2);
  h_cone3.rotateZ(Math.PI/3);
  h_cone3.scale.set(0.2,0.2,0.2);
  h_cone3.position.set(-1,5.2,0.4);

  //Second left head spike
  h_cone4 = h_cone3.clone();
  h_cone4.position.set(-1,5.2,-0.4);

  //Front head spike
  h_cone5 = cone.clone();
  h_cone5.rotateZ(Math.PI/2);
  h_cone5.rotateX(Math.PI/3);
  h_cone5.scale.set(0.2,0.2,0.2);
  h_cone5.position.set(0,5.2,1);

  //Back head spike
  h_cone6 = h_cone5.clone();
  h_cone6.rotateX(-Math.PI/1.5);
  h_cone6.position.set(0,5.2,-1);

  //Add cones(spikes) to the head
  head.add(h_cone1);
  head.add(h_cone2);
  head.add(h_cone3);
  head.add(h_cone4);
  head.add(h_cone5);
  head.add(h_cone6);

  return spikes_pillar;
}

function pillRender(obj,x,z,dx,dz) {
  childs = obj.children;
   dxPerFrame = 1;
   dzPerFrame = 1;
   dxPerFrame1 = -1;
   dzPerFrame1 = 1;

   childs[1].rotation.y +=0.35;


   if (obj.position.x < (x+dx) && obj.position.z >= z ){
     obj.position.x += dxPerFrame;
   }

   if (obj.position.x >= (x+dx) && obj.position.z > (z-2*dz)){
     obj.position.z -= dzPerFrame;
   }
   if(x==0){
     if (obj.position.x > - (x+dx) && obj.position.z <=(z-2*dz)){
       obj.position.x += dxPerFrame1;
     }
     if (obj.position.x <= -(x+dx) && obj.position.z < z){
       obj.position.z += dzPerFrame1;
     }
   }

   if(x>0){
     if (obj.position.x > x-dx && obj.position.z <=(z-2*dz)){
       obj.position.x += dxPerFrame1;
     }
     if (obj.position.x <= x-dx && obj.position.z < z){
       obj.position.z += dzPerFrame1;
     }
   }

   if(x<0){
     if (obj.position.x > x-dx && obj.position.z <=(z-2*dz)){
       obj.position.x += dxPerFrame1;
     }
     if (obj.position.x <= x-dx && obj.position.z < z){
       obj.position.z += dzPerFrame1;
     }
   }

 };

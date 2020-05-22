   var b_box = new THREE.Object3D();
   var b_spikes= new THREE.Object3D();


      function getEnemy(){

      //Adding b_box to spiked b_box
       var geometry = new THREE.BoxGeometry( 1, 1, 1 );
       var cubeMaterials =
       [
         new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('Textures/metalb.png'),side: THREE.DoubleSide} ),
         new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('Textures/metalb.png'),side: THREE.DoubleSide} ),
         new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('Textures/metalb.png'),side: THREE.DoubleSide} ),
         new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('Textures/metalb.png'),side: THREE.DoubleSide} ),
         new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('Textures/metalb.png'),side: THREE.DoubleSide} ),
         new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('Textures/metalb.png'),side: THREE.DoubleSide} )
       ];
      var material = new THREE.MeshFaceMaterial(cubeMaterials);
      var cube = new THREE.Mesh( geometry, material );
      b_box.add(cube);
      //scene.add( cube );

      //Adding flat plane for b_spikes
      var texture = new THREE.TextureLoader().load( 'Textures/lavasp.jpg' );
      var geometry = new THREE.PlaneGeometry( 2, 10, 22 );
      var material = new THREE.MeshBasicMaterial( { map: texture } );
      var plane = new THREE.Mesh( geometry, material );
      plane.scale.set(0.1,0.14,0.2);
      plane.position.set(0,0.4,0);
      b_spikes.add(plane);
      //scene.add( b_spikes );


      //Creating cone(spike)
      var texture = new THREE.TextureLoader().load( 'Textures/steel.jpg' );
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

      b_spikes.add(cone1);
      b_spikes.add(cone2);
      b_spikes.add(cone3);
      b_spikes.add(cone5);
      b_spikes.add(cone6);
      b_spikes.add(cone7);
      b_spikes.scale.set(0.73,0.73,0.73);
      b_spikes.position.set(0,-0.3,0.51);

      var hor_b_spikes = b_spikes.clone();
      hor_b_spikes.add(cone4);
      hor_b_spikes.rotateZ(-Math.PI/2);
      hor_b_spikes.scale.set(1,1,1);
      hor_b_spikes.position.set(-0.4,0.4,0);

      b_spikes.add(hor_b_spikes);

      var b_spikes1 = b_spikes.clone();
      b_spikes1.rotateY(Math.PI);
      b_spikes1.position.set(0,-0.3,-0.51);

      var b_spikes2 = b_spikes.clone();
      b_spikes2.rotateY(Math.PI/2);
      b_spikes2.position.set(0.51,-0.3,0);

      var b_spikes3 = b_spikes.clone();
      b_spikes3.rotateY(-Math.PI/2);
      b_spikes3.position.set(-0.51,-0.3,0);

      var b_spikes4 = b_spikes.clone();
      b_spikes4.rotateX(-Math.PI/2);
      b_spikes4.position.set(0,0.51,0.3);


      b_box.add(b_spikes);
      b_box.add(b_spikes1);
      b_box.add(b_spikes2);
      b_box.add(b_spikes3);
      b_box.add(b_spikes4);

      return b_box;

  }


  var t = 0;

function boxRender(ob,x,y,s1,s2){
    t += 0.01;
    //console.log("t: "+t);
    //console.log("b.position.x:" +ob.position.x);
    //console.log("b.position.z:" +ob.position.z);
    ob.rotation.y += 0.05;
    ob.position.x = s1*Math.cos(t) +x;
    ob.position.z = s2*Math.sin(t) + y;
  };

   
      function getEnemy(){

      //Adding box to spiked box
       var geometry = new THREE.BoxGeometry( 1, 1, 1 );
       var cubeMaterials =
       [
         new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('imgs/metalb.png'),side: THREE.DoubleSide} ),
         new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('imgs/metalb.png'),side: THREE.DoubleSide} ),
         new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('imgs/metalb.png'),side: THREE.DoubleSide} ),
         new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('imgs/metalb.png'),side: THREE.DoubleSide} ),
         new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('imgs/metalb.png'),side: THREE.DoubleSide} ),
         new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('imgs/metalb.png'),side: THREE.DoubleSide} )
       ];
      var material = new THREE.MeshFaceMaterial(cubeMaterials);
      var cube = new THREE.Mesh( geometry, material );
      box.add(cube);
      //scene.add( cube );

      //Adding flat plane for spikes
      var texture = new THREE.TextureLoader().load( 'imgs/dark.jpg' );
      var geometry = new THREE.PlaneGeometry( 2, 10, 22 );
      var material = new THREE.MeshBasicMaterial( { map: texture } );
      var plane = new THREE.Mesh( geometry, material );
      plane.scale.set(0.1,0.14,0.2);
      plane.position.set(0,0.4,0);
      spikes.add(plane);
      //scene.add( spikes );


      //Creating cone(spike)
      var texture = new THREE.TextureLoader().load( 'imgs/steel.jpg' );
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
     
      spikes.add(cone1);
      spikes.add(cone2);
      spikes.add(cone3);
      spikes.add(cone5);
      spikes.add(cone6);
      spikes.add(cone7);
      spikes.scale.set(0.73,0.73,0.73);
      spikes.position.set(0,-0.3,0.51);

      var hor_spikes = spikes.clone();
      hor_spikes.add(cone4);
      hor_spikes.rotateZ(-Math.PI/2);
      hor_spikes.scale.set(1,1,1);
      hor_spikes.position.set(-0.4,0.4,0);

      spikes.add(hor_spikes);

      var spikes1 = spikes.clone();
      spikes1.rotateY(Math.PI);
      spikes1.position.set(0,-0.3,-0.51);

      var spikes2 = spikes.clone();
      spikes2.rotateY(Math.PI/2);
      spikes2.position.set(0.51,-0.3,0);

      var spikes3 = spikes.clone();
      spikes3.rotateY(-Math.PI/2);
      spikes3.position.set(-0.51,-0.3,0);

      var spikes4 = spikes.clone();
      spikes4.rotateX(-Math.PI/2);
      spikes4.position.set(0,0.51,0.3);


      box.add(spikes);
      box.add(spikes1);
      box.add(spikes2);
      box.add(spikes3);
      box.add(spikes4);


      return box;

  }

     
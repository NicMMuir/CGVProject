var topf = new THREE.Group();
var ball = new THREE.Object3D();
var cone = new THREE.Object3D();
var middle = new THREE.Object3D();
var bottom = new THREE.Object3D();

function getTop(){

      //Adds ball
      var geometry = new THREE.SphereGeometry(3, 6, 6);
      var material = new THREE.MeshStandardMaterial({ color: "#000", roughness: 1 });

      var envMap = new THREE.TextureLoader().load('Textures/textb.png');
      envMap.mapping = THREE.SphericalReflectionMapping;
      material.envMap = envMap;
      var roughnessMap = new THREE.TextureLoader().load('Textures/textr.png');
      roughnessMap.magFilter = THREE.NearestFilter;
      material.roughnessMap = roughnessMap;
      roughnessMap.magFilter = THREE.NearestFilter;
      material.roughnessMap = roughnessMap;
      var mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(0.1,0.1,0.1);
      ball.add(mesh);
      ball.position.set(0,1.65,0);
      //scene.add(mesh);


      //Creating cone(spike)
      var text = new THREE.TextureLoader().load( 'Textures/textb.png' );
      var mat1 = new THREE.MeshPhongMaterial( { map: text } );
      var geom = new THREE.ConeGeometry( 4, 6.5, 22 );
      var mat = new THREE.MeshPhongMaterial( {color: 0xcd853f} );
      var bot_cone = new THREE.Mesh( geom, mat1 );
      bot_cone.scale.set(0.1,0.1,0.1);
      bot_cone.position.set(0,-0.34,0);
      bot_cone.rotateZ(-Math.PI);

      //scene.add(bot_cone);

      // Add Circle
      var geometry = new THREE.CircleGeometry( 0.7, 32 );
      var textc = new THREE.TextureLoader().load( 'Textures/redlines.jpg' );
      var material = new THREE.MeshPhongMaterial({map:textc});
      var circle = new THREE.Mesh( geometry, material );
      circle.rotateX(-Math.PI/2);
      bottom.scale.set(1.5,2,1.5);
      bottom.position.set(0,0.3,0);
      bottom.add(bot_cone);
      bottom.add(circle);



      //Creating bottom cone
      var texture = new THREE.TextureLoader().load( 'Textures/lights.jpg' );
      var material1 = new THREE.MeshPhongMaterial( { map: texture } );
      var geometry = new THREE.ConeGeometry( 1, 6.5, 22 );
      var material = new THREE.MeshPhongMaterial( {color: 0xcd853f} );
      var cone = new THREE.Mesh( geometry, material1 );
      cone.scale.set(0.1,0.1,0.1);
      //scene.add(cone);

      cone_1 = cone.clone();
      cone_1.position.set(0,0.5,0);
      cone_1.rotateZ(-Math.PI);

      middle.add(cone);
      middle.add(cone_1);
      middle.scale.set(2.4,1,2.4);
      middle.position.set(0,0.6,0);

      topf.add(ball);
      topf.add(middle);
      topf.add(bottom);

      return topf;
}

var t1 = 0;
function topRender1(ob,x,z,s1,s2){
    t1 += 0.15;
    ob.rotation.y += 0.05;
    ob.position.x = s1*Math.cos(t1) +x;
    ob.position.z = s2*Math.sin(t1) + z;
  };

  var t2 = 0;
  function topRender2(ob,x,z,s1,s2){
      t2 += 0.15;
      ob.rotation.y += 0.05;
      ob.position.x = s1*Math.cos(t2) +x;
      ob.position.z = s2*Math.sin(t2) + z;
    };

    var t3 = 0;
    function topRender3(ob,x,z,s1,s2){
        t3 += 0.15;
        ob.rotation.y += 0.05;
        ob.position.x = s1*Math.cos(t3) +x;
        ob.position.z = s2*Math.sin(t3) + z;
      };

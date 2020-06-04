var mush_en = new THREE.Object3D();

var mush_Pillar = new THREE.Object3D();
var mush_Spikes= new THREE.Object3D();
var head= new THREE.Object3D();



function mushEnemy(){

//Adding cylinder(mush_Pillar) to spiked mush_Pillar
var texture = new THREE.TextureLoader().load( 'Textures/redstripe.jfif' );
var material = new THREE.MeshBasicMaterial( { map: texture } );
var geometry = new THREE.CylinderGeometry( 1, 0.8, 3.5, 22 );
var cylinder = new THREE.Mesh( geometry, material );
cylinder.position.set(0,2.8,0);
mush_Pillar.add(cylinder);
mush_Pillar.scale.set(1/2,1/2,1/2);
//scene.add( cylinder );

//Creating cone(spike)
var texture = new THREE.TextureLoader().load( 'Textures/lights.jpg' );
var material1 = new THREE.MeshBasicMaterial( { map: texture } );
var geometry = new THREE.ConeGeometry( 1, 6.5, 22 );
var material = new THREE.MeshBasicMaterial( {color: 0xcd853f} );
var cone = new THREE.Mesh( geometry, material1 );
cone.scale.set(0.1,0.1,0.1);
cone.rotateZ(-Math.PI/2);

var cone1 = cone.clone();
var cone2 = cone.clone();
cone1.position.set(0,-1,0);
cone2.position.set(0,-1.2,0);



//Creating object mush_Spikes of 3 cones
mush_Spikes.add(cone);
mush_Spikes.add(cone1);
mush_Spikes.add(cone2);

//Creating mush_Spikes for mush_Pillar
var mush_Spikes1 = mush_Spikes.clone();
var mush_Spikes2 = mush_Spikes.clone();
var mush_Spikes3 = mush_Spikes.clone();
var mush_Spikes4 = mush_Spikes.clone();

var texture = new THREE.TextureLoader().load( 'Textures/lights.jpg' );
var material1 = new THREE.MeshBasicMaterial( { map: texture } );
var geometry = new THREE.ConeGeometry( 5, 6.5, 22 );
var head_cone = new THREE.Mesh( geometry, material1 );
head_cone.scale.set(0.2,0.2,0.2);
head_cone.position.set(0,5.2,0);
head.add(head_cone);
mush_Pillar.add(head);

mush_Pillar.position.set(0,-0.1,0);

//Right side of mush_Pillar mush_Spikes
mush_Spikes1.scale.set(1.8,1.8,1.8);
mush_Spikes1.position.set(1.4,3.8,0);
mush_Pillar.add(mush_Spikes1);

//Left side of mush_Pillar mush_Spikes
mush_Spikes2.rotateZ(Math.PI);
mush_Spikes2.scale.set(1.8,1.7,1.8);
mush_Spikes2.position.set(-1.4,1.8,0);
mush_Pillar.add(mush_Spikes2);

//Front side of mush_Pillar mush_Spikes
mush_Spikes3.rotateY(-Math.PI/2);
mush_Spikes3.scale.set(1.8,1.8,1.8);
mush_Spikes3.position.set(0,3.8,1.4);
mush_Pillar.add(mush_Spikes3);

//Back side of mush_Pillar mush_Spikes
mush_Spikes4.rotateY(Math.PI/2);
mush_Spikes4.scale.set(1.8,1.8,1.8);
mush_Spikes4.position.set(0,3.8,-1.4);
mush_Pillar.add(mush_Spikes4);

mush_en.add(mush_Pillar);
mush_en.scale.set(0.8,0.8,0.8);
mush_en.position.set(0,-1,0);

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

//Add cones(mush_Spikes) to the head
head.add(h_cone1);
head.add(h_cone2);
head.add(h_cone3);
head.add(h_cone4);
head.add(h_cone5);
head.add(h_cone6);

return mush_en;

}

function mushRender(ob,x,z,s1,s2){
    t += 0.01;
    //console.log("t: "+t);
    //console.log("b.position.x:" +ob.position.x);
    //console.log("b.position.z:" +ob.position.z);
    ob.rotation.y += 5;
    ob.position.x = s1*Math.cos(t) +x;
    ob.position.z = s2*Math.sin(t) + z;
  };

 var f1 = 1;
  function mushRender_zp1(obj,z,dz) {

    obj.rotation.y += 5;

    obj.position.z +=f1;

    if(obj.position.z > z+dz){
      f1 = -1;
    }

    if(obj.position.z < z){
      f1 = 1;
    }


  };

  var f2 = 1;
   function mushRender_zp2(obj,z,dz) {

     obj.rotation.y += 5;

     obj.position.z +=f2;

     if(obj.position.z > z+dz){
       f2 = -1;
     }

     if(obj.position.z < z){
       f2 = 1;
     }


   };

   var f3 = 1;
    function mushRender_zp3(obj,z,dz) {

      obj.rotation.y += 5;

      obj.position.z +=f3;

      if(obj.position.z > z+dz){
        f3 = -1;
      }

      if(obj.position.z < z){
        f3 = 1;
      }


    };

    var f4 = 1;
     function mushRender_zp4(obj,z,dz) {

       obj.rotation.y += 5;

       obj.position.z +=f4;

       if(obj.position.z > z+dz){
         f4 = -1;
       }

       if(obj.position.z < z){
         f4 = 1;
       }


     };

     var f5 = -1;
      function mushRender_zn1(obj,z,dz) {

        obj.rotation.y += 5;

        obj.position.z +=f5;

        if(obj.position.z < z-dz){
          f5 = 1;
        }

        if(obj.position.z > z){
          f5 = -1;
        }


      };

      var f6 = -1;
       function mushRender_zn2(obj,z,dz) {

         obj.rotation.y += 5;

         obj.position.z +=f6;

         if(obj.position.z < z-dz){
           f6 = 1;
         }

         if(obj.position.z > z){
           f6 = -1;
         }


       };

       var f7 = -1;
        function mushRender_zn3(obj,z,dz) {

          obj.rotation.y += 5;

          obj.position.z +=f7;

          if(obj.position.z < z-dz){
            f7 = 1;
          }

          if(obj.position.z > z){
            f7 = -1;
          }


        };

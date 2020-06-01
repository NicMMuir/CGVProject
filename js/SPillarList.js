

//Spike Pillar postion and movement for map 3
function SPillarMap12(){

      var spikeEnemy = [];

     spikes_pillar = new GenEnemey();
     spikes_pillar.position.x = -50;
     spikes_pillar.position.y = 0;
     spikes_pillar.position.z = 0;
     spikes_pillar.scale.set(4,4,4);
     //scene.add(spikes_pillar);
     //spikeEnemy.push(spikes_pillar);
     //EnemyList.push(spikes_pillar);

  /*   spikes_pillar2 = spikes_pillar.clone();
     spikes_pillar2.position.set(50,0,0);
     scene.add(spikes_pillar2);
      spikeEnemy.push(spikes_pillar2);
     EnemyList.push(spikes_pillar2);

     spikes_pillar3 = spikes_pillar.clone();
     spikes_pillar3.position.set(-100,0,-50);
     scene.add(spikes_pillar3);
      spikeEnemy.push(spikes_pillar3);
     EnemyList.push(spikes_pillar3); */

          //Add more Spikes_pillars here



for (i=0; i<spikeEnemy.length; i++){
   var  targetPosX = spikeEnemy[i].position.x += 100;
  var  targetPosZ = spikeEnemy[i].position.z += 150;
  var  targetPosNX = spikeEnemy[i].position.x += -100;
  var  targetPosNZ = spikeEnemy[i].position.z += -150;

var targetPos1 = new THREE.Vector3(  targetPosX, spikeEnemy[i].position, spikeEnemy[i].position );
    var targetPos2 = new THREE.Vector3( spikeEnemy[i].position, spikeEnemy[i].position, targetPosNZ );
    var targetPos3 = new THREE.Vector3( targetPosNX, spikeEnemy[i].position, spikeEnemy[i].position );
    var targetPos4 = new THREE.Vector3( spikeEnemy[i].position, spikeEnemy[i].position, targetPosZ );

    var tween1 = new TWEEN.Tween( spikeEnemy[i].position ).to( targetPos1, 10000 );
    var tween2 = new TWEEN.Tween( spikeEnemy[i].position ).to( targetPos2, 10000 );
    var tween3 = new TWEEN.Tween( spikeEnemy[i].position ).to( targetPos3, 10000 );
    var tween4 = new TWEEN.Tween( spikeEnemy[i].position ).to( targetPos4, 10000 );

    //We also rotate the Enemy model
    var tweenRot = new TWEEN.Tween(pillar.rotation)
                .to({ y: "-" + Math.PI}) // relative animation

    tween1.chain( tween2 );
    tween2.chain( tween3 );
    tween3.chain( tween4 );
    tween4.chain( tween1 );

    tween1.start();
    tweenRot.start();         //Comment these 2 lines to stop rotation
    tweenRot.repeat(Infinity);//Comment these 2 lines to stop rotation
}

}























//Spike Pillar postion and movement for map 3
function SPillarMap3(){

      var spikeEnemy3 = [];

     spikes_pillar = new GenEnemey();
     spikes_pillar.position.x = -1900;
     spikes_pillar.position.y = 260;
     spikes_pillar.position.z = 1000;
     spikes_pillar.scale.set(4,4,4);
     scene.add(spikes_pillar);
     spikeEnemy3.push(spikes_pillar);
     EnemyList.push(spikes_pillar);

     spikes_pillar2 = spikes_pillar.clone();
     spikes_pillar2.position.set(-2000, 260, 1000);
     scene.add(spikes_pillar2);
      spikeEnemy3.push(spikes_pillar2);
     EnemyList.push(spikes_pillar2);

     spikes_pillar3 = spikes_pillar.clone();
     spikes_pillar3.position.set(-1800, 260, 1000);
     scene.add(spikes_pillar3);
      spikeEnemy3.push(spikes_pillar3);
     EnemyList.push(spikes_pillar3);


for (i=0; i<spikeEnemy3.length; i++){
   var  targetPosX = spikeEnemy3[i].position.x += 100;
  var  targetPosZ = spikeEnemy3[i].position.z += 150;
  var  targetPosNX = spikeEnemy3[i].position.x += -100;
  var  targetPosNZ = spikeEnemy3[i].position.z += -150;

var targetPos1 = new THREE.Vector3(  targetPosX, spikeEnemy3[i].position, spikeEnemy3[i].position );
    var targetPos2 = new THREE.Vector3( spikeEnemy3[i].position, spikeEnemy3[i].position, targetPosNZ );
    var targetPos3 = new THREE.Vector3( targetPosNX, spikeEnemy3[i].position, spikeEnemy3[i].position );
    var targetPos4 = new THREE.Vector3( spikeEnemy3[i].position, spikeEnemy3[i].position, targetPosZ );

    var tween1 = new TWEEN.Tween( spikeEnemy3[i].position ).to( targetPos1, 10000 );
    var tween2 = new TWEEN.Tween( spikeEnemy3[i].position ).to( targetPos2, 10000 );
    var tween3 = new TWEEN.Tween( spikeEnemy3[i].position ).to( targetPos3, 10000 );
    var tween4 = new TWEEN.Tween( spikeEnemy3[i].position ).to( targetPos4, 10000 );

    //We also rotate the Enemy model
    var tweenRot = new TWEEN.Tween(spikeEnemy3[i].rotation)
                .to({ y: "-" + Math.PI}) // relative animation

    tween1.chain( tween2 );
    tween2.chain( tween3 );
    tween3.chain( tween4 );
    tween4.chain( tween1 );

    tween1.start();
    tweenRot.start();         //Comment these 2 lines to stop rotation
    tweenRot.repeat(Infinity);//Comment these 2 lines to stop rotation
}

}

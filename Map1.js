var ObjectsArr = [];

//Textures
var texture = new THREE.TextureLoader().load( 'Textures/pebble.jpg' );
var texture2 = new THREE.TextureLoader().load( 'Textures/wood.jpg' );
var texture3 = new THREE.TextureLoader().load( 'Textures/brick.jpg' );
var texture4 = new THREE.TextureLoader().load( 'Textures/steel.jpg' );
var texture5 = new THREE.TextureLoader().load( 'Textures/start.jpg' );


var geometry1 = new THREE.BoxGeometry( 20, 1, 20 );
var material1 = new THREE.MeshBasicMaterial( {map: texture5, side: THREE.DoubleSide} );

var geometry2 = new THREE.BoxGeometry( 22, 3, 22 );
var material2 = new THREE.MeshBasicMaterial( { map: texture } );
var geometry3 = new THREE.BoxGeometry( 22, 3, 3 );
var material3 = new THREE.MeshBasicMaterial( { map: texture3 } );
var geometry4 = new THREE.BoxGeometry( 22, 3, 10 );
var material4 = new THREE.MeshBasicMaterial( { map: texture4 } );
var geometry5 = new THREE.BoxGeometry( 22, 3, 5 );
var material5 = new THREE.MeshBasicMaterial( { map: texture2 } );
var geometry6 = new THREE.BoxGeometry( 7, 3, 5 );
var material6 = new THREE.MeshBasicMaterial( { map: texture3 } );
var geometry7 = new THREE.BoxGeometry( 14, 3, 5 );
var geometry8 = new THREE.CircleGeometry( 10, 10, 10 );

var floor1 = new THREE.Mesh( geometry1, material1 );
var floor2 = new THREE.Mesh( geometry2, material2 );
var floor3 = new THREE.Mesh( geometry2, material2 );
var floor4 = new THREE.Mesh( geometry2, material2 );
var floor5 = new THREE.Mesh( geometry2, material2 );
var cubicLog1 = new THREE.Mesh( geometry3, material3 );
var floor6 = new THREE.Mesh( geometry4, material4 );
var floor7 = new THREE.Mesh( geometry4, material4 );
//Steps begin:
var floor8 = new THREE.Mesh( geometry5, material5 );
var floor9 = new THREE.Mesh( geometry5, material5 );
var floor10 = new THREE.Mesh( geometry5, material5 );
var floor11 = new THREE.Mesh( geometry6, material6 );
var floor12 = new THREE.Mesh( geometry6, material6 );
var floor13 = new THREE.Mesh( geometry5, material5 );
var floor14 = new THREE.Mesh( geometry5, material5 );
var floor15 = new THREE.Mesh( geometry5, material5 );
var floor16 = new THREE.Mesh( geometry7, material6 );
var floor17 = new THREE.Mesh( geometry5, material5 );
var floor18 = new THREE.Mesh( geometry5, material5 );
var floor19 = new THREE.Mesh( geometry7, material6 );
var floor20 = new THREE.Mesh( geometry5, material5 );
//Steps end
var floor21 = new THREE.Mesh( geometry2, material2 );
var cubicLog2 = new THREE.Mesh( geometry3, material3 );
var floor22 = new THREE.Mesh( geometry2, material2 );
var floor23 = new THREE.Mesh( geometry2, material2 );
var floor24 = new THREE.Mesh( geometry2, material2 );
var cubicLog3 = new THREE.Mesh( geometry3, material3 );
var floor25 = new THREE.Mesh( geometry8, material2 );


function genarr(){
  ObjectsArr.push(floor1);
  ObjectsArr.push(floor2);
  ObjectsArr.push(floor3);
  ObjectsArr.push(floor4);
  ObjectsArr.push(floor5);
  ObjectsArr.push(cubicLog1);
  ObjectsArr.push(floor6);
  ObjectsArr.push(floor7);
  ObjectsArr.push(floor8);
  ObjectsArr.push(floor9);
  ObjectsArr.push(floor10);
  ObjectsArr.push(floor11);
  ObjectsArr.push(floor12);
  ObjectsArr.push(floor13);
  ObjectsArr.push(floor14);
  ObjectsArr.push(floor15);
  ObjectsArr.push(floor16);
  ObjectsArr.push(floor17);
  ObjectsArr.push(floor19);
  ObjectsArr.push(floor20);
  ObjectsArr.push(floor21);
  ObjectsArr.push(cubicLog2);
  ObjectsArr.push(floor22);
  ObjectsArr.push(floor23);
  ObjectsArr.push(floor24);
  ObjectsArr.push(cubicLog3);
  ObjectsArr.push(floor25);
}

function moveobjects(){
  floor2.position.y = -2;
	floor2.position.z = -20;
	floor3.position.x = -20;
	floor4.position.x = +20;
	floor5.position.z = -45;
	floor5.position.y = -2;
	cubicLog1.position.z = -40;
	floor6.position.y = -4;
	floor6.position.z = -65;
	floor7.position.y = -4;
	floor7.position.z = -85;
	floor8.position.y = -2;
	floor8.position.z = -90;
	floor9.position.y = 1;
	floor9.position.z = -95;
	floor10.position.y = 4;
	floor10.position.z = -100;
	floor11.position.x = 7.5;
	floor11.position.y = 7;
	floor11.position.z = -100;
	floor12.position.x = -7.5;
	floor12.position.y = 7;
	floor12.position.z = -100;
	floor13.position.y = 7;
	floor13.position.z = -105;
	floor14.position.y = 10;
	floor14.position.z = -105;
	floor15.position.y = 13;
	floor15.position.z = -110;
	floor16.position.x = 4;
	floor16.position.y = 16;
	floor16.position.z = -110;
	floor17.position.y = 16;
	floor17.position.z = -115;
	floor18.position.y = 19;
	floor18.position.z = -115;
	floor19.position.x = -4;
	floor19.position.y = 22;
	floor19.position.z = -115;
	floor20.position.y = 22;
	floor20.position.z = -120;
	floor21.position.y = 25;
	floor21.position.z = -128;
	cubicLog2.position.y = 28;
	cubicLog2.position.z = -128;
	floor22.position.x = 7;
	floor22.position.y = 25;
	floor22.position.z = -158;
	floor22.rotation.set(0, -Math.PI / 6, 0);
	floor23.position.x = 22;
	floor23.position.y = 25;
	floor23.position.z = -180;
	floor23.rotation.set(0, -40, 0);
	floor24.position.x = 40;
	floor24.position.y = 25;
	floor24.position.z = -200;
	floor24.rotation.set(0, -40, 0);
	cubicLog3.position.x = 40;
	cubicLog3.position.y = 28;
	cubicLog3.position.z = -200;
	cubicLog3.rotation.set(0,40, 0);
	floor25.position.x = 55;
	floor25.position.y = 25;
	floor25.position.z = -200;
}

function getarr(){
  moveobjects();
  genarr();
}

 var CharacterBuild = new THREE.Object3D();
 var Char;
 var childern = []



function Charinit(){
  var loader = new THREE.GLTFLoader();
  loader.load('/Charblender/Character.glb', function(gltf){
  CharacterBuild = gltf.scene;
  console.log(CharacterBuild);
  });
}

























// var feet = new THREE.Object3D();
//
// // var graphics;
// // var scene = new THREE.Scene();
// // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// //
// // var renderer = new THREE.WebGLRenderer();
// // renderer.setSize( window.innerWidth, window.innerHeight );
// // document.body.appendChild( renderer.domElement );
// //
// // camera.position.z = 10;
//
//
//
//
//   CharBody();
//   //constructChar();
// 	//requestAnimationFrame( animate );
// 	//renderer.render( scene, camera );
//
//
//   function CharStationary(){
//     var geometry = new THREE.SphereGeometry(1, 20, 10 );
//     var material = new THREE.MeshBasicMaterial( {color: 0xAF24C8} );
//     var CharacterBody = new THREE.Mesh( geometry, material );
//     CharacterBody.translateY(2)
//     var feetobj = CharFeet();
//     feetobj.rotateX(90);
//     CharacterBuild.add(CharacterBody);
//     CharacterBuild.add(feetobj);
//   }
//
// //Might need to translate in the actual Sceen.js might be easier
//   // function CharLFforward(){
//   //   var geometry = new THREE.SphereGeometry(1, 20, 10 );
//   //   var material = new THREE.MeshBasicMaterial( {color: 0xAF24C8} );
//   //   var CharacterBody = new THREE.Mesh( geometry, material );
//   //   CharacterBody.translateY(2)
//   //   var feetobj = CharFeet();
//   //   feetobj.rotateX(Math.PI / 2);
//   //   feetobj.Foot1.translateZ(-1);
//   //   feetobj.Foot2.translateZ(1);
//   //   CharacterBuild.add(CharacterBody);
//   //   CharacterBuild.add(feetobj);
//   // }
//   //
//   // function CharRFforward(){
//   //   var geometry = new THREE.SphereGeometry(1, 20, 10 );
//   //   var material = new THREE.MeshBasicMaterial( {color: 0xAF24C8} );
//   //   var CharacterBody = new THREE.Mesh( geometry, material );
//   //   CharacterBody.translateY(2)
//   //   var feetobj = CharFeet();
//   //   feetobj.rotateX(Math.PI / 2);
//   //   feetobj.Foot1.translateZ(1);
//   //   feetobj.Foot2.translateZ(-1);
//   //
//   //   CharacterBuild.add(CharacterBody);
//   //   CharacterBuild.add(feetobj);
//   // }
//   //
//   //
//   //
//
// function CharBody(){
//   var geometry = new THREE.SphereGeometry(1, 20, 10 );
//   var material = new THREE.MeshBasicMaterial( {color: 0xAF24C8} );
//   var CharacterBody = new THREE.Mesh( geometry, material );
//   CharacterBody.translateY(2)
//   var feetobj = CharFeet();
//   feetobj.rotateX(90);
//   CharacterBuild.add(CharacterBody);
//   CharacterBuild.add(feetobj);
// }
//
// function CharFeet(){
//   var Foot1 = CharFoot(0.5,1,20);
//   Foot1.translateX(-0.5);
//   var Foot2 = CharFoot(0.5,1,20);
//   Foot2.translateX(0.5);
//   feet.add(Foot1);
//   feet.add(Foot2);
//   return(feet);
// }
//
//
//
//
// function CharFoot(radius, height,radialSegments){
// //Combination of triangles
// const geometry = new THREE.ConeBufferGeometry(radius, height, radialSegments);
// const material = new THREE.MeshBasicMaterial( {color: 0xAF24C8} );
// var foot = new THREE.Mesh(geometry,material);
// return(foot);
// }

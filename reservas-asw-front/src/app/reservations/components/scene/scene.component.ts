import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styles: [
  ]
})
export class SceneComponent {

constructor(){
  const clock = new THREE.Clock();

  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild( renderer.domElement );

  const pmremGenerator = new THREE.PMREMGenerator( renderer );

  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 );
  scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

  const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
  camera.position.set( 5, 2, 8 );

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.target.set( 0, 0.5, 0 );
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath( 'js/libs/draco/gltf/' );

  const loader = new GLTFLoader();
  loader.setDRACOLoader( dracoLoader );
  loader.load( 'assets/models/18th_floor/18th_floor.gltf', function ( gltf ) {

    const model = gltf.scene;
    model.position.set( 1, 1, 0 );
    model.scale.set( 1, 1, 1);
    scene.add( model );

    animate();

  }, undefined, function ( e ) {

    console.error( e );

  } );


  window.onresize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  };


  function animate() {

    requestAnimationFrame( animate );

    const delta = clock.getDelta();

    controls.update();

    renderer.render( scene, camera );
  }
}
}

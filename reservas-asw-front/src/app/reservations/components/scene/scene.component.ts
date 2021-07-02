import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styles: [
  ]
})
export class SceneComponent {

constructor(){
  const loader = new GLTFLoader();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  camera.position.z = 2

  scene.background = new THREE.Color( 0xffffff );

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize ( window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );

  const controls = new OrbitControls(camera, renderer.domElement)

  loader.load( 'assets/models/18th_floor/18th_floor.gltf', function ( gltf ) {

    scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
    
}

var animate = function () {
    requestAnimationFrame(animate)

    controls.update()

    render()
};

function render() {
    renderer.render(scene, camera)
}
animate();

}
}

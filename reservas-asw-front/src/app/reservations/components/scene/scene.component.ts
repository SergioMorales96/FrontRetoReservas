import { Component, Input, OnInit } from '@angular/core';
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
export class SceneComponent implements OnInit {

  @Input() idpiso: number = 0;

  path3D : string = '';

  constructor(){} 

  ngOnInit(): void{
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
    const controls = new OrbitControls( camera, renderer.domElement );
    const dracoLoader = new DRACOLoader();
    const loader = new GLTFLoader();

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild( renderer.domElement );

    scene.background = new THREE.Color( 0x000000 );
    scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

    camera.position.set( 5, 2, 8 );

    controls.target.set( 0, 0.5, 0 );
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    loader.setDRACOLoader( dracoLoader );

    if(this.idpiso==1){
      console.log('Cargado piso 18');

      this.path3D = 'assets/models/18th_floor/18th_floor.gltf';

    }else if(this.idpiso==2){
      console.log('Cargado piso 19');
      
      this.path3D = 'assets/models/19th_floor/19th_floor.gltf';

    }else if(this.idpiso==3){
      console.log('Cargado Piso 20');

      this.path3D = 'assets/models/20th_floor/20th_floor.gltf';
      
    }else{
      console.log('No cargado ningun piso'); 
    }
    loader.load( this.path3D, function ( gltf ) {

      const model3 = gltf.scene;
      model3.position.set( 1, 3, 0 );
      model3.scale.set( 1, 1, 1);
      scene.add( model3 );

    }, undefined, function ( e ) {

      console.error( e );

    } );

    loader.load( 'assets/models/chairs/chairs.gltf', function ( gltf ) {

      const model4 = gltf.scene;
      model4.position.set( 1, -1, 0 );
      model4.scale.set( 1, 1, 1);
      scene.add( model4 );

    }, undefined, function ( e ) {

      console.error( e );

    } );

    loader.load( 'assets/models/small_chair/small_chair.gltf', function ( gltf ) {

      const model5 = gltf.scene;
      model5.position.set( 0, -1, 0 );
      model5.scale.set( 1, 1, 1);
      scene.add( model5 );

    }, undefined, function ( e ) {

      console.error( e );

    } );

    loader.load( 'assets/models/stairs/stairs.gltf', function ( gltf ) {

      const model6 = gltf.scene;
      model6.position.set( -3, -1, 0 );
      model6.scale.set( 1, 1, 1);
      scene.add( model6 );

    }, undefined, function ( e ) {

      console.error( e );

    } );

    animate();

    window.onresize = function () {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    };


    function animate() {

      requestAnimationFrame( animate );

      controls.update();

      renderer.render( scene, camera );
    }
  }

}

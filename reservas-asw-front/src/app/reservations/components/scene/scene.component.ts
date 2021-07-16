import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { map } from 'rxjs/operators';

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

      const modelPiso = gltf.scene.children[0] as THREE.Mesh;
      console.log(modelPiso);
      const materialPiso = modelPiso.material as THREE.MeshStandardMaterial;

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const objects = [modelPiso];
      let intersects = [];

      modelPiso.position.set( 0, 0, 0 );
      modelPiso.scale.set( 1, 1, 1);

      scene.add( modelPiso ); 

      renderer.domElement.addEventListener("click", onClick);

      function onClick(event:any) {

        mouse.x = event.clientX / window.innerWidth * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        intersects = raycaster.intersectObjects(objects);

        if (intersects.length > 0) {

          materialPiso.color = new THREE.Color( 0xbf );
          materialPiso.opacity = 0.49;
          materialPiso.roughness = 0.9;
          materialPiso.metalness = 0;
          materialPiso.fog= true;
          materialPiso.transparent= true;
          materialPiso.depthTest = true;
          materialPiso.depthWrite = true;
          materialPiso.side = THREE.FrontSide;

        }else {

          materialPiso.color = new THREE.Color( 0x3131ff);
          materialPiso.opacity = 1;
          materialPiso.roughness = 0.9;
          materialPiso.metalness = 0;
          materialPiso.fog= true;
          materialPiso.transparent= true;
          materialPiso.depthTest = true;
          materialPiso.depthWrite = true;
          materialPiso.side = THREE.FrontSide;

        }
}

    }, undefined, function ( e ) {

      console.error( e );

    } );

    loader.load( 'assets/models/chairs/chairs.gltf', function ( gltf ) {

      const modelPT = gltf.scene.children[0];
      console.log(modelPT);
      const puestoTrabajo = modelPT.getObjectByName( 'Cube024') as THREE.Mesh;
      const materialPT = puestoTrabajo.material as THREE.MeshStandardMaterial;

      modelPT.position.set( 1, -1, 0 );
      modelPT.scale.set( 1, 1, 1);
      
      materialPT.color = new THREE.Color( 0xffffff );
      materialPT.opacity = 0.5;
      materialPT.roughness = 0;
      materialPT.metalness = 1;
      materialPT.fog= true;
      materialPT.transparent= true;
      materialPT.depthTest = true;
      materialPT.depthWrite = true;
      materialPT.side = THREE.FrontSide;

      scene.add( modelPT );

    }, undefined, function ( e ) {

      console.error( e );

    } );

    loader.load( 'assets/models/small_chair/small_chair.gltf', function ( gltf ) {

      const modelSilla = gltf.scene.children[0];
      console.log(modelSilla);
      const silla = modelSilla.getObjectByName( 'Cube024') as THREE.Mesh;
      const materialSilla = silla.material as THREE.MeshStandardMaterial;

      modelSilla.position.set( 0, -1, 0 );
      modelSilla.scale.set( 1, 1, 1);

      materialSilla.color = new THREE.Color( 0x444B93 );
      materialSilla.opacity = 1;
      materialSilla.roughness = 1;
      materialSilla.metalness = 0;
      materialSilla.fog= true;
      materialSilla.transparent= false;
      materialSilla.depthTest = true;
      materialSilla.depthWrite = true;
      materialSilla.side = THREE.FrontSide;
    
      scene.add( modelSilla );

    }, undefined, function ( e ) {

      console.error( e );

    } );

    loader.load( 'assets/models/stairs/stairs.gltf', function ( gltf ) {

      const modelEscalera = gltf.scene.children[0] as THREE.Mesh;
      console.log(modelEscalera);
      const materialEscalera = modelEscalera.material as THREE.MeshStandardMaterial;

      modelEscalera.position.set( -3, -1, 0 );
      modelEscalera.rotateY(180);
      //modelEscalera.scale.set( 10, 1, 1);
      
      materialEscalera.color = new THREE.Color( 0xbf );
      materialEscalera.opacity = 0.49;
      materialEscalera.roughness = 0.9;
      materialEscalera.metalness = 1;
      materialEscalera.fog= true;
      materialEscalera.transparent= true;
      materialEscalera.depthTest = true;
      materialEscalera.depthWrite = true;
      materialEscalera.side = THREE.FrontSide;

      scene.add( modelEscalera );

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

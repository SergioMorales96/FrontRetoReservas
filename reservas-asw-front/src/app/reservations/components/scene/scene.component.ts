import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { map } from 'rxjs/operators';
import { FogExp2, Mesh } from 'three';

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
    scene.fog = new THREE.Fog(0x681453, 1, 20);

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
      //console.log(modelPiso);
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

          materialPiso.color = new THREE.Color( 0x3131ff);
          materialPiso.opacity = 1;
          materialPiso.roughness = 0.9;
          materialPiso.metalness = 0;
          materialPiso.fog= false;
          materialPiso.transparent= true;
          materialPiso.depthTest = true;
          materialPiso.depthWrite = true;
          materialPiso.side = THREE.FrontSide;
        
        }else {

          materialPiso.color = new THREE.Color( 0xbf );
          materialPiso.opacity = 0.49;
          materialPiso.roughness = 0.9;
          materialPiso.metalness = 0;
          materialPiso.fog= false;
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

      const modelPT = gltf.scene.children[0] as THREE.Mesh;
      console.log(modelPT);

      modelPT.position.set( 1, -1, 0 );
      modelPT.scale.set( 1, 1, 1);
      
      const INITIAL_MAP = [
        {childID: "Cube024", //sillin
        mtl: new THREE.MeshStandardMaterial( { 
          color: 0x444b93,
          opacity: 1,
          roughness: 1,
          metalness: 0,
          fog: true,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide} )
        },
        {childID: "Cube024_1", 
        mtl: new THREE.MeshStandardMaterial( { 
          color: 0x1e, //Union espaldar silla
          opacity: 1,
          roughness: 0.3,
          metalness: 1,
          fog: false,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        },
        {childID: "Cube017", //Patas silla
        mtl: new THREE.MeshStandardMaterial( { 
          color: 0x1e,
          opacity: 1,
          roughness: 0.3,
          metalness: 1,
          fog: false,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        },
        {childID: "Cube018", //Espaldar silla
        mtl: new THREE.MeshStandardMaterial( { 
          color: 0x444b93, 
          opacity: 1,
          roughness: 1,
          metalness: 0,
          fog: true,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        },
        {childID: "Cube020", //Mesa
        mtl: new THREE.MeshStandardMaterial( { 
          color: 0xffffff, 
          opacity: 0.5,
          roughness: 0,
          metalness: 1,
          fog: false,
          transparent: true,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )}
      ];

      for (let object of INITIAL_MAP) {
        initColor(modelPT, object.childID, object.mtl);
      }
      

      scene.add( modelPT );

    }, undefined, function ( e ) {

      console.error( e );

    } );

    loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {

      const modelPS = gltf.scene ;
      console.log(modelPS);

      modelPS.position.set( 0, -1, 0 );
      modelPS.scale.set( 1, 1, 1);

      const modelPS_silla = modelPS.children[3] as THREE.Mesh;
      const modelPS_mesa = modelPS.children[4] as THREE.Mesh;

      const INITIAL_MAP_silla = [
        {childID: "Cube024", //sillin
        mtl: new THREE.MeshStandardMaterial( { 
          color: 0x444b93,
          opacity: 1,
          roughness: 1,
          metalness: 0,
          fog: true,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide} )
        },
        {childID: "Cube024_1", 
        mtl: new THREE.MeshStandardMaterial( { 
          color: 0x1e, //Union espaldar silla
          opacity: 1,
          roughness: 0.3,
          metalness: 1,
          fog: false,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        },
        {childID: "Cube017", //Patas silla
        mtl: new THREE.MeshStandardMaterial( { 
          color: 0x1e,
          opacity: 1,
          roughness: 0.3,
          metalness: 1,
          fog: false,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        },
        {childID: "Cube018", //Espaldar silla
        mtl: new THREE.MeshStandardMaterial( { 
          color: 0x444b93, 
          opacity: 1,
          roughness: 1,
          metalness: 0,
          fog: true,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        }
      ];

      const INITIAL_MAP_mesa = [
        {childID: "Cube020", //Mesa
        mtl: new THREE.MeshStandardMaterial( { 
          color: 0xffffff, 
          opacity: 0.5,
          roughness: 0,
          metalness: 1,
          fog: false,
          transparent: true,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        }
      ];

      for (let object of INITIAL_MAP_silla) {
        initColor(modelPS_silla, object.childID, object.mtl);
      }

      for (let object of INITIAL_MAP_mesa) {
        initColor(modelPS_mesa, object.childID, object.mtl);
      }

      scene.add( modelPS );

    }, undefined, function ( e ) {

      console.error( e );

    } );

    loader.load( 'assets/models/stairs/stairs.gltf', function ( gltf ) {

      const modelEscalera = gltf.scene.children[0] as THREE.Mesh;
      const materialEscalera = modelEscalera.material as THREE.MeshStandardMaterial;

      modelEscalera.position.set( -3, -1, 0 );
      modelEscalera.rotateY(180);
      //modelEscalera.scale.set( 10, 1, 1);
      
      materialEscalera.color = new THREE.Color( 0xbf );
      materialEscalera.opacity = 0.49;
      materialEscalera.roughness = 0.9;
      materialEscalera.metalness = 0;
      materialEscalera.fog= false;
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

    function initColor(parent: any, type: any, mtl: any) {
      parent.traverse((o: any) => {
       if (o.isMesh) {
         if (o.name.includes(type)) {
              o.material = mtl;
              o.nameID = type;
           }
       }
     });
    }

  }

}

import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { MeshStandardMaterial } from 'three';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styles: [
  ]
})
export class SceneComponent implements OnInit {

  @Input() idFloor: number = 0;

  constructor(){} 

  ngOnInit(): void{
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
    const controls = new OrbitControls( camera, renderer.domElement );
    const dracoLoader = new DRACOLoader();
    const loader = new GLTFLoader();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let intersects = [];
    let floor: string = '';

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

    floor = selectFloor(this.idFloor);

    loader.load( floor, function ( gltf ) {

      const modelFloor = gltf.scene.children[0] as THREE.Mesh;
      const materialFloor = modelFloor.material as THREE.MeshStandardMaterial;
      const objects = [modelFloor];

      modelFloor.position.set( 0, 0, 0 );
      modelFloor.scale.set( 1, 1, 1);

      scene.add( modelFloor ); 

      renderer.domElement.addEventListener("click", onClick);

      function onClick(event:any) {

        mouse.x = event.clientX / window.innerWidth * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        intersects = raycaster.intersectObjects(objects);

        if (intersects.length > 0) {

          materialFloor.color = new THREE.Color( 0x3131ff);
          materialFloor.opacity = 1;
          materialFloor.roughness = 0.9;
          materialFloor.metalness = 0;
          materialFloor.fog= false;
          materialFloor.transparent= true;
          materialFloor.depthTest = true;
          materialFloor.depthWrite = true;
          materialFloor.side = THREE.FrontSide;
        
        }else {

          materialFloor.color = new THREE.Color( 0xbf );
          materialFloor.opacity = 0.49;
          materialFloor.roughness = 0.9;
          materialFloor.metalness = 0;
          materialFloor.fog= false;
          materialFloor.transparent= true;
          materialFloor.depthTest = true;
          materialFloor.depthWrite = true;
          materialFloor.side = THREE.FrontSide;

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

      const modelStairs = gltf.scene.children[0] as THREE.Mesh;
      const materialStairs = modelStairs.material as THREE.MeshStandardMaterial;

      modelStairs.position.set( -3, -1, 0 );
      modelStairs.rotateY(180);
      //modelEscalera.scale.set( 10, 1, 1);
      
      materialStairs.color = new THREE.Color( 0xbf );
      materialStairs.opacity = 0.49;
      materialStairs.roughness = 0.9;
      materialStairs.metalness = 0;
      materialStairs.fog= false;
      materialStairs.transparent= true;
      materialStairs.depthTest = true;
      materialStairs.depthWrite = true;
      materialStairs.side = THREE.FrontSide;

      scene.add( modelStairs );

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

    function initColor(parent: THREE.Mesh, type: string, mtl: MeshStandardMaterial) {
      parent.traverse((o: any) => {
       if (o.isMesh) {
         if (o.name.includes(type)) {
            o.material = mtl;
            o.nameID = type;
          }
        }
      });
    }

    function selectFloor (id: number) {

      let path3D : string = '';

      if(id==1){
        console.log('Cargado piso 18');
  
        path3D = 'assets/models/18th_floor/18th_floor.gltf';
  
      }else if(id==2){
        console.log('Cargado piso 19');
        
        path3D = 'assets/models/19th_floor/19th_floor.gltf';
  
      }else if(id==3){
        console.log('Cargado Piso 20');
  
        path3D = 'assets/models/20th_floor/20th_floor.gltf';
        
      }else{
        console.log('No cargado ningun piso'); 
      }

      return path3D;

    }

  }

}

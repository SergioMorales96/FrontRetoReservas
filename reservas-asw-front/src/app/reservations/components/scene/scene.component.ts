import * as THREE from 'three';
import { Component, Input, OnInit } from '@angular/core';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshStandardMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const CAMERA_FOV = 40;
const CAMERA_NEAR = 1;
const CAMERA_FAR = 100;
const BACKGROUND_COLOR = 0x000000;
const SCENE_SIGMA = 0.04;
const FOG_COLOR = 0x681453;
const FOG_NEAR = 1;
const FOG_FAR = 20;
const CAMERA_X_INIT = 5;
const CAMERA_Y_INIT = 2;
const CAMERA_Z_INIT = 8;
const CAMERA_TARGET_X = 0;
const CAMERA_TARGET_Y = 0;
const CAMERA_TARGET_Z = 0;
const FLOOR_POS_X = 0;
const FLOOR_POS_Y = 0;
const FLOOR_POS_Z = 0;
const FLOOR_SCALE_X = 1;
const FLOOR_SCALE_Y = 1;
const FLOOR_SCALE_Z = 1;
const CHAIRS_POS_X = 1;
const CHAIRS_POS_Y = -1;
const CHAIRS_POS_Z = 0;
const CHAIRS_SCALE_X = 1;
const CHAIRS_SCALE_Y = 1;
const CHAIRS_SCALE_Z = 1;
const ROOMS_POS_X = 0;
const ROOMS_POS_Y = -1;
const ROOMS_POS_Z = 0;
const ROOMS_SCALE_X = 1;
const ROOMS_SCALE_Y = 1;
const ROOMS_SCALE_Z = 1;
const STAIRS_POS_X = -3;
const STAIRS_POS_Y = -1;
const STAIRS_POS_Z = 0;
const STAIRS_SCALE_X = 1;
const STAIRS_SCALE_Y = 1;
const STAIRS_SCALE_Z = 1;
const FLOOR_ACTIVE_COLOR = 0x3131ff;
const FLOOR_INACTIVE_COLOR = 0xbf;
const CHAIR_SADDLE_COLOR = 0x444b93;
const CHAIR_BACK_COLOR = 0x444b93;
const CHAIR_UNION_COLOR = 0x1e;
const CHAIR_WHEELS_COLOR = 0x1e;
const TABLE_COLOR = 0xffffff;
const STAIRS_COLOR = 0xbf;
const PATH = 'assets/models/';
const PATH_FLOOR_18 = '18th_floor/18th_floor.gltf';
const PATH_FLOOR_19 = '19th_floor/19th_floor.gltf';
const PATH_FLOOR_20 = '20th_floor/20th_floor.gltf';
const PATH_CHAIRS = 'chairs/chairs.gltf';
const PATH_ROOMS = 'PUESTOS CON MESA/PLANOS 3D.gltf';
const PATH_STAIRS = 'stairs/stairs.gltf';
const MOUSE_VAL1 = 1;
const MOUSE_VAL2 = 2;


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
    this.main();
  }

  main(): void {
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( CAMERA_FOV, window.innerWidth / window.innerHeight, CAMERA_NEAR, CAMERA_FAR );
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

    scene.background = new THREE.Color( BACKGROUND_COLOR );
    scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), SCENE_SIGMA ).texture;
    scene.fog = new THREE.Fog(FOG_COLOR, FOG_NEAR, FOG_FAR);

    camera.position.set( CAMERA_X_INIT, CAMERA_Y_INIT, CAMERA_Z_INIT );

    controls.target.set( CAMERA_TARGET_X, CAMERA_TARGET_Y, CAMERA_TARGET_Z );
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    loader.setDRACOLoader( dracoLoader );

    floor = selectFloor(this.idFloor);

    loader.load( floor, function ( gltf ) {

      const modelFloor = gltf.scene.children[0] as THREE.Mesh;
      const materialFloor = modelFloor.material as THREE.MeshStandardMaterial;
      const objects = [modelFloor];

      modelFloor.position.set( FLOOR_POS_X, FLOOR_POS_Y, FLOOR_POS_Z );
      modelFloor.scale.set( FLOOR_SCALE_X, FLOOR_SCALE_Y, FLOOR_SCALE_Z);

      scene.add( modelFloor ); 

      renderer.domElement.addEventListener("click", onClick);

      function onClick(event:any) {

        mouse.x = event.clientX / window.innerWidth * MOUSE_VAL2 - MOUSE_VAL1;
        mouse.y = -(event.clientY / window.innerHeight) * MOUSE_VAL2 + MOUSE_VAL1;
        raycaster.setFromCamera(mouse, camera);
        intersects = raycaster.intersectObjects(objects);

        if (intersects.length > 0) {

          materialFloor.color = new THREE.Color( FLOOR_ACTIVE_COLOR );
          materialFloor.opacity = 1;
          materialFloor.roughness = 0.9;
          materialFloor.metalness = 0;
          materialFloor.fog= false;
          materialFloor.transparent= true;
          materialFloor.depthTest = true;
          materialFloor.depthWrite = true;
          materialFloor.side = THREE.FrontSide;
        
        }else {

          materialFloor.color = new THREE.Color( FLOOR_INACTIVE_COLOR );
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

    loader.load( `${PATH}${PATH_CHAIRS}` , function ( gltf ) {

      const modelPT = gltf.scene.children[0] as THREE.Mesh;
      console.log(modelPT);

      modelPT.position.set( CHAIRS_POS_X, CHAIRS_POS_Y, CHAIRS_POS_Z );
      modelPT.scale.set( CHAIRS_SCALE_X, CHAIRS_SCALE_Y, CHAIRS_SCALE_Z);
      
      const INITIAL_MAP = [
        {childID: "Cube024", 
        mtl: new THREE.MeshStandardMaterial( { 
          color: CHAIR_SADDLE_COLOR,
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
          color: CHAIR_UNION_COLOR, 
          opacity: 1,
          roughness: 0.3,
          metalness: 1,
          fog: false,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        },
        {childID: "Cube017", 
        mtl: new THREE.MeshStandardMaterial( { 
          color: CHAIR_WHEELS_COLOR,
          opacity: 1,
          roughness: 0.3,
          metalness: 1,
          fog: false,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        },
        {childID: "Cube018", 
        mtl: new THREE.MeshStandardMaterial( { 
          color: CHAIR_BACK_COLOR, 
          opacity: 1,
          roughness: 1,
          metalness: 0,
          fog: true,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        },
        {childID: "Cube020", 
        mtl: new THREE.MeshStandardMaterial( { 
          color: TABLE_COLOR, 
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

    loader.load( `${PATH}${PATH_ROOMS}` , function ( gltf ) {

      const modelPS = gltf.scene ;
      console.log(modelPS);

      modelPS.position.set( ROOMS_POS_X, ROOMS_POS_Y, ROOMS_POS_Z );
      modelPS.scale.set( ROOMS_SCALE_X, ROOMS_SCALE_Y, ROOMS_SCALE_Z);

      const modelPS_silla = modelPS.children[3] as THREE.Mesh;
      const modelPS_mesa = modelPS.children[4] as THREE.Mesh;

      const INITIAL_MAP_silla = [
        {childID: "Cube024",
        mtl: new THREE.MeshStandardMaterial( { 
          color: CHAIR_SADDLE_COLOR,
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
          color: CHAIR_UNION_COLOR, 
          opacity: 1,
          roughness: 0.3,
          metalness: 1,
          fog: false,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        },
        {childID: "Cube017", 
        mtl: new THREE.MeshStandardMaterial( { 
          color: CHAIR_WHEELS_COLOR,
          opacity: 1,
          roughness: 0.3,
          metalness: 1,
          fog: false,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        },
        {childID: "Cube018", 
        mtl: new THREE.MeshStandardMaterial( { 
          color: CHAIR_BACK_COLOR, 
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
        {childID: "Cube020", 
        mtl: new THREE.MeshStandardMaterial( { 
          color: TABLE_COLOR, 
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

    loader.load( `${PATH}${PATH_STAIRS}` , function ( gltf ) {

      const modelStairs = gltf.scene.children[0] as THREE.Mesh;
      const materialStairs = modelStairs.material as THREE.MeshStandardMaterial;

      modelStairs.position.set( STAIRS_POS_X, STAIRS_POS_Y, STAIRS_POS_Z );
      //modelStairs.scale.set( STAIRS_SCALE_X, STAIRS_SCALE_Y, STAIRS_SCALE_Z);
      
      materialStairs.color = new THREE.Color( STAIRS_COLOR );
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
  
        path3D = `${PATH}${PATH_FLOOR_18}`;
  
      }else if(id==2){
        console.log('Cargado piso 19');
        
        path3D = `${PATH}${PATH_FLOOR_19}`;
  
      }else if(id==3){
        console.log('Cargado Piso 20');
  
        path3D = `${PATH}${PATH_FLOOR_20}`;
        
      }else{
        console.log('No cargado ningun piso'); 
      }

      return path3D;

    }
  }

}

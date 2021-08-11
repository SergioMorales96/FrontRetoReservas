import * as THREE from 'three';
import { Component, Input, OnInit } from '@angular/core';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshStandardMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'


const CAMERA_FOV = 60;
const CAMERA_NEAR = 1;
const CAMERA_FAR = 1000;
const BACKGROUND_COLOR = 0xffffff;
const SCENE_SIGMA = 0.04;
const CAMERA_X_INIT = 0;
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
const FLOOR_ACTIVE_COLOR = 0xbf;
const FLOOR_INACTIVE_COLOR = 0x4848dd;
const CHAIR_SADDLE_COLOR = 0x444b93;
const CHAIR_BACK_COLOR = 0x444b93;
const CHAIR_UNION_COLOR = 0x1e;
const CHAIR_WHEELS_COLOR = 0x1e;
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

    const renderer = new THREE.WebGLRenderer( { alpha: true ,antialias: true } );
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
    let stars: THREE.Mesh[] = [];

    scene.background = new THREE.Color( BACKGROUND_COLOR );

    let pointlight = new THREE.PointLight(0xffffff,2);
    pointlight.position.set(200,200,200);
    scene.add(pointlight);

    scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), SCENE_SIGMA ).texture;

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement);

    camera.position.set( CAMERA_X_INIT, CAMERA_Y_INIT, CAMERA_Z_INIT );

    controls.target.set( CAMERA_TARGET_X, CAMERA_TARGET_Y, CAMERA_TARGET_Z );
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    
    loader.setDRACOLoader( dracoLoader );

    floor = selectFloor(this.idFloor);

    loader.load( floor, function ( gltf ) {

      const modelFloor = gltf.scene.children[0] as THREE.Mesh;
      const materialFloor = modelFloor.material as THREE.MeshPhysicalMaterial;
      const objects = [modelFloor];

      modelFloor.position.set( FLOOR_POS_X, FLOOR_POS_Y, FLOOR_POS_Z );
      //modelFloor.scale.set( FLOOR_SCALE_X, FLOOR_SCALE_Y, FLOOR_SCALE_Z);

      colorFloor(materialFloor);
      scene.add( modelFloor ); 
      renderer.domElement.addEventListener("click", onClick);

      function onClick(event:any) {

        mouse.x = event.clientX / window.innerWidth * MOUSE_VAL2 - MOUSE_VAL1;
        mouse.y = -(event.clientY / window.innerHeight) * MOUSE_VAL2  + MOUSE_VAL1;
        raycaster.setFromCamera(mouse, camera);
        intersects = raycaster.intersectObjects(objects);

        if (intersects.length > 0) {

          materialFloor.color = new THREE.Color( FLOOR_ACTIVE_COLOR );
          materialFloor.opacity = 0.9;
          materialFloor.roughness = 0.7;
          materialFloor.metalness = 0.0;
          materialFloor.fog= false;
          materialFloor.transparent= true;
          materialFloor.depthTest = true;
          materialFloor.depthWrite = true;
          materialFloor.reflectivity = 0.7;
          materialFloor.side = THREE.FrontSide;
        
        }else {

          colorFloor(materialFloor);

        }
      }

    }, undefined, function ( e ) {

      console.error( e );

    } );

    loader.load( `${PATH}${PATH_CHAIRS}` , function ( gltf ) {

      const modelPT = gltf.scene ;
      const modelPT1 = modelPT.children[0] as THREE.Mesh;
      const modelPT2 = modelPT.children[1] as THREE.Mesh;
      const modelPT3 = modelPT.children[2] as THREE.Mesh;
      const modelPT4 = modelPT.children[3] as THREE.Mesh;

      const modelsChair = [modelPT1, modelPT2, modelPT3, modelPT4];
      const chairs = [["Cube024","Cube024_1","Cube017","Cube018","Cube020"],
                      ["Cube001_1","Cube001_2","Cube003","Cube002"],
                      ["Cube006_1","Cube006_2","Cube004","Cube005"],
                      ["Cube007_1","Cube007_2","Cube009","Cube008"]];

      modelPT.position.set( CHAIRS_POS_X, CHAIRS_POS_Y, CHAIRS_POS_Z );
      modelPT.scale.set( CHAIRS_SCALE_X, CHAIRS_SCALE_Y, CHAIRS_SCALE_Z);

      const INITIAL_MAP = [
        {
        mtl: new THREE.MeshStandardMaterial( { 
          color: CHAIR_SADDLE_COLOR,
          opacity: 1,
          roughness: 0.8,
          metalness: 0,
          fog: true,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide} )
        },
        {
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
        { 
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
        { 
        mtl: new THREE.MeshStandardMaterial( { 
          color: CHAIR_BACK_COLOR, 
          opacity: 1,
          roughness: 0.8,
          metalness: 0,
          fog: true,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        },
        {
        mtl: new THREE.MeshPhysicalMaterial( { 
          metalness: .9,
          roughness: .05,
          envMapIntensity: 0.9,
          clearcoat: 1,
          transparent: true,
          transmission: .95,
          opacity: .5,
          reflectivity: 0.9,
          refractionRatio: 0.985,
          ior: 0.9,
          side: THREE.BackSide,
          color: FLOOR_INACTIVE_COLOR
        } )}
      ];
      
      textures(modelsChair, chairs, INITIAL_MAP);

      scene.add( modelPT );

    }, undefined, function ( e ) {

      console.error( e );

    } );

    loader.load( `${PATH}${PATH_ROOMS}` , function ( gltf ) {

      const modelPS = gltf.scene ;

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
        mtl: new THREE.MeshPhysicalMaterial( { 
          metalness: .9,
          roughness: .05,
          envMapIntensity: 0.9,
          clearcoat: 1,
          transparent: true,
          transmission: .95,
          opacity: .5,
          reflectivity: 0.9,
          refractionRatio: 0.985,
          ior: 0.9,
          side: THREE.BackSide,
          color: FLOOR_INACTIVE_COLOR
        } )
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
      const materialStairs = modelStairs.material as THREE.MeshPhysicalMaterial;

      modelStairs.position.set( STAIRS_POS_X, STAIRS_POS_Y, STAIRS_POS_Z );
      //modelStairs.scale.set( STAIRS_SCALE_X, STAIRS_SCALE_Y, STAIRS_SCALE_Z);
      
      colorFloor(materialStairs);

      scene.add( modelStairs );

    }, undefined, function ( e ) {

      console.error( e );

    } );

    addSphere();
    render();

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

    function textures(models: THREE.Mesh[], chair: string[][], map: any){
      for (let n = 0; n <= 3; n ++ ){
        if (n == 0){
          for (let i = 0 ; i < 5; i++){
            initColor(models[0], chair[0][i], map[i].mtl);
          }
        }else {
          for (let i = 1 ; i < 4; i++){
            for (let m = 0; m < 4; m ++){
              initColor(models[i], chair[i][m], map[m].mtl);
            }
          }
        }
      }
    } 

    function colorFloor (mat: THREE.MeshPhysicalMaterial){
      mat.color = new THREE.Color( FLOOR_INACTIVE_COLOR );
      mat.opacity = 1;
      mat.roughness = 0.85;
      mat.metalness = 0;
      mat.fog= false;
      mat.reflectivity = 0.2;
      mat.transparent= false;
      mat.depthTest = true;
      mat.depthWrite = true;
      mat.side = THREE.FrontSide;
    }

    function addSphere(){

      for ( var z= -1000; z < 2000; z+=20 ) {
  
        let geometry   = new THREE.SphereGeometry(0.1, 32, 32)
        let material = new THREE.MeshBasicMaterial( {color: FLOOR_ACTIVE_COLOR} );
        let sphere = new THREE.Mesh(geometry, material)
  
        sphere.position.x = Math.random() * 100 - 50;
        sphere.position.y = Math.random() * 100 - 100;
  
        sphere.position.z = z;
        sphere.scale.x = sphere.scale.y = 2;
        scene.add( sphere ); 
        stars.push(sphere); 

      }
    }

    function animateStars() { 
      
      for(var i=0; i<stars.length; i++) {
        
        let star: THREE.Mesh = stars[i]; 
        star.position.z +=  i/80;
        if(star.position.z>1000) star.position.z-=2000; 
        
      }
    }

    function render() {

      renderer.render(scene,camera);
      requestAnimationFrame(render);
      animateStars();

    }

  }

}

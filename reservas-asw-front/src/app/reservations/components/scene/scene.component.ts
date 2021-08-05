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
const FOG_COLOR = 0x681453;
const FOG_NEAR = 1;
const FOG_FAR = 20;
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
    let cloudParticles: any = [];

    //scene.background = new THREE.Color( BACKGROUND_COLOR );

    let ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0xbf, 50);
    directionalLight.position.set(0,0,1);
    scene.add(directionalLight);

    let blueLight = new THREE.PointLight(0x3677ac,50,450,1.7);
    blueLight.position.set(300,300,200);
    scene.add(blueLight);

    scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), SCENE_SIGMA ).texture;

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth,window.innerHeight);
    scene.fog = new THREE.FogExp2(0xffffff, 0.001);
    renderer.setClearColor(scene.fog.color);
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement);

    camera.position.set( CAMERA_X_INIT, CAMERA_Y_INIT, CAMERA_Z_INIT );

    controls.target.set( CAMERA_TARGET_X, CAMERA_TARGET_Y, CAMERA_TARGET_Z );
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    
    const textures2: any = {
      refraction: '//cdn.wtlstudio.com/sample.wtlstudio.com/08271035-d8f6-47c6-b6bb-b8b8a45dc024.jpg',
      reflection: '//cdn.wtlstudio.com/sample.wtlstudio.com/de8e4a51-dcdd-4b6a-9b40-e42b4ea1b7c5.jpg'
    };
    
    const createEnvMap = (type = 'reflection', onReady = () => {}) => {
      return new THREE.TextureLoader().load(textures2[type], (texture) => {
        if (type === 'reflection') {
          texture.mapping = THREE.EquirectangularReflectionMapping;
        } else {
          texture.mapping = THREE.EquirectangularRefractionMapping;
        }
    
        texture.encoding = THREE.sRGBEncoding;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.NearestFilter;
        
        onReady();
      });
    }
    
    //scene.background = createEnvMap('reflection');
    //scene.environment = createEnvMap('reflection');

    //Adición nube
    
    let loader2 = new THREE.TextureLoader();
    loader2.load("assets/models/smoke.png", function(texture){
      const cloudGeo = new THREE.PlaneBufferGeometry(1000,500);
      const cloudMaterial = new THREE.MeshLambertMaterial({
        map:texture,
        transparent: true,
      });

      for(let p=0; p<50; p++) {
        let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.set(
          Math.random()*800-400,
          -100,
          Math.random()*500-800
        );
        //cloud.rotation.x = 1.16;
        //cloud.rotation.y = -0.12;
        //cloud.rotation.z = Math.random()*2*Math.PI;
        cloud.material.opacity = 0.4;
        cloudParticles.push(cloud);
        scene.add(cloud);
      }
    });
    /*
    //efecto constelación
    const points = [];
    for(let i=0;i<6000;i++) {
      let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    points.push(star);
    }
    let starGeo = new THREE.BufferGeometry().setFromPoints( points )

    let sprite = new THREE.TextureLoader().load( 'assets/models/star.png' );
    let starMaterial = new THREE.PointsMaterial({
      color: 0xbf,
      size: 0.8,
      map: sprite
    });

    let stars = new THREE.Points(starGeo,starMaterial);
    scene.add(stars);
*/
    //

    loader.setDRACOLoader( dracoLoader );

    floor = selectFloor(this.idFloor);

    loader.load( floor, function ( gltf ) {

      const modelFloor = gltf.scene.children[0] as THREE.Mesh;
      const materialFloor = modelFloor.material as THREE.MeshPhysicalMaterial;
      const objects = [modelFloor];

      modelFloor.position.set( FLOOR_POS_X, FLOOR_POS_Y, FLOOR_POS_Z );
      //modelFloor.scale.set( FLOOR_SCALE_X, FLOOR_SCALE_Y, FLOOR_SCALE_Z);

      scene.add( modelFloor ); 

      renderer.domElement.addEventListener("click", onClick);

      function onClick(event:any) {

        mouse.x = event.clientX / window.innerWidth * MOUSE_VAL2 - MOUSE_VAL1;
        mouse.y = -(event.clientY / window.innerHeight) * MOUSE_VAL2  + MOUSE_VAL1;
        raycaster.setFromCamera(mouse, camera);
        intersects = raycaster.intersectObjects(objects);

        if (intersects.length > 0) {

          materialFloor.color = new THREE.Color( FLOOR_INACTIVE_COLOR );
          materialFloor.opacity = 0.49;
          materialFloor.roughness = 0.9;
          materialFloor.metalness = 0.0;
          materialFloor.fog= false;
          materialFloor.transparent= true;
          materialFloor.depthTest = true;
          materialFloor.depthWrite = true;
          materialFloor.reflectivity = 0;
          materialFloor.side = THREE.FrontSide;
        
        }else {

          materialFloor.color = new THREE.Color( FLOOR_ACTIVE_COLOR );
          materialFloor.opacity = 1;
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

      const modelPT = gltf.scene ;
      const modelPT1 = modelPT.children[0] as THREE.Mesh;
      const modelPT2 = modelPT.children[1] as THREE.Mesh;
      const modelPT3 = modelPT.children[2] as THREE.Mesh;
      const modelPT4 = modelPT.children[3] as THREE.Mesh;
      console.log(modelPT);

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
          roughness: 1,
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
          roughness: 1,
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
          //envMap: createEnvMap('refraction')
        } )}
      ];
      
      textures(modelsChair, chairs, INITIAL_MAP);

      scene.add( modelPT );

    }, undefined, function ( e ) {

      console.error( e );

    } );

    loader.load( `${PATH}${PATH_CHAIRS}` , function ( gltf ) {

      const modelPT = gltf.scene ;
      const modelPT1 = modelPT.children[0] as THREE.Mesh;
      const modelPT2 = modelPT.children[1] as THREE.Mesh;
      const modelPT3 = modelPT.children[2] as THREE.Mesh;
      const modelPT4 = modelPT.children[3] as THREE.Mesh;
      console.log(modelPT);

      const modelsChair = [modelPT1, modelPT2, modelPT3, modelPT4];
      const chairs = [["Cube024","Cube024_1","Cube017","Cube018","Cube020"],
                      ["Cube001_1","Cube001_2","Cube003","Cube002"],
                      ["Cube006_1","Cube006_2","Cube004","Cube005"],
                      ["Cube007_1","Cube007_2","Cube009","Cube008"]];

      modelPT.position.set( CHAIRS_POS_X, CHAIRS_POS_Y, -2 );
      modelPT.scale.set( CHAIRS_SCALE_X, CHAIRS_SCALE_Y, CHAIRS_SCALE_Z);

      const INITIAL_MAP = [
        {
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
          roughness: 1,
          metalness: 0,
          fog: true,
          transparent: false,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide } )
        },
        {
        mtl: new THREE.MeshPhysicalMaterial( { 
          color: TABLE_COLOR, 
          opacity: 0.5,
          roughness: 0,
          metalness: 1,
          fog: false,
          transparent: true,
          depthTest: true,
          depthWrite: true,
          side: THREE.FrontSide 
        } )}
      ];
      
      textures(modelsChair, chairs, INITIAL_MAP);

      scene.add( modelPT );

    }, undefined, function ( e ) {

      console.error( e );

    } );

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

    function render() {
      for (let p of cloudParticles){
         p.rotation.z -=0.001;
      }

      renderer.render(scene,camera);
      requestAnimationFrame(render);
    }

  }

}

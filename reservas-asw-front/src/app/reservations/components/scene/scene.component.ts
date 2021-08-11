import * as THREE from 'three';
import { Component, Input, OnInit, ɵExtraLocaleDataIndex } from '@angular/core';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshStandardMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { combineAll } from 'rxjs/operators';
import { ACESFilmicToneMapping, Object3D } from 'three';
import { ReservationsService } from '../../services/reservations.service';
import { Roomr, RoomsPerFloorResponse } from '../../interfaces/rooms-per-floor.interface';
import { workSpacesPerFloorResponse, workSpaceW } from '../../interfaces/workspaces-per-floor.interface';
import { Reservation } from '../../interfaces/reservations.interface';
import { Floors } from '../../interfaces/floors.interface';
import { Floor } from '../../../admin/interfaces/admin.interfaces';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { setReservationId } from '../../../reservations/reservation.actions';
import { setIsWorkstation, setPeopleNumber } from '../../reservation.actions';

const CAMERA_FOV = 40;
const CAMERA_NEAR = 1;
const CAMERA_FAR = 100;
const BACKGROUND_COLOR = 0xffffff;
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
const FLOOR_ACTIVE_COLOR = 0xbf;
const FLOOR_INACTIVE_COLOR = 0x4848dd;
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
const LIGHT = 0xffffff;
const LIGHT_INTENSITY = 2;


@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styles: [
  ]
})
export class SceneComponent implements OnInit {

  //@Input() idpiso: number = 0;
  //@Input() numOfPeople: number = 1;

  path3D : string = '';
  urlPlugin : string = '';
  query: string = '/';

  constructor( 
    private reservationsService: ReservationsService,
    private store: Store<AppState>
    
    ){} 

  main(){
    let idPiso = 0;
    let numeroPersonas = 0;
    let myStore = this.store;


    this.store.select('reservation').subscribe((reservation) => {
      idPiso = reservation.floorNumber;
      numeroPersonas = reservation.peopleNumber;      
    });

    setFlag();


    const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    const scene = new THREE.Scene();
    
    const sceneContainer = document.getElementById( 'sceneContainer' );
    //renderer.setPixelRatio( window.devicePixelRatio );
     
    if( sceneContainer ){
      
      renderer.setSize( sceneContainer.clientWidth, sceneContainer.clientHeight );
      renderer.outputEncoding = THREE.sRGBEncoding;
      sceneContainer.appendChild( renderer.domElement );
    }
    
    
    const camera = new THREE.PerspectiveCamera( 40, renderer.domElement.width/renderer.domElement.height, 1, 100 );
    const controls = new OrbitControls( camera, renderer.domElement );
    const dracoLoader = new DRACOLoader();
    const loader = new GLTFLoader();
    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let INTERSECTED: THREE.Object3D | null;
    const selectedObjectColor = new THREE.Color( 0xff0000 );
    const onObjectColor = new THREE.Color ( 0xEAA525 );
    const smallChairColor = new THREE.Color ( 0x65FC17 );
    let selectedObject: Object3D | null;
    let stars: THREE.Mesh[] = [];
    
    let floorsList: THREE.Group[] = [];
    let workSpacesList: THREE.Group[] = [];
    let roomsList: THREE.Group[] = [];
    let sceneInfo = { "floors": floorsList, "workSpaces": workSpacesList, "room": roomsList };
    
    
    let jocker1: workSpaceW[] = [];
    let jocker2: workSpaceW[] = [];
    let jocker3: workSpaceW[] = [];
    let matriz: (workSpaceW[])[] = [jocker1, jocker2, jocker3];


    let jockerS1: Roomr[] = [];
    let jockerS2: Roomr[] = [];
    let jockerS3: Roomr[] = [];
    let matrizS: (Roomr[])[] = [jockerS1, jockerS2, jockerS3];

    let idPisoActual = idPiso;
    let numeroPersonasActual: number = numeroPersonas;
    
    
    
    const CHAIR_SADDLE_COLOR = 0x444b93;
    const CHAIR_BACK_COLOR = 0x444b93;
    const CHAIR_UNION_COLOR = 0x1e;
    const CHAIR_WHEELS_COLOR = 0x1e;
    const TABLE_COLOR = 0xffffff;
    
    let pointlight = new THREE.PointLight(LIGHT,LIGHT_INTENSITY);
    pointlight.position.set(200,200,200);
    scene.add(pointlight);
    
    
    //document.addEventListener( 'mousemove', onPointerMove );
    renderer.domElement.addEventListener( 'mousemove', onPointerMove );
    scene.background = new THREE.Color( BACKGROUND_COLOR );
    scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), SCENE_SIGMA ).texture;

    camera.position.set( 8, 15, 10 );
    controls.update();
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI / 2;

    const arrowHelper = new THREE.ArrowHelper(
      new THREE.Vector3(),
      new THREE.Vector3(),
      5.25,
      0xffff00
  )
  scene.add(arrowHelper)
    

    loader.setDRACOLoader( dracoLoader );
    loadFloor(idPiso, this.path3D, this.reservationsService, this.urlPlugin, this.query);    

    this.query = this.query + idPiso ;
    
      loadRooms(this.urlPlugin, this.reservationsService, this.query);
   
      loadWorkSpaces( this.urlPlugin, this.reservationsService, this.query );
    
      renderer.domElement.addEventListener( 'click', onClick );
      
      function onClick(event: MouseEvent ) {

        raycaster.setFromCamera(pointer, camera);
        
        let intersects = raycaster.intersectObjects(scene.children, true);
       // console.log("el intersects dentro de onClick es: ", intersects);
        let index: number = 0;
        let flag: boolean = false;
        do {
          //console.log("intersect[index] es: ", intersects[index], index);
          
          if( intersects[index] && intersects[index].object.userData.info && intersects[index].object.userData.info.idPiso == idPiso -17 ){
            //console.log('entro al if');

              if( selectedObject && selectedObject != intersects[index].object ){
                 setColorSelectedObject( );
                 changeToChairCurrentColor()
               }

            selectChair(intersects, index);  
            selectedObject = intersects[index].object;
            //console.log("el selectedObject es: ", selectedObject);
            let id: number = selectedObject.userData.info.idPuestoTrabajo ? selectedObject.userData.info.idPuestoTrabajo : selectedObject.userData.info.idSala;
            myStore.dispatch(setReservationId({ reservationId: id })); 
            let isWorkstation: boolean = selectedObject.userData.info.idPuestoTrabajo ? true : false;
           
            myStore.dispatch(setPeopleNumber ({peopleNumber: isWorkstation ? 1 : 2}))
            myStore.dispatch( setIsWorkstation( {isWorkstation: isWorkstation} ) );
            
            
            if( INTERSECTED && onObjectColor == (<THREE.MeshStandardMaterial>(<THREE.Mesh>selectedObject).material).color ){
              selectedObject.userData.currentColor = INTERSECTED.userData.currentColor;
            }else{
              selectedObject.userData.currentColor = (<THREE.MeshStandardMaterial>(<THREE.Mesh>selectedObject).material).color;
            }
            (<THREE.MeshStandardMaterial>(<THREE.Mesh>selectedObject).material).color = selectedObjectColor;  
            INTERSECTED = null; 
            flag = true;
          }

          index++;
        } while ((!flag) && index<= intersects.length-1);
            
              
      }  
      const rect: DOMRect = renderer.domElement.getBoundingClientRect();

    loadStairs();
    addSphere();
    animate();

    

    updateModels();
    //window.location.reload();

    // window.onresize = function () {

    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();

    //   renderer.setSize( window.innerWidth, window.innerHeight );

    // };

      
    

  function onPointerMove( event: MouseEvent ) {
     
      pointer.x = ( ( event.clientX - rect.left ) / ( renderer.domElement.clientWidth ) ) * 2 - 1;
      pointer.y = - ( ( event.clientY - (rect.top) ) / ( renderer.domElement.clientHeight) ) * 2 + 1;    
      checkOnObject();

  }
  

  
  function checkOnObject(  ){
    
    raycaster.setFromCamera(pointer, camera);
    
    
    let intersects = raycaster.intersectObjects(scene.children, true);

    
    if (intersects.length > 0 && intersects[0].object.userData.info && intersects[0].object != selectedObject) {

      if ( INTERSECTED != intersects[ 0 ].object ) {

        if ( INTERSECTED ) ( <THREE.MeshStandardMaterial> (<THREE.Mesh>INTERSECTED).material).color = INTERSECTED.userData.currentColor;

        INTERSECTED = intersects[ 0 ].object;
        INTERSECTED.userData.currentColor = ( <THREE.MeshStandardMaterial> (<THREE.Mesh>INTERSECTED).material).color;

        ( <THREE.MeshStandardMaterial> (<THREE.Mesh>INTERSECTED).material).color = onObjectColor;
    } else {

        if ( INTERSECTED ) ( <THREE.MeshStandardMaterial> (<THREE.Mesh>INTERSECTED).material).color = INTERSECTED.userData.currentColor;

        INTERSECTED = null;

    }
    }else if ( INTERSECTED ){
      ( <THREE.MeshStandardMaterial> (<THREE.Mesh>INTERSECTED).material).color = INTERSECTED.userData.currentColro;
    }

  }


  function loadPathFound( path: string,  floorNumber: number, answ: RoomsPerFloorResponse ){

    loader.load( path, function ( gltf ) {
      const model3 = gltf.scene;
      const child = model3.children[0] as THREE.Mesh;
      const childMaterial = child.material as THREE.MeshPhysicalMaterial;
      colorFloor(childMaterial);
      const objects = [child];  
  

        renderer.domElement.addEventListener( 'click', onMove );
        function onMove(event: MouseEvent){
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(objects);
        if (intersects.length > 0) {

          childMaterial.color = new THREE.Color( FLOOR_ACTIVE_COLOR );
          childMaterial.opacity = 0.9;
          childMaterial.roughness = 0.7;
          childMaterial.metalness = 0.0;
          childMaterial.fog= false;
          childMaterial.transparent= true;
          childMaterial.depthTest = true;
          childMaterial.depthWrite = true;
          childMaterial.reflectivity = 0.7;
          childMaterial.side = THREE.FrontSide;

          const n = new THREE.Vector3()
          n.copy((intersects[0]?.face as THREE.Face)?.normal)
          n.transformDirection(intersects[0].object.matrixWorld)

          arrowHelper.setDirection(n)
          arrowHelper.position.copy(intersects[0].point)
        
        }else {

          colorFloor(childMaterial);

        }
      

        }

        
    
     
      model3.position.set( 0,0,0 );
      model3.scale.set( model3.scale.x * 3, model3.scale.y * 3, model3.scale.z *3);
      model3.userData = { "info": answ.data[floorNumber-1] };
      
      model3.visible = model3.userData.info.idPiso == idPiso - 17;
      sceneInfo.floors.push( model3 );
      scene.add( model3 );

    }, undefined, function ( e ) {

      console.error( e );

    } );

  }

  

  function loadThisFloor( floorNumber: number, answ: RoomsPerFloorResponse ){
    let path: string = '';
    
    if(floorNumber==1){
      
      path = 'assets/models/18th_floor/18th_floor.gltf';
      loadPathFound( path, floorNumber, answ );

    }else if(floorNumber==2){
            
      path = 'assets/models/19th_floor/19th_floor.gltf';
      loadPathFound( path, floorNumber, answ );

    }else if(floorNumber==3){
     
      path = 'assets/models/20th_floor/20th_floor.gltf';
      loadPathFound( path, floorNumber, answ );
      
    }else{
     // console.log('No cargado ningun piso'); 
    }

    
  }

  function loadFloor(idpiso: number, path: string, reservationsService: ReservationsService, urlPlugin: string, query: string){

    urlPlugin = 'piso';
    query = 'todos';
    reservationsService.sendRoomsPerFloorRequest( urlPlugin, query )
      .subscribe(
        (answ: RoomsPerFloorResponse) => {
          
          for (let i = 0; i < answ.data.length; i++) {
            loadThisFloor( i+1, answ );
          }

        }
        ); 
  }

  function invisibleModels(pisoActual: number ): boolean{
    return pisoActual === idPiso - 17;
  }

 

  function generateChairRoomTextureModels(model: THREE.Group){
    
      const modelPT1 = model.children[0] as THREE.Mesh;
      const modelPT2 = model.children[1] as THREE.Mesh;
      const modelPT3 = model.children[2] as THREE.Mesh;
      const modelPT4 = model.children[3] as THREE.Mesh;
      

      const modelsChair = [modelPT1, modelPT2, modelPT3, modelPT4];
      const chairs = [["Cube024","Cube024_1","Cube017","Cube018","Cube020"],
                      ["Cube001_1","Cube001_2","Cube003","Cube002"],
                      ["Cube006_1","Cube006_2","Cube004","Cube005"],
                      ["Cube007_1","Cube007_2","Cube009","Cube008"]];

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
            color: FLOOR_INACTIVE_COLOR
          })}
      ];
      
      textures(modelsChair, chairs, INITIAL_MAP);
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

    for ( var z= -1000; z < 5000; z+=20 ) {

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
      star.position.z +=  i/150;
      if(star.position.z>1000) star.position.z-=2000; 
      
    }
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


  

  function generateTextureModels(model: THREE.Group){
    const modelPS_silla = model.children[3] as THREE.Mesh;
    const modelPS_mesa = model.children[4] as THREE.Mesh;

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
  }

  function generateModelRoomSpace(roomWorkPlace:Roomr[], piso: number, numeroSala: number, index: number) : Roomr[]{
    loader.load( 'assets/models/chairs/chairs.gltf', function ( gltf ) {
      
      const model4 = gltf.scene;
      const child = model4.children[0].children[0] as THREE.Mesh;
     
      const childMaterial = child.material as THREE.MeshStandardMaterial;
     
      childMaterial.color = new THREE.Color(0x65FC17);
      model4.scale.set(model4.scale.x*0.49, model4.scale.y*0.49, model4.scale.z*0.49);
      model4.rotation.y += -0.7;

      if (piso === 1) {
          model4.position.set(-7.02,0,-4.28);

          //////************PISO 18********//////////
          for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 1; j++) {
                loader.load( 'assets/models/chairs/chairs.gltf', function ( gltf ) {  
                  let piece = gltf.scene;
                  
                  piece.children[0].children[1].userData = {"info" : roomWorkPlace[index]};
                  piece.children[0].children[0].userData = {"info" : roomWorkPlace[index]};
                  piece.children[0].children[2].userData = {"info" : roomWorkPlace[index]};
                  piece.children[0].children[3].userData = {"info" : roomWorkPlace[index]};
                  piece.children[0].children[4].userData = {"info" : roomWorkPlace[index]};

                  piece.children[1].children[0].userData = {"info" : roomWorkPlace[index]};
                  piece.children[1].children[1].userData = {"info" : roomWorkPlace[index]};
                  piece.children[1].children[2].userData = {"info" : roomWorkPlace[index]};
                  piece.children[1].children[3].userData = {"info" : roomWorkPlace[index]};

                  piece.children[2].children[0].userData = {"info" : roomWorkPlace[index]};
                  piece.children[2].children[1].userData = {"info" : roomWorkPlace[index]};
                  piece.children[2].children[2].userData = {"info" : roomWorkPlace[index]};
                  piece.children[2].children[3].userData = {"info" : roomWorkPlace[index]};

                  piece.children[3].children[0].userData = {"info" : roomWorkPlace[index]};
                  piece.children[3].children[1].userData = {"info" : roomWorkPlace[index]};
                  piece.children[3].children[2].userData = {"info" : roomWorkPlace[index]};
                  piece.children[3].children[3].userData = {"info" : roomWorkPlace[index]};

                  index++;


                  let child1 = piece.children[0].children[0] as THREE.Mesh;
                  let childMaterial1 = child1.material  as THREE.MeshStandardMaterial;
                  childMaterial1.color = smallChairColor;
                  
                  generateChairRoomTextureModels(piece);
                                  
                  piece.scale.set( piece.scale.x*0.39, piece.scale.y*0.39, piece.scale.z*0.39);
                  switch(numeroSala){
                    case 1:
                      piece.position.set((model4.position.x+0.15)+(0.57*i),0,(model4.position.z+2.50)+(0.57*j));
                      break;
                    case 2:
                      piece.position.set((model4.position.x+0.15)+(0.57*i),0,(model4.position.z+6.20)+(0.57*j));
                      break;
                    case 3:
                      piece.position.set((model4.position.x+5.30)+(0.57*i),0,(model4.position.z+6.20)+(0.57*j));
                      break;
                    case 4:
                      piece.position.set((model4.position.x+5.30)+(0.57*i),0,(model4.position.z+7.50)+(0.57*j));
                      break;
                    default:     
                      break;   

                  }
                
                  piece.rotation.y += -0.69;                    
                  piece.visible = invisibleModels(piso);
                  scene.add(piece);
                  sceneInfo.room.push( piece );
                }, undefined, function ( e ) {

                  console.error( e );

                } );
            }
          }

        
        
    } else if(piso === 2){

      model4.position.set(-7.02,0,-4.28);

          //////************PISO 19********//////////
          for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 1; j++) {
                loader.load( 'assets/models/chairs/chairs.gltf', function ( gltf ) {  
                  let piece = gltf.scene;
                  
                  piece.children[0].children[0].userData = {"info" : roomWorkPlace[0]};
                  piece.children[0].children[1].userData = {"info" : roomWorkPlace[0]};
                  piece.children[0].children[2].userData = {"info" : roomWorkPlace[0]};
                  piece.children[0].children[3].userData = {"info" : roomWorkPlace[0]};
                  piece.children[0].children[4].userData = {"info" : roomWorkPlace[0]};

                  piece.children[1].children[0].userData = {"info" : roomWorkPlace[0]};
                  piece.children[1].children[1].userData = {"info" : roomWorkPlace[0]};
                  piece.children[1].children[2].userData = {"info" : roomWorkPlace[0]};
                  piece.children[1].children[3].userData = {"info" : roomWorkPlace[0]};

                  piece.children[2].children[0].userData = {"info" : roomWorkPlace[0]};
                  piece.children[2].children[1].userData = {"info" : roomWorkPlace[0]};
                  piece.children[2].children[2].userData = {"info" : roomWorkPlace[0]};
                  piece.children[2].children[3].userData = {"info" : roomWorkPlace[0]};

                  piece.children[3].children[0].userData = {"info" : roomWorkPlace[0]};
                  piece.children[3].children[1].userData = {"info" : roomWorkPlace[0]};
                  piece.children[3].children[2].userData = {"info" : roomWorkPlace[0]};
                  piece.children[3].children[3].userData = {"info" : roomWorkPlace[0]};

                  roomWorkPlace.shift();
                  


                  let child1 = piece.children[0].children[0] as THREE.Mesh;
                  let childMaterial1 = child1.material  as THREE.MeshStandardMaterial;
                  childMaterial1.color = smallChairColor;
                  
                  generateChairRoomTextureModels(piece);
                                  
                  piece.scale.set( piece.scale.x*0.39, piece.scale.y*0.39, piece.scale.z*0.39);
                  switch(numeroSala){
                    case 1:                      
                      piece.position.set((model4.position.x+0.15)+(0.57*i),0,(model4.position.z+2.50)+(0.57*j));
                      break;
                    case 2:
                      piece.position.set((model4.position.x+4.65)+(0.57*i),0,(model4.position.z+7.80)+(0.57*j));
                      break;
                    case 3:
                      piece.position.set((model4.position.x+6.20)+(0.57*i),0,(model4.position.z+7.80)+(0.57*j));
                      break;  
                    case 4:
                      piece.position.set((model4.position.x+7.70)+(0.57*i),0,(model4.position.z+7.80)+(0.57*j));
                      break;  
                    case 5:
                      piece.position.set((model4.position.x+9.80)+(0.57*i),0,(model4.position.z+5.20)+(0.57*j));
                      piece.scale.set(model4.scale.x*0.49, model4.scale.y*0.49, model4.scale.z*0.49);
                      break; 
                    case 6:
                      piece.position.set((model4.position.x+9.80)+(0.57*i),0,(model4.position.z+6.20)+(0.57*j));
                      piece.scale.set(model4.scale.x*0.49, model4.scale.y*0.49, model4.scale.z*0.49);
                      break;     
                    case 7:  
                      piece.position.set((model4.position.x+10.52)+(0.57*i),0,(model4.position.z+6.18)+(0.57*j));
                      piece.scale.set(model4.scale.x*0.43, model4.scale.y*0.43, model4.scale.z*0.43);
                      piece.rotation.y += 0.70; 
                      break; 
                    case 8:  
                      piece.position.set((model4.position.x+10.87)+(0.57*i),0,(model4.position.z+5.84)+(0.57*j));
                      piece.scale.set(model4.scale.x*0.43, model4.scale.y*0.43, model4.scale.z*0.43);
                      piece.rotation.y += 0.70; 
                      break;   
                    case 9:  
                      piece.position.set((model4.position.x+11.30)+(0.57*i),0,(model4.position.z+5.55)+(0.57*j));
                      piece.scale.set(model4.scale.x*0.43, model4.scale.y*0.43, model4.scale.z*0.43);
                      piece.rotation.y += 0.70; 
                      break;        
                    default:     
                      break;   

                  }
                
                  piece.rotation.y += -0.69;                    
                  piece.visible = invisibleModels(piso); 
                  scene.add(piece);
                  sceneInfo.room.push( piece );
                }, undefined, function ( e ) {

                  console.error( e );

                } );
            }
          }



    } else if(piso === 3){

      model4.position.set(-7.02,0,-4.28);

          //////************PISO 20********//////////
          for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 1; j++) {
                loader.load( 'assets/models/chairs/chairs.gltf', function ( gltf ) {  
                  let piece = gltf.scene;
                  
                  piece.children[0].children[0].userData = {"info" : roomWorkPlace[0]};
                  piece.children[0].children[1].userData = {"info" : roomWorkPlace[0]};
                  piece.children[0].children[2].userData = {"info" : roomWorkPlace[0]};
                  piece.children[0].children[3].userData = {"info" : roomWorkPlace[0]};
                  piece.children[0].children[4].userData = {"info" : roomWorkPlace[0]};

                  piece.children[1].children[0].userData = {"info" : roomWorkPlace[0]};
                  piece.children[1].children[1].userData = {"info" : roomWorkPlace[0]};
                  piece.children[1].children[2].userData = {"info" : roomWorkPlace[0]};
                  piece.children[1].children[3].userData = {"info" : roomWorkPlace[0]};

                  piece.children[2].children[0].userData = {"info" : roomWorkPlace[0]};
                  piece.children[2].children[1].userData = {"info" : roomWorkPlace[0]};
                  piece.children[2].children[2].userData = {"info" : roomWorkPlace[0]};
                  piece.children[2].children[3].userData = {"info" : roomWorkPlace[0]};

                  piece.children[3].children[0].userData = {"info" : roomWorkPlace[0]};
                  piece.children[3].children[1].userData = {"info" : roomWorkPlace[0]};
                  piece.children[3].children[2].userData = {"info" : roomWorkPlace[0]};
                  piece.children[3].children[3].userData = {"info" : roomWorkPlace[0]};

                  roomWorkPlace.shift();
                  


                  let child1 = piece.children[0].children[0] as THREE.Mesh;
                  let childMaterial1 = child1.material  as THREE.MeshStandardMaterial;
                  childMaterial1.color = smallChairColor;
                  
                  generateChairRoomTextureModels(piece);
                                  
                  piece.scale.set( piece.scale.x*0.39, piece.scale.y*0.39, piece.scale.z*0.39);
                  switch(numeroSala){
                    case 1:                      
                      piece.position.set((model4.position.x+0.15)+(0.57*i),0,(model4.position.z+7.50)+(0.57*j));
                      break;
                    default:     
                      break;   

                  }
                
                  piece.rotation.y += -0.69;                    
                  piece.visible = invisibleModels(piso);
                  scene.add(piece);
                  sceneInfo.room.push( piece );
                }, undefined, function ( e ) {

                  console.error( e );

                } );
            }
          }



    }
      
    
      
    
      
     

    }, undefined, function ( e ) {

      console.error( e );

    } );
    return roomWorkPlace;
  
    

  }


  function generateModelsWorkSpace(workPlaces: workSpaceW[], columnas: number, filas: number, bloque: number, piso: number, index: number): workSpaceW[]{
    loader.load('assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ){
      const model5 = gltf.scene;
      let n = 0;

      if (piso === 1) {
        model5.position.set(-7.02,0,-4.28);  ////// COORDENADAS PISO 18
        for (let i = 0; i < columnas; i++) {
          
          for (let j = 0; j < filas; j++) {
            
            
            loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
              let piece = gltf.scene;
              piece.children[0].userData = {"info" : workPlaces[index]};
              piece.children[1].userData = {"info" : workPlaces[index]};
              piece.children[2].userData = {"info" : workPlaces[index]};
              piece.children[3].userData = {"info" : workPlaces[index]};
              piece.children[4].userData = {"info" : workPlaces[index]};
              
              index++;
              generateTextureModels(piece);

              piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
              switch(bloque){
                case 1:
                  piece.position.set((model5.position.x-0.14)+(0.46*i),0,(model5.position.z)+(0.46*j));
                  piece.rotation.y += 4.02;
                  break;
                case 6:
                  piece.position.set((model5.position.x+0.68)+(0.46*i),0,(model5.position.z+0.07)+(0.46*j));
                  piece.rotation.y += 2.45;  
                  break;
                case 7:
                  piece.position.set((model5.position.x+1.56)+(0.46*i),0,(model5.position.z)+(0.46*j));
                  piece.rotation.y += 2.45; 
                  break;
                case 12:
                  if (j === 0) {
                    piece.position.set((model5.position.x+0.49)+(0.46*i),0,(model5.position.z+0.92)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+0.61)+(0.46*i),0,(model5.position.z+0.78)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }  
                  break;
                case 26:
                  piece.position.set((model5.position.x+1.33)+(0.46*i),0,(model5.position.z+2.45)+(0.46*j));
                  piece.rotation.y += -5.40;   
                  break;
                case 27:
                  if (j === 0) {
                    piece.position.set((model5.position.x+1.67)+(0.46*i),0,(model5.position.z+2.23)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+1.79)+(0.46*i),0,(model5.position.z+2.09)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }   
                  break;
                case 30:
                  piece.position.set((model5.position.x+3.03)+(0.46*i),0,(model5.position.z+2.32)+(0.46*j));
                  piece.rotation.y += 4.02;    
                  break;
                case 34:
                  if (j === 0) {
                    piece.position.set((model5.position.x+1.48)+(0.46*i),0,(model5.position.z+3.45)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+1.60)+(0.46*i),0,(model5.position.z+3.31)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }  
                  break;  
                case 42:
                  piece.position.set((model5.position.x+0.2)+(0.46*i),0,(model5.position.z+3.95)+(0.46*j));
                  piece.rotation.y += 2.45;     
                  break;
                case 44:
                  if (j === 0) {
                    piece.position.set((model5.position.x+1.12)+(0.46*i),0,(model5.position.z+4.70)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+1.24)+(0.46*i),0,(model5.position.z+4.56)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }  
                  break;
                case 54:
                  piece.position.set((model5.position.x+1.32)+(0.46*i),0,(model5.position.z+6.19)+(0.46*j));
                  piece.rotation.y += -5.40;   
                  break;
                case 55:
                  if (j === 0) {
                    piece.position.set((model5.position.x+1.65)+(0.46*i),0,(model5.position.z+5.97)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+1.77)+(0.46*i),0,(model5.position.z+5.83)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }
                  break;  
                case 63:
                  piece.position.set((model5.position.x-0.04)+(0.46*i),0,(model5.position.z+7.11)+(0.46*j));
                  piece.rotation.y += 4.02;   
                  break;
                case 66:
                  if (j === 0) {
                    piece.position.set((model5.position.x+0.70)+(0.46*i),0,(model5.position.z+7.32)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+0.82)+(0.46*i),0,(model5.position.z+7.18)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }  
                  break; 
                case 78:
                  if (j === 0) {
                    piece.position.set((model5.position.x+0.15)+(0.46*i),0,(model5.position.z+8.60)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }     
                  break;
                case 85:
                  piece.rotation.y += 2.45; 
                  if (i === 0 || i=== 1 || i === 2) {
                    piece.position.set((model5.position.x+11.58)+(0.46*i),0,(model5.position.z+-0.01)+(0.46*j));
                  }else{
                    piece.position.set((model5.position.x+11.58)+(0.46*i),0,(model5.position.z+0.08)+(0.46*j));
                  } 
                  break; 
                case 91:
                  if (j === 0) {
                    piece.position.set((model5.position.x+11.98)+(0.46*i),0,(model5.position.z+0.94)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+12.10)+(0.46*i),0,(model5.position.z+0.80)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }   
                  break;
                case 101:
                  if (j === 0) {
                    piece.position.set((model5.position.x+13.33)+(0.46*i),0,(model5.position.z+1.75)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }
                  break;   
                case 103:
                  if (j === 0) {
                    if (i > 1) {
                      return;
                    }else{
                    piece.position.set((model5.position.x+11.76)+(0.46*i),0,(model5.position.z+2.15)+(0.46*j));
                    piece.rotation.y += -0.69;}
                  }else if (i > 2 && j ===  1 ) {

                    piece.position.set((model5.position.x+11.88)+(0.46*i),0,(model5.position.z+1.86)+(0.46*j));

                    piece.rotation.y += 2.45;

                  }else{

                    piece.position.set((model5.position.x+11.88)+(0.46*i),0,(model5.position.z+2.01)+(0.46*j));

                    piece.rotation.y += 2.45;

                  }
                  break; 
                case 111:
                  piece.position.set((model5.position.x+14.10)+(0.46*i),0,(model5.position.z+3)+(0.46*j));
                  piece.rotation.y += -5.40;    
                  break;
                case 112:
                  if (i ===4 && j === 1) {
                    return;
                  }
                  if (j === 0) {
                    piece.position.set((model5.position.x+11.80)+(0.46*i),0,(model5.position.z+3.33)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+11.92)+(0.46*i),0,(model5.position.z+3.20)+(0.46*j));
                    piece.rotation.y += 2.45;
                  } 
                  break;   
                case 121:
                  piece.position.set((model5.position.x+11.85)+(0.46*i),0,(model5.position.z+4.57)+(0.46*j));
                  piece.rotation.y += -0.69;   
                  break;
                case 123:
                  piece.position.set((model5.position.x+8.32)+(0.46*i),0,(model5.position.z+4.97)+(0.46*j));
                  piece.rotation.y += 2.45;   
                  break;
                case 132:
                  piece.position.set((model5.position.x+7.36)+(0.46*i),0,(model5.position.z+5.15)+(0.46*j));
                  piece.rotation.y += 4.02;  
                  break;
                case 140:
                  if (j === 0) {
                    piece.position.set((model5.position.x+8.20)+(0.46*i),0,(model5.position.z+5.86)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+8.32)+(0.46*i),0,(model5.position.z+5.72)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }
                  break;  
                case 150:
                  piece.position.set((model5.position.x+11.28)-(0.34*j),0,(model5.position.z+5.59)+(0.28*j));
                  piece.rotation.y += -0.01;
               
                  
                  break;   
                case 153:
                  if (i ===2 && j === 1) {
                    return;
                  }
                  if (j === 0) {
                    piece.position.set((model5.position.x+8.18)+(0.46*i),0,(model5.position.z+7.06)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+8.30)+(0.46*i),0,(model5.position.z+6.92)+(0.46*j));
                    piece.rotation.y += 2.45;
                  } 
                  break; 
                case 158:
                  piece.position.set((model5.position.x+8.08)-(0.34*j),0,(model5.position.z+8.19)+(0.28*j));
                  piece.rotation.y += -0.01;   
                  break;
                default:
                  break;  
              }
              
              piece.visible = invisibleModels(piso);
              scene.add(piece);
              sceneInfo.workSpaces.push(piece);
              
            }, undefined, function ( e ) {
    
                console.error( e );
    
              } );
            
          }
          
        }
        
        
      } else if (piso === 2) {
        model5.position.set(-7.08,0,-4.32);  ////// COORDENADAS PISO 19
        
        for (let i = 0; i < columnas; i++) {
          for (let j = 0; j < filas; j++) {
            loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
              let piece = gltf.scene;
              piece.children[0].userData = {"info" : workPlaces[0]};
              piece.children[1].userData = {"info" : workPlaces[0]};
              piece.children[2].userData = {"info" : workPlaces[0]};
              piece.children[3].userData = {"info" : workPlaces[0]};
              piece.children[4].userData = {"info" : workPlaces[0]};

              generateTextureModels(piece);
              workPlaces.shift();

              piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
              switch(bloque){
                case 1:
                  piece.position.set((model5.position.x-0.14)+(0.46*i),0,(model5.position.z)+(0.46*j));
                  piece.rotation.y += 4.02;
                  break;
                case 6:
                  piece.position.set((model5.position.x+0.70)+(0.46*i),0,(model5.position.z+0.11)+(0.46*j));
                  piece.rotation.y += 2.45;
                  break;
                case 7:
                  piece.position.set((model5.position.x+1.63)+(0.46*i),0,(model5.position.z)+(0.46*j));
                  piece.rotation.y += 2.45;  
                  break; 
                case 12:
                  if (j === 0) {
                  piece.position.set((model5.position.x+0.60)+(0.46*i),0,(model5.position.z+0.92)+(0.46*j));
                  piece.rotation.y += -0.69;
                  }else{
                  piece.position.set((model5.position.x+0.72)+(0.46*i),0,(model5.position.z+0.78)+(0.46*j));
                  piece.rotation.y += 2.45;
                  }
                  break;
                case 24:
                  piece.position.set((model5.position.x+1.33)+(0.46*i),0,(model5.position.z+2.52)+(0.46*j));
                  piece.rotation.y += -5.40;   
                  break;  
                case 25:
                  if (j === 0) {
                    piece.position.set((model5.position.x+1.67)+(0.46*i),0,(model5.position.z+2.30)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+1.79)+(0.46*i),0,(model5.position.z+2.16)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }
                  break;
                case 28:
                  piece.position.set((model5.position.x+3.03)+(0.46*i),0,(model5.position.z+2.40)+(0.46*j));
                  piece.rotation.y += 4.02;
                  break;    
                case 32:
                  if (j === 0) {
                    piece.position.set((model5.position.x+1.48)+(0.46*i),0,(model5.position.z+3.45)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+1.60)+(0.46*i),0,(model5.position.z+3.31)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }
                  break; 
                case 40:
                  if (j === 0) {
                    piece.position.set((model5.position.x+1.17)+(0.46*i),0,(model5.position.z+4.78)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+1.29)+(0.46*i),0,(model5.position.z+4.64)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }
                  break;   
                case 50:
                  piece.position.set((model5.position.x+1.32)+(0.46*i),0,(model5.position.z+6.23)+(0.46*j));
                  piece.rotation.y += -5.40;   
                  break;     
                case 51:
                  if (j === 0) {
                    piece.position.set((model5.position.x+1.65)+(0.46*i),0,(model5.position.z+6.01)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+1.77)+(0.46*i),0,(model5.position.z+5.87)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }       
                  break;
                case 59:
                  piece.position.set((model5.position.x-0.04)+(0.46*i),0,(model5.position.z+7.11)+(0.46*j));
                  piece.rotation.y += 4.02;
                  break;  
                case 62:
                  piece.position.set((model5.position.x+0.93)+(0.46*i),0,(model5.position.z+7.31)+(0.46*j));
                  piece.rotation.y += -5.40;
                  break;
                case 63:
                  if (i === 0 && j === 0) {
                    return;
                  }
                  if (j === 0) {
                    piece.position.set((model5.position.x+0.80)+(0.46*i),0,(model5.position.z+7.32)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+0.92)+(0.46*i),0,(model5.position.z+7.18)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }  
                  break;
                case 74:
                  if (j === 0) {
                      piece.position.set((model5.position.x+0.35)+(0.46*i),0,(model5.position.z+8.60)+(0.46*j));
                      piece.rotation.y += -0.69;
                    }
                  break;   
                case 82:
                  piece.rotation.y += 2.45;      //SILLA MIRANDO ARRIBA  
                  if (i === 0 || i=== 1) {
                    piece.position.set((model5.position.x+12.32)+(0.46*i),0,(model5.position.z+-0.01)+(0.46*j));
                  }else{
                    piece.position.set((model5.position.x+12.32)+(0.46*i),0,(model5.position.z+0.12)+(0.46*j));
                  }     
                  break;  
                case 87:
                  if (j === 0) {
                    piece.position.set((model5.position.x+12.20)+(0.46*i),0,(model5.position.z+0.94)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+12.32)+(0.46*i),0,(model5.position.z+0.80)+(0.46*j));
                    piece.rotation.y += 2.45;
                  } 
                  break; 
                case 97:
                  if (j === 0) {
                    piece.position.set((model5.position.x+13.55)+(0.46*i),0,(model5.position.z+1.80)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }
                  break; 
                case 99:
                  if ( i > 1 && j === 0) {
                    return;
                  }

                  if (j === 0) {
                    piece.position.set((model5.position.x+11.86)+(0.46*i),0,(model5.position.z+2.15)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else if (i > 2 && j ===  1 ) {
                    piece.position.set((model5.position.x+11.98)+(0.46*i),0,(model5.position.z+1.86)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }else{
                    piece.position.set((model5.position.x+11.98)+(0.46*i),0,(model5.position.z+2.01)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }     
                  break;   
                case 107:
                  piece.position.set((model5.position.x+14.30)+(0.46*i),0,(model5.position.z+3.07)+(0.46*j));
                  piece.rotation.y += -5.40; 
                  break; 
                case 108:
                  if (i ===4 && j === 1) {
                    return;
                  }
                  
                  if (j === 0) {
                    piece.position.set((model5.position.x+11.90)+(0.46*i),0,(model5.position.z+3.37)+(0.46*j));
                    piece.rotation.y += -0.69;
                  }else{
                    piece.position.set((model5.position.x+12.02)+(0.46*i),0,(model5.position.z+3.24)+(0.46*j));
                    piece.rotation.y += 2.45;
                  }    
                  break; 
                case 117:
                  piece.position.set((model5.position.x+12.68)-(0.34*j),0,(model5.position.z+4.59)+(0.28*j));
                  piece.rotation.y += -0.01;  
                  break;
                case 120:
                  piece.position.set((model5.position.x+7.15)+(0.46*i),0,(model5.position.z+6.20)+(0.46*j));
                  piece.rotation.y += 2.45;  
                  break;
                default:
                  break;  
              }
              
              piece.visible = invisibleModels(piso);
              scene.add(piece);
              sceneInfo.workSpaces.push(piece);
            }, undefined, function ( e ) {
    
                console.error( e );
    
              } );
            
          }
          
        }
      } else if (piso === 3){
        model5.position.set(-7.11,0,-2.18); ///////COORDENADAS PISO 20

        for (let i = 0; i < columnas; i++) {
          for (let j = 0; j < filas; j++) {
              loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                let piece = gltf.scene;
                
                piece.children[0].userData = {"info" : workPlaces[0]};
                piece.children[1].userData = {"info" : workPlaces[0]};
                piece.children[2].userData = {"info" : workPlaces[0]};
                piece.children[3].userData = {"info" : workPlaces[0]};
                piece.children[4].userData = {"info" : workPlaces[0]};
                generateTextureModels(piece);
                workPlaces.shift();
    
                piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                            
                switch(bloque){
                  case 1:
                    piece.position.set((model5.position.x+0.20)+(0.46*i),0,(model5.position.z+0.30)+(0.46*j));
                    piece.rotation.y += -5.40;
                    break;
                  case 2:
                    if (i === 0) {
                      piece.position.set((model5.position.x+0.06)+(0.46*i),0,(model5.position.z+1.34)+(0.46*j));
                      piece.rotation.y += -5.40;
                    }else{
                      piece.position.set((model5.position.x+0.06)+(0.46*i),0,(model5.position.z+1.22)+(0.46*j));
                      piece.rotation.y += 4.02;
                    } 
                    break;
                  case 4:
                    piece.position.set((model5.position.x+1.48)+(0.46*i),0,(model5.position.z)+(0.46*j));
                    piece.rotation.y += 2.45; 
                    break;  
                  case 7:
                    if (i === 0) {
                      piece.position.set((model5.position.x+1.72)+(0.46*i),0,(model5.position.z+0.74)+(0.46*j));
                      piece.rotation.y += -5.40;
                    }else{
                      piece.position.set((model5.position.x+1.72)+(0.46*i),0,(model5.position.z+0.62)+(0.46*j));
                      piece.rotation.y += 4.02;
                    }   
                    break;  
                  case 21:
                    if (i === 1 && j === 0) {
                      return;
                    }
                    if (i === 0) {
                      piece.position.set((model5.position.x+2.87)+(0.46*i),0,(model5.position.z+0.74)+(0.46*j));
                      piece.rotation.y += -5.40;
                    }else{
                      piece.position.set((model5.position.x+2.87)+(0.46*i),0,(model5.position.z+0.62)+(0.46*j));
                      piece.rotation.y += 4.02;
                    }   
                    break;
                  case 30:
                    piece.position.set((model5.position.x+3.05)+(0.46*i),0,(model5.position.z+3.59)+(0.46*j));
                    piece.rotation.y += -0.69;    
                    break;
                  case 31:
                    if (i === 0) {
                      piece.position.set((model5.position.x+2.87)+(0.46*i),0,(model5.position.z+4.03)+(0.46*j));
                      piece.rotation.y += -5.40;
                    }else{
                      piece.position.set((model5.position.x+2.87)+(0.46*i),0,(model5.position.z+3.91)+(0.46*j));
                      piece.rotation.y += 4.02;
                    } 
                    break; 
                  case 35:
                    piece.position.set((model5.position.x+3.82)+(0.46*i),0,(model5.position.z+5.50)+(0.46*j));
                    piece.rotation.y += -5.40;      
                    break;   
                  case 37:
                    if (j === 0) {
                      piece.position.set((model5.position.x+5.08)+(0.46*i),0,(model5.position.z+3.62)+(0.46*j));
                      piece.rotation.y += -0.69;
                    }else{
                      piece.position.set((model5.position.x+5.20)+(0.46*i),0,(model5.position.z+3.50)+(0.46*j));
                      piece.rotation.y += 2.45;
                    }  
                    break; 
                  case 59:
                    
                    if (j === 0) {
                        piece.position.set((model5.position.x+4.60)+(0.46*i),0,(model5.position.z+5.12)+(0.46*j));
                        piece.rotation.y += -0.69;
                    }else{
                        piece.position.set((model5.position.x+4.72)+(0.46*i),0,(model5.position.z+5)+(0.46*j));
                        piece.rotation.y += 2.45;
                    }
                    break; 
                  case 67:
                    if (i === 0) {
                      piece.position.set((model5.position.x+6.95)+(0.46*i),0,(model5.position.z+4.95)+(0.46*j));
                      piece.rotation.y += -5.40;
                    }
                    break; 
                  case 70:
                    if (j === 0) {
                      piece.position.set((model5.position.x+4.60)+(0.46*i),0,(model5.position.z+6.45)+(0.46*j));
                      piece.rotation.y += -0.69;
                    } 
                    break;
                  case 76:
                    if (j === 0) {
                      piece.position.set((model5.position.x+7.46)+(0.46*i),0,(model5.position.z+4.90)+(0.46*j));
                      piece.rotation.y += -0.69;
                    }
                    break;            
                  default:
                    break;
                }
                                           
                piece.visible = invisibleModels(piso);
                scene.add(piece);
                sceneInfo.workSpaces.push(piece);
                n++;
               
              }, undefined, function ( e ) {
    
                console.error( e );
    
              } );
          }
        }
      }else{
        return;
      }
    
      
    }, undefined, function ( e ) {

      console.error( e );

    });
    return workPlaces;
    

    
  }

  
  function loadRooms(urlPlugin: string, reservationsService: ReservationsService, query: string,){
    urlPlugin = '/sala/todas';
    query = '';
    //  reservationsService.sendRequest( this.urlPlugin, this.query );
      reservationsService.sendRoomsPerFloorRequest( urlPlugin, query )
      .subscribe(
        (answ: RoomsPerFloorResponse) => {
          //console.log("el query es: ", query);
          matrizS = loadRoomWorkSpaces( answ, matrizS );
         // console.log("la matrizS es: ", matrizS);
          
          
          /** PISO 18 */
          //SALA 1
          //
          matrizS[0] = generateModelRoomSpace(matrizS[0],1,1,0);
          
          //SALA 2
          matrizS[0] = generateModelRoomSpace(matrizS[0],1,2,1);
        
          //SALA 3
          matrizS[0] = generateModelRoomSpace(matrizS[0],1,3,2);
          
          //SALA 4
          matrizS[0] = generateModelRoomSpace(matrizS[0],1,4,3);


          /** PISO 19 */
          //SALA 1
          matrizS[1] = generateModelRoomSpace(matrizS[1],2,1,0);
          
          //SALA 2
          matrizS[1] = generateModelRoomSpace(matrizS[1],2,2,0);
          
          //SALA 3
          matrizS[1] = generateModelRoomSpace(matrizS[1],2,3,0);
          
          //SALA 4
          matrizS[1] = generateModelRoomSpace(matrizS[1],2,4,0);

          //SALA 5
          matrizS[1] = generateModelRoomSpace(matrizS[1],2,5,0);

          //SALA 6
          matrizS[1] = generateModelRoomSpace(matrizS[1],2,6,0);

          //SALA 7
          matrizS[1] = generateModelRoomSpace(matrizS[1],2,7,0);

          //SALA 8
          matrizS[1] = generateModelRoomSpace(matrizS[1],2,8,0);

          //SALA 8
          matrizS[1] = generateModelRoomSpace(matrizS[1],2,9,0);

          
          /** PISO 20 */
          //SALA 1
          matrizS[2] = generateModelRoomSpace(matrizS[2],3,1,0);


        }
      );
  }


  function loadChairWorkSpaces(answ: workSpacesPerFloorResponse, matriz: (workSpaceW[])[]): (workSpaceW[])[]{
           for (let ws of answ.data) {
              if (ws.idPiso == 1) {
                matriz[0].push(ws);
              } else if (ws.idPiso == 2) {
                matriz[1].push(ws);
              } else if (ws.idPiso == 3) {
                matriz[2].push(ws);
              }
            }
            return matriz;
  }

  function loadRoomWorkSpaces(answ: RoomsPerFloorResponse, matrizS: (Roomr[])[]): (Roomr[])[]{
          for (let ws of answ.data) {
            if (ws.idPiso == 1) {
              matrizS[0].push(ws);
            } else if (ws.idPiso == 2) {
              matrizS[1].push(ws);
            } else if (ws.idPiso == 3) {
              matrizS[2].push(ws);
            }
          }
          return matrizS;
  }

  function loadWorkSpaces( urlPlugin: string, reservationsService: ReservationsService, query: string ): void{
    urlPlugin = '/puestoTrabajo/todas';
    query = '';
    
      reservationsService.sendWorkSpacesPerFloorRequest( urlPlugin, query )
      .subscribe(
        (answ: workSpacesPerFloorResponse) => {
          
          matriz = loadChairWorkSpaces( answ, matriz );
      
          
            loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  

                        
            ////////// PISO 20 //////////
            //BLOQUE 001    
            matriz[2] = generateModelsWorkSpace(matriz[2],1,1,1,3, 0);
            
            //BLOQUE 002    
             matriz[2] =generateModelsWorkSpace(matriz[2],2,1,2,3, 1);

            //BLOQUE 004
             matriz[2] =generateModelsWorkSpace(matriz[2],3,1,4,3, 3);

            //BLOQUE 007    
             matriz[2] =generateModelsWorkSpace(matriz[2],2,7,7,3, 6);

            //BLOQUE 021
             matriz[2] =generateModelsWorkSpace(matriz[2],2,5,21,3, 20);

            //BLOQUE 030   
             matriz[2] =generateModelsWorkSpace(matriz[2],1,1,30,3, 30);

            //BLOQUE 31
             matriz[2] =generateModelsWorkSpace(matriz[2],2,2,31,3, 31);

            //BLOQUE 035
             matriz[2] =generateModelsWorkSpace(matriz[2],1,1,35,3, 35);

            //BLOQUE 037 
             matriz[2] =generateModelsWorkSpace(matriz[2],11,2,37,3, 36);

            //BLOQUE 059
             matriz[2] =generateModelsWorkSpace(matriz[2],4,2,59,3, 58);
          
            //BLOQUE 067    
            matriz[2] = generateModelsWorkSpace(matriz[2],1,3,67,3, 66);

            //BLOQUE 070
            matriz[2] =generateModelsWorkSpace(matriz[2],6,1,70,3, 69);

            //BLOQUE 076
            matriz[2] =generateModelsWorkSpace(matriz[2],4,1,76,3, 75);
            
            ////////// PISO 19 //////////
            //BLOQUE 001    
            matriz[1] =generateModelsWorkSpace(matriz[1],1,5,1,2, 0);

            // //BLOQUE 006
            matriz[1] = generateModelsWorkSpace(matriz[1],1,1,6,2, 0);

            // //BLOQUE 007
            matriz[1] = generateModelsWorkSpace(matriz[1],5,1,7,2, 0);

            //  //BLOQUE 012 
             matriz[1] =generateModelsWorkSpace(matriz[1],6,2,12,2, 0);

            //  //BLOQUE 024
             matriz[1] =generateModelsWorkSpace(matriz[1],1,1,24,2, 0);

            //  //BLOQUE 025 
             matriz[1] =generateModelsWorkSpace(matriz[1],3,2,25,2, 0);
            
            //  //BLOQUE 028
             matriz[1] =generateModelsWorkSpace(matriz[1],1,1,28,2, 0);
            
            // //BLOQUE 032
            matriz[1] = generateModelsWorkSpace(matriz[1],4,2,32,2, 0);

            // //BLOQUE 040
             matriz[1] =generateModelsWorkSpace(matriz[1],5,2,40,2, 0);

            //  //BLOQUE 050 
             matriz[1] =generateModelsWorkSpace(matriz[1],1,1,50,2, 0);

            // //BLOQUE 051
             matriz[1] =generateModelsWorkSpace(matriz[1],4,2,51,2, 0);

            // //BLOQUE 059   
             matriz[1] =generateModelsWorkSpace(matriz[1],1,3,59,2, 0);

            //  //BLOQUE 062 
            matriz[1] =generateModelsWorkSpace(matriz[1],1,1,62,2, 0);

            // //BLOQUE 063
            matriz[1]= generateModelsWorkSpace(matriz[1],6,2,63,2, 0);

            // //BLOQUE 074
            matriz[1]= generateModelsWorkSpace(matriz[1],8,1,74,2, 0);

            //  //BLOQUE 082        
            matriz[1]= generateModelsWorkSpace(matriz[1],5,1,82,2, 0);

            // //BLOQUE 087
            matriz[1]= generateModelsWorkSpace(matriz[1],5,2,87,2, 0);

            // //BLOQUE 097
            matriz[1]= generateModelsWorkSpace(matriz[1],2,1,97,2, 0);

            // //BLOQUE 099
            matriz[1]=  generateModelsWorkSpace(matriz[1],6,2,99,2, 0);

            // //BLOQUE 107
            matriz[1]= generateModelsWorkSpace(matriz[1],1,1,107,2, 0);

            // //BLOQUE 108
            matriz[1]= generateModelsWorkSpace(matriz[1],5,2,108,2, 0);

            //  //BLOQUE 117
            matriz[1]= generateModelsWorkSpace(matriz[1],1,3,117,2, 0);

            //  //BLOQUE 120           
            matriz[1]= generateModelsWorkSpace(matriz[1],1,1,120,2, 0);

            // ////////// PISO 18 /////////
            // //BLOQUE 001    
            matriz[0]=  generateModelsWorkSpace(matriz[0],1,5,1,1, 0);

            // //BLOQUE 006
            matriz[0]= generateModelsWorkSpace(matriz[0],1,1,6,1, 5);

            // //BLOQUE 007
            matriz[0]= generateModelsWorkSpace(matriz[0],5,1,7,1, 6);

            //  //BLOQUE 012 
            matriz[0]= generateModelsWorkSpace(matriz[0],7,2,12,1, 11);

            //  //BLOQUE 026
            matriz[0]= generateModelsWorkSpace(matriz[0],1,1,26,1, 25);

            //  //BLOQUE 027
            matriz[0]=  generateModelsWorkSpace(matriz[0],3,2,27,1, 26);

            //  //BLOQUE 030
            //  for (let i = 0; i < 1; i++) {
              matriz[0]= generateModelsWorkSpace(matriz[0],1,1,30,1, 32);

            // //BLOQUE 034
            matriz[0]= generateModelsWorkSpace(matriz[0],4,2,34,1, 33);

            // //BLOQUE 042
            matriz[0]= generateModelsWorkSpace(matriz[0],2,1,42,1, 41);

            // //BLOQUE 044
            matriz[0]= generateModelsWorkSpace(matriz[0],5,2,44,1, 43);

            //  //BLOQUE 054 
            matriz[0]= generateModelsWorkSpace(matriz[0],1,1,54,1, 53);

            // //BLOQUE 055
            matriz[0]= generateModelsWorkSpace(matriz[0],4,2,55,1, 54);

            // //BLOQUE 063   
            matriz[0]= generateModelsWorkSpace(matriz[0],1,3,63,1, 62);

            // //BLOQUE 066
            matriz[0]= generateModelsWorkSpace(matriz[0],6,2,66,1, 65);

            // //BLOQUE 078
            matriz[0]= generateModelsWorkSpace(matriz[0],7,1,78,1, 77);
            //  //BLOQUE 085
            matriz[0]= generateModelsWorkSpace(matriz[0],6,1,85,1, 84);


            // //BLOQUE 091
            matriz[0]= generateModelsWorkSpace(matriz[0],5,2,91,1, 90);

            // //BLOQUE 101
            matriz[0]=  generateModelsWorkSpace(matriz[0],2,1,101,1, 100);

            // //BLOQUE 103 - SOLO SE USAN 8 SILLAS
            matriz[0]= generateModelsWorkSpace(matriz[0],6,2,103,1, 102);

            // //BLOQUE 111
            matriz[0]= generateModelsWorkSpace(matriz[0],1,1,111,1, 110);

            // //BLOQUE 112
            matriz[0]= generateModelsWorkSpace(matriz[0],5,2,112,1, 111);

            // //BLOQUE 121
            matriz[0]= generateModelsWorkSpace(matriz[0],2,1,121,1, 121);

            //  //BLOQUE 123
            matriz[0]= generateModelsWorkSpace(matriz[0],9,1,123,1, 123);

            // //BLOQUE 132   
            matriz[0]= generateModelsWorkSpace(matriz[0],1,8,132,1, 132);

            // //BLOQUE 140
            matriz[0]= generateModelsWorkSpace(matriz[0],5,2,140,1, 140);

            //  //BLOQUE 150
            matriz[0]= generateModelsWorkSpace(matriz[0],1,3,150,1, 150);

            // //BLOQUE 153
            matriz[0]= generateModelsWorkSpace(matriz[0],3,2,153,1, 153);

            // //BLOQUE 158
            matriz[0]= generateModelsWorkSpace(matriz[0],1,1,158,1, 158);
             
              
          }, undefined, function ( e ) {
      
            console.error( e );
      
          } );
        }
      );
  }


  function loadStairs(){
    
     loader.load( 'assets/models/stairs/stairs.gltf', function ( gltf ) {

      const model = gltf.scene;
      const child = model.children[0] as THREE.Mesh;
      const childMaterial = child.material as THREE.MeshPhysicalMaterial;
      
      colorFloor(childMaterial);
  
      model.position.set( 4.6, 0, -0.57 );
      model.scale.set( model.scale.x*0.5, model.scale.y*0.5, model.scale.z*0.5);
      model.userData = { "id": "stairs" };
      scene.add( model );  

      model.rotation.y += 9.43;

    }, undefined, function ( e ) {

      console.error( e );

    } ); 
  }

    function animate() {
      requestAnimationFrame( animate );
      checkChanges();
      controls.update();

      renderer.render( scene, camera );
      animateStars();
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

    function setFlag(){

      if( sessionStorage.getItem( 'flag' ) == 'true' ){ sessionStorage.clear()}
      else{
        sessionStorage.setItem( 'flag', 'true' );
        window.location.reload();  
      }
    }

    function updateModels(){

      for (let ws of sceneInfo.workSpaces) {
        ws.visible = ws.children[0].userData.info.idPiso == idPiso -17; 
        
      }

      for (let f of sceneInfo.floors) {
        f.visible = f.userData.info.idPiso == idPiso - 17 ? true : false; 
       
        
      }

      for (let r of sceneInfo.room) {
        r.visible = r.children[0].children[0].userData.info.idPiso == idPiso - 17; 
      }
    }

    function checkChanges(): void{
      if( infoHasChanged() ){
         updateModels() 
         idPisoActual = idPiso;
         numeroPersonasActual =  numeroPersonas;
        }  
    }


    function infoHasChanged(): boolean{
      return idPiso != idPisoActual;
    }



    function changeToChairCurrentColor(): void{
      for (let ob of scene.children) {
        if ( ob.children.length == 5 && ob.children[4].userData.info && ob.children[4].userData.info.idPuestoTrabajo == selectedObject?.userData.info.idPuestoTrabajo ){
          ( <THREE.MeshStandardMaterial> ( <THREE.Mesh> ob.children[3].children[0]).material).color = ob.userData.chairCurrentColor;
          (<THREE.MeshStandardMaterial> ( <THREE.Mesh> ob.children[3].children[3]).material).color = ob.userData.chairCurrentColor;
        }
      }
    }

    function selectChair(intersects: THREE.Intersection[], index: number){
      for (let ob of scene.children) {
                
        //NO BORRAR ESTA PARTE ES PARA CAMBIAR COLOR DE SILLAS
        if(  ob.children.length == 5 && ob.children[4].userData.info && ob.children[4].userData.info.idPuestoTrabajo == intersects[index].object.userData.info.idPuestoTrabajo
          && ob.children[4].userData.info.idPiso == idPiso - 17){

          ob.userData.chairCurrentColor = ( <THREE.MeshStandardMaterial> ( <THREE.Mesh> ob.children[3].children[0]).material).color;
          ob.userData.chairBackCurrentColor = (<THREE.MeshStandardMaterial> ( <THREE.Mesh> ob.children[3].children[3]).material).color;

          
          
          ( <THREE.MeshStandardMaterial> ( <THREE.Mesh> ob.children[3].children[0]).material).color = selectedObjectColor;
          (<THREE.MeshStandardMaterial> ( <THREE.Mesh> ob.children[3].children[3]).material).color = selectedObjectColor;
          
        }            
      }
    }

    function setColorSelectedObject():  void {
      (<THREE.MeshStandardMaterial>(<THREE.Mesh>selectedObject).material).color = selectedObject?.userData.currentColor;
    }
  }

  ngOnInit(): void{
    
    this.main();

  }





  

}
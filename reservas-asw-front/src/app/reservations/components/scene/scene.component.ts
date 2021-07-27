import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { combineAll } from 'rxjs/operators';
import { ACESFilmicToneMapping, Object3D } from 'three';
import { ReservationsService } from '../../services/reservations.service';
import { RoomsPerFloorResponse } from '../../interfaces/rooms-per-floor.interface';
import { workSpacesPerFloorResponse } from '../../interfaces/workspaces-per-floor.interface';
import { Reservation } from '../../interfaces/reservations.interface';


@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styles: [
  ]
})
export class SceneComponent implements OnInit {

  @Input() idpiso: number = 0;
  @Input() numOfPeople: number = 1;

  path3D : string = '';
  urlPlugin : string = '';
  query: string = '/';

  constructor( private reservationsService: ReservationsService ){} 

  

  ngOnInit(): void{
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
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
    let idPiso = this.idpiso;
    let numeroPersonas = this.numOfPeople;
    
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild( renderer.domElement );
    document.addEventListener( 'mousemove', onPointerMove );
    window.addEventListener('click', onClick);

    scene.background = new THREE.Color( 0x000000 );
    scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

    camera.position.set( 8, 15, 10 );

    controls.target.set( 0, 0.5, 0 );
    controls.update();
    //controls.enablePan = false;
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI / 2;

    const axesHelper = new THREE.AxesHelper( 15 );
    //scene.add( axesHelper );
    var grid = new THREE.GridHelper(20, 100);
    //scene.add(grid);
    

    loader.setDRACOLoader( dracoLoader );
    this.path3D = loadFloor(this.idpiso, this.path3D);    

    this.query = this.query + this.idpiso ;
    if( this.numOfPeople > 1 ){
      loadRooms(this.urlPlugin, this.reservationsService, this.query);
    }else{
      loadWorkSpaces( this.urlPlugin, this.reservationsService, this.query );
    }
    
    loadStairs();

    animate();

    window.onresize = function () {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    };

  function onPointerMove( event: MouseEvent ) {

      pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
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
    }

  }

  function onClick(event: MouseEvent) {
    raycaster.setFromCamera(pointer, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);
    console.log(intersects);
    

        
        if( intersects[0] && intersects[0].object.userData.info  ){
          
          if( selectedObject && selectedObject != intersects[0].object ){
           // console.log( selectedObject.userData.currentColor == selectedObjectColor );
            
            
            (<THREE.MeshStandardMaterial>(<THREE.Mesh>selectedObject).material).color = selectedObject.userData.currentColor;
            
          }

          for (let ob of scene.children) {
           /*  console.log('Los children del scene', scene.children); */
            
            /* console.log( 'El obejtito ome', ob.children[4].userData ); */
            
            //NO BORRAR ESTA PARTE ES PARA CAMBIAR COLOR DE SILLAS
            /* if(  ob.children.length == 5 && ob.children[4].userData.info && ob.children[4].userData.info.idPuestoTrabajo == intersects[0].object.userData.info.idPuestoTrabajo ){
              ( <THREE.MeshStandardMaterial> ( <THREE.Mesh> ob.children[3].children[0]).material).color = selectedObjectColor;
            }     */        
          }
          
          selectedObject = intersects[0].object;
          if( INTERSECTED && onObjectColor == (<THREE.MeshStandardMaterial>(<THREE.Mesh>selectedObject).material).color ){
            selectedObject.userData.currentColor = INTERSECTED.userData.currentColor;
          }else{
            selectedObject.userData.currentColor = (<THREE.MeshStandardMaterial>(<THREE.Mesh>selectedObject).material).color;
          }
          (<THREE.MeshStandardMaterial>(<THREE.Mesh>selectedObject).material).color = selectedObjectColor;  

          INTERSECTED = null;
           
        }
        console.log('El selected: ', selectedObject);
        
    
  }



  function loadFloor(idpiso: number, path: string): string{
    
    if(idpiso==1){
      console.log('Cargado piso 18');

      path = 'assets/models/18th_floor/18th_floor.gltf';

    }else if(idpiso==2){
      console.log('Cargado piso 19');
      
      path = 'assets/models/19th_floor/19th_floor.gltf';

    }else if(idpiso==3){
      console.log('Cargado Piso 20');

      path = 'assets/models/20th_floor/20th_floor.gltf';
      
    }else{
      console.log('No cargado ningun piso'); 
    }
    loader.load( path, function ( gltf ) {
     
      const model3 = gltf.scene;
      const child = model3.children[0] as THREE.Mesh;
      const childMaterial = child.material as THREE.MeshStandardMaterial;
     // console.log("el material del piso es: ", childMaterial , 'el Child es: ', child);
      childMaterial.color = new THREE.Color(0x4f1245);
      model3.position.set( 0,0,0 );
      model3.scale.set( model3.scale.x * 3, model3.scale.y * 3, model3.scale.z *3);
      //model3.position.y += model3.scale.y;
      model3.userData = {"id": "Piso"};
      scene.add( model3 );

    }, undefined, function ( e ) {

      console.error( e );

    } );
    
    return path;
  }

  function invisibleModels(pisoActual: number ): boolean{
    return pisoActual === idPiso;
  }

  function generateModelsWorkSpace(answ: workSpacesPerFloorResponse, columnas: number, filas: number, bloque: number, piso: number){
    loader.load('assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ){
      let model5 = gltf.scene;
      let n = 0;

      if (piso === 1) {
        model5.position.set(-7.02,0,-4.28);  ////// COORDENADAS PISO 18
        for (let i = 0; i < columnas; i++) {
          for (let j = 0; j < filas; j++) {
            loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
              let piece = gltf.scene;

              piece.children[0].userData = {"info" : answ.data[n]};
              piece.children[1].userData = {"info" : answ.data[n]};
              piece.children[2].userData = {"info" : answ.data[n]};
              piece.children[3].userData = {"info" : answ.data[n]};
              piece.children[4].userData = {"info" : answ.data[n]};

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
                    piece.position.set((model5.position.x+11.76)+(0.46*i),0,(model5.position.z+2.15)+(0.46*j));
                    piece.rotation.y += -0.69;
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

              piece.children[0].userData = {"info" : answ.data[n]};
              piece.children[1].userData = {"info" : answ.data[n]};
              piece.children[2].userData = {"info" : answ.data[n]};
              piece.children[3].userData = {"info" : answ.data[n]};
              piece.children[4].userData = {"info" : answ.data[n]};

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
              n++;
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
                
                piece.children[0].userData = {"info" : answ.data[n]};
                piece.children[1].userData = {"info" : answ.data[n]};
                piece.children[2].userData = {"info" : answ.data[n]};
                piece.children[3].userData = {"info" : answ.data[n]};
                piece.children[4].userData = {"info" : answ.data[n]};
    
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
                    (<THREE.MeshStandardMaterial> ( <THREE.Mesh> piece.children[4]).material).color = selectedObjectColor;
                    (<THREE.MeshStandardMaterial> ( <THREE.Mesh> piece.children[3].children[0]).material).color = selectedObjectColor;      
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

    

    
  }
  
  function loadRooms(urlPlugin: string, reservationsService: ReservationsService, query: string,){
    urlPlugin = '/sala/salasPorPiso';
    //  reservationsService.sendRequest( this.urlPlugin, this.query );
      reservationsService.sendRoomsPerFloorRequest( urlPlugin, query )
      .subscribe(
        (answ: RoomsPerFloorResponse) => {
          console.log(answ.data);
          loader.load( 'assets/models/chairs/chairs.gltf', function ( gltf ) {
      
            const model4 = gltf.scene;
            const child = model4.children[0].children[0] as THREE.Mesh;
           //console.log("los hijos de las mesas son:", child);
            const childMaterial = child.material as THREE.MeshStandardMaterial;
            //console.log("el material de la mesa es: ", childMaterial);
            childMaterial.color = new THREE.Color(0x65FC17);
            
            //model4.position.set( -6.9, 0, -0.28 );
            model4.position.set(-7.02,0,-4.28)
            model4.scale.set(model4.scale.x*0.49, model4.scale.y*0.49, model4.scale.z*0.49);
            model4.rotation.y += -0.7;
            model4.userData = { "id": "Modelo de las salas" };
            //scene.add( model4 );
      
            // for (let i = 1; i < 3; i++) {
              
              

            //   loader.load( 'assets/models/chairs/chairs.gltf', function ( gltf ) {

            //     let piece = gltf.scene;
            //     let child1 = piece.children[0].children[0] as THREE.Mesh;
            //     let childMaterial1 = child1.material  as THREE.MeshStandardMaterial;
            //     childMaterial1.color = smallChairColor;
            //     //CAMBIAR EL USERDATA POR LO QUE DA EL RESULTADO DE LA CONSULTA
            //     console.log('pieceeee', piece);
                
            //     piece.children[0].children[0].userData = {"id": "chairs"};
            //     piece.position.set(-6.9,3.01,0.88*i);
              
            //   scene.add(piece);


            // }, undefined, function ( e ) {
      
            //   console.error( e );
        
            // } );
      
            // }

            //////************PISO 18********//////////
            
            //BLOQUE S01
            for (let i = 0; i < 5; i++) {
              for (let j = 0; j < 1; j++) {
                  loader.load( 'assets/models/chairs/chairs.gltf', function ( gltf ) {  
                    let piece = gltf.scene;
                    piece.userData = {"info" : answ.data[j]};
                    let child1 = piece.children[0].children[0] as THREE.Mesh;
                    let childMaterial1 = child1.material  as THREE.MeshStandardMaterial;
                    childMaterial1.color = smallChairColor;
                    console.log(piece.userData = {"info" : answ.data[j]});
                    piece.scale.set( piece.scale.x*0.39, piece.scale.y*0.39, piece.scale.z*0.39);
                   
                    if (j === 0) {
                      piece.position.set((model4.position.x+4.22)+(0.57*i),0,(model4.position.z+7.75)+(0.57*j));
                      piece.rotation.y += -0.69;
                    }                          
                    piece.visible = invisibleModels(1) && numeroPersonas > 1;
                    scene.add(piece);
                  }, undefined, function ( e ) {
      
                    console.error( e );
      
                  } );
              }
            }

      
          }, undefined, function ( e ) {
      
            console.error( e );
      
          } );
          
        }
      );
  }

  function loadWorkSpaces( urlPlugin: string, reservationsService: ReservationsService, query: string ): void{
    urlPlugin = '/puestoTrabajo/id_Piso';
      reservationsService.sendWorkSpacesPerFloorRequest( urlPlugin, query )
      .subscribe(
        (answ: workSpacesPerFloorResponse) => {
          console.log(answ.data);
          
            loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  

                        
            ////////// PISO 20 //////////
            //BLOQUE 001    
            generateModelsWorkSpace(answ,1,1,1,3);
            
            //BLOQUE 002    
            generateModelsWorkSpace(answ,2,1,2,3);

            //BLOQUE 004
            generateModelsWorkSpace(answ,3,1,4,3);

            //BLOQUE 007    
            generateModelsWorkSpace(answ,2,7,7,3);

            //BLOQUE 021
            generateModelsWorkSpace(answ,2,5,21,3);

            //BLOQUE 030   
            generateModelsWorkSpace(answ,1,1,30,3);

            //BLOQUE 31
            generateModelsWorkSpace(answ,2,2,31,3);

            //BLOQUE 035
            generateModelsWorkSpace(answ,1,1,35,3);

            //BLOQUE 037 
            generateModelsWorkSpace(answ,11,2,37,3);

            //BLOQUE 059
            generateModelsWorkSpace(answ,4,2,59,3);
          
            //BLOQUE 067    
            generateModelsWorkSpace(answ,1,3,67,3);

            //BLOQUE 070
            generateModelsWorkSpace(answ,6,1,70,3);

            //BLOQUE 076
            generateModelsWorkSpace(answ,4,1,76,3);
            
            ////////// PISO 19 //////////
            //BLOQUE 001    
            generateModelsWorkSpace(answ,1,5,1,2);

            // //BLOQUE 006
            generateModelsWorkSpace(answ,1,1,6,2);

            // //BLOQUE 007
            generateModelsWorkSpace(answ,5,1,7,2);

            //  //BLOQUE 012 
            generateModelsWorkSpace(answ,6,2,12,2);

            //  //BLOQUE 024
            generateModelsWorkSpace(answ,1,1,24,2);

            //  //BLOQUE 025 
            generateModelsWorkSpace(answ,3,2,25,2);
            
            //  //BLOQUE 028
            generateModelsWorkSpace(answ,1,1,28,2);
            
            // //BLOQUE 032
            generateModelsWorkSpace(answ,4,2,32,2);

            // //BLOQUE 040
            generateModelsWorkSpace(answ,5,2,40,2);

            //  //BLOQUE 050 
            generateModelsWorkSpace(answ,1,1,50,2);

            // //BLOQUE 051
            generateModelsWorkSpace(answ,4,2,51,2);

            // //BLOQUE 059   
            generateModelsWorkSpace(answ,1,3,59,2);

            //  //BLOQUE 062 
            generateModelsWorkSpace(answ,1,1,62,2);

            // //BLOQUE 063
            generateModelsWorkSpace(answ,6,2,63,2);

            // //BLOQUE 074
            generateModelsWorkSpace(answ,8,1,74,2);

            //  //BLOQUE 082        
            generateModelsWorkSpace(answ,5,1,82,2);

            // //BLOQUE 087
            generateModelsWorkSpace(answ,5,2,87,2);

            // //BLOQUE 097
            generateModelsWorkSpace(answ,2,1,97,2);

            // //BLOQUE 099
            generateModelsWorkSpace(answ,6,2,99,2);

            // //BLOQUE 107
            generateModelsWorkSpace(answ,1,1,107,2);

            // //BLOQUE 108
            generateModelsWorkSpace(answ,5,2,108,2);

            //  //BLOQUE 117
            generateModelsWorkSpace(answ,1,3,117,2);

            //  //BLOQUE 120           
            generateModelsWorkSpace(answ,1,1,120,2);

            // ////////// PISO 18 /////////
            // //BLOQUE 001    
            generateModelsWorkSpace(answ,1,5,1,1);

            // //BLOQUE 006
            generateModelsWorkSpace(answ,1,1,6,1);

            // //BLOQUE 007
            generateModelsWorkSpace(answ,5,1,7,1);

            //  //BLOQUE 012 
            generateModelsWorkSpace(answ,7,2,12,1);

            //  //BLOQUE 026
            generateModelsWorkSpace(answ,1,1,26,1);

            //  //BLOQUE 027
            generateModelsWorkSpace(answ,3,2,27,1);

            //  //BLOQUE 030
            //  for (let i = 0; i < 1; i++) {
            generateModelsWorkSpace(answ,1,1,30,1);

            // //BLOQUE 034
            generateModelsWorkSpace(answ,4,2,34,1);

            // //BLOQUE 042
            generateModelsWorkSpace(answ,2,1,42,1);

            // //BLOQUE 044
            generateModelsWorkSpace(answ,5,2,44,1);

            //  //BLOQUE 054 
            generateModelsWorkSpace(answ,1,1,54,1);

            // //BLOQUE 055
            generateModelsWorkSpace(answ,4,2,55,1);

            // //BLOQUE 063   
            generateModelsWorkSpace(answ,1,3,63,1);

            // //BLOQUE 066
            generateModelsWorkSpace(answ,6,2,66,1);

            // //BLOQUE 078
            generateModelsWorkSpace(answ,8,1,78,1);
            
            //  //BLOQUE 085
            generateModelsWorkSpace(answ,6,1,85,1);


            // //BLOQUE 091
            generateModelsWorkSpace(answ,5,2,91,1);

            // //BLOQUE 101
            generateModelsWorkSpace(answ,2,1,101,1);

            // //BLOQUE 103
            generateModelsWorkSpace(answ,6,2,103,1);

            // //BLOQUE 111
            generateModelsWorkSpace(answ,1,1,111,1);

            // //BLOQUE 112
            generateModelsWorkSpace(answ,5,2,112,1);

            // //BLOQUE 121
            generateModelsWorkSpace(answ,2,1,121,1);

            //  //BLOQUE 123
            generateModelsWorkSpace(answ,9,1,123,1);

            // //BLOQUE 132   
            generateModelsWorkSpace(answ,1,8,132,1);

            // //BLOQUE 140
            generateModelsWorkSpace(answ,5,2,140,1);

            //  //BLOQUE 150
            generateModelsWorkSpace(answ,1,3,150,1);

            // //BLOQUE 153
            generateModelsWorkSpace(answ,3,2,153,1);

            // //BLOQUE 158
            generateModelsWorkSpace(answ,1,1,158,1);

          }, undefined, function ( e ) {
      
            console.error( e );
      
          } );
        }
      );
  }


  function loadStairs(){
    console.log( scene.children );
    
     loader.load( 'assets/models/stairs/stairs.gltf', function ( gltf ) {

      const model = gltf.scene;
      const child = model.children[0] as THREE.Mesh;
      const childMaterial = child.material as THREE.MeshStandardMaterial;
      //console.log("el material de las escaleras es: ", childMaterial);
      childMaterial.color = new THREE.Color(0xf25922);
  
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

      controls.update();

      //checkOnObject();

      renderer.render( scene, camera );
    }
  }





  

}

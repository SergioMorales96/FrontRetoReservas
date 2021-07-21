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
            
            model4.position.set( -6.9, 3.02, -0.28 );
            model4.scale.set(model4.scale.x*0.61, model4.scale.y*0.61, model4.scale.z*0.61);
            model4.rotation.y += -0.7;
            model4.userData = { "id": "Modelo de las salas" };
            scene.add( model4 );
      
            for (let i = 1; i < 3; i++) {
              
              

              loader.load( 'assets/models/chairs/chairs.gltf', function ( gltf ) {

                let piece = gltf.scene;
                let child1 = piece.children[0].children[0] as THREE.Mesh;
                let childMaterial1 = child1.material  as THREE.MeshStandardMaterial;
                childMaterial1.color = smallChairColor;
                //CAMBIAR EL USERDATA POR LO QUE DA EL RESULTADO DE LA CONSULTA
                console.log('pieceeee', piece);
                
                piece.children[0].children[0].userData = {"id": "chairs"};
                piece.position.set(-6.9,3.01,0.88*i);
              
              scene.add(piece);


            }, undefined, function ( e ) {
      
              console.error( e );
        
            } );
      
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
          
         // loader.load( 'assets/models/small_chair/small_chair.gltf', function ( gltf ) {
            loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  

            const model5 = gltf.scene;    
            console.log('El model5 OME:', model5);
              
            /* const child = model5.children[0].children[0] as THREE.Mesh;
            const childMaterial = child.material  as THREE.MeshStandardMaterial;
            childMaterial.color = new THREE.Color(0x65FC17); */
            //console.log(child, model5);
            //model5.position.set(-5.39,3.02,-1.44);
            //model5.position.set(-6.8,0,-2);
            model5.position.set(-7.11,0,-2.18);
            //model5.scale.set( model5.scale.x*0.61, model5.scale.y*0.61, model5.scale.z*0.61);
            model5.scale.set( model5.scale.x*0.49, model5.scale.y*0.49, model5.scale.z*0.49);
            //model5.children[0].children[0].userData = {"id": "Modelo de las sillas"};
            model5.userData = {"id": "Modelo de las sillas"};
            //scene.add( model5 );
            model5.rotation.y += 2.45;
            //model5.rotation.y += -5.40;
            let n = 0;
            

            //BLOQUE 001    
            for (let i = 0; i < 1; i++) {
              for (let j = 0; j < 1; j++) {
                  loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                    let piece = gltf.scene;
                    console.log( piece, 'piece papi' );
                    
                    piece.children[0].userData = {"info" : answ.data[j]};
                    piece.children[1].userData = {"info" : answ.data[j]};
                    piece.children[2].userData = {"info" : answ.data[j]};
                    piece.children[3].userData = {"info" : answ.data[j]};
                    piece.children[4].userData = {"info" : answ.data[j]};
                    n++;
                    piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                    piece.position.set((model5.position.x+0.20)+(0.46*i),0,(model5.position.z+0.30)+(0.46*j));
                    piece.rotation.y += -5.40;
                                               
                    
                    scene.add(piece);
                  }, undefined, function ( e ) {
      
                    console.error( e );
      
                  } );
              }
            }

            //BLOQUE 002    
            for (let i = 0; i < 2; i++) {
              for (let j = 0; j < 1; j++) {
                  loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                    let piece = gltf.scene;                  
                    piece.children[0].userData = {"info" : answ.data[j]};
                    piece.children[1].userData = {"info" : answ.data[j]};
                    piece.children[2].userData = {"info" : answ.data[j]};
                    piece.children[3].userData = {"info" : answ.data[j]};
                    piece.children[4].userData = {"info" : answ.data[j]};
                    n++;                 
                    piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                    if (i === 0) {
                      piece.position.set((model5.position.x+0.06)+(0.46*i),0,(model5.position.z+1.34)+(0.46*j));
                      piece.rotation.y += -5.40;
                    }else{
                      piece.position.set((model5.position.x+0.06)+(0.40*i),0,(model5.position.z+1.22)+(0.46*j));
                      piece.rotation.y += 4.02;
                    }                             
                    
                    scene.add(piece);
                  }, undefined, function ( e ) {
      
                    console.error( e );
      
                  } );
              }
            }


            //BLOQUE 004
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 1; j++) {
                  loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                    let piece = gltf.scene;
        
                    piece.children[0].userData = {"info" : answ.data[j]};
                    piece.children[1].userData = {"info" : answ.data[j]};
                    piece.children[2].userData = {"info" : answ.data[j]};
                    piece.children[3].userData = {"info" : answ.data[j]};
                    piece.children[4].userData = {"info" : answ.data[j]};
                    n++;

                    piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                    piece.position.set((model5.position.x+1.48)+(0.46*i),0,(model5.position.z)+(0.46*j));
                    piece.rotation.y += 2.45;          
                    scene.add(piece);
                  }, undefined, function ( e ) {
      
                    console.error( e );
      
                  } );
              }
            }
            

            //BLOQUE 007    
            for (let i = 0; i < 2; i++) {
              for (let j = 0; j < 7; j++) {
                  //loader.load( 'assets/models/small_chair/small_chair.gltf', function ( gltf ) {
                  loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                    let piece = gltf.scene;
                    
                    //let child1 = piece.children[0].children[0] as THREE.Mesh;
                    //let childMaterial1 = child1.material  as THREE.MeshStandardMaterial;
                    //console.log(child1, childMaterial);
                    
                    //childMaterial1.color = smallChairColor;
                    //CAMBIAR EL USERDATA POR EL RESULTADO DE LA CONSULTA AL BACK ( ANSW )
                    //piece.children[0].children[0].userData = { "id" : 'silla', "n": n , "selected": false};
                    piece.children[0].userData = {"info" : answ.data[j]};
                    piece.children[1].userData = {"info" : answ.data[j]};
                    piece.children[2].userData = {"info" : answ.data[j]};
                    piece.children[3].userData = {"info" : answ.data[j]};
                    piece.children[4].userData = {"info" : answ.data[j]};
                    n++;
                    //piece.position.set(model5.position.x+(1*i),3.02,model5.position.z + (1*j));
                    //piece.position.set((model5.position.x+1.72)+(0.46*i),0,(model5.position.z+0.74)+(0.46*j));
                    piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                    if (i === 0) {
                      piece.position.set((model5.position.x+1.72)+(0.46*i),0,(model5.position.z+0.74)+(0.46*j));
                      piece.rotation.y += -5.40;
                    }else{
                      piece.position.set((model5.position.x+1.72)+(0.46*i),0,(model5.position.z+0.62)+(0.46*j));
                      piece.rotation.y += 4.02;
                    }                             
                    
                    scene.add(piece);
                  }, undefined, function ( e ) {
      
                    console.error( e );
      
                  } );
                 /*  const piece = model5.clone( true );
                  let PieceChild = piece.children[0].children[0] as THREE.Mesh;
                  let pieceChildMaterial = PieceChild.material  as THREE.MeshStandardMaterial;
                  pieceChildMaterial.color = new THREE.Color(0x65FC17);
                  PieceChild.userData = { "id" : 'Esta es una silla', "n": n };
                  n++;
                  piece.position.set(model5.position.x+(1*i),3.02,model5.position.z + (1*j));
                  
                  scene.add(piece); */
              }
            }

            //BLOQUE 021   
            for (let i = 0; i < 2; i++) {
              for (let j = 0; j < 5; j++) {
                  loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                    let piece = gltf.scene;
        
                    piece.children[0].userData = {"info" : answ.data[j]};
                    piece.children[1].userData = {"info" : answ.data[j]};
                    piece.children[2].userData = {"info" : answ.data[j]};
                    piece.children[3].userData = {"info" : answ.data[j]};
                    piece.children[4].userData = {"info" : answ.data[j]};
                    n++;
                    piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                   
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
                    
                    scene.add(piece);
                  }, undefined, function ( e ) {
      
                    console.error( e );
      
                  } );
              }
            }

            //BLOQUE 030   
            for (let i = 0; i < 1; i++) {
              for (let j = 0; j < 1; j++) {
                  loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                    let piece = gltf.scene;
        
                    piece.children[0].userData = {"info" : answ.data[j]};
                    piece.children[1].userData = {"info" : answ.data[j]};
                    piece.children[2].userData = {"info" : answ.data[j]};
                    piece.children[3].userData = {"info" : answ.data[j]};
                    piece.children[4].userData = {"info" : answ.data[j]};
                    n++;
                    piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                   
                    piece.position.set((model5.position.x+3.05)+(0.46*i),0,(model5.position.z+3.59)+(0.46*j));
                    piece.rotation.y += -0.69;                           
                    
                    scene.add(piece);
                  }, undefined, function ( e ) {
      
                    console.error( e );
      
                  } );
              }
            }

            //BLOQUE 31
            for (let i = 0; i < 2; i++) {
              for (let j = 0; j < 2; j++) {
                  loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                    let piece = gltf.scene;
        
                    piece.children[0].userData = {"info" : answ.data[j]};
                    piece.children[1].userData = {"info" : answ.data[j]};
                    piece.children[2].userData = {"info" : answ.data[j]};
                    piece.children[3].userData = {"info" : answ.data[j]};
                    piece.children[4].userData = {"info" : answ.data[j]};
                    n++;
                    piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                   
                    if (i === 0) {
                      piece.position.set((model5.position.x+2.87)+(0.46*i),0,(model5.position.z+4.03)+(0.46*j));
                      piece.rotation.y += -5.40;
                    }else{
                      piece.position.set((model5.position.x+2.87)+(0.46*i),0,(model5.position.z+3.91)+(0.46*j));
                      piece.rotation.y += 4.02;
                    }                             
                    
                    scene.add(piece);
                  }, undefined, function ( e ) {
      
                    console.error( e );
      
                  } );
              }
            }

            //BLOQUE 035  
            for (let i = 0; i < 1; i++) {
              for (let j = 0; j < 1; j++) {
                  loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                    let piece = gltf.scene;
                    piece.children[0].userData = {"info" : answ.data[j]};
                    piece.children[1].userData = {"info" : answ.data[j]};
                    piece.children[2].userData = {"info" : answ.data[j]};
                    piece.children[3].userData = {"info" : answ.data[j]};
                    piece.children[4].userData = {"info" : answ.data[j]};
                    n++;

                    piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                    piece.position.set((model5.position.x+3.82)+(0.46*i),0,(model5.position.z+5.50)+(0.46*j));
                    piece.rotation.y += -5.40;                                         
                    
                    scene.add(piece);
                  }, undefined, function ( e ) {
      
                    console.error( e );
      
                  } );
              }
            }

            //BLOQUE 037 
            for (let i = 0; i < 11; i++) {
              for (let j = 0; j < 2; j++) {
                  loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                    let piece = gltf.scene;
        
                    piece.children[0].userData = {"info" : answ.data[j]};
                    piece.children[1].userData = {"info" : answ.data[j]};
                    piece.children[2].userData = {"info" : answ.data[j]};
                    piece.children[3].userData = {"info" : answ.data[j]};
                    piece.children[4].userData = {"info" : answ.data[j]};
                    n++;

                    piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                   
                    if (j === 0) {
                      piece.position.set((model5.position.x+5.08)+(0.46*i),0,(model5.position.z+3.62)+(0.46*j));
                      piece.rotation.y += -0.69;
                    }else{
                      piece.position.set((model5.position.x+5.20)+(0.46*i),0,(model5.position.z+3.52)+(0.46*j));
                      piece.rotation.y += 2.45;
                    }                             
                    
                    scene.add(piece);
                  }, undefined, function ( e ) {
      
                    console.error( e );
      
                  } );
              }
            }


            //BLOQUE 059
            for (let i = 0; i < 4; i++) {
              for (let j = 0; j < 2; j++) {
                  loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                    let piece = gltf.scene;
        
                    piece.children[0].userData = {"info" : answ.data[j]};
                    piece.children[1].userData = {"info" : answ.data[j]};
                    piece.children[2].userData = {"info" : answ.data[j]};
                    piece.children[3].userData = {"info" : answ.data[j]};
                    piece.children[4].userData = {"info" : answ.data[j]};
                    ( <THREE.MeshStandardMaterial> ( <THREE.Mesh> piece.children[4]).material).color = selectedObjectColor;
                    ( <THREE.MeshStandardMaterial> ( <THREE.Mesh> piece.children[3].children[0]).material).color = selectedObjectColor;
                    n++;

                    piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                   
                    if (j === 0) {
                      piece.position.set((model5.position.x+4.60)+(0.46*i),0,(model5.position.z+5.12)+(0.46*j));
                      piece.rotation.y += -0.69;
                    }else{
                      piece.position.set((model5.position.x+4.72)+(0.46*i),0,(model5.position.z+5.02)+(0.46*j));
                      piece.rotation.y += 2.45;
                    }                             
                    
                    scene.add(piece);
                    /* scene.add(piece.children[3]); */
                  }, undefined, function ( e ) {
      
                    console.error( e );
      
                  } );
              }
            }
            console.log('Los hijitos pues',   scene.children);
            

            //BLOQUE 067    
            for (let i = 0; i < 1; i++) {
              for (let j = 0; j < 3; j++) {
                  loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                    let piece = gltf.scene;
                    piece.children[0].userData = {"info" : answ.data[j]};
                    piece.children[1].userData = {"info" : answ.data[j]};
                    piece.children[2].userData = {"info" : answ.data[j]};
                    piece.children[3].userData = {"info" : answ.data[j]};
                    piece.children[4].userData = {"info" : answ.data[j]};

                    n++;
                    piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                    if (i === 0) {
                      piece.position.set((model5.position.x+6.95)+(0.46*i),0,(model5.position.z+4.95)+(0.46*j));
                      piece.rotation.y += -5.40;
                    }

                    scene.add(piece);
                  }, undefined, function ( e ) {
      
                    console.error( e );
      
                  } );
              }
            }

            //BLOQUE 070
            for (let i = 0; i < 6; i++) {
              for (let j = 0; j < 1; j++) {
                  loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                    let piece = gltf.scene;
        
                    piece.children[0].userData = {"info" : answ.data[j]};
                    piece.children[1].userData = {"info" : answ.data[j]};
                    piece.children[2].userData = {"info" : answ.data[j]};
                    piece.children[3].userData = {"info" : answ.data[j]};
                    piece.children[4].userData = {"info" : answ.data[j]};
                    n++;
                    piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                   
                    if (j === 0) {
                      piece.position.set((model5.position.x+4.60)+(0.46*i),0,(model5.position.z+6.45)+(0.46*j));
                      piece.rotation.y += -0.69;
                    }                           
                    
                    scene.add(piece);
                  }, undefined, function ( e ) {
      
                    console.error( e );
      
                  } );
              }
            }

            //BLOQUE 076
            for (let i = 0; i < 4; i++) {
              for (let j = 0; j < 1; j++) {
                  loader.load( 'assets/models/PUESTOS CON MESA/PLANOS 3D.gltf', function ( gltf ) {  
                    let piece = gltf.scene;
                    
                    piece.children[0].userData = {"info" : answ.data[j]};
                    piece.children[1].userData = {"info" : answ.data[j]};
                    piece.children[2].userData = {"info" : answ.data[j]};
                    piece.children[3].userData = {"info" : answ.data[j]};
                    piece.children[4].userData = {"info" : answ.data[j]};
                    n++;
                    piece.scale.set( piece.scale.x*0.49, piece.scale.y*0.49, piece.scale.z*0.49);
                   
                    if (j === 0) {
                      piece.position.set((model5.position.x+7.46)+(0.46*i),0,(model5.position.z+4.90)+(0.46*j));
                      piece.rotation.y += -0.69;
                    }                          
                    
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


  function loadStairs(){
    console.log( scene.children );
    
     loader.load( 'assets/models/stairs/stairs.gltf', function ( gltf ) {

      const model = gltf.scene;
      const child = model.children[0] as THREE.Mesh;
      const childMaterial = child.material as THREE.MeshStandardMaterial;
      //console.log("el material de las escaleras es: ", childMaterial);
      childMaterial.color = new THREE.Color(0xf25922);
  
      model.position.set( 4.8, 0, -0.44 );
      model.scale.set( model.scale.x*0.7, model.scale.y*0.5, model.scale.z*0.5);
      model.userData = { "id": "stairs" };
      scene.add( model );  

      model.rotation.y += 9.45;

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

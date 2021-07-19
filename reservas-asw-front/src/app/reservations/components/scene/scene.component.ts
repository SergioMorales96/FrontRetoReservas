import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { combineAll } from 'rxjs/operators';
import { ACESFilmicToneMapping } from 'three';
import { ReservationsService } from '../../services/reservations.service';
import { RoomsPerFloorResponse } from '../../interfaces/rooms-per-floor.interface';
import { workSpacesPerFloorResponse } from '../../interfaces/workspaces-per-floor.interface';

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
    let obecjts
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild( renderer.domElement );
    document.addEventListener( 'mousemove', onPointerMove );
    window.addEventListener('click', onClick);

    scene.background = new THREE.Color( 0x000000 );
    scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

    camera.position.set( 5, 2, 8 );

    controls.target.set( 0, 0.5, 0 );
    controls.update();
    //controls.enablePan = false;
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI / 2;

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
      const child = model3.children[0] as THREE.Mesh;
      const childMaterial = child.material as THREE.MeshStandardMaterial;
     // console.log("el material del piso es: ", childMaterial , 'el Child es: ', child);
      childMaterial.color = new THREE.Color(0x4f1245);
      model3.position.set( 0,0,0 );
      model3.scale.set( model3.scale.x * 3, model3.scale.y * 3, model3.scale.z *3);
      model3.position.y += model3.scale.y;
      model3.userData = {"id": "Piso"};
      scene.add( model3 );

    }, undefined, function ( e ) {

      console.error( e );

    } ); 

     /* loader.load( 'assets/models/chairs/chairs.gltf', function ( gltf ) {
      
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
        const piece = model4.clone(true);
        piece.userData = {"id": "chairs"};
        piece.position.set(-6.9,3.01,0.88*i);
        
        scene.add(piece);

      }

    }, undefined, function ( e ) {

      console.error( e );

    } );  */
    this.query = this.query + this.idpiso ;
    if( this.numOfPeople > 1 ){

      this.urlPlugin = '/sala/salasPorPiso';
      this.reservationsService.sendRequest( this.urlPlugin, this.query );
      this.reservationsService.sendRoomsPerFloorRequest( this.urlPlugin, this.query )
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
                piece.children[0].children[0].userData = {"id": "chairs"};
                piece.position.set(-6.9,3.01,0.88*i);
              
              scene.add(piece);


            }, undefined, function ( e ) {
      
              console.error( e );
        
            } );


              /* let piece = gltf.scene;
                    let child1 = piece.children[0].children[0] as THREE.Mesh;
                    let childMaterial1 = child1.material  as THREE.MeshStandardMaterial;
                    //console.log(child1, childMaterial);
                    
                    childMaterial1.color = smallChairColor;
                    piece.children[0].children[0].userData = { "id" : 'silla', "n": n , "selected": false};
                    piece.children[0].children[0].userData =answ.data[j];
                    n++;
                    piece.position.set(model5.position.x+(1*i),3.02,model5.position.z + (1*j));
                    
                    
                    scene.add(piece); */
      
            }
      
          }, undefined, function ( e ) {
      
            console.error( e );
      
          } );
          
        }
      );

      

    }else{
      this.urlPlugin = '/puestoTrabajo/id_Piso';
      this.reservationsService.sendWorkSpacesPerFloorRequest( this.urlPlugin, this.query )
      .subscribe(
        (answ: workSpacesPerFloorResponse) => {
          console.log(answ.data);
          
          loader.load( 'assets/models/small_chair/small_chair.gltf', function ( gltf ) {

            const model5 = gltf.scene;      
            /* const child = model5.children[0].children[0] as THREE.Mesh;
            const childMaterial = child.material  as THREE.MeshStandardMaterial;
            childMaterial.color = new THREE.Color(0x65FC17); */
            //console.log(child, model5);
            model5.position.set(-5.39,3.02,-1.44);
            model5.scale.set( model5.scale.x*0.61, model5.scale.y*0.61, model5.scale.z*0.61);
            model5.children[0].children[0].userData = {"id": "Modelo de las sillas"};
            //scene.add( model5 );
            model5.rotation.y += 2.45;
            let n = 0;
            
            for (let i = 0; i < 2; i++) {
              for (let j = 0; j < 7; j++) {
                  loader.load( 'assets/models/small_chair/small_chair.gltf', function ( gltf ) {
                    let piece = gltf.scene;
                    let child1 = piece.children[0].children[0] as THREE.Mesh;
                    let childMaterial1 = child1.material  as THREE.MeshStandardMaterial;
                    //console.log(child1, childMaterial);
                    
                    childMaterial1.color = smallChairColor;
                    //CAMBIAR EL USERDATA POR EL RESULTADO DE LA CONSULTA AL BACK ( ANSW )
                    piece.children[0].children[0].userData = { "id" : 'silla', "n": n , "selected": false};
                    n++;
                    piece.position.set(model5.position.x+(1*i),3.02,model5.position.z + (1*j));
                    
                    
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
          }, undefined, function ( e ) {
      
            console.error( e );
      
          } );
        }
      );

      
      
    }
    
    
     loader.load( 'assets/models/stairs/stairs.gltf', function ( gltf ) {

      const model = gltf.scene;
      const child = model.children[0] as THREE.Mesh;
      const childMaterial = child.material as THREE.MeshStandardMaterial;
      //console.log("el material de las escaleras es: ", childMaterial);
      childMaterial.color = new THREE.Color(0xf25922);
  
      model.position.set( 4.8, 3.045, -0.44 );
      model.scale.set( model.scale.x*0.7, model.scale.y*0.5, model.scale.z*0.5);
      model.userData = { "id": "stairs" };
      scene.add( model );  

      model.rotation.y += 9.45;

    }, undefined, function ( e ) {

      console.error( e );

    } ); 

    animate();

    window.onresize = function () {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    };

  function onPointerMove( event: MouseEvent ) {

      pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      //checkOnObject();
  
  }

  function checkOnObject(  ){
    
    raycaster.setFromCamera(pointer, camera);
    
    
    let intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0 ) {

      if ( INTERSECTED != intersects[ 0 ].object ) {

        if ( INTERSECTED ) ( <THREE.MeshStandardMaterial> (<THREE.Mesh>INTERSECTED).material).color = smallChairColor;

        INTERSECTED = intersects[ 0 ].object;
        ( <THREE.MeshStandardMaterial> (<THREE.Mesh>INTERSECTED).material).color = onObjectColor;
    } else {

        if ( INTERSECTED ) ( <THREE.MeshStandardMaterial> (<THREE.Mesh>INTERSECTED).material).color = smallChairColor;

        INTERSECTED = null;

    }
    }

  }

  function onClick(event: MouseEvent) {
    raycaster.setFromCamera(pointer, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);
    console.log('Hicieron Clic');
    for (const inter of intersects) {
     // console.log(inter);
      
      if( inter.object.userData.idPiso ){
        (<THREE.MeshStandardMaterial>(<THREE.Mesh>inter.object).material).color = selectedObjectColor;  
        inter.object.userData.selected = true;
        console.log(inter.object.userData);
        
      }
      
    }
  }

    function animate() {

      requestAnimationFrame( animate );

      controls.update();

      //checkOnObject();

      renderer.render( scene, camera );
    }
  }

}

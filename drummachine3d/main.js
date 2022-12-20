import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

let INTERSECTED;

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ( 15 );
camera.position.setY( 15 );

const background = new THREE.TextureLoader().load('./assets/DE.png')
scene.background = background;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.intensity = 2;
pointLight.position.set(0,15,0);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight, ambientLight );

// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add( lightHelper );

const controls = new OrbitControls(camera, renderer.domElement);

const gltfLoader = new GLTFLoader();
gltfLoader.load('./assets/drummachine3d.gltf', gltfScene => {
  gltfScene.scene.scale.set(10,10,10);
  scene.add(gltfScene.scene)
});

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // update the picking ray with the camera and pointer position
    raycaster.setFromCamera( pointer, camera );

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.children );
  
    for ( let i = 0; i < intersects.length; i ++ ) {
      if ( intersects.length > 0 ) {

        if ( INTERSECTED != intersects[ 0 ].object ) {

          if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
          INTERSECTED = intersects[ 0 ].object;
          INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();

          switch (intersects[i].object.name) {
            case 'button1':
              INTERSECTED.material.emissive.setHex( 0xaaaaaa );
              return
            case 'button2':
              INTERSECTED.material.emissive.setHex( 0xaaaaaa );
              return
            case 'button3':
              INTERSECTED.material.emissive.setHex( 0xaaaaaa );
              return
            case 'button4':
              INTERSECTED.material.emissive.setHex( 0xaaaaaa );
              return
            case 'button5':
              INTERSECTED.material.emissive.setHex( 0xaaaaaa );
              return
            case 'button6':
              INTERSECTED.material.emissive.setHex( 0xaaaaaa );
              return
            case 'button7':
              INTERSECTED.material.emissive.setHex( 0xaaaaaa );
              return
            case 'button8':
              INTERSECTED.material.emissive.setHex( 0xaaaaaa );
              return
            case 'button9':
              INTERSECTED.material.emissive.setHex( 0xaaaaaa );
              return
            default:
              return 
          }

        }

      } else {
        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

        INTERSECTED = null;

      }
    }
}


function playSound( event ) {
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera( pointer, camera );

  const intersects = raycaster.intersectObjects( scene.children );
  const audio = new Audio();

  for ( let i = 0; i < intersects.length; i ++ ) {

    switch (intersects[i].object.name) {
      case 'button1':
        console.log(intersects[i].object.name)
        audio.src = './assets/1.mp3';
        audio.play();
        return
      case 'button2':
        console.log(intersects[i].object.name)
        audio.src = './assets/2.mp3';
        audio.play();
        return
      case 'button3':
        console.log(intersects[i].object.name)
        audio.src = './assets/2.mp3';
        audio.play();
        return
      case 'button4':
        console.log(intersects[i].object.name)
        audio.src = './assets/2.mp3';
        audio.play();
        return
      case 'button5':
        console.log(intersects[i].object.name)
        audio.src = './assets/2.mp3';
        audio.play();
        return
      case 'button6':
        console.log(intersects[i].object.name)
        audio.src = './assets/2.mp3';
        audio.play();
        return
      case 'button7':
        console.log(intersects[i].object.name)
        audio.src = './assets/2.mp3';
        audio.play();
        return
      case 'button8':
        console.log(intersects[i].object.name)
        audio.src = './assets/2.mp3';
        audio.play();
        return
      case 'button9':
        console.log(intersects[i].object.name)
        audio.src = './assets/2.mp3';
        audio.play();
        return
      default:
        return 
    }

  }
}

window.addEventListener( 'mousemove', onPointerMove );
window.addEventListener( 'click', playSound );


function animate() {
  requestAnimationFrame( animate );

  controls.update();

  renderer.render( scene, camera );
}

animate();
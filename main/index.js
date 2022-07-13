import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
import * as datGUI from 'dat.gui';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
 
camera.position.set(0,0,20)
const cubeGeometry = new THREE.BoxGeometry(5,5,5);
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

 

const gui = new datGUI.GUI();
gui.add(cube.position, 'x').min(0).max(5).step(0.01).name("positionX").onChange((val) => {
    console.log("val", val)
}).onFinishChange((val) => {
    console.log("completely stop", val)
});

const params = {
    color: '#FF0000',
    fn: () => {
        gsap.to(cube.position, {x: 5, duration: 2, yoyo: true, repeat: -1})
    }
}
gui.addColor(params, 'color').onChange((val) => {
    console.log("color", val);
    cube.material.color.set(val);
})
gui.add(cube, "visible").name("display")
gui.add(params, "fn").name("move")
var folder = gui.addFolder("set cube")
folder.add(cube.material, "wireframe")

scene.add(camera);
// scene.add(cube);


const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0
])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const meterial = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh  = new THREE.Mesh(geometry, meterial)
scene.add(mesh);



for(let i =0; i< 50; i++) {
    const geometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(9);
    for (let j = 0; j < 9; j++) {
        positionArray[j] = Math.random() * 5;
    }
    let color = new THREE.Color(Math.random(), Math.random(), Math.random());
    geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    const meterial = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.5});
    const mesh  = new THREE.Mesh(geometry, meterial)
    scene.add(mesh);
}
 


const container = document.querySelector("#container")
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const clock = new THREE.Clock();
let movement = () => {
    let time = clock.getElapsedTime(); // 获取始终运行总时长
    let delayTime = clock.getDelta() // 
    let t = time % 5;
    cube.position.x = t *1;
}

container.appendChild(renderer.domElement);
renderer.render( scene, camera );
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

// 设置动画
// gsap.to(cube.position, {x: 12, duration: 5});
// gsap.to(cube.rotation, {x: 2 * Math.PI, duration: 5});

const move = () => {
    let time = clock.getElapsedTime(); // 获取始终运行总时长
    let delayTime = clock.getDelta() // 
    let t = time % 5;
    cube.position.x = t *1;
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

// container.addEventListener('click', () => {
//     if (window.document.fullscreenElement) {
//         document.exitFullscreen();
//     } else {
//         renderer.domElement.requestFullscreen();
//     }
// })
function render() {
    orbitControls.update();
    renderer.render( scene, camera );
    requestAnimationFrame(render);
}


render();


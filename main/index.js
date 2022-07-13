import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
 
camera.position.set(0,0,20)
const cubeGeometry = new THREE.BoxGeometry(5,5,5);
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);


scene.add(camera);
scene.add(cube);


const container = document.querySelector("#container")
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const clock = new THREE.Clock();


container.appendChild(renderer.domElement);
renderer.render( scene, camera );
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

// 设置动画
gsap.to(cube.position, {x: 12, duration: 5});
gsap.to(cube.rotation, {x: 2 * Math.PI, duration: 5});

// let time = clock.getElapsedTime(); // 获取始终运行总时长
// let delayTime = clock.getDelta() // 
// console.log("delayTime", delayTime)
// let t = time % 5;
// cube.position.x = t *1;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})
function render() {
    orbitControls.update();
    renderer.render( scene, camera );
    requestAnimationFrame(render);
}
render();
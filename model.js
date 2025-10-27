import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'OrbitControls';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 1.2));
const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(2, 3, 4);
scene.add(dirLight);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Load GLB Model
const loader = new GLTFLoader();
loader.load(
  './skeleton4.glb',
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    scene.add(model);
    animate();
  },
  undefined,
  (err) => console.error('Error loading GLB:', err)
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

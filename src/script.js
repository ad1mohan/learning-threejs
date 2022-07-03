import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import * as dat from "dat.gui";
import "./style.css";
let camera, scene, renderer, controls;
let particles;
let planeMesh, boxMesh, sphereMesh, torousMesh, sphereShadow;
let standardMaterial;

let ambientLight, ambientLightHelper;
let hemisphereLight, hemisphereLightHelper;
let directionalLight, directionalLightHelper, directionalLightCameraHelper;
let pointLight, pointLightHelper, pointLightCameraHelper;
let rectAreaLight, rectAreaLightHelper;
let spotLight, spotLightHelper, spotLightCameraHelper;

let textureLoader;

const objects = [];

let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

const clock = new THREE.Clock();

init();
animate();

function init() {
	// Camera
	camera = new THREE.PerspectiveCamera(
		60,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 6;
	camera.position.set(
		-1.6705697237405037,
		2.336577388813617,
		2.929922862489118
	);
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);

	// Texture Loader
	textureLoader = new THREE.TextureLoader();

	const bakedShadow = textureLoader.load("./textures/bakedShadow.jpg");
	const simpleShadow = textureLoader.load("./textures/simpleShadow.jpg");
	const particleTexture = textureLoader.load("./textures/particles/2.png");

	// Ambient Light
	ambientLight = new THREE.AmbientLight(0x404040); // soft white light
	scene.add(ambientLight);

	// parctiles

	const geometry = new THREE.BufferGeometry();
	const count = 500000;
	const positions = new Float32Array(count * 3);
	const colors = new Float32Array(count * 3);
	for (let i = 0; i < count * 3; i++) {
		positions[i] = (Math.random() - 0.5) * 10;
		colors[i] = Math.random();
	}
	geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
	const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	const particleMaterial = new THREE.PointsMaterial({
		size: 0.02,
		sizeAttenuation: true,
	});
	// particleMaterial.color = new THREE.Color("#ff88cc");
	particleMaterial.transparent = true;
	particleMaterial.alphaTest = 0.001;
	particleMaterial.alphaMap = particleTexture;
	particleMaterial.vertexColors = true;
	particles = new THREE.Points(geometry, particleMaterial);

	const particleGeometry = new THREE.SphereBufferGeometry(1, 32, 32);
	const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
	scene.add(particles);

	controls = new OrbitControls(camera, document.body);
	controls.enableDamping = true;

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	document.body.appendChild(renderer.domElement);

	//

	window.addEventListener("resize", onWindowResize);

	// GUI
	const gui = new dat.GUI();
	gui.hide();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function animate() {
	requestAnimationFrame(animate);
	const time = performance.now();
	const elaspedTime = clock.getElapsedTime();
	particles.rotation.z = elaspedTime * Math.random();
	particles.rotation.y = elaspedTime * 0.2;
	particles.rotation.z = elaspedTime * 0.1;

	controls.update();

	prevTime = time;

	renderer.render(scene, camera);
}

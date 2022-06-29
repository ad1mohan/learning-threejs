import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import * as dat from "dat.gui";
import "./style.css";
let camera, scene, renderer, controls;
let planeMesh, boxMesh, sphereMesh, torousMesh;
let standardMaterial;

let ambientLight, ambientLightHelper;
let hemisphereLight, hemisphereLightHelper;
let directionalLight, directionalLightHelper;
let pointLight, pointLightHelper;
let rectAreaLight, rectAreaLightHelper;
let spotLight, spotLightHelper;
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

	// Scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);

	// Ambient Light
	ambientLight = new THREE.AmbientLight(0x404040); // soft white light
	// scene.add(ambientLight);

	// Hemisphere Lights
	hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
	hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 1);
	hemisphereLight.position.set(2.5, 1, 0.75);
	scene.add(hemisphereLight, hemisphereLightHelper);

	// Directional Lights
	directionalLight = new THREE.DirectionalLight(0x00fffc, 0.5);
	directionalLight.position.set(-1.335, 5, -0.035);
	directionalLightHelper = new THREE.DirectionalLightHelper(
		directionalLight,
		1
	);
	scene.add(directionalLight, directionalLightHelper);

	// Point Light
	pointLight = new THREE.PointLight(0xff9000, 0.5, 4.5, 1);
	pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
	pointLight.position.set(2, 1, 2);
	scene.add(pointLight, pointLightHelper);

	// Rect area light

	rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 5, 1, 1);
	rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
	rectAreaLight.position.set(-1.5, 0, 1.5);
	rectAreaLight.lookAt(0, 0, 0);
	rectAreaLight.add(rectAreaLightHelper);
	scene.add(rectAreaLight);

	// Spot Light
	spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1);
	spotLightHelper = new THREE.SpotLightHelper(spotLight);
	spotLight.position.set(0, 2, 3);
	spotLight.target.position.x = -0.75;
	scene.add(spotLight, spotLight.target, spotLightHelper);

	// Material
	standardMaterial = new THREE.MeshStandardMaterial();

	// Meshes
	planeMesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(6, 6),
		standardMaterial
	);
	boxMesh = new THREE.Mesh(
		new THREE.BoxBufferGeometry(1, 1, 1),
		standardMaterial
	);
	sphereMesh = new THREE.Mesh(
		new THREE.SphereBufferGeometry(0.6, 16, 32),
		standardMaterial
	);
	torousMesh = new THREE.Mesh(
		new THREE.TorusKnotGeometry(0.5, 0.2, 64, 8),
		standardMaterial
	);
	torousMesh.position.set(-2, 1, 0);
	sphereMesh.position.set(2, 1, 0);
	boxMesh.position.set(0, 1, 0);
	planeMesh.rotation.x = -Math.PI / 2;
	scene.add(planeMesh, boxMesh, sphereMesh, torousMesh);

	controls = new OrbitControls(camera, document.body);
	controls.enableDamping = true;

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//

	window.addEventListener("resize", onWindowResize);

	// GUI
	const gui = new dat.GUI();
	gui.hide();
	gui
		.add(ambientLight, "intensity")
		.min(0)
		.max(1)
		.step(0.01)
		.name("ambientLight intensity");
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

	torousMesh.rotation.x += (Math.PI / 2) * 0.01;
	torousMesh.rotation.y += (Math.PI / 2) * 0.01;
	sphereMesh.rotation.x += (Math.PI / 2) * 0.01;
	sphereMesh.rotation.y += (Math.PI / 2) * 0.01;
	boxMesh.rotation.x += (Math.PI / 2) * 0.01;
	boxMesh.rotation.y += (Math.PI / 2) * 0.01;

	controls.update();
	spotLightHelper.update();

	prevTime = time;

	renderer.render(scene, camera);
}

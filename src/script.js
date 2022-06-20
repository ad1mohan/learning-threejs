import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'


const sizes = {
    width:800, 
    height:600
}

// Cursor
const cursor ={
    x:0,
    y:0
}
window.addEventListener('mousemove',(event)=>{
    cursor.x = event.clientX / sizes.width -0.5
    cursor.y = -(event.clientY / sizes.height -0.5)
})

// Get Canvas DOM
const canvas = document.querySelector('.webgl-canvas')

// Scene
const scene = new THREE.Scene()

// Group
const group = new THREE.Group()
scene.add(group)

// Grometry (x, y, z) Mesh Material
const geometry = new THREE.BoxGeometry(1,1,1)
const material1 = new THREE.MeshBasicMaterial({color:0xff0000})
const material2 = new THREE.MeshBasicMaterial({color:0x00ff00})
const mesh1 = new THREE.Mesh(geometry,material1)
const mesh2 = new THREE.Mesh(geometry,material2)
mesh2.position.set(2,-1,0)
group.add(mesh1)
group.add(mesh2)

// changing position, scale, rotation, lookAT, reOrder, group
group.position.set(0.7,-0.6,0)
group.scale.x=2

group.rotation.x=Math.PI / 4
group.rotation.y=Math.PI / 4

// Camera = PerspectiveCamera(Field_of_view, screen_width/height) Types, Orthographic Camera, Custom Controls, Damping
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
// const aspectRatio = sizes.width /sizes.height
// const camera = new THREE.OrthographicCamera(-1*aspectRatio, 1* aspectRatio,1,-1,0.1,1000)
scene.add(camera)

// Changing camera position
// camera.position.x=1
// camera.position.y=1
camera.position.z=5

// Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true


// Axis helper
const axesHelper =  new THREE.AxesHelper(5);
scene.add(axesHelper)

// camera.lookAt(group.position)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
})
// resize renderer
renderer.setSize(sizes.width,sizes.height)

gsap.to(group.position,{duration:1, delay: 1, x:2})
gsap.to(group.position,{duration:1, delay: 2, y:0})

// const clock = new THREE.Clock()
// Animations - tick, requestAnimationFrame, deltaTime, GSAP
const tick = ()=>{
    // Clock
    // const elaspedTime = clock.getElapsedTime()
    // camera.position.set(cursor.x,cursor.y,2)
    // 1 rev per sec
    // group.rotation.y=elaspedTime * Math.PI * 2
    // group.position.x = Math.cos(elaspedTime)
    // group.position.y = Math.sin(elaspedTime)
    // camera.lookAt(group.position)
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
    
}
tick()
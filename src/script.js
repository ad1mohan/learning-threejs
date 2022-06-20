import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'
import { Geometry } from 'three'

const sizes = {
    width:window.innerWidth, 
    height:window.innerHeight
}

// Get Canvas DOM
const canvas = document.querySelector('.webgl-canvas')

// Scene
const scene = new THREE.Scene()

// Group
const group = new THREE.Group()
scene.add(group)

// Grometry
// const grometry = new THREE.Geometry()

// const vertex1 = new THREE.Vector3(0,0,0)
// grometry.vertices.push(vertex1)
// const vertex2 = new THREE.Vector3(0,1,0)
// grometry.vertices.push(vertex2)
// const vertex3 = new THREE.Vector3(1,0,0)
// grometry.vertices.push(vertex3)

// const face = new THREE.Face3(0,1,2)
// grometry.faces.push(face)

// group.add(new THREE.Mesh(grometry,new THREE.MeshBasicMaterial({color:0x00ff00, wireframe:false})))

// Buffer grometry
// const positionsArray = new Float32Array([
//     0,0,0,
//     0,1,0,
//     1,0,0
// ])
// const positionsAttributes = new THREE.BufferAttribute(positionsArray,3)
// const grometry = new THREE.BufferGeometry()
// grometry.setAttribute('position', positionsAttributes)
// group.add(new THREE.Mesh(grometry,new THREE.MeshBasicMaterial({color:0xff0000, wireframe:true})));

group.add(new THREE.Mesh(new THREE.BoxGeometry(1,1,1,2,2,2),new THREE.MeshBasicMaterial({color:0xff0000, wireframe:true})));


// Camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
camera.position.z=5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true


// Axis helper
const axesHelper =  new THREE.AxesHelper(5);
scene.add(axesHelper)

window.addEventListener('resize',()=>{
    console.log('resizing')
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

// full screen
window.addEventListener('dblclick',()=>{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreenElement){
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else{
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(canvas.webkitExitFullscreen)
        {
            canvas.webkitExitFullscreen()
        }
    }

})

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
})
// resize renderer
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

const tick = ()=>{

    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
    
}
tick()
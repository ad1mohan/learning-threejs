import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'

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

// Grometry (x, y, z) Mesh Material
const geometry = new THREE.BoxGeometry(1,1,1)
const material1 = new THREE.MeshBasicMaterial({color:0xff0000})
const material2 = new THREE.MeshBasicMaterial({color:0x00ff00})
const mesh1 = new THREE.Mesh(geometry,material1)
const mesh2 = new THREE.Mesh(geometry,material2)
mesh2.position.set(2,0,0)
group.add(mesh1)
group.add(mesh2)



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
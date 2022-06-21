import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { TextureLoader } from 'three'

// Testures
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart =()=>{
    console.log('onStart')
}
loadingManager.onLoad =()=>{
    console.log('onLoad')
}
loadingManager.onProgress =()=>{
    console.log('onProgress')
}
loadingManager.onError =()=>{
    console.log('onError')
}
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

colorTexture.repeat.x = 2
colorTexture.repeat.y = 3
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping
colorTexture.offset.x = 0.5
colorTexture.offset.y = 0.5
colorTexture.rotation= Math.PI*0.25
colorTexture.center.x=0.5
colorTexture.center.y=0.5

const sizes = {
    width:window.innerWidth, 
    height:window.innerHeight
}

const gui = new dat.GUI({closed:true, width:400})
// gui.hide()
const parameters ={
    color:0xfff000,
    spin:()=>{
        gsap.to(mesh.rotation,{duration:1,y:mesh.rotation.y+Math.PI*2})
    }
}


 
// Get Canvas DOM
const canvas = document.querySelector('.webgl-canvas')

// Scene
const scene = new THREE.Scene()

// const mat = new THREE.MeshBasicMaterial({color:parameters.color, wireframe:false})
const mat = new THREE.MeshBasicMaterial({map:colorTexture})
const geo = new THREE.BoxGeometry(1,1,1)
const mesh = new THREE.Mesh(geo,mat)
scene.add(mesh);

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

// gui tweeks
gui.add(mesh.position, 'x' ) // brings text
gui.add(mesh.position, 'y' ,-3,3,0.01) // brings range
gui.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('zoom')  // brings range with name
gui.add(mesh,'visible').name("Mesh Visible") // boolean/checkbox
gui.add(axesHelper,'visible').name("Axes Helper Visible") // boolean/checkbox
gui.addColor(parameters,'color').onChange(()=>{mat.color.set(parameters.color)}) // colour
gui.add(parameters,'spin')

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
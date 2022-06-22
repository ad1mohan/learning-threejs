import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { TextureLoader } from 'three'

// Fonts

// Screen Size
const sizes = {
    width:window.innerWidth, 
    height:window.innerHeight
}
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
window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

// fonts
const fontLoader = new THREE.FontLoader()
let text = null
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font)=>{
        const textGrometry = new THREE.TextBufferGeometry(
            'AD1MOHAN',
            {
                font,
                size:0.5,
                height:0.2,
                curveSegments:12,
                bavelEnabled:true,
                bavelThickness:0.03,
                bavelSize:0.02,
                bavelOffset:0,
                bavelSegments:5
            }
        )
        textGrometry.center()
        // textGrometry.computeBoundingBox()
        // textGrometry.translate(
        //     -textGrometry.boundingBox.max.x * 0.5,
        //     -textGrometry.boundingBox.max.y * 0.5,
        //     -textGrometry.boundingBox.max.z * 0.5
        // )
        const textMat = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
        text = new THREE.Mesh(textGrometry,textMat)
        scene.add(text)
    }
    )

// Gui
const gui = new dat.GUI({closed:true, width:400})
// gui.hide()
const parameters ={
    color:0xfff000,
    spin:()=>{
        gsap.to(text.rotation,{duration:1,y:text.rotation.y+Math.PI*2})
    }
}

// Get Canvas DOM
const canvas = document.querySelector('.webgl-canvas')

// Scene
const scene = new THREE.Scene()

// Geometry
const mat = new THREE.MeshStandardMaterial()
mat.metalness = 0.45
mat.roughness = 0.45
const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(1,1,1),mat)
cube.visible = false
scene.add(cube);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff,0.5)
const pointLight = new THREE.PointLight(0xffffff,0.5)
pointLight.x = 2
pointLight.y = 3
pointLight.z = 4
// scene.add(ambientLight, pointLight)

// Camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
camera.position.z=5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

// Textures
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')

// Axis helper
const axesHelper =  new THREE.AxesHelper(5);
axesHelper.visible = false
scene.add(axesHelper)

// gui tweeks
gui.add(axesHelper,'visible').name("Axes Helper Visible") // boolean/checkbox
gui.add(parameters,'spin').name('Spin Cube')
gui.add(mat ,'metalness').min(0).max(1).step(0.01).name('metalness')
gui.add(mat ,'roughness').min(0).max(1).step(0.01).name('roughness')

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
})
// resize renderer
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

const clock = new THREE.Clock()
const tick = ()=>{
    const elaspedTime = clock.getElapsedTime()
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
}
tick()
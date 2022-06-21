import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { TextureLoader } from 'three'

// Materials, Lights, environment maps
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
const cubeTextureLoader = new THREE.CubeTextureLoader();

const colorDoorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaDoorTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightDoorTexture = textureLoader.load('/textures/door/height.jpg')
const normalDoorTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionDoorTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessDoorTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessDoorTexture = textureLoader.load('/textures/door/roughness.jpg')

const matcap1Texture = textureLoader.load('/textures/matcaps/7.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// colorTexture.rotation= Math.PI*0.25
// colorTexture.center.x=0.5
// colorTexture.center.y=0.5

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.jpg',
    '/textures/environmentMaps/1/nx.jpg',
    '/textures/environmentMaps/1/py.jpg',
    '/textures/environmentMaps/1/ny.jpg',
    '/textures/environmentMaps/1/pz.jpg',
    '/textures/environmentMaps/1/nz.jpg',
])

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

// const mat = new THREE.MeshBasicMaterial({map:colorTexture})
// const mat = new THREE.MeshBasicMaterial()
// mat.map = colorDoorTexture
// mat.transparent=true
// mat.alphaMap = alphaDoorTexture
// mat.side = THREE.DoubleSide

// const mat = new THREE.MeshNormalMaterial()
// mat.flatShading = true

// const mat = new THREE.MeshMatcapMaterial()
// mat.matcap = matcap1Texture

// const mat = new THREE.MeshDepthMaterial()

// const mat = new THREE.MeshLambertMaterial()

// const mat = new THREE.MeshPhongMaterial()
// mat.shininess = 150
// mat.specular = new THREE.Color(0x1232ff)

// const mat = new THREE.MeshToonMaterial()
// mat.gradientMap = gradientTexture
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter

const mat = new THREE.MeshStandardMaterial()
mat.metalness = 0.45
mat.roughness = 0.45
mat.envMap=environmentMapTexture

// const mat = new THREE.MeshStandardMaterial()
// mat.metalness = 0.45
// mat.roughness = 0.45
// mat.transparent = true
// mat.map = colorDoorTexture
// mat.aoMap = ambientOcclusionDoorTexture
// mat.displacementMap = heightDoorTexture
// mat.displacementScale = 0.05
// mat.metalnessMap = metalnessDoorTexture
// mat.roughnessMap = roughnessDoorTexture
// mat.normalMap = normalDoorTexture
// mat.alphaMap = alphaDoorTexture

const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5,64,64),mat)
const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1,100,100),mat)
plane.geometry.setAttribute('uv2',new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2))
const torus = new THREE.Mesh(new THREE.TorusBufferGeometry(0.3,0.2,64,128),mat)
scene.add(sphere,plane, torus);

sphere.position.x = - 2
torus.position.x = 2

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff,0.5)
const pointLight = new THREE.PointLight(0xffffff,0.5)
pointLight.x = 2
pointLight.y = 3
pointLight.z = 4
scene.add(ambientLight, pointLight)

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
// gui.add(sphere.position, 'x' ) // brings text
// gui.add(sphere.position, 'y' ,-3,3,0.01) // brings range
// gui.add(sphere.position, 'z').min(-3).max(3).step(0.01).name('zoom')  // brings range with name
// gui.add(sphere,'visible').name("Mesh Visible") // boolean/checkbox
// gui.add(axesHelper,'visible').name("Axes Helper Visible") // boolean/checkbox
// gui.addColor(parameters,'color').onChange(()=>{mat.color.set(parameters.color)}) // colour
// gui.add(parameters,'spin')
gui.add(mat ,'metalness').min(0).max(1).step(0.01).name('metalness')
gui.add(mat ,'roughness').min(0).max(1).step(0.01).name('roughness')
gui.add(mat ,'aoMapIntensity').min(0).max(5).step(0.01).name('aoMapIntensity')
gui.add(mat ,'displacementScale').min(0).max(5).step(0.01).name('displacementScale')

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
    sphere.rotation.x = 0.1 * elaspedTime
    plane.rotation.x = 0.1 * elaspedTime
    torus.rotation.x = 0.1 * elaspedTime
    sphere.rotation.y = 0.15  * elaspedTime
    plane.rotation.y = 0.15  * elaspedTime
    torus.rotation.y = 0.15  * elaspedTime
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
    
}
tick()
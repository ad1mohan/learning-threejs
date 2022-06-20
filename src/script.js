import * as THREE from 'three'
import './style.css'


const sizes = {
    width:800, 
    height:600
}

// Get Canvas DOM
const canvas = document.querySelector('.webgl-canvas')

// Scene
const scene = new THREE.Scene()

// Grometry (x, y, z) Mesh Material
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color:0xff0000})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

// Camera = PerspectiveCamera(Field_of_view, screen_width/height)
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
camera.position.z=3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
})
// resize renderer
renderer.setSize(sizes.width,sizes.height)

// makes the camera zoomed in
renderer.render(scene,camera)

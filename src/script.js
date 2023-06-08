import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'


/**
 * Base
 */


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)


/**
 * Materials
 */

const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x77B5FE })
const neonMaterial = new THREE.MeshBasicMaterial({ color: 0x7F00FF })
const lightSphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const studOrangeMaterial = new THREE.MeshBasicMaterial({ color: 0xff7f00})
const studWhiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff})

const drawerMaterials = [];

for (let i = 1; i <= 6; i++) {
    const texture = textureLoader.load(`images/k7-${i}.jpg`);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    texture.rotation = Math.PI / 2;
    texture.offset.set(0, 0.5);

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide,
        transparent: true
    });

    drawerMaterials.push(material);
}


const bakedTexture = textureLoader.load('bakedhome2.jpg')
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ map : bakedTexture })

bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

const video = document.getElementById('video');
video.addEventListener('canplaythrough', () => {
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });

    const tvGeo = new THREE.BoxGeometry(1.6, 0.0432,0.879)
    const tv = new THREE.Mesh(tvGeo, videoMaterial)
    tv.position.set(0.002222, 1.073, -3.5283)
    tv.rotateX(Math.PI/2)
    scene.add(tv)
});


const bigAsusTexture = textureLoader.load('images/fondDecran.png')

const bigAsusMaterial = new THREE.MeshBasicMaterial({map: bigAsusTexture })
const bigAsusGeometry = new THREE.BoxGeometry(0.875, 0.397, 0.0233  )
const bigAsusScreen = new THREE.Mesh(bigAsusGeometry, bigAsusMaterial)
bigAsusScreen.position.set(1.4876,1.1579,1.244)
bigAsusScreen.rotateX(-0.0103)
bigAsusScreen.rotateY(THREE.MathUtils.degToRad(-32))
bigAsusScreen.rotateZ(0)
scene.add(bigAsusScreen)

const littleAsusTexture = textureLoader.load('images/google.png')

const littleAsusMaterial = new THREE.MeshBasicMaterial({map: littleAsusTexture })
const littleAsusGeometry = new THREE.BoxGeometry(0.241, 0.43, 0.0115  )
const littleAsusScreen = new THREE.Mesh(littleAsusGeometry, littleAsusMaterial)
littleAsusScreen.position.set(1.9618,1.0695,1.8118)
littleAsusScreen.rotateY(THREE.MathUtils.degToRad(90))
littleAsusScreen.rotateX(THREE.MathUtils.degToRad(17.4))
scene.add(littleAsusScreen)


gltfLoader.load(
    'home2.glb',
    (gltf) =>
    {

        gltf.scene.traverse((child) =>
        {
            child.material = bakedMaterial
        })
        scene.add(gltf.scene)

        // Get each object
        const lightSphereMesh = gltf.scene.children.find((child) => child.name === 'lightSphere')
        const extNeonLMesh = gltf.scene.children.find((child) => child.name === 'extNeonL')
        const extNeonRMesh = gltf.scene.children.find((child) => child.name === 'extNeonR')
        const inNeonMesh = gltf.scene.children.find((child) => child.name === 'inNeon')
        const drawerLBMesh = gltf.scene.children.find((child) => child.name === 'drawerLB')
        const drawerRBMesh = gltf.scene.children.find((child) => child.name === 'drawerRB')
        const drawerLTMesh = gltf.scene.children.find((child) => child.name === 'drawerLT')
        const drawerRMMesh = gltf.scene.children.find((child) => child.name === 'drawerRM')
        const drawerRTMesh = gltf.scene.children.find((child) => child.name === 'drawerRT')
        const drawerLMMesh = gltf.scene.children.find((child) => child.name === 'drawerLM')
        const stud1Mesh = gltf.scene.children.find((child) => child.name === 'stud1')
        const stud2Mesh = gltf.scene.children.find((child) => child.name === 'stud2')
        const stud3Mesh = gltf.scene.children.find((child) => child.name === 'stud3')
        const stud4Mesh = gltf.scene.children.find((child) => child.name === 'stud4')
        const stud5Mesh = gltf.scene.children.find((child) => child.name === 'stud5')
        const stud6Mesh = gltf.scene.children.find((child) => child.name === 'stud6')
        const stud7Mesh = gltf.scene.children.find((child) => child.name === 'stud7')
        const fanMesh = gltf.scene.children.find((child) => child.name === 'fan')

        extNeonLMesh.material = neonMaterial
        extNeonRMesh.material = neonMaterial
        inNeonMesh.material = neonMaterial
        lightSphereMesh.material = lightSphereMaterial
        drawerLBMesh.material = drawerMaterials[5]
        drawerRBMesh.material= drawerMaterials[4]
        drawerRTMesh.material= drawerMaterials[2]
        drawerLTMesh.material= drawerMaterials[3]
        drawerRMMesh.material= drawerMaterials[0]
        drawerLMMesh.material= drawerMaterials[1]
        stud1Mesh.material = studOrangeMaterial
        stud2Mesh.material = studOrangeMaterial
        stud3Mesh.material = studOrangeMaterial
        stud4Mesh.material = studOrangeMaterial
        stud5Mesh.material = studOrangeMaterial
        stud6Mesh.material = studWhiteMaterial
        stud7Mesh.material = studWhiteMaterial
        fanMesh.material = neonMaterial
    }
)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -7
camera.position.y = 4
camera.position.z = 7

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)


}

tick()
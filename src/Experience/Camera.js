import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


import Experience from './Experience'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        // this.setControl()

        // this.setDebug()

    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000)
        this.instance.position.set(
            0,
            -0.1,
            4.2
        )
        this.instance.rotation.set(
            0,
            0,
            0
        )
        this.scene.add(this.instance)

        this.target = new THREE.Vector3(0, 0, 0)
        this.instance.lookAt(this.target)

    }

    setControl()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        // Limit vertical rotation (polar angle)
        this.controls.minPolarAngle = 0
        this.controls.maxPolarAngle = Math.PI / 2.1 // already set

        // Limit horizontal rotation (azimuth angle)
        this.controls.minAzimuthAngle = -Math.PI / 4 // left limit
        this.controls.maxAzimuthAngle = Math.PI / 4  // right limit
        this.controls.minDistance = 3
        this.controls.maxDistance = 7
        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: null //THREE.MOUSE.PAN
        }
    }

    setDebug()
    {
        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.ui.add(this.instance.position, 'x', -50, 50, 0.01).name('camera.position.x')
            this.debug.ui.add(this.instance.position, 'y', -50, 50, 0.01).name('camera.position.y')
            this.debug.ui.add(this.instance.position, 'z', -50, 50, 0.01).name('camera.position.z')
            this.debug.ui.add(this.instance.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.01).name('camera.rotation.x')
            this.debug.ui.add(this.instance.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.01).name('camera.rotation.y')
            this.debug.ui.add(this.instance.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.01).name('camera.rotation.z')
        }
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        // this.controls.update()
        // console.log(
        //     this.instance.position,
        //     this.instance.rotation
        // );
    }
}
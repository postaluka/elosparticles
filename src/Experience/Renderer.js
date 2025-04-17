import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'


import Experience from "./Experience";

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()

        this.setComposer()

    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
        })
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRation, 2))

        this.instance.shadowMap.enabled = true

    }

    setComposer()
    {
        this.composer = new EffectComposer(this.instance)
        this.composer.addPass(new RenderPass(this.scene, this.camera.instance))



    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRation, 2))
    }

    update()
    {
        // this.instance.render(this.scene, this.camera.instance)
        this.composer.render()

    }
}
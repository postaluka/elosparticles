import * as THREE from "three"

import Experience from "../../Experience"
import Animation from "../../Utils/Animation"

export default class SpherePyramid
{
    constructor()
    {
        this.PARAMS = {
            scroll: 0,
            visible: false
        }

        this.experience = new Experience()
        this.time = this.experience.time
        this.animation = new Animation()

        this.materials = this.experience.materials

        this.gltfLoader = this.experience.loaders.gltfLoader

        this.instance = new THREE.Group()
        this.instance.scale.set(0, 0, 0)

        /**
         * Animation
         */
        this.mixer = null
        this.action = null

        this.loadModel()

        // this.debug()

    }

    loadModel()
    {
        this.gltfLoader.load(
            '/models/draco/mograph_05_spheres_bake.gltf',
            (gltf) =>
            {
                gltf.scene.traverse((child) =>
                {
                    if (child.isMesh)
                    {
                        child.material = this.materials.basic
                        child.material.needsUpdate = true
                    }
                })

                this.instance.add(gltf.scene)

                this.mixer = new THREE.AnimationMixer(gltf.scene)
                this.action = this.mixer.clipAction(gltf.animations[0])
                this.action.play()
                this.action.clampWhenFinished = true //to play once
                // this.action.loop = THREE.LoopPingPong




            }
        )
    }

    update(scroll)
    {
        // console.log('spherePyramid update');

        // if (this.mixer)
        // {
        //     this.mixer.update(this.time.delta * 0.0005)
        // }

        if (this.mixer && this.action)
        {
            this.duration = this.action.getClip().duration
            // console.log(this.duration);
            this.mixer.setTime(scroll * 2 * this.duration)

        }

    }

    debug()
    {

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.ui.add(this.PARAMS, 'scroll').min(0).max(0.99).step(0.00001).name('step02 scroll').onChange((value) =>
            {
                // console.log(value);

            })

            this.debug.ui.add(this.PARAMS, 'visible').name('show step02').onChange((value) =>
            {
                if (value) this.instance.scale.set(1, 1, 1)
                if (!value) this.instance.scale.set(0, 0, 0)
            })
        }
    }
}

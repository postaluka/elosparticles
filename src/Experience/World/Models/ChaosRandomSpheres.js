import * as THREE from "three"

import Experience from "../../Experience"
import Animation from "../../Utils/Animation"

export default class ChaosRandomSphere
{
    constructor()
    {

        this.experience = new Experience()
        this.time = this.experience.time
        this.animation = new Animation()

        this.materials = this.experience.materials

        this.gltfLoader = this.experience.loaders.gltfLoader

        this.instance = new THREE.Group()

        /**
         * Animation
         */
        this.mixer = null
        this.action = null
        this.duration = null

        this.loadModel()


        // this.debug()

    }

    loadModel()
    {

        this.gltfLoader.load(
            '/models/draco/chaotic_random_05_spheres_bake.gltf',
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


                // console.log(gltf);
                this.instance.add(gltf.scene)

                this.instance.rotation.x = Math.PI / 2


                this.mixer = new THREE.AnimationMixer(gltf.scene)
                this.action = this.mixer.clipAction(gltf.animations[0])

                this.action.play()
                this.action.paused = true
                this.action.setLoop(THREE.LoopOnce)
                this.action.clampWhenFinished = true
                this.action.time = 0

                // ОНОВЛЮЄМО СТАН МЕШІВ НА 0-Й СЕКУНДІ
                this.mixer.update(0)

                this.duration = this.action.getClip().duration

            }
        )
    }

    play()
    {
        this.action.reset()
        this.action.paused = false
        this.action.timeScale = 1 // прямий напрям
        this.action.setLoop(THREE.LoopOnce)
        this.action.clampWhenFinished = true
        this.action.time = 0

        this.action.play()
    }

    reverse()
    {
        this.action.reset()
        this.action.paused = false
        this.action.setLoop(THREE.LoopOnce)
        this.action.clampWhenFinished = true
        this.action.timeScale = -1 // реверс

        // встановити анімацію на останній кадр перед відворотом
        this.action.time = this.action.getClip().duration

        this.action.play()
    }

    update(scroll)
    {


        if (this.mixer && this.action)
        {
            // this.scrollUpdate(scroll)

            this.mixer.update(this.time.delta * 0.0015)

        }

    }

}
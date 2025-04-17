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
                this.action.clampWhenFinished = true //to play once
                // this.action.loop = THREE.LoopPingPong

            }
        )
    }

    update(scroll)
    {

        if (this.mixer && this.action)
        {
            this.duration = this.action.getClip().duration


            // Нормалізуємо скрол до прогресу анімації
            const t = scroll * 1.9 // наприклад, анімація з 0 до 0.5 скролу

            if (t <= 0)
            {
                this.mixer.setTime(0.01)
            }

            else if (t >= 1)
            {

                this.mixer.setTime(this.duration - 0.001)

            }
            else
            {
                this.mixer.setTime(t * this.duration)

            }

        }

    }

}
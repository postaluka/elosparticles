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


        /**
         * Animation
         */
        this.mixer = null
        this.action = null
        this.finished = false

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

                        // console.log(child.scale);
                        // child.scale.set(2, 2, 2)

                    }
                })

                this.instance.add(gltf.scene)

                this.mixer = new THREE.AnimationMixer(gltf.scene)
                this.action = this.mixer.clipAction(gltf.animations[0])
                this.action.play()
                // this.action.clampWhenFinished = true //to play once
                // this.action.loop = THREE.LoopPingPong




            }
        )
    }

    updateDepthSize()
    {
        const tempVec = new THREE.Vector3()

        if (this.instance)
        {
            this.instance.traverse((child) =>
            {
                if (child.isMesh)
                {
                    child.getWorldPosition(tempVec)

                    const distanceZ = tempVec.z

                    // 1 + distanceZ * 0.2 – скейл фактор, 0.2 – мінімум (шоб не 0), 5 – максімум, щоб не огромні
                    const scaleFactor = THREE.MathUtils.clamp(1 + distanceZ * 0.9, 0.7, 1.4)

                    child.scale.setScalar(scaleFactor)

                }

            })
        }
    }

    update(scroll)
    {

        if (this.mixer && this.action)
        {
            this.duration = this.action.getClip().duration


            // Нормалізуємо скрол до прогресу анімації
            const t = scroll * 1.85 // наприклад, анімація з 0 до 0.5 скролу

            if (t < 1)
            {
                this.mixer.setTime(this.duration)
                this.finished = true // фіксуємо останній кадр
            }
            else if (t >= 1.85)
            {
                this.mixer.setTime(this.duration - 0.1)
                this.finished = true // фіксуємо останній кадр
            }
            else
            {
                this.mixer.setTime(t * this.duration)
            }
        }

        this.updateDepthSize()

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

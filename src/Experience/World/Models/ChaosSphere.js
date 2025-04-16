import * as THREE from "three"

import Experience from "../../Experience"
import Animation from "../../Utils/Animation"

export default class ChaosSphere
{
    constructor()
    {
        this.PARAMS = {
            scroll: 0,
            visible: true
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
            '/models/draco/chaotic_main_05_spheres_bake_v02.gltf',
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


                gltf.scene.rotation.y = - Math.PI / 2 //source file isn't correct, so needs to be rotated

                this.instance.add(gltf.scene)


                this.instance.rotation.x = Math.PI / 2


                this.mixer = new THREE.AnimationMixer(gltf.scene)
                this.action = this.mixer.clipAction(gltf.animations[0])
                // console.log(this.action);

                this.action.play()
                // this.action.clampWhenFinished = true //to play once


            }
        )
    }

    updateDepthSize(scroll)
    {
        // temp world position of a particle
        const tempVec = new THREE.Vector3()

        // Нормалізуємо scroll до діапазону 0 → 1
        const t = THREE.MathUtils.clamp(scroll, 0, 1)


        // maxScale плавно змінюється від 0.5 до 1.15
        const minScale = THREE.MathUtils.lerp(0.5, 1.25, t)
        const maxScale = THREE.MathUtils.lerp(0.0, 2.5, t)

        if (this.instance)
        {
            this.instance.traverse((child) =>
            {
                if (child.isMesh)
                {
                    child.getWorldPosition(tempVec)

                    const distanceZ = tempVec.z

                    // 1 + distanceZ * 0.2 – скейл фактор, 0.2 – мінімум (шоб не 0), 5 – максімум, щоб не огромні
                    const scaleFactor = THREE.MathUtils.clamp(1 + distanceZ * 0.9, minScale, maxScale)

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
            const t = scroll * 1.9 // наприклад, анімація з 0 до 0.5 скролу
            if (t <= 0)
            {
                this.mixer.setTime(0.01)
            }

            if (t >= 1)
            {

                this.mixer.setTime(this.duration - 0.001)
                this.finished = true // фіксуємо останній кадр
            }
            else
            {
                this.mixer.setTime(t * this.duration)
            }

        }

        this.updateDepthSize(scroll)

    }

    debug()
    {

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.ui.add(this.PARAMS, 'scroll').min(0).max(0.99).step(0.00001).name('step01 scroll').onChange((value) =>
            {

            })

            this.debug.ui.add(this.PARAMS, 'visible').name('show step01').onChange((value) =>
            {
                if (value) this.instance.scale.set(1, 1, 1)
                if (!value) this.instance.scale.set(0, 0, 0)
            })
        }
    }
}

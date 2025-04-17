import * as THREE from "three"

import Experience from "../../Experience"
import Animation from "../../Utils/Animation"

export default class ChaosSphere
{
    constructor()
    {
        this.PARAMS = {
            minScale: 0.5,
            maxScale: 0.0
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
        this.duration = null


        this.loadModel()



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

                this.duration = this.action.getClip().duration


            }
        )
    }



    updateDepthSize(scroll)
    {
        // temp world position of a particle
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
                    const scaleFactor = THREE.MathUtils.clamp(1 + distanceZ * 0.9, 0.7, 1.25)

                    child.scale.setScalar(scaleFactor)

                }

            })
        }
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

        this.updateDepthSize(scroll)

    }

}





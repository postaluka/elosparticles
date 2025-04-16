import * as THREE from 'three'

import Experience from "../Experience.js";

import Lights from './Lights.js';

import Cube from './Models/Cube';
import SpherePyramid from './Models/SpherePyramid.js';
import ChaosSphere from './Models/ChaosSphere.js';
import ChaosRandomSphere from './Models/ChaosRandomSpheres.js';
import Plane from './Models/Plane.js';



export default class World
{
    constructor()
    {

        this.PARAMS = {
            scroll: 0,
            visibleStep01: true,
            rotationSpeed: 0.001
        }

        this.scrollY = null
        this.docHeight = null

        window.addEventListener('scroll', () =>
        {
            this.scrollTop = window.scrollY
            this.docHeight = document.body.scrollHeight - window.innerHeight

            // Нормалізований скрол від 0 до 1
            this.scroll = this.scrollTop / this.docHeight


            this.PARAMS.scroll = this.scroll
        })


        this.experience = new Experience()
        this.sizes = this.experience.sizes


        this.scene = this.experience.scene

        this.lights = new Lights()

        this.parallaxGroup = new THREE.Group()

        this.rotationGroup = new THREE.Group()
        this.parallaxGroup.add(this.rotationGroup)

        this.cube = new Cube()

        this.chaosSphere = new ChaosSphere()
        this.chaosRandomSphere = new ChaosRandomSphere()
        this.spherePyramid = new SpherePyramid()
        // this.spherePyramid.instance.scale.set(0, 0, 0)

        this.plane = new Plane()
        this.plane.instance.position.y = -3.25


        this.rotationGroup.add(
            this.spherePyramid.instance,
            this.chaosSphere.instance,
            this.chaosRandomSphere.instance
        )

        this.rotationGroup.rotation.x = - Math.PI / 2

        // Add models
        this.scene.add(
            this.parallaxGroup,
            // this.plane.instance
        )


        this.debug()

        this.cursor = {}
        this.cursor.x = 0
        this.cursor.y = 0
        window.addEventListener('mousemove', (event) =>
        {
            this.cursor.x = event.clientX / this.sizes.width - 0.5
            this.cursor.y = event.clientY / this.sizes.height - 0.5

        })

    }


    update()
    {
        // PARALLAX
        this.parallaxGroup.rotation.y = this.cursor.x * 0.1
        this.parallaxGroup.rotation.x = this.cursor.y * 0.1

        this.parallaxGroup.position.x = this.cursor.x * 0.1
        this.parallaxGroup.position.y = -this.cursor.y * 0.1

        // console.log('world update');
        this.chaosSphere.update(this.PARAMS.scroll)
        this.chaosRandomSphere.update(this.PARAMS.scroll)
        this.spherePyramid.update(this.PARAMS.scroll)

        this.rotationGroup.rotation.y += this.PARAMS.rotationSpeed

        this.scrollUpdate(this.PARAMS.scroll)

    }

    scrollUpdate(value)
    {

        // t between 0.1 and 0.3
        const t = THREE.MathUtils.clamp((value - 0.1) / (0.3 - 0.1), 0, 1)

        const rotationX = THREE.MathUtils.lerp(-Math.PI / 2, 0, t)
        this.rotationGroup.rotation.x = rotationX

        const rotationSpeed = THREE.MathUtils.lerp(0.001, 0.0025, 0, t)
        this.PARAMS.rotationSpeed = rotationSpeed


        if (value < 0.50)
        {
            this.chaosSphere.instance.scale.set(1, 1, 1)
            this.chaosRandomSphere.instance.scale.set(1, 1, 1)

            this.spherePyramid.instance.scale.set(0, 0, 0)
        }
        if (value >= 0.50)
        {
            this.chaosSphere.instance.scale.set(0, 0, 0)
            this.chaosRandomSphere.instance.scale.set(0, 0, 0)

            this.spherePyramid.instance.scale.set(1, 1, 1)
        }

    }

    debug()
    {

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {


            this.debug.ui.add(this.PARAMS, 'scroll').min(0).max(0.99).step(0.00001).name('WORLD step01 scroll').onChange((value) =>
            {
                // t between 0.1 and 0.3
                const t = THREE.MathUtils.clamp((value - 0.1) / (0.3 - 0.1), 0, 1)

                const rotationX = THREE.MathUtils.lerp(-Math.PI / 2, 0, t)
                this.rotationGroup.rotation.x = rotationX

                const rotationSpeed = THREE.MathUtils.lerp(0.001, 0.0025, 0, t)
                this.PARAMS.rotationSpeed = rotationSpeed

                // this.plane.instance.position.y = -3.25 + value * 6.5
                const eased = THREE.MathUtils.smoothstep(value, 0, 1)
                this.plane.instance.position.y = THREE.MathUtils.lerp(-3.25, 3.25, eased)



                if (value < 0.50)
                {
                    this.chaosSphere.instance.scale.set(1, 1, 1)
                    this.chaosRandomSphere.instance.scale.set(1, 1, 1)

                    this.spherePyramid.instance.scale.set(0, 0, 0)
                }
                if (value >= 0.50)
                {
                    this.chaosSphere.instance.scale.set(0, 0, 0)
                    this.chaosRandomSphere.instance.scale.set(0, 0, 0)

                    this.spherePyramid.instance.scale.set(1, 1, 1)
                }

            })


        }
    }

}



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

        this.experience = new Experience()


        this.scene = this.experience.scene

        this.lights = new Lights()

        this.rotationGroup = new THREE.Group()

        this.cube = new Cube()

        this.chaosSphere = new ChaosSphere()
        this.chaosRandomSphere = new ChaosRandomSphere()
        this.spherePyramid = new SpherePyramid()

        this.plane = new Plane()
        this.plane.instance.position.y = -3.25




        this.rotationGroup.add(
            this.spherePyramid.instance,
            this.chaosSphere.instance,
            this.chaosRandomSphere.instance
        )

        this.rotationGroup.rotation.x = - Math.PI / 2


        this.test = null //delete after next iteration


        // Add models
        this.scene.add(
            this.rotationGroup,
            this.plane.instance
        )

        this.check()
        this.debug()



    }

    check() 
    {
        console.log('yo');

    }

    update()
    {
        // console.log('world update');
        this.chaosSphere.update(this.PARAMS.scroll)
        this.chaosRandomSphere.update(this.PARAMS.scroll)

        this.spherePyramid.update(this.PARAMS.scroll)

        this.rotationGroup.rotation.y += this.PARAMS.rotationSpeed

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


function easeInOutCubic(t)
{
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2
}
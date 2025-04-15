import * as THREE from 'three'

import Experience from "../Experience.js";

import Lights from './Lights.js';

import Cube from './Models/Cube';
import SpherePyramid from './Models/SpherePyramid.js';
import ChaosSphere from './Models/ChaosSphere.js';


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.lights = new Lights()

        this.rotationGroup = new THREE.Group()

        this.cube = new Cube()

        this.chaosSphere = new ChaosSphere()
        this.spherePyramid = new SpherePyramid()

        this.chaosSphere.instance.position.z += 0.25
        this.spherePyramid.instance.position.z += 0.25


        this.rotationGroup.add(
            this.spherePyramid.instance,

            // this.cube.instance,
            this.chaosSphere.instance
        )

        this.test = null //delete after next iteration


        // Add models
        this.scene.add(
            this.rotationGroup
        )


    }

    update()
    {
        // console.log('world update');
        this.chaosSphere.update()
        this.spherePyramid.update()

        this.rotationGroup.rotation.y += 0.0025

    }
}
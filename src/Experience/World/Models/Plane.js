import * as THREE from "three"

import Experience from "../../Experience"



export default class Plane
{
    constructor()
    {

        this.experience = new Experience()

        this.materials = this.experience.materials



        // Parameters
        this.side = 1

        this.instance = new THREE.Group()

        this.scaleCorrection = 262

        this.width = 1440 / this.scaleCorrection
        this.height = 2530 / this.scaleCorrection

        // Set cube
        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(this.width, this.height),
            this.materials.plane
        )
        this.plane.rotation.x = Math.PI
        this.plane.position.y = 0
        this.instance.add(this.plane)


        // Coordinates
        // this.instance.position.y += this.side / 2

        // this.debug()

    }

    debug()
    {

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.ui.add(this.instance.position, 'x', -10, 10, 0.01).name('position.x')
        }
    }
}

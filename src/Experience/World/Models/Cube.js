import * as THREE from "three"

import Experience from "../../Experience"



export default class Cube
{
    constructor()
    {

        this.experience = new Experience()

        this.materials = this.experience.materials

        // Parameters
        this.side = 1

        // Set cube
        this.instance = new THREE.Mesh(
            new THREE.BoxGeometry(this.side, this.side, this.side),
            this.materials.basic
        )
        this.instance.receiveShadow = true
        this.instance.castShadow = true

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

import * as THREE from 'three'

import Textures from './Texture'
import { color } from 'canvas-sketch-util'

export default class Materials
{
    constructor()
    {
        this.textures = new Textures()

        this.basic = new THREE.MeshBasicMaterial({
            color: 'white',
            wireframe: false
        })


        // console.log('materials check');




    }
}
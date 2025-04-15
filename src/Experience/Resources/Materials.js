import * as THREE from 'three'

import Textures from './Texture'


export default class Materials
{
    constructor()
    {
        this.textures = new Textures()

        this.basic = new THREE.MeshBasicMaterial({
            color: 'black',
            wireframe: false
        })

        this.plane = new THREE.MeshBasicMaterial({
            map: this.textures.web,
            // color: 'red',
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide
        })


        // console.log('materials check');




    }
}
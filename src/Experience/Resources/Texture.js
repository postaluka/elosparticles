import * as THREE from 'three'

// import Loaders from '../Utils/Loaders'
import Experience from '../Experience'

export default class Textures
{
    constructor()
    {
        this.experience = new Experience()

        this.loader = this.experience.loaders.textures

        this.web = this.loader.load(
            '/png/webAlpha.png'
        )
        this.web.flipY = false




    }
}
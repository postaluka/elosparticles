import * as THREE from 'three'
import { gsap } from "gsap";
import { CustomEase } from 'gsap/CustomEase';

import Experience from "../Experience.js";

import Lights from './Lights.js';

import Cube from './Models/Cube';
import SpherePyramid from './Models/SpherePyramid.js';
import ChaosSphere from './Models/ChaosSphere.js';
import ChaosRandomSphere from './Models/ChaosRandomSpheres.js';
import Plane from './Models/Plane.js';

import lenis from '../Utils/SmoothScroll.js';



export default class World
{
    constructor()
    {
        gsap.registerPlugin(CustomEase)

        this.PARAMS = {
            scroll: 0,
            visibleStep01: true,
            rotationSpeed: 0.001
        }

        this.scrollY = null
        this.docHeight = null
        this.prevScroll = 0 // for scroll direction


        // Надсилаємо нормалізований scroll у world
        lenis.on('scroll', ({ scroll }) =>
        {
            // console.log('lenis scroll:', scroll);

            const scrollY = scroll
            const scrollHeight = document.body.scrollHeight - window.innerHeight
            const normalized = scrollY / scrollHeight

            this.PARAMS.scroll = normalized
        })


        // window.addEventListener('scroll', () =>
        // {
        //     this.scrollTop = window.scrollY
        //     this.docHeight = document.body.scrollHeight - window.innerHeight

        //     // Нормалізований скрол від 0 до 1
        //     this.scroll = this.scrollTop / this.docHeight


        //     this.PARAMS.scroll = this.scroll
        // })


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
        )

        this.setCursor()


    }

    setCursor() 
    {
        this.cursor = {}
        this.cursor.x = 0
        this.cursor.y = 0
        window.addEventListener('mousemove', (event) =>
        {
            this.cursor.x = event.clientX / this.sizes.width - 0.5
            this.cursor.y = event.clientY / this.sizes.height - 0.5

        })
    }

    setParallax()
    {
        // PARALLAX
        this.parallaxGroup.rotation.y = this.cursor.x * 0.1
        this.parallaxGroup.rotation.x = this.cursor.y * 0.1

        this.parallaxGroup.position.x = this.cursor.x * 0.1
        this.parallaxGroup.position.y = -this.cursor.y * 0.1
    }

    rotationGroupPlayX()
    {
        gsap.fromTo(
            this.rotationGroup.rotation,
            { x: -Math.PI / 2 },
            { x: 0, duration: this.chaosSphere.duration * 0.6, ease: 'sine' }
        )
    }

    rotationGroupReverseX()
    {
        gsap.fromTo(
            this.rotationGroup.rotation,
            { x: 0 },
            {
                x: -Math.PI / 2,
                duration: this.chaosSphere.duration * 0.8,
                ease: CustomEase.create("custom", "M0,0 C0.51,0 0.504,1.03 1,1 "),
            }
        )
    }

    updateParticles(scroll) 
    {
        this.chaosSphere.update(scroll)
        this.chaosRandomSphere.update(scroll)
        this.spherePyramid.update(scroll)
    }

    scrollDirection(value)
    {
        const step01enterForward = 0.15
        const step01enterBackward = 0.4

        const step02enterForward = 0.65
        const step02enterBackward = 0.95

        // Step 01 FORWARD (up to middle)
        if (this.prevScroll < step01enterForward && value >= step01enterForward)
        {
            console.log('step01 forward')
            this.chaosSphere.play()
            this.chaosRandomSphere.play()
            this.rotationGroupPlayX()
        }

        // Step 01 BACKWARD (up from middle)
        else if (this.prevScroll > step01enterBackward && value <= step01enterBackward)
        {
            console.log('step01 backward')
            this.chaosSphere.reverse()
            this.chaosRandomSphere.reverse()
            this.rotationGroupReverseX()
        }

        // Step 02 FORWARD (to end)
        else if (this.prevScroll < step02enterForward && value >= step02enterForward)
        {
            console.log('step02 forward')
            this.spherePyramid.play()
        }

        // Step 02 BACKWARD (from end)
        else if (this.prevScroll > step02enterBackward && value <= step02enterBackward)
        {
            console.log('step02 backward')
            this.spherePyramid.reverse()
        }

        this.prevScroll = value
    }


    scrollUpdate(value)
    {

        this.scrollDirection(value)

        // t between 0.1 and 0.3
        const t = THREE.MathUtils.clamp((value - 0.1) / (0.3 - 0.1), 0, 1)

        const rotationSpeed = THREE.MathUtils.lerp(0.0005, 0.002, t)
        this.PARAMS.rotationSpeed = rotationSpeed


        if (value < 0.50)
        {
            this.chaosSphere.instance.scale.set(1, 1, 1)
            this.chaosRandomSphere.instance.scale.set(1, 1, 1)

            this.spherePyramid.instance.scale.set(0, 0, 0)
        }

        if (value >= 0.50 && this.chaosSphere.action.time === this.chaosSphere.duration)
        {
            this.chaosSphere.instance.scale.set(0, 0, 0)
            this.chaosRandomSphere.instance.scale.set(0, 0, 0)

            this.spherePyramid.instance.scale.set(1, 1, 1)
        }


    }

    update()
    {

        this.setParallax()
        this.updateParticles(this.PARAMS.scroll)

        // console.log('world update');

        this.rotationGroup.rotation.y += this.PARAMS.rotationSpeed

        this.scrollUpdate(this.PARAMS.scroll)



    }




}



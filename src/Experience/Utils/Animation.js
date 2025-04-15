import * as THREE from 'three'

export default class Animation
{
    constructor()
    {

    }

    play(action, speed)
    {
        action.reset()
        action.timeScale = speed
        action.play()

        // Set up event listener for the finished event
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
    }

    reverse(action, speed)
    {

        action.reset()
        if (action.time === 0)
        {
            action.time = action.getClip().duration
        }
        action.paused = false
        action.setLoop(THREE.LoopOnce)
        action.timeScale = -speed
        action.play()

    }
}
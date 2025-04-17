import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
    smooth: true,
    lerp: 0.1,
    wheelMultiplier: 0.5
})

function raf(time)
{
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

export default lenis
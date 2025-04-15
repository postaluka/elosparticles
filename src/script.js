
import Experience from './Experience/Experience'


const model = function ()
{
  /**
  * Canvas
  */
  const canvas = document.querySelector('canvas.webgl')

  /**
  * Experience
  */
  const experience = new Experience(canvas)

}

export default model;

// 



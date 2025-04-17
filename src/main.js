// This is main file where we're going to import all the modules and run the model and other functions

import './styles/style.css';
import model from './script.js'

// delete before Bulhakov
window.addEventListener('load', () =>
{
    setTimeout(() =>
    {
        window.scrollTo(0, 0)
    }, 100) // або більше, якщо потрібно
})

model()




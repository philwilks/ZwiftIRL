import { preloadImages } from './helpers'

import featherUrl from './images/feather.png';
import aeroUrl from './images/aero.png';
import sunUrl from './images/sun.png';
import coffeeUrl from './images/coffee.png';
import tailwindUrl from './images/tailwind.png';
import mudUrl from './images/mud.png';

const uiImageUrls = [featherUrl, aeroUrl, sunUrl, coffeeUrl, tailwindUrl, mudUrl]
const uiImageArray = []
const names = ['Feather', 'Aero Boost', 'Vitamin D', 'Coffee Stop', 'Tailwind', 'Mud']

const PowerUps = [];

async function loadPowerups() {    
    await preloadImages(uiImageUrls, uiImageArray)
    names.map((name, index) => {
        PowerUps.push({ name, image: uiImageArray[index] })
    })
    console.log('Loaded powerups 🚀️')
}
loadPowerups().then(r => {})

export default PowerUps;
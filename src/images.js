import { preloadImages } from './helpers'

import topBarBgUrl from './images/topbar.png';
import powerBgUrl from './images/power.png';
import bannerBgUrl from './images/banner.png';
import madeWithUrl from './images/madewith.png';
import mapUrl from './images/map.png';
import riders1Url from './images/riders1.png';
import riders2Url from './images/riders2.png';

const uiImageUrls = [topBarBgUrl, powerBgUrl, bannerBgUrl, madeWithUrl, mapUrl, riders1Url, riders2Url]
const uiImageArray = []
const Images = {}

async function loadImages() {
    await preloadImages(uiImageUrls, uiImageArray)

    Images.topBar = uiImageArray[0]
    Images.power = uiImageArray[1]
    Images.banner = uiImageArray[2]
    Images.madeWith = uiImageArray[3]
    Images.map = uiImageArray[4]
    Images.riders1 = uiImageArray[5]
    Images.riders2 = uiImageArray[6]
    
    console.log('Loaded images 🌄')
}
loadImages().then(r => {})

export default Images
import { preloadImages } from './helpers'

import topBarUrl from './images/topbar.png';
import powerUrl from './images/power.png';
import bannerUrl from './images/banner.png';
import madeWithUrl from './images/madewith.png';
import mapUrl from './images/map.png';
import riders1Url from './images/riders1.png';
import riders2Url from './images/riders2.png';
import routeUrl from './images/route.png';

const uiImageUrls = [topBarUrl, powerUrl, bannerUrl, madeWithUrl, mapUrl, riders1Url, riders2Url, routeUrl]
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
    Images.route = uiImageArray[7]
}
loadImages().then(r => {})

export default Images
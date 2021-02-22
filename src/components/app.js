import React, { useState, useEffect } from 'react'

import distanceBgUrl from '../images/distance.png';
import powerBgUrl from '../images/power.png';
import routeBgUrl from '../images/route.png';
import madeWithUrl from '../images/madewith.png';
import mapUrl from '../images/map.png';
import riders1Url from '../images/riders1.png';
import riders2Url from '../images/riders2.png';

import featherUrl from '../images/feather.png';
import aeroUrl from '../images/aero.png';
import sunUrl from '../images/sun.png';
import coffeeUrl from '../images/coffee.png';
import tailwindUrl from '../images/tailwind.png';

function App() {
    const canvasSize = { width: 1920, height: 1080 }
    const uiImageUrls = [distanceBgUrl, powerBgUrl, routeBgUrl, madeWithUrl, mapUrl, riders1Url, riders2Url]
    const puImageUrls = [featherUrl, aeroUrl, sunUrl, coffeeUrl, tailwindUrl]
    const uiImages = []
    const puImages = []
    const powerupList = ['Feather', 'Aero Boost', 'Vitamin D', 'Coffee Stop', 'Tailwind']
    
    const [isLoading, setIsLoading] = useState(true)
    const [photo, setPhoto] = useState(null)
    const [name, setName] = useState('Zwift IRL 🏳️‍🌈')
    const [friend, setFriend] = useState('')
    const [route, setRoute] = useState('')
    const [watts, setWatts] = useState(randomWatts())
    const [powerup, setPowerup] = useState('')
    
    const [composition, setComposition] = useState(null)

    useEffect(() => {        
        preloadImages(uiImageUrls, uiImages).then(r => {})
        preloadImages(puImageUrls, puImages).then(r => {})
    })
    
    const preloadImages = async (srcArray, imageArray) => {
        const promises = await srcArray.map((src) => {
            return new Promise(function (resolve, reject) {
                    const img = new Image()
                    img.src = src
                    img.onload = resolve()
                    img.onerror = reject()
                    imageArray.push(img)
                }
            )
        })
        
        await Promise.all(promises)
        setIsLoading(false)
    }
    
    function composeImage(backgroundPhoto) {
        const canvas = document.createElement('canvas')
        canvas.width = canvasSize.width
        canvas.height = canvasSize.height
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

        // Background image
        const drawWidth = canvasSize.width
        const drawHeight = drawWidth / backgroundPhoto.width * backgroundPhoto.height
        const drawY = (canvasSize.height - drawHeight) / 2
        ctx.drawImage(backgroundPhoto, 0, drawY, drawWidth, drawHeight)
        
        // Top bar with distance, time etc
        ctx.drawImage(uiImages[0], 620, 20)
        ctx.fillStyle = "#fff";
        
        // Power box
        ctx.drawImage(uiImages[1], 20, 20)
        ctx.fillStyle = "#fff";
        ctx.font = canvasFont(105)
        ctx.textAlign = 'right';
        ctx.fillText(Math.min(Math.abs(watts), 9999), 278, 125)
        
        // Power up
        if (powerup != '') {
            ctx.drawImage(puImages[parseInt(powerup)], 320, 30)
        }

        // Map
        ctx.drawImage(uiImages[4], 1454, 24)
        
        // Made with
        ctx.drawImage(uiImages[3], 25, 990)
        
        // Riders
        ctx.drawImage(uiImages[friend ? 6 : 5], 1563, 340)
        ctx.font = canvasFont(24)
        ctx.textAlign = 'right';
        ctx.fillText(name, 1887, 622)
        if (friend) {
            ctx.fillText(friend, 1887, 566)
        }        
        
        if (route) {
            // Route badge box
            ctx.drawImage(uiImages[2], 0, 650)
            ctx.textAlign = 'right';
            ctx.font = canvasFont(70)
            ctx.fillStyle = "#fff";
            ctx.fillText(route, 1547, 880)
            ctx.fillStyle = "#000";
            ctx.fillText(route, 1545, 878)
        }
        
        setComposition(canvas.toDataURL('image/jpeg', 0.95))
    }

    function readImageUpload(e) {
        const target = e.target;
        if (target.files && target.files[0] ) {
            const FR = new FileReader()
            FR.onload = function(progress) {
                const img = new Image()
                img.src = progress.target.result
                img.onload = function() {
                    setPhoto(img)
                    composeImage(img)
                };                
            };
            FR.readAsDataURL(target.files[0])
        }
    }
    
    function canvasFont(size) {
        return '700 ' + size + 'px Kanit'
    }

    function randomWatts() {
        return 100 + Math.floor(Math.random() * Math.floor(200))
    }

    function onNameChanged(value) {
        setName(value)
    }
    
    function onFriendChanged(value) {
        setFriend(value)
    }
    
    function onRouteChanged(value) {
        setRoute(value)
    }
    
    function onWattsChanged(value) {
        setWatts(value)
    }
    
    function onPowerupChanged(value) {
        setPowerup(value)
    }
        
    function onFormSubmit(e) {
        e.preventDefault()
        composeImage(photo)
    }

    const powerupOptions = powerupList.map((description, index) =>
        <option value={index.toString()} key={index}>{description}</option>
    );
    
    return (
        <div className="">
            <div className="bg-orange p-4 text-center mb-8">
                <h1 className="text-4xl font-bold text-white">Zwift IRL</h1>
                <p className="pt-2">Zwift, but in real life. For posting on Strava, Instagram etc.</p>
            </div>
            <div className="bg-gray-500 rounded mx-auto my-4 w-800 p-4">
                <div className="flex items-center">
                    <div className="bg-orange text-white font-bold w-8 h-8 rounded-full text-center pt-1">1</div>
                    <div className="pl-2 text-white text-lg">Add a photo:</div>
                    <div className="pl-2">
                        <input type="file" onChange={(e) => readImageUpload(e)} />
                    </div>
                </div>
            </div>
            {photo ?
                <div className="bg-gray-500 rounded mx-auto my-4 w-800 p-4">
                    <form onSubmit={(e) => onFormSubmit(e)}>
                        <div className="flex items-center pb-3 border-b border-gray-600 mb-3">
                            <div className="bg-orange text-white font-bold w-8 h-8 rounded-full text-center pt-1">2</div>
                            <div className="pl-2 text-white text-lg">Customize!</div>
                        </div>
                        <div className="pb-2 flex pb-3 border-b border-gray-600 mb-3">
                            <div>
                                <span className="text-white pr-2">Power-up:</span>
                                <select id="lang" onChange={(e) => onPowerupChanged(e.target.value)} value={powerup}>
                                    <option value="">None</option>
                                    {powerupOptions}
                                </select>
                            </div>
                            <div>
                                <span className="text-white pl-8 pr-2">Route badge:</span>
                                <input type="text" value={route} onChange={(e) => onRouteChanged(e.target.value)}
                                       className="bg-gray-700 text-white p-1 rounded placeholder-gray-500" placeholder="Make up a route!"/>
                            </div>
                            <div>
                                <span className="text-white pl-8 pr-2">Watts:</span>
                                <input type="number" min="0" max="2000" step="1" value={watts}
                                       onChange={(e) => onWattsChanged(e.target.value)}
                                       className="bg-gray-700 text-white p-1 rounded"/>
                            </div>
                        </div>
                        <div className="pb-2 flex pb-3 border-b border-gray-600 mb-3">
                            <div>
                                <span className="text-white pr-2">Your name:</span>
                                <input type="text" value={name} onChange={(e) => onNameChanged(e.target.value)} placeholder="Add your name"
                                       className="bg-gray-700 text-white p-1 rounded placeholder-gray-500"/>
                            </div>                            
                            <div>
                                <span className="text-white pl-8 pr-2">Friend name:</span>
                                <input type="text" value={friend} onChange={(e) => onFriendChanged(e.target.value)} placeholder="With someone?"
                                       className="bg-gray-700 text-white p-1 rounded placeholder-gray-500"/>
                            </div>
                        </div>
                        <div className="">
                            <button className="bg-orange py-1 px-8 rounded text-white font-semibold">Update</button>
                        </div>
                    </form>
                </div>
                :
                <div className="bg-gray-800 mx-auto w-800 text-white text-center mt-10 text-lg">
                    To get started, add a photo of your <strong>real life</strong> ride.
                </div>
            }
            {
                composition &&
                <div className="bg-gray-800 mx-auto w-800">
                    <img src={composition} />
                </div>                
            }            
            {
                composition &&
                <div className="bg-gray-500 rounded mx-auto my-4 w-800 p-4">
                    <div className="flex items-center">
                        <div className="bg-orange text-white font-bold w-8 h-8 rounded-full text-center pt-1">3</div>
                        <div className="pl-2 text-white text-lg">Save or copy the image, post it with your real life Strava ride, or whatever. </div> 
                    </div>
                </div>
            }

            {
                isLoading &&
                <div className="text-center text-gray-500 pt-4">Loading...</div>
            }
            <div style={{fontFamily: 'Kanit', fontWeight: 700}}>&nbsp;</div>
        </div>
    )
}

export default App;

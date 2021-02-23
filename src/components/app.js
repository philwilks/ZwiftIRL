import React, { useState, useEffect } from 'react'

import Header from './header'
import Label from './label'
import Footer from './footer'

import Images from '../images'
import PowerUps from '../powerups'
import Colors from '../colors'

function App() {
    const canvasSize = { width: 1920, height: 1080 }
    
    const [photo, setPhoto] = useState(null)
    const [name, setName] = useState('Zwift IRL 🏳️‍🌈')
    const [friend, setFriend] = useState('')
    const [route, setRoute] = useState('')
    const [watts, setWatts] = useState(0)
    const [gradient, setGradient] = useState(0)
    const [stats, setStats] = useState({ })
    const [powerup, setPowerup] = useState(-1)
    const [showAdvanced, setShowAdvanced] = useState(false)
    
    const [composition, setComposition] = useState(null)
    
    useEffect(() => {
        setWatts(randomInt(100, 300))
        setGradient(randomInt(-10, 10))
        const randomStats = {
            speed: randomInt(20, 45),
            elevation: randomInt(100, 300),
            hours: 1,
            minutes: randomInt(1, 40),
            seconds: randomInt(1, 59)
        }
        randomStats.distance = calculateDistance(randomStats)        
        setStats(randomStats)
    }, [])
    
    function calculateDistance(s) {        
        return Math.round(s.speed * hoursDecimal(s) * 10) / 10
    }
    function calculateSpeed(s) {
        return Math.round(s.distance / hoursDecimal(s))
    }
    function hoursDecimal(s) {
        return s.hours + ((s.minutes + (s.seconds / 60)) / 60)
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
        
        // Top bar
        ctx.drawImage(Images.topBar, 620, 21)
        ctx.textAlign = 'right';
        ctx.font = canvasFont(48)
        
        ctx.fillStyle = Colors.blue;
        ctx.fillText(stats.speed.toFixed(0).toString(), 708, 70)
        
        ctx.fillStyle = Colors.black;
        ctx.fillText(stats.distance.toFixed(1).toString(), 883, 70)
        
        ctx.fillStyle = Colors.blue;
        ctx.fillText(stats.elevation.toFixed(0).toString(), 1053, 70)
        
        ctx.fillStyle = Colors.black;
        ctx.fillText(stats.hours + ':' + stats.minutes.toString().padStart(2, '0') + ':' + stats.seconds.toString().padStart(2, '0'), 1251, 70)
        
        // Power box
        ctx.drawImage(Images.power, 20, 20)
        ctx.fillStyle = Colors.white;
        ctx.font = canvasFont(105)
        ctx.fillText(watts.toString(), 278, 125)
        
        // Power up
        if (powerup >= 0) {
            ctx.drawImage(PowerUps[powerup].image, 320, 30)
        }

        // Map
        ctx.drawImage(Images.map, 1454, 24)
        
        // Made with
        ctx.drawImage(Images.madeWith, 25, 990)
        
        // Riders
        ctx.drawImage(friend ? Images.riders2 : Images.riders1, 1563, 340)
        ctx.font = canvasFont(24)
        ctx.textAlign = 'right';
        ctx.fillText(name, 1887, 622)
        if (friend) {
            ctx.fillText(friend, 1887, 566)
        }        
        
        if (route) {
            // Route badge box
            ctx.drawImage(Images.route, 0, 650)
            ctx.textAlign = 'right';
            ctx.font = canvasFont(70)
            ctx.fillStyle = Colors.white;
            ctx.fillText(route, 1547, 880)
            ctx.fillStyle = Colors.black;
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

    function randomInt(min, max) {
        return min + Math.floor(Math.random() * Math.floor(max - min))
    }    

    function onNameChanged(value) { setName(value) }    
    function onFriendChanged(value) { setFriend(value) }    
    function onRouteChanged(value) { setRoute(value) }    
    function onWattsChanged(value) { setWatts(Math.min(Math.abs(value), 9999)) }    
    function onPowerupChanged(value) { setPowerup(parseInt(value)) }
        
    function onFormSubmit(e) {
        e.preventDefault()
        composeImage(photo)
    }
    
    function onMoreOptionsClick(e) {
        e.preventDefault()
        setShowAdvanced(!showAdvanced)
    }

    const powerupOptions = PowerUps.map((powerUp, index) =>
        <option value={index.toString()} key={index}>{powerUp.name}</option>
    );
    
    return (
        <>
            <Header />
            <div className="bg-gray-500 max-w-3xl md:rounded mx-auto my-4 p-4">
                <div className="flex items-center">
                    <div className="flex-none bg-orange text-white font-bold w-8 h-8 rounded-full text-center pt-1">1</div>
                    <div className="flex-none pl-2 text-white md:text-lg">Add a photo:</div>
                    <div className="pl-2 overflow-hidden max-w-2xl">
                        <input type="file" onChange={(e) => readImageUpload(e)} />
                    </div>
                </div>
            </div>
            {photo ?
                <div className="bg-gray-500 max-w-3xl md:rounded mx-auto my-4 p-4">
                    <form onSubmit={(e) => onFormSubmit(e)}>
                        <div className="flex items-center pb-3 border-b border-gray-600 mb-2">
                            <div className="bg-orange text-white font-bold w-8 h-8 rounded-full text-center pt-1">2</div>
                            <div className="pl-2 text-white md:text-lg">Customize!</div>
                        </div>
                        <div className="md:flex md:border-b border-gray-600 md:mb-2">
                            <div className="pr-6 mb-2">
                                <Label>Power-up:</Label>
                                <select id="lang" onChange={(e) => onPowerupChanged(e.target.value)} value={powerup}>
                                    <option value="-1">None</option>
                                    {powerupOptions}
                                </select>
                            </div>
                            <div className="pr-6 mb-2">
                                <Label>Route badge:</Label>
                                <input type="text" value={route} onChange={(e) => onRouteChanged(e.target.value)}
                                       className="bg-gray-700 text-white p-1 rounded placeholder-gray-500" placeholder="Make up a route!"/>
                            </div>
                        </div>
                        <div className="md:flex border-b border-gray-600 mb-3">
                            <div className="pr-6 mb-2">
                                <Label>Your name:</Label>
                                <input type="text" value={name} onChange={(e) => onNameChanged(e.target.value)} placeholder="Add your name"
                                       className="bg-gray-700 text-white p-1 rounded placeholder-gray-500"/>
                            </div>                            
                            <div className="pr-6 mb-2">
                                <Label>Friend name:</Label>
                                <input type="text" value={friend} onChange={(e) => onFriendChanged(e.target.value)} placeholder="With someone?"
                                       className="bg-gray-700 text-white p-1 rounded placeholder-gray-500"/>
                            </div>
                        </div>
                        { showAdvanced && 
                            <>
                                <div className="md:flex md:border-b border-gray-600 md:mb-2">                                   
                                    <div className="pr-6 mb-2">
                                        <Label>Watts:</Label>
                                        <input type="number" min="0" max="9999" step="1" value={watts}
                                               onChange={(e) => onWattsChanged(e.target.value)}
                                               className="bg-gray-700 text-white p-1 rounded"/>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="">
                            <button className="bg-orange py-1 px-8 rounded text-white font-semibold">Update</button>
                            <a href="#advanced" onClick={(e) => onMoreOptionsClick(e)} className="text-gray-200 pl-6">
                                <i className="fas fa-wrench pr-1 text-white"></i>
                                { showAdvanced ? 'Hide advanced options' : 'More options...' }
                            </a>
                        </div>
                    </form>
                </div>
                :
                <div className="bg-gray-800 mx-auto text-white text-center mt-10 text-lg mb-32 px-12">
                    To get started, add a photo of your real life ride.
                </div>
            }
            {
                composition &&
                <>
                    <div className="bg-gray-800 mx-auto max-w-6xl">
                        <img src={composition} />
                    </div>      
    
                    <div className="bg-gray-500 max-w-3xl md:rounded mx-auto my-4 p-4">
                        <div className="flex items-center">
                            <div className="flex-none bg-orange text-white font-bold w-8 h-8 rounded-full text-center pt-1">3</div>
                            <div className="pl-2 text-white md:text-lg">Save or copy the image above. If this doesn't work for you, <a href={composition} download="ZwiftIRL.jpg" className="text-orange font-semibold">download it here</a> instead.</div> 
                        </div>  
                    </div>
                </>
            }
            
            <div style={{fontFamily: 'Kanit', fontWeight: 700}}>&nbsp;</div>
            <Footer />
        </>
    )
}

export default App;

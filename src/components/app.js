import React, { useState, useEffect } from 'react'
import useDebouncedEffect  from 'use-debounced-effect'

import Header from './header'
import Label from './label'
import Footer from './footer'

import Images from '../images'
import PowerUps from '../powerups'
import Colors from '../colors'
import Achievements from '../achievements'

function App() {
    const canvasSize = { width: 1920, height: 1200 }
    
    const [photo, setPhoto] = useState(null)
    const [name, setName] = useState('Zwift IRL 🏳️‍🌈')
    const [friend, setFriend] = useState('')
    const [customHeading, setCustomHeading] = useState('')
    const [customDetails, setCustomDetails] = useState('')
    const [watts, setWatts] = useState(0)
    const [gradient, setGradient] = useState(0)
    const [stats, setStats] = useState({ })
    const [powerup, setPowerup] = useState(-1)
    const [achievement, setAchievement] = useState("route")
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [bpm, setBpm] = useState(0)
    const [rpm, setRpm] = useState(0)
    
    const [composition, setComposition] = useState(null)
    
    useEffect(() => {
        setWatts(randomInt(100, 300))
        setBpm(randomInt(50,180))
        setRpm(randomInt(75,95))
        setGradient(randomInt(-2, 9))
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

    useEffect(() => {
        if (photo) composeImage()
    }, [photo, powerup, achievement])

    useDebouncedEffect(()=>{
        if (photo) composeImage()
    }, 400, [customHeading, customDetails, name, friend, watts, gradient, stats, bpm, rpm]);
        
    function calculateDistance(s) {        
        return Math.round(s.speed * hoursDecimal(s) * 10) / 10
    }
    function calculateSpeed(s) {
        return Math.round(s.distance / hoursDecimal(s))
    }
    function hoursDecimal(s) {
        return s.hours + ((s.minutes + (s.seconds / 60)) / 60)
    }

    async function composeImage() {
        const canvas = document.createElement('canvas')
        canvas.width = canvasSize.width
        canvas.height = canvasSize.height
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

        // Background image
        const drawWidth = canvasSize.width
        const drawHeight = drawWidth / photo.width * photo.height
        const drawY = (canvasSize.height - drawHeight) / 2
        ctx.drawImage(photo, 0, drawY, drawWidth, drawHeight)
        
        // Top bar
        ctx.drawImage(Images.topBar, 620, 21)
        ctx.textAlign = 'right';
        ctx.font = canvasFont(48)
        
        ctx.fillStyle = Colors.blue
        ctx.fillText(stats.speed.toFixed(0).toString(), 708, 70)
        
        ctx.fillStyle = Colors.black
        ctx.fillText(stats.distance.toFixed(stats.distance < 100 ? 1 : 0).toString(), 883, 70)
        
        ctx.fillStyle = Colors.blue
        ctx.fillText(stats.elevation.toFixed(0).toString(), 1053, 70)
        
        ctx.fillStyle = Colors.black
        ctx.fillText((stats.hours > 0 ? stats.hours + ':' : '') + stats.minutes.toString().padStart(2, '0') + ':' + stats.seconds.toString().padStart(2, '0'), 1251, 70)
        
        // Watts etc
        ctx.drawImage(Images.power, 20, 20)
        ctx.fillStyle = Colors.white
        ctx.font = canvasFont(105)
        ctx.fillText(watts.toString(), 278, 125)

        // RPM
        ctx.fillStyle = Colors.black
        ctx.font = canvasFont(63)
        ctx.fillText(rpm.toString(), 115, 205)

        // BPM
        ctx.fillText(bpm.toString(), 273, 205)
        
        // Power up
        if (powerup >= 0) {
            const img = await imageAsync(PowerUps[powerup].imageUrl)
            ctx.drawImage(img, 320, 30)
        }

        // Map
        ctx.drawImage(Images.map, 1454, 24)
        ctx.font = canvasFont(35 + (gradient > 0 ? Math.min(gradient, 20) * 2 : 0))
        ctx.strokeStyle = Colors.black
        ctx.lineWidth = 4
        ctx.strokeText(gradient.toString(), 1857, 100)
        ctx.fillStyle = Colors.forGradient(gradient)
        ctx.fillText(gradient.toString(), 1857, 100)
        
        ctx.font = canvasFont(25)
        ctx.lineWidth = 3
        ctx.fillStyle = Colors.white
        ctx.strokeText('%', 1880, 100)
        ctx.fillText('%', 1880, 100)
        
        // Made with
        ctx.drawImage(Images.madeWith, 25, 1110)
        
        // Riders
        ctx.drawImage(friend ? Images.riders2 : Images.riders1, 1563, 340)
        ctx.font = canvasFont(24)
        ctx.textAlign = 'right'
        ctx.fillStyle = Colors.white
        ctx.fillText(name, 1887, 622)
        if (friend) {
            ctx.fillText(friend, 1887, 566)
        }        
        
        // Achievement banner
        if (achievement) {
            ctx.drawImage(Images.banner, 0, 730)
            ctx.textAlign = 'right'

            let badge, heading, details;
            if (achievement === 'route') {
                badge = Images.route
                heading = customHeading
                details = 'Great work! Keep exploring!'
            }
            else {
                const index = parseInt(achievement.replace('achievement', ''))
                badge = await imageAsync(Achievements[index].imageUrl)
                heading = customHeading || Achievements[index].name
                details = customDetails || Achievements[index].details                
            }
            
            ctx.font = canvasFont(68)
            ctx.fillStyle = Colors.white;
            ctx.fillText(achievement === 'route' ? 'ROUTE COMPLETE' : 'ACHIEVEMENT UNLOCKED', 1547, 880)
            
            ctx.font = canvasFont(70)
            ctx.fillStyle = Colors.white;
            ctx.fillText(heading, 1547, 954)
            ctx.fillStyle = Colors.black;
            ctx.fillText(heading, 1545, 952)

            ctx.font = canvasFont(37)
            ctx.fillStyle = Colors.white;
            ctx.fillText(details, 1547, 1004)
            
            
            ctx.drawImage(badge, 265, 721)
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
    function onCustomHeadingChanged(value) { setCustomHeading(value) }
    function onCustomDetailsChanged(value) { setCustomDetails(value) }
    function onPowerupChanged(value) { setPowerup(parseInt(value)) }
    function onAchievementChanged(value) { setAchievement(value) }
    
    function onWattsChanged(value) { setWatts(parseInt(value)) }
    function onRpmChanged(value) { setRpm(parseInt(value)) }
    function onBpmChanged(value) { setBpm(parseInt(value)) }
    function onGradientChanged(value) { setGradient(parseInt(value)) }
    
    function onDistanceChanged(value) { setStats( { ...stats, distance: parseFloat(value) }) }
    function onSpeedChanged(value) { setStats( { ...stats, speed: parseInt(value) }) }
    function onElevationChanged(value) { setStats( { ...stats, elevation: parseInt(value) }) }
    function onHoursChanged(value) { setStats( { ...stats, hours: parseInt(value) }) }
    function onMinutesChanged(value) { setStats( { ...stats, minutes: parseInt(value) }) }
    function onSecondsChanged(value) { setStats( { ...stats, seconds: parseInt(value) }) }

    function onFormSubmit(e) {
        e.preventDefault()
        composeImage()
    }
    
    function onMoreOptionsClick(e) {
        e.preventDefault()
        setShowAdvanced(!showAdvanced)
    }

    function onCalculateSpeedClick(e) {
        e.preventDefault()
        setStats({ ...stats, speed: calculateSpeed(stats) })
    }
    
    const powerupOptions = PowerUps.map((powerUp, index) =>
        <option value={index.toString()} key={index}>{powerUp.name}</option>
    );
    
    const achievementOptions = Achievements.map((achievement, index) =>
        <option value={"achievement" + index.toString()} key={index}>{achievement.name}</option>
    );

    function imageAsync(src) {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = src
        })
    }
    
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
                                <Label>Achievement:</Label>
                                <select id="lang" onChange={(e) => onAchievementChanged(e.target.value)} value={achievement} className="leading-3">
                                    <option value="">None</option>
                                    <option value="route">Route badge</option>
                                    {achievementOptions}
                                </select>
                            </div>
                        </div>
                        {achievement &&
                            <div className="md:flex md:border-b border-gray-600 md:mb-2">
                                {achievement === 'route' ?
                                    <div className="pr-6 mb-2">
                                        <Label>Route name:</Label>
                                        <input type="text" value={customHeading}
                                               onChange={(e) => onCustomHeadingChanged(e.target.value)}
                                               className="bg-gray-700 text-white p-1 rounded placeholder-gray-500 md:w-80"
                                               placeholder="Make up a route!"/>
                                    </div>
                                    :
                                    <>
                                        <div className="pr-6 mb-2">
                                            <Label>Custom title:</Label>
                                            <input type="text" value={customHeading}
                                                   onChange={(e) => onCustomHeadingChanged(e.target.value)}
                                                   className="bg-gray-700 text-white p-1 rounded placeholder-gray-500"
                                                   placeholder="What did you do?"/>
                                        </div>
                                        <div className="pr-6 mb-2">
                                            <Label>Details:</Label>
                                            <input type="text" value={customDetails}
                                                   onChange={(e) => onCustomDetailsChanged(e.target.value)}
                                                   className="bg-gray-700 text-white p-1 rounded placeholder-gray-500 md:w-80"
                                                   placeholder="Tell us more!"/>
                                        </div>
                                    </>
                                }
                            </div>
                        }
                        <div className="md:flex border-b border-gray-600 mb-2">
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
                                        <Label>Power:</Label>
                                        <input type="number" min="0" max="9999" step="1" value={watts}
                                               onChange={(e) => onWattsChanged(e.target.value)}
                                               className="bg-gray-700 text-white p-1 rounded w-24 md:w-16"/>
                                    </div>
                                    <div className="pr-6 mb-2">
                                        <Label>RPM:</Label>
                                        <input type="number" min="0" max="200" step="1" value={rpm}
                                            onChange={(e) => onRpmChanged(e.target.value)}
                                            className="bg-gray-700 text-white p-1 rounded w-24 md:w-16"/>
                                    </div>
                                    <div className="pr-6 mb-2">
                                        <Label>BPM:</Label>
                                        <input type="number" min="0" max="300" step="1" value={bpm}
                                            onChange={(e) => onBpmChanged(e.target.value)}
                                            className="bg-gray-700 text-white p-1 rounded w-24 md:w-16"/>
                                    </div>
                                    <div className="pr-6 mb-2">
                                        <Label>Gradient:</Label>
                                        <input type="number" min="-100" max="100" step="1" value={gradient}
                                               onChange={(e) => onGradientChanged(e.target.value)}
                                               className="bg-gray-700 text-white p-1 rounded w-24 md:w-16"/>
                                    </div>
                                </div>
                                <div className="md:flex md:border-b border-gray-600 md:mb-2">  
                                    <div className="pr-6 mb-2">
                                        <Label>Speed:</Label>
                                        <input type="number" min="0" max="200" step="1" value={stats.speed}
                                               onChange={(e) => onSpeedChanged(e.target.value)}
                                               className="bg-gray-700 text-white p-1 rounded w-24 md:w-16"/>
                                    </div>
                                    <div className="pr-6 mb-2">
                                        <Label>Distance:</Label>
                                        <input type="number" min="0" max="10000" step="0.1" value={stats.distance}
                                               onChange={(e) => onDistanceChanged(e.target.value)}
                                               className="bg-gray-700 text-white p-1 rounded w-24 md:w-16"/>
                                    </div>
                                    <div className="pr-6 mb-2">
                                        <Label>Elevation:</Label>
                                        <input type="number" min="0" max="10000" step="1" value={stats.elevation}
                                               onChange={(e) => onElevationChanged(e.target.value)}
                                               className="bg-gray-700 text-white p-1 rounded w-24 md:w-16"/>
                                    </div>
                                    <div className="pr-6 mb-2">
                                        <Label>Time:</Label>
                                        <input type="number" min="0" max="999" step="1" value={stats.hours}
                                               onChange={(e) => onHoursChanged(e.target.value)}
                                               className="bg-gray-700 text-white p-1 rounded w-12"/> 
                                        <span className="text-gray-300 px-1">:</span>
                                        <input type="number" min="0" max="59" step="1" value={stats.minutes}
                                               onChange={(e) => onMinutesChanged(e.target.value)}
                                               className="bg-gray-700 text-white p-1 rounded w-12"/>
                                        <span className="text-gray-300 px-1">:</span>
                                        <input type="number" min="0" max="59" step="1" value={stats.seconds}
                                               onChange={(e) => onSecondsChanged(e.target.value)}
                                               className="bg-gray-700 text-white p-1 rounded w-12"/>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="pt-1">
                            <a href="#advanced" onClick={(e) => onMoreOptionsClick(e)} className="text-gray-200">
                                <i className="fas fa-wrench pr-1 text-orange"></i>
                                { showAdvanced ? 'Hide options' : 'More options...' }
                            </a>
                            {showAdvanced &&
                            <a href="#calcspeed" onClick={(e) => onCalculateSpeedClick(e)}
                               className="text-gray-200 pl-6"
                               title="Automatically calculate the speed from the distance and time">
                                <i className="fas fa-tachometer pr-1 text-orange"></i>
                                Calculate speed
                            </a>
                            }
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
            
            <div style={{fontFamily: 'Kanit', fontWeight: 700}}>&nbsp;</div> { /* needed to preload font for use in Canvas */ }
            <Footer />
        </>
    )
}

export default App;

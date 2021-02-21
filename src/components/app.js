import React, { useState, useRef } from 'react'

function App() {
    const canvasSize = { width: 1920, height: 1080 }
    
    const [photo, setPhoto] = useState(null)
    const [name, setName] = useState('Tom Pidcock')
    const [route, setRoute] = useState('')
    const [watts, setWatts] = useState(randomWatts())
    
    const [composition, setComposition] = useState(null)
    
    const canvasRef = useRef(null)

    function composeImage(backgroundPhoto) {
        const canvas = document.createElement('canvas')
        canvas.width = canvasSize.width
        canvas.height = canvasSize.height
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

        const drawWidth = canvasSize.width
        const drawHeight = drawWidth / backgroundPhoto.width * backgroundPhoto.height
        const drawY = (canvasSize.height - drawHeight) / 2
        ctx.drawImage(backgroundPhoto, 0, drawY, drawWidth, drawHeight)

        ctx.fillStyle = "#fff";
        ctx.font = '48px sans-serif'
        ctx.fillText(Math.min(Math.abs(watts), 9999) + 'w', 10, 50)
        ctx.fillText(name, 10, 250)

        if (route) {
            ctx.fillText(route, 10, 150)
        }

        setComposition(canvas.toDataURL())
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

    function randomWatts() {
        return 100 + Math.floor(Math.random() * Math.floor(200))
    }

    function onNameChanged(value) {
        setName(value)
    }
    
    function onRouteChanged(value) {
        setRoute(value)
    }
    
    function onWattsChanged(value) {
        setWatts(value)
    }
    
    return (
        <div className="">
            <div className="bg-orange p-4 text-center mb-8">
                <h1 className="text-4xl font-semibold text-white">Zwift IRL</h1>
                <p className="pt-2">Zwift, but in real life. For posting on Strava, Instagram etc.</p>
            </div>
            <div className="bg-gray-500 rounded mx-auto my-4 w-800 p-4">
                <div className="flex items-center">
                    <div className="bg-orange text-white font-bold w-8 h-8 rounded-full text-center pt-1">1</div>
                    <div className="pl-2 text-white font-semibold text-lg">Add a photo:</div>
                    <div className="pl-2">
                        <input type="file" onChange={(e) => readImageUpload(e)} />
                    </div>
                </div>
            </div>
            {photo ?
                <div className="bg-gray-500 rounded mx-auto my-4 w-800 p-4">
                    <div className="flex items-center pb-3 border-b border-gray-600 mb-3">
                        <div className="bg-orange text-white font-bold w-8 h-8 rounded-full text-center pt-1">2</div>
                        <div className="pl-2 text-white font-semibold text-lg">Customize!</div>
                    </div>
                    <div className="pb-2 flex pb-3 border-b border-gray-600 mb-3">
                        <div>
                            <span className="text-white pr-2">Your name:</span>
                            <input type="text" value={name} onChange={(e) => onNameChanged(e.target.value)}
                                   className="bg-gray-700 text-white p-1 rounded"/>
                        </div>
                        <div>
                            <span className="text-white pl-8 pr-2">Route badge:</span>
                            <input type="text" value={route} onChange={(e) => onRouteChanged(e.target.value)}
                                   className="bg-gray-700 text-white p-1 rounded"/>
                        </div>
                        <div>
                            <span className="text-white pl-8 pr-2">Watts:</span>
                            <input type="number" min="0" max="2000" step="10" value={watts}
                                   onChange={(e) => onWattsChanged(e.target.value)}
                                   className="bg-gray-700 text-white p-1 rounded"/>
                        </div>
                    </div>
                    <div className="">
                        <button className="bg-orange py-1 px-8 rounded text-white font-semibold" onClick={() => composeImage(photo)}>Update
                        </button>
                    </div>
                </div>
                :
                <div className="bg-gray-800 mx-auto w-800 text-white text-center mt-10 text-lg">
                    To get started, add a photo of your <strong>real life</strong> ride.
                </div>
            }
            {composition &&
                <div className="bg-gray-800 mx-auto w-800">
                    <img src={composition} alt="Copy me" />
                </div>                
            }
            
            {
                composition &&
                <div className="bg-gray-500 rounded mx-auto my-4 w-800 p-4">
                    <div className="flex items-center">
                        <div className="bg-orange text-white font-bold w-8 h-8 rounded-full text-center pt-1">3</div>
                        <div className="pl-2 text-white font-semibold text-lg">Save or copy the image, post it with your real life Strava ride, or whatever. </div> 
                    </div>
                </div>
            }
        </div>
    );
}

export default App;

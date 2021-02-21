import React, { useState, useEffect, useRef } from 'react'


function App() {
    const canvasSize = { width: 800, height: 450 }
    
    const [photo, setPhoto] = useState(null)
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)     
        if (photo) {
            const drawWidth = canvasSize.width;
            const drawHeight = drawWidth / photo.width * photo.height;
            const drawY = (canvasSize.height - drawHeight) / 2;
            ctx.drawImage(photo, 0, drawY, drawWidth, drawHeight);
        }
    })

    function readImage(e) {
        const target = e.target;
        if (target.files && target.files[0] ) {
            const FR = new FileReader();
            FR.onload = function(progress) {
                const img = new Image();
                img.src = progress.target.result;
                img.onload = function() {
                    setPhoto(img)
                };                
            };
            FR.readAsDataURL(target.files[0] );
        }
    }

    return (
        <div className="">
            <div className="bg-orange p-4 text-center">
                <h1 className="text-4xl font-semibold text-white">Zwift IRL</h1>
                <p className="pt-2">Ride on Zwift while you're riding outside.</p>
            </div>
            <div className="bg-gray-700">
                <input type="file" onChange={(e) => readImage(e)} />
            </div>
            <div className="bg-gray-800">
                <canvas
                    ref={canvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                />
            </div>
        </div>
    );
}

export default App;

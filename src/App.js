import React, { useState, useEffect, useRef } from 'react'

function App() {
    const canvasSize = { width: 800, height: 450 }
    
    const [photo, setPhoto] = useState(null)
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvasSize.height, canvasSize.width)
        
    })

    return (
        <div className="">
            <div className="bg-orange p-4 text-center">
                <h1 className="text-4xl font-semibold text-white">Zwift IRL</h1>
                <p className="pt-2">Ride on Zwift while you're riding outside.</p>
            </div>
            <div className="bg-gray-700">
                
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

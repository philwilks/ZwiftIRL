import React from 'react'

function Header(props) {        
    return (
        <div className="bg-orange p-4 text-center mb-8">
            <h1 className="text-4xl font-bold text-white">Zwift IRL</h1>
            <p className="pt-2 text-sm md:text-base">Add some Zwift to your real life rides!</p>
        </div>
    );
}
export default Header;
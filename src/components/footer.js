import React from 'react'

function Footer(props) {        
    return (
        <div className="text-center py-10 max-w-4xl mx-auto">
            <p>
                <a href="https://twitter.com/ZwiftIRL" target="_blank" className="inline-block bg-blue-400 text-white rounded-full py-1 px-8 font-bold mx-1 hover:opacity-80 mb-2 md:text-lg">
                    <i className="fab fa-twitter text-lg pr-2"></i>
                    ZwiftIRL
                </a>
            </p>
            <p className="px-3 text-gray-300 mb-6">Please tweet <a href="https://twitter.com/ZwiftIRL" target="_blank" className="font-semibold text-white">@ZwiftIRL</a> with any feature suggestions or feedback, and tag us in your photos!</p>
            <p className="px-3 mt-12 border-t-2 border-gray-600 pt-8 text-gray-300 text-sm">Made by Phil Wilks. Find me on <a href="https://twitter.com/philwilks" target="_blank" className="text-white font-semibold"><i className="fab fa-twitter text-blue-400 pl-1"></i> Twitter</a> and <a href="https://www.strava.com/athletes/486450" target="_blank" className="text-white font-semibold"><i className="fab fa-strava text-orange pl-1"></i> Strava</a>. Source code for this on <a href="https://github.com/philwilks/ZwiftIRL" target="_blank" className="text-white font-semibold">GitHub</a>.</p>
            <p className="px-3 text-gray-300 my-2 text-sm">Thanks to all the amazing people at <a href="https://zwift.com" target="_blank" className="font-semibold text-white">Zwift</a> and <a href="https://www.wtrl.racing" target="_blank" className="font-semibold text-white">WTRL</a> for allowing the world to keep racing bikes through lockdown.</p>
        </div>
    );
}
export default Footer;
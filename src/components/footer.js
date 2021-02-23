import React from 'react'

function Footer(props) {        
    return (
        <div className="text-center py-10 max-w-4xl mx-auto">
            <p className="px-3 mt-12 border-t-2 border-gray-600 pt-6 text-gray-300 text-lg mb-2">
                <a href="https://www.paypal.com/donate?hosted_button_id=CXZ9X9873ADC2" target="_blank" className="inline-block bg-red-500 text-white rounded-full py-1 px-8 font-bold mx-1 hover:opacity-80 mb-2 md:text-lg">
                    <i className="fas fa-heart text-lg pr-2"></i>
                    Donate
                </a>
            </p>
            <p className="px-3 text-gray-300 mb-8 text-sm">Make a small <a href="https://www.paypal.com/donate?hosted_button_id=CXZ9X9873ADC2" target="_blank" className="font-semibold text-white">donation</a> to help with hosting fees. If there is any money left over I promise to spend it wisely on beer.</p>
            <p className="px-3 mt-6 border-t-2 border-gray-600 pt-8 text-gray-300 text-sm mb-2">
                <a href="https://twitter.com/ZwiftIRL" target="_blank" className="inline-block bg-blue-400 text-white rounded-full py-1 px-8 font-bold mx-1 hover:opacity-80 mb-2 md:text-lg">
                    <i className="fab fa-twitter text-lg pr-2"></i>
                    Twitter
                </a>
                <a href="https://www.instagram.com/zwiftirl/" target="_blank" className="inline-block bg-purple-500 text-white rounded-full py-1 px-8 font-bold mx-1 hover:opacity-80 mb-2 md:text-lg">
                    <i className="fab fa-instagram text-lg pr-2"></i>
                    Instagram
                </a>
            </p>
            <p className="px-3 text-gray-300 mb-6 text-sm">Please tweet <a href="https://twitter.com/ZwiftIRL" target="_blank" className="font-semibold text-white">@ZwiftIRL</a> with any feature suggestions or feedback, and tag us in your photos!</p>
            <p className="px-3 mt-6 border-t-2 border-gray-600 pt-8 text-gray-300 text-sm">Made by Phil Wilks. Find me on <a href="https://twitter.com/philwilks" target="_blank" className="text-white font-semibold"><i className="fab fa-twitter text-blue-400 pl-1"></i> Twitter</a> and <a href="https://www.strava.com/athletes/486450" target="_blank" className="text-white font-semibold"><i className="fab fa-strava text-orange pl-1"></i> Strava</a>. Source code for this on <a href="https://github.com/philwilks/ZwiftIRL" target="_blank" className="text-white font-semibold">GitHub</a>.</p>
            <p className="px-3 text-gray-300 my-2 text-sm">Thanks to all the amazing people at <a href="https://zwift.com" target="_blank" className="font-semibold text-white">Zwift</a> and <a href="https://www.wtrl.racing" target="_blank" className="font-semibold text-white">WTRL</a> for allowing the world to keep racing bikes through lockdown.</p>
        </div>
    );
}
export default Footer;
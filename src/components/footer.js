import React from 'react'

function Footer(props) {        
    return (
        <div className="text-center py-10 mt-12 border-t-2 border-gray-600 max-w-4xl mx-auto">
            <p className="text-gray-300 my-8">Please <a href="https://twitter.com/philwilks" target="_blank" className="font-bold lg:border-b-2 border-blue-400">tweet me</a> with any feature suggestions or feedback! Or use <strong>#zwiftirl</strong> to tag your photos.</p>
            <p>
                <a href="https://twitter.com/philwilks" target="_blank" className="inline-block bg-blue-400 text-white rounded-full py-1 px-8 font-bold mx-1 hover:opacity-80 mb-2">
                    <i className="fab fa-twitter text-lg pr-1"></i>
                    @philwilks
                </a>
                <a href="https://github.com/philwilks/ZwiftIRL" target="_blank" className="inline-block bg-gray-300 text-black rounded-full py-1 px-8 font-bold mx-1 hover:opacity-80 mb-2">
                    <i className="fab fa-github text-lg pr-1"></i>
                    GitHub repo
                </a>
                <a href="https://www.strava.com/athletes/486450" target="_blank" className="inline-block bg-orange text-white rounded-full py-1 px-8 font-bold mx-1 hover:opacity-80 mb-2">
                    <i className="fab fa-strava text-lg pr-1"></i>
                    Strava
                </a>
            </p>
        </div>
    );
}
export default Footer;
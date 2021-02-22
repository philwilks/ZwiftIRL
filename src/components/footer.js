import React from 'react'
import footerLogo from "../images/footerlogo.png";

function Footer(props) {        
    return (
        <div className="text-center pt-10 mt-32 border-t-2 border-gray-600 max-w-4xl mx-auto">
            <p className="text-white my-8">Please <a href="https://twitter.com/philwilks" target="_blank" className="font-bold border-b-2 border-blue-400">tweet me</a> with any feature suggestions or feedback! Or use <strong>#zwiftirl</strong> to tag your photos.</p>
            <p>
                <a href="https://twitter.com/philwilks" target="_blank" className="bg-blue-400 text-white rounded-full py-1 px-8 font-bold mr-4 hover:opacity-80">
                    <i className="fab fa-twitter text-lg pr-1"></i>
                    @philwilks
                </a>
                <a href="https://github.com/philwilks/ZwiftIRL" target="_blank" className="bg-gray-300 text-black rounded-full py-1 px-8 font-bold mr-4 hover:opacity-80">
                    <i className="fab fa-github text-lg pr-1"></i>
                    GitHub repo
                </a>
                <a href="https://www.strava.com/athletes/486450" target="_blank" className="bg-orange text-white rounded-full py-1 px-8 font-bold hover:opacity-80">
                    <i className="fab fa-strava text-lg pr-1"></i>
                    Strava
                </a>
                
            </p>
        </div>
    );
}
export default Footer;
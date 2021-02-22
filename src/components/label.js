import React from 'react'

function Label(props) {        
    return (
        <span className="inline-block text-white pr-2 w-1/3 md:w-auto">{props.children}</span>
    );
}
export default Label;
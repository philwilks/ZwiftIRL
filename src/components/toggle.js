import React, { useState } from 'react'

function Toggle(props) {    
    const [checked, setChecked] = useState(props.defaultChecked); 
    
    function onChange(e) {
        setChecked(e.target.checked);
        if (props.onChange) props.onChange(e.target.checked);
    }
    return (
        <div>
            <label className="flex py-4">
                <div className="w-10 h-6 rounded-full relative bg-gray-700">
                    <input
                        type="checkbox"
                        defaultChecked={checked}
                        onChange={onChange}
                        className={"absolute block w-6 h-6 rounded-full appearance-none cursor-pointer " + (checked ? "right-0 bg-green-500" : "left-0 bg-white")}
                    />
                </div>
                <div className="text-white pl-2">
                    {props.text}
                </div>
            </label>
        </div>
    );
}
export default Toggle;
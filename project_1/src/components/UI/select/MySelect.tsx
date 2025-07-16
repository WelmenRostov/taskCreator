import React from 'react';

interface Options {
    value: string;
    name: string;
}

interface MySelectProps {
    options: Options[];
    defaultValue: string;
    value:string
    onChange: (value: string) => void;
}

const MySelect = ({options, defaultValue, value, onChange}: MySelectProps) => {
    return (
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
            className="border-2 border-indigo-600 rounded-[1vw] p-2 bg-indigo-800">
            <option
                className="bg-indigo-500"
                disabled
                value=''
            >
                {defaultValue}
            </option>

            {
                options.map(options =>
                <option key={options.name} value={options.value} className="bg-indigo-500" >
                    {options.name}
                </option>)
            }
        </select>
    );
};

export default MySelect;
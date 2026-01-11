import React, { useState } from 'react'
import StyleNumberGenerator from './StyleNumberGenerator';
import CoordsStyleGenerator from './CoordsStyleGenerator';

const NewStyleGenerator = () => {
    const [category, setCategory] = useState("");
    return (
        <>
            <div className='p-4 max-w-xl mx-auto  mt-25 b'>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='border border-purple-300 w-full py-2 px-4 outline-purple-500 rounded-md cursor-pointer'>
                    <option value=""> Select Category </option>
                    {["Regular Styles", "Co-ords"].map((category) => (
                        <option value={category} key={category}> {category} </option>
                    ))}
                </select>
            </div>
            {category === "Regular Styles" ? <StyleNumberGenerator /> : <CoordsStyleGenerator />}

        </>
    )
}

export default NewStyleGenerator
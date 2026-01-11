import React, { useEffect, useState } from 'react'
import styleWiseService from '../services/GET SERVICE/getService'

const CoordsStyleGenerator = () => {
    const [coords, setCoords] = useState([]);
    const [loading, setLoading] = useState((false));
    const [number, setNumber] = useState(0);
    const [designer, setDesigner] = useState("");
    const [category, setCategory] = useState("");
    const [newNumbers, setNewNumbers] = useState([]);
    // ********************** fetching coords styles ******************** 

    const fetchCoords = async () => {
        setLoading(true);
        try {
            const response = await styleWiseService.getCoordsStyles();
            setCoords(response.data);
            console.log(response.data);

        } catch (error) {
            console.log("Failed to fetch coords :: error :: ", error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCoords();
    }, [])




    const newStylesGenerator = (e) => {
        e.preventDefault();
        if (!designer) {
            alert(`Please select designer`);
            return
        }
        try {
            let startNum = 30000;  // starting point
            let lastNum = 30999;
            let requiredCount = parseInt(number, 10);
            let generated = [];

            while (generated.length < requiredCount && startNum <= lastNum) {
                let exists = coords?.find((style) => style?.coordStyleNumber === startNum);
                if (!exists) {
                    generated.push(startNum);
                }
                startNum++;
            }

            setNewNumbers(generated);
            console.log("New Numbers:", generated);
        } catch (error) {
            console.log("Failed to generate new styles :: error :: ", error);
        }
    };


    const downloadCSV = () => {
        if (newNumbers.length === 0) return;

        let csvContent = "StyleNumber,Category,Designer\n" +
            newNumbers.map(num => `${num},Co-ords,${designer}`).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "new-styles.csv");
        link.click();
    };





    if (loading) {
        return <p className='text-center mt-4'> loading... </p>
    }

    return (
        <div className='max-w-4xl mx-auto'>
            <h2 className='text-purple-500 font-medium text-xl'>Co-ords Generator</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">

                <div>
                    <form className="grid grid-cols-2 gap-2" onSubmit={newStylesGenerator}>


                        <input
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="border border-purple-300 rounded-md outline-purple-400 py-2 px-4"
                            placeholder="Enter quantity..."
                        />

                        <select
                            value={designer}
                            onChange={(e) => setDesigner(e.target.value)}
                            className="py-2 px-4 outline-purple-400 border border-purple-300 rounded-md">
                            <option value=""> Select Designer</option>
                            {["Komal", "Parul", "Neha"].map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>

                        <input
                            className="py-2 px-4 bg-purple-400 text-white col-span-2 cursor-pointer hover:bg-purple-500 ease-in duration-75 rounded-md"
                            type="submit"
                            value="Generate Numbers"
                        />
                    </form>
                </div>

                {newNumbers.length > 0 && (
                    <div className="pl-6 bg-gray-50 rounded-xl p-4 shadow-xs">
                        <div className='flex justify-between items-center  '>
                            <h3 className="font-medium text-purple-400 text-xl mb-4"> <span className='bg-purple-100 py-2 px-4 rounded-md text-purple-900' > {newNumbers.length} Co-ords generated</span>  </h3>
                            <button
                                onClick={downloadCSV}
                                className='bg-purple-400 text-white py-2 px-4 rounded hover:bg-purple-500 duration-75 ease-in cursor-pointer'> Download</button>
                        </div>
                        <ol className="list-decimal pl-6">
                            <li className='grid grid-cols-3 text-cyan-800 rounded-md shadow bg-cyan-100 py-2 px-2 my-2'>
                                <div>New Styles </div>
                                <div> Category </div>
                                <div>Created By</div>
                            </li>
                            {newNumbers.map((style, i) => (
                                <li key={style} className={`grid grid-cols-3 gap-3 p-2 rounded-md ${i % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                                    <div>{style} </div>
                                    <div> Co-ords </div>
                                    <div>{designer}</div>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CoordsStyleGenerator
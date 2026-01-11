import axios from 'axios';
import React, { useEffect, useState } from 'react';

const StyleNumberGenerator = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [styles, setStyles] = useState([]);
    const [number, setNumber] = useState(0);
    const [designer, setDesigner] = useState("");
    const [category, setCategory] = useState("");
    const [newNumbers, setNewNumbers] = useState([]);

    const fetchAllStyles = async () => {
        setLoading(true);
        try {
            const URL = "http://localhost:5000/api/v1/stylewise/regular-style/all-styles";
            const response = await axios.get(URL);
            setStyles(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log("Failed to fetch styles :: error :: ", error);
            setError("Failed to load styles :: error " + (error?.message || error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllStyles();
    }, []);

    const newStylesGenerator = (e) => {
        e.preventDefault();
        if (!category || !designer) {
            alert(`Please select ${!category ? "Category" : "Designer"}`);
            return
        }
        try {
            let startNum = 11000;  // starting point
            let lastNum = 19999;
            let requiredCount = parseInt(number, 10);
            let generated = [];

            while (generated.length < requiredCount && startNum <= lastNum) {
                let exists = styles?.find((style) => style?.styleNumber === startNum);
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
            newNumbers.map(num => `${num},${category},${designer}`).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "new-styles.csv");
        link.click();
    };



    if (loading) {
        return <p className="text-center mt-20">loading...</p>;
    }

    return (
        <div className="p-10 container mx-auto max-width-4xl">
            <h2 className="text-xl md:text-2xl font-medium text-purple-400">
                New Styles Generator
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">

                <div>
                    <form className="grid grid-cols-2 gap-2" onSubmit={newStylesGenerator}>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border border-purple-300 py-2 col-span-2 px-4 rounded-md outline-purple-400">
                            <option value="">Select Category</option>
                            {[
                                "Top",
                                "Shirt",
                                "Dress",
                                "Shrug",
                                "Kaftan",
                                "Pant",
                                "Trouser",
                                "Hoodie",
                                "Coat",
                                "Cover Up",
                                "Poncho",
                                "Tunic",
                                "Skirt",
                                "Plazzo",
                                "Duster",
                                "Cardigan",
                                "Jump Suit",
                                "Sweatshirt",
                            ].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

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
                            <h3 className="font-medium text-purple-400 text-xl mb-4"> <span className='bg-purple-100 py-2 px-4 rounded-md text-purple-900' > {newNumbers.length} {category} generated</span>  </h3>
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
                                    <div> {category} </div>
                                    <div>{designer}</div>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StyleNumberGenerator;

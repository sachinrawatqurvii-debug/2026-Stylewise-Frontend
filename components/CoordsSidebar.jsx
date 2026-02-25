import React, { useState } from 'react';
import {
    FiShoppingBag, FiChevronDown, FiChevronRight,
    FiGrid, FiStar, FiShoppingCart, FiTag
} from 'react-icons/fi';
import generateNykaaCooordsListing from '../catalog/coords/nykaa/coords/NykaaCoordsListing';
import { generateMyntraCoordsListingFile } from '../catalog/coords/myntra/MyntraCoordsListing';
import generateShopifyCooordsListing from '../catalog/coords/shopify/ShopifyCoordsListing';
import generateTatacliqCoordsListing from '../catalog/coords/tatacliq/TatacliqCoordsListing';
import generateShoppersStopCoordsListing from '../catalog/coords/shoppersstop/ShoppersStopCoordsListing';
import generateAjioCoordsListing from '../catalog/coords/ajio/AjioCoordsListing';
import { generateMyntraCoordsPlusListingFile } from '../catalog/coords/myntra/MyntraCoordsPlusListing';
import generateAjioCoordsPlusListing from '../catalog/coords/ajio/AjioCoordsPlusListing';
import generateTatacliqCoordsPlusListing from '../catalog/coords/tatacliq/TatacliqCoordsPlusListing';
import generateShoppersStopCoordsPlusListing from '../catalog/coords/shoppersstop/ShopperstopCoordsPlusListing';


const CooordsSidebar = ({ data, coords }) => {
    console.log(coords)
    const [openChannels, setOpenChannels] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleChannel = (channel) => {
        if (openChannels.includes(channel)) {
            setOpenChannels(openChannels.filter(item => item !== channel));
        } else {
            setOpenChannels([...openChannels, channel]);
        }
    };

    const channels = [
        {
            name: 'Myntra',
            icon: <FiShoppingBag className="text-pink-500" />,
            categories: [

                ,
                { type: "Qurvii", action: () => generateMyntraCoordsListingFile(coords, data) },
                { type: "Qurvii+", action: () => generateMyntraCoordsPlusListingFile(coords, data) },
            ]
        },

        {
            name: 'Nykaa',
            icon: <FiStar className="text-purple-500" />,
            categories: [

                { type: "Co-ords", action: () => generateNykaaCooordsListing(coords, data) },

            ]
        },
        {
            name: 'Ajio',
            icon: <FiTag className="text-blue-500" />,
            categories: [

                { type: "Qurvii", action: () => generateAjioCoordsListing(coords, data) },
                { type: "Qurvii+", action: () => generateAjioCoordsPlusListing(coords, data) },

            ]
        },


        {
            name: 'Shopify',
            icon: <FiShoppingCart className="text-green-500" />,
            categories: [
                { type: "Download", action: () => generateShopifyCooordsListing(coords, data) }
            ],
        },
        {
            name: 'TataCliq',
            icon: <FiGrid className="text-red-500" />,
            categories: [
                { type: "Qurvii", action: () => generateTatacliqCoordsListing(coords, data) },
                { type: "Qurvii+", action: () => generateTatacliqCoordsPlusListing(coords, data) }
            ],
        },
        {
            name: 'ShopperStop',
            icon: <FiShoppingBag className="text-yellow-500" />,
            categories: [
                { type: "Qurvii", action: () => generateShoppersStopCoordsListing(coords, data) },
                { type: "Qurvii+", action: () => generateShoppersStopCoordsPlusListing(coords, data) },
            ],
        }
    ];

    return (
        <div className="flex bg-gray-100 h-screen">
            {/* Sidebar Toggle Button (visible on mobile) */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md text-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? '✕' : '☰'}
            </button>

            {/* Sidebar Overlay (for mobile) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed md:relative w-64 bg-white shadow-xs  z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 h-full overflow-y-auto border-r-2 border-purple-400`}
            >
                <div className="p-5 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800 flex items-center">
                        <FiGrid className="mr-2 text-indigo-600" />
                        Channels
                    </h1>
                </div>

                <div className="p-4">
                    {channels.map((channel, index) => (
                        <div key={index} className="mb-2">
                            <div
                                className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => {
                                    // If channel has categories, toggle the dropdown
                                    if (channel.categories.length > 0) {
                                        toggleChannel(channel.name);
                                    } else {
                                        // If no categories, execute channel action directly
                                        if (channel.action) channel.action();
                                    }
                                }}
                            >
                                <div className="flex items-center">
                                    {channel.icon}
                                    <span className="ml-2 font-medium text-gray-700">{channel.name}</span>


                                </div>
                                {channel.categories.length > 0 && (
                                    openChannels.includes(channel.name) ?
                                        <FiChevronDown className="text-gray-500" /> :
                                        <FiChevronRight className="text-gray-500" />
                                )}
                            </div>

                            {openChannels.includes(channel.name) && channel.categories.length > 0 && (
                                <div className="ml-8 mt-1 mb-3 border-l-2 border-gray-200 pl-4 py-2 space-y-2">
                                    {channel.categories.map((category, catIndex) => (
                                        <div
                                            key={catIndex}
                                            className="flex items-center py-2 px-3 rounded-md text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent event bubbling to parent
                                                category.action();
                                            }}
                                        >
                                            <div className='grid grid-cols-2 items-center'>
                                                <span className={` ${category.type.toLowerCase().trim() === "qurvii + section" ? "border-b-2 border-b-purple-500 text-purple-500" : ""}} text-sm`}>{category.type}</span>
                                                <span className="ml-2 text-center font-medium text-purple-700 text-xs bg-purple-100 rounded-full py-1 px-2">{data.length > 0 && data.filter((style) => style.styleType?.toLowerCase().trim().includes(category.type.toLowerCase())).length || ""}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-semibold">Q</span>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">Qurvii</p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CooordsSidebar;
import { useEffect, useState } from "react";
import { FaHeartCrack } from "react-icons/fa6";
import { Hourglass } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Wishlist = () => {
    const [loading, setLoading] = useState(true);
    const wishlistItems = useSelector((state) => state.wishlist.items);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Hourglass
                        visible={true}
                        height="70"
                        width="70"
                        ariaLabel="hourglass-loading"
                        colors={["#277621", "#72bf6a"]}
                    />
                </div>
            ) : wishlistItems.length > 0 ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Header */}
                    <h1 className="text-2xl sm:text-3xl font-bold text-center">Your Favorite Items</h1>
                    <p className="text-center text-gray-500 mt-2">
                        There are {wishlistItems.length.toString().padStart(2, "0")} products in this list
                    </p>

                    {/* Wishlist Table */}
                    <div className="mt-8 overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="py-3 px-4">Product Name</th>
                                    <th className="py-3 px-4">Unit Price</th>
                                    <th className="py-3 px-4">Stock Status</th>
                                    <th className="py-3 px-4">Action</th>
                                    <th className="py-3 px-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlistItems.map((item) => (
                                    <tr key={item._id} className="border-b">
                                        {/* Product */}
                                        <td className="py-4 px-4 flex items-center gap-3">
                                            <img
                                                src={item.mainImage}
                                                alt={item.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <span className="font-semibold text-gray-800">{item.name}</span>
                                        </td>

                                        {/* Unit Price */}
                                        <td className="py-4 px-4">
                                            {item.oldPrice && (
                                                <span className="line-through text-gray-400 mr-2">
                                                    Rs {item.oldPrice}
                                                </span>
                                            )}
                                            <span className="text-gray-800 font-medium">Rs {item.price}</span>
                                        </td>

                                        {/* Stock Status */}
                                        <td className="py-4 px-4">
                                            {item.stock > 0 ? (
                                                <span className="text-green-600">In Stock</span>
                                            ) : (
                                                <span className="text-red-600">Stock Out</span>
                                            )}
                                        </td>

                                        {/* Add to Cart */}
                                        <td className="py-4 px-4">
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700">
                                                Add to Cart
                                            </button>
                                        </td>

                                        {/* Delete */}
                                        <td className="py-4 px-4">
                                            <button className="text-gray-500 hover:text-red-600">
                                                🗑
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <FaHeartCrack className="text-red-500 text-6xl mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700">
                        Your wishlist is empty
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Add products to your wishlist to see them here.
                    </p>
                </div>
            )}
        </>
    );
};

export default Wishlist;
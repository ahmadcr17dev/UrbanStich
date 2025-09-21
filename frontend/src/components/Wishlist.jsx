import { useEffect, useState } from "react";
import { FaHeartCrack, FaTrash } from "react-icons/fa6";
import { Hourglass } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { ClearWishlist, RemoveFromWishlist } from "../store/wishSlice";
import { AddToCart } from "../store/cartSlice";
import { toast } from "react-hot-toast";

const Wishlist = () => {
    const [loading, setLoading] = useState(true);
    const [isClearing, setisClearing] = useState(false);
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    // Remove item from wishlist
    const HandleRemoveFromWishlist = (item) => {
        dispatch(RemoveFromWishlist({ _id: item._id, variation: item.variation }));
        toast.success(`${item.name} is removed from wishlist`);
    }

    // Remove whole wishlist
    const HandleClearWishlist = () => {
        setisClearing(true);
        toast.loading("Wishlist is clearing ...", { duration: 3000 });
        const timer = setTimeout(() => {
            dispatch(ClearWishlist());
            setisClearing(false);
            toast.success("Wishlist has been cleared");
        }, 3000);
        return () => clearInterval(timer);
    }

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
                <div className={`transition-opacity duration-1000 ${isClearing ? "opacity-0" : "opacity-100"}`}>
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
                                                <span className="text-gray-800 font-medium">Rs {(item.price - ((item.price / 100) * item.discount)).toFixed(2)}</span>
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
                                                <button
                                                    className="border border-1 border-stone-700 bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-stone-700 hover:text-white hover:cursor-pointer"
                                                >
                                                    Buy Now
                                                </button>
                                            </td>

                                            {/* Delete */}
                                            <td className="py-4 px-4">
                                                <button className="text-gray-500 hover:text-red-600 hover:cursor-pointer">
                                                    <FaTrash onClick={() => HandleRemoveFromWishlist(item)} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                className="px-12 py-3 bg-white text-black font-medium border border-2 border-red-700 rounded-lg hover:cursor-pointer hover:bg-red-700 hover:text-white transition delay-50 ease-in-out mt-6"
                                onClick={() => HandleClearWishlist()}
                            >
                                Clear Wishlist
                            </button>
                        </div>
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
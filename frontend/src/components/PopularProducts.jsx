import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaStar, FaShoppingCart, FaHeart, FaEye, FaTruck, FaTag } from "react-icons/fa";

const responsive = {
    superLargeDesktop: { // 2xl
        breakpoint: { max: 4000, min: 1536 },
        items: 5
    },
    desktop: { // xl
        breakpoint: { max: 1536, min: 1280 },
        items: 4
    },
    laptop: { // lg
        breakpoint: { max: 1280, min: 1024 },
        items: 4
    },
    tablet: { // md
        breakpoint: { max: 1024, min: 640 },
        items: 3
    },
    mobile: { // sm
        breakpoint: { max: 640, min: 0 },
        items: 2
    }
};

const PopularProducts = () => {
    const [products, setproducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/product/displayproducts").then(res => setproducts(res.data)).catch(err => console.log(err));
    }, []);

    return (
        <>
            <section className="mt-[150px] px-12">
                <h2 className="font-poppins text-center text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
                    Popular Products
                </h2>
                <p className="text-center text-green-800 font-medium font-montserrat text-sm mt-2">
                    Content means little without design, context, and clarity
                </p>
                <div>
                    <Carousel
                        responsive={responsive}
                        autoPlay={true}
                        autoPlaySpeed={2500}
                        infinite={true}
                        keyBoardControl={true}
                        customTransition="transform 700ms ease-in-out"
                        transitionDuration={700}
                        pauseOnHover={true}
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        arrows={false}
                        containerClass="pb-8"
                    >
                        {products
                            .filter(p => p.discount >= 5)
                            .map((p) => {
                                // get first variation for display
                                const firstVariation = p.variations[0] || {};
                                const mainImage = firstVariation.mainImage || "placeholder.jpg";
                                const displayPrice = firstVariation.price || p.price || 0;

                                return (
                                    <div
                                        key={p._id}
                                        className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl my-8 w-72"
                                    >
                                        {/* Product Image */}
                                        <div className="w-full h-56 bg-gray-100">
                                            <img
                                                src={`http://localhost:8080/uploads/${mainImage}`}
                                                alt={p.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-4">
                                            {/* Discount & Icons */}
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-md font-montserrat">
                                                    Up to {p.discount}% off
                                                </span>
                                                <div className="flex space-x-3 text-gray-500">
                                                    <FaEye className="cursor-pointer hover:text-black transition" />
                                                    <FaHeart className="cursor-pointer hover:text-red-500 transition" />
                                                </div>
                                            </div>

                                            {/* Product Title */}
                                            <h2 className="text-lg font-semibold text-gray-800 leading-snug line-clamp-2 font-poppins">
                                                {p.name.slice(0,22) + "..."}
                                            </h2>

                                            {/* Rating */}
                                            <div className="flex items-center space-x-1 mt-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className="text-yellow-400" />
                                                ))}
                                                <span className="ml-2 text-sm font-medium text-gray-700">5.0</span>
                                                <span className="text-gray-400 text-sm">(455)</span>
                                            </div>

                                            {/* Features */}
                                            <div className="flex justify-between mt-3 text-gray-500 text-sm">
                                                <div className="flex items-center space-x-1">
                                                    <FaTruck />
                                                    <span>Fast Delivery</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <FaTag />
                                                    <span>Best Price</span>
                                                </div>
                                            </div>

                                            {/* Price & Button */}
                                            <div className="flex flex-col mt-5 font-montserrat">
                                                <div className="flex flex-row items-center">
                                                    <span className="text-red-600 text-lg font-bold">
                                                        Rs: {(displayPrice - (displayPrice / 100) * p.discount).toFixed(2)}
                                                    </span>
                                                    {p.discount > 0 && (
                                                        <span className="ml-2 line-through text-gray-400 text-sm">
                                                            Rs: {displayPrice}
                                                        </span>
                                                    )}
                                                </div>
                                                <button className="flex items-center justify-center mt-2 py-2 space-x-2 bg-none text-green-700 border border-1 border-green-700 rounded-md hover:bg-green-700 hover:text-white hover:cursor-pointer transition">
                                                    <FaShoppingCart />
                                                    <span>Add To Cart</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </Carousel>
                </div>
            </section>
        </>
    );
}

export default PopularProducts;
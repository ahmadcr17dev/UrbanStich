import React, { useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { DecrementProduct, IncrementProduct, RemoveFromCart } from "../store/cartSlice";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaRegSadTear } from "react-icons/fa";

const Cart = () => {
    const [loading, setLoading] = useState(true);
    const CartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const HandleRemoveFromCart = (item) => {
        dispatch(RemoveFromCart({ _id: item._id, variation: item.variation }));
        toast.success(`${item.name} removed from cart`);
    };

    const HandleIncrementQuantity = (item) => {
        dispatch(IncrementProduct({ _id: item._id, variation: item.variation }));
    };

    const HandleDecrementQuantity = (item) => {
        dispatch(DecrementProduct({ _id: item._id, variation: item.variation }));
    };

    const SubTotal = CartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    )

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
            ) : (
                <section className="bg-white py-10 font-poppins">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl mb-6">
                            Shopping Cart
                        </h2>

                        {CartItems.length > 0 ? (
                            <div className="mt-4 md:gap-8 lg:flex lg:items-start xl:gap-12">
                                {/* LEFT SIDE - CART ITEMS */}
                                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                    {CartItems.map((p, index) => (
                                        <div
                                            key={index}
                                            className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
                                        >
                                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                                {/* IMAGE */}
                                                <a href="#" className="shrink-0">
                                                    <img
                                                        className="h-24 w-24 object-cover rounded-lg border"
                                                        src={p.mainImage}
                                                        alt={p.name}
                                                    />
                                                </a>

                                                {/* DETAILS */}
                                                <div className="flex-1 min-w-0 space-y-2">
                                                    <a
                                                        href="#"
                                                        className="text-lg font-medium text-gray-900 hover:text-green-700"
                                                    >
                                                        {p.name}
                                                    </a>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <button
                                                            type="button"
                                                            className="flex items-center gap-1 hover:text-green-700 hover:cursor-pointer"
                                                        >
                                                            <svg
                                                                className="h-4 w-4"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                                                />
                                                            </svg>
                                                            Add to Favorites
                                                        </button>
                                                        <FaTrash
                                                            onClick={() => HandleRemoveFromCart(p)}
                                                            className="text-red-500 hover:text-red-600 cursor-pointer"
                                                        />
                                                    </div>
                                                </div>

                                                {/* QUANTITY + PRICE */}
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center border rounded-lg overflow-hidden">
                                                        <button
                                                            type="button"
                                                            className={`px-3 py-1 text-gray-700 bg-gray-100 ${p.quantity === 1
                                                                ? "cursor-not-allowed opacity-50"
                                                                : "hover:bg-gray-200 hover:cursor-pointer"
                                                                }`}
                                                            onClick={() => HandleDecrementQuantity(p)}
                                                            disabled={p.quantity === 1}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="text"
                                                            readOnly
                                                            value={p.quantity}
                                                            className="w-12 text-center text-sm font-medium border-x bg-white"
                                                        />
                                                        <button
                                                            type="button"
                                                            className={`px-3 py-1 text-gray-700 bg-gray-100 ${p.quantity === p.variation.stock
                                                                ? "cursor-not-allowed opacity-50"
                                                                : "hover:bg-gray-200 hover:cursor-pointer"
                                                                }`}
                                                            onClick={() => {
                                                                if (p.quantity === p.variation.stock) {
                                                                    toast.error(
                                                                        `${p.name} has only ${p.variation.stock} items in stock`
                                                                    );
                                                                } else {
                                                                    HandleIncrementQuantity(p);
                                                                }
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <p className="text-lg font-bold text-gray-900">
                                                        Rs{" "}
                                                        {(
                                                            (p.price - (p.price / 100) * p.discount) *
                                                            p.quantity
                                                        ).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* RIGHT SIDE - ORDER SUMMARY */}
                                <div className="mx-auto mt-6 w-full max-w-sm lg:mt-0">
                                    <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            Order Summary
                                        </h3>

                                        <div className="space-y-3">
                                            <dl className="flex justify-between text-gray-600">
                                                <dt>Subtotal</dt>
                                                <dd className="font-medium text-gray-900">
                                                    Rs {SubTotal.toFixed(2)}
                                                </dd>
                                            </dl>
                                            <dl className="flex justify-between text-gray-600">
                                                <dt>Tax (16% GST)</dt>
                                                <dd className="font-medium text-gray-900">
                                                    Rs {((SubTotal / 100) * 16).toFixed(2)}
                                                </dd>
                                            </dl>
                                        </div>

                                        <dl className="flex justify-between border-t pt-3 text-lg font-bold text-gray-900">
                                            <dt>Total</dt>
                                            <dd>
                                                Rs {(((SubTotal / 100) * 16) + SubTotal).toFixed(2)}
                                            </dd>
                                        </dl>

                                        <button className="w-full rounded-lg bg-green-600 px-5 py-3 text-white font-medium hover:bg-green-700 transition hover:cursor-pointer">
                                            Proceed to Checkout
                                        </button>

                                        <div className="flex justify-center items-center gap-2 text-sm">
                                            <span className="text-gray-500">or</span>
                                            <a
                                                href="#"
                                                className="text-green-700 font-medium hover:underline"
                                            >
                                                Continue Shopping →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-green-600">
                                <FaRegSadTear className="mb-4 text-6xl" />
                                <p className="text-2xl font-semibold">Your Cart is Empty!</p>
                            </div>
                        )}
                    </div>
                </section>
            )};
        </>
    )
};

export default Cart;
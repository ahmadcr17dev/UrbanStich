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
                <section className="bg-white py-8 antialiased md:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                            Shopping Cart
                        </h2>

                        {CartItems.length > 0 ? (
                            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                                {/* LEFT SIDE - CART ITEMS */}
                                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                    {CartItems.map((p, index) => (
                                        <div
                                            key={index}
                                            className="space-y-6 mb-6"
                                        >
                                            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 md:p-6">
                                                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                    {/* IMAGE */}
                                                    <a href="#" className="shrink-0 md:order-1">
                                                        <img
                                                            className="h-20 w-20 object-cover"
                                                            src={p.mainImage}
                                                            alt={p.name}
                                                        />
                                                    </a>

                                                    {/* QUANTITY + PRICE */}
                                                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                        <div className="flex items-center">
                                                            <button
                                                                type="button"
                                                                id="decrement-button"
                                                                className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 ${p.quantity == 1 ? "cursor-not-allowed" : "hover:bg-gray-200 hover:cursor-pointer"}`}
                                                                onClick={() => HandleDecrementQuantity(p)} disabled={p.quantity === 1}
                                                            >
                                                                <svg
                                                                    className="h-2.5 w-2.5 text-gray-900"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 18 2"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M1 1h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <input
                                                                type="text"
                                                                id="counter-input"
                                                                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none"
                                                                value={p.quantity}
                                                                readOnly
                                                            />
                                                            <button
                                                                type="button"
                                                                id="increment-button"
                                                                className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 ${p.quantity === p.variation.stock ? "cursor-not-allowed" : "hover:bg-gray-200 hover:cursor-pointer"}`}
                                                                onClick={() => {
                                                                    if (p.quantity === p.variation.stock) {
                                                                        toast.error(`${p.name} has only ${p.variation.stock} items in stock`);
                                                                    } else {
                                                                        HandleIncrementQuantity(p);
                                                                    }
                                                                }}
                                                            >
                                                                <svg
                                                                    className="h-2.5 w-2.5 text-gray-900"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 18 18"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M9 1v16M1 9h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div className="text-end md:order-4 md:w-32">
                                                            <p className="text-base font-bold text-gray-900">
                                                                Rs: {((p.price - ((p.price / 100) * p.discount)) * p.quantity).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* DETAILS */}
                                                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                        <a
                                                            href="#"
                                                            className="text-base font-medium text-gray-900 hover:underline"
                                                        >
                                                            {p.name}
                                                        </a>

                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                                                            >
                                                                <svg
                                                                    className="me-1.5 h-5 w-5"
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

                                                            <div>
                                                                <FaTrash onClick={() => HandleRemoveFromCart(p)}
                                                                    className="inline-flex items-center text-sm font-medium text-red-500 hover:cursor-pointer" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* RIGHT SIDE - ORDER SUMMARY */}
                                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                        <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Order summary
                                        </p>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                                        Sub Total
                                                    </dt>
                                                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                        Rs 7,592.00
                                                    </dd>
                                                </dl>
                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                                        Tax (16% GST)
                                                    </dt>
                                                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                        Rs 799
                                                    </dd>
                                                </dl>
                                            </div>
                                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                                <dt className="text-base font-bold text-gray-900 dark:text-white">
                                                    Total
                                                </dt>
                                                <dd className="text-base font-bold text-gray-900 dark:text-white">
                                                    Rs 8,191.00
                                                </dd>
                                            </dl>
                                        </div>

                                        <a
                                            href="#"
                                            className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                            Proceed to Checkout
                                        </a>

                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                or
                                            </span>
                                            <a
                                                href="#"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                                            >
                                                Continue Shopping
                                                <svg
                                                    className="h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 12H5m14 0-4 4m4-4-4-4"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                        <form className="space-y-4">
                                            <div>
                                                <label
                                                    htmlFor="voucher"
                                                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Do you have a voucher or gift card?
                                                </label>
                                                <input
                                                    type="text"
                                                    id="voucher"
                                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            >
                                                Apply Code
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-screen text-green-600 text-4xl">
                                <FaRegSadTear className="mb-4" />
                                <p>Your Cart is Empty!</p>
                            </div>

                        )}
                    </div>
                </section>
            )}
        </>
    );
};

export default Cart;
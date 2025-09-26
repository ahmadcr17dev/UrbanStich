import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FiTruck, FiPercent } from "react-icons/fi";

const Checkout = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const navigate = useNavigate();
    const location = useLocation();
    // Normalize: always work with array
    const rawProducts = location.state?.products || [];
    const products = Array.isArray(rawProducts) ? rawProducts : [rawProducts];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Checkout Data:", formData, products);
        const timer = setTimeout(() => {
            toast.success("Purchase Completed");
        }, 3000);
        return () => clearInterval(timer);
    };

    // Calculate totals
    const { subtotal, tax, shipping, total } = useMemo(() => {
        let subtotalAcc = 0;

        products.forEach((p) => {
            const qty = p.quantity || 1;
            const priceAfterDiscount = p.discount
                ? p.price - (p.price * p.discount) / 100
                : p.price;
            subtotalAcc += priceAfterDiscount * qty;
        });

        const shipping = products.length > 0 ? 350 : 0;
        const tax = subtotalAcc / 100 * 5;
        const total = subtotalAcc + shipping + tax;

        return {
            subtotal: subtotalAcc.toFixed(2),
            tax: tax.toFixed(2),
            shipping: shipping.toFixed(2),
            total: total.toFixed(2),
        };
    }, [products]);

    return (
        <>
            <div className="bg-gray-50 py-10 font-poppins">
                <div className="max-w-6xl mx-auto bg-white p-8 shadow-xl rounded-2xl border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                        🛒 Product Checkout with Shipping Details
                    </h2>

                    <form
                        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                        onSubmit={handleSubmit}
                    >
                        {/* Left Side - Delivery Details + Payment */}
                        <div className="lg:col-span-2">
                            {/* Delivery Details */}
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">
                                Delivery Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {["firstName", "lastName", "email", "phone", "address", "city", "state", "zip"].map((field, i) => (
                                    <input
                                        key={i}
                                        type={field === "email" ? "email" : "text"}
                                        name={field}
                                        placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        value={formData[field]}
                                        onChange={handleChange}
                                        required
                                    />
                                ))}
                            </div>

                            {/* Payment Section */}
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Payment</h3>
                            <div className="flex gap-6 items-center mb-4">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="payment" defaultChecked />
                                    <span className="text-gray-700">Card</span>
                                </label>
                                {/* Card Icons */}
                                <div className="flex gap-2">
                                    <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8" />
                                    <img src="https://img.icons8.com/color/48/mastercard.png" alt="MasterCard" className="h-8" />
                                    <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className="h-8" />
                                    <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" className="h-8" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {["cardName", "cardNumber", "expiry", "cvv"].map((field, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        name={field}
                                        placeholder={`Enter ${field}`}
                                        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        value={formData[field]}
                                        onChange={handleChange}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="bg-gray-100 border px-6 py-2 rounded-lg hover:bg-gray-200 transition hover:cursor-pointer"
                                    onClick={() => navigate("/shop")}
                                >
                                    ← Continue Shopping
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Order Summary */}
                        <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg border border-green-100">
                            {/* Header */}
                            <h3 className="text-xl font-bold mb-6 text-green-800 flex items-center gap-2">
                                <FaShoppingCart className="w-6 h-6 text-green-600" />
                                Order Summary
                            </h3>

                            {/* List all products */}
                            <div className="space-y-4">
                                {products.map((p, index) => {
                                    const qty = p.quantity || 1;
                                    const priceAfterDiscount = p.discount
                                        ? p.price - (p.price * p.discount) / 100
                                        : p.price;
                                    const lineTotal = (priceAfterDiscount * qty).toFixed(2);

                                    return (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center border-b pb-3"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">{p.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    Qty: {qty} ×{" "}
                                                    <span className="text-green-700 font-medium">
                                                        Rs {priceAfterDiscount.toFixed(2)}
                                                    </span>
                                                </p>
                                            </div>
                                            <span className="font-semibold text-green-900">
                                                Rs {lineTotal}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Totals */}
                            <div className="mt-6 border-t pt-4 space-y-3">
                                <div className="flex justify-between text-sm text-gray-700">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-900">Rs {subtotal}</span>
                                </div>

                                <div className="flex justify-between text-sm text-gray-700">
                                    <span className="flex items-center gap-1">
                                        <FiTruck className="text-green-600" />
                                        Shipping{" "}
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                            Standard
                                        </span>
                                    </span>
                                    <span className="font-semibold text-gray-900">Rs {shipping}</span>
                                </div>

                                <div className="flex justify-between text-sm text-gray-700">
                                    <span className="flex items-center gap-1">
                                        <FiPercent className="text-green-600" /> Tax (5% GST)
                                    </span>
                                    <span className="font-semibold text-gray-900">Rs {tax}</span>
                                </div>

                                <div className="flex justify-between items-center font-bold text-lg text-green-900 border-t pt-3">
                                    <span>Total</span>
                                    <span className="text-xl">Rs {total}</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium shadow-md transition">
                                Submit Order →
                            </button>
                        </div>
                        {/* Order Summary */}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Checkout;
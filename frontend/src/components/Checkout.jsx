import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";

const Checkout = () => {
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const location = useLocation();

    // Get product passed from Buy Now
    const product = location.state?.product;
    // Loader delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // Totals
    const subtotal = product ? product.price * (product.quantity || 1) : 0;
    const shipping = product ? 6 : 0;
    const tax = product ? 5 : 0;
    const total = subtotal + shipping + tax;

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
                <div className="min-h-screen bg-gray-50 flex justify-center p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                        {/* Left: Cart Summary */}
                        <div className="md:col-span-1 bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-lg font-semibold mb-4">Your Order</h2>

                            {product && (
                                <div className="flex items-center gap-4">
                                    <img
                                        src={product.mainImage}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded-md border"
                                    />
                                    <div>
                                        <p className="font-medium">{product.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Quantity {product.quantity || 1}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-700">
                                            Price ${product.price}
                                        </p>
                                        {product.variation && (
                                            <p className="text-xs text-gray-500">
                                                {product.variation.color} / {product.variation.size}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Totals */}
                            <div className="border-t border-gray-200 mt-6 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-gray-900 text-base">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
                                Complete Purchase
                            </button>
                        </div>

                        {/* Right: Delivery + Payment */}
                        <div className="md:col-span-2 bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <input type="text" placeholder="First Name" className="border p-2 rounded-md w-full" required />
                                <input type="text" placeholder="Last Name" className="border p-2 rounded-md w-full" />
                                <input type="email" placeholder="Email" className="border p-2 rounded-md w-full" />
                                <input type="text" placeholder="Phone No." className="border p-2 rounded-md w-full" />
                                <input type="text" placeholder="Address Line" className="border p-2 rounded-md w-full md:col-span-2" />
                                <input type="text" placeholder="City" className="border p-2 rounded-md w-full" />
                                <input type="text" placeholder="State" className="border p-2 rounded-md w-full" />
                                <input type="text" placeholder="Zip Code" className="border p-2 rounded-md w-full" />
                            </form>

                            <h2 className="text-lg font-semibold mb-4">Payment</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <label
                                    className={`border rounded-md p-4 flex items-center gap-2 cursor-pointer ${paymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={paymentMethod === "card"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span className="font-medium">Pay with debit or credit card</span>
                                </label>
                                <label
                                    className={`border rounded-md p-4 flex items-center gap-2 cursor-pointer ${paymentMethod === "paypal" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="paypal"
                                        checked={paymentMethod === "paypal"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span className="font-medium">Pay with PayPal</span>
                                </label>
                            </div>

                            <h2 className="text-lg font-semibold mb-2">Promo Code</h2>
                            <div className="flex gap-2">
                                <input type="text" placeholder="Promo code" className="border p-2 rounded-md w-full" />
                                <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Checkout;
import { useRef, useEffect, useState } from "react";
import urbanstichlogo from "../images/urbanstichlogo.png";
import loginimage from "../images/loginimage.jpg";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, handleLoginSuccess }) => {
    const modalRef = useRef(null);
    const [formdata, setFormdata] = useState({
        username: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();

    // Close modal if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose && onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setMessageType("");

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata)
            });

            const data = await response.json();

            if (response.ok) {
                setMessageType("success");
                setMessage("Login successful!");

                // Store token & role in localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);

                // Call parent function so App can also handle role
                if (handleLoginSuccess) {
                    handleLoginSuccess(data.role);
                }

                // Navigate directly based on role
                setTimeout(() => {
                    if (data.role === "Admin") {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                    onClose && onClose();
                }, 3000)
            } else {
                setMessageType("failure");
                setMessage(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Error: ", error.message);
            setMessageType("failure");
            setMessage("Server error. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-lg transform transition-all duration-300 scale-100 font-montserrat w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-5xl flex flex-col md:flex-row overflow-hidden"
            >
                {/* Left Image */}
                <div className="md:w-1/2 w-full h-40 md:h-auto">
                    <img
                        src={loginimage}
                        alt="Login Visual"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Form */}
                <div className="md:w-1/2 w-full p-6 sm:p-8">
                    <div className="mb-4 flex justify-center">
                        <img
                            src={urbanstichlogo}
                            alt="Site Logo"
                            className="w-[140px] sm:w-[180px] lg:w-[200px] xl:w-[220px]"
                        />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-green-700 text-center">
                        Glad to see you back!
                    </h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full border px-3 py-2 rounded focus:outline-none focus:border-green-500"
                            required
                            name="username"
                            value={formdata.username}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border px-3 py-2 rounded focus:outline-none focus:border-green-500"
                            required
                            name="password"
                            value={formdata.password}
                            onChange={handleChange}
                        />

                        {message && (
                            <p
                                className={
                                    messageType === "success"
                                        ? "text-green-600 font-medium text-[13px]"
                                        : "text-red-600 font-medium text-[13px]"
                                }
                            >
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-none text-green-800 font-medium px-4 py-2 border border-1 border-green-700 rounded hover:bg-green-700 hover:text-white transition-colors hover:cursor-pointer"
                        >
                            Login
                        </button>
                    </form>

                    <div className="flex justify-between text-[13px] mt-4">
                        <span className="text-gray-500">Don’t have an account?</span>
                        <button
                            className="text-green-700 font-medium hover:cursor-pointer"
                            onClick={() => {
                                onClose();
                                document.dispatchEvent(
                                    new CustomEvent("openRegisterModal")
                                );
                            }}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaArrowLeft, FaShoppingBag, FaUser, FaMapMarkerAlt, FaCheckCircle, FaTruck, FaPhone } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [isOrdered, setIsOrdered] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!customerName || !address || !phone) {
            alert('Please fill in all details');
            return;
        }

        setLoading(true);

        try {
            // 1. Save order to backend
            const orderData = {
                customerName,
                customerPhone: phone,
                deliveryAddress: address,
                items: cartItems,
                totalAmount: cartTotal
            };

            const response = await api.post('/api/orders', orderData);

            // 2. Prepare items list for WhatsApp
            const itemsList = cartItems.map(item => `- ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`).join('%0A');
            const message = `Hello! 👋 I've placed an order HA-${response.data.orderNumber || ''}:%0A%0A` +
                `🛒 *Order Details:*%0A${itemsList}%0A%0A` +
                `📍 *Delivery to:*%0A` +
                `*Customer:* ${customerName}%0A` +
                `*Phone:* ${phone}%0A` +
                `*Address:* ${address}%0A%0A` +
                `💰 *Total Amount:* ₹${cartTotal}%0A%0A` +
                `Please confirm my order. Thank you!`;

            // 3. Open WhatsApp and complete flow
            const whatsappUrl = `https://wa.me/919579316818?text=${message}`;
            window.open(whatsappUrl, '_blank');
            setIsOrdered(true);
            clearCart();
        } catch (error) {
            console.error('Order placement failed:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isOrdered) {
        return (
            <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center px-4 bg-white">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <FaCheckCircle size={60} />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-4">Order Placed Successfully!</h1>
                    <p className="text-xl text-gray-500 font-bold mb-10 max-w-lg mx-auto">
                        Your professional agricultural order has been sent to our team. We will contact you shortly for delivery details.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/" className="btn btn-primary px-10 py-4 rounded-2xl shadow-xl shadow-primary-200">
                            Back to Home
                        </Link>
                        <Link to="/products" className="btn bg-gray-100 text-gray-800 px-10 py-4 rounded-2xl hover:bg-gray-200 transition-all font-black">
                            Order More
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center px-4">
                <FaShoppingBag className="text-6xl text-gray-200 mb-6" />
                <h2 className="text-2xl font-black text-gray-400 mb-4 text-center">Your cart is empty</h2>
                <Link to="/products" className="btn btn-primary px-8 py-3 rounded-xl">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#FCFCFC] min-h-screen pt-28 pb-32">
            <div className="container-custom max-w-5xl mx-auto">
                <div className="mb-10">
                    <button
                        onClick={() => navigate('/cart')}
                        className="flex items-center gap-2 text-gray-400 hover:text-primary-600 transition-colors mb-4 font-black uppercase tracking-widest text-xs"
                    >
                        <FaArrowLeft /> Back to Cart
                    </button>
                    <h1 className="text-4xl font-black text-gray-900">Secure Checkout</h1>
                </div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-3 space-y-8">
                        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center shadow-inner">
                                    <FaUser size={20} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 leading-none">Shipping Details</h2>
                                    <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-tight">Tell us where to send your products</p>
                                </div>
                            </div>

                            <form onSubmit={handlePlaceOrder} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest px-1 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 focus:ring-4 focus:ring-primary-50 focus:border-primary-500 outline-none transition-all font-bold"
                                            placeholder="John Doe"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest px-1 ml-1">Phone Number</label>
                                        <div className="relative">
                                            <FaPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                            <input
                                                type="tel"
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-6 focus:ring-4 focus:ring-primary-50 focus:border-primary-500 outline-none transition-all font-bold"
                                                placeholder="+91 98765 43210"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 uppercase tracking-widest px-1 ml-1">Delivery Address</label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-6 top-5 text-gray-300" />
                                        <textarea
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-6 focus:ring-4 focus:ring-primary-50 focus:border-primary-500 outline-none transition-all font-bold min-h-[120px] resize-none"
                                            placeholder="Enter your full village, taluka, and district name..."
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ y: -4, scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    disabled={loading}
                                    type="submit"
                                    className={`w-full py-5 rounded-[1.5rem] text-xl font-black shadow-xl shadow-primary-100 flex items-center justify-center gap-4 transition-all ${loading ? 'bg-gray-400' : 'bg-primary-600 text-white hover:bg-black'}`}
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Place Order <FaTruck />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </section>
                    </div>

                    {/* Summary Section */}
                    <div className="lg:col-span-2">
                        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 sticky top-28">
                            <h2 className="text-2xl font-black text-gray-900 mb-8 px-2">Order Summary</h2>

                            <div className="max-h-[300px] overflow-y-auto pr-2 mb-8 space-y-4 custom-scrollbar">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white shadow-sm border border-gray-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h4 className="font-black text-gray-900 text-sm truncate">{item.name}</h4>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-xs font-bold text-gray-400">Qty: {item.quantity}</span>
                                                <span className="font-black text-gray-800">₹{item.price * item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 p-4 bg-gray-50 rounded-[1.5rem]">
                                <div className="flex justify-between font-bold text-gray-500 text-sm">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between font-bold text-gray-500 text-sm">
                                    <span>Tax (Included)</span>
                                    <span>₹0</span>
                                </div>
                                <div className="flex justify-between font-bold text-gray-500 text-sm">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-black">FREE</span>
                                </div>
                                <div className="h-px bg-gray-200 my-4"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Total to Pay</span>
                                    <span className="text-4xl font-black text-primary-600">₹{cartTotal}</span>
                                </div>
                            </div>

                            <p className="text-center text-[10px] text-gray-400 mt-6 font-black uppercase tracking-[0.2em]">
                                Cash on Delivery Available
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaCreditCard } from 'react-icons/fa';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4">
            <div className="container-custom max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 mb-2">Your Shopping Cart</h1>
                        <p className="text-gray-500 font-bold">You have {cartCount} items in your basket</p>
                    </div>
                    <Link to="/products" className="flex items-center gap-2 text-primary-600 font-black hover:gap-3 transition-all">
                        <FaArrowLeft /> Continue Shopping
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-gray-200"
                    >
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <FaShoppingBag size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800 mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 font-bold mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Browse our professional agricultural products.</p>
                        <Link to="/products" className="btn btn-primary px-10 py-4 rounded-2xl shadow-xl shadow-primary-200">
                            Start Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6"
                                    >
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow text-center sm:text-left">
                                            <h3 className="text-xl font-black text-gray-900 mb-1">{item.name}</h3>
                                            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-3">{item.category}</p>
                                            <div className="flex items-center justify-center sm:justify-start gap-4">
                                                <div className="flex items-center bg-gray-100 rounded-xl px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                                                    >
                                                        <FaMinus size={12} />
                                                    </button>
                                                    <span className="w-10 text-center font-black text-gray-800">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                                                    >
                                                        <FaPlus size={12} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-400 hover:text-red-600 transition-colors p-2"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-2xl font-black text-gray-900">₹{item.price * item.quantity}</p>
                                            <p className="text-xs text-gray-400 font-bold">₹{item.price} per unit</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl sticky top-28">
                                <h3 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between font-bold text-gray-500">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-gray-500">
                                        <span>Delivery</span>
                                        <span className="text-green-600">FREE</span>
                                    </div>
                                    <div className="h-px bg-gray-100 my-6"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-400 font-black uppercase tracking-widest text-sm">Total Amount</span>
                                        <span className="text-4xl font-black text-primary-600">₹{cartTotal}</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/checkout')}
                                    className="w-full btn btn-primary py-5 rounded-2xl text-xl font-black shadow-xl shadow-primary-200 flex items-center justify-center gap-3"
                                >
                                    <FaCreditCard /> Checkout Now
                                </motion.button>

                                <p className="text-center text-xs text-gray-400 mt-6 font-bold uppercase tracking-tight">
                                    Secured Checkout Process
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;

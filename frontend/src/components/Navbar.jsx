import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaConciergeBell, FaBoxOpen, FaStore, FaPhone, FaRobot, FaSearch, FaHistory, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import logo1 from '../assets/logo1.png';
import logoJpeg from '../assets/logo.jpeg';

const Navbar = () => {
    // Navbar component
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { cartCount } = useCart();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home', icon: <FaHome /> },
        { path: '/about', label: 'About', icon: <FaInfoCircle /> },
        { path: '/discover', label: 'Smart Assistant', icon: <FaSearch /> },

        { path: '/products', label: 'Products', icon: <FaBoxOpen /> },
        { path: '/retail-services', label: 'Retail', icon: <FaStore /> },
        { path: '/contact', label: 'Contact', icon: <FaPhone /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${scrolled ? 'pt-4' : 'pt-0'
                    }`}
            >
                <div
                    className={`
                        relative flex items-center justify-between px-6 transition-all duration-300
                        ${scrolled
                            ? 'w-[95%] max-w-6xl bg-white/80 backdrop-blur-md shadow-lg rounded-full py-2 border border-white/20'
                            : 'w-full bg-transparent py-4 container-custom'
                        }
                    `}
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group z-50">
                        <div className="flex items-center -space-x-2">
                            <img
                                src={logo1}
                                alt="Himalaya Agro"
                                className={`relative z-10 transition-all duration-300 ${scrolled ? 'h-12' : 'h-20'} w-auto object-contain`}
                            />
                            <img
                                src={logoJpeg}
                                alt="Sahasya Farmers Produce"
                                className={`relative z-0 transition-all duration-300 ${scrolled ? 'h-10' : 'h-16'} w-auto object-contain rounded-full`}
                            />
                        </div>
                        {!scrolled && (
                            <div className="hidden lg:block text-gray-900 drop-shadow-sm">
                                <h1 className="font-display font-bold text-xl leading-none">Himalaya Agro</h1>
                                <p className="text-[0.6rem] font-bold text-green-700 uppercase tracking-wide mt-0.5">Sahasya Farmers Produce PVT LTD</p>
                            </div>
                        )}
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2 bg-gray-100/10 p-1 rounded-full backdrop-blur-sm">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`
                                    relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                                    ${isActive(link.path)
                                        ? 'text-white shadow-md'
                                        : 'text-gray-900 hover:bg-gray-100/50'
                                    }
                                `}
                            >
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="activeNavPill"
                                        className="absolute inset-0 bg-primary-600 rounded-full -z-10"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Cart Icon & CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/cart" className="relative p-3 text-gray-900 hover:text-primary-600 transition-colors">
                            <FaShoppingBag size={22} />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link
                            to="/contact"
                            className={`
                                btn rounded-full px-6 py-2 text-sm font-bold transition-transform hover:scale-105
                                ${scrolled
                                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                                    : 'bg-white text-primary-600 hover:bg-gray-100 shadow-lg'
                                }
                            `}
                        >
                            Partner With Us
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 rounded-full transition-colors z-50 ${isOpen ? 'text-gray-900 bg-white shadow-md' : 'text-gray-900 bg-white/50 backdrop-blur-sm'
                            }`}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl p-6 flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                                <img src={logo1} alt="Himalaya Agro" className="h-16 w-auto" />
                                <Link to="/cart" className="relative p-2 text-gray-900">
                                    <FaShoppingBag size={20} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Menu</span>
                            </div>

                            <div className="flex flex-col space-y-2 flex-grow">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={link.path}
                                            className={`
                                                flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all
                                                ${isActive(link.path)
                                                    ? 'bg-primary-50 text-primary-600 shadow-inner'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                }
                                            `}
                                        >
                                            <span className={`text-xl ${isActive(link.path) ? 'text-primary-600' : 'text-gray-400'}`}>
                                                {link.icon}
                                            </span>
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <Link
                                    to="/contact"
                                    className="btn btn-primary w-full justify-center rounded-xl py-3 text-lg shadow-lg shadow-primary-200/50"
                                >
                                    Get Started Today
                                </Link>
                                <p className="text-center text-xs text-gray-400 mt-4">
                                    &copy; 2026 Himalaya Agro
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaLeaf, FaHeart } from 'react-icons/fa';
import logo1 from '../assets/logo1.png';
import logoJpeg from '../assets/logo.jpeg';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="flex items-center -space-x-1">
                                <img src={logo1} alt="Himalaya Agro" className="h-10 w-auto object-contain" />
                                <img src={logoJpeg} alt="Sahasya Farmers Produce" className="h-8 w-auto object-contain rounded-full" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold font-display leading-tight">Himalaya Agro</h2>
                                <p className="text-[0.6rem] text-gray-400 font-bold uppercase tracking-wider">Sahasya Farmers Produce PVT LTD</p>
                            </div>
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Empowering farmers with quality products, expert advice, and comprehensive agricultural solutions since inception.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                                    <Icon className="text-sm" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Smart Assistant', path: '/discover' },
                                { name: 'Contact', path: '/contact' }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.path} className="text-gray-400 hover:text-primary-500 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Product Categories - Update this as needed */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Products</h3>
                        <ul className="space-y-4">
                            {[
                                'Fertilizers & Nutrients',
                                'Crop Protection',
                                'Seeds & Implements',
                                'Farm Machinery',
                                'Organic Products'
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link to="/products" className="text-gray-400 hover:text-primary-500 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Support</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <span className="text-primary-500 font-bold">Address:</span>
                                📍 Address: H. NO. 180/1/K/2 NEAR RADHAKRUSHNA HOTEL, PUNE ROAD, VENEGAON, Tembhurni (Solapur), Solapur, Madha, Maharashtra, India, 413211
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary-500 font-bold">Phone:</span>
                                +91 95793 16818
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary-500 font-bold">Email:</span>
                                himalayaagro7441@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
                    <p className="flex flex-wrap items-center justify-center gap-2">
                        &copy; {new Date().getFullYear()} Himalaya Agro Pvt Ltd & Sahasya Farmers Produce PVT LTD. All rights reserved.
                        <span className="hidden md:inline">|</span>
                        Made with <FaHeart className="text-red-500 animate-pulse" /> for Farmers
                        <span className="hidden md:inline">|</span>
                        <a href="http://localhost:5174" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">Admin Login</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaSeedling, FaStore, FaHandshake, FaLeaf } from 'react-icons/fa';
import zeptoLogo from '../assets/zepto-logo.png';
import tataStarLogo from '../assets/tata-star-logo.png';
import kisanKonnectLogo from '../assets/kisan-konnect-logo.png';
import swiggyLogo from '../assets/swiggy-logo.png';
import amazonLogo from '../assets/amazon-logo.png';
import bigbasketLogo from '../assets/bigbasket-logo.png';

const Home = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const vendorPartners = [
        { name: "Zepto", logo: zeptoLogo, type: "image" },
        { name: "Tata Star", logo: tataStarLogo, type: "image" },
        { name: "Kisan Konnect", logo: kisanKonnectLogo, type: "image" },
        { name: "Swiggy", logo: swiggyLogo, type: "image" },
        { name: "Amazon", logo: amazonLogo, type: "image" },
        { name: "BigBasket", logo: bigbasketLogo, type: "image" },
        { name: "Reliance", type: "text", color: "text-blue-600" },
        { name: "Vegrow", type: "text", color: "text-green-600" },
        { name: "Shtayushi Organic", type: "text", color: "text-emerald-700" }
    ];

    const services = [
        {
            title: "Himalaya Agri Mall",
            icon: <FaStore className="w-8 h-8" />,
            desc: "One-stop shop for all agricultural needs"
        },
        {
            title: "Himalaya E-Mart",
            icon: <FaLeaf className="w-8 h-8" />,
            desc: "Digital platform for easy ordering"
        },
        {
            title: "Himalaya Varadhi",
            icon: <FaHandshake className="w-8 h-8" />,
            desc: "Connecting farmers to markets"
        },
        {
            title: "Farm Services",
            icon: <FaSeedling className="w-8 h-8" />,
            desc: "Direct on-field support & advisory"
        }
    ];

    return (
        <div className="w-full overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1625246333195-5848c4282185?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Agriculture Field"
                        className="w-full h-full object-cover opacity-40 hover:scale-105 transition-transform duration-[20s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
                </div>

                <div className="container-custom relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            A One-Stop Solution <br />
                            <span className="text-green-400">Platform for Farmers</span>
                        </h1>
                        <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
                            From seeds to post-harvest solutions - we provide the best quality products
                            and services to enhance agricultural productivity and farmer prosperity.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/discover" className="btn btn-primary text-lg px-8 py-4 bg-green-500 hover:bg-green-600 border-none shadow-xl shadow-green-500/20">
                                Smart Assistant
                            </Link>
                            <Link to="/products" className="btn bg-white/20 backdrop-blur-md text-white hover:bg-white/30 text-lg px-8 py-4 border border-white/30">
                                View Catalog
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                        <div className="w-1 h-3 bg-white rounded-full"></div>
                    </div>
                </motion.div>
            </section>

            {/* About Preview */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={fadeIn}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                                About <span className="text-primary-600">Himalaya Agro</span> & <span className="text-green-700">Sahasya Farmers Produce</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Welcome to Himalaya Agro Pvt Ltd and Sahasya Farmers Produce PVT LTD, your trusted partners in bringing the freshest,
                                highest-quality vegetables directly from farm to table. We bridge the gap between
                                hardworking farmers and conscious consumers using technology and expertise.
                            </p>
                            <Link to="/about" className="text-primary-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                                Learn More About Us <FaArrowRight />
                            </Link>
                        </motion.div>
                        <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Farmers in field"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Comprehensive Solutions</h2>
                        <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="text-primary-600 mb-4 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{service.desc}</p>
                                <Link to="/services" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                                    Read More →
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding bg-primary-900 text-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Quality Assurance", icon: "⭐" },
                            { title: "Free Delivery", icon: "🚚" },
                            { title: "Expert Guidance", icon: "👨‍🌾" },
                            { title: "Best Prices", icon: "💰" },
                        ].map((item, idx) => (
                            <div key={idx} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/20 transition-all">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Vendor Partners - Infinite Carousel */}
            <section className="py-20 bg-gray-50 overflow-hidden">
                <div className="container-custom mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Trusted Network</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Connecting farmers with the world's leading retail and logistics partners.</p>
                </div>

                <div className="relative flex overflow-x-hidden">
                    <motion.div
                        animate={{
                            x: [0, -1800],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                        className="flex gap-8 whitespace-nowrap"
                    >
                        {/* Double the list for seamless loop */}
                        {[...vendorPartners, ...vendorPartners].map((partner, idx) => (
                            <div
                                key={idx}
                                className="inline-flex items-center justify-center px-12 py-8 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default group min-w-[200px]"
                            >
                                {partner.type === 'image' ? (
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-16 w-auto object-contain"
                                    />
                                ) : (
                                    <span className={`text-2xl font-bold ${partner.color} tracking-tight`}>
                                        {partner.name}
                                    </span>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;

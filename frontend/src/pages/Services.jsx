import { motion } from 'framer-motion';
import { FaStore, FaShoppingCart, FaTruck, FaLeaf, FaHandsHelping, FaSeedling, FaTree } from 'react-icons/fa';

const Services = () => {
    const services = [
        {
            title: "Himalaya Agri Mall",
            icon: <FaStore className="w-12 h-12 text-primary-600 mb-4" />,
            description: "A one-stop solution for all agricultural inputs and needs.",
            features: [
                "Wide range of fertilizers & pesticides",
                "High-quality seeds",
                "Farm tools & machinery",
                "Expert consultation available"
            ]
        },
        {
            title: "Himalaya E-Mart",
            icon: <FaShoppingCart className="w-12 h-12 text-primary-600 mb-4" />,
            description: "Digital platform for easy ordering and delivery.",
            features: [
                "Order online 24/7",
                "Doorstep delivery",
                "Secure payments",
                "Real-time tracking"
            ]
        },
        {
            title: "Himalaya Varadhi",
            icon: <FaHandsHelping className="w-12 h-12 text-primary-600 mb-4" />,
            description: "Connecting farmers directly to markets and opportunities.",
            features: [
                "Market linkage support",
                "Fair price discovery",
                "Supply chain optimization",
                "Direct farmer-to-buyer connection"
            ]
        },
        {
            title: "Himalaya Farm Services",
            icon: <FaTree className="w-12 h-12 text-primary-600 mb-4" />,
            description: "Comprehensive on-field support and advisory.",
            features: [
                "Soil testing & analysis",
                "Crop advisory",
                "Modern farming techniques",
                "Yield improvement plans"
            ]
        }
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-primary-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>
                <div className="container-custom relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Our Comprehensive Agricultural Solutions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-primary-100 max-w-2xl mx-auto"
                    >
                        Empowering farmers with end-to-end services from sowing to selling.
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="bg-primary-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                                <p className="text-gray-600 mb-6">{service.description}</p>
                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-green-600 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to transform your farming?</h2>
                    <button className="bg-white text-green-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-green-50 transition-colors shadow-lg">
                        Contact Us Today
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Services;

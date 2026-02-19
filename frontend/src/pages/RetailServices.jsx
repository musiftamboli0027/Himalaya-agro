import { motion } from 'framer-motion';
import {
    FaSeedling, FaUserTie, FaMobileAlt, FaFlask,
    FaHeadset, FaChalkboardTeacher, FaBoxOpen,
    FaTruck, FaHandshake
} from 'react-icons/fa';

const RetailServices = () => {
    const services = [
        {
            title: "Complete Range of Agri Inputs",
            description: "One-stop shop for seeds, fertilizers, pesticides, and farm equipment.",
            icon: <FaBoxOpen />
        },
        {
            title: "Farm Advisory Services",
            description: "Expert guidance on crop management and disease control.",
            icon: <FaUserTie />
        },
        {
            title: "Digital Technology Based Advisory",
            description: "Smart farming solutions using modern technology.",
            icon: <FaMobileAlt />
        },
        {
            title: "Soil Tests",
            description: "Comprehensive soil health analysis for better yield.",
            icon: <FaFlask />
        },
        {
            title: "Hello Himalaya (24/7 Support)",
            description: "Round-the-clock assistance for all your farming queries.",
            icon: <FaHeadset />
        },
        {
            title: "Consultancy Service",
            description: "Professional consultation for large-scale farming projects.",
            icon: <FaChalkboardTeacher />
        },
        {
            title: "Seedlings",
            description: "High-quality, disease-resistant seedlings for various crops.",
            icon: <FaSeedling />
        },
        {
            title: "Output Linkage",
            description: "Connecting your harvest to the right markets.",
            icon: <FaHandshake />
        },
        {
            title: "Door Delivery",
            description: "Hassle-free delivery of agri-inputs to your doorstep.",
            icon: <FaTruck />
        }
    ];

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="bg-primary-900 text-white py-20">
                <div className="container-custom text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Our Retail Services
                    </motion.h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                        Delivering excellence through our comprehensive retail network.
                    </p>
                </div>
            </section>

            {/* Numbered List Grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="relative p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg hover:bg-green-50 transition-all duration-300 group"
                            >
                                {/* Number Badge */}
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md group-hover:bg-green-500 transition-colors">
                                    {(index + 1).toString().padStart(2, '0')}
                                </div>

                                <div className="text-4xl text-primary-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RetailServices;

import { motion } from 'framer-motion';
import { FaUsers, FaLeaf, FaBox, FaClock, FaEye, FaBullseye, FaHandHoldingHeart, FaLightbulb, FaAward } from 'react-icons/fa';
import about1 from '../assets/about-1.jpg';
import about2 from '../assets/about-2.jpg';
import about3 from '../assets/about-3.jpg';
import about4 from '../assets/about-4.jpg';

const About = () => {
    const stats = [
        { label: "Farmers Served", value: "10,000+", icon: <FaUsers /> },
        { label: "Products Available", value: "500+", icon: <FaBox /> },
        { label: "Expert Advisors", value: "50+", icon: <FaLeaf /> },
        { label: "Support", value: "24/7", icon: <FaClock /> },
    ];

    const values = [
        { title: "Integrity", icon: <FaHandHoldingHeart />, desc: "Honesty in every interaction." },
        { title: "Quality", icon: <FaAward />, desc: "Only the best for our farmers." },
        { title: "Innovation", icon: <FaLightbulb />, desc: "Modern solutions for modern farming." },
        { title: "Customer Focus", icon: <FaUsers />, desc: "Your success is our priority." },
    ];

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="bg-primary-900 text-white py-20">
                <div className="container-custom text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-white"
                    >
                        About Himalaya Agro & Sahasya Farmers Produce
                    </motion.h1>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                        Empowering agriculture through innovation, quality, and commitment.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-padding bg-white">
                <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="grid grid-cols-2 gap-4">
                        <motion.img
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            src={about1}
                            alt="Farmers Growing Program"
                            className="rounded-2xl shadow-lg w-full h-48 md:h-64 object-cover transform md:translate-y-8"
                        />
                        <motion.img
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            src={about2}
                            alt="Himalaya Agro Team"
                            className="rounded-2xl shadow-lg w-full h-48 md:h-64 object-cover"
                        />
                        <motion.img
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            src={about3}
                            alt="Field Inspection"
                            className="rounded-2xl shadow-lg w-full h-48 md:h-64 object-cover"
                        />
                        <motion.img
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            src={about4}
                            alt="Happy Farmers"
                            className="rounded-2xl shadow-lg w-full h-48 md:h-64 object-cover transform md:-translate-y-8"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Welcome to Himalaya Agro Pvt Ltd and Sahasya Farmers Produce PVT LTD, your trusted partners in bringing the freshest,
                            highest-quality vegetables directly from farm to table. We are dedicated to bridging
                            the gap between hardworking farmers and conscious consumers throughout the region.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Since our inception, we have served over 200,000 farmers directly, established
                            500+ retail outlets, and introduced more than 1000 product varieties to the market.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-primary-900 text-white py-16">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-4xl text-green-400 mb-2 flex justify-center">{stat.icon}</div>
                                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                <div className="text-gray-300 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-500">
                            <div className="flex items-center gap-4 mb-4">
                                <FaEye className="text-4xl text-green-600" />
                                <h3 className="text-2xl font-bold">Our Vision</h3>
                            </div>
                            <p className="text-gray-600">
                                To be the leading agro-solutions provider, recognized for transforming the way
                                agriculture is practiced and adding value to every stakeholder in the ecosystem.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-primary-600">
                            <div className="flex items-center gap-4 mb-4">
                                <FaBullseye className="text-4xl text-primary-600" />
                                <h3 className="text-2xl font-bold">Our Mission</h3>
                            </div>
                            <p className="text-gray-600">
                                To deliver premium fresh vegetables and agricultural inputs while empowering farmers
                                through education, technology, and fair market access.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section-padding bg-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((item, idx) => (
                            <div key={idx} className="p-6 bg-green-50 rounded-xl hover:shadow-lg transition-all">
                                <div className="text-4xl text-primary-600 mb-4 flex justify-center">{item.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

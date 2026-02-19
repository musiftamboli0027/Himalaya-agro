import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert('Thank you for contacting us! We will get back to you soon.');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="bg-primary-900 text-white py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-xl text-primary-100">We'd love to hear from you. Get in touch!</p>
            </section>

            <div className="container-custom py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
                        <p className="text-gray-600">
                            Have questions about our products or services? Our team is here to help you grow.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="bg-white p-3 rounded-full shadow-sm text-primary-600">
                                    <FaMapMarkerAlt size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Our Location</h3>
                                    <p className="text-gray-600">H. NO. 180/1/K/2 NEAR RADHAKRUSHNA HOTEL, PUNE ROAD, VENEGAON, Tembhurni (Solapur)<br />Solapur, Madha, Maharashtra, India, 413211</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="bg-white p-3 rounded-full shadow-sm text-primary-600">
                                    <FaPhone size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Phone</h3>
                                    <p className="text-gray-600">+91 95793 16818</p>

                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="bg-white p-3 rounded-full shadow-sm text-primary-600">
                                    <FaEnvelope size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Email</h3>
                                    <p className="text-gray-600">himalayaagro7441@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                            <div className="flex gap-4">
                                {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, idx) => (
                                    <a key={idx} href="#" className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                                        <Icon />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 rounded-2xl shadow-xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="Your Phone"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="input resize-none"
                                    placeholder="How can we help you?"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary w-full">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-96 w-full bg-gray-200 relative grayscale">
                <iframe
                    src="https://maps.google.com/maps?q=H.%20NO.%20180%2F1%2FK%2F2%20NEAR%20RADHAKRUSHNA%20HOTEL%2C%20PUNE%20ROAD%2C%20VENEGAON%2C%20Tembhurni%20(Solapur)%2C%20Solapur%2C%20Madha%2C%20Maharashtra%2C%20India%2C%20413211&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Map"
                ></iframe>
            </div>

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/919579316818"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 animate-bounce"
            >
                <FaWhatsapp size={32} />
            </a>
        </div>
    );
};

export default Contact;

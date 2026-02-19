import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaFilter, FaSearch, FaLeaf, FaFlask, FaSeedling, FaTractor, FaBolt, FaCheckCircle, FaCarrot, FaAppleAlt, FaLemon } from 'react-icons/fa';
import { GiWheat, GiCorn } from 'react-icons/gi';
import ProductCard from '../components/ProductCard';
import { getProducts, MOCK_PRODUCTS } from '../services/api';
import Loader from '../components/Loader';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = [
        {
            id: 'vegetables',
            name: "Vegetables",
            icon: <FaCarrot />,
            desc: "Fresh farm vegetables",
            badges: ["Fresh", "Organic"]
        },
        {
            id: 'fruits',
            name: "Fruits",
            icon: <FaAppleAlt />,
            desc: "Seasonal fresh fruits",
            badges: ["Sweet", "Natural"]
        },
        {
            id: 'grains',
            name: "Grains",
            icon: <GiWheat />,
            desc: "Staple food grains",
            badges: ["Whole", "Healthy"]
        },
        {
            id: 'millets',
            name: "Millets",
            icon: <GiCorn />,
            desc: "Nutritious millets",
            badges: ["Superfood", "Gluten-Free"]
        }
    ];


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                // Merge backend data with manual data, filtering out fertilizers, growth boosters, seeds, etc.
                const excludedCategories = ['Fertilizer', 'Growth Booster', 'Pest Control', 'Micronutrients', 'Soil Conditioner', 'Fertilizers', 'Pesticides', 'Seeds', 'Equipment', 'machinery', 'Farm Machinery'];
                const allProducts = [...MOCK_PRODUCTS, ...(Array.isArray(data) ? data : [])];
                const filtered = allProducts.filter(p => !excludedCategories.includes(p.category));
                setProducts(filtered);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products", error);
                // Fallback to just MOCK_PRODUCTS if backend fails
                const excludedCategories = ['Fertilizer', 'Growth Booster', 'Pest Control', 'Micronutrients', 'Soil Conditioner', 'Fertilizers', 'Pesticides', 'Seeds', 'Equipment', 'machinery', 'Farm Machinery'];
                const filtered = MOCK_PRODUCTS.filter(p => !excludedCategories.includes(p.category));
                setProducts(filtered);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedCategory === 'All' || product.category === selectedCategory)
    );

    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            {/* Header */}
            <section className="bg-primary-900 text-white py-16">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold mb-4">Our Product Categories</h1>
                    <p className="text-gray-300">Choose from our wide range of high-quality agricultural products.</p>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="container-custom -mt-10 mb-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedCategory(cat.name)} // Simple filter logic
                            className={`bg-white p-6 rounded-xl shadow-lg cursor-pointer transition-all border-2 ${selectedCategory === cat.name ? 'border-green-500 ring-2 ring-green-200' : 'border-transparent hover:border-green-200'}`}
                        >
                            <div className="text-3xl text-primary-600 mb-3">{cat.icon}</div>
                            <h3 className="font-bold text-lg mb-2">{cat.name}</h3>
                            <p className="text-sm text-gray-500 mb-3">{cat.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {cat.badges.map((badge, bIdx) => (
                                    <span key={bIdx} className="text-[10px] px-2 py-1 bg-green-50 text-green-700 rounded-full font-medium border border-green-100">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Products List */}
            <section className="container-custom pb-20">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold">Featured Products</h2>
                    <div className="relative w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white border rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-64"
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>

                {/* Quick Filter Tabs */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                    {['All', 'Vegetables', 'Fruits', 'Grains', 'Millets'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${selectedCategory === cat
                                ? 'bg-green-600 text-white border-green-600 shadow-md'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-600 hover:shadow-sm'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <Loader />
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product._id || product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <p className="text-gray-500 text-lg">No products found.</p>
                        <p className="text-sm text-gray-400 mt-2">Try adjusting your search or category.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Products;

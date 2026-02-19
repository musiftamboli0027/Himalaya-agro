import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaArrowLeft, FaCheckCircle, FaStar } from 'react-icons/fa';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Simulate API fetch by ID
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // In real app: await getProductById(id)
                await new Promise(resolve => setTimeout(resolve, 600));

                const foundProduct = MOCK_PRODUCTS.find(p => p.id === id);

                if (!foundProduct) {
                    navigate('/products'); // Redirect if not found
                    return;
                }

                setProduct(foundProduct);

                // Find related products
                const related = MOCK_PRODUCTS
                    .filter(p => p.category === foundProduct.category && p.id !== id)
                    .slice(0, 3);
                setRelatedProducts(related);

            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        // Reset scroll to top
        window.scrollTo(0, 0);
    }, [id, navigate]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`${product.name} added to cart!`);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/checkout');
    };

    if (loading) return <Loader fullScreen />;
    if (!product) return null;

    return (
        <div className="bg-[#FCFCFC] min-h-screen pt-28 pb-20">
            <div className="container-custom max-w-6xl mx-auto">
                {/* Breadcrumb replacement */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary-600 transition-all font-black uppercase tracking-widest text-[10px] mb-10"
                >
                    <FaArrowLeft /> Back to Catalog
                </button>

                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 overflow-hidden border border-gray-100">
                    <div className="grid md:grid-cols-2">
                        {/* Image Section */}
                        <div className="p-8 md:p-12 bg-gray-50 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative aspect-square w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary-600 shadow-lg border border-primary-50">
                                        {product.category}
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col">
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'} size={14} />
                                        ))}
                                    </div>
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{product.rating} (Verified Reviews)</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-4">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl font-black text-primary-600">
                                        ₹{product.price}
                                    </span>
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${product.stock === 'In Stock'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-amber-500 text-white'
                                        }`}>
                                        {product.stock}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-500 text-lg font-bold leading-relaxed mb-10 border-l-4 border-primary-200 pl-6 py-2">
                                {product.description}
                                <br /><br />
                                <span className="text-base text-gray-400 font-medium">Standard packaging. Premium quality assured by Himalaya Agro experts.</span>
                            </p>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-6 mb-10 bg-gray-50 w-fit p-2 rounded-2xl border border-gray-100">
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest px-4">Quantity</span>
                                <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-all font-black"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center font-black text-gray-900 text-lg border-x border-gray-50 inline-block align-middle leading-[3rem]">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-all font-black"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-10 mt-auto">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 py-5 bg-gray-900 text-white rounded-2xl font-black text-xl shadow-2xl shadow-gray-200 hover:bg-black transition-all flex items-center justify-center gap-3"
                                >
                                    <FaShoppingBag /> Add to Cart
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-1 py-5 bg-primary-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-primary-200 hover:bg-primary-700 transition-all"
                                >
                                    Buy it Now
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pb-2 border-t border-gray-50 pt-8">
                                <div className="flex items-start gap-3">
                                    <div className="bg-green-50 p-2 rounded-full text-green-600">
                                        <FaCheckCircle size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight">Free Delivery</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">On orders over ₹2000</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-green-50 p-2 rounded-full text-green-600">
                                        <FaCheckCircle size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight">Verified Quality</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Certified by AGMARK</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24 mb-12">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 mb-2">Related Products</h2>
                                <div className="w-12 h-1 bg-primary-600 rounded-full"></div>
                            </div>
                            <Link to="/products" className="text-gray-400 font-black uppercase tracking-widest text-xs hover:text-primary-600 transition-colors">See all →</Link>
                        </div>
                        <div className="grid md:grid-cols-3 gap-10">
                            {relatedProducts.map((p, idx) => (
                                <ProductCard key={p.id} product={p} index={idx} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;

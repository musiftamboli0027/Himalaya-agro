import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaSearch } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, index = 0 }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { _id, id: propId, name, category, price, image, stock, rating } = product;
    const id = _id || propId;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        alert(`${name} added to cart!`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card card-hover group"
        >
            {/* Product Image */}
            <div className="relative overflow-hidden aspect-square bg-gray-100 rounded-t-2xl">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => e.target.src = 'https://placehold.co/400?text=Image+Not+Found'}
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${stock === 'In Stock'
                            ? 'bg-green-500 text-white'
                            : 'bg-amber-500 text-white'
                            }`}
                    >
                        {stock}
                    </span>
                </div>

                {/* Quick Action Button */}
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-4 right-4 bg-white text-primary-600 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-all duration-300 hover:bg-primary-600 hover:text-white"
                >
                    <FaShoppingBag />
                </button>
            </div>

            {/* Product Info */}
            <div className="p-6">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-tight line-clamp-2">
                        {name}
                    </h3>
                </div>

                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3">
                    {category}
                </p>

                {/* Price & Rating */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-gray-900">
                            ₹{price}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Per Unit</span>
                    </div>

                    {rating && (
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                            <span className="text-xs font-black text-amber-700">{rating}</span>
                            <span className="text-amber-400 text-xs">★</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                    <Link
                        to={`/products/${id}`}
                        className="flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                    >
                        <FaSearch size={12} /> Details
                    </Link>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center justify-center gap-2 py-3 bg-primary-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-100 hover:bg-black transition-all"
                    >
                        <FaShoppingBag size={12} /> Add
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;

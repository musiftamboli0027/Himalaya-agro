import axios from 'axios';

// Base API URL - Update this with your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with error status
            console.error('API Error:', error.response.data);
        } else if (error.request) {
            // Request made but no response
            console.error('Network Error:', error.message);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// ============================================
// PRODUCT ENDPOINTS
// ============================================

/**
 * Fetch all products with optional filters
 * @param {Object} params - Query parameters (category, search, page, limit)
 * @returns {Promise} - Products data
 */
export const getProducts = async (params = {}) => {
    try {
        const response = await api.get('/api/products', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Fetch single product by ID
 * @param {string} id - Product ID
 * @returns {Promise} - Product data
 */
export const getProductById = async (id) => {
    try {
        const response = await api.get(`/api/products/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Fetch products by category
 * @param {string} category - Category name
 * @returns {Promise} - Products data
 */
export const getProductsByCategory = async (category) => {
    try {
        const response = await api.get('/api/products', {
            params: { category }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Search products
 * @param {string} query - Search query
 * @returns {Promise} - Products data
 */
export const searchProducts = async (query) => {
    try {
        const response = await api.get('/api/products/search', {
            params: { q: query }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ============================================
// CONTACT ENDPOINTS
// ============================================

/**
 * Submit contact form
 * @param {Object} data - Contact form data
 * @returns {Promise} - Response data
 */
export const submitContactForm = async (data) => {
    try {
        const response = await api.post('/api/contact', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Submit product inquiry
 * @param {Object} data - Inquiry data
 * @returns {Promise} - Response data
 */
export const submitInquiry = async (data) => {
    try {
        const response = await api.post('/api/inquiries', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ============================================
// TRACEABILITY ENDPOINTS
// ============================================

/**
 * Get specific lot by public code
 * @param {string} code - Lot Code (e.g. LOT-20240101-1234)
 */
export const getLotByCode = (code) => api.get(`/api/traceability/public/${code}`);

// ============================================
// AI RECOMMENDATION ENDPOINTS
// ============================================

/**
 * Get AI crop recommendations
 * @param {Object} data - Crop and soil data
 * @returns {Promise} - AI recommendations
 */
export const getAIRecommendations = async (data) => {
    try {
        const response = await api.post('/api/ai/recommend', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ============================================
// MOCK DATA (for development without backend)
// ============================================

/**
 * Mock products data for development
 */
export const MOCK_PRODUCTS = [
    { id: 'f1', name: "Fresh Apples", category: "Fruits", price: 180, image: "/products/img-1.jpg", stock: "In Stock", rating: 4.8, description: "Premium quality fresh apples from our local farms." },
    { id: 'v7', name: "Green Capsicum", category: "Vegetables", price: 80, image: "/products/img-2.jpg", stock: "In Stock", rating: 4.7, description: "Fresh green capsicum rich in vitamins." },
    { id: 'f9', name: "Custard Apple", category: "Fruits", price: 100, image: "/products/img-3.jpg", stock: "In Stock", rating: 4.7, description: "Sweet and creamy custard apples." },
    { id: 'f4', name: "Fresh Coconut", category: "Fruits", price: 40, image: "/products/img-4.jpg", stock: "In Stock", rating: 4.7, description: "Fresh and tender coconut." },
    { id: 'f2', name: "Banana Bunch", category: "Fruits", price: 50, image: "/products/img-5.jpg", stock: "In Stock", rating: 4.6, description: "Ripened naturally bananas." },
    { id: 'v11', name: "Fresh Drumstick", category: "Vegetables", price: 90, image: "/products/img-6.jpg", stock: "In Stock", rating: 4.3, description: "Nutritious drumsticks for your meals." },
    { id: 'v9', name: "Large Garlic", category: "Vegetables", price: 150, image: "/products/img-7.jpg", stock: "In Stock", rating: 4.9, description: "Strong flavored large garlic cloves." },
    { id: 'v8', name: "Organic Ginger", category: "Vegetables", price: 120, image: "/products/img-8.jpg", stock: "In Stock", rating: 4.8, description: "Freshly harvested organic ginger." },
    { id: 'v4', name: "Lady's Finger", category: "Vegetables", price: 60, image: "/products/img-9.jpg", stock: "In Stock", rating: 4.2, description: "Fresh okra for healthy cooking." },
    { id: 'f8', name: "Pink Guava", category: "Fruits", price: 60, image: "/products/img-10.jpg", stock: "In Stock", rating: 4.5, description: "Sweet pink guavas." },
    { id: 'v5', name: "Fresh Cabbage", category: "Vegetables", price: 45, image: "/products/img-11.jpg", stock: "In Stock", rating: 4.1, description: "Crispy fresh cabbage." },
    { id: 'v10', name: "Seedless Lemon", category: "Vegetables", price: 10, image: "/products/img-12.jpg", stock: "In Stock", rating: 4.5, description: "Juicy seedless lemons." },
    { id: 'f3', name: "Premium Mangoes", category: "Fruits", price: 120, image: "/products/img-13.jpg", stock: "In Stock", rating: 4.9, description: "Best quality seasonal mangoes." },
    { id: 'f6', name: "Green Grapes", category: "Fruits", price: 90, image: "/products/img-14.jpg", stock: "In Stock", rating: 4.6, description: "Sweet seedless green grapes." },
    { id: 'v3', name: "Red Onions", category: "Vegetables", price: 50, image: "/products/img-15.jpg", stock: "In Stock", rating: 4.4, description: "Fresh red onions." },
    { id: 'v1', name: "Red Tomato", category: "Vegetables", price: 45, image: "/products/tomato.jpeg", stock: "In Stock", rating: 4.1, description: "Ripe red tomatoes." },
    { id: 'v2', name: "Wheat", category: "Grains", price: 45, image: "/products/wheat.jpeg", stock: "In Stock", rating: 4.1, description: "High quality wheat grains." },
    { id: 'm1', name: "Rice", category: "Grains", price: 45, image: "/products/rice.jpeg", stock: "In Stock", rating: 4.1, description: "High quality rice grains." },
    { id: 'm2', name: "Jawar", category: "Grains", price: 45, image: "/products/jawar.jpeg", stock: "In Stock", rating: 4.1, description: "High quality jawar grains." },
    { id: 'm3', name: "Potato", category: "Vegetables", price: 45, image: "/products/potato.jpeg", stock: "In Stock", rating: 4.1, description: "High quality potato grains." },
    { id: 'm4', name: "Cauliflower", category: "Vegetables", price: 45, image: "/products/flower.jpeg", stock: "In Stock", rating: 4.1, description: "High quality cauliflower." },
    { id: 'm5', name: "Pear", category: "Fruits", price: 45, image: "/products/pear.jpeg", stock: "In Stock", rating: 4.1, description: "High quality pear." },
    { id: 'm6', name: "Pomegranate", category: "Fruits", price: 45, image: "/products/Pomegranate.jpeg", stock: "In Stock", rating: 4.1, description: "High quality pomegranate." },
    // Smart Discovery Products
    { id: 'sg1', name: "NitroBoost Sugarcane Special", category: "Fertilizer", image: "/products/img-6.jpg", price: 1200, description: "Excellent for sugarcane stem thickness and height." },
    { id: 'sg2', name: "CaneMax Yield Booster", category: "Growth Booster", image: "/products/img-8.jpg", price: 850, description: "Boosts sugar recovery and leaf health." },
    { id: 'sg3', name: "StemGuard Pro", category: "Pest Control", image: "/products/img-2.jpg", price: 1500, description: "Protects against early stem borer and pests." },
    { id: 'sg4', name: "MicroPlus Zinc-Iron Mix", category: "Micronutrients", image: "/products/img-11.jpg", price: 600, description: "Prevents yellowing and ensures deep green foliage." },
    { id: 'sg5', name: "BlackSoil Conditioner", category: "Soil Conditioner", image: "/products/img-12.jpg", price: 950, description: "Improves soil aeration and water retention." },
    { id: 'wh1', name: "Wheat Power Fertilizer", category: "Fertilizer", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80", price: 1100, description: "Supports grain filling and root strength." },
    { id: 'wh2', name: "Wheat Growth Hormone", category: "Growth Booster", image: "https://images.unsplash.com/photo-1621255535380-6020586e3f19?w=400&q=80", price: 700, description: "Uniform crop growth and better tilthing." },
    { id: 'wh3', name: "RustAway Protection", category: "Pest Control", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&q=80", price: 1300, description: "Complete protection against wheat rust and mildew." },
    { id: 'ri1', name: "Paddy Master Fertilizers", category: "Fertilizer", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80", price: 1150, description: "Ideal for nursery and transplanting stages." },
    { id: 'ri2', name: "GrainFull Booster", category: "Growth Booster", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=400&q=80", price: 750, description: "Increases panicle weight and grain quality." },
    { id: 'ri3', name: "StemBorer Shield", category: "Pest Control", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&q=80", price: 1600, description: "Long-lasting protection from paddy stem borers." },
    { id: 'on1', name: "BulbMax Potash Special", category: "Fertilizer", image: "/products/img-15.jpg", price: 1300, description: "Increases bulb size, color and shelf life." },
    { id: 'on2', name: "Onion Green Booster", category: "Growth Booster", image: "https://images.unsplash.com/photo-1618318182749-ded144b2f293?w=400&q=80", price: 650, description: "Stronger roots and better nutrient uptake." },
    { id: 'on3', name: "ThripsGuard Liquid", category: "Pest Control", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&q=80", price: 1100, description: "Effective control of thrips and purple blotch." },
    { id: 'ct1', name: "Cotton Gold Fertilizer", category: "Fertilizer", image: "https://images.unsplash.com/photo-1594904351111-a072f80b1a11?w=400&q=80", price: 1250, description: "Better boll formation and fiber quality." },
    { id: 'ct2', name: "BollGuard Plus", category: "Growth Booster", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&q=80", price: 900, description: "Reduces boll shedding and improves growth." },
    { id: 'ct3', name: "PinkBollworm Shield", category: "Pest Control", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&q=80", price: 1800, description: "Targeted protection against bollworms." },
    { id: 'ct4', name: "Cotton Zinc Solution", category: "Micronutrients", image: "/products/img-11.jpg", price: 550, description: "Prevents zinc deficiency in cotton plants." },
    { id: 'to1', name: "Veggie Master NPK", category: "Fertilizer", image: "https://images.unsplash.com/photo-1546473427-e1ad0c40e674?w=400&q=80", price: 980, description: "Essential nutrients for heavy fruiting." },
    { id: 'to2', name: "FruitSet Magic", category: "Growth Booster", image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&q=80", price: 720, description: "Improves fruit size and sugar content." },
    { id: 'to3', name: "BlightStop Liquid", category: "Pest Control", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&q=80", price: 1150, description: "Protects against early and late blight." },
    { id: 'to4', name: "Tomato Soil Vital", category: "Soil Conditioner", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c3a9?w=400&q=80", price: 800, description: "Maintains ideal pH for vegetable roots." },
    { id: 'gen1', name: "Universal Crop Multiplier", category: "Growth Booster", image: "/products/img-2.jpg", price: 1800, description: "General purpose growth enhancer for all crops." },
    {
        id: '1',
        name: 'Organic Wheat Seeds',
        category: 'Seeds',
        price: 450,
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500',
        description: 'High-quality organic wheat seeds for optimal yield',
        stock: 'In Stock',
        rating: 4.5,
    },
    {
        id: '2',
        name: 'NPK Fertilizer',
        category: 'Fertilizers',
        price: 850,
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500',
        description: 'Balanced NPK fertilizer for all crops',
        stock: 'In Stock',
        rating: 4.7,
    },
    {
        id: '3',
        name: 'Organic Pesticide',
        category: 'Pesticides',
        price: 650,
        image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500',
        description: 'Eco-friendly pesticide for crop protection',
        stock: 'Limited Stock',
        rating: 4.3,
    },
    {
        id: '4',
        name: 'Drip Irrigation Kit',
        category: 'Equipment',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500',
        description: 'Complete drip irrigation system for efficient watering',
        stock: 'In Stock',
        rating: 4.8,
    },
    {
        id: '5',
        name: 'Hybrid Tomato Seeds',
        category: 'Seeds',
        price: 350,
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500',
        description: 'Disease-resistant hybrid tomato seeds',
        stock: 'In Stock',
        rating: 4.6,
    },
    {
        id: '6',
        name: 'Vermicompost',
        category: 'Fertilizers',
        price: 400,
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
        description: 'Premium quality vermicompost for soil enrichment',
        stock: 'In Stock',
        rating: 4.9,
    },
];

export default api;

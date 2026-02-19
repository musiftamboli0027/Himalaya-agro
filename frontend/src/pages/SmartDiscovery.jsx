import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaSeedling, FaMapMarkedAlt, FaCloudSun, FaChartArea,
    FaChevronRight, FaChevronLeft, FaSearch, FaCheckCircle,
    FaInfoCircle, FaWhatsapp, FaShoppingCart, FaArrowLeft, FaStar, FaMagic, FaHistory
} from 'react-icons/fa';
import { GiWheat, GiCorn, GiCottonFlower, GiSugarCane } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const translations = {
    en: {
        title: "Smart Crop Assistant",
        subtitle: "Personalized product recommendations for your unique farm needs",
        steps: ["Select Crop", "Soil Type", "Season", "Land Area", "Results"],
        next: "Next Step",
        back: "Go Back",
        searchCrop: "Search for your crop...",
        enterArea: "Enter land area size",
        acres: "Acres",
        hectares: "Hectares",
        recommendedFor: "Personalized Recommendations for",
        estimatedCost: "Total Investment",
        benefit: "Expected Benefit",
        addToCart: "Add to Cart",
        addAllToCart: "Add All Recommended to Cart",
        orderWhatsapp: "Buy Now",
        quantity: "Recommended Quantity",
        quantityLabel: "Rec. Dose",
        purpose: "Key Benefit",
        confidence: "Match Accuracy",
        high: "Highly Recommended",
        medium: "Suitable",
        seasonalWarning: "Seasonal Note: Ensure optimal moisture during this period.",
        bestForSoil: "Ideal for your soil",
        recommendedBadge: "Recommended for your crop",
        bestChoice: "Best Choice",
        soils: {
            black: { name: "Black Soil", desc: "High moisture retention, rich in lime and iron." },
            red: { name: "Red Soil", desc: "Good drainage, responsive to irrigation and fertilizers." },
            sandy: { name: "Sandy Soil", desc: "Quick drainage, needs frequent nutrient application." },
            loamy: { name: "Loamy Soil", desc: "Perfect mix of sand, silt and clay for high yields." }
        },
        seasons: {
            kharif: { name: "Kharif", desc: "Monsoon (June - Oct)" },
            rabi: { name: "Rabi", desc: "Winter (Nov - Feb)" },
            zaid: { name: "Zaid", desc: "Summer (Mar - June)" }
        }
    },
    hi: {
        title: "स्मार्ट फसल सहायक",
        subtitle: "आपकी खेत की अनूठी जरूरतों के लिए व्यक्तिगत उत्पाद सिफारिशें",
        steps: ["फसल चुनें", "मिट्टी", "मौसम", "भूमि क्षेत्र", "परिणाम"],
        next: "अगला कदम",
        back: "पीछे जाएं",
        searchCrop: "अपनी फसल खोजें...",
        enterArea: "जमीन का क्षेत्रफल दर्ज करें",
        acres: "एकड़",
        hectares: "हेक्टेयर",
        recommendedFor: "आपके लिए अनुशंसित उत्पाद",
        estimatedCost: "कुल निवेश",
        benefit: "अपेक्षित लाभ",
        addToCart: "कार्ट में जोड़ें",
        addAllToCart: "सभी अनुशंसित जोड़ें",
        orderWhatsapp: "अभी खरीदें",
        quantity: "अनुशंसित मात्रा",
        quantityLabel: "खुराक",
        purpose: "मुख्य लाभ",
        confidence: "मैच सटीकता",
        high: "अत्यधिक अनुशंसित",
        medium: "उपयुक्त",
        seasonalWarning: "मौसमी नोट: इस अवधि के दौरान इष्टतम नमी सुनिश्चित करें।",
        bestForSoil: "आपकी मिट्टी के लिए आदर्श",
        recommendedBadge: "आपकी फसल के लिए अनुशंसित",
        bestChoice: "सबसे अच्छा विकल्प",
        soils: {
            black: { name: "काली मिट्टी", desc: "नमी धारण क्षमता अधिक, चूने और लोहे से भरपूर।" },
            red: { name: "लाल मिट्टी", desc: "अच्छा जल निकासी, सिंचाई के प्रति संवेदनशील।" },
            sandy: { name: "रेतीली मिट्टी", desc: "जल्दी जल निकासी, पोषक तत्वों की बार-बार आवश्यकता।" },
            loamy: { name: "दोमट मिट्टी", desc: "रेत, गाद और मिट्टी का सही मिश्रण।" }
        },
        seasons: {
            kharif: { name: "खरीफ", desc: "मानसून (जून - अक्टूबर)" },
            rabi: { name: "रबी", desc: "सर्दियों (नवंबर - फरवरी)" },
            zaid: { name: "जायद", desc: "गर्मी (मार्च - जून)" }
        }
    },
    mr: {
        title: "स्मार्ट पीक सहाय्यक",
        subtitle: "तुमच्या शेतीच्या गरजेनुसार वैयक्तिक उत्पादन शिफारसी",
        steps: ["पीक निवडा", "माती", "हंगाम", "क्षेत्र", "निकाल"],
        next: "पुढील पाऊल",
        back: "मागे जा",
        searchCrop: "तुमचे पीक शोधा...",
        enterArea: "जमीन क्षेत्र प्रविष्ट करा",
        acres: "एकर",
        hectares: "हेक्टर",
        recommendedFor: "तुमच्यासाठी शिफारस केलेली उत्पादने",
        estimatedCost: "एकूण गुंतवणूक",
        benefit: "अपेक्षित फायदा",
        addToCart: "कार्टमध्ये जोडा",
        addAllToCart: "सर्व शिफारस केलेले जोडा",
        orderWhatsapp: "आत्ता खरेदी करा",
        quantity: "शिफारस केलेली मात्रा",
        quantityLabel: "डोस",
        purpose: "मुख्य फायदा",
        confidence: "शिफारस अचूकता",
        high: "अत्यंत शिफारस केलेले",
        medium: "योग्य",
        seasonalWarning: "हंगामी सूचना: या काळात जमिनीतील ओलावा टिकवून ठेवा.",
        bestForSoil: "तुमच्या मातीसाठी उत्तम",
        recommendedBadge: "तुमच्या पिकासाठी शिफारस केलेले",
        bestChoice: "उत्कृष्ट निवड",
        soils: {
            black: { name: "काळी माती", desc: "ओलावा टिकवून ठेवते, चुना आणि लोहाने समृद्ध." },
            red: { name: "लाल माती", desc: "पाण्याचा निचरा होणारी, खतांना उत्तम प्रतिसाद देणारी." },
            sandy: { name: "रेताड माती", desc: "लवकर कोरडी होणारी, खतांची वारंवार गरज." },
            loamy: { name: "लोमी माती", desc: "वाळू आणि मातीचे योग्य मिश्रण, भरघोस उत्पन्नासाठी." }
        },
        seasons: {
            kharif: { name: "खरीप", desc: "पावसाळा (जून - ऑक्टोबर)" },
            rabi: { name: "रब्बी", desc: "हिवाळा (नोव्हेंबर - फेब्रुवारी)" },
            zaid: { name: "उन्हाळी", desc: "उन्हाळा (मार्च - जून)" }
        }
    }
};

const crops = [
    { id: 'sugarcane', name: { en: "Sugarcane", hi: "गन्ना", mr: "ऊस" }, icon: <GiSugarCane />, image: "/products/img-1.jpg" },
    { id: 'wheat', name: { en: "Wheat", hi: "गेहूं", mr: "गहू" }, icon: <GiWheat />, image: "/products/wheat1.jpg" },
    { id: 'rice', name: { en: "Rice", hi: "चावल", mr: "तांदूळ" }, icon: <GiCorn />, image: "/products/rice.jpeg" },
    { id: 'onion', name: { en: "Onion", hi: "प्याज", mr: "कांदा" }, icon: <FaSeedling />, image: "/products/img-15.jpg" },
    { id: 'cotton', name: { en: "Cotton", hi: "कपास", mr: "कापूस" }, icon: <GiCottonFlower />, image: "https://images.unsplash.com/photo-1594904351111-a072f80b1a11?w=400&q=80" },
    { id: 'tomato', name: { en: "Tomato", hi: "टमाटर", mr: "टोमॅटो" }, icon: <FaSeedling />, image: "https://images.unsplash.com/photo-1546473427-e1ad0c40e674?w=400&q=80" }
];

const recommendationLogic = (data) => {
    const { crop, soil, season, area, unit } = data;
    const factor = unit === 'hectares' ? 2.47 : 1;
    const totalAcres = parseFloat(area || 0) * factor;

    const baseSuggestions = {
        sugarcane: [
            { id: 'sg1', name: "NitroBoost Sugarcane Special", category: "Fertilizer", image: "/products/img-6.jpg", dose: 50, price: 1200, reason: "Excellent for sugarcane stem thickness and height.", badge: "Main Nutrition", isTop: true },
            { id: 'sg2', name: "CaneMax Yield Booster", category: "Growth Booster", image: "/products/img-8.jpg", dose: 10, price: 850, reason: "Boosts sugar recovery and leaf health." },
            { id: 'sg3', name: "StemGuard Pro", category: "Pest Control", image: "/products/img-2.jpg", dose: 2, price: 1500, reason: "Protects against early stem borer and pests." },
            { id: 'sg4', name: "MicroPlus Zinc-Iron Mix", category: "Micronutrients", image: "/products/img-11.jpg", dose: 5, price: 600, reason: "Prevents yellowing and ensures deep green foliage." },
            { id: 'sg5', name: "BlackSoil Conditioner", category: "Soil Conditioner", image: "/products/img-12.jpg", dose: 25, price: 950, reason: "Improves soil aeration and water retention.", hidden: soil !== 'black' }
        ],
        wheat: [
            { id: 'wh1', name: "Wheat Power Fertilizer", category: "Fertilizer", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80", dose: 40, price: 1100, reason: "Supports grain filling and root strength.", badge: "High Performance", isTop: true },
            { id: 'wh2', name: "Wheat Growth Hormone", category: "Growth Booster", image: "https://images.unsplash.com/photo-1621255535380-6020586e3f19?w=400&q=80", dose: 5, price: 700, reason: "Uniform crop growth and better tilthing." },
            { id: 'wh3', name: "RustAway Protection", category: "Pest Control", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&q=80", dose: 1.5, price: 1300, reason: "Complete protection against wheat rust and mildew." }
        ],
        rice: [
            { id: 'ri1', name: "Paddy Master Fertilizers", category: "Fertilizer", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80", dose: 45, price: 1150, reason: "Ideal for nursery and transplanting stages.", badge: "Farmer's Choice", isTop: true },
            { id: 'ri2', name: "GrainFull Booster", category: "Growth Booster", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=400&q=80", dose: 8, price: 750, reason: "Increases panicle weight and grain quality." },
            { id: 'ri3', name: "StemBorer Shield", category: "Pest Control", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&q=80", dose: 2.5, price: 1600, reason: "Long-lasting protection from paddy stem borers." }
        ],
        onion: [
            { id: 'on1', name: "BulbMax Potash Special", category: "Fertilizer", image: "/products/img-15.jpg", dose: 35, price: 1300, reason: "Increases bulb size, color and shelf life.", badge: "Premium Yield", isTop: true },
            { id: 'on2', name: "Onion Green Booster", category: "Growth Booster", image: "https://images.unsplash.com/photo-1618318182749-ded144b2f293?w=400&q=80", dose: 5, price: 650, reason: "Stronger roots and better nutrient uptake." },
            { id: 'on3', name: "ThripsGuard Liquid", category: "Pest Control", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&q=80", dose: 1, price: 1100, reason: "Effective control of thrips and purple blotch." }
        ],
        cotton: [
            { id: 'ct1', name: "Cotton Gold Fertilizer", category: "Fertilizer", image: "https://images.unsplash.com/photo-1594904351111-a072f80b1a11?w=400&q=80", dose: 50, price: 1250, reason: "Better boll formation and fiber quality.", badge: "High Yield", isTop: true },
            { id: 'ct2', name: "BollGuard Plus", category: "Growth Booster", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&q=80", dose: 12, price: 900, reason: "Reduces boll shedding and improves growth." },
            { id: 'ct3', name: "PinkBollworm Shield", category: "Pest Control", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&q=80", dose: 3, price: 1800, reason: "Targeted protection against bollworms." },
            { id: 'ct4', name: "Cotton Zinc Solution", category: "Micronutrients", image: "/products/img-11.jpg", dose: 4, price: 550, reason: "Prevents zinc deficiency in cotton plants." }
        ],
        tomato: [
            { id: 'to1', name: "Veggie Master NPK", category: "Fertilizer", image: "https://images.unsplash.com/photo-1546473427-e1ad0c40e674?w=400&q=80", dose: 30, price: 980, reason: "Essential nutrients for heavy fruiting.", badge: "Organic Based", isTop: true },
            { id: 'to2', name: "FruitSet Magic", category: "Growth Booster", image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&q=80", dose: 6, price: 720, reason: "Improves fruit size and sugar content." },
            { id: 'to3', name: "BlightStop Liquid", category: "Pest Control", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&q=80", dose: 1.2, price: 1150, reason: "Protects against early and late blight." },
            { id: 'to4', name: "Tomato Soil Vital", category: "Soil Conditioner", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c3a9?w=400&q=80", dose: 15, price: 800, reason: "Maintains ideal pH for vegetable roots." }
        ]
    };

    const suggestions = baseSuggestions[crop] || [
        { id: 'gen1', name: "Universal Crop Multiplier", category: "Growth Booster", image: "/products/img-2.jpg", dose: 20, price: 1800, reason: "General purpose growth enhancer for all crops.", badge: "Top Rated", isTop: true }
    ];

    return suggestions
        .filter(s => !s.hidden)
        .map(s => ({
            ...s,
            quantity: Math.ceil(s.dose * totalAcres),
            totalCost: Math.ceil(s.price * totalAcres),
            displayArea: area,
            displayUnit: unit
        }));
};

const SmartDiscovery = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [step, setStep] = useState(1);
    const [lang, setLang] = useState('en');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddingAll, setIsAddingAll] = useState(false);
    const [selection, setSelection] = useState({
        crop: '',
        soil: '',
        season: '',
        area: '',
        unit: 'acres'
    });

    const t = translations[lang];
    const filteredCrops = crops.filter(c =>
        c.name[lang].toLowerCase().includes(searchQuery.toLowerCase())
    );

    const nextStep = () => setStep(s => Math.min(s + 1, 5));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleAddAll = () => {
        setIsAddingAll(true);
        const recommendations = recommendationLogic(selection);
        recommendations.forEach(rec => {
            addToCart({
                id: rec.id,
                name: rec.name,
                price: rec.price,
                image: rec.image,
                category: rec.category
            }, rec.quantity);
        });
        setTimeout(() => {
            setIsAddingAll(false);
            navigate('/cart');
        }, 1200);
    };

    const renderProgress = () => (
        <div className="mb-12">
            <div className="flex justify-between items-center max-w-2xl mx-auto relative px-4">
                <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-200 -translate-y-1/2 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((step - 1) / (t.steps.length - 1)) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                {t.steps.map((s, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-4 ${i + 1 <= step
                                ? 'bg-green-600 text-white border-green-100 shadow-lg'
                                : 'bg-white text-gray-400 border-gray-100'
                                }`}
                        >
                            {i + 1 < step ? <FaCheckCircle className="text-xl" /> : i + 1}
                        </motion.div>
                        <span className={`text-[10px] sm:text-xs mt-3 font-black uppercase tracking-widest hidden sm:block ${i + 1 <= step ? 'text-green-700' : 'text-gray-400'
                            }`}>{s}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFDFD] pt-24 pb-20 px-4">
            <div className="container-custom max-w-6xl mx-auto">

                {/* Header & Lang Toggle */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 max-w-4xl mx-auto">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-green-100 shadow-sm">
                            <FaMagic /> Powered by Smart Discovery
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-[1.1]">
                            {t.title}
                        </h1>
                        <p className="text-gray-500 font-bold text-base">{t.subtitle}</p>
                    </div>
                    <div className="flex bg-white p-1.5 rounded-2xl shadow-xl border border-gray-100 self-center md:self-start">
                        {['en', 'hi', 'mr'].map((l) => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${lang === l ? 'bg-green-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {l === 'en' ? 'EN' : l === 'hi' ? 'हिंदी' : 'मराठी'}
                            </button>
                        ))}
                    </div>
                </div>

                {step < 5 && renderProgress()}

                {/* Wizard Content */}
                <div className="relative">
                    <AnimatePresence mode="wait">

                        {/* Step 1: Crop Selection */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="space-y-12 max-w-4xl mx-auto"
                            >
                                <div className="text-center">
                                    <h2 className="text-2xl font-black text-gray-800 mb-8">{t.searchCrop}</h2>
                                    <div className="relative group max-w-md mx-auto">
                                        <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors text-xl" />
                                        <input
                                            type="text"
                                            placeholder={t.searchCrop}
                                            className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-6 focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all text-lg font-bold shadow-lg"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
                                    {filteredCrops.map((c) => (
                                        <motion.button
                                            key={c.id}
                                            whileHover={{ y: -8, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                setSelection({ ...selection, crop: c.id });
                                                nextStep();
                                            }}
                                            className={`group relative overflow-hidden bg-white p-4 rounded-3xl border-2 transition-all duration-300 shadow-md hover:shadow-xl ${selection.crop === c.id ? 'border-green-600 ring-4 ring-green-100' : 'border-gray-50'
                                                }`}
                                        >
                                            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                                                <img src={c.image} alt={c.name[lang]} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                            </div>
                                            <div className="flex items-center justify-center gap-3">
                                                <span className="text-xl text-green-600">{c.icon}</span>
                                                <h3 className="font-black text-gray-900 text-lg">{c.name[lang]}</h3>
                                            </div>
                                            {selection.crop === c.id && (
                                                <div className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full shadow-lg z-10">
                                                    <FaCheckCircle size={16} />
                                                </div>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Soil Type */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="space-y-12 max-w-4xl mx-auto"
                            >
                                <div className="text-center mb-10">
                                    <h2 className="text-2xl font-black text-gray-900 mb-2">{t.steps[1]}</h2>
                                    <p className="text-gray-500 font-bold text-sm">Recommendations vary based on soil nutrient levels</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {Object.entries(t.soils).map(([key, value]) => (
                                        <motion.button
                                            key={key}
                                            whileHover={{ y: -5 }}
                                            onClick={() => {
                                                setSelection({ ...selection, soil: key });
                                                nextStep();
                                            }}
                                            className={`p-6 rounded-3xl border-2 text-left transition-all group hover:bg-white hover:shadow-xl ${selection.soil === key ? 'bg-white border-green-600 ring-4 ring-green-100 shadow-xl' : 'bg-gray-50 border-gray-100'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all shadow-md ${selection.soil === key ? 'bg-green-600 text-white' : 'bg-white text-green-700 group-hover:bg-green-50'
                                                    }`}>
                                                    <FaMapMarkedAlt />
                                                </div>
                                                <FaInfoCircle className="text-green-600/30 group-hover:text-green-600 transition-colors" size={24} />
                                            </div>
                                            <h3 className="text-xl font-black text-gray-900 mb-2">{value.name}</h3>
                                            <p className="text-base text-gray-500 font-bold leading-relaxed">{value.desc}</p>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Season Selection */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="space-y-12 max-w-4xl mx-auto"
                            >
                                <div className="text-center mb-10">
                                    <h2 className="text-2xl font-black text-gray-900 mb-2">{t.steps[2]}</h2>
                                    <p className="text-gray-500 font-bold text-sm">Each season requires different growth strategies</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                    {Object.entries(t.seasons).map(([key, value]) => (
                                        <motion.button
                                            key={key}
                                            whileHover={{ scale: 1.05 }}
                                            onClick={() => {
                                                setSelection({ ...selection, season: key });
                                                nextStep();
                                            }}
                                            className={`p-6 rounded-3xl border-2 flex flex-col items-center text-center transition-all group ${selection.season === key ? 'bg-white border-green-600 ring-4 ring-green-100 shadow-xl' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-lg'
                                                }`}
                                        >
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 transition-all shadow-lg ${selection.season === key ? 'bg-green-600 text-white' : 'bg-white text-green-700'
                                                }`}>
                                                <FaCloudSun />
                                            </div>
                                            <h3 className="text-xl font-black text-gray-900 mb-2">{value.name}</h3>
                                            <span className="text-xs font-black text-green-700 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">{value.desc}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Land Area */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="max-w-lg mx-auto space-y-12"
                            >
                                <div className="text-center">
                                    <div className="inline-flex bg-green-600 text-white p-4 rounded-3xl mb-6 shadow-xl relative">
                                        <FaChartArea size={40} />
                                    </div>
                                    <h2 className="text-2xl font-black text-gray-900 mb-2">{t.enterArea}</h2>
                                    <p className="text-gray-500 font-bold text-sm">Accurate land area helps us calculate the perfect dosage.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row bg-white p-2 rounded-3xl border-2 border-gray-100 shadow-xl focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100 transition-all gap-4">
                                        <input
                                            type="number"
                                            placeholder="5"
                                            className="flex-grow bg-transparent px-6 py-4 text-4xl font-black outline-none text-center sm:text-left"
                                            value={selection.area}
                                            onChange={(e) => setSelection({ ...selection, area: e.target.value })}
                                        />
                                        <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                                            {['acres', 'hectares'].map(u => (
                                                <button
                                                    key={u}
                                                    onClick={() => setSelection({ ...selection, unit: u })}
                                                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selection.unit === u ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {u === 'acres' ? t.acres : t.hectares}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ y: -4, scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={nextStep}
                                    disabled={!selection.area}
                                    className={`w-full py-5 rounded-2xl text-xl font-black shadow-xl transition-all flex items-center justify-center gap-3 ${selection.area ? 'bg-gray-900 text-white hover:bg-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {t.next} <FaChevronRight />
                                </motion.button>
                            </motion.div>
                        )}

                        {/* Step 5: Results */}
                        {step === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-16"
                            >
                                <div className="text-center relative">
                                    <motion.div
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="bg-green-600 text-white inline-flex items-center gap-3 px-8 py-3 rounded-full text-sm font-black uppercase tracking-[0.2em] mb-8 shadow-2xl shadow-green-200"
                                    >
                                        <FaCheckCircle className="text-xl" /> {t.recommendedBadge}
                                    </motion.div>
                                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                                        {t.recommendedFor} <span className="text-green-600 underline decoration-green-100">{crops.find(c => c.id === selection.crop)?.name[lang]}</span>
                                    </h2>
                                    <p className="text-gray-500 font-bold text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                                        We have curated these specific products to ensure maximum yield for your <span className="text-gray-800">{selection.area} {t[selection.unit]}</span> farm.
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                                        <div className="bg-white px-6 py-3 rounded-2xl shadow-lg border border-gray-50 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shadow-inner"><FaMapMarkedAlt size={16} /></div>
                                            <div className="text-left">
                                                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Soil Type</p>
                                                <p className="font-black text-gray-900 text-base">{t.soils[selection.soil]?.name}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white px-6 py-3 rounded-2xl shadow-lg border border-gray-50 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-inner"><FaCloudSun size={16} /></div>
                                            <div className="text-left">
                                                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Season</p>
                                                <p className="font-black text-gray-900 text-base">{t.seasons[selection.season]?.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Add All To Cart Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAddAll}
                                        disabled={isAddingAll}
                                        className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-green-200 flex items-center gap-3 mx-auto mb-16 hover:bg-green-700 transition-all"
                                    >
                                        {isAddingAll ? (
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><FaHistory /></motion.div>
                                        ) : <FaShoppingCart />}
                                        {t.addAllToCart}
                                    </motion.button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                    {recommendationLogic(selection).map((rec, idx) => (
                                        <motion.div
                                            key={rec.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            whileHover={{ y: -15, scale: 1.01 }}
                                            className={`bg-white rounded-3xl border-2 overflow-hidden shadow-lg hover:shadow-2xl transition-all relative flex flex-col h-full ${rec.isTop ? 'border-green-500 ring-4 ring-green-50' : 'border-gray-50'}`}
                                        >

                                            {rec.isTop && (
                                                <div className="absolute top-0 left-0 right-0 bg-green-600 text-white text-center py-3 text-[10px] font-black uppercase tracking-[0.4em] z-20 shadow-lg flex items-center justify-center gap-2">
                                                    <FaStar className="text-amber-300" /> {t.bestChoice}
                                                </div>
                                            )}

                                            <div className="relative h-64 overflow-hidden group">
                                                <img src={rec.image} alt={rec.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90"></div>

                                                <div className="absolute top-14 left-8 right-8 flex flex-wrap gap-2 z-20">
                                                    {rec.badge && (
                                                        <span className="bg-amber-400 text-black text-[10px] font-black px-5 py-2 rounded-full shadow-2xl uppercase tracking-widest border-2 border-white">
                                                            {rec.badge}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="absolute bottom-10 left-10 right-10 z-30">
                                                    <span className="inline-block bg-primary-600 text-white text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest mb-4 shadow-xl border border-primary-500">
                                                        {rec.category}
                                                    </span>
                                                    <h3 className="text-2xl font-black text-white leading-tight drop-shadow-xl">{rec.name}</h3>
                                                </div>
                                            </div>

                                            <div className="p-8 flex flex-col flex-grow">
                                                {/* Reasoning */}
                                                <div className="flex items-start gap-3 mb-6 bg-green-50/40 p-5 rounded-2xl border border-green-100 shadow-inner">
                                                    <div className="mt-1 p-1 bg-green-600 text-white rounded-full"><FaCheckCircle size={10} /></div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800 leading-relaxed italic">"{rec.reason}"</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-6 mb-8">
                                                    <div className="bg-white p-6 rounded-2xl flex items-center justify-between border-2 border-gray-50 shadow-lg group/dose hover:border-green-200 transition-colors">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">{t.quantityLabel}</span>
                                                            <span className="text-3xl font-black text-gray-900 group-hover/dose:text-green-700 transition-colors">{rec.quantity} <small className="text-base font-bold uppercase text-gray-400">{rec.unit || 'kg'}</small></span>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">{t.enterArea}</span>
                                                            <span className="text-xs font-black text-gray-500 block bg-gray-100 px-3 py-1 rounded-full">{selection.area} {t[selection.unit]}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between items-center px-2">
                                                        <span className="text-gray-400 font-black text-xs uppercase tracking-widest">{t.estimatedCost}</span>
                                                        <div className="text-right">
                                                            <span className="text-3xl font-black text-green-700 block line-height-1">₹{rec.totalCost}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-auto space-y-3">
                                                    <motion.button
                                                        whileHover={{ y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => {
                                                            addToCart({
                                                                id: rec.id,
                                                                name: rec.name,
                                                                price: rec.price,
                                                                image: rec.image,
                                                                category: rec.category
                                                            }, rec.quantity);
                                                            alert(`${rec.name} added to cart!`);
                                                        }}
                                                        className="w-full flex items-center justify-center gap-3 py-4 bg-gray-900 text-white rounded-xl font-black text-base shadow-lg hover:bg-black transition-all"
                                                    >
                                                        <FaShoppingCart /> {t.addToCart}
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => {
                                                            addToCart({
                                                                id: rec.id,
                                                                name: rec.name,
                                                                price: rec.price,
                                                                image: rec.image,
                                                                category: rec.category
                                                            }, rec.quantity);
                                                            navigate('/cart');
                                                        }}
                                                        className="w-full flex items-center justify-center gap-3 py-4 border-2 border-green-600 text-green-700 rounded-xl font-black text-base hover:bg-green-50 transition-all shadow-md"
                                                    >
                                                        <FaShoppingBag /> Buy Now
                                                    </motion.button>
                                                    <Link to={`/products/${rec.id}`} className="block text-center py-2 text-[10px] font-black text-gray-400 hover:text-green-600 transition-colors uppercase tracking-[0.4em]">
                                                        Full Specifications & Review
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {selection.season === 'kharif' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-amber-400 p-8 rounded-3xl text-black shadow-xl flex flex-col md:flex-row items-center gap-6 max-w-2xl mx-auto border-4 border-white"
                                    >
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-black text-3xl shadow-lg">
                                            <FaInfoCircle />
                                        </div>
                                        <div className="text-center md:text-left">
                                            <h4 className="text-xl font-black mb-1 uppercase tracking-tighter">Essential Farm Alert</h4>
                                            <p className="font-bold text-lg leading-relaxed opacity-90">{t.seasonalWarning}</p>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="flex flex-col items-center gap-12 pt-20">
                                    <div className="h-1 w-32 bg-gray-100 rounded-full"></div>
                                    <motion.button
                                        whileHover={{ x: -10 }}
                                        onClick={() => setStep(1)}
                                        className="text-gray-400 font-black flex items-center gap-4 hover:text-green-600 transition-colors uppercase tracking-[0.4em] text-sm"
                                    >
                                        <FaArrowLeft /> Restart Your Selection
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

                {/* Footer Controls */}
                {step > 1 && step < 5 && (
                    <div className="mt-24 flex justify-between items-center max-w-xl mx-auto">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={prevStep}
                            className="flex items-center gap-2 font-black text-gray-500 hover:text-gray-900 transition-all py-4 px-8 rounded-xl bg-white shadow-lg border border-gray-100"
                        >
                            <FaChevronLeft /> {t.back}
                        </motion.button>
                        {step !== 4 && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={nextStep}
                                className="flex items-center gap-2 font-black text-white bg-green-600 hover:bg-green-700 transition-all py-4 px-8 rounded-xl shadow-xl shadow-green-200"
                            >
                                {t.next} <FaChevronRight />
                            </motion.button>
                        )}
                    </div>
                )}

                <div className="mt-36 text-center pb-20">
                    <Link to="/products" className="inline-flex items-center gap-4 text-gray-400 font-black hover:text-green-600 transition-all uppercase tracking-[0.3em] text-xs bg-white px-10 py-5 rounded-full shadow-lg border border-gray-50 hover:shadow-2xl">
                        <FaArrowLeft /> Standard Product Catalog
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SmartDiscovery;

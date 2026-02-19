import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaHistory, FaUserAlt, FaMapMarkerAlt, FaCheckCircle, FaLeaf, FaBoxOpen, FaCertificate } from 'react-icons/fa';
import { getLotByCode } from '../services/api';

const Traceability = () => {
    const [lotCode, setLotCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [batchData, setBatchData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!lotCode.trim()) return;

        setLoading(true);
        setError(null);
        setBatchData(null);

        try {
            // DEMO MODE for presentation
            if (lotCode.trim().toUpperCase() === 'LOT-DEMO-2026') {
                await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
                setBatchData({
                    lotCode: 'LOT-DEMO-2026',
                    cropType: 'Organic Red Tomatoes',
                    initialWeight: 500,
                    gradeAWeight: 420,
                    gradeBWeight: 65,
                    status: 'Delivered',
                    createdAt: new Date().toISOString(),
                    farmer: {
                        name: 'Rajesh Kumar',
                        village: 'Venegaon, Solapur',
                    }
                });
                return;
            }

            const response = await getLotByCode(lotCode.trim().toUpperCase());
            setBatchData(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Batch not found. Please verify the code.');
        } finally {
            setLoading(false);
        }
    };

    const StatusBadge = ({ status }) => {
        const colors = {
            'Created': 'bg-blue-100 text-blue-700',
            'Graded': 'bg-purple-100 text-purple-700',
            'Packed': 'bg-yellow-100 text-yellow-700',
            'Shipped': 'bg-orange-100 text-orange-700',
            'Delivered': 'bg-green-100 text-green-700'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
                {status || 'Unknown'}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="container-custom max-w-5xl">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold mb-6"
                    >
                        <FaCertificate /> 100% Transparent Supply Chain
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                        Verify Your <span className="text-green-600">Fresh Produce</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Enter the Batch ID found on your product packaging or delivery slip to trace its journey from our farmers to your home.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-16">
                    <form onSubmit={handleSearch} className="relative group">
                        <input
                            type="text"
                            placeholder="e.g. LOT-20240109-1234"
                            className="w-full bg-white border-2 border-gray-100 rounded-2xl py-5 px-6 pr-16 text-lg shadow-xl focus:border-green-500 focus:ring-0 transition-all placeholder:text-gray-300 font-mono"
                            value={lotCode}
                            onChange={(e) => setLotCode(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-3 top-3 bottom-3 px-6 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2 disabled:bg-gray-300"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <FaSearch /> <span className="hidden sm:inline">Trace</span>
                                </>
                            )}
                        </button>
                    </form>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm mt-3 text-center font-medium"
                        >
                            {error}
                        </motion.p>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {batchData ? (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="grid lg:grid-cols-3 gap-8"
                        >
                            {/* Farmer Card */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-4xl">
                                        <FaUserAlt />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">Our Farmer</h2>
                                    <p className="text-2xl font-extrabold text-green-600 mb-4">{batchData.farmer?.name}</p>
                                    <div className="flex items-center justify-center gap-2 text-gray-500 mb-6 font-medium">
                                        <FaMapMarkerAlt /> {batchData.farmer?.village}
                                    </div>
                                    <div className="pt-6 border-t border-gray-50">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1 font-mono">
                                            Batch Code: {batchData.lotCode}
                                        </p>
                                        <StatusBadge status={batchData.status} />
                                    </div>
                                </div>

                                <div className="bg-green-600 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden group">
                                    <FaCheckCircle className="absolute -right-4 -bottom-4 text-white/10 text-9xl transform -rotate-12" />
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <FaCertificate className="text-yellow-400" /> Quality Verified
                                    </h3>
                                    <p className="text-green-50 text-sm leading-relaxed mb-6">
                                        This batch has been graded Grade {batchData.gradeAWeight > batchData.gradeBWeight ? 'A' : 'B'} based on our strict 14-point quality check.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                            <span>Grade A Output</span>
                                            <span>{batchData.gradeAWeight} kg</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-white transition-all duration-1000"
                                                style={{ width: `${(batchData.gradeAWeight / batchData.initialWeight) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Journey Timeline */}
                            <div className="lg:col-span-2">
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-10">
                                        <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl">
                                            <FaHistory className="text-xl" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Freshness Journey</h2>
                                    </div>

                                    <div className="relative pl-10 space-y-12 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                                        {/* Point 1: Arrival */}
                                        <div className="relative">
                                            <div className="absolute -left-10 top-0 w-8 h-8 bg-green-100 text-green-600 rounded-full border-4 border-white flex items-center justify-center shadow-sm z-10">
                                                <FaLeaf className="text-xs" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg mb-1">Harvest Arrival</h4>
                                                <p className="text-sm text-gray-500 mb-3">{new Date(batchData.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                <div className="bg-gray-50 p-4 rounded-2xl inline-block border border-gray-100">
                                                    <p className="text-gray-600 text-sm italic">"Procured {batchData.initialWeight}kg of fresh {batchData.cropType} directly from the farm gate."</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Point 2: Grading/Processing */}
                                        <div className="relative">
                                            <div className={`absolute -left-10 top-0 w-8 h-8 ${batchData.gradeAWeight ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'} rounded-full border-4 border-white flex items-center justify-center shadow-sm z-10 transition-colors`}>
                                                <FaCheckCircle className="text-xs" />
                                            </div>
                                            <div className={!batchData.gradeAWeight ? 'opacity-50' : ''}>
                                                <h4 className="font-bold text-gray-900 text-lg mb-1">Quality Segregation</h4>
                                                <p className="text-sm text-gray-500 mb-3">
                                                    {batchData.gradeAWeight ? 'Completed' : 'Pending Verification'}
                                                </p>
                                                {batchData.gradeAWeight && (
                                                    <div className="bg-green-50 p-4 rounded-2xl inline-block border border-green-100">
                                                        <p className="text-green-700 text-sm font-medium">Sorted to separate premium export-quality produce.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Point 3: Ready for You */}
                                        <div className="relative">
                                            <div className={`absolute -left-10 top-0 w-8 h-8 ${batchData.status === 'Delivered' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-400'} rounded-full border-4 border-white flex items-center justify-center shadow-sm z-10`}>
                                                <FaBoxOpen className="text-xs" />
                                            </div>
                                            <div className={batchData.status !== 'Delivered' ? 'opacity-50' : ''}>
                                                <h4 className="font-bold text-gray-900 text-lg mb-1">Dispatched to Customer</h4>
                                                <p className="text-sm text-gray-500">Fast delivery within 24 hours of grading.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white p-12 rounded-3xl shadow-sm border-2 border-dashed border-gray-200 text-center max-w-2xl mx-auto"
                        >
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 text-3xl">
                                <FaHistory />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Search Results Yet</h3>
                            <p className="text-gray-500">Enter a valid Lot ID above to unlock the transparency details of your produce.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Traceability;

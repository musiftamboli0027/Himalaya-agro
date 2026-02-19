import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false, message = 'Loading...' }) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
                <div className="text-center">
                    <motion.div
                        className="loader mx-auto"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <p className="mt-4 text-gray-600 font-medium">{message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-12">
            <div className="text-center">
                <motion.div
                    className="loader mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <p className="mt-4 text-gray-600 font-medium">{message}</p>
            </div>
        </div>
    );
};

export default Loader;

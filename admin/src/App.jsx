import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import { useAuth } from './context/AuthContext';

// Placeholder components for other pages
const Inquiries = () => <div className="card"><h1>Inquiries Management</h1><p className="mt-4 text-gray-500">Coming soon...</p></div>;
const Traceability = () => <div className="card"><h1>Traceability Management</h1><p className="mt-4 text-gray-500">Coming soon...</p></div>;
const Farmers = () => <div className="card"><h1>Farmers Management</h1><p className="mt-4 text-gray-500">Coming soon...</p></div>;

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="card w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-primary-600 mb-8">Himalaya Admin</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="admin@himalaya.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full py-3 mt-4">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

function App() {
    const { admin } = useAuth();

    if (!admin) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/inquiries" element={<Inquiries />} />
                <Route path="/traceability" element={<Traceability />} />
                <Route path="/farmers" element={<Farmers />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Layout>
    );
}

export default App;

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    MessageSquare,
    History,
    Users,
    LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const menuItems = [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
        { title: 'Products', icon: <Package size={20} />, path: '/products' },
        { title: 'Orders', icon: <ShoppingCart size={20} />, path: '/orders' },
        { title: 'Inquiries', icon: <MessageSquare size={20} />, path: '/inquiries' },
        { title: 'Traceability', icon: <History size={20} />, path: '/traceability' },
        { title: 'Farmers', icon: <Users size={20} />, path: '/farmers' },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary-600 tracking-tight">Himalaya Admin</h1>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-primary-50 text-primary-700 shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        {item.icon}
                        <span className="font-medium">{item.title}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

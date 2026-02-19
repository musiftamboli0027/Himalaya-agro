import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 max-w-md w-full">
                <Search className="text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search items, orders, or inquiries..."
                    className="bg-transparent border-none outline-none text-sm w-full focus:ring-0"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                        3
                    </span>
                </button>

                <div className="flex items-center gap-3 border-l border-gray-200 pl-6 cursor-pointer group">
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">Admin User</p>
                        <p className="text-xs text-gray-500">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 group-hover:bg-primary-200 transition-colors">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

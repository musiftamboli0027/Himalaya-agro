import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
                <Navbar />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;

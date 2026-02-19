import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, CheckCircle, Truck, XCircle, Search } from 'lucide-react';
import api from '../services/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/api/orders');
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        if (!window.confirm(`Mark order as ${status}?`)) return;
        try {
            await api.put(`/api/orders/${id}/status`, { status });
            fetchOrders();
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Processing': return 'bg-amber-100 text-amber-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredOrders = orders.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm)
    );

    if (loading) return <div className="flex items-center justify-center min-h-[400px]">Loading Orders...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Store Orders</h2>
                    <p className="text-gray-500">Manage customer orders and track delivery status.</p>
                </div>
            </div>

            <div className="card">
                <div className="mb-6 relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, phone or order #..."
                        className="input-field pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{order.orderNumber || 'N/A'}</div>
                                        <div className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{order.customerName}</div>
                                        <div className="text-xs text-gray-500">{order.customerPhone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600">
                                            {order.items.length} items
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        ₹{order.totalAmount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-tight ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {order.status !== 'Shipped' && order.status !== 'Delivered' && (
                                                <button
                                                    onClick={() => updateStatus(order._id, 'Shipped')}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                    title="Mark as Shipped"
                                                >
                                                    <Truck size={18} />
                                                </button>
                                            )}
                                            {order.status !== 'Delivered' && (
                                                <button
                                                    onClick={() => updateStatus(order._id, 'Delivered')}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                                    title="Mark as Delivered"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                            )}
                                            {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                                                <button
                                                    onClick={() => updateStatus(order._id, 'Cancelled')}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                    title="Cancel Order"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredOrders.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500 italic">
                                        No orders found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;

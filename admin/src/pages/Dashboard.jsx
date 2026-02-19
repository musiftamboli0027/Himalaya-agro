import React from 'react';
import {
    Users,
    Package,
    ShoppingCart,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    History
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const data = [
    { name: 'Jan', sales: 4000, orders: 240 },
    { name: 'Feb', sales: 3000, orders: 198 },
    { name: 'Mar', sales: 2000, orders: 150 },
    { name: 'Apr', sales: 2780, orders: 200 },
    { name: 'May', sales: 1890, orders: 120 },
    { name: 'Jun', sales: 2390, orders: 170 },
    { name: 'Jul', sales: 3490, orders: 250 },
];

const StatCard = ({ title, value, icon, trend, trendValue }) => (
    <div className="card hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
                {icon}
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trendValue}
                {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            </div>
        </div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/api/admin/stats');
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="flex items-center justify-center min-h-[400px]">Loading Dashboard...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Sales"
                    value={`₹${stats?.totalSales?.toLocaleString()}`}
                    icon={<TrendingUp size={24} />}
                    trend="up"
                    trendValue="+12.5%"
                />
                <StatCard
                    title="Total Orders"
                    value={stats?.activeOrders}
                    icon={<ShoppingCart size={24} />}
                    trend="up"
                    trendValue="+5.2%"
                />
                <StatCard
                    title="Total Products"
                    value={stats?.totalProducts}
                    icon={<Package size={24} />}
                    trend="down"
                    trendValue="-2.1%"
                />
                <StatCard
                    title="Total Inquiries"
                    value={stats?.totalInquiries}
                    icon={<Users size={24} />}
                    trend="up"
                    trendValue="+18.4%"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Revenue Analytics</h3>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Updates</div>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#22c55e" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Recent Store Orders</h3>
                        <button className="text-primary-600 text-sm font-semibold hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                        {stats?.recentOrders?.length > 0 ? (
                            stats.recentOrders.map((order) => (
                                <div key={order._id} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                                            <History size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm">{order.customerName}</h4>
                                            <p className="text-xs text-gray-500">{order.items.length} items • ₹{order.totalAmount}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                        <p className="text-[10px] text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-400 italic">No orders yet</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

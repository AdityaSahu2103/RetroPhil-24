import React, { useState, useEffect } from 'react';
import './OrderDetail.css';

const OrderDetail = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch orders from your API or data source
        fetch('/api/orders')
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="order-detail">
            <div className="py-5 flex justify-between items-center">
                <h1 className="text-xl text-pink-300 font-bold">All Orders</h1>
            </div>
            <div className="flex justify-center relative top-20">
                {loading && <div>Loading...</div>}
            </div>
            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                    <tbody>
                        <tr>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">S.No.</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Order ID</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Customer</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Total</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Date</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Status</th>
                        </tr>
                        {orders.map((order, index) => (
                            <tr key={order.id} className="text-pink-300">
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">{index + 1}</td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">{order.id}</td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">{order.customer}</td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">₹{order.total}</td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">{order.date}</td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;

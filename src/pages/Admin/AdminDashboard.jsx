import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ProductDetail from '../../components/admin/ProductDetail';
import UserDetail from '../../components/admin/UserDetail';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));

    if (!user || user.role !== 'admin') {
        return <div>Access Denied</div>;
    }

    return (
        <div className="admin-dashboard">
            <div className="top mb-5 px-5 mt-5">
                <div className="bg-pink-50 py-5 border border-pink-100 rounded-lg">
                    <h1 className="text-center text-2xl font-bold text-pink-500">Admin Dashboard</h1>
                </div>
            </div>

            <div className="px-5">
                <Tabs>
                    <TabList className="flex flex-wrap -m-4 text-center justify-center">
                        <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                            <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl">
                                <h2 className="title-font font-medium text-3xl text-gray-900">Products</h2>
                                <p className="leading-relaxed">Total Products</p>
                            </div>
                        </Tab>
                        <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                            <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl">
                                <h2 className="title-font font-medium text-3xl text-gray-900">Product Verification</h2>
                                <p className="leading-relaxed">Verify Products</p>
                                <Link to="/product-verification" className="verification-button">Go to Verification</Link>
                            </div>
                        </Tab>
                        <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                            <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl">
                                <h2 className="title-font font-medium text-3xl text-gray-900">Users</h2>
                                <p className="leading-relaxed">Total Users</p>
                            </div>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <ProductDetail />
                    </TabPanel>
                    <TabPanel>
                        <UserDetail />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default AdminDashboard;

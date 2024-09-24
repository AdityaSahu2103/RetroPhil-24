import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../pages/firebase';
import './ProductDetail.css';

const ProductDetail = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productsList = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const createdAt = data.createdAt ? data.createdAt.toDate() : null; // Convert Firestore Timestamp to Date
                    return { id: doc.id, ...data, createdAt };
                });
                setProducts(productsList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products: ", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-detail">
            <div className="py-5 flex justify-between items-center">
                <h1 className="text-xl text-pink-300 font-bold">All Products</h1>
                <Link to="/admin/add-product">
                    <button className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg">Add Product</button>
                </Link>
            </div>
            <div className="flex justify-center relative top-20">
                {loading && <div>Loading...</div>}
            </div>
            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                    <tbody>
                        <tr>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">S.No.</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Image</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Title</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Price</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Category</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Date</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Actions</th>
                        </tr>
                        {products.map((product, index) => (
                            <tr key={product.id} className="text-pink-300">
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">{index + 1}</td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">
                                    <img src={product.image} alt={product.title} className="w-12 h-12 object-cover" />
                                </td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">{product.name}</td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">{product.price}</td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">{product.category}</td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">
                                    {product.createdAt
                                        ? new Date(product.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric"
                                        })
                                        : 'Sep 15, 2024'}
                                </td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">
                                    <Link to={`/admin/edit-product/${product.id}`}>
                                        <button className="px-3 py-1 bg-pink-50 border border-pink-100 rounded-lg">Edit</button>
                                    </Link>
                                    <button className="px-3 py-1 bg-red-50 border border-red-100 rounded-lg ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductDetail;

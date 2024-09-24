import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../pages/firebase'; // Ensure this path is correct
import './UserDetail.css';

const UserDetail = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Users'));
                const usersList = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    console.log("User data: ", JSON.stringify(data, null, 2)); // Enhanced logging
                    return { id: doc.id, ...data };
                });
                setUsers(usersList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users: ", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="user-detail">
            <div className="py-5 flex justify-between items-center">
                <h1 className="text-xl text-pink-300 font-bold">All Users</h1>
            </div>
            <div className="flex justify-center relative top-20">
                {loading && <div>Loading...</div>}
            </div>
            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                    <tbody>
                        <tr>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">S.No.</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Name</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Email</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Image</th>
                        </tr>
                        {users.map((user, index) => (
                            <tr key={user.id} className="text-pink-300">
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">{index + 1}</td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">{user.firstName} {user.lastName}</td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">{user.email}</td>
                                <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100">
                                    <img src={user.photo} alt={user.firstName} className="w-12 h-12 object-cover" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetail;

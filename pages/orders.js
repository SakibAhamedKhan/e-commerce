import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Layout from '../components/Layout';
import auth from '../firebase.init';

const Orders = () => {
    const [user, loading, error] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            fetch(`https://tranquil-gorge-95745.herokuapp.com/order/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setOrders(data);
                });

        }
    }, [user]);

    if (loading) {
        return <div className='w-screen h-screen flex justify-center items-center'>Loading...</div>
    }
    if (!user) {
        router.push('/login');
    }


    console.log(orders);

    return (
        <Layout>
            <div className='my-5 font-semibold text-xl'>
                <h1 className='text-center'>Orders</h1>
                <div className='my-5'>
                    {
                        orders.map(m => (
                            <div key={m._id} className="card max-w-3xl bg-base-100 shadow-md hover:shadow-xl mx-auto my-2">
                                <div className=" p-5 flex justify-between items-center">
                                    <div>
                                        <img className='h-20' src={m.image} alt="" />
                                    </div>
                                    <div>
                                        <h2>{m.name}</h2>
                                        <h2>${m.price} /per</h2>
                                        <h2>Quantity: {m.quantity}</h2>
                                        <h2>Total: ${m.paid}</h2>
                                    </div>
                                    <div className="">
                                        <button onClick={() => router.push(`/checkout/${m._id}`)} className="btn btn-success btn-sm text-white">Paided</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
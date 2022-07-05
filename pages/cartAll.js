import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const CartAll = ({ products }) => {
    const router = useRouter();
    const [data, setData] = useState([]);
    useEffect(() => {
        let dataLocalStorage = JSON.parse(localStorage.getItem('product'));
        let finalData = dataLocalStorage.map(m => {
            const data = products.filter(f => f._id === m.id);
            data[0].quantity = m.quantity;
            return data[0];
        });
        setData(finalData);
    }, [products]);

    return (
        <Layout>
            <div className='my-10'>
                {
                    data.map(m => (
                        <div key={m._id} className="card max-w-3xl bg-base-100 shadow-md hover:shadow-xl mx-auto my-2">
                            <div className=" p-5 flex justify-between items-center">
                                <div>
                                    <img className='h-20' src={m.image} alt="" />
                                </div>
                                <div>
                                    <h2>{m.name}</h2>
                                    <h2>${m.price} /Per</h2>
                                    <h2>Quantity: {m.quantity}</h2>
                                </div>
                                <div className="">
                                    <button  onClick={() => router.push(`/checkout/${m._id}`)} className="btn btn-primary btn-sm">Checkout</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Layout>
    );
};

export default CartAll;

export async function getServerSideProps() {
    const datafetch = await fetch('https://tranquil-gorge-95745.herokuapp.com/products');
    const data = await datafetch.json();
    return {
        props: {
            products: data,
        }
    }
}

import { data } from 'autoprefixer';
import { useRouter } from 'next/router';
import { parse } from 'postcss';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import Layout from '../../components/Layout';
import auth from '../../firebase.init';

const checkout = ({ product }) => {
    const [user, loading, error] = useAuthState(auth);
    const [data, setData] = useState({});
    const router = useRouter();

    useEffect(() => {
        let dataLocalStorage = JSON.parse(localStorage.getItem('product'));
        let finalData = dataLocalStorage.filter(f => f.id === product._id);

        setData(finalData[0]);
    }, [product]);
    console.log(data);

    if (loading) {
        return <div className='w-screen h-screen flex justify-center items-center'>Loading...</div>
    }

    if (!user) {
        router.push('/login');
    }

    const handlePaid = () => {
        const doc = {
            email: user.email,
            productID: product._id,
            quantity: data.quantity,
            price: product.price,
            name: product.name,
            details: product.details,
            image: product.image,
            paid: parseInt(data.quantity) * parseInt(product.price),
        }

        fetch('http://localhost:5000/order',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(doc)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                Swal.fire(
                    'Good job!',
                    'You have successfully paid for this order',
                    'success'
                  );
                let dataFromLocalStorage = JSON.parse(localStorage.getItem('product'));
                let dataFiltered = dataFromLocalStorage.filter(f => f.id !== doc.productID);
                console.log(dataFiltered);
                localStorage.setItem('product', JSON.stringify(dataFiltered));
                router.push('/orders');
            }
        });
    }

    return (
        <Layout>
            <div className="card lg:card-side bg-base-100 shadow-md my-10 mx-10">
                <div className='p-3 mx-auto'>
                    <img className='h-60' src={product.image} alt="Album" />
                </div>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p className=' '>{product.details}</p>
                    <p className=' '>Price Per Piece: ${product.price}</p>
                    <p className=' '>Quantity: {data.quantity}</p>
                    <p className=' '>Total Need Paid: ${parseInt(data.quantity) * parseInt(product.price)}</p>

                    <div onClick={() => handlePaid()} className="card-actions">
                        <button className="btn btn-primary btn-sm">Paid Now</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default checkout;
export async function getServerSideProps({ params }) {
    const { id } = params;
    const datafetch = await fetch(`http://localhost:5000/products/${id}`);
    const data = await datafetch.json();

    return {
        props: {
            product: data,
        }
    }
}
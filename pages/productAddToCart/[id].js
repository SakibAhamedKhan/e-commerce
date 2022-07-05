import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../../components/Layout';

const productsAddToCart = ({ product }) => {
    console.log(product);
    const [refresh, setRefresh] = useState('');
    const router = useRouter();

    const handleCartSubmit = (e) => {
        e.preventDefault();
        const quantity = e.target.quantity.value;
        let data = {
            id: product._id,
            quantity,
        }
        let dataLocalStorage = JSON.parse(localStorage.getItem('product'));
        console.log(dataLocalStorage);
        if (dataLocalStorage) {
            const duplicate = dataLocalStorage.find(f => f.id === product._id);
            if (duplicate === undefined) {
                dataLocalStorage = [...dataLocalStorage, data];
                localStorage.setItem('product', JSON.stringify(dataLocalStorage));
            } else {
                const duplicateDataQuantity = duplicate.quantity;
                const newQuantity = parseInt(duplicateDataQuantity) + parseInt(data.quantity);
                data.quantity = newQuantity;
                
                const withoutthis = dataLocalStorage.filter(m => m.id !== product._id);
                dataLocalStorage = [...withoutthis, data];
                localStorage.setItem('product', JSON.stringify(dataLocalStorage));
            }
        } else {
            dataLocalStorage = [data];
            localStorage.setItem('product', JSON.stringify(dataLocalStorage));
        }

        router.push('/cartAll');
        setRefresh(JSON.parse(localStorage.getItem('product')).length);
    }
    console.log(refresh);
    return (
        <Layout refresh={refresh}>
            <div className='my-10 px-10'>
                <div className="card card-side bg-base-100 max-w-3xl mx-auto shadow-md">
                    <figure><img src={product.image} alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>
                        <p>{product.details}</p>
                        <form onSubmit={handleCartSubmit} className='flex items-center justify-end'>
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text"></span>
                                </label>
                                <label className="input-group">
                                    <input type="text" placeholder="Enter the Quantity..." className="input input-bordered" name='quantity' required />
                                    <span className='bg-white border-2'>piece</span>
                                </label>
                            </div>
                            <div className="mt-3 ml-2">
                                <button type='submit' className="btn btn-primary">Cart Now</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default productsAddToCart;
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
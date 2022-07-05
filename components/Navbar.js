import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const Navbar = ({ refresh }) => {
    // const dataCart = JSON.parse(window.localStorage.getItem('product'));
    const router = useRouter();
    const [number, setNumber] = useState('');
    const [user, loading, error] = useAuthState(auth);


    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('product'));
        setNumber(item ? item.length : '0');
    }, [refresh]);

    if (loading) {
        return <div className='text-center'>Loading...</div>
    }


    console.log(refresh);

    return (
        <div className="navbar bg-base-100 px-5 shadow-md">
            <div className="flex-1">
                <Link href='/' className="normal-case"><span className='font-semibold text-xl cursor-pointer'>E-Commerce</span></Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <button onClick={() => router.push(`/cartAll`)} className="btn bg-white hover:bg-white text-black border-0 gap-2">
                        Cart
                        <div className="badge badge-primary mb-3 ml-[-4px]">{number}</div>
                    </button>
                    {
                        user?
                        <li className='font-semibold'><Link href='/orders' className='font-semibold'>Orders</Link></li>
                        :
                        ''  
                    }
                    <li className='font-semibold'>{
                        user ?
                            <button  onClick={() => signOut(auth)}>Logout</button>
                            :
                            <Link href='/login' >Login</Link>
                    }</li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
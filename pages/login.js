import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import auth from '../firebase.init';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();  
    if(user) {
        router.push('/');
    }
    if(loading){
        return <div className='w-screen h-screen flex justify-center items-center'>Loading...</div>
    }
    if(error){
        Swal.fire(
            `ops`,
            `${error.message}`,
            'error'
          )
    }
    const handleLoginSubmit =(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);
        signInWithEmailAndPassword(email, password);
    }
    return (
        <div className="hero min-h-screen w-full bg-base-200">
            <div className="hero-content text-center">
                <div className="card flex-shrink-0 w-full md:w-96 lg:w-96 max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLoginSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" />
                                <label className="label">
                                    <Link href="/signup" className="label-text-alt link link-hover font-md   text-red-500">Sign up?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
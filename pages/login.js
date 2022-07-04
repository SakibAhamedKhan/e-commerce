import Link from 'next/link';
import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPasswordd(auth);

    const handleLoginSubmit =(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);
        signInWithEmailAndPassword(email, password);
    }
    return (
        <div class="hero min-h-screen w-full bg-base-200">
            <div class="hero-content text-center">
                <div class="card flex-shrink-0 w-full md:w-96 lg:w-96 max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <form onSubmit={handleLoginSubmit}>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' class="input input-bordered" />
                                <label class="label">
                                    <Link href="/signup" class="label-text-alt link link-hover font-md   text-red-500">Sign up?</Link>
                                </label>
                            </div>
                            <div class="form-control mt-6">
                                <button type='submit' class="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default login;
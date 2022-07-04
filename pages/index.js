import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { async } from '@firebase/util';

export default function Home({ products }) {
  console.log(products);
  return (
    <div>
      <div class="navbar bg-base-100 px-5">
        <div class="flex-1">
          <a class="btn btn-ghost normal-case text-xl">E-Commerce</a>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal p-0">
            <li><Link href='/login'>Login</Link></li>
          </ul>
        </div>
      </div>
      <div className='my-10 grid grid-cols-3 gap-4 mx-10'>
        {
          products.map(p => (
            <div key={p._id} class="card w-full bg-base-100 shadow-xl justify-self-center hover:bg-base-200">
              <figure class="px-10 pt-10">
                <img src={p.image} alt="Shoes" class="rounded-xl" />
              </figure>
              <div class="card-body items-center text-center">
                <h2 class="card-title">{p.name}</h2>
                <p>{p.details}</p>
                <div class="card-actions">
                  <button class="btn btn-primary">Add Now</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const datafetch = await fetch('http://localhost:5000/products');
  const data = await datafetch.json();
  return {
    props: {
      products: data,
    }
  }
}

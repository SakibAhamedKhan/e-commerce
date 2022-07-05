import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { async } from '@firebase/util';
import Layout from '../components/Layout';
import { useRouter } from 'next/router'


export default function Home({ products }) {
  const router = useRouter();

  console.log(products);
  return (
    <Layout>
      <div className='my-10 grid grid-cols-3 gap-4 mx-10'>
        {
          products.map(p => (
            <div key={p._id} className="card w-full bg-base-100 shadow-md justify-self-center hover:shadow-2xl">
              <figure className="px-10 pt-10">
                <img src={p.image} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{p.name}</h2>
                <p>{p.details}</p>
                <p>${p.price}</p>
                <div className="card-actions">
                  <button onClick={() => router.push(`/productAddToCart/${p._id}`)} className="btn btn-sm btn-primary">Add Now</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const datafetch = await fetch('https://tranquil-gorge-95745.herokuapp.com/products');
  const data = await datafetch.json();
  return {
    props: {
      products: data,
    }
  }
}

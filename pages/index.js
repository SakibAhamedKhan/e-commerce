import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <a class="btn btn-ghost normal-case text-xl">E-Commerce</a>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal p-0">
            <li><Link href='/login'>Login</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

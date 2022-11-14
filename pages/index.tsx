import Head from 'next/head'
// import Image from 'next/image' // use Image !!!!
import styles from '../styles/Home.module.css'

import type { Invoice } from '../interfaces'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {

  const {data, error} = useSWR<Invoice[]>('/api/data', fetcher)

  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>Invoice App</title>
        <meta name="description" content="A Frontend Mentor Challenge" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      <main className={styles.main}>
        <p>all invoices</p>

        {data.map((invoice) => (
          <li key={invoice.id}>{invoice.clientName}</li>
        ))}
      </main>

      <footer className={styles.footer}>
        <p>footer</p>
      </footer>
    </div>
  )
}

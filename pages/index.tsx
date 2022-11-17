// import Head from 'next/head'
// import Image from 'next/image' 
// import Link from 'next/link'
// import styles from '../styles/Home.module.css'

import type { Invoice } from '../interfaces'
import useSWR from 'swr'


// call to my api, read data from DB
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {

  // call to my api, read data from DB
  const {data, error} = useSWR<Invoice[]>('/api/allInvoices', fetcher)

  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  // console.log(`Data: ${JSON.stringify(data)}`)

  return (
    <div>Hallo
        {data.map((invoice) => (
          <li key={invoice.id}>{invoice.clientName}</li>
        ))}
    </div>
  )
}

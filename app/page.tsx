"use client"

import type { Invoice } from '../interfaces'
import useSWR from 'swr'

// call to my api, read data from DB
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Page() {

    // call to my api, read data from DB
    const {data, error} = useSWR<Invoice[]>('/api/allInvoices', fetcher)

    if (error) return <div>Failed to load users</div>
    if (!data) return <div>Loading...</div>

    return <div>
        {data?.map((invoice:Invoice) => (
           <li key={invoice.id}>{invoice.clientName}</li>
         ))}
    </div>
    

}
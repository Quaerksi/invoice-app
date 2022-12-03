"use client"

import type { Invoice } from '../interfaces'
import useSWR from 'swr'
// Unfortunately fetch with the SWR hook has to be done in the client because the SWR hook works with client hooks.
// I could put the DB Api in a separate application to fetch from different server
// I could call the DB methods directly using the useEffect and useState hooks, so I would save myself the currently 
// unnecessary way via the API, but then I would be back in the clientIch könnte die DB Methoden mittels der Hooks useEffect und useState direkt aufrufen, so würde ich mir


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
"use client"

import type { Invoice } from '../interfaces/invoice'
import useSWR from 'swr'
import styles from './landingpage.module.css'
import Headline from './componentsApp/headlineWithButtons'
import InvoiceOverview from './componentsApp/invoiceOverview'
import NoInvoicesThere from './componentsApp/noInvoicesThere'

// Context filter
import { FilterProvider } from '../context/filterContext'

// call to my api, read data from DB
const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface dropdownValues {
    name: string,
    elements: string[],
    defaultValue: string
}

export default function Page() {

    // call to my api, read data from DB
    const {data, error} = useSWR<Invoice[] | []>('/api/allInvoices', fetcher)

    if (error) return <div>Failed to load users</div>
    if (!data) return <div>Loading...</div>

    const allInvoices:React.ReactElement[] = data?.map((invoice, index, arr) => <div key={`InvoiceOverview-${index}`} style={{marginBottom: '1rem'}}> <InvoiceOverview invoice={invoice} /> </div>)

    return <div className={styles.content}>
                <FilterProvider>
                <Headline countInvoices={data?.length}/>
                <br/>
                {allInvoices.length == 0 && <NoInvoicesThere />}
                {
                    allInvoices
                }
                </FilterProvider>
            </div>
}
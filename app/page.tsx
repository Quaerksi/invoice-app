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

export default function Page() {

    // call to my api, read data from DB
    const {data, error} = useSWR<Invoice[] | []>('/api/allInvoices', fetcher)

    if (error) return <div style={{'marginTop': '6rem'}}>Failed to load users</div>
    if (!data) return <div style={{'marginTop': '6rem'}}>Loading...</div>

    const allInvoices:React.ReactElement[] = data?.map((invoice, index, arr) => <InvoiceOverview invoice={invoice} />)
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
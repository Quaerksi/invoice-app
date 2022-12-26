"use client"

// import '../../styles/globals.css'
import styles from './viewInvoice.module.css'
import { useRouter} from 'next/router'


export default function Page() {
    const router = useRouter()
    const invoiceId = router.query.invoiceID as string
    // const invoiceId = router.

    return(
        <>
            Hallo
            favicon.ico
            <p>InvoiceId: {invoiceId}</p>
        </>
    )
}
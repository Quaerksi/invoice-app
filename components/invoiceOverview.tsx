"use client"

import styles from './invoiceOverview.module.css'
import Image from 'next/image'
import type { Invoice } from '../interfaces'
import Moment from 'react-moment'
import  PaidPendingDraft from './paidPendingDraft'

interface Props {
    key: string;
    invoice: Invoice
}

export default function InvoiceOverview(prop: Props) {

    return (
        <>
        <div className={`${styles.container}`}>
            <div className={`${styles.containerLeftSite}`}>
                <h2><span className={`${styles.span}`}>#</span>{prop?.invoice?.id}</h2>
                <p className={`${styles.p}`}>Due  &nbsp;
                <Moment format="DD MMM YYYY">
                    {prop.invoice.paymentDue}
                </Moment>
            </p>
                <h1 className={`${styles.h1Left}`}>£ {prop?.invoice?.total}</h1>
                <p className={`${styles.p} ${styles.pNameLeft}`}>{prop?.invoice?.clientName}</p>
            </div>
            <div className={`${styles.containerRightSite}`}>
                <p className={`${styles.p} ${styles.pNameRight}`}>{prop?.invoice?.clientName}</p>
                <h1 className={`${styles.h1Right}`}>£ {prop?.invoice?.total}</h1>
                <PaidPendingDraft name={prop?.invoice?.status}/>
                <Image
                    className={`${styles.imageArrow}`}
                    src="/assets/icon-arrow-right.svg"
                    alt="Picture of the user"
                    width={8}
                    height={8}
                    priority={true}
                />
            </div>
        </div>
    </>
    )
}
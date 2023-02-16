"use client"

import styles from './invoiceOverview.module.css'
import Image from 'next/image'
import type { Invoice } from '../../interfaces/invoice'
import Moment from 'react-moment'
import  PaidPendingDraft from '../../components/paidPendingDraft'

import React, {useEffect, useState} from "react";

// Context theme
import { useFilterContext } from '../../context/useFilterContext'

import Link from 'next/link'

interface Props {
    invoice: Invoice
}

export default function InvoiceOverview(prop: Props) {

    const {filterMode} = useFilterContext();
    const [show, setShow] = useState<boolean>(true)

    // handle theme mode
    useEffect(() => {
        if (filterMode === 'all'){
            setShow(true)
        } else if(filterMode != 'all' && filterMode === prop?.invoice?.status?.toLowerCase()){
            setShow(true)
        } else {
            setShow(false)
        }       
    }, [filterMode])

    return (
        <>
        {show && <Link href={`invoice?id=${prop?.invoice?.id}`}>
                <div className={`${styles.container} ${styles.containerDesign}`}>
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
                        <div className={`${styles.paidPendingDraft}`}>
                            <PaidPendingDraft name={prop?.invoice?.status}/>
                        </div>
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
            </Link>
        }
    </>
    )
}
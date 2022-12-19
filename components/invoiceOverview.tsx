"use client"

import styles from './invoiceOverview.module.css'
import Image from 'next/image'
// import  {useEffect} from "react";

// Context theme
// import { useThemeContext } from '../app/useThemeContext'

export default function InvoiceOverview() {

    return (
        <>
        <div className={`${styles.container}`}>
            <div className={`${styles.containerLeftSite}`}>
                <h3>#RT3080</h3>
                <p>Due  19 Aug 2021</p>
                <h1>£ 1,800.90</h1>
            </div>
            <div className={`${styles.containerRightSite}`}>
                <p>Jensen Huang</p>
                <div>paid</div>
            </div>
            <Image
                className={`${styles.imageArrowRight}`}
                src="/assets/icon-arrow-right.svg"
                alt="Picture of the user"
                width={8}
                height={8}
            />
        </div>
            
        </>
    )
}
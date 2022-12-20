"use client"

import design from '../styles/designsystem.module.css'
import styles from './headlineWithButtons.module.css'

import Image from 'next/image'

interface Props {
    countInvoices: number;
  }

export default function Headline(prop: Props) {

    const count = prop.countInvoices

    // controll mode changing 
    return (
        <>
            <div className={`${styles.order}`}>
                <div>
                    <h1 className={`${styles.headline}`}>Invoices</h1>
                    <h3 className={`${styles.secondLine}`}><span>{count ? count : 0 }</span> invoices</h3>
                </div>
                <div className={`${styles.orderButton}`}>
                    <h3>
                        <button className={`${design.btn} ${design.btn3Color} `}> 
                                <div className={` ${design.btn1} ${design.btnFlex} ${styles.btnWithArrow}`}>
                                    Filter
                                    <Image
                                        src="/assets/icon-arrow-down.svg"
                                        alt="Picture of the user"
                                        width={8}
                                        height={8}
                                        priority={true}
                                    />
                                </div>
                               
                        </button>
                    </h3>
                    <h3>
                        <div className={`${design.btn}  ${design.btnColor1}`}> 
                            <div className={` ${design.btn2} ${design.btnFlex}`}>
                                <div className={`${design.circle}`}>
                                    <div className={`${design.btnFlex}`}>+</div>
                                </div>
                                <div  className={`${design.text}`}>New</div>
                            </div>
                        </div>
                    </h3>
                </div>
            </div>
        </>
    )
}
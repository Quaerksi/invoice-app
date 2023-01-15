"use client"

import styles from './viewInvoice.module.css'
import invoiceOverview from '../../app/componentsApp/invoiceOverview.module.css'
import  PaidPendingDraft from '../../components/paidPendingDraft'

import Image from 'next/image'
import ActionField from './componentsViewInvoice/actionField'
import Table from'./componentsViewInvoice/table'

import type { Invoice } from '../../interfaces'
import useSWR from 'swr'

import Moment from 'react-moment'

import Link from 'next/link'

import { useSearchParams } from 'next/navigation';

import UpdateForm from './componentsUpdateInvoice/updateForm'

import React, {useState, useEffect} from 'react';

// call to my api, read data from DB
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Page() {

    // TO DO: Handle empty and wrong Invoice Id
    const [update, setUpdate] = useState<boolean>(true);
    // console.log(`In invoice ${update}`)
    // useEffect(() => {
    //     console.log(`Update: ${update}`)
    //   }, [update])
    
    const searchParams = useSearchParams();

     // call to my api, read data from DB
     const {data, error} = useSWR<Invoice>(`/api/invoices/${searchParams.get('id')}`, fetcher)

     if (error) return <div>Failed to load users</div>
     if (!data) return <div>Loading...</div>

    return(
        <>
            {update && <UpdateForm id={data.id} edit={true}/>}
            <Link href={`/`}>
                <div className={`${styles.btnGoBack}`}>
                    <Image
                        src="/assets/icon-arrow-left.svg"
                        alt="arrow down"
                        width={8}
                        height={8}
                        priority={true}
                    />
                        <h2>Go back</h2>
                </div>
            </Link>
            <div className={`${styles.statusOutside} ${invoiceOverview.containerDesign}`}>
                
                <div className={`${styles.status}`} >
                    {/* status */}
                    <h3 className={`${styles.statusH3} ${styles.colorThirdFont}`}>Status</h3>
                    {/* Pending / draft / paid */}
                    <PaidPendingDraft name='draft'/> {/* 110×42.9 */}
                </div>
                <div className={` ${styles.actionField} ${styles.actionFieldTop}`}>
                    <ActionField setUpdate={setUpdate}/>
                </div>
            </div>
            <div className={`${invoiceOverview.containerDesign}`}>
                <main className={`${styles.mainGrid}`}>
                    {/* grid */}
                    <div className={`${styles.gridContainerId}`}>
                        <h2 className={`${styles.id}`}>{data.id}</h2>
                        <p className={`${styles.description}  ${styles.colorThirdFont}`}>{data.description}</p>
                    </div>
                    <div className={`${styles.gridContainerAdress}`}>
                        <span className={`${styles.span} ${styles.colorThirdFont}`}>{data.senderAddress?.street}</span>
                        <span className={`${styles.span} ${styles.colorThirdFont}`}>{data.senderAddress?.city}</span>
                        <span className={`${styles.span} ${styles.colorThirdFont}`}>{data.senderAddress?.postCode}</span>
                        <span className={`${styles.span} ${styles.colorThirdFont}`}>{data.senderAddress?.country}</span>
                    </div>
                    <div className={`${styles.gridContainerDate}`}>
                        <p className={`${styles.colorThirdFont}`}>Invoice Date</p>
                        <h2 className={`${styles.detailsH2}`}>
                            <Moment format="DD MMM YYYY">
                                {data.createdAt}
                            </Moment>
                        </h2>
                    </div>
                    <div className={`${styles.gridContainerDue}`}>
                        <p className={`${styles.colorThirdFont}`}>Payment Due</p>
                        <h2 className={`${styles.detailsH2}`}>
                            <Moment format="DD MMM YYYY">
                                {data.paymentDue}
                            </Moment>
                        </h2>
                    </div>
                    <div className={`${styles.gridContainerBillTo}`}>
                        <p className={`${styles.colorThirdFont}`}>Bill to</p>
                        <h2 className={`${styles.detailsH2}`}>{data.clientName}</h2>
                        <span className={`${styles.span} ${styles.colorThirdFont}`}>{data.clientAddress?.city}</span>
                        <span className={`${styles.span} ${styles.colorThirdFont}`}>{data.clientAddress?.street}</span>
                        <span className={`${styles.span} ${styles.colorThirdFont}`}>{data.clientAddress?.postCode}</span>
                        <span className={`${styles.span} ${styles.colorThirdFont}`}>{data.clientAddress?.country}</span>
                    </div>
                    <div className={`${styles.gridContainerSendTo}`}>
                        <p className={`${styles.colorThirdFont}`}>Sent to</p>
                        <h2 className={`${styles.detailsH2}`}>{data.clientEmail}</h2>
                    </div>
                </main>
                {/* Table */}
                <Table items={data.items} total={data.total}/>
                 
            </div>
            <div className={`${invoiceOverview.containerDesign} ${styles.actionField} ${styles.actionFieldBottom}`}>
            <ActionField setUpdate={setUpdate}/>
            </div>
        </>
    )
}

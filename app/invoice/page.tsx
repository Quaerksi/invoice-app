"use client"

import styles from './viewInvoice.module.css'
import design from '../../styles/designsystem.module.css'

import  PaidPendingDraft from '../../components/paidPendingDraft'
import Image from 'next/image'
import ActionField from './componentsViewInvoice/actionField'
import Table from'./componentsViewInvoice/table'
import UpdateForm from './componentsUpdateInvoice/updateForm'
import PopUpBox from './popUpBox/popUpBox'

import type { Invoice } from '../../interfaces/invoice'

import useSWR from 'swr'
import Moment from 'react-moment'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React, {useState, useEffect, useRef} from 'react';

// call to my api, read data from DB
const fetcher = (url: string) => fetch(url).then((res) => res.json())


export default function Page() {

    const searchParams = useSearchParams();
    // const searchId = searchParams.get('id')

    // TO DO: Handle empty and wrong Invoice Id
    const [update, setUpdate] = useState<boolean>(false);
    const [deleteInvoice, setDeleteInvoice] = useState<boolean>(false);

    const refBackground = useRef(null);

    const {data, error} = useSWR<Invoice>(`/api/invoices/${searchParams.get('id')}`, fetcher)
        
        if (error) return <div>Failed to load users</div>
        if (!data) return <div>Loading...</div>


    return(
        <>
        {deleteInvoice && <PopUpBox setDeleteInvoice={setDeleteInvoice} id={data.id}/>}
        <div ref={refBackground} className={`${styles.background}`}></div>
        <div  className={`${styles.container}`}>
                {update && <UpdateForm id={data.id} edit={true} setUpdate={setUpdate} update={update} />}
                <Link href={`/`}>
                    <div className={`${design.btnGoBack}`}>
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
                <div className={`${styles.statusOutside} ${design.containerDesign}`}>
                    
                    <div className={`${styles.status}`} >
                        {/* status */}
                        <h3 className={`${styles.statusH3} ${styles.colorThirdFont}`}>Status</h3>
                        
                        {/* Pending / draft / paid */}
                        {/* 110×42.9 */}
                        {data.status === 'draft' && <PaidPendingDraft name='draft'/>} 
                        {data.status === 'pending' && <PaidPendingDraft name='pending'/>}
                        {data.status === 'paid' && <PaidPendingDraft name='paid'/>}
                    </div>
                    <div className={` ${design.actionField} ${design.actionFieldTop}`}>
                        <ActionField setUpdate={setUpdate} setDeleteInvoice={setDeleteInvoice}/>
                    </div>
                </div>
                <div className={`${design.containerDesign}`}>
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
                <div className={`${design.containerDesign} ${design.actionField} ${design.actionFieldBottom}`}>
                    <ActionField setUpdate={setUpdate} setDeleteInvoice={setDeleteInvoice}/>
                </div>
                </div>
        </>
    )
}

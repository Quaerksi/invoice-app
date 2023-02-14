import styles from './noInvoicesThere.module.css'

import Image from 'next/image'

export default function NoInvoicesThere(){
    return <>
            <div className={`${styles.container}`}>
               
               <div className={`${styles.content}`}>
               <div>
                   <Image
                        src="/assets/illustration-empty.svg"
                        alt="Image showing no invoices listed"
                        width={150}
                        height={150}
                        className={`${styles.image}`}
                    />
                </div>
                <h1>There is nothing here</h1> 
                <p>Create an invoice by clicking the New button and get started</p>
               </div>
            </div>
        </>
}
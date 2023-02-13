import styles from './popUpBox.module.css'
import design from '../../../styles/designsystem.module.css'
import { Dispatch, SetStateAction } from 'react'

import {useRouter} from 'next/navigation'

type Props = {
    id: string,
    setDeleteInvoice: Dispatch<SetStateAction<boolean>>
}

export default function PopUpBox(props:Props) {

    const router = useRouter()

    const deleteInvoice = async() => {
        // console.log('delete more')
        const response = await fetch(`/api/invoices/${props.id}`, {
            method: "DELETE",
            body: JSON.stringify({
                'id': `${props.id}`
           }),
            headers: {
                    "Content-Type": "application/json",
            },
        });

        if(response.status == 200){
            
            router.push('/')
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.popUpBox}>
                    <h1>Confirm Deletion</h1>
                    <p>Are you sure you want to delete invoice #XM9141? This action cannot be undone.</p>
                    <h3 className={`${styles.buttonPosition}`} onClick={deleteInvoice} >
                        <button className={`${design.btn} ${design.btn5Color}`}> 
                            <div className={` ${design.btn1} ${design.btnFlex}`}>
                                Delete
                            </div>
                        </button>
                    </h3>
                    <h3 className={`${styles.buttonPosition} ${styles.spaceButton}`}>
                        <button className={`${design.btn} ${design.btn3Color}`} onClick={() => props.setDeleteInvoice(deleteGUI => !deleteGUI)}> 
                                <div className={` ${design.btn1} ${design.btnFlex}`}>
                                    Cancel
                                </div>
                        </button>
                    </h3>
                </div>
            </div>
        </>
    )
}
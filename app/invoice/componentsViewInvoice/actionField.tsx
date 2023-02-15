import { Dispatch, SetStateAction } from 'react';
import design from '../../../styles/designsystem.module.css';
import style from './actionField.module.css'

type Props = {
    setUpdate: Dispatch<SetStateAction<boolean>>,
    setDeleteInvoice: Dispatch<SetStateAction<boolean>>,
    setMarkAsPaidMessage: Dispatch<SetStateAction<string>>,
    id: string,
    status?: string
}

export default function ActionField(props:Props) {

    const changeStatus = async() => {

        if(props.status == 'pending'){
            const response = await fetch(`/api/invoices/${props.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    "id": `${props.id}`,
                    "status": `paid`
                }),
                headers: {
                        "Content-Type": "application/json",
                },
            });

            if(response.status == 200){
         
                location.reload() 
            }
        } else if (props.status == 'paid'){
            props.setMarkAsPaidMessage('Status is already paid')
            console.log('Status is already paid')
        } else if (props.status == 'draft'){
            props.setMarkAsPaidMessage('Please complete all information')
            console.log('Status has to be pending first. Please complete all information')
        }    

        
    }

return <>
            <h3 className={`${style.h3}`}>
                <button onClick={() => props.setUpdate(update => !update)} className={`${design.btn} ${design.btn3Color}`}> 
                        <div className={` ${design.btn1} ${design.btnFlex}`}>
                            Edit
                        </div>
                </button>
            </h3>
            <h3 className={`${style.h3}`} onClick={() => props.setDeleteInvoice(deleteGUI => !deleteGUI)}>
                <button className={`${design.btn} ${design.btn5Color}`}> 
                    <div className={` ${design.btn1} ${design.btnFlex}`}>
                        Delete
                    </div>
                </button>
            </h3>
            <h3 className={`${style.h3}`} onClick={changeStatus}>
                <button className={`${design.btn} ${design.btnColor1}`}> 
                    <div className={` ${design.btn1} ${design.btnFlex}`}>
                        Mark as paid
                    </div>
                </button>
            </h3>
        </>
}
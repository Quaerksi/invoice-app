import { Dispatch, SetStateAction } from 'react';
import design from '../../../styles/designsystem.module.css';
import style from './actionField.module.css'

type Props = {
    setUpdate: Dispatch<SetStateAction<boolean>>,
    setDeleteInvoice: Dispatch<SetStateAction<boolean>>
}

export default function ActionField(props:Props) {
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
            <h3 className={` ${style.h3}`}>
                <button className={`${design.btn} ${design.btnColor1}`}> 
                    <div className={` ${design.btn1} ${design.btnFlex}`}>
                        Mark as paid
                    </div>
                </button>
            </h3>
        </>
}
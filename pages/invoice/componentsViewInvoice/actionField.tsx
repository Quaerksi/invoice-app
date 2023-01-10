import design from '../../../styles/designsystem.module.css';
import style from './actionField.module.css'

export default function ActionField() {
return <>
            <h3 className={`${style.h3}`}>
                <button className={`${design.btn} ${design.btn3Color}`}> 
                        <div className={` ${design.btn1} ${design.btnFlex}`}>
                            Edit
                        </div>
                </button>
            </h3>
            <h3 className={` ${style.h3}`}>
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
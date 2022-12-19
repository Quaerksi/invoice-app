"use client"

import styles from './designsystem.module.css'
import '../../styles/globals.css'
import React, {createContext, useState} from 'react'
import DropdownDefault from '../../components/dropdownDefault'
import DatePicker, {registerLocale} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import de from 'date-fns/locale/de';
registerLocale('de', de);

import Image from 'next/image' 
// import Link from 'next/link'

export default function Page() {

    const [startDate, setStartDate] = useState(new Date());


  return   (     
    <>
        <h1 className={`${styles.h1}`}>Designsystem</h1>
        <div className={`${styles.order}`}>
            <div>
                <h3>Button 1</h3>
                <h3>
                    <button className={`${styles.btn} ${styles.btnColor1}`}> 
                        <div className={` ${styles.btn1} ${styles.btnFlex}`}>
                            Mark as paid
                        </div>
                    </button>
                </h3>
            </div>
            <div>
                <h3>Button 2</h3>
                <h3>
                    <div className={`${styles.btn}  ${styles.btnColor1}`}> 
                        <div className={` ${styles.btn2} ${styles.btnFlex}`}>
                            <div className={`${styles.circle}`}>
                                <div className={`${styles.btnFlex}`}>+</div>
                            </div>
                            <div  className={`${styles.text}`}>Mark as paid</div>
                        </div>
                    </div>
                </h3>
            </div>

            <div>
                <h3>Button 3 - Light/Dark</h3>
                <div  className={`${styles.order2}`}>
                    <h3>
                        <button className={`${styles.btn} ${styles.btn3Color}`}> 
                                <div className={` ${styles.btn1} ${styles.btnFlex}`}>
                                    Edit
                                </div>
                        </button>
                    </h3>
                </div>
            </div>
        </div>
        
        <div className={`${styles.order}`}>
            <div>
                <h3>Button 4 - Light/Dark</h3>
                    <h3>
                        <button className={`${styles.btn} ${styles.btn4Color}`}> 
                            <div className={` ${styles.btn1} ${styles.btnFlex}`}>
                                Save as Draft
                            </div>
                        </button>
                    </h3>
            </div>

            <div>
                <h3>Button 5 </h3>
                <h3>
                    <button className={`${styles.btn} ${styles.btn5Color}`}> 
                        <div className={` ${styles.btn1} ${styles.btnFlex}`}>
                            Delete
                        </div>
                    </button>
                </h3>
            </div>

            <div>
                <h3>Button 6</h3>
                    <h3>
                        <button className={`${styles.btn} ${styles.btn6Color}`}> 
                            <div className={`${styles.btn1}  ${styles.btn3} ${styles.btnFlex}`}>
                                + Add New Item
                            </div>
                        </button>
                    </h3>
            </div>
        </div>

        <h1 className={`${styles.h1}`}>Form Elements Light</h1>
        <div className={`${styles.order}`}>
            <div>
                <form className={`${styles.form}`} action="" method="post">
                    <DropdownDefault name='Payment Terms' elements={['Next 1 day', 'Next 7 days', 'Next 14 days', 'Next 30 days']}/>
                    
                        <h3>Text Field</h3>
                        <label  htmlFor="adress">Street Address:</label>
                        <input className={`${styles.input}`} type="text" id="adress" name="adress" />                        
        
                        <h3>Date 1</h3>
                        <label htmlFor="date">Issue Date:</label>
                        <DatePicker 
                            locale="de"
                            dateFormat="dd MMM yyyy"
                            showPopperArrow={false}
                            closeOnScroll={true}
                            selected={startDate} 
                            onChange={(date:Date) => setStartDate(date)} 
                        />
                        <Image
                            src="/assets/icon-calender.svg"
                            alt="icon calender"
                            height={7}
                            width={11}
                        />
                </form>
            </div>
        </div>
    </>
    )
  
}
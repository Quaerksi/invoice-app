"use client"

import '../../styles/globals.css'
import styles from './designsystem.module.css'
import React, {useEffect, useRef} from 'react'
import Image from 'next/image' 
// import Link from 'next/link'

export default function Page() {
    const refDropdown = useRef(null); 

    useEffect(() => {

        // add eventlistener her, so dropdown can be more or less li elements without a problem
        var list = document.querySelectorAll('.dropdownContent li')
        list.forEach(li => li.addEventListener('click', handleDropdownMethod))
    
        // cleanup this component
        return () => {

            list.forEach(li => li.removeEventListener('click', handleDropdownMethod))
        };
      }, []);

    //   find the right typescript type for this!
      let handleDropdownMethod = (e:any) => {

        let target = e.target
        // get innerHtml from clicked list element 
        // and  put it into the .dropdownLabel > span -> ref: refDropdown


      }

  return         <>
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
                    <div>
                        <h3>Text Field</h3>
                        <label className={`${styles.label}`} htmlFor="adress">Street Address:</label>
                        <input className={`${styles.input}`} type="text" id="adress" name="adress" />
                    </div>
                    <div>
                        <h3>Dropdown Default</h3>
                        {/* dropdown eventlistener functionality for each list element is added in useEffect */}
                        <div className={`${styles.dropdown}`}>
                            Payment Terms
                            <div className={`${styles.dropdownLabel}`}>
                                <span ref={refDropdown}> Next 1 Day </span>
                                <Image
                                    src="/assets/icon-arrow-down.svg"
                                    alt="arrow down symbol"
                                    height={7}
                                    width={11}
                                />
                            </div>
                            <ul className={`${styles.dropdownContent}`}>
                                <li><span> Next 1 Day </span></li>
                                <li><span> Next 7 Days </span></li>
                                <li><span> Next 14 Days </span></li>
                                <li><span> Next 30 Days </span></li>
                            </ul>
                        </div>
                    </div>
                </form>
      </div>

  </div>
</>;
}
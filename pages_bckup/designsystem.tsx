// import Head from 'next/head'
// import Image from 'next/image' 
// import Link from 'next/link'

import styles from '../styles/designsystem.module.css'

export default function Designsystem() {

  // console.log(`Data: ${JSON.stringify(data)}`)

  return (
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
                    <h3>Button 3 - Light / Dark</h3>
                    <div  className={`${styles.order2}`}>
                        <h3>
                        <button className={`${styles.btn} ${styles.btn3ColorLight}`}> 
                                <div className={` ${styles.btn1} ${styles.btnFlex}`}>
                                    Edit
                                </div>
                            </button>
                        </h3>
                        <h3>
                            <button className={`${styles.btn} ${styles.btn3ColorDark}`}> 
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
                    <h3>Button 4 - Light / Dark</h3>
                        <h3>
                            <button className={`${styles.btn} ${styles.btn4ColorLight}`}> 
                                <div className={` ${styles.btn1} ${styles.btnFlex}`}>
                                    Save as Draft
                                </div>
                            </button>
                        </h3>
                        <h3>
                            <button className={`${styles.btn} ${styles.btn4ColorDark}`}> 
                                <div className={` ${styles.btn1} ${styles.btnFlex}`}>
                                    Save as Draft
                                </div>
                            </button>
                        </h3>
                </div>
            </div>
        </>
  )
}

// import Head from 'next/head'
// import Image from 'next/image' 
// import Link from 'next/link'

import styles from '../styles/designsystem.module.css'

export default function Designsystem() {

  // console.log(`Data: ${JSON.stringify(data)}`)

  return (
        <>
            <h1>Designsystem</h1>

            <h3>Button 1</h3>
            <h3>
                <button className={`${styles.btn}`}> 
                    <div className={` ${styles.btn1} ${styles.btnFlex}`}>
                        Mark as paid
                    </div>
                </button>
            </h3>

            <h3>Button 2</h3>
            <h3>
            <div className={`${styles.btn}`}> 
                    <div className={` ${styles.btn2} ${styles.btnFlex}`}>
                        <div className={`${styles.circle}`}>
                            <div className={`${styles.btnFlex}`}>+</div>
                        </div>
                        <div  className={`${styles.text}`}>Mark as paid</div>
                    </div>
                </div>
            </h3>

            


        </>
  )
}

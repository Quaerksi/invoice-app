"use client"

import styles from './paidPendingDraft.module.css'

interface Props{
    name: string | undefined
}

export default function PaidPendingDraft(prop: Props) {

    let color = 'Green'

    if(prop.name === "paid"){
        color = 'Green'
    }
    else if (prop.name === "pending"){
        color = 'Orange'
    }

    else if (prop.name === "draft"){
        color = 'Gray'
    }

return (
    <>
        {color === 'Green' &&  
            <div className={`${styles.paidPendingDraft} ${styles.backgroundColorGreenTransparent}`}>
                <div className={`${styles.paidPendingDraftPoint} ${styles.backgroundColorGreen}`}></div>
                <h3 className={`${styles.paidPendingDraftName} ${styles.fontColorGreen}`}>{prop.name}</h3>
            </div>
        }
        {color === 'Orange' &&  
            <div className={`${styles.paidPendingDraft} ${styles.backgroundColorOrangeTransparent}`}>
                <div className={`${styles.paidPendingDraftPoint} ${styles.backgroundColorOrange}`}></div>
                <h3 className={`${styles.paidPendingDraftName} ${styles.fontColorOrange}`}>{prop.name}</h3>
            </div>
        }
         {color === 'Gray' &&  
            <div className={`${styles.paidPendingDraft} ${styles.backgroundColorGrayTransparent}`}>
                <div className={`${styles.paidPendingDraftPoint} ${styles.backgroundColorGray}`}></div>
                <h3 className={`${styles.paidPendingDraftName} ${styles.fontColorGray}`}>{prop.name}</h3>
            </div>
        }

    </>
    )
}
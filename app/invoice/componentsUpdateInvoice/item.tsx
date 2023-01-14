import designsystem from '../../../styles/designsystem.module.css'
import styles from './item.module.css'

import Image from 'next/image' 
import { useRef, useEffect, useState } from 'react';

export default function Item() {
    
    const deleteItem = useRef<HTMLDivElement>(null);
    const total = useRef<HTMLInputElement>(null);
    const [qty, setQty] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    useEffect(() => {    
        console.log('Changed') 
        let inputElement = total.current;
        console.log(inputElement)
        if(inputElement){
            // inputElement.value = (qty * price).toString()
            inputElement.value = `${qty * price}`
        }
    }, [qty, price]);

    let deleteThis = () => {

        let container = deleteItem.current

        if(container){
            container.remove()
        }
    }

    return  <>
                <div ref={deleteItem} className={`${styles.container}`}>
                    <div className={`${styles.name}`}>
                        <label  htmlFor="adress">Item Name</label>
                        <input className={`${designsystem.input}`} type="text" id="adress" name="adress" required/> 
                    </div>
                    <div className={`${styles.qty}`}> 
                        <label  htmlFor="qty">Qty.</label>
                        <input className={`${designsystem.input} ${styles.input}`} type="number" step="0.01" id="qty" name="qty" defaultValue={`0`} onChange={(e) => setQty(Number(e.target.value))} required/>   
                    </div> 
                    <div className={`${styles.price}`}> 
                        <label  htmlFor="price">Price</label>
                        <input className={`${designsystem.input} ${styles.input}`} type="number" step="0.01" id="price" name="price" defaultValue={`0`} onChange={(e) => setPrice(Number(e.target.value))} required/>
                    </div>
                    <div className={`${styles.total}`}> 
                        <label  htmlFor="total">Total</label>
                        <input ref={total} className={`${designsystem.input} ${styles.input}`} type="number" step="0.01" id="total" name="total" defaultValue={`0`} required/>
                    </div>
                    <div className={`${styles.del}`} onClick={deleteThis}>
                        <Image
                            src="/assets/icon-delete.svg"
                            alt="arrow down symbol"
                            height={15}
                            width={12}
                            priority={true}
                        />
                    </div>
                </div>    
            </>
}
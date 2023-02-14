
import styles from './table.module.css'


interface Item {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }

  interface Props {
    items: Array<Item> | undefined;
    total: number;
  }

export default function Table(props:Props) {

    let allItems:React.ReactElement[] = [];

    if(props.items && props.items.length > 0){
        props.items.forEach(c =>{
        // {small screen}
        allItems.push(
            <tbody key={Math.random()} className={`${styles.seeOnSmallScreen}`}>
                <tr>
                <td>
                    <span className={`${styles.span} ${styles.tablePositionName}`}>{c.name}</span>
                    <span className={`${styles.span} ${styles.colorFourthFont}`}>{c.quantity} x &pound;{c.price}</span>
                </td>
                <td>&pound;{c.total}</td>
            </tr>
            </tbody>)
        {/* big screen */}
        allItems.push(
            <tbody key={Math.random()} className={`${styles.seeOnBigScreen}`}>
                <tr>
                    <td>
                        <span style={{width: '100px'}} className={`${styles.span} ${styles.tablePositionName}`}>{c.name}</span>
                        <span className={`${styles.span} ${styles.colorFourthFont}`}></span>
                    </td>
                    <td style={{width: '20px', textAlign: 'right'}}>{c.quantity}</td>
                    <td style={{width: '50px', textAlign: 'right'}}>&pound;{c.price}</td>
                    <td style={{width: '50px', textAlign: 'right'}}>&pound;{c.total}</td>
                </tr>
            </tbody>
        )
    })
    }

return <>
    <table className={`${styles.table}`}>
            <tbody className={`${styles.seeOnBigScreen}`}>
                <tr>
                    <th style={{width: '100px', textAlign: 'left'}}>Item Name</th>
                    <th style={{width: '20px', textAlign: 'right'}}>QTY.</th>
                    <th style={{width: '50px', textAlign: 'right'}}>Price</th>
                    <th style={{width: '50px', textAlign: 'right'}}>Total</th>
                </tr>
            </tbody>

            {allItems}

            <tbody>
                <tr className={`${styles.tableSum}`}>
                    <td>
                    <span className={`${styles.span}`}>Grand Total</span>
                    </td>
                    <td>&pound;{props.total}</td>
                </tr>
            </tbody>
        </table>
    </>
}
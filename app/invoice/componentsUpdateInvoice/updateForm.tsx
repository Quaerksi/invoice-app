import styles from './updateForm.module.css'
import designsystem from '../../../styles/designsystem.module.css'

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, {registerLocale} from 'react-datepicker'

import React, { useState, useRef, useEffect} from 'react'
import DropdownDefault from '../../../components/dropdownDefault'
import "react-datepicker/dist/react-datepicker.css"
import de from 'date-fns/locale/de';
registerLocale('de', de);

import useSWR from 'swr'
import type { Invoice } from '../../../interfaces'
import Item from './item';
import { data } from '../../../data/data';

type Params = {
    id: String
    edit: Boolean
}

type stateString = string

// call to my api, read data from DB
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function UpdateForm(params:Params) {

    const [startDate, setStartDate] = useState(new Date('21 Aug 2021'));
    const [invoices, setInvoices] = useState<React.ReactElement[]>([])
    // sender
    const [senderStreet, setSenderStreet] = useState<stateString>('');
    const [senderCity, setSenderCity] = useState<stateString>('');
    const [senderPostCode, setSenderPostCode] = useState<stateString>('');
    const [senderCountry, setSenderCountry] = useState<stateString>('');
    // client
    const [clientName, setClientName] = useState<stateString>('');
    const [clientEmail, setClientEmail] = useState<stateString>('');
    const [clientStreet, setClientStreet] = useState<stateString>('');
    const [clientCity, setClientCity] = useState<stateString>('');
    const [clientPostCode, setClientPostCode] = useState<stateString>('');
    const [clientCountry, setClientCountry] = useState<stateString>('');
    // project description
    const [projectDescription, setProjectDescription] = useState<stateString>('');
    // items
    const itemsRef = useRef<HTMLInputElement>(null);

    //  useEffect(() => {
    //     console.log(`Update: ${senderStreetAdress} , ${dataInvoice.senderAddress?.street}`)
    //   }, [senderStreetAdress])

    useEffect(() => {

        let invoicesCurrent:React.ReactElement[] = []

        try{
            if(dataItems){
                
                invoicesCurrent = dataItems.map((item,index,arr) => <Item key={`item${index}`} name={`${item.name}`} quantity={item.quantity} price={item.price} total={item.total}/>)
                setInvoices(invoicesCurrent)
            }  
        }catch(error){
            console.error(`Error ${error}`);    
        } 
      }, [])

    // dummy for create new Invoice
    // TO DO: create fitting id = letter letter number number number number
    var invoiceId:String = '1'
    var dataInvoice:Invoice = {
        "id": "XM9141",
        "createdAt": `${new Date()}`,
        "paymentDue": "",
        "description": "",
        "paymentTerms": 30,
        "clientName": "",
        "clientEmail": "",
        "status": "draft",
        "senderAddress": {
          "street": "",
          "city": "",
          "postCode": "",
          "country": ""
        },
        "clientAddress": {
          "street": "",
          "city": "",
          "postCode": "",
          "country": ""
        },
        "items": [
        ],
        "total": 0
      }

    if(params.edit === true) {

        // call to my api, read data from DB
        const {data, error} = useSWR<Invoice>(`/api/invoices/${params.id}`, fetcher)

        if(data){
            dataInvoice = data
            invoiceId = params.id            
        }
    
        if (error) return <div>Failed to load users</div>
        if (!data) return <div>Loading...</div>
    }

    // TO DO: handle this file for - create new invoice

    const handleSubmit = async (event:React.FormEvent) => {

        // TO DO: close form
        event.preventDefault();

        // handle items
        // TO DO: performance?
        let newItems = itemsRef.current
        let items= new Array()
        let newitemsArray = ''
        if(newItems){
            let itemSets = newItems.children
            for (var i = 0; i < itemSets.length; i++) {
                let itemSetElements = itemSets[i].children
                    items.push({
                        "name": `${itemSetElements[0].getElementsByTagName('input')[0].value}`,
                        "quantity": `${itemSetElements[1].getElementsByTagName('input')[0].value}`,
                        "price": `${itemSetElements[2].getElementsByTagName('input')[0].value}`,
                        "total": `${itemSetElements[3].getElementsByTagName('input')[0].value}`
                    })
                    newitemsArray=JSON.stringify(items)
            }

        }

        // PUT if  edit Invoice (POST if new Invoice)
        if(params.id != 'X'){
            const response = await fetch(`/api/invoices/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    "id": `${invoiceId}`,
                    "description": `${projectDescription != '' ? projectDescription : dataInvoice.description}`,
                    "paymentTerms": 1,
                    "clientName": `${clientName != '' ? clientName : dataInvoice.clientName}`,
                    "clientEmail": `${clientEmail != '' ? clientEmail : dataInvoice.clientEmail}`,
                    "senderAddress": {
                    "street": `${senderStreet != '' ? senderStreet : dataInvoice.senderAddress?.street}`,
                    "city": `${senderCity != '' ? senderCity : dataInvoice.senderAddress?.city}`,
                    "postCode": `${senderPostCode != '' ? senderPostCode : dataInvoice.senderAddress?.postCode}`,
                    "country": `${senderCountry != '' ? senderCountry : dataInvoice.senderAddress?.country}`
                    },
                    "clientAddress": {
                    "street":  `${clientStreet != '' ? clientStreet : dataInvoice.clientAddress?.street}`,
                    "city":  `${clientCity != '' ? clientCity : dataInvoice.clientAddress?.city}`,
                    "postCode":  `${clientPostCode != '' ? clientPostCode : dataInvoice.clientAddress?.postCode}`,
                    "country":  `${clientCountry != '' ? clientCountry : dataInvoice.clientAddress?.country}`
                    },
                    items
                    ,
                    "total": 102.04
                }),
                headers: {
                        "Content-Type": "application/json",
                },
            });
        }
    }

    let dataItems = dataInvoice.items
    

    let addNewItem = () => {
            // key between 101 -1000
            const newNode:React.ReactElement = <Item key={Math.floor(Math.random()*(1000-100)+100)} name='' quantity={0} price={0} total={0}/>
            setInvoices(thisArray => [...thisArray, newNode])
    }

return <>
            <div className={`${styles.container}`}>
            <form onSubmit={handleSubmit}>
                <button type="submit">Submit</button>
                <h1 className={`${styles.h1}`}>Edit <span className={`${styles.hashtagColor}`}>#</span><span id='invoiceId'>{invoiceId}</span></h1>
                <h6 className={`${styles.colorPurple} ${styles.letterSpacing} ${styles.headline}`}>Bill From</h6>
                <div className={`${styles.stretch} ${styles.margin}`}>
                    <label htmlFor="senderStreet">Street Address:</label>
                    <input className={`${designsystem.input}`} type="text" id="senderStreet" name="senderStreet" defaultValue={dataInvoice.senderAddress?.street} onInput={e => setSenderStreet((e.target as HTMLInputElement).value)} required/> 
                </div>
                <div className={`${styles.grid}`}>
                    <div className={`${styles.inline} ${styles.marginRight}`}>
                        <label htmlFor="senderCity">City:</label>
                        <input className={`${designsystem.input}`} type="text" id="senderCity" name="senderCity" defaultValue={`${dataInvoice.senderAddress?.city}`}  onInput={e => setSenderCity((e.target as HTMLInputElement).value)}  required/> 
                    </div>
                    <div className={`${styles.inline} ${styles.marginRight}`}>
                        <label  htmlFor="senderPostCode">Post Code:</label>
                        <input className={`${designsystem.input}`} type="text" id="senderPostCode" name="senderPostCode" defaultValue={`${dataInvoice.senderAddress?.postCode}`}  onInput={e => setSenderPostCode((e.target as HTMLInputElement).value)} required/> 
                    </div>
                    <div className={`${styles.inline}`}>
                        <label  htmlFor="senderCountry">Country:</label>
                        <input className={`${designsystem.input}`} type="text" id="senderCountry" name="senderCountry" defaultValue={`${dataInvoice.senderAddress?.country}`}  onInput={e => setSenderCountry((e.target as HTMLInputElement).value)} required/> 
                    </div>
                </div>
                <h6 className={`${styles.colorPurple} ${styles.letterSpacing} ${styles.headline}`}>Bill To</h6>
                <div className={`${styles.stretch}`}>
                    <label htmlFor="clientName">Client's Name:</label>
                    <input className={`${designsystem.input}`} type="text" id="clientName" name="clientName" defaultValue={`${dataInvoice.clientName}`} onInput={e => setClientName((e.target as HTMLInputElement).value)} required/> 
                </div>
                <div className={`${styles.stretch}`}>
                    <label htmlFor="clientEmail">Client's Email:</label>
                    <input className={`${designsystem.input}`} type="email" id="clientEmail" name="clientEmail" defaultValue={`${dataInvoice.clientEmail}`} onInput={e => setClientEmail((e.target as HTMLInputElement).value)} required/> 
                </div>
                <div className={`${styles.stretch}`}>
                    <label htmlFor="clientStreet">Street Address:</label>
                    <input className={`${designsystem.input}`} type="text" id="clientStreet" name="clientStreet" defaultValue={`${dataInvoice.clientAddress?.street}`} onInput={e => setClientStreet((e.target as HTMLInputElement).value)} required/> 
                </div>
                <div className={`${styles.grid}`}>
                    <div className={`${styles.inline} ${styles.marginRight}`}>
                        <label htmlFor="clientCity">City:</label>
                        <input className={`${designsystem.input}`} type="text" id="clientCity" name="clientCity" defaultValue={`${dataInvoice.clientAddress?.city}`} onInput={e => setClientCity((e.target as HTMLInputElement).value)} required/> 
                    </div>
                    <div className={`${styles.inline} ${styles.marginRight}`}>
                        <label  htmlFor="clientPostCode">Post Code:</label>
                        <input className={`${designsystem.input}`} type="text" id="clientPostCode" name="clientPostCode" defaultValue={`${dataInvoice.clientAddress?.postCode}`} onInput={e => setClientPostCode((e.target as HTMLInputElement).value)} required/> 
                    </div>
                    <div className={`${styles.inline}`}>
                        <label  htmlFor="clientCountry">Country:</label>
                        <input className={`${designsystem.input}`} type="text" id="clientCountry" name="clientCountry" defaultValue={`${dataInvoice.clientAddress?.country}`} onInput={e => setClientCountry((e.target as HTMLInputElement).value)} required/> 
                    </div>
                </div>
                {/* TO DO: If invoice exist already then font-color light gray and readOnly, if invoice new then font-color black and changeable */}
                <div  className={`${styles.grid2} ${styles.inline}`}>
                    <div className={`${styles.width}`}>
                        <label htmlFor="date">Invoice Date:</label>
                        <DatePicker 
                            locale="de"
                            dateFormat="dd MMM yyyy"
                            showPopperArrow={false}
                            closeOnScroll={true}
                            selected={startDate} 
                            readOnly={true}
                            onChange={(date:Date) => setStartDate(new Date(`${dataInvoice.createdAt}`))} 
                        />
                    </div>
                    <div className={`${styles.widthDropdown}`}>
                        {/* TO DO: extract days, calculate expirering date */}
                        <DropdownDefault name='Payment Terms' elements={['Next 1 day', 'Next 7 days', 'Next 14 days', 'Next 30 days']} defaultValue={`Next ${dataInvoice.paymentTerms} days`}/>
                    </div>
                </div>
                <div className={`${styles.stretch}`}>
                    <label htmlFor="projectDescription">Project Description:</label>
                    <input className={`${designsystem.input}`} type="text" id="projectDescription" name="projectDescription"  defaultValue={`${dataInvoice.description}`} onInput={e => setProjectDescription((e.target as HTMLInputElement).value)} required/> 
                </div>
                <h2 className={`${styles.itemListHeadline}`}>Item List</h2>
                <div ref={itemsRef} className={`${styles.items}`}>
                    {invoices}
                </div>
                <h3>
                        <button  type="button" className={`${designsystem.btn} ${designsystem.btn6Color} ${styles.btnAddNewItem}`} onClick={addNewItem}> 
                            <div className={`${designsystem.btn1}  ${designsystem.btn3} ${designsystem.btnFlex}`}>
                                + Add New Item
                            </div>
                        </button>
                    </h3>
            </form>
            </div>
        </>
}
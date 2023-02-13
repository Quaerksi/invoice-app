import styles from './updateForm.module.css'
import designsystem from '../../../styles/designsystem.module.css'

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, {registerLocale} from 'react-datepicker'

import React, { useState, useRef, useEffect, Dispatch, SetStateAction} from 'react'
import DropdownDefault from '../../../components/dropdownDefault'
import "react-datepicker/dist/react-datepicker.css"
import de from 'date-fns/locale/de';
registerLocale('de', de);

import useSWR from 'swr'
import type { Invoice } from '../../../interfaces/invoice'
import type { Item } from '../../../interfaces/item'

import ItemGUI from './itemGUI';

import Link from 'next/link';
import Image from 'next/image'

import design from '../../../styles/designsystem.module.css'

type Params = {
    id: String
    edit: Boolean
    setUpdate: Dispatch<SetStateAction<boolean>>
    update: Boolean
}

// an :Invoice dummy
var dataInvoice:Invoice = {

    "id": "",
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


// call to my api, read data from DB
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// QUESTION: Is ot good to fetch data again for avoiding conflict or is it better to push data as param for less traffic
// at the moment: fetch data again for avoiding conflict (more code as well)
// TO DO: handle this file for - create new invoice
// TO DO: make draft possible -> If not all fields are filled out, it is a draft
export default function UpdateForm(params:Params) {

    const [startDate, setStartDate] = useState(new Date('21 Aug 2021'));
    const [invoices, setInvoices] = useState<React.ReactElement[]>([])
    
    // sender
    const [senderStreet, setSenderStreet] = useState<string>('');
    const [senderCity, setSenderCity] = useState<string>('');
    const [senderPostCode, setSenderPostCode] = useState<string>('');
    const [senderCountry, setSenderCountry] = useState<string>('');
    // client
    const [clientName, setClientName] = useState<string>('');
    const [clientEmail, setClientEmail] = useState<string>('');
    const [clientStreet, setClientStreet] = useState<string>('');
    const [clientCity, setClientCity] = useState<string>('');
    const [clientPostCode, setClientPostCode] = useState<string>('');
    const [clientCountry, setClientCountry] = useState<string>('');
    // project description
    const [projectDescription, setProjectDescription] = useState<string>('');
    // items
    const itemsRef = useRef<HTMLInputElement>(null);

    // dummy for create new Invoice
    var invoiceId:String = '1'
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

    // catch invoice items
    let dataItems:Array<Item> = [];
    if(dataInvoice.items && typeof dataInvoice.items != typeof Array){

      dataItems = dataInvoice.items
    }  

    // push invoice items to GUI
    useEffect(() => {

        let invoicesCurrent:React.ReactElement[] = []
        try{
            if(dataItems && dataItems.length != 0){
                invoicesCurrent = dataItems.map((item,index,arr) => <ItemGUI key={`item${index}`} name={`${item.name}`} quantity={item.quantity} price={item.price} total={item.total}/>)
                setInvoices(invoicesCurrent)
            }  
        }catch(error){
            console.error(`Error ${error}`);    
        } 
      }, [])

   let addNewItem = () => {
           // key between 101 -1000
           // TO DO: create fitting id = letter letter number number number number
           const newNode:React.ReactElement = <ItemGUI key={Math.floor(Math.random()*(1000-100)+100)} name='' quantity={0} price={0} total={0}/>
           setInvoices(thisArray => [...thisArray, newNode])
   }

    const handleSubmit = async (event:React.FormEvent) => {

        event.preventDefault();

        // handle items
        // QUESTION: is this an appropriate performance
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
                    "status": `pending`,
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

            if(response.status == 200){
         
                location.reload() 
            }
        }
    }

return <>
        <div className={`${styles.background}`}></div> 
            <div className={`${styles.container}`}>
            <form onSubmit={handleSubmit}>
                <div className={`${styles.form}`}>
                {/* <button type="submit">Submit</button> */}
                <Link href={`/invoice?id=${invoiceId}`} onClick={() => params.setUpdate(false)}>
                    <div className={`${design.btnGoBack}`}>
                        <Image
                            src="/assets/icon-arrow-left.svg"
                            alt="arrow down"
                            width={8}
                            height={8}
                            priority={true}
                        />
                            <h2>Go back</h2>
                    </div>
                </Link>
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
                </div>
                <div className={`${design.containerDesign} ${design.actionField}  ${styles.buttonBar}`}>
                    <h3 className={`${styles.h3}`}>
                        <button  onClick={() => params.setUpdate(false)} className={`${design.btn} ${design.btn3Color}`}> 
                                <div className={` ${design.btn1} ${design.btnFlex}`}>
                                    Cancel
                                </div>
                        </button>
                    </h3>
                    <h3 className={` ${styles.h3}`}>
                        <button type="submit" className={`${design.btn} ${design.btnColor1}`}> 
                            <div className={` ${design.btn1} ${design.btnFlex}`}>
                                Save Changes
                            </div>
                        </button>
                    </h3>
                </div>
            </form>
            </div>
            
        </>
}
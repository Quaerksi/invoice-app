import styles from './updateForm.module.css'
import designsystem from '../../../styles/designsystem.module.css'

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, {registerLocale} from 'react-datepicker'

import React, { useState} from 'react'
import DropdownDefault from '../../../components/dropdownDefault'
import "react-datepicker/dist/react-datepicker.css"
import de from 'date-fns/locale/de';
registerLocale('de', de);

import useSWR from 'swr'
import type { Invoice } from '../../../interfaces'

type Params = {
    id: String
}

// call to my api, read data from DB
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function UpdateForm(params:Params) {

    const [startDate, setStartDate] = useState(new Date('21 Aug 2021'));

    // call to my api, read data from DB
    const {data, error} = useSWR<Invoice>(`/api/invoices/${params.id}`, fetcher)

    if (error) return <div>Failed to load users</div>
    if (!data) return <div>Loading...</div>

    // async function sendData(){
    //     // close form
    //     const response = await fetch(`/api/invoices/${params.id}`, {
    //         method: "PUT",
    //          // body: JSON.stringify(newTodo),
    //         headers: {
    //              "Content-Type": "application/json",
    //          },
    //          });
             
    //          // const data = await response.json();
    //          // settodos(data);
    //          };
    // }

    const handleSubmit = async (event:React.FormEvent) => {

        // close form

        event.preventDefault();

        const response = await fetch(`/api/invoices/${params.id}`, {
            method: "PUT",
            // body: '[{laus: maus}, {raus:taus}]',
            // body: JSON.stringify([{laus: 'maus'}, {raus: 'taus'}]),
            body: JSON.stringify({
                "id": "RT2080",
                "description": "Logo Concept",
                "paymentTerms": 1,
                "clientName": "Alysa Werner",
                "clientEmail": "alysa@email.co.uk",
                "senderAddress": {
                  "street": "300 Union Terrace",
                  "city": "Madrid",
                  "postCode": "fghjdksl",
                  "country": "Spain"
                },
                "clientAddress": {
                  "street": "63 Warwick Road",
                  "city": "Carlisle",
                  "postCode": "CA20 2TG",
                  "country": "United Kingdom"
                },
                "items": [
                  {
                    "name": "Logo Sketches",
                    "quantity": 1,
                    "price": 102.04,
                    "total": 102.04
                  }
                ],
                "total": 102.04
              }),
            headers: {
                    "Content-Type": "application/json",
            },
        });
        
      }
    
return <>
            <div className={`${styles.container}`}>
            <form onSubmit={handleSubmit}>
                <button type="submit">Submit</button>
                <h1 className={`${styles.h1}`}>Edit <span className={`${styles.hashtagColor}`}>#</span><span>{params.id}</span></h1>
                <h6 className={`${styles.colorPurple} ${styles.letterSpacing} ${styles.headline}`}>Bill From</h6>
                <div className={`${styles.stretch} ${styles.margin}`}>
                    <label htmlFor="adressFrom">Street Address:</label>
                    <input className={`${designsystem.input}`} type="text" id="adressFrom" name="adressFrom" defaultValue={`${data.senderAddress?.street}`}/> 
                </div>
                <div className={`${styles.grid}`}>
                    <div className={`${styles.inline} ${styles.marginRight}`}>
                        <label htmlFor="cityFrom">City:</label>
                        <input className={`${designsystem.input}`} type="text" id="cityFrom" name="cityFrom" defaultValue={`${data.senderAddress?.city}`}/> 
                    </div>
                    <div className={`${styles.inline} ${styles.marginRight}`}>
                        <label  htmlFor="postCodeFrom">Post Code:</label>
                        <input className={`${designsystem.input}`} type="text" id="postCodeFrom" name="postCodeFrom" defaultValue={`${data.senderAddress?.postCode}`}/> 
                    </div>
                    <div className={`${styles.inline}`}>
                        <label  htmlFor="countryFrom">Country:</label>
                        <input className={`${designsystem.input}`} type="text" id="countryFrom" name="countryFrom" defaultValue={`${data.senderAddress?.country}`}/> 
                    </div>
                </div>
                <h6 className={`${styles.colorPurple} ${styles.letterSpacing} ${styles.headline}`}>Bill To</h6>
                <div className={`${styles.stretch}`}>
                    <label htmlFor="clientName">Client's Name:</label>
                    <input className={`${designsystem.input}`} type="text" id="clientName" name="clientName" defaultValue={`${data.clientName}`}/> 
                </div>
                <div className={`${styles.stretch}`}>
                    <label htmlFor="clientEmail">Client's Email:</label>
                    <input className={`${designsystem.input}`} type="email" id="clientEmail" name="clientEmail" defaultValue={`${data.clientEmail}`}/> 
                </div>
                <div className={`${styles.stretch}`}>
                    <label htmlFor="clientAdress">Street Address:</label>
                    <input className={`${designsystem.input}`} type="text" id="clientAdress" name="clientAdress" defaultValue={`${data.clientAddress?.street}`}/> 
                </div>
                <div className={`${styles.grid}`}>
                    <div className={`${styles.inline} ${styles.marginRight}`}>
                        <label htmlFor="clientCity">City:</label>
                        <input className={`${designsystem.input}`} type="text" id="clientCity" name="clientCity" defaultValue={`${data.clientAddress?.city}`}/> 
                    </div>
                    <div className={`${styles.inline} ${styles.marginRight}`}>
                        <label  htmlFor="clientPostCodeFrom">Post Code:</label>
                        <input className={`${designsystem.input}`} type="text" id="clientPostCodeFrom" name="clientPostCodeFrom" defaultValue={`${data.clientAddress?.postCode}`}/> 
                    </div>
                    <div className={`${styles.inline}`}>
                        <label  htmlFor="clientCountryFrom">Country:</label>
                        <input className={`${designsystem.input}`} type="text" id="clientCountryFrom" name="clientCountryFrom" defaultValue={`${data.clientAddress?.country}`}/> 
                    </div>
                </div>
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
                            onChange={(date:Date) => setStartDate(new Date(`${data.createdAt}`))} 
                        />
                    </div>
                    <div className={`${styles.widthDropdown}`}>
                        <DropdownDefault name='Payment Terms' elements={['Next 1 day', 'Next 7 days', 'Next 14 days', 'Next 30 days']} defaultValue={`Next ${data.paymentTerms} days`}/>
                    </div>
                </div>
                <div className={`${styles.stretch}`}>
                    <label htmlFor="projectDescription">Project Description:</label>
                    <input className={`${designsystem.input}`} type="text" id="projectDescription" name="projectDescription"  defaultValue={`${data.description}`}/> 
                </div>
                <h2 className={`${styles.itemListHeadline}`}>Item List</h2>
                    {/* Design a Component */}
            </form>
            </div>
        
        </>
}
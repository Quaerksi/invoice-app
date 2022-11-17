import { data } from "../data/data"
import clientPromise from "./mongodb";
import { Invoice } from '../interfaces'

export const allInvoices = () => data;

// get all invoices from DB synchronous
export const allInvoicesDB = async ():Promise<Invoice[]|void> => {

    try {
        const client = await clientPromise;
        const db = client.db("challenge");
    
        const invoices = await db
            .collection("ivoices")
            .find({})
            .toArray();
    
        const data:Invoice[] = JSON.parse(JSON.stringify({invoices})).invoices
        // const data1 = JSON.parse(JSON.stringify({invoices})).invoices[0].id
        // console.log(`Data 1: ${JSON.stringify(data2)}, typeof ${typeof data1}`)

        return data;
        
    } catch (e) {
        console.error(e);
    }

    return;
}

// is ther an invoice to the given id?
export const invoiceByIdExist = (id:String) :  Boolean => {
    
    let invoiceExists = data.find(invoice => invoice.id === id)
    return invoiceExists  ? true : false
}

//returns one invoice
export const invoiceById = (id:String) :  any => {
    
    const invoice = data.find(invoice => invoice.id === id)
    
    return invoice ? invoice : 0
}


// Create, read, update, and delete invoices
// Save draft invoices, and mark pending invoices as paid
// - Filter invoices by status (draft/pending/paid)
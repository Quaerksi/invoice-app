import clientPromise from "./mongodb"
import { Invoice } from '../interfaces'


// get all invoices from DB synchronous
export const allInvoicesDB = async ():Promise<Invoice[] | [] | Array<Number>> => {

    try {
        const client = await clientPromise;
        const db = client.db("challenge");

        const invoices = await db
            .collection("ivoices")
            .find({})
            .toArray();
    
        const data:Invoice[] = JSON.parse(JSON.stringify({invoices})).invoices
        return data;

    } catch (e) {
        console.error(e);
        console.log('HalloS')
    }

    console.error('Error in DB conncection function allInvoicesDB');
    return []
}

//returns one invoice
export const invoiceById = async (id:String):Promise<Invoice | String> => {
    
    try {
        const client = await clientPromise;
        const db = client.db("challenge");

        console.log(`invoiceById`)

        const invoice= await db
            .collection("ivoices")
            .findOne({id: id});

        // console.log(`FindOne ${JSON.stringify(invoice)}, ${typeof invoice}`)
        // const data:DbMethods<Invoice> = JSON.stringify(invoice) === null ? null : JSON.parse(JSON.stringify(invoice))        
        // return data

        return JSON.stringify(invoice) === null ? '' : JSON.parse(JSON.stringify(invoice))


    } catch (e) {

        console.error(e);
    }

    console.error('Error in DB conncection function invoiceById');
    return '';
}

//update user
export const updateInvoice = async(anInvoice:Invoice):Promise<Boolean> => {
    
    try { 
        const client = await clientPromise;
        const db = client.db("challenge");

        let items = new Array()

          anInvoice.items?.forEach(c => 
            items.push(
            {
                "name": `${c.name}`,
                "quantity": c.quantity,
                "price": c.price,
                "total": c.total
            }
        ))

        const invoice = await db
            .collection("ivoices")
                .updateOne({ id: `${anInvoice.id}`}, { $set: { 
                "senderAddress": {
                    "street": `${anInvoice.senderAddress?.street}`,
                    "city": `${anInvoice.senderAddress?.city}`,
                    "postCode": `${anInvoice.senderAddress?.postCode}`,
                    "country": `${anInvoice.senderAddress?.country}`
                  },
                "clientName": `${anInvoice.clientName}`,
                "clientEmail": `${anInvoice.clientEmail}`,
                "clientAddress": {
                    "street": `${anInvoice.clientAddress?.street}`,
                    "city": `${anInvoice.clientAddress?.city}`,
                    "postCode": `${anInvoice.clientAddress?.postCode}`,
                    "country": `${anInvoice.clientAddress?.country}`
                  },
                  "paymentTerms": `${anInvoice.paymentTerms}`,
                  "description": `${anInvoice.description}`,
                  items,

            } })

            return true;
    }
    catch(e) {
        console.error(e);
    }

    return false;
}

// Create, read, update, and delete invoices
// Save draft invoices, and mark pending invoices as paid
// - Filter invoices by status (draft/pending/paid)

// local mongodb://localhost:27017
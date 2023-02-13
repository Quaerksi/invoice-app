
import type { NextApiRequest, NextApiResponse } from 'next'
import * as Methods from "../../../library/methods"
import { Invoice } from '../../../interfaces/invoice'

// {id: 'RT3080'}
// developement URL http://localhost:3000/api/invoices/[id]

export default function userHandler(req: NextApiRequest, res: NextApiResponse<Invoice|String>){
        
        const {query: {id}, method} = req

        let typedId:String = '';

        // check if invoice id exist
        if(typeof id === 'string'){

            // typed variable for query parameter
            typedId = id;
            // console.log(`[id].ts ${typedId}`)

            switch (method) {
                case 'GET':
                    console.log(`Get`)
                    // Get data from your DB
                    let invoice = Methods.invoiceById(typedId);

                    invoice.then(result => {
                        // console.log(`[id].ts ${JSON.stringify(result)}`)

                        // return null or an invoice
                        res.status(200).json(result)
                      })
                      .catch(error => res.status(400).end(`Something went wrong [id].ts catch`))
                    
                    break
                case 'PUT':
                    console.log(`put`)
                    // Update or create data in your JSON File
                    res.status(200).json('in progress')
                    break
                default:
                    res.setHeader('Allow', ['GET', 'PUT'])
                    res.status(405).end(`Method ${method} Not Allowed`)
                }
            }   
        
}
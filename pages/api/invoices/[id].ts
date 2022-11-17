
import type { NextApiRequest, NextApiResponse } from 'next'
import * as Methods from "../../../library/methods"
import { Invoice } from '../../../interfaces'

// developement URL http://localhost:3000/api/clients/[id]

export default function userHandler(req: NextApiRequest, res: NextApiResponse<Invoice>){
        
        const {query: {id}, method} = req

        let typedId:String = '';

        // check if invoice id exist
        if(typeof id === 'string'){

            // typed variable for query parameter
            typedId = id;
 
            let invoiceExists: Boolean = Methods.invoiceByIdExist(id);
            if(!invoiceExists) res.status(400).end(`Id doesn't exist`)
        }
        else {
            switch (method) {
                case 'GET':
                    // Get data from your JSON File
                    console.log(`Get`)
                    res.status(200).json( Methods.invoiceById(typedId))
                    break
                case 'PUT':
                    console.log(`put`)
                    // Update or create data in your JSON File
                    res.status(200).json( Methods.allInvoices()[1] )
                    break
                default:
                    res.setHeader('Allow', ['GET', 'PUT'])
                    res.status(405).end(`Method ${method} Not Allowed`)
                }
            }   
        
}
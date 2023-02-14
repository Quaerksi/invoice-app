
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

            switch (method) {
                case 'GET':
                    // Get data from your DB
                    let invoice = Methods.invoiceById(typedId);

                    invoice.then(result => {
                        // return null or an invoice
                        res.status(200).json(result)
                      })
                      .catch(error => res.status(400).end(`Something went wrong [id].ts catch GET`))
                    
                    break
                case 'PUT':
                    const data = req.body

                    if(Object.keys(data).length === 2 && Object.keys(data)[0] === 'id' && Object.keys(data)[1] === 'status'){
                        let itWorked = Methods.updateStatus(data.id, data.status)
                        itWorked.then(result => {
                            res.status(200).json('update')
                        })
                        .catch(error => res.status(400).end(`Something went wrong [id].ts catch PUT`))
                    } else {
                        let itWorked = Methods.updateInvoice(req.body)
                        itWorked.then(result => {
                            res.status(200).json('update')
                        })
                        .catch(error => res.status(400).end(`Something went wrong [id].ts catch PUT`))
                    }

                    break
                case 'DELETE':

                    let libDelete = Methods.deleteInvoiceById(req.body.id)

                    libDelete.then(result => {
                        console.log(`delete back ${result}`)
                        console.log(result)
                        res.status(200).json('delete')
                    })
                    .catch(error => res.status(400).end(`Something went wrong [id].ts catch PUT`))
                    
                break
                default:
                    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
                    res.status(405).end(`Method ${method} Not Allowed`)
                }
            }   
        
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Invoice } from '../../interfaces'
import * as dbMethods from '../../library/methods'

// developement URL http://localhost:3000/api/allInvoices

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Invoice[] | void>
) {

  var allInvoices = dbMethods.allInvoicesDB()

  allInvoices.then(result => {

    // return an array empty or with invoices
    res.status(200).json(result)
  }).catch(error => res.status(400).end(`Something went wrong allInvoices.ts catch`))
}

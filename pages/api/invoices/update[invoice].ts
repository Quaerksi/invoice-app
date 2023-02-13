import type { NextApiRequest, NextApiResponse } from 'next'
import * as Methods from "../../../library/methods"
import { Invoice } from '../../../interfaces/invoice'

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { Invoice },
    method,
  } = req

  switch (method) {
    case 'PUT':
      // Update or create data in your database
      let result = Methods.updateInvoice()
      res.status(200).json('Put')
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
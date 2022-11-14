// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { data } from "../../data"
import { Invoice } from '../../interfaces'

// developement URL http://localhost:3000/api/data

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Invoice[]>
) {
  res.status(200).json(data)
}

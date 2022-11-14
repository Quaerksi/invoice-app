// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import datas from "../../data.json"

// developement URL http://localhost:3000/api/data

type Data = {
  data: typeof datas[0][]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({data: datas})
}

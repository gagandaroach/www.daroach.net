import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../lib/dbConnect'
import Hit from '../../../models/Hit'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const count = await Hit.countDocuments(query)
        res.status(200).json({ success: true, data: count })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

export default handler
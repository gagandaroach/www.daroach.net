import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../lib/dbConnect'
import Hit from '../../../models/Hit'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const hits = await Hit.find(query)
        res.status(200).json({ success: true, data: hits.reverse() })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const hitData = req.body;
        const hit = await Hit.create(hitData)
        res.status(201).json({ success: true, data: hit })
      }
      catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

export default handler
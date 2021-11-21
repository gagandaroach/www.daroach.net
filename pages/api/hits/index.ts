import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../lib/dbConnect'
import Hit from '../../../models/Hit'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, headers, method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const hits = await Hit.find() /* find all the data in our database */
        res.status(200).json({ success: true, data: hits })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        if (url === undefined) {
          console.log("incoming url was undefined. req headers: " + req.rawHeaders.toString());
          break;
        }
        const req_url = new URL(url, `http://${headers.host}`);
        // console.log(req_url)
        const hit = await Hit.create({
          host: req_url.hostname,
          port: req_url.port,
          path: req_url.pathname,
          params: req_url.search,
          method: method,
          protocol: req_url.protocol,
          userAgent: req.headers["user-agent"] || "",
        }) /* create a new model in the database */
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
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log(req.url)
        res.redirect(307, '/')
    } catch (err) {
        res.status(500).send({})
    }
}

export default handler;
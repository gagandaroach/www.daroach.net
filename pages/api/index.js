// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    try {
        console.log(req.url)
        res.redirect(307, '/')
    } catch (err) {
        res.status(500).send()
    }
}
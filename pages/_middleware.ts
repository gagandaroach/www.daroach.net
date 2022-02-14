import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    //   return new Response('Hello, world!')
    // const requestOptions = {
    //     method: 'POST',
    //     headers: req.headers,
    //     userAgent: req.headers.get('user-agent')
    //     // headers: { 'Content-Type': 'application/json' },
    //     // body: JSON.stringify({ title: 'React POST Request Example' })
    // };
    // // console.log(requestOptions)
    // const href = req.headers.get('referer');
    // // console.log(href)
    // const api_url_hits = href + 'api/hits';
    // fetch(api_url_hits, requestOptions)
    return NextResponse.next();
}
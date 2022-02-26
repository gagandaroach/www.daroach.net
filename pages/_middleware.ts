import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

function postHit(req: NextRequest) {
    const { url, headers, method } = req

    // TODO: cleanup creating this URL
    const href = headers.get('referer');
    let req_url = null;
    try {
        req_url = new URL(url, `${href}`);
    } catch (TypeError) {
        console.log(`invalid urL: ${href}`)
    }
    if (req_url == null)
        return;

    const hitData = {
        host: req_url.hostname,
        port: req_url.port,
        path: req_url.pathname,
        params: req_url.search,
        method: method,
        userAgent: headers.get("user-agent") || "",
        protocol: req_url.protocol,
        date: Date.now()
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hitData)
    };
    // console.log(hitData)
    const api_url_hits = href + 'api/hits';
    fetch(api_url_hits, requestOptions);
}

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    postHit(req);
    return NextResponse.next();
}
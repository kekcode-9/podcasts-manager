import { error } from "console";
import { NextResponse, NextRequest } from "next/server";

// always use named exports instead of default exports for method based handlers
export async function GET(request:NextRequest) {
    console.log('GET received')
    const { searchParams } = new URL(request.url);
    const searchString = searchParams.get('search');
    const ordering = searchParams.get('ordering');

    if (!searchString) {
        return NextResponse.json({
            error: 'no search string found'
        }, { status: 404 })
    }

    let targetUrl = 'http://podcasts-platform.us-east-1.elasticbeanstalk.com/podcasts/search/';
    if (searchString) {
        targetUrl = targetUrl + '?query=' + searchString;
    }
    if (ordering) {
        targetUrl = targetUrl + '&ordering=' + ordering;
    }

    const res = await fetch(targetUrl);

    if (res.ok) {
        const result = await res.json();
        return NextResponse.json(result, {status: 200});
    } else {
        return NextResponse.json({error: "Failed to fetch results"}, {status: 500});
    }
}
import { error } from "console";
import { NextResponse, NextRequest } from "next/server";

// always use named exports instead of default exports for method based handlers
export async function GET(request:NextRequest) {
    console.log('GET received')
    const { searchParams } = new URL(request.url);
    const searchString = searchParams.get('search');

    if (searchString) {
        const res = await fetch(
            'http://podcasts-platform.us-east-1.elasticbeanstalk.com/podcasts/search/' + 
            '?query=' + searchString
        );

        if (res.ok) {
            const result = await res.json();
            return NextResponse.json(result, {status: 200});
        } else {
            return NextResponse.json({error: "Failed to fetch results"}, {status: 500});
        }
    }
}
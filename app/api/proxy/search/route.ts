import { NextResponse, NextRequest } from "next/server";
import API_CONSTANTS from "@/constants/apiConstants";

const { PODCASTS_SEARCH, QUERY_PARAMS } = API_CONSTANTS;
const { QUERY, ORDERING, ATTRIBUTES } = QUERY_PARAMS;

let cachedResponse = {};
let cachedQuery = "";

// always use named exports instead of default exports for method based handlers
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchString = searchParams.get(QUERY);
  const ordering = searchParams.get(ORDERING.key);
  const rating = searchParams.get(ATTRIBUTES.key);

  const query = `${QUERY}=${searchString}&${ORDERING.key}=${ordering}`;
  if (query === cachedQuery && cachedResponse) {
    return NextResponse.json(cachedResponse, { status: 200 });
  }

  if (!searchString) {
    return NextResponse.json(
      {
        error: "no search string found",
      },
      { status: 404 }
    );
  }

  let targetUrl = PODCASTS_SEARCH;

  if (searchString) {
    targetUrl = targetUrl + `?${QUERY}=` + searchString;
  }
  if (ordering) {
    targetUrl = targetUrl + `&${ORDERING.key}=` + ordering;
  }

  const res = await fetch(targetUrl);

  if (res.ok) {
    const result = await res.json();
    cachedResponse = {
      ...result
    }
    return NextResponse.json(result, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}

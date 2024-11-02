import { NextRequest, NextResponse } from "next/server";
import API_CONSTANTS from "@/constants/apiConstants";
import { error } from "console";

const { EPISODES_LOOKUP, QUERY_PARAMS } = API_CONSTANTS;
const { COLLECTION_ID } = QUERY_PARAMS;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const collectionId = searchParams.get(COLLECTION_ID);

  if (!collectionId) {
    return NextResponse.json(
      {
        error: "No episodes found",
      },
      {
        status: 404,
      }
    );
  }

  let targetUrl = EPISODES_LOOKUP + `?${COLLECTION_ID}=${collectionId}`;

  const res = await fetch(targetUrl);
  
  if (res.ok) {
    const result = await res.json();
    return NextResponse.json(result, { status: 200 });
  } else {
    return NextResponse.json(
      {
        error: "Failed to fetch results",
      },
      {
        status: 500,
      }
    );
  }
}

import axios from "axios";
import { headers } from "next/headers";
import { NextRequest , NextResponse} from "next/server";

export async function  POST(req: NextRequest) {
    const {placeName}=await req.json();
    const BASE_URL='https://places.googleapis.com/v1/places:searchText';
    const config={
        headers:{
            'Content-Type':'application/json',
            'X-Goog-Api-Key':process.env.GOOGLE_PLACE_API_KEY,
            'X-Goog-FieldMask':[
                'places.photos',
                'places.displayName',
                'places.id'
            ]
        }
    };
    try{
    const result=await axios.post(BASE_URL,{
        textQuery:placeName
    },config);
    return NextResponse.json(result?.data);
} catch(e) {
    return NextResponse.json({error: e});
}
}
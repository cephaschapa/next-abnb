import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string
}

export async function DELETE(request: Request, {params} : {params:IParams}){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const {listingId} = params;

    console.log(listingId);
    const listingID = listingId[0]

    if(!listingID || typeof listingID !== 'string'){
        throw new Error('Invalid listing ID')
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingID,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)
}
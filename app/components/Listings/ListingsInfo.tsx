'use client';

import React, { FC } from "react";
import dynamic from "next/dynamic";
import useCountries from "@/app/hooks/useCountries";
import { Category, SafeUser } from "@/app/types";

import Avatar from "../navbar/Avatar";
import ListingCategory from "./ListingCategory";

const Map = dynamic(()=> import('../Map'), {
    ssr: false
})

interface ListingInfoProps{
    user?: SafeUser | null;
    category: Category;
    description: string;
    roomCount: number;
    guestCount: number;
    bathCount: number;
    locationValue: string
}

const ListingInfo:FC<ListingInfoProps> = ({
    user,
    category,
    description,
    roomCount,
    guestCount,
    bathCount,
    locationValue
}) => {

    const {getValue} =  useCountries()
    const cords = getValue(locationValue)?.latlng
    return(
        <div
            className="
                col-span-4
                flex
                flex-col
                gap-8
            "
        >
           <div 
            className="flex flex-col gap-2"
           >
            <div
                className="
                    text-2xl
                    font-semibold
                    flex
                    flex-row
                    gap-2
                    items-center
                "
            >
                <div>
                    Hosted by {user?.name}
                </div>
                <Avatar 
                    src={user?.image}
                />
            </div>
            <div
                className="flex flex-row gap-4 items-center text-neutral-500"
            >
                <div>
                    {guestCount} guests 
                </div>
                <div>
                    {roomCount} rooms 
                </div>
                <div>
                    {bathCount} bathrooms
                </div>
            </div>
           </div>
           <hr />
           {
            category && (
                <ListingCategory 
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )
           }
           <hr />
           <div
            className="text-lg font-light text-neutral-500"
           >
            {description}
           </div>
           <hr/>
           <Map center={cords}/>
        </div>
    )
}

export default ListingInfo;
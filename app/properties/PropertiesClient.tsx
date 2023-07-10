'use client'

import React, { useState, useCallback, FC } from "react";
import { SafeListing, SafeUser } from "../types";
import Container from "../components/container/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/Listings/ListingCard";

interface PropertiesClientProps {
    listings: SafeListing[]
    currentUser: SafeUser | null
}

const PropertiesClient:FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState<string>('');

    const onCancel = useCallback((id: string)=> {
        setDeletingId(id)

        axios.delete(`/api/listings/${id}`)
        .then(()=> {
            toast.success('Listing deleted')
            router.refresh();
        })
        .catch((error)=> {
            toast.error(error?.response?.data?.error)
        })
        .finally(()=>{
            setDeletingId('')
        })
    }, [router])

    return (
        <Container>
            <Heading 
                title="Propterties"
                subtitle="List of your properties"
            />
            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-6
                    2xl:grid-cols-6
                    gap-8
                "
            >
                {
                    listings.map((listing)=>(
                        <ListingCard 
                            key={listing.id}
                            data={listing}
                            actionId={listing.id}
                            disabled={deletingId === listing.id}
                            actionLabel="Delete Property"
                            currentUser={currentUser}
                            onAction={onCancel}
                        />
                    ))
                }
            </div>
        </Container>
    )
}

export default PropertiesClient;
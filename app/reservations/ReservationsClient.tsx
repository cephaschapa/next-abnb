'use client'
import React, {FC, useCallback, useState} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { Reservation } from '@prisma/client';
import { SafeReservation, SafeUser } from '../types';

import Heading from '../components/Heading';
import Container from '../components/container/Container';
import ListingCard from '../components/Listings/ListingCard';

interface ReservationsClientProps{
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const ReservationsClient:FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) =>{
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("Reservations cancelled");
            router.refresh();
        })
        .catch(()=>{
            toast.error('Something went wrong')
        }).finally(()=>{
            setDeletingId('')
        })
    }, [router]);

    return(
        <Container>
            <Heading 
                title='Reservations'
                subtitle='Bookings on your properties'
            />
            <div
                className='
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6   
                '
            >
                {
                    reservations.map((reservations)=>(
                        <ListingCard 
                            key={reservations.id}
                            data={reservations.listing}
                            reservation={reservations}
                            actionId={reservations.id}
                            onAction={onCancel}
                            disabled={deletingId === reservations.id}
                            actionLabel='Cancel guest reservation'
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    )
}

export default ReservationsClient;
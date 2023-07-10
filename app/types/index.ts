import { Listing, Reservation, User } from '@prisma/client';
import { IconType } from 'react-icons/lib';

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
    > & {
        createdAt: string,
        updatedAt: string,
        emailVerified: string | null,
    }

export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string
}

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
}

export type Category = {
    icon: IconType;
    label: string;
    description: string
} | null
'use client'

import React, { FC, useCallback } from 'react';
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from './Avatar';
import MenuItem from './MenuItem';

import useRegisterModel from '@/app/hooks/useRegisterModal';
import useLoginModel from '@/app/hooks/useLoginModal';
import useRentModel from '@/app/hooks/useRentModal';

import { signOut } from 'next-auth/react';
import { SafeUser } from "@/app/types";
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser: SafeUser | null;
}

const UserMenu:FC<UserMenuProps> = ({
    currentUser
}) => {
    
    const router = useRouter();

    const registerModel = useRegisterModel();
    const loginModal = useLoginModel();
    const rentModal = useRentModel();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);


    const onRent = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }

        // Open rent modal
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="
                        hidden 
                        md:block 
                        text-sm 
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        cursor-pointer
                        hover:bg-neutral-100
                        transition
                ">
                    Airbnb your home
                </div>
                <div
                onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                    >
                        <AiOutlineMenu />
                        <div className="hidden md:block">
                            <Avatar src={currentUser?.image ? currentUser?.image : "/images/placeholder.jpg"}/>
                        </div>
                </div>
            </div>

            {isOpen && (
                <div className="
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40w]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                ">
                    <div className="flex flex-col cursor-pointer">
                        {
                            currentUser ? (
                                <>
                                    <MenuItem 
                                        onClick={() => {router.push('/trips')}}
                                        label="My trips"
                                    />
                                    <MenuItem 
                                        onClick={() => {router.push('/favorites')}}
                                        label="My favorites"
                                    />
                                    <MenuItem 
                                        onClick={() => {router.push('/reservations')}}
                                        label="My reservations"
                                    />
                                    <MenuItem 
                                        onClick={() => {router.push('/properties')}}
                                        label="My properties"
                                    />
                                    <MenuItem 
                                        onClick={onRent}
                                        label="Airbnb my home"
                                    />
                                    <hr/>
                                    <MenuItem 
                                        onClick={()=>signOut()}
                                        label="Sign out"
                                    />
                                </>
                            ) : (
                                <>
                                    <MenuItem 
                                        onClick={loginModal.onOpen}
                                        label="Login"
                                    />
                                    <MenuItem 
                                        onClick={registerModel.onOpen}
                                        label="Sign up"
                                    />
                                </>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu;
'use client'
import Container from "../container/Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { FC } from "react";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";

interface NavbarProps {
    currentUser?: SafeUser | null,
}

const Navbar:FC<NavbarProps> = ({
    currentUser
}) => {
    console.log(currentUser);
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="
                        flex 
                        flex-grow
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                        ">
                            <Logo />
                            <Search />
                            <UserMenu currentUser={currentUser}/>
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    )
}

export default Navbar;
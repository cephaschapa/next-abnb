'use client';

import React, { FC } from "react";
import { IconType } from "react-icons/lib";

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    label: string;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType
}

const Button:FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
}) => {
    return(
        <button
            onClick={onClick}
            disabled={disabled} 
            className={`
                relative
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg
                hover: opacity-80
                transition
                w-full
                ${outline ? "bg-white" : "bg-rose-500"}
                ${outline ? "border-black" : "border-rose-500"}
                ${outline ? "text-black" : "text-white"}
                ${small ? "px-2 py-1 text-sm" : "px-4 py-3 text-base"}
                ${small ? "font-light" : "font-semibold"}
                ${small ? "border-[1px]" : "border-2"}
            `}
        >
            {Icon && (
                <Icon 
                    size={24}
                    className="
                        absolute
                        left-4
                        top-3
                    "
                />
            )}
            {label}
        </button>
    );
}

export default Button;
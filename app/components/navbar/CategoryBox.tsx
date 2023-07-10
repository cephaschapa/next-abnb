'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";
import { IconType } from "react-icons/lib";
import qs from 'query-string';

interface CategoryBoxProps {
    label: string;
    icon: IconType;
    description?: string;
    selected?: boolean;
}

const CategoryBox:FC<CategoryBoxProps> = ({
    label,
    icon:Icon,
    description,
    selected
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleCategoryClick = useCallback(() => {
        let currentQuery = {};
        if(params){
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery = {
            ...currentQuery,
            category: label
        }

        if(params?.get('category') === label){
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '',
            query: updatedQuery
        }, {skipNull: true});

        router.push(url);

    }, [label, params, router])

    return(
        <div
            onClick={handleCategoryClick}
            className={
                `
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-2
                    p-3
                    border-b-2
                    hover:text-neutral-800
                    transition
                    cursor-pointer
                    ${selected ? 'text-neutral-800 border-b-neutral-800' : 'text-neutral-500 border-transparent'}
                `
            }
        >
            <Icon size={26} />
            <div className="text-sm font-medium">
                {label}
            </div>
        </div>
    )
}

export default CategoryBox;
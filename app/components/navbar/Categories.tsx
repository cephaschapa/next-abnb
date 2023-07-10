'use client'

import Container from "../container/Container";
import {TbBeach, TbMountain, TbPool} from 'react-icons/tb';
import {GiBarn, GiCactus, GiCastle, GiCaveEntrance, GiFishing, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi';
import {MdOutlineVilla} from 'react-icons/md';
import {FaSkiing} from 'react-icons/fa';
import {BsSnow} from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This propery is usually located near the beach'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This propery has windmills'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This propery is modern'
    },

    {
        label: 'Country Side',
        icon: TbMountain,
        description: 'This propery is in the country side'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This propery is a pool'
    },
    {
        label: 'Island',
        icon: GiIsland,
        description: 'This propery is on an Island'
    },
    {
        label: 'Lake',
        icon: GiFishing,
        description: 'This propery is close to a lake'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This propery has skiing activities'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This propery is in a castle'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This propery has camping activities'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This propery is in the arctic'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This propery is in a cave'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This propery is in the desert'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This propery is in the barns'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This propery is on an Luxurious'
    },
];

const Categories = () => {
    const params = useSearchParams();
    const cat = params?.get('category');
    const pathName = usePathname()

    const isMainPage = pathName === '/';

    if(!isMainPage){
        return null;
    }
    return (
      <Container>
        <div
            className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
            "
        >
            {
                categories.map((category, index)=> {
                    return (
                        <CategoryBox
                            key={index}
                            label={category.label}
                            icon={category.icon}
                            description={category.description}
                            selected={cat === category.label}
                        />
                    )
                })
            }
        </div>
      </Container>  
    );
}

export default Categories;
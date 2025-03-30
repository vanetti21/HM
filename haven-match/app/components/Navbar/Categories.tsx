'use client';

import {
    TbBeach, 
    TbMountain, 
    TbPool 
} from "react-icons/tb";
import Container from "../Container";
import { 
    GiBarn,
    GiBoatFishing, 
    GiCactus, 
    GiCastle, 
    GiCaveEntrance, 
    GiForestCamp, 
    GiIsland, 
    GiPalmTree, 
    GiWindmill 
} from "react-icons/gi";
import { MdHotel, MdOutlineVilla, MdPets, MdCabin  } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
    {
        label: 'Playa',
        icon: TbBeach,
        description: 'Esta propiedad está cerca de la playa.!'
    },
    {
        label: 'Molinos de viento',
        icon: GiWindmill,
        description: 'Esta propiedad tiene molinos de viento.!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'Esta propiedad es moderna.!'
    },
    {
        label: 'Campo',
        icon: TbMountain,
        description: 'Esta propiedad está en el campo.!'
    },
    {
        label: 'Piscina',
        icon: TbPool,
        description: 'Esta propiedad tiene piscina.!'
    },
    {
        label: 'Isla',
        icon: GiIsland,
        description: 'Esta propiedad está en una isla.!'
    },
    {
        label: 'Lago',
        icon: GiBoatFishing,
        description: 'Esta propiedad está cerca de un lago.!'
    },
    {
        label: 'Esquiar',
        icon: FaSkiing,
        description: 'Esta propiedad tiene actividades de esquí.!'
    },
    {
        label: 'Cabaña',
        icon: MdCabin ,
        description: 'Esta propiedad es una cabaña.!'
    },
    {
        label: 'Campamento',
        icon: GiForestCamp,
        description: 'Esta propiedad tiene actividades de camping.!'
    },
    {
        label: 'Artico',
        icon: BsSnow,
        description: 'Esta propiedad está en la nieve.!'
    },
    {
        label: 'Cueva',
        icon: GiCaveEntrance,
        description: 'Esta propiedad está en una cueva.!'
    },
    {
        label: 'Desierto',
        icon: GiCactus,
        description: 'Esta propiedad está en el desierto.!'
    },
    {
        label: 'Lujosa',
        icon: IoDiamond,
        description: 'Esta propiedad es lujosa.!'
    },
    {
        label: 'Hotel',
        icon: MdHotel,
        description: 'Esta propiedad está en un hotel.!'
    },
    {
        label: 'Resort',
        icon: GiPalmTree,
        description: 'Esta propiedad está en un resort!'
    },
    {
        label: 'Pet-Friendly',
        icon: MdPets,
        description: 'En esta propiedad se admiten mascotas!'
    },
]

    const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return(
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
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;
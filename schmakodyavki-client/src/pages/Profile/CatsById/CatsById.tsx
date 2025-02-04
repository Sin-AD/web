import React from 'react';
import CatCard from "../CatCard";

interface CatProfileProps {
    cats: string[];
}

export const CatsById: React.FC<CatProfileProps> = ({ cats }) => {

    return (
        <section className="flex flex-col justify-between items-center mt-2 w-full text-center max-w-[1480px]">
            {
                cats.map((kitty, index) => <CatCard catId={kitty} key={index} /> )
            }
        </section>
    );
};

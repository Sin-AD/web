import React, { useState } from 'react';
import Breed from "../BreedComp";

export const AllBreads = () => {

    const [breeds] = useState([
        "angora", "british", "exot", "kornish rex", "persian", "scottish", "sfinks", "siberian", "unknown", "vatnaya palochka",
    ]);

    return (
        <div className="grid grid-cols-4 gap-8 sm:grid-cols-1 md:grid-cols-2 max-w-[1680px] w-full items-center justify-center">
            {
                breeds.map((breed, index) => (
                    <Breed key={index} breed={breed}/>
                ))
            }
        </div>
    );
};

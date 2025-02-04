import React from 'react';
import {Link} from 'react-router-dom';

interface Kitty {
    name: string;
    breed: string;
    sex: string;
    age: number;
    story: string;
    img: string;
}

interface KittyProps {
    kittys: Kitty[];
}

export const KittyCard: React.FC<KittyProps> = ({kittys}) => {

    return (
        <React.Fragment>
            {
                kittys.map((kitty) => (
                    <div
                        title={`Cat card of ${kitty && kitty.name}`}
                        className={`w-full h-full flex flex-row justify-start mb-4 ${kitty.sex === 'M' ? 'bg-AzureishWhite' : 'bg-TuftBush'} rounded-md text-BlackOlive md:flex-col md:items-center md:max-w-[480px]`}
                    >
                        <img
                            src={`/breeds/angora.jpg`}
                            alt={`${kitty && kitty.name}`}
                            className="rounded-md mr-4 max-w-[300px] max-h-[300px] w-full h-full"
                            width="300px"
                            height="300px"
                        />
                        <div className="flex flex-col justify-around w-full h-full">
                            <div
                                title="main info"
                                aria-label={`main info`}
                                className="w-full h-full flex flex-row justify-center items-baseline text-[20px] md:flex-col md:items-center"
                            >
                                <h2
                                    title="kitty name"
                                    className="text-[64px] font-bold md:text-[48px] xs:text-[32px]"
                                >
                                    {kitty && kitty.name}&nbsp;
                                </h2>
                                <p title="kitty age of life"
                                   className="lg:text-[16px] md:text-[14px]">({kitty && kitty.age} yo)</p>
                            </div>
                            <div
                                title="description"
                                className="text-left w-full h-full text-[32px] lg:text-[24px] xs:text-[18px] flex flex-col"
                            >
                    <span className="font-bold">Breed:&nbsp;
                        <Link to={`/Breeds/${kitty && kitty.breed}`}
                              title="kitty breed"
                              className="font-normal"
                        >
                            {kitty && kitty.breed}
                        </Link>
                    </span>
                                <span className="font-bold">Story:&nbsp;
                                    <span className="font-normal">
                            {kitty && kitty.story}
                        </span>
                    </span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </React.Fragment>
    );
};

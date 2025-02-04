import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

interface CatCardProps {
    catId: string;
}

interface Cat {
    _id: string;
    name: string;
    breed: string;
    sex: string;
    age: number;
    story: string;
    img: string;
}

export const CatCard: React.FC<CatCardProps> = ({ catId }) => {

    const [cat, setCat] = useState<Cat>();

    useEffect(() => {
        const fetchCatById = async (catId: string): Promise<Cat | null> => {
            try {
                const token = localStorage.getItem('jwtToken');

                const response = await fetch(`http://localhost:5000/cats/get`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "id": catId }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const cat: Cat = await response.json();
                setCat(cat);
                return cat;
            } catch (error) {
                console.error("Failed to fetch cat:", error);
                return null;
            }
        }

        fetchCatById(catId);
    }, [catId]);

    return (
        <div
            title={`Cat card of ${cat && cat.name}`}
            className={`w-full h-full flex flex-row justify-start mb-4 ${cat && cat.sex === 'M' ? 'bg-AzureishWhite' : 'bg-TuftBush'} rounded-md text-BlackOlive md:flex-col md:items-center md:max-w-[480px]`}
        >
            <img
                src={`/breeds/angora.jpg`}
                alt={`${cat && cat.name}`}
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
                        {cat && cat.name}&nbsp;
                    </h2>
                    <p title="kitty age of life" className="lg:text-[16px] md:text-[14px]">({cat && cat.age} yo)</p>
                </div>
                <div
                    title="description"
                    className="text-left w-full h-full text-[32px] lg:text-[24px] xs:text-[18px] flex flex-col"
                >
                    <span className="font-bold">Breed:&nbsp;
                        <Link to={`/Breeds/${cat && cat.breed}`}
                              title="kitty breed"
                              className="font-normal"
                        >
                            {cat && cat.breed}
                        </Link>
                    </span>
                    <span className="font-bold">Story:&nbsp;
                        <span className="font-normal">
                            {cat && cat.story}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};

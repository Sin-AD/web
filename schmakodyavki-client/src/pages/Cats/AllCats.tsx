import React, {useEffect, useState} from 'react';
import KittyCard from './KittyCard';

export const AllCats = () => {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const fetchAllCats = async () => {
            try {
                const response = await fetch(`http://localhost:5000/cats/allCats`, {
                    method: 'GET',
                });

                if(response.ok){
                    const data = await response.json();
                    setCats(data);
                }
            } catch (e) {
                console.error(e);
                throw new Error(`Failed to fetch Cats: ${e}`);
            }
        }

        fetchAllCats();
    }, []);

    return (
        <section className="flex flex-col justify-between items-center mt-2 w-full text-center max-w-[1480px]">
            <KittyCard kittys={cats} />
        </section>
    );
};

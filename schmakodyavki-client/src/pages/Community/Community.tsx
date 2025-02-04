import React, {useEffect, useState} from 'react';
import Post from "./Post";

export const Community = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchAllCats = async () => {
            try {
                const response = await fetch(`http://localhost:5000/auth/getAllPosts`, {
                    method: 'GET',
                });

                if(response.ok){
                    const data = await response.json();
                    setPosts(data);
                }
            } catch (e) {
                console.error(e);
                throw new Error(`Failed to fetch Cats: ${e}`);
            }
        }

        fetchAllCats();
    }, []);

    return (
        <section className="w-full flex flex-col space-y-4 max-w-[1280px]">
            {
                posts && posts.map((post, index) => (
                    <Post post={post} key={index} />
                ))
            }
        </section>
    );
};

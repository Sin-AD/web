import React from 'react';
import PostImg from "../../../components/Post/PostImg";
import PostCats from "../../../components/Post/PostCats";

interface PostProps {
    post: Post;
}

interface Post {
    title: string;
    description: string;
    cats: Cat[],
    author: string;
    img: string;
}

interface Cat {
    name: string;
    breed: string;
    sex: string;
    age: number;
    story: string;
    img: string;
}

export const Post: React.FC<PostProps> = ({ post }) => {
    return (
        <div className="w-full h-auto text-Diesel border-2 border-PaleTaupe rounded-xl px-2 py-8 bg-LightPaleTaupe">
            <div className="w-full h-auto flex flex-col font-bold">
                <span className="text-[32px]">
                    {post.title}
                </span>

                <span className="text-[18px]">
                    {post.description}
                </span>
            </div>
            {
                post.img ? <PostImg img={post.img} /> : null
            }
            {
                post.cats.length > 1 ? <PostCats cats={post.cats} /> : null
            }
        </div>
    );
};

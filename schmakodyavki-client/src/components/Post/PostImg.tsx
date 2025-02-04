import React from 'react';

interface ImgProp {
    img: string;
}

const PostImg: React.FC<ImgProp> = ({ img }) => {
    return (
        <div>
            <img
                src={img}
                alt="post"
                className="w-full h-full border-b-2 rounded-b-xl"
                width="800px"
                height="800px"
            />
        </div>
    );
};

export default PostImg;

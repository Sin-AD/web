import React from 'react';
import {Link} from "react-router-dom";

export const Invitation = () => {
    return (
        <section
            title="Invitation to join in our community"
            className="container py-6 px-6 bg-GrayTeaGreen rounded-xl text-BlackOlive text-center"
        >
            <h1 title="Join Our Community!" className="text-[74px] font-bold pt-6 xs:text-[24px] md:text-[48px]">
                Join Our Community!
            </h1>

            <p title="Welcome to our community" className="text-[28px] py-16 px-12 xs:text-[16px]">
                Are you a cat lover looking to connect with others who share your passion?
                <Link to="#" className="font-bold underline">
                    Join
                </Link>
                {" "} our vibrant community today! Share your stories, exchange tips, and celebrate the joy of having cats in your life. Whether you’re a seasoned cat owner or just starting your journey, everyone is welcome here. Let’s come together to support each other and our furry friends!
            </p>
        </section>
    );
};

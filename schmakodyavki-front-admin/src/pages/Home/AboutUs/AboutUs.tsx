import React from 'react';

export const AboutUs = () => {
    return (
        <div className="flex flex-row justify-evenly w-[100vw] h-auto bg-AzureishWhite">
            <section
                title="about us"
                className="grid grid-cols-2 grid-rows-2 py-20 max-w-[1680px] w-full h-auto text-BlackOlive sm:flex sm:flex-col"
            >
                <h1
                    className="col-span-1 row-span-1 text-[96px] font-bold text-center xs:text-[32px] md:text-[64px]">
                    About Us
                </h1>
                <span className="col-span-1 row-span-2 text-[24px] pt-20 xs:text-[16px]">
                    Welcome to Schmakodyavki! We are a passionate community of cat lovers dedicated to celebrating the joy and companionship that cats bring into our lives. Our mission is to provide a fun and informative space where cat enthusiasts can connect, share tips, and learn about cat care and adoption. Join us as we explore the wonderful world of cats and spread love for our furry friends!
                </span>
            </section>
        </div>
    );
};

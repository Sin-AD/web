import React from 'react';

export const ManyInfo = () => {
    return (
        <div className="flex flex-row justify-center w-full h-auto bg-TuftBush text-BlackOlive sm:flex-col text-center">
            <div className="p-20 flex justify-center flex-col items-center md:p-14">
                <img
                    src="/icons/heart.svg"
                    alt="heart icon"
                    className="max-w-[75px] w-full h-auto md:w-[40px]"
                    width="75px"
                    height="75px"
                />
                <h3 title="with love" className="text-[20px] font-bold lg:text-[16px]">
                    we 100% love kitty
                </h3>
            </div>
            <div className="p-20 flex justify-center flex-col items-center md:p-14">
                <img
                    src="/icons/cat.svg"
                    alt="cat icon"
                    className="max-w-[75px] w-full h-auto md:w-[40px]"
                    width="75px"
                    height="75px"
                />
                <h3 title="with care" className="text-[20px] font-bold lg:text-[16px]">
                    we 100% care kitty
                </h3>
            </div>
            <div className="p-20 flex justify-center flex-col items-center md:p-14">
                <img
                    src="/icons/eyes.svg"
                    alt="eye icon"
                    className="max-w-[75px] w-full h-auto md:w-[40px]"
                    width="75px"
                    height="75px"
                />
                <h3 title="with attentiveness" className="text-[20px] font-bold lg:text-[16px]">
                    we 100% attentiveness kitty
                </h3>
            </div>
        </div>
    );
};

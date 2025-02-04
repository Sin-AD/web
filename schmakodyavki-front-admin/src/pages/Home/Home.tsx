import React from 'react';
import AboutUs from "./AboutUs";
import Invitation from "./Invitation";
import ManyInfo from "./ManyInfo";
import Helmet from "react-helmet";

export const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | Schmakodyavki</title>
                <meta name="description" content="Welcome to the home page of Schmakodyavki! Explore recipes and dishes from around the world." />
                <meta name="keywords" content="recipes, cooking, dishes, Schmakodyavki, world cuisine" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Open Graph for social media (Facebook, LinkedIn, etc.) */}
                <meta property="og:title" content="Welcome to Schmakodyavki" />
                <meta property="og:description" content="Explore recipes and dishes from around the world on the home page of Schmakodyavki." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="nothing" />
                <meta property="og:image" content="/cat.svg" />

                {/* Twitter Card for display on Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Welcome to Schmakodyavki" />
                <meta name="twitter:description" content="Explore recipes and dishes from around the world on the home page of Schmakodyavki." />
                <meta name="twitter:image" content="/cat.svg" />
            </Helmet>
            <div className="flex flex-col justify-center space-y-6">
                <AboutUs/>
                <Invitation/>
                <ManyInfo/>
            </div>
        </>
    );
};

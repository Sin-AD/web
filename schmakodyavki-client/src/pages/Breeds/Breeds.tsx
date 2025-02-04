import React from 'react';
import Helmet from "react-helmet";
import AllBreads from "./AllBreeds";

export const Breeds = () => {
    return (
        <>
            <Helmet>
                <title>All Breeds | Schmakodyavki</title>
                <meta name="description" content="Explore all animal breeds featured on Schmakodyavki. Learn about their characteristics and unique features." />
                <meta name="keywords" content="breeds, animals, Schmakodyavki, pets, breed information" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Open Graph for social media (Facebook, LinkedIn, etc.) */}
                <meta property="og:title" content="All Breeds on Schmakodyavki" />
                <meta property="og:description" content="Explore all animal breeds and their unique features on Schmakodyavki." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="nothing" />
                <meta property="og:image" content="/cat.svg" />

                {/* Twitter Card for display on Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="All Breeds on Schmakodyavki" />
                <meta name="twitter:description" content="Explore all animal breeds and their unique features on Schmakodyavki." />
                <meta name="twitter:image" content="/cat.svg" />
            </Helmet>
            <AllBreads />
        </>
    );
};

import React from "react";

import HeroSection from "../components/home/HeroSection";
import EtapesSection from "../components/home/EtapesSection";
import ProjetsSection from "../components/home/ProjetsSection";
import CallToAction from "../components/home/CallToAction";

const Home = () => {
    return (
        <main className="w-full">
            <HeroSection />
            <EtapesSection />
            <ProjetsSection />
            <CallToAction />
        </main>
    );
};

export default Home;

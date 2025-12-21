import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/axios";
import { setLoading, setError, setProjets, setEtapes } from "../features/home/homeSlice";

import HeroSection from "../components/home/HeroSection";
import EtapesSection from "../components/home/EtapesSection";
import ProjetsSection from "../components/home/ProjetsSection";
import CallToAction from "../components/home/CallToAction";

const Home = () => {
    const dispatch = useDispatch();
    const { projets, etapes, isLoading, error } = useSelector((state) => state.home);

    useEffect(() => {
        const chargerDonnees = async () => {
            dispatch(setLoading(true));
            try {
                const reponseProjets = await api.get("/projets");
                dispatch(setProjets(reponseProjets.data));

                const reponseEtapes = await api.get("/etapes");
                dispatch(setEtapes(reponseEtapes.data));
            } catch (err) {
                dispatch(setError(err.message));
            }
        };
        chargerDonnees();
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">Chargement...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-red-600">Erreur : {error}</div>
            </div>
        );
    }

    return (
        <main className="w-full">
            <HeroSection />
            <EtapesSection etapes={etapes} />
            <ProjetsSection projets={projets} />
            <CallToAction />
        </main>
    );
};

export default Home;

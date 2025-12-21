// Page d'accueil - PatrimoineConnect
// Importe et affiche les 4 sections de la page

import SectionHero from "../components/home/SectionHero";
import CommentCaMarche from "../components/home/CommentCaMarche";
import Temoignages from "../components/home/Temoignages";
import AppelAction from "../components/home/AppelAction";

const Home = () => {
    return (
        <main className="w-full">
            <SectionHero />
            <CommentCaMarche />
            <Temoignages />
            <AppelAction />
        </main>
    );
};

export default Home;

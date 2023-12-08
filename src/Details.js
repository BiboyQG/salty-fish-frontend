// Details.js
import { useParams } from 'react-router-dom';
import './Details.css'
import { useEffect, useState } from 'react';

const Details = () => {
    const { id } = useParams();
    const subtitle = {
        '1': "Why born?",
        '2': "Why eat?",
        '3': "Why music?",
        '4': "Why movie?"
    }
    const descriptions = {
        '1': <>
               <p>In a whimsical wintry scene beneath a soft snowfall, two miniature adventurers have set up an orange tent amidst a forest of white coral.</p>
               <p>The enchanting glow from the tent illuminates the surrounding area, where one figure stands watch and the other sits cozily beside a warm campfire.</p>
               <p>A serene and fantastical microcosm, suggesting a story of exploration in a frozen, coral wonderland.</p>
             </>,
        '2': <>
               <p>Tiny festive figures gather around a green 'Christmas tree' ingeniously fashioned from paper clips and binder clips.</p>
               <p>The creativity of this miniature world transforms everyday office supplies into a scene of celebration, complete with a Santa distributing gifts.</p>
               <p>It's Christmas morning in a land where imagination repurposes the mundane into the magical.</p>
             </>,
        '3': <>
               <p>In this playful tableau, a pair of white bread slices form a grand canyon, where a miniature cowboy leads a team of horses through the rugged terrain.</p>
               <p>The bread's soft texture mimics the smooth slopes of sandstone canyons, and the tiny figures add a layer of adventure to this culinary landscape.</p>
               <p>Inviting viewers to imagine the stories taking place within.</p>
             </>,
        '4': <>
               <p>A pair of scuba divers are immortalized in a moment of underwater exploration on the lid of a metal lunchbox.</p>
               <p>The illusion of a vast ocean is cleverly depicted by the reflective surface, turning an ordinary object into a sea of adventure.</p>
               <p>This miniature scene captures the playful and intrepid spirit of diving into the unknown depths of the everyday.</p>
             </>
    };
    const sub = subtitle[id.toString()] || "No description available for this ID.";

    const textDescription = descriptions[id.toString()] || "No description available for this ID.";

    return (
        <div className="container">
            <h1>Florence Painting Room</h1>
            <p>{sub}</p>
            <div>{textDescription}</div>
        </div>
    );
}

export default Details;

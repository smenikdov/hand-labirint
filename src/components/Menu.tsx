import React, { useState, useEffect } from 'react';
import Planet from './Planet';
import planets from '../levels/planets';
import { useDispatch } from 'react-redux';
import { resetChat } from '../store/chat';

const ROTATION_RADIUS = 200;

export default function Menu() {
    const dispatch = useDispatch();
    const [transformStyles, setTransformStyles] = useState<string[]>([]);
    const [activePlanet, setActivePlanet] = useState<number | null>(null);

    useEffect(() => {
        dispatch(resetChat());

        const newTransformStyles = [];
        for (let i = 0; i < planets.length; i++) {
            const angle = (2 * Math.PI * i) / planets.length;
            const x = Math.round(ROTATION_RADIUS * Math.cos(angle));
            const y = Math.round(ROTATION_RADIUS * Math.sin(angle));
            newTransformStyles.push(`translate(${x}px, ${y}px)`);
        }
        setTransformStyles(newTransformStyles);
    }, []);

    return (
        <div id="menu" onClick={() => setActivePlanet(null)}>
            {planets.map((planetData, index) => (
                <Planet
                    key={planetData.id}
                    planetData={planetData}
                    transform={transformStyles[index]}
                    setActivePlanet={setActivePlanet}
                    activePlanet={activePlanet}
                />
            ))}
        </div >
    )
}

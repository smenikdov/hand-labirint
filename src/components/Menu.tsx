import React, { useState, useEffect } from 'react';
import { RootState } from '../store';
import Planet from './Planet';
import planets from '../levels/planets';
import { useSelector, useDispatch } from 'react-redux';
import { resetChat } from '../store/chat';
import { setVisibilityHelloMenu } from '../store/game';
import mainBg from '../assets/mp3/main-bg.mp3';
import Button from './Button';
import whooshSound from '../assets/mp3/whoosh.mp3';
import { ReactComponent as Logo } from '../assets/img/logo.svg';

const ROTATION_RADIUS = 240;

export default function Menu() {
    const dispatch = useDispatch();
    const [transformStyles, setTransformStyles] = useState<string[]>([]);
    const [activePlanet, setActivePlanet] = useState<number | null>(null);
    const isVisibleHelloMenu = useSelector((state: RootState) => state.game.isVisibleHelloMenu);

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

    const colsePlanet = () => {
        if (null === activePlanet) {
            return;
        }
        const audio = new Audio(whooshSound);
        audio.playbackRate = 5;
        audio.volume = 0.4;
        audio.play();
        setActivePlanet(null);
    };
    const openPlanet = (id: number) => {
        if (id === activePlanet) {
            return;
        }
        const audio = new Audio(whooshSound);
        audio.playbackRate = 5;
        audio.volume = 0.4;
        audio.play();
        setActivePlanet(id);
    };

    const startGame = () => {
        const audio = new Audio(mainBg);
        audio.loop = true;
        audio.play();
        dispatch(setVisibilityHelloMenu(false));
    }

    
    return (
        isVisibleHelloMenu ?
        <div className="helloMenu">
            <Logo className="helloMenu__logo"/>
            <Button
                text="Начать игру"
                className="helloMenu__button"
                onClick={startGame}
            />
        </div>
        :
            <div id="menu" onClick={colsePlanet}>
            {planets.map((planetData, index) => (
                <Planet
                    key={planetData.id}
                    planetData={planetData}
                    transform={transformStyles[index]}
                    setActivePlanet={openPlanet}
                    activePlanet={activePlanet}
                />
            ))}
        </div >
    )
}

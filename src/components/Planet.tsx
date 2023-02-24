import React, { useState, useEffect } from 'react';
import { Planet as PlanetType } from '../levels/levelsSettings';
import { useDispatch } from 'react-redux';
import { setLevel, setPlanet } from '../store/level';
import { useNavigate } from 'react-router-dom';

interface PlanetProps {
    planetData: PlanetType,
    transform?: string,
    activePlanet: number | null,
    setActivePlanet: Function,
}

export default function Planet({ planetData, transform = 'none', activePlanet, setActivePlanet }: PlanetProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, name, cost = 0, isOpen = false, description = '', size = '300px', className, levels } = planetData;
    const [showTooltip, setShowTooltip] = useState(false);
    const [transformStyles, setTransformStyles] = useState<string[]>([]);
    const rotationRadius = activePlanet === id ? 200 : 40;

    useEffect(() => {
        const newTransformStyles = [];
        for (let i = 0; i < levels.length; i++) {
            if (i !== levels.length - 1) {
                const angle = (2 * Math.PI * i) / (levels.length - 1);
                const x = -Math.round(rotationRadius * Math.cos(angle));
                const y = -Math.round(rotationRadius * Math.sin(angle));
                newTransformStyles.push(`translate(${x}px, ${y}px)`);
            } else {
                newTransformStyles.push(`translate(${0}px, ${0}px)`);
            }
        }
        setTransformStyles(newTransformStyles);
    }, [activePlanet]);

    const handleMouseEnter = (): void => {
        setShowTooltip(true);
    };

    const handleMouseLeave = (): void => {
        setShowTooltip(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        setActivePlanet(id);
    };

    const changeLevel = (levelId: number): void => {
        if (!activePlanet) {
            return;
        }
        dispatch(setPlanet(id));
        dispatch(setLevel(levelId));
        navigate('/game');
    };

    const planetStyle = {
        width: activePlanet === null ? size : activePlanet === id ? '60vh' : 0,
        height: activePlanet === null ? size : activePlanet === id ? '60vh' : 0,
        opacity: activePlanet !== null && activePlanet !== id ? 0 : 1,
        transform: activePlanet === id ? 'none' : transform,
    };

    return (
        <div
            className={`neonPlanet ${className}`}
            style={planetStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div className="planetLevels">
                {
                    levels.map((level, index) =>
                        <div
                            key={level.id}
                            onClick={() => changeLevel(level.id)}
                            className="level"
                            style={{
                                transform: transformStyles[index],
                                opacity: activePlanet === id ? 1 : 0,
                            }}
                        >
                            <div>{index + 1}</div>
                        </div>
                    )
                }
            </div>
            {
                showTooltip && activePlanet === null
                    ?
                    <div className="tooltip">
                        {name}
                    </div>
                    :
                    null
            }
        </div>
    )
}
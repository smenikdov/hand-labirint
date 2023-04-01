import React, { useState, useEffect } from 'react';
import { Planet as PlanetType } from '../scripts/types';
import { useDispatch, useSelector } from 'react-redux';
import { setLevel, setPlanet } from '../store/game';
import { useNavigate } from 'react-router-dom';
import { BiLockAlt } from 'react-icons/bi';
import { RootState } from '../store';
import { setStars } from '../store/player';
import ModalDialog from '../components/ModalDialog';
import Button from './Button';

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
    const starsCount = useSelector((state: RootState) => state.player.stars);
    const [isVisibleBuyModal, setVisibilityBuyModal] = useState(false);
    const [isOpenedNow, setIsOpenedNow] = useState(!!localStorage.getItem(className));

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

    const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        if (isOpen || isOpenedNow) {
            setActivePlanet(id);
        } else {
            setVisibilityBuyModal(true);
        }
    };

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setVisibilityBuyModal(false);
    }

    const handleUnlockPlanet = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(setStars(starsCount - cost));
        localStorage.setItem(className, 'open');
        setIsOpenedNow(true);
        setVisibilityBuyModal(false);
    };

    const changeLevel = (levelId: number): void => {
        if (activePlanet === null) {
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
            className={`neonPlanet ${className} ${isOpen || isOpenedNow ? 'isOpen' : 'blocked'}`}
            style={planetStyle}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleClick}
        >
            {
                !isOpen && !isOpenedNow &&
                <div className="cost">
                    <div>{cost}</div>
                    <div className="icon mlSm" />
                </div>
            }

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
                showTooltip && activePlanet === null &&
                <div className="tooltip">
                    {
                        !isOpen && !isOpenedNow &&
                        <BiLockAlt className="mrSm" />
                    }
                    <div>
                        {name}
                    </div>
                </div>
            }

            <ModalDialog
                isVisible={isVisibleBuyModal}
                title="Разблокировать планету"
                onClose={handleClose}
            >
                {
                    starsCount >= cost ?
                        <p>Вы уверены, что хотите разблокировать эту планету за {cost}★ ?</p>
                        :
                        <p>У вас не достаточно звезд для разблокировки этой планеты</p>
                }
                <div className="modalButtons mtMd">
                    <Button
                        text="Отмена"
                        dense
                        color="gray"
                        className="mrMd"
                        onClick={handleClose}
                    />
                    {
                        starsCount >= cost &&
                        <Button
                            text="Разблокировать"
                            onClick={handleUnlockPlanet}
                        />
                    }
                </div>
            </ModalDialog>
        </div>
    )
}
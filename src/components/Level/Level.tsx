import React, { useState, useEffect } from 'react';
import { CellSymbol } from '../../scripts/types';
import Cell from './Cell';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addStack } from '../../store/chat';
import { setLevel } from '../../store/game';
import { selectLevel } from '../../store';
import DarkMode from './DarkMode';
import StopMode from './StopMode';
import { useNavigate } from 'react-router-dom';
import ModalDialog from '../ModalDialog';
import Button from '../Button';
import nextLevelSound from '../../assets/mp3/teleport.mp3';

export default function Level() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { levelInfo, isLevelComplete } = useSelector((state: RootState) => state.game);
    const level = useSelector(selectLevel);
    const player = useSelector((state: RootState) => state.player);
    const chatStack = useSelector((state: RootState) => state.chat.stack);
    // const [isStartSpaceshipAttack, setIsStartSpaceshipAttack] = useState(false);
    // const [canAttack, setCanAttack] = useState(true);

    useEffect(() => {
        if (!levelInfo.length) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (level.chat) {
            dispatch(addStack(level.chat));
        }
    }, [level.id]);

    const handleMenuGoOut = () => {
        const audio = new Audio(nextLevelSound);
        audio.play();
        navigate('/');
    };

    const goToNextLevel = () => {
        const audio = new Audio(nextLevelSound);
        audio.play();
        dispatch(setLevel(level.id + 1));
    };

    return (
        <>
            {
                level.darkMode &&
                <DarkMode
                    isActive={!!level.darkMode}
                    energy={player.energy}
                    x={player.x}
                    y={player.y}
                />
            }
            {
                // level.stopMode &&
                // <StopMode
                //     isActive={!!level.stopMode}
                //     x={player.x}
                //     y={player.y}
                //     isStartSpaceshipAttack={isStartSpaceshipAttack}
                //     setIsStartSpaceshipAttack={setIsStartSpaceshipAttack}
                //     setCanAttack={setCanAttack}
                // />
            }
            {
                chatStack.length > 0 ?
                null
                :
                <>
                    <h1 className="levelTitle">
                        {level.title}
                    </h1>

                    <div id='map'>
                        {level.lab.map((line, yIndex) =>
                            <div key={`row_${yIndex}`} className='row'>
                                {
                                    [...line].map((cell, xIndex) =>
                                        <Cell
                                            key={`cell_${xIndex}`}
                                            cellSymbol={cell as CellSymbol}
                                            status={levelInfo?.[xIndex]?.[yIndex]?.status}
                                            playerType={player.type}
                                        />)
                                }
                            </div>
                        )}
                    </div>
                </>
            }

            <ModalDialog
                isVisible={isLevelComplete}
                title="Поздравляем! Уровень пройден!"
            >
                <p>Вы можете начать новый уровень или вернуться в главное меню. Выберите один из вариантов, чтобы продолжить игру.</p>
                <div className="mtMd">
                    <Button
                        text="Выйти в меню"
                        dense
                        color="gray"
                        onClick={handleMenuGoOut}
                    />

                    <Button
                        text="Следующий уровень"
                        className="mlMd"
                        onClick={goToNextLevel}
                    />
                </div>
            </ModalDialog>
        </>
    );
}



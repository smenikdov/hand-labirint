import React, { useState, useEffect } from 'react';
import planets from '../../levels/planets';
import Cell from './Cell';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { CellSymbol, isWall } from '../../levels/levelsSettings';
import { addMessage, addStack } from '../../store/chat';
// import winSound from '../assets/mp3/win.mp3'
// import takeCoinSound from '../assets/mp3/coin.wav'
import { addStar, setType } from '../../store/player';
import { nextLevel } from '../../store/level';
import DarkMode from './DarkMode';
import StopMode from './StopMode';
import { useNavigate } from 'react-router-dom';
import ModalDialog from '../ModalDialog';
import Button from '../Button';

type Block = {
    x: number,
    y: number,
    size: number
}

type CellState = {
    xIndex: number,
    yIndex: number,
    cell: CellSymbol,
    status: 'active' | 'disable',
}

const checkBlocksCrossing = (
    { x: x1, y: y1, size: size1 }: Block,
    { x: x2, y: y2, size: size2 }: Block
): boolean => {
    let block1Left = x1;
    let block1Right = x1 + size1;
    let block1Top = y1;
    let block1Bottom = y1 + size1;

    let block2Left = x2;
    let block2Right = x2 + size2;
    let block2Top = y2;
    let block2Bottom = y2 + size2;

    const k1 = (block1Left <= block2Right) && (block1Right >= block2Left);
    const k2 = (block1Top <= block2Bottom) && (block1Bottom >= block2Top);

    return k1 && k2
};

const createMapState = (levelLab: Array<string>): Array<CellState> => {
    const levelState: Array<CellState> = [];
    let yIndex = 0;
    for (let line of levelLab) {
        let xIndex = 0;
        for (let cell of [...line]) {
            if (cell === '★') {
                levelState.push({
                    xIndex,
                    yIndex,
                    cell,
                    status: 'active',
                });
            }
            xIndex++;
        }
        yIndex++;
    }

    return levelState
};

const getCellState = (mapState: Array<CellState>, xIndex: number, yIndex: number): CellState | null => {
    return mapState.find(cell => cell.xIndex === xIndex && cell.yIndex === yIndex) || null
};

const changeCellState = (mapState: Array<CellState>, xIndex: number, yIndex: number, newVal: 'active' | 'disable'): Array<CellState> => {
    const newMapState: Array<CellState> = JSON.parse(JSON.stringify(mapState));
    const cellState = getCellState(newMapState, xIndex, yIndex);
    if (cellState) {
        cellState.status = newVal;
    }
    return newMapState;
};

const resetMapState = (mapState: Array<CellState>): Array<CellState> => {
    const newMapState: Array<CellState> = JSON.parse(JSON.stringify(mapState))
    return newMapState.map(cellState => {
        if (cellState.cell === '~') {
            cellState.status = 'active';
        }
        return cellState
    })
};

export default function Level() {
    const dispatch = useDispatch();
    const { planetId, levelId } = useSelector((state: RootState) => state.level);
    const level = planets[planetId].levels[levelId];
    const player = useSelector((state: RootState) => state.player);
    const [mapState, setMapState] = useState(createMapState(level.lab));
    const [isStartSpaceshipAttack, setIsStartSpaceshipAttack] = useState(false);
    const [canAttack, setCanAttack] = useState(true);
    const [isLevelComplete, setLevelComplete] = useState(false);
    const [isVisibleFinallyModal, setVisibilityFinallyModal] = useState(false);
    const navigate = useNavigate();

    const handleMenuGoOut = () => {
        setVisibilityFinallyModal(false);
        setLevelComplete(false);
        navigate('/');
    };

    const goTonextLevel = () => {
        setVisibilityFinallyModal(false);
        setLevelComplete(false);
        dispatch(nextLevel());
    };

    useEffect(() => {
        if (level.chat) {
            dispatch(addStack(level.chat));
        }
    }, []);

    useEffect(() => {
        if (isLevelComplete) {
            return;
        }

        const playerDiv = document.querySelector('.player') as HTMLDivElement;
        const cellDiv = document.querySelector('.cell') as HTMLDivElement;
        const map = document.querySelector('#map') as HTMLDivElement;
        const cellSize = cellDiv.offsetWidth;
        const playerSize = playerDiv?.offsetWidth || 23;
        const { top: topMargin, left: leftMargin } = map.getBoundingClientRect();

        const playerBlock: Block = {
            x: player.x,
            y: player.y,
            size: playerSize,
        };

        let yIndex = 0;
        for (let line of level.lab) {
            let isCrossSpacehip = false;

            let xIndex = 0;
            for (let cell of [...line]) {
                if (cell === ' ') {
                    xIndex++;
                    continue;
                }

                const cellBlock: Block = {
                    x: xIndex * cellSize + leftMargin,
                    y: yIndex * cellSize + topMargin,
                    size: cellSize,
                };

                const isCrossing = checkBlocksCrossing(cellBlock, playerBlock);

                if (isCrossing) {
                    if (isWall(cell as CellSymbol)) {
                        setCanAttack(true);
                        setIsStartSpaceshipAttack(false);
                        dispatch(setType('positive'));
                    }

                    if (cell === '★') {
                        const cellState = getCellState(mapState, xIndex, yIndex);
                        if (cellState?.status === 'active' && player.type === 'negative') {
                            dispatch(addStar());
                            setMapState(changeCellState(mapState, xIndex, yIndex, 'disable'));
                        }
                    }

                    if (cell === '~') {
                        if (player.type === 'negative' && !isStartSpaceshipAttack && canAttack && !isCrossSpacehip) {
                            isCrossSpacehip = true;
                            setCanAttack(false);
                            dispatch(addMessage({
                                text: 'Это звездный патруль Мировиля. Никому не двигаться! Любой движущий объект будет уничтожен!',
                                showTime: 2000,
                                character: 'spaceship',
                            }));
                            setIsStartSpaceshipAttack(true);
                        }
                    }

                    if (cell === '0') {
                        dispatch(setType('negative'));
                    }

                    if (cell === '1' && player.type === 'negative') {
                        dispatch(setType('positive'));
                        setCanAttack(true);
                        setIsStartSpaceshipAttack(false);
                        setLevelComplete(true);
                        setVisibilityFinallyModal(true);
                    }
                }

                xIndex++;
            };
            yIndex++;
        };
    }, [player.x, player.y, isLevelComplete]);


    return (
        <>
            <DarkMode
                isActive={!!level.darkMode}
                x={player.x}
                y={player.y}
            />
            <StopMode
                isActive={!!level.stopMode}
                x={player.x}
                y={player.y}
                isStartSpaceshipAttack={isStartSpaceshipAttack}
                setIsStartSpaceshipAttack={setIsStartSpaceshipAttack}
                setCanAttack={setCanAttack}
            />

            <div id='map'>
                {level.lab.map((line, yIndex) =>
                    <div key={`row_${yIndex}`} className='row'>
                        {
                            [...line].map((cell, xIndex) =>
                                <Cell
                                    key={`cell_${xIndex}`}
                                    cellSymbol={cell as CellSymbol}
                                    state={getCellState(mapState, xIndex, yIndex)}
                                />)
                        }
                    </div>
                )}
            </div>

            <ModalDialog
                isVisible={isVisibleFinallyModal}
                title="Поздравляем! Уровень пройден!"
                onClose={() => setVisibilityFinallyModal(false)}
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
                        onClick={goTonextLevel}
                    />
                </div>
            </ModalDialog>
        </>
    );
}



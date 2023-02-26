import React, { useState, useEffect } from 'react';
import planets from '../../levels/planets';
import Cell from './Cell';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { CellSymbol, isWall } from '../../levels/levelsSettings';
import { addStack } from '../../store/chat';
// import winSound from '../assets/mp3/win.mp3'
// import takeCoinSound from '../assets/mp3/coin.wav'
import { setStars, setType } from '../../store/player';
import { nextLevel } from '../../store/level';
import DarkMode from './DarkMode';
import StopMode from './StopMode';

type Point = {
    x: number,
    y: number,
}

type Block = {
    x: number,
    y: number,
    size: number
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
}

export default function Level() {
    const dispatch = useDispatch();
    const { planetId, levelId } = useSelector((state: RootState) => state.level);
    const level = planets[planetId].levels[levelId];
    const { x: playerX, y: playerY, type: playerType } = useSelector((state: RootState) => state.player);
    useEffect(() => {
        if (level.chat) {
            dispatch(addStack(level.chat));
        }
    }, []);

    useEffect(() => {
        const player = document.querySelector('.player') as HTMLDivElement;
        const cell = document.querySelector('.cell') as HTMLDivElement;
        const map = document.querySelector('#map') as HTMLDivElement;

        const cellSize = cell.offsetWidth;
        const playerSize = player?.offsetWidth || 23;
        const { top: topMargin, left: leftMargin } = map.getBoundingClientRect();

        const playerBlock: Block = {
            x: playerX,
            y: playerY,
            size: playerSize,
        };

        // console.log(1, playerX, playerY)
        // console.log(2, player.getBoundingClientRect().left, player.getBoundingClientRect().top,)

        let yIndex = 0;
        for (let line of level.lab) {
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
                        dispatch(setType('positive'));
                    }
                    if (cell === '0') {
                        dispatch(setType('negative'));
                    }
                    if (cell === '1' && playerType === 'negative') {
                        console.log('you are win');
                    }
                }

                xIndex++;
            };
            yIndex++;
        };
    }, [playerX, playerY]);


    return (
        <>
            <DarkMode isActive={!!level.darkMode} x={playerX} y={playerY} />
            <StopMode isActive={!!level.stopMode} x={playerX} y={playerY} />

            <div id='map'>
                {level.lab.map((line, rowIndex) =>
                    <div key={`row_${rowIndex}`} className='row'>
                        {
                            [...line].map((cell, cellIndex) =>
                                <Cell
                                    key={`cell_${cellIndex}`}
                                    cellSymbol={cell as CellSymbol}
                                />)
                        }
                    </div>
                )}
            </div>
        </>
    );
}



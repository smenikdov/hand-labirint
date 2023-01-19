import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import winSound from '../assets/mp3/win.mp3'
// import takeCoinSound from '../assets/mp3/coin.wav'
import { setCoins } from '../../store/player';
import { startPlay, endPlay } from '../../store/level';
import { startTimer, stopTimer } from '../../store/timer';
import { nextLevel } from '../../store/level';
import { RootState } from '../../store';

const parseLab = {
    ' ': 'empty',
    '#': 'wall',
    '1': 'empty finish',
    '0': 'empty start',
    '$': 'empty coin'
}

type CellSymbol = ' ' | '#' | '1' | '0' | '$';

type CellProps = {
    cellSymbol: CellSymbol,
}

type Point = {
    x: number,
    y: number,
}

const checkCrossing = ({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point) => {
    const player = document.querySelector('#player') as HTMLDivElement;
    const block = document.querySelector('.cell') as HTMLDivElement;
    if (!player || !block) {
        return;
    }
    const playerWidth = player.offsetWidth;
    const blockWidth = block.offsetWidth;

    let playerLeft = x1;
    let playerRight = x1 + playerWidth;
    let playerTop = y1;
    let playerBottom = y1 + playerWidth;

    let blockLeft = x2;
    let blockRight = x2 + blockWidth;
    let blockTop = y2;
    let blockBottom = y2 + blockWidth;

    let k1 = (playerLeft < blockRight && playerLeft > blockLeft) || (playerRight < blockRight && playerRight > blockLeft);
    let k2 = (playerTop < blockBottom && playerTop > blockTop) || (playerBottom < blockBottom && playerBottom > blockTop);

    if (k1 && k2)
        return true
    else
        return false
}

const getClasses = (cellSymbol: CellSymbol, isStartPlay: boolean): string => {
    const classes = ['cell'];
    classes.push(parseLab[cellSymbol]);
    if ((cellSymbol === '0' && !isStartPlay) || (cellSymbol === '1' && isStartPlay)) {
        classes.push('active');
    }
    return classes.join(' ');
}

export default function Cell({ cellSymbol }: CellProps) {
    const thisCell = useRef(null);
    const coins = useSelector((state: RootState) => state.player.coins);
    const dispatch = useDispatch();
    const isStartPlay = useSelector((state: RootState) => state.level.isStartPlay);
    const player = useSelector((state: RootState) => state.player);

    useEffect(() => {
        if (thisCell) {
            // @ts-ignore
            const { left: x, top: y } = thisCell.current.getBoundingClientRect();

            const thisCellCoordinates = {
                x,
                y,
            };

            if (checkCrossing(player, thisCellCoordinates)) {
                if (isStartPlay && cellSymbol === '#') {
                    dispatch(stopTimer());
                    dispatch(endPlay());
                } else if (isStartPlay && cellSymbol === '$') {
                    dispatch(setCoins(coins + 1));
                } else if (isStartPlay && cellSymbol === '1') {
                    // let audio = new Audio(winSound);
                    // audio.play();
                    dispatch(endPlay());
                    dispatch(stopTimer());
                    dispatch(nextLevel());
                } else if (!isStartPlay && cellSymbol === '0') {
                    dispatch(startTimer());
                    dispatch(startPlay());
                }
            }
        }
    }, [player.x, player.y]);

    return (
        <div
            ref={thisCell}
            className={getClasses(cellSymbol, isStartPlay)}
        />
    )
}

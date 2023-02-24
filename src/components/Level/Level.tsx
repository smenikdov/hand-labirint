import React, { useState, useEffect } from 'react';
import planets from '../../levels/planets';
import Cell from './Cell';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { CellSymbol } from '../../levels/levelsSettings';
import { addStack } from '../../store/chat';

export default function Level() {
    const dispatch = useDispatch();
    const { planetId, levelId } = useSelector((state: RootState) => state.level);
    const level = planets[planetId].levels[levelId];

    useEffect(() => {
        if (level.chat) {
            dispatch(addStack(level.chat));
        }
    }, [])

    return (
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
    );
}



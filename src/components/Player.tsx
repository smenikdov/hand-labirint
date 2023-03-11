import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// const ROTATION_RADIUS = 30;
// type TransformStyle = {
//     transform: string;
// }

export default function Player() {
    const player = useSelector((state: RootState) => state.player);
    const playerStyle = {
        left: `${player.x}px`,
        top: `${player.y}px`
    };

    return (
        <div
            className={['player', player.type].join(' ')}
            style={playerStyle}
        />
    )
}

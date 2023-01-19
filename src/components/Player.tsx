import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function Player() {
    const player = useSelector((state: RootState) => state.player);
    const playerStyle = {
        left: `${player.x}px`,
        top: `${player.y}px`,
    };

    return (
        <div
            id="player"
            style={playerStyle}
        />
    )
}

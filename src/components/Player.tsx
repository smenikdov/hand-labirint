import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// const ROTATION_RADIUS = 30;
// type TransformStyle = {
//     transform: string;
// }

export default function Player() {
    // const [chargesStyles, setChargesStyles] = useState<TransformStyle[]>([]);
    const player = useSelector((state: RootState) => state.player);
    const playerStyle = {
        left: `${player.x}px`,
        top: `${player.y}px`,
    };

    // useEffect(() => {
    //     const newChargesStyles = [];
    //     for (let i = 0; i < player.charge; i++) {
    //         const angle = (2 * Math.PI * i) / player.charge;
    //         const x = Math.round(ROTATION_RADIUS * Math.cos(angle));
    //         const y = Math.round(ROTATION_RADIUS * Math.sin(angle));
    //         const style = {
    //             transform: `translate(${x}px, ${y}px)`,
    //         };
    //         newChargesStyles.push(style);
    //     }
    //     setChargesStyles(newChargesStyles);
    // }, []);


    return (
        <div
            className={['player', player.type].join(' ')}
            style={playerStyle}
        >
            <div className="rotateBlock">
                {/* {chargesStyles.map((chargeStyle, index) =>
                    <div
                        key={`charge${index}`}
                        className="charge"
                        style={chargeStyle}
                    />
                )} */}
            </div>
        </div>
    )
}

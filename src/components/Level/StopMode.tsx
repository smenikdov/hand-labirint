import React, { useState } from 'react';

type StopModeProps = {
    isActive: boolean,
    x: number,
    y: number,
}

export default function StopMode({ isActive, x, y }: StopModeProps) {
    return (
        isActive ?
            <div
                id="stopMode"
            >
                <div className="spaceship">
                    <div className="spaceshipTop"></div>
                    <div className="spaceshipMiddle">
                        <div className="ballsContainer">
                            <div className="ball" />
                            <div className="ball" />
                            <div className="ball" />
                            <div className="ball" />
                            <div className="ball" />
                            <div className="ball" />
                        </div>
                    </div>
                    <div className="spaceshipBottom">
                    </div>
                </div>
            </div>
            :
            null
    )
}

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Point } from '../scripts/types';
import EnemyBot from './Level/EnemyBot';

const ROTATION_RADIUS = 20;

export default function Player() {
    const player = useSelector((state: RootState) => state.player);
    const getCoordinates = (point: Point) => {
        return {
            left: `${point.x}px`,
            top: `${point.y}px`
        };
    };

    const triangleXOffset = ROTATION_RADIUS * Math.cos(player.angle);
    const triangleYOffset = ROTATION_RADIUS * Math.sin(player.angle);
    const triangleStyle = {
        rotate: `${player.angle * 180 / Math.PI}deg`,
        translate: `${triangleXOffset}px ${triangleYOffset}px`,
    };

    return (
        <>
            <div
                className={['player', player.type, `${player.weaponState}Weapon`].join(' ')}
                style={getCoordinates(player)}
            >
                {
                    player.weaponState === 'prepare' &&
                    <div
                        className="triangle"
                        style={triangleStyle}
                    />
                }
            </div>

            {
                player.bullets.map(bullet => (
                    <div
                        key={bullet.id}
                        className={['playerBullet', player.type].join(' ')}
                        style={getCoordinates(bullet)}
                    />
                ))
            }

            {
                player.enemies.map(enemy => (
                    <EnemyBot
                        key={enemy.id}
                        style={getCoordinates(enemy)}
                        data={enemy}
                    />
                ))
            }
        </>
    )
}

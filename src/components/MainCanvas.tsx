import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

type LastPosition = {
    x: number,
    y: number,
};

const SIZE = 20;
const lastPositions: Array<LastPosition> = [];


export default function MainCanvas() {
    const mainCanvas = useRef<HTMLCanvasElement>(null);
    const player = useSelector((state: RootState) => state.player);
    const fillColor = player.type === 'positive' ? '#37B7FF' : '#FD3F55';



    function loop(canvas: HTMLCanvasElement) {
        // const context = canvas.getContext('2d');
        // if (!context) {
        //     return;
        // }

        // context.clearRect(0, 0, canvas.width, canvas.height);
        // context.fillStyle = fillColor;
        // context.strokeStyle = fillColor;
        // context.lineWidth = SIZE;

        // lastPositions.forEach((currentPos, index) => {
        //     context.beginPath();
        //     context.globalAlpha = (index / lastPositions.length) * 0.5;

        //     if (index !== 0) {
        //         const prevPos = lastPositions[index - 1];
        //         context.moveTo(prevPos.x, prevPos.y);
        //         context.lineTo(currentPos.x, currentPos.y);
        //         context.stroke();
        //     }

        //     context.arc(currentPos.x, currentPos.y, SIZE / 2, 0, 2 * Math.PI);
        //     context.fill();

        // });
    };

    useEffect(() => {
        const canvas = mainCanvas.current;
        if (!canvas) {
            return
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, []);

    useEffect(() => {
        lastPositions.push({
            x: player.x + SIZE / 2,
            y: player.y + SIZE / 2,
        });

        if (lastPositions.length > 20) {
            lastPositions.shift()
        }

        const canvas = mainCanvas.current;
        if (!canvas) {
            return
        }
        loop(canvas);
    }, [player.x, player.y]);

    return (
        <canvas id='mainCanvas' ref={mainCanvas} />
    )
}

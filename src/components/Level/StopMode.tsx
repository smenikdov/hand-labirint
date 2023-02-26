import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setType } from '../../store/player';

type StopModeProps = {
    isActive: boolean,
    x: number,
    y: number,
    isStartSpaceshipAttack: boolean,
    setIsStartSpaceshipAttack: Function,
    setCanAttack: Function,
}

export default function StopMode({ isActive, x, y, isStartSpaceshipAttack, setIsStartSpaceshipAttack, setCanAttack }: StopModeProps) {
    const dispatch = useDispatch();
    const [prevX, setPrevX] = useState(0);
    const [prevY, setPrevY] = useState(0);
    const spaceshipCanvas = useRef<HTMLCanvasElement>(null);
    const spaceship = useRef<HTMLDivElement>(null);
    const realX = useRef<number>(0);
    realX.current = x;
    const realY = useRef<number>(0);
    realY.current = y;
    const realIsStartSpaceshipAttack = useRef<boolean>(false);
    realIsStartSpaceshipAttack.current = isStartSpaceshipAttack;


    const [isStartAnalysis, setIsStartAnalysis] = useState(false);

    const timeOut = async (ms: number): Promise<{ success: boolean }> => {
        for (let i = 0; i < ms; i++) {
            await new Promise(resolve => setTimeout(resolve, 100));
            if (!realIsStartSpaceshipAttack.current) {
                return { success: false }
            }
        }
        return { success: true }
    };

    const startAttack = async () => {
        const reponse1 = await timeOut(40);
        if (!reponse1.success) {
            return;
        }
        setPrevX(realX.current);
        setPrevY(realY.current);
        setIsStartAnalysis(true);
        const reponse2 = await timeOut(120);
        if (reponse2.success) {
            setIsStartAnalysis(false);
            setIsStartSpaceshipAttack(false);
            await new Promise(resolve => setTimeout(resolve, 10000));
            setCanAttack(true);
        } else {
            setIsStartAnalysis(false);
        }
    };

    useEffect(() => {
        if (isStartSpaceshipAttack === true) {
            startAttack();
        }
    }, [isStartSpaceshipAttack]);

    const shoot = async () => {
        const canvas = spaceshipCanvas.current;
        if (!canvas || !spaceship.current) {
            return
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        for (let i = 0; i < 7; i++) {
            const { top: y2, left: x2 } = spaceship.current?.getBoundingClientRect()
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const ship = { x: x2 + 80, y: y2 + 85 };
            const player = { x: realX.current + 10, y: realY.current + 10 };

            const point1 = {
                x: ship.x + (player.x - ship.x) * (i / 8),
                y: ship.y + (player.y - ship.y) * (i / 8),
            };
            const point2 = {
                x: ship.x + (player.x - ship.x) * ((i + 1) / 8),
                y: ship.y + (player.y - ship.y) * ((i + 1) / 8),
            };

            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);

            ctx.strokeStyle = '#37B7FF';
            ctx.lineWidth = 10;
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#37B7FF';

            ctx.stroke();
            await new Promise(resolve => setTimeout(resolve, 8));
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    useEffect(() => {
        const distance = Math.sqrt(Math.pow(prevX - x, 2) + Math.pow(prevY - y, 2));
        if (isStartAnalysis && distance > 50) {
            setIsStartAnalysis(false);
            setIsStartSpaceshipAttack(false);
            shoot();
            dispatch(setType('positive'));
            setCanAttack(true);
        }

    }, [x, y, isStartAnalysis])

    return (
        isActive ?
            <div
                id="stopMode"
            >
                <canvas id="spaceshipCanvas" ref={spaceshipCanvas} />
                <div ref={spaceship} className={['spaceship', isStartSpaceshipAttack ? 'active' : ''].join(' ')}>
                    <div className="spaceshipTop" />
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
                    <div className="spaceshipBottom" />
                </div>
            </div>
            :
            null
    )
}

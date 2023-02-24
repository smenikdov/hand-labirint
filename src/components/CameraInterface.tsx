import React, { useEffect } from 'react'
import levels from '../levels/planets'
import LevelNumber from './Level/LevelNumber'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setTime } from '../store/timer';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LevelMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const coinsCount = useSelector((state: RootState) => state.player.coins);
    const starsCount = useSelector((state: RootState) => state.player.stars);

    const handleMenuClick = () => {
        navigate('/');
    };

    // const dispatch = useDispatch();
    // const levelId = useSelector((state: RootState) => state.level.id);
    // const isStartPlay = useSelector((state: RootState) => state.level.isStartPlay);
    // const time = useSelector((state: RootState) => state.timer.time);
    // let level = levels[levelId];

    // let startTime: number = 0;
    // let flag: NodeJS.Timer | null = null;

    // const startTimer = (): void => {
    //     function timeIncrement() {
    //         let interval = new Date().getTime() - startTime;
    //         let s = Math.floor(interval % 60000 / 1000);
    //         let m = Math.floor(interval % 3600000 / 60000);
    //         const newTime = `${m < 10 ? '0' + m : m} : ${s < 10 ? '0' + s : s}`;
    //         dispatch(setTime(newTime));
    //     }

    //     startTime = new Date().getTime();
    //     flag = setInterval(timeIncrement, 1000);
    // };

    // const stopTimer = (): void => {
    //     if (flag !== null) {
    //         clearInterval(flag);
    //     }
    // };

    // useEffect(() => {
    //     if (isStartPlay) {
    //         if (flag) {
    //             startTimer();
    //         }
    //     } else {
    //         stopTimer();
    //     }
    // }, [isStartPlay]);

    return (
        <>
            {
                location.pathname === '/game'
                    ?
                    <div
                        id="menuButton"
                        onClick={handleMenuClick}
                        className="flex paSm"
                    >
                        <div />
                        <div />
                    </div>
                    :
                    null
            }
            <div id="cameraInterface">
                <canvas id="outputCanvas" />
                <video id="inputVideo" className="displayNone" />
                <div className="flex own mtSm mlLg">
                    <div className="flex coinsCount">
                        <div className="count">
                            {coinsCount}
                        </div>
                        <div className="icon mlSm" />
                    </div>
                    <div className="flex starsCount">
                        <div className="count">
                            {starsCount}
                        </div>
                        <div className="icon mlSm" />
                    </div>
                </div>
            </div>
        </>
    )
}


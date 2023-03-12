import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import store from '../store';
import { addStar } from '../store/player';
import { changeCellInfo, endLevel } from '../store/game';
import { selectLevel } from '../store';
import { Point, FingersData, NewPlayerData, Block, CellSymbol } from '../scripts/types';
import { playerUpdate, setReload, setType } from '../store/player';
import * as hp from '../scripts/helpers';

const FPS = 50;

interface Results {
    image: CanvasImageSource,
    multiHandLandmarks: Point[][]
};

export default function startWatch() {
    let bulletId = 0;
    let enemyId = 0;

    const fingersData: FingersData = {
        x: 0,
        y: 0,
        lastFingersCounts: [],
        lastAngles: [],
    };

    const newPlayerData: NewPlayerData = {
        x: 0,
        y: 0,
        bullets: [],
        enemies: [],
        angle: 0,
        isFist: false,
    };


    const videoElement = document.getElementById('inputVideo') as HTMLVideoElement;
    const canvasElement = document.getElementById('outputCanvas') as HTMLCanvasElement;
    const canvasCtx = canvasElement.getContext('2d')!;

    function onResults(results: Results) {
        const landmarks = results.multiHandLandmarks[0];
        canvasElement.style.height = canvasElement.width * videoElement.videoHeight / videoElement.videoWidth + 'px';
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        if (store.getState().player.godMode || landmarks || !hp.isAllLandmarks(landmarks)) {
            return;
        }

        const { x, y } = hp.calcResultPoint(landmarks);
        fingersData.x = x;
        fingersData.y = y;
        const fingersCount = hp.calcFingersCount(landmarks);
        fingersData.lastFingersCounts.push(fingersCount);
        if (fingersData.lastFingersCounts.length > 10) {
            fingersData.lastFingersCounts.shift();
        }
        const angle = hp.calcAngle(landmarks[5], landmarks[8]);
        fingersData.lastAngles.push(angle);
        if (fingersData.lastAngles.length > 10) {
            fingersData.lastAngles.shift();
        }
    }


    // const hands = new Hands({
    //     locateFile: (file) => {
    //         return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    //     }
    // });


    // hands.setOptions({
    //     maxNumHands: 1,
    //     modelComplexity: 1,
    //     minDetectionConfidence: 0.5,
    //     minTrackingConfidence: 0.5
    // });
    // hands.onResults(onResults);

    // const camera = new Camera(videoElement, {
    //     onFrame: async () => {
    //         await hands.send({ image: videoElement });
    //     },
    // });
    // camera.start();

    if (store.getState().player.godMode) {
        let isMouseDown = false;

        document.addEventListener('mousemove', (event) => {
            fingersData.x = event.clientX + 5;
            fingersData.y = event.clientY + 5;
            const angle = hp.calcAngle(fingersData, newPlayerData)
            fingersData.lastAngles.push(angle);

            if (isMouseDown) {
                fingersData.lastFingersCounts.push(4);
            } else {
                fingersData.lastFingersCounts.push(0);
            }

            if (fingersData.lastAngles.length > 10) {
                fingersData.lastAngles.shift();
            }

            if (fingersData.lastFingersCounts.length > 10) {
                fingersData.lastFingersCounts.shift();
            }
        });

        document.addEventListener('mousedown', () => {
            isMouseDown = true;
        });
        document.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
    }

    setInterval(() => {
        const state = store.getState();
        const player = state.player;
        const game = state.game;
        const isLevelActive = !game.isLevelComplete && /game/.test(window.location.pathname);
        const level = selectLevel(state);
        const angle = hp.calcAverageAngle(fingersData.lastAngles);
        const isFist = Math.round(hp.calcAverage(fingersData.lastFingersCounts)) === 4;
        const souldGenerateEnemyBot = newPlayerData.enemies.length < 15 && Math.random() < 1 / 10 / FPS;

        newPlayerData.x = player.x + (fingersData.x - player.x) / 10;
        newPlayerData.y = player.y + (fingersData.y - player.y) / 10;
        newPlayerData.isFist = isFist;
        newPlayerData.angle = angle;
        newPlayerData.bullets = hp.shiftBullets(player.bullets);
        newPlayerData.enemies = hp.shiftEnemies(player.enemies, player);
        if (isLevelActive && souldGenerateEnemyBot) {
            newPlayerData.enemies.push({
                x: -100,
                y: -100,
                id: enemyId++,
                targetNumber: Math.floor(hp.rand(1, 5)) as 1 | 2 | 3 | 4 | 5,
            });
        }

        if (isLevelActive && isFist && player.isReload) {
            newPlayerData.bullets.push({
                x: newPlayerData.x,
                y: newPlayerData.y,
                angle,
                type: player.type,
                id: bulletId++,
            });
            store.dispatch(setReload(false));
            setTimeout(() => {
                store.dispatch(setReload(true));
            }, 3000);
        }
        store.dispatch(playerUpdate(newPlayerData));


        if (!isLevelActive || game.isLevelComplete) {
            return;
        }

        const playerDiv = document.querySelector('.player') as HTMLDivElement;
        const cellDiv = document.querySelector('.cell') as HTMLDivElement;
        const map = document.querySelector('#map') as HTMLDivElement;
        const cellSize = cellDiv.offsetWidth;
        const playerSize = playerDiv?.offsetWidth || 23;
        const { top: topMargin, left: leftMargin } = map.getBoundingClientRect();

        const playerBlock: Block = {
            x: player.x,
            y: player.y,
            size: playerSize,
        };

        level.forEachCell((cell, xIndex, yIndex) => {
            if (cell === ' ') {
                return;
            }

            const cellBlock: Block = {
                x: xIndex * cellSize + leftMargin,
                y: yIndex * cellSize + topMargin,
                size: cellSize,
            };

            const isCrossing = hp.checkBlocksCrossing(cellBlock, playerBlock);

            if (isCrossing) {
                const cellState = game.levelInfo[xIndex][yIndex];
                if (hp.isWall(cell as CellSymbol)) {
                    // setCanAttack(true);
                    // setIsStartSpaceshipAttack(false);
                    store.dispatch(setType('positive'));
                }

                if (cell === '★') {
                    if (cellState.status === 'active' && player.type === 'negative') {
                        store.dispatch(addStar());
                        store.dispatch(changeCellInfo({ xIndex, yIndex, status: 'disable' }));
                    }
                }

                if (cell === '~') {
                    // if (player.type === 'negative' && !isStartSpaceshipAttack && canAttack && !isCrossSpacehip) {
                    // isCrossSpacehip = true;
                    // setCanAttack(false);
                    // store.dispatch(addMessage({
                    //     text: 'Это звездный патруль Мировиля. Никому не двигаться! Любой движущий объект будет уничтожен!',
                    //     showTime: 2000,
                    //     character: 'spaceship',
                    // }));
                    // setIsStartSpaceshipAttack(true);
                    // }
                }

                if (cell === '0') {
                    store.dispatch(setType('negative'));
                }

                if (cell === '1' && player.type === 'negative') {
                    store.dispatch(setType('positive'));
                    store.dispatch(endLevel());
                    // setCanAttack(true);
                    // setIsStartSpaceshipAttack(false);
                    // setLevelComplete(true);
                    // setVisibilityFinallyModal(true);
                }
            }
        });
    }, 1000 / FPS);
}

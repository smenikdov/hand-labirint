import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import store from '../store';
import { addStar, deleteEnemy } from '../store/player';
import { changeCellInfo, endLevel } from '../store/game';
import { selectLevel } from '../store';
import { Point, FingersData, NewPlayerData, Block, CellSymbol } from '../scripts/types';
import { playerUpdate, setWeaponState, setType } from '../store/player';
import starSound from '../assets/mp3/star.mp3';
import winSound from '../assets/mp3/win.mp3';
import gameOver from '../assets/mp3/game-over.mp3';
import gameStart from '../assets/mp3/game-start.mp3';
import * as hp from '../scripts/helpers';

let FPS = 30;
let resultsCount = 0;

setInterval(() => {
    FPS = resultsCount;
    resultsCount = 0;
    console.log(FPS)
}, 1000);

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
        resultsCount++;
        mainLoop();
        const landmarks = results.multiHandLandmarks[0];
        canvasElement.style.height = canvasElement.width * videoElement.videoHeight / videoElement.videoWidth + 'px';
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        if (store.getState().player.godMode || !landmarks || !hp.isAllLandmarks(landmarks)) {
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
        const angle = -hp.calcAngle(landmarks[5], landmarks[8]);
        fingersData.lastAngles.push(angle);
        if (fingersData.lastAngles.length > 10) {
            fingersData.lastAngles.shift();
        }
    }

    const hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
    });

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);

    const camera = new Camera(videoElement, {
        onFrame: async () => {
            await hands.send({ image: videoElement });
        },
    });
    camera.start();

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

    function mainLoop() {
        const state = store.getState();
        const player = state.player;
        const game = state.game;
        const isLevelActive = !game.isLevelComplete && /game/.test(window.location.pathname) && game.levelInfo.length;
        const level = selectLevel(state);
        if (!level) {
            return;
        }
        const angle = hp.calcAverageAngle(fingersData.lastAngles);
        const isFist = Math.round(hp.calcAverage(fingersData.lastFingersCounts)) === 4;
        const souldGenerateEnemyBot = level.enemyMode && newPlayerData.enemies.length < 15 && Math.random() < 1 / 20 / FPS;

        const xChange = (fingersData.x - player.x) / 10;
        const yChange = (fingersData.y - player.y) / 10;
        newPlayerData.x = player.x + xChange;
        newPlayerData.y = player.y + yChange;
        newPlayerData.isFist = isFist;
        newPlayerData.angle = angle;
        newPlayerData.bullets = hp.shiftBullets(player.bullets);
        newPlayerData.enemies = hp.shiftEnemies(player.enemies, player);

        if (newPlayerData.isFist && !player.isFist) {
            const element = document.elementFromPoint(newPlayerData.x, newPlayerData.y);

            if (element) {
                const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: newPlayerData.x + 10,
                    clientY: newPlayerData.y + 10,
                });
                element.dispatchEvent(clickEvent);
            }
        }

        if (newPlayerData.enemies.length) {
            const enemyDiv = document.querySelector('.robot') as HTMLDivElement;
            const enemySize = enemyDiv.offsetWidth;
            newPlayerData.enemies.filter(enemy => enemy.status === 'alive').forEach(enemy => {
                const enemyBlock: Block = {
                    x: enemy.x,
                    y: enemy.y,
                    size: enemySize,
                    format: 'circle',
                };

                newPlayerData.bullets.forEach(bullet => {
                    const bulletDiv = document.querySelector('.playerBullet') as HTMLDivElement;
                    const bulletSize = bulletDiv.offsetWidth;
                    const bulletBlock: Block = {
                        x: bullet.x,
                        y: bullet.y,
                        size: bulletSize,
                        format: 'circle',
                    };

                    const isCrossing = hp.checkBlocksCrossing(bulletBlock, enemyBlock);
                    if (isCrossing) {
                        enemy.status = 'dead';

                        setTimeout(() => {
                            store.dispatch(deleteEnemy(enemy.id));
                        }, 10000);
                    }
                });

                const playerDiv = document.querySelector('.player') as HTMLDivElement;
                const playerSize = playerDiv.offsetWidth;
                const playerBlock: Block = {
                    x: player.x,
                    y: player.y,
                    size: playerSize,
                    format: 'circle',
                };
                const isCrossing = hp.checkBlocksCrossing(enemyBlock, playerBlock);
                if (isCrossing) {
                    store.dispatch(setType('positive'));
                }
            });
        }

        if (isLevelActive && souldGenerateEnemyBot && player.type === 'negative') {
            newPlayerData.enemies.push({
                x: Math.random() < 0.5 ? -100 : window.innerWidth + 100,
                y: Math.random() < 0.5 ? -100 : window.innerHeight + 100,
                id: enemyId++,
                targetNumber: Math.floor(hp.rand(1, 5)) as 1 | 2 | 3 | 4 | 5,
                status: 'alive',
            });
        }

        if (isLevelActive && isFist && player.weaponState === 'ready' && level.enemyMode) {
            store.dispatch(setWeaponState('prepare'));

            setTimeout(() => {
                store.dispatch(setWeaponState('shoot'));
            }, 5000);

            setTimeout(() => {
                store.dispatch(setWeaponState('ready'));
            }, 10000);
        }

        if (player.weaponState === 'shoot' && level.enemyMode) {
            newPlayerData.bullets.push({
                x: newPlayerData.x,
                y: newPlayerData.y,
                angle,
                type: player.type,
                id: bulletId++,
            });
            store.dispatch(setWeaponState('reloading'));
        }

        store.dispatch(playerUpdate(newPlayerData));

        if (!isLevelActive || game.isLevelComplete) {
            return;
        }

        const playerDiv = document.querySelector('.player') as HTMLDivElement;
        const cellDiv = document.querySelector('.cell') as HTMLDivElement;
        const map = document.querySelector('#map') as HTMLDivElement
        if (!cellDiv || !playerDiv || !map) {
            return;
        }
        const cellSize = cellDiv.offsetWidth;
        const playerSize = playerDiv.offsetWidth;
        const { top: topMargin, left: leftMargin } = map.getBoundingClientRect();

        const playerBlock: Block = {
            x: player.x,
            y: player.y,
            size: playerSize,
            format: 'circle',
        };

        level.forEachCell((cell, xIndex, yIndex) => {
            if (cell === ' ') {
                return;
            }

            const cellBlock: Block = {
                x: xIndex * cellSize + leftMargin,
                y: yIndex * cellSize + topMargin,
                size: cellSize,
                format: 'square',
            };

            const isCrossing = hp.checkBlocksCrossing(cellBlock, playerBlock);

            if (isCrossing) {
                const cellState = game.levelInfo[xIndex][yIndex];
                if (hp.isWall(cell as CellSymbol) && player.type === 'negative') {
                    const audio = new Audio(gameOver);
                    audio.volume = 0.6;
                    audio.play();
                    // setCanAttack(true);
                    // setIsStartSpaceshipAttack(false);
                    store.dispatch(setType('positive'));
                }

                if (cell === '★') {
                    if (cellState.status === 'active' && player.type === 'negative') {
                        const audio = new Audio(starSound);
                        audio.play();
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

                if (cell === '0' && player.type === 'positive') {
                    const audio = new Audio(gameStart);
                    audio.volume = 0.6;
                    audio.play();
                    store.dispatch(setType('negative'));
                }

                if (cell === '1' && player.type === 'negative') {
                    const audio = new Audio(winSound);
                    audio.play();

                    store.dispatch(setType('positive'));
                    store.dispatch(endLevel());
                    // setCanAttack(true);
                    // setIsStartSpaceshipAttack(false);
                    // setLevelComplete(true);
                    // setVisibilityFinallyModal(true);
                }
            }
        });
    };

    // setInterval(mainLoop, 1000 / 30);
}

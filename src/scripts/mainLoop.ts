import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import store from '../store';
import { goTo } from '../store/player';
// import bgSound from '../assets/mp3/bg1.mp3';

type Point = {
    x: number,
    y: number,
}

type Results = {
    image: CanvasImageSource,
    multiHandLandmarks: Point[][]
}

const fingerIndexes: Array<Array<number>> = [[8, 6], [12, 10], [16, 14], [20, 18]];

export default function startWatch() {
    // let audio = new Audio(bgSound);
    // audio.loop = true;
    // audio.volume = 0.15;
    // audio.play();
    let resultPoint: Point = {
        x: 0,
        y: 0,
    };

    const videoElement = document.getElementById('inputVideo') as HTMLVideoElement;
    const canvasElement = document.getElementById('outputCanvas') as HTMLCanvasElement;
    const canvasCtx = canvasElement.getContext('2d')!;
    let error = false;

    function onResults(results: Results) {
        const landmarks = results.multiHandLandmarks[0];
        canvasElement.style.height = canvasElement.width * videoElement.videoHeight / videoElement.videoWidth + 'px';
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        if (!store.getState().player.godMode && landmarks) {
            let x = 0;
            let y = 0;
            for (let i = 5; i < 21; i++) {
                if (landmarks[i].x && landmarks[i].y) {
                    x += landmarks[i].x;
                    y += landmarks[i].y;
                } else {
                    error = true
                }
            }

            if (error) {
                error = false;
                return;
            }

            x /= 16;
            y /= 16;
            let width = window.innerWidth;
            let height = window.innerHeight;
            x = width - x * width;
            y = y * height;

            resultPoint = {
                x,
                y,
            };


            // Определяем поворот руки
            const isHorizontalRevert = landmarks[17].x > landmarks[5].x;
            const isVerticalRevert = landmarks[9].y > landmarks[0].y;

            // Определяем количество согнутых пальцев
            let fingersCount = 0;
            for (const fingerIndex of fingerIndexes) {
                if (!isVerticalRevert && landmarks[fingerIndex[0]].y > landmarks[fingerIndex[1]].y) {
                    fingersCount += 1
                } else if (isVerticalRevert && landmarks[fingerIndex[0]].y < landmarks[fingerIndex[1]].y) {
                    fingersCount += 1
                }
            }

            if (!isHorizontalRevert && landmarks[4].x < landmarks[2].x) {
                fingersCount += 1
            } else if (isHorizontalRevert && landmarks[4].x > landmarks[2].x) {
                fingersCount += 1
            }

            // определяем угол выстрела
            const xDiff = landmarks[8].x - landmarks[5].x;
            const yDiff = landmarks[8].y - landmarks[5].y;
            const angleInRadians = Math.atan2(yDiff, xDiff);
            const angleInDegrees = Math.round(angleInRadians * (180 / Math.PI));


            // console.log(5 - fingersCount)
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
        document.addEventListener('mousemove', (event) => {
            resultPoint = { x: event.clientX + 5, y: event.clientY + 5 };
        });
    }

    setInterval(() => {
        const player = store.getState().player;
        const newPoint = {
            x: player.x + (resultPoint.x - player.x) / 10,
            y: player.y + (resultPoint.y - player.y) / 10,
        };
        store.dispatch(goTo(newPoint));
    }, 1000 / 50);
};

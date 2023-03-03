import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import store from '../store';
import { goTo } from '../store/player';
import {HAND_CONNECTIONS} from "@mediapipe/hands";
// import bgSound from '../assets/mp3/bg1.mp3';

type Point = {
    x: number,
    y: number,
}

type Results = {
    image: CanvasImageSource,
    multiHandLandmarks: Point[][]
}

export default function startWatch() {
    // let audio = new Audio(bgSound);
    // audio.loop = true;
    // audio.volume = 0.15;
    // audio.play();

    let newPoint: Point = {
        x: 0,
        y: 0,
    };

    const videoElement = document.getElementById('inputVideo') as HTMLVideoElement;
    const canvasElement = document.getElementById('outputCanvas') as HTMLCanvasElement;
    const canvasCtx = canvasElement.getContext('2d')!;
    let error = false;

    function onResults(results: Results) {
        canvasElement.style.height = canvasElement.width * videoElement.videoHeight / videoElement.videoWidth + 'px';
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        if (!store.getState().player.godMode && results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
                // drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 1 });
                // drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 1 });
                let x = 0;
                let y = 0;
                for (let i = 5; i < 21; i++) {
                    if ((landmarks[i].x !== 0) && (landmarks[i].y !== 0)) {
                        x += landmarks[i].x;
                        y += landmarks[i].y;
                    }
                    else error = true
                }
                x /= 16;
                y /= 16;
                let width = window.innerWidth;
                let height = window.innerHeight;
                x = width - x * width;
                y = y * height;

                if (!error) {
                    newPoint = {
                        x,
                        y,
                    };
                    store.dispatch(goTo(newPoint));
                } else {
                    error = false;
                }
            }
        }

        canvasCtx.restore();
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
        minTrackingConfidence: 0.5
    });
    hands.onResults(onResults);

    const camera = new Camera(videoElement, {
        onFrame: async () => {
            await hands.send({ image: videoElement });
        },
    });
    camera.start();

    if (store.getState().player.godMode) {
        document.addEventListener('mousemove', (event) => {
            newPoint = { x: event.clientX + 5, y: event.clientY + 5 };
        });
    }

    // setInterval(() => {
    //     store.dispatch(goTo(newPoint));
    // }, 1000 / 30); // 10 fps мало? Нет. За счет transition выглядит очень плавно, и с низкой нагрузкой. Большой фпс, только ухуджит
};

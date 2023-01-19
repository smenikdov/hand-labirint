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


export default function startWatch() {
   // let audio = new Audio(bgSound);
   // audio.loop = true;
   // audio.volume = 0.15;
   // audio.play();

   const videoElement = document.getElementById('input_video') as HTMLVideoElement;
   const canvasElement = document.getElementById('output_canvas') as HTMLCanvasElement;
   const canvasCtx = canvasElement.getContext('2d')!;
   let error = false;

   function onResults(results: Results) {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      // Добавляем изображение с камеры
      canvasCtx.drawImage(
         results.image, 0, 0, canvasElement.width, canvasElement.height);

      if (results.multiHandLandmarks) {
         // Рисуем точки пальцев и соединяем их линиями
         for (const landmarks of results.multiHandLandmarks) {
            //drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 1 });
            //drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 1 });
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
            let width = window.innerWidth * 1.4;
            let height = window.innerHeight * 1.4;
            x = width - x * width - 200;
            y = y * height - 200;

            const newPoint: Point = {
               x,
               y,
            };

            if (!error) {
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
      width: 1280,
      height: 720
   });
   camera.start();
}
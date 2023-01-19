import React from 'react'
import levels from '../../levels/levels'
import LevelNumber from './LevelNumber'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function LevelMenu() {
   const levelId = useSelector((state: RootState) => state.level.id);
   const time = useSelector((state: RootState) => state.timer.time);
   let level = levels[levelId];

   return (
      <div id="level_menu">
         <h1 id="title">
            {level['title']}
         </h1>
         <div className="levels">
            {
               levels.map(level =>
                  <LevelNumber
                     key={level.id}
                     levelId={level.id}
                  />
               )
            }
         </div>
         <p id="description">
            {level['description']}
         </p>
         <canvas id="output_canvas" />
         <i id="helper">
            {level['helper']}
         </i>
         <div id="timer">
            {time}
         </div>
         <video id="input_video" />
      </div>
   )
}


import React from 'react'
import { setLevel } from '../../store/level';
import { useDispatch } from 'react-redux';

type LevelNumberProps = {
   levelId: number;
}

export default function LevelNumber({ levelId }: LevelNumberProps) {
   const dispatch = useDispatch();
   return (
      <div
         className="level"
         onClick={() => dispatch(setLevel(levelId))}
      >
         {levelId + 1}
      </div>
   )
}

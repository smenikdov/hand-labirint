import levels from '../../levels/levels';
import Cell from './Cell';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type CellSymbol = ' ' | '#' | '1' | '0' | '$';

export default function Level() {
  const levelId = useSelector((state: RootState) => state.level.id);
  let level = levels[levelId].lab;

  return (
    <>
      <div id='lab'>
        {
          level.map(
            (line, rowIndex) =>
              <div key={`row_${rowIndex}`} className='row'>
                {
                  [...line].map(
                    (cell, cellIndex) =>
                      <Cell
                        key={`cell_${cellIndex}`}
                        cellSymbol={cell as CellSymbol}
                      />
                  )
                }
              </div>
          )
        }
      </div>

      <div id='player'></div>
    </>
  );
}



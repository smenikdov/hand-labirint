import React, { useEffect, useRef } from 'react'
import { CellSymbol, parseLab } from '../../levels/levelsSettings';
import Battery from './Battery';

type CellProps = {
    cellSymbol: CellSymbol,
}

function Cell({ cellSymbol }: CellProps) {
    return (
        <>
            <div
                className={['cell', parseLab[cellSymbol]].join(' ')}
            />
            {
                cellSymbol === '1' ?
                    <Battery charge={0} maxCharge={5} />
                    :
                    null
            }
        </>
    )
}

export default React.memo(Cell)

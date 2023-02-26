import React, { useEffect, useRef } from 'react'
import { CellSymbol, parseLab } from '../../levels/levelsSettings';
import Battery from './Battery';

type CellProps = {
    cellSymbol: CellSymbol,
    state: {
        status: 'active' | 'disable',
    } | null,
}

function Cell({ cellSymbol, state }: CellProps) {
    return (
        <>
            <div
                className={['cell', parseLab[cellSymbol], state?.status || ''].join(' ')}
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

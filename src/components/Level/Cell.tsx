import React, { useEffect, useRef } from 'react'
import { CellSymbol, parseLab } from '../../levels/levelsSettings';

type CellProps = {
    cellSymbol: CellSymbol,
    state: {
        status: 'active' | 'disable',
    } | null,
}

function Cell({ cellSymbol, state }: CellProps) {
    return (
        <div
            className={['cell', parseLab[cellSymbol], state?.status || ''].join(' ')}
        />
    )
}

export default React.memo(Cell)

import React, { useEffect, useRef } from 'react'
import { CellSymbol, parseLab } from '../../scripts/types';

type CellProps = {
    cellSymbol: CellSymbol,
    state: {
        status?: 'active' | 'disable',
    },
}

function Cell({ cellSymbol, state }: CellProps) {
    return (
        <div
            className={['cell', parseLab[cellSymbol], state?.status || ''].join(' ')}
        />
    )
}

export default React.memo(Cell)

import React, { useEffect, useRef } from 'react'
import { CellSymbol, parseLab } from '../../scripts/types';

interface CellProps {
    cellSymbol: CellSymbol,
    state: {
        status?: 'active' | 'disable',
    },
    playerType: 'negative' | 'positive',
};

function Cell({ cellSymbol, state, playerType }: CellProps) {
    const generateClass = () => {
        const className = ['cell', parseLab[cellSymbol]];
        if (state?.status) {
            className.push(state?.status)
        }
        if (playerType === 'positive' && cellSymbol === '★') {
            className.push('disable');
        }

        return className.join(' ')
    };

    return (
        <div
            className={generateClass()}
        />
    )
}

export default React.memo(Cell)

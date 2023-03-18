import React from 'react'
import { CellSymbol, parseLab } from '../../scripts/types';

interface CellProps {
    cellSymbol: CellSymbol,
    status?: 'active' | 'disable',
    playerType: 'negative' | 'positive',
};

function Cell({ cellSymbol, status, playerType }: CellProps) {
    const generateClass = () => {
        const className = ['cell', parseLab[cellSymbol]];
        if (status) {
            className.push(status)
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

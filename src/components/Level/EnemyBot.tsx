import React from 'react'

type EnemyBotProps = {
    size: 1 | 2 | 3 | 4 | 5,
    isTarget?: boolean,
};
const getClass = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
};


export default function EnemyBot({ size, isTarget = false }: EnemyBotProps) {
    return (
        <div className="robot">
            {
                isTarget &&
                <div className="target">
                    <div className="stick top" />
                    <div className="stick left" />
                    <div className="stick right" />
                    <div className="stick bottom" />
                </div>
            }


            <div className="body">
                <div className="belt1" />
                <div className="belt2" />
                <div className={`personalNumber ${getClass[size]}`}>
                    {
                        [...'#'.repeat(size)].map((_, index) =>
                            <div className="dot" />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

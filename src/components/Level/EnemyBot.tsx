import React from 'react'

type EnemyBotProps = {
    data: {
        targetNumber: 1 | 2 | 3 | 4 | 5,
        status: 'alive' | 'dead',
    },
    isTarget?: boolean,
    style: {
        [key: string]: string;
    },
};
const getClass = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
};


export default function EnemyBot({ data, isTarget = false, style }: EnemyBotProps) {
    const { targetNumber, status } = data;

    return (
        <div className={`robot ${status}`} style={style}>
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
                <div className={`personalNumber ${getClass[targetNumber]}`}>
                    {
                        [...'#'.repeat(targetNumber)].map((_, index) =>
                            <div
                                key={index}
                                className="dot"
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

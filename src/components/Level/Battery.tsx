import React, { useState, useEffect } from 'react';

type BatteryProps = {
    charge: number,
    maxCharge: number
}

export default function Battery({ charge, maxCharge }: BatteryProps) {
    return (
        <div className="battery flex">
            {
                Array.from('x'.repeat(maxCharge)).map((_, index) =>
                    <div
                        key={index}
                        className={['charge', index + 1 <= charge ? 'active' : ''].join(' ')}
                    />
                )
            }
        </div>
    )
}

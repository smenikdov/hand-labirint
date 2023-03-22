import React from 'react';
type DarkModeProps = {
    isActive: boolean,
    energy: number,
    x: number,
    y: number,
}

export default function DarkMode({ isActive, x, y, energy }: DarkModeProps) {
    const style = {
        backgroundImage: `radial-gradient(circle at center, rgba(0, 0, 0, 0), #000 ${energy + 40}px ${energy + 40}px)`,
        backgroundRepeat: 'no-repeat',
        left: `calc(${x + 10}px - 100vw)`,
        top: `calc(${y + 10}px - 100vh)`,
        bottom: 'auto',
    };

    return (
        isActive ?
            <div
                id="darkMode"
                style={style}
            />
            :
            null
    )
}

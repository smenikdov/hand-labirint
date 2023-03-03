import React from 'react';
type DarkModeProps = {
    isActive: boolean,
    x: number,
    y: number,
}

export default function DarkMode({ isActive, x, y }: DarkModeProps) {
    const style = {
        backgroundImage: `radial-gradient(rgba(0, 0, 0, 0), #000 150px)`,
        backgroundRepeat: 'no-repeat',
        left: `calc(${x}px - 100vw)`,
        top: `calc(${y}px - 100vh)`,
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

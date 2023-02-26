import React from 'react';
type DarkModeProps = {
    isActive: boolean,
    x: number,
    y: number,
}

export default function DarkMode({ isActive, x, y }: DarkModeProps) {
    const style = {
        backgroundImage: `radial-gradient(circle at ${x}px ${y}px, rgba(0, 0, 0, 0), #000 150px)`,
        backgroundRepeat: 'no-repeat',
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

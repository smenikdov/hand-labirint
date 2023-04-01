import React, { FC, ReactNode } from 'react';
import { IconType } from 'react-icons/lib';

type ButtonProps = {
    dense?: boolean
    text?: string
    Icon?: IconType | null
    onClick: (event: React.MouseEvent<HTMLElement>) => void
    color?: 'negative' | 'positive' | 'gray'
    className?: string
    style?: Object
    squre?: boolean
};

const Button: FC<ButtonProps> = ({
    dense = false,
    text,
    onClick,
    color = 'positive',
    className = '',
    style = {},
    Icon = null,
    squre = false,
}: ButtonProps): JSX.Element => {
    const classes = `button ${color} ${dense ? 'dense' : ''} ${squre ? 'squre' : ''} ${className}`;

    return (
        <button className={classes} onClick={onClick} style={style}>
            <div className='flex no-wrap'>
                {
                    Icon &&
                    <Icon />
                }
                {text}
            </div>
        </button>
    );
};

export default Button;
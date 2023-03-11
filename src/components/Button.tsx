import React, { FC, ReactNode } from 'react';

type ButtonProps = {
    dense?: boolean;
    text: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    color?: 'negative' | 'positive' | 'gray';
    className?: string;
};

const Button: FC<ButtonProps> = ({
    dense = false,
    text,
    onClick,
    color = 'positive',
    className = '',
}: ButtonProps): JSX.Element => {
    const classes = `button ${color} ${dense ? 'dense' : ''} ${className}`;

    return (
        <button className={classes} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
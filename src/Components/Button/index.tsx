import * as React from 'react';
import { ButtonHTMLAttributes } from 'react';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    customClassName?: string;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { color, customClassName, ...btnProps } = props;
    return (
        <button className="btn btn-secondary" {...btnProps} >
            {props.children}
        </button>
    );
};

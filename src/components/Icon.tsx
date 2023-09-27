import { Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';

export interface IconProps {
    name: string;
    color?: string;
    width?: string;
    height?: string;
}

const Iconify: Component<IconProps> = (props) => {
    return (
        <Icon  icon={props.name} color={props.color} width={props.width} height={props.height}/>
    )
};

export default Iconify;